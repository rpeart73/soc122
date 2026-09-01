const { test, expect } = require('playwright/test');
const { execFileSync } = require('child_process');

const base = process.env.SOC122_AUDIT_URL || 'http://127.0.0.1:8875/index.html';
const browserExecutable = process.env.SENECA_CHROMIUM_EXECUTABLE;
if (browserExecutable) test.use({ launchOptions: { executablePath: browserExecutable } });

function zipEntry(file, entry) {
  const command = process.platform === 'win32' ? 'tar.exe' : 'unzip';
  const args = process.platform === 'win32' ? ['-xOf', file, entry] : ['-p', file, entry];
  return execFileSync(command, args, { encoding: 'utf8' });
}

async function clearCourseStorage(page) {
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => new Promise((resolve) => {
    localStorage.clear(); sessionStorage.clear();
    const request = indexedDB.deleteDatabase('seneca-student-notes-v1');
    request.onsuccess = request.onerror = request.onblocked = () => resolve();
  }));
  await page.goto('about:blank');
}

async function noteCopies(page) {
  return page.evaluate(async () => {
    const courseKey = Object.keys(localStorage).find((key) => key.startsWith('soc122corpus.') && key.endsWith('.v2'));
    const local = courseKey ? JSON.parse(localStorage.getItem(courseKey) || '{}') : {};
    const session = courseKey ? JSON.parse(sessionStorage.getItem(`${courseKey}.allStudentNotesMirror.v1`) || 'null') : null;
    if (!courseKey) return { courseKey, local, session, idb: null };
    const idb = await new Promise((resolve) => {
      const request = indexedDB.open('seneca-student-notes-v1', 2);
      request.onupgradeneeded = () => { const db = request.result; if (!db.objectStoreNames.contains('walkthrough-notes')) db.createObjectStore('walkthrough-notes', { keyPath: 'id' }); if (!db.objectStoreNames.contains('student-note-vault')) db.createObjectStore('student-note-vault', { keyPath: 'id' }); };
      request.onerror = () => resolve(null);
      request.onsuccess = () => { const db = request.result; const get = db.transaction('student-note-vault', 'readonly').objectStore('student-note-vault').get(courseKey); get.onsuccess = () => { const value = get.result || null; db.close(); resolve(value); }; get.onerror = () => { db.close(); resolve(null); }; };
    });
    return { courseKey, local, session, idb };
  });
}

test.describe('SOC122 student-work integrity', () => {
  test.beforeEach(async ({ page }) => clearCourseStorage(page));

  test('every authored SOC action has a callable runtime handler', async ({ page, request }) => {
    const response = await request.get(new URL('app.js', base).href);
    expect(response.ok()).toBeTruthy();
    const source = await response.text();
    const names = [...new Set([...source.matchAll(/\bSOC\.([A-Za-z_$][\w$]*)\s*\(/g)].map((match) => match[1]))].sort();
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate((items) => items.filter((name) => typeof window.SOC?.[name] !== 'function'), names)).toEqual([]);
  });

  test('all principal course screens render without browser errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    for (const screen of ['journey', 'site', 'library', 'explore', 'pathways', 'contexts', 'synthesis', 'videos', 'readings', 'compare', 'reading', 'glossary', 'cards', 'assignments', 'career', 'walkthroughs', 'map', 'calendar', 'review', 'outcomes']) {
      await page.evaluate((name) => SOC.go(name), screen);
      await expect(page.locator('#soc-main')).toBeVisible();
    }
    await page.goto(`${base}?week=2`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#soc-main')).toContainText(/Week 2|Two-Eyed Seeing/i);
    expect(errors).toEqual([]);
  });

  test('exact notes survive primary-copy loss and export in the Seneca document', async ({ page }) => {
    const exact = '  My SOC wording — exactly mine.\n  The indent stays.  ';
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.evaluate((value) => SOC.wkReflect(2, value), exact);
    await page.waitForTimeout(450);
    let copies = await noteCopies(page);
    expect(copies.local.wkReflect['2']).toBe(exact);
    expect(copies.session.values.wkReflect['2']).toBe(exact);
    expect(copies.idb.snapshot.values.wkReflect['2']).toBe(exact);
    await page.evaluate(() => { const key = Object.keys(localStorage).find((item) => item.startsWith('soc122corpus.') && item.endsWith('.v2')); localStorage.removeItem(key); sessionStorage.clear(); });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect.poll(async () => (await noteCopies(page)).local.wkReflect?.['2'], { timeout: 10000 }).toBe(exact);

    const downloadPromise = page.waitForEvent('download');
    await page.evaluate(() => SOC.exportAllNotes());
    const download = await downloadPromise;
    const file = await download.path();
    const documentXml = zipEntry(file, 'word/document.xml');
    const coreXml = zipEntry(file, 'docProps/core.xml');
    expect(documentXml).toContain('<w:t xml:space="preserve">  My SOC wording — exactly mine.</w:t>');
    expect(documentXml).toContain('<w:t xml:space="preserve">  The indent stays.  </w:t>');
    expect(documentXml).toContain('Student-authored note, preserved exactly');
    expect(coreXml).toContain('<dc:creator>Raymond Peart</dc:creator>');
    expect(`${documentXml}\n${coreXml}`).not.toMatch(/python-docx|generated by|openai|chatgpt|codex/i);
  });

  test('Two-Eyed Seeing weaving and explicit clearing work end to end', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => { SOC.compare(SOC122.records[0].id); SOC.compare(SOC122.records[1].id); SOC.go('compare'); });
    await expect(page.getByRole('heading', { name: 'Build your own weaving' })).toBeVisible();
    const exact = '  I keep both readings whole — my exact words.  ';
    await page.getByLabel('What each reading lets you see notes').fill(exact);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Save my comparison' }).click();
    const xml = zipEntry(await (await downloadPromise).path(), 'word/document.xml');
    expect(xml).toContain(exact);
    await page.waitForTimeout(350);
    page.once('dialog', (dialog) => dialog.accept());
    await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.evaluate(() => SOC.clearMyWork())]);
    const copies = await noteCopies(page);
    expect(copies.local.wkReflect || {}).toEqual({});
    expect(copies.session).toBeNull();
    expect(copies.idb).toBeNull();
  });

  test('redesigned activities render the intended distinct workflows', async ({ page }) => {
    const targets = [
      [2, 'audit', 'Keep both eyes whole'],
      [3, 'audit', 'Trace who holds curriculum authority'],
      [4, 'evidencewall', 'Match evidence to institutional responsibility'],
      [5, 'classify', 'Audit what the evidence can support'],
      [9, 'trace', 'Trace an engineered inequality'],
      [10, 'builder', 'Write a non-diagnostic structural briefing'],
      [11, 'trace', 'Audit an intergenerational pathway'],
      [12, 'audit', 'Redesign a fictional service intake'],
      [13, 'builder', 'Revise your Personal Cartography with evidence'],
      [14, 'builder', 'Write your whole-course synthesis']
    ];
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const [week, archetype, title] of targets) {
      await page.goto(`${base}?week=${week}&screen=activity`, { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveURL(new RegExp(`week=${week}.*screen=activity`));
      await expect(page.getByRole('heading', { name: title })).toBeVisible();
      await expect(page.locator(`[data-archetype="${archetype}"]`)).toBeVisible();
      expect(await page.locator('[data-activity-field]').count()).toBeGreaterThan(0);
      expect(await page.locator('button:visible').evaluateAll((items) => items.filter((item) => !((item.getAttribute('aria-label') || item.textContent || '').trim())).length)).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });

  test('activity decisions and long exact authored work survive reload and export', async ({ page }) => {
    test.setTimeout(60000);
    const exact = ('My evidence boundary stays with the named source and does not become a diagnosis. ' + 'The institutional response remains separate from an individual claim. ').repeat(10).trim() + '  ';
    expect(exact.length).toBeGreaterThan(1000);
    await page.goto(`${base}?week=12&screen=activity`, { waitUntil: 'domcontentloaded' });
    await page.locator('[data-activity-choice]').first().click();
    const field = page.locator('[data-activity-field]').first();
    await field.fill(exact);
    await page.waitForTimeout(450);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-activity-field]').first()).toHaveValue(exact);
    await expect(page.locator('[data-activity-choice]').first()).toHaveAttribute('aria-pressed', 'true');
    await page.locator('button[onclick="SOC.station(12)"]:visible').last().click();
    await expect(page).toHaveURL(/week=12/);
    await expect(page.getByRole('heading', { name: 'Generate Your Weekly Notes' })).toBeVisible();
    await page.locator('#wk-notes').getByRole('button', { name: 'Show this section' }).click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#wk-notes button[onclick="SOC.saveWeek(12)"]:visible').click();
    const file = await (await downloadPromise).path();
    const documentXml = zipEntry(file, 'word/document.xml');
    const coreXml = zipEntry(file, 'docProps/core.xml');
    expect(documentXml).toContain(exact);
    expect(documentXml).toContain('Student-authored activity work, preserved exactly');
    expect(`${documentXml}\n${coreXml}`).not.toMatch(/python-docx|generated by|openai|chatgpt|codex/i);
  });

  test('canonical links survive reload, sharing, immersive entry, and close', async ({ page }) => {
    await page.goto(`${base}?screen=career`, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/screen=career/);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/screen=career/);
    const shared = await page.evaluate(async () => {
      Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText(value) { window.__sharedCourseUrl = value; return Promise.resolve(); } } });
      SOC.shareMobileSite();
      await new Promise((resolve) => setTimeout(resolve, 0));
      return window.__sharedCourseUrl;
    });
    expect(shared).toContain('?screen=career');
    await page.goto(`${base}?walk=2`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#walk-overlay')).toBeVisible();
    await expect(page).toHaveURL(/walk=2/);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('#walk-overlay')).toBeVisible();
    await page.getByRole('button', { name: 'Close the experience' }).click();
    await expect(page.locator('#walk-overlay')).toHaveCount(0);
    await expect(page).toHaveURL(/screen=walkthroughs$/);
  });

  test('activity workspace remains usable on a phone and at 200 percent zoom', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}?week=5&screen=activity`, { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    await page.locator('[data-activity-choice]').first().focus();
    expect(await page.locator('[data-activity-choice]').first().evaluate((item) => item === document.activeElement)).toBeTruthy();
    await page.keyboard.press('Enter');
    await expect(page.locator('.act-feedback').first()).toBeVisible();
    await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    const targetSize = await page.locator('[data-activity-choice]').first().evaluate((item) => { const r = item.getBoundingClientRect(); return { width: r.width, height: r.height }; });
    expect(targetSize.width).toBeGreaterThanOrEqual(44);
    expect(targetSize.height).toBeGreaterThanOrEqual(44);
  });

  test('served cache marker, corrected sources, attribution, and career routes are internally consistent', async ({ request, page }) => {
    const build = (await (await request.get(new URL('build.txt', base).href)).text()).trim();
    const index = await (await request.get(base)).text();
    const app = await (await request.get(new URL('app.js', base).href)).text();
    const corpus = await (await request.get(new URL('data/corpus-data.js', base).href)).text();
    const cases = await (await request.get(new URL('data/soc122-cases.js', base).href)).text();
    const markers = [...index.matchAll(/202\d{5,}(?:-\d+)?/g)].map((match) => match[0]);
    expect(new Set(markers)).toEqual(new Set([build]));
    expect(app).toContain('https://doi.org/10.1162/daed_a_02035');
    expect(app).toContain('https://doi.org/10.1503/cmaj.060940');
    expect(corpus).toContain('https://www.amacad.org/publication/daedalus/indigenous-historical-trauma-alter-native-explanations-mental-health-inequities');
    expect(cases).toContain('https://www.amacad.org/publication/daedalus/indigenous-historical-trauma-alter-native-explanations-mental-health-inequities');
    expect(cases).not.toContain('direct.mit.edu/daed/article-pdf');
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const routes = await page.evaluate(() => Object.values((window.SOC122_CAREER || {}).byProgram || {}).join('\n'));
    expect(routes).not.toMatch(/Two-Eyed Seeing|\bbraid(?:ing|ed)?\b/i);
    await page.goto(`${base}?week=3`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('#soc-main')).toContainText('Institutional authority is more than representation');
    await expect(page.locator('#soc-main')).not.toContainText('Martin ties pairing to sovereignty');
  });
});
