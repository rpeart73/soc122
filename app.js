/* SOC122 Companion: weekly learning pathway. Vanilla JS, no build step, no framework.
   Organized by WEEK (the course arc). Each content week pairs one Western reading with
   one Indigenous-scholar reading (Two-Eyed Seeing). A companion to Blackboard:
   no accounts, no grading, no student-to-student interaction.
   Saved + compare live on the student's own device (localStorage). */
(function () {
  'use strict';
  var D = window.SOC122;
  var MC = window.SOC122_MC || {};
  var RECORDINGS = window.SOC122_RECORDINGS || {};
  if (!D) { document.getElementById('app').textContent = 'Course data did not load.'; return; }
  var HAS_EYE = !!(D.course && D.course.frame);

  var SKEY = 'soc122corpus.v2';
  var VKEY = SKEY + '.view.v1';
  var HKEY = SKEY + '.hardResetNext';
  var WKKEY = SKEY + '.walk.v1';
  function load() { try { var o = JSON.parse(localStorage.getItem(SKEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function persist() { try { localStorage.setItem(SKEY, JSON.stringify({ saved: state.saved, cmpNotes: state.cmpNotes, rcNotes: state.rcNotes, sgNotes: state.sgNotes, sgTick: state.sgTick, mapNotes: state.mapNotes, wkCheck: state.wkCheck, wkReflect: state.wkReflect, actResult: state.actResult, mcSel: state.mcSel, mcConf: state.mcConf, kcShort: state.kcShort, kcShortRate: state.kcShortRate, kcHist: state.kcHist, mediaNotes: state.mediaNotes, careerReflect: state.careerReflect, rl: state.rl, studentName: state.studentName, visits: state.visits })); } catch (e) {} }
  function loadView() { try { var o = JSON.parse(sessionStorage.getItem(VKEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function clearView() { try { sessionStorage.removeItem(VKEY); sessionStorage.removeItem(HKEY); } catch (e) {} }
  function shouldResumeView(v) {
    var hard = false;
    try { hard = sessionStorage.getItem(HKEY) === '1'; sessionStorage.removeItem(HKEY); } catch (e) {}
    if (hard) { clearView(); return false; }
    return !!(v && v.screen);
  }
  function cleanScreen(s) {
    return ['journey', 'site', 'library', 'station', 'explore', 'detail', 'pathways', 'videos', 'readings', 'compare', 'reading', 'glossary', 'cards', 'assignments', 'career', 'activity', 'walkthroughs', 'map', 'calendar'].indexOf(s) >= 0 ? s : 'journey';
  }
  function cleanWeek(w) {
    w = Number(w);
    return (isFinite(w) && w >= 1 && w <= 20) ? w : null;
  }
  function cleanWeekPart(part) {
    part = String(part || '');
    return ['ov', 'mode', 'rec', 'pre', 'learn', 'out', 'gq', 'lens', 'con', 'term', 'read', 'watch', 'case', 'do', 'reflect', 'sg', 'kc', 'notes', 'how', 'catch'].indexOf(part) >= 0 ? part : null;
  }
  function initialRoute() {
    try {
      var p = new URLSearchParams(location.search || '');
      var w = cleanWeek(p.get('week') || p.get('w'));
      if (w) return { screen: 'station', week: w, part: cleanWeekPart(p.get('part')) };
    } catch (e) {}
    return null;
  }
  /* Term shell URL: replace with the exact Blackboard course link once the Fall shell is published. */
  var BB_URL = 'https://learn.senecapolytechnic.ca';
  var saved0 = load();
  var view0 = loadView();
  var route0 = initialRoute();
  var resumeView0 = shouldResumeView(view0);
  var __isReload = false;
  try { var __nav = performance.getEntriesByType && performance.getEntriesByType('navigation'); __isReload = !!(__nav && __nav[0] && __nav[0].type === 'reload'); } catch (e) {}
  /* a plain refresh resumes the last screen; the Home reset uses the hard flag */
  var routePart0 = route0 && route0.part;

  var state = {
    screen: route0 ? route0.screen : (resumeView0 ? cleanScreen(view0.screen) : 'journey'),
    prevView: (resumeView0 && view0.prevView && typeof view0.prevView === 'object') ? view0.prevView : null,
    navOpen: false,
    walkWeek: null,
    walkSlide: 0,
    readerLensOpen: false,
    readerLensX: 84,
    readerLensY: 86,
    journeyWeek: route0 ? route0.week : (resumeView0 ? cleanWeek(view0.journeyWeek) : null),
    stationWeek: route0 ? route0.week : (resumeView0 ? cleanWeek(view0.stationWeek) : null),
    sgNotes: (saved0.sgNotes || {}),
    sgTick: (saved0.sgTick || {}),
    wkCheck: (saved0.wkCheck && typeof saved0.wkCheck === 'object') ? saved0.wkCheck : {},
    wkReflect: (saved0.wkReflect && typeof saved0.wkReflect === 'object') ? saved0.wkReflect : {},
    wkOpen: {},
    studentName: typeof saved0.studentName === 'string' ? saved0.studentName.slice(0, 40) : '',
    visits: (saved0.visits && typeof saved0.visits === 'object') ? saved0.visits : {},
    act: (resumeView0 && view0.act && typeof view0.act === 'object') ? view0.act : {},
    actResult: (saved0.actResult && typeof saved0.actResult === 'object') ? saved0.actResult : {},
    layout: 'byweek',
    search: '',
    activeTypes: [],
    activeWeek: null,
    sort: 'week',
    detailId: null,
    compareIds: [],
    saved: Array.isArray(saved0.saved) ? saved0.saved : [],
    introOpen: true,
    savedView: false,
    lens: 'thematic',
    cmpNotes: (saved0.cmpNotes && typeof saved0.cmpNotes === 'object') ? saved0.cmpNotes : {},
    exampleOpen: false,
    rcReading: null,
    rcNotes: (saved0.rcNotes && typeof saved0.rcNotes === 'object') ? saved0.rcNotes : {},
    revealed: {},
    mcSel: (saved0.mcSel && typeof saved0.mcSel === 'object') ? saved0.mcSel : {},
    mcConf: (saved0.mcConf && typeof saved0.mcConf === 'object') ? saved0.mcConf : {},
    kcReveal: {},
    kcShort: (saved0.kcShort && typeof saved0.kcShort === 'object') ? saved0.kcShort : {},
    kcShortShown: {},
    kcShortRate: (saved0.kcShortRate && typeof saved0.kcShortRate === 'object') ? saved0.kcShortRate : {},
    kcHist: (saved0.kcHist && typeof saved0.kcHist === 'object') ? saved0.kcHist : {},
    careerField: resumeView0 ? (view0.careerField || '') : '',
    careerReflect: (saved0.careerReflect && typeof saved0.careerReflect === 'object') ? saved0.careerReflect : {},
    mediaNotes: (saved0.mediaNotes && typeof saved0.mediaNotes === 'object') ? saved0.mediaNotes : {},
    libScroll: 0,
    toast: null,
    cardWeek: resumeView0 ? cleanWeek(view0.cardWeek) : null,
    glossWeek: resumeView0 ? (view0.glossWeek || 'all') : 'all',
    glossSearch: resumeView0 ? (view0.glossSearch || '') : '',
    videoWeek: resumeView0 ? (view0.videoWeek || 'all') : 'all',
    mediaKind: resumeView0 ? (view0.mediaKind || 'all') : 'all',
    mapLayer: resumeView0 ? (view0.mapLayer || 'admin') : 'admin',
    mapRegion: resumeView0 ? (view0.mapRegion || 'mikmaki-lawrence') : 'mikmaki-lawrence',
    mapNotes: (saved0.mapNotes && typeof saved0.mapNotes === 'object') ? saved0.mapNotes : {},
    tickerPaused: false,
  };
  if (resumeView0) {
    state.activityReturn = cleanWeek(view0.activityReturn);
    state.detailId = view0.detailId || null;
    state.activeTypes = Array.isArray(view0.activeTypes) ? view0.activeTypes : [];
    state.activeWeek = cleanWeek(view0.activeWeek);
    state.search = view0.search || '';
    state.savedView = !!view0.savedView;
    state.rcReading = view0.rcReading || null;
    state.lens = view0.lens || state.lens || 'thematic';
    state.compareIds = Array.isArray(view0.compareIds) ? view0.compareIds : [];
    state.galWeek = cleanWeek(view0.galWeek);
    state.galTopic = view0.galTopic || null;
  }
  function saveView() {
    try {
      sessionStorage.setItem(VKEY, JSON.stringify({
        screen: state.screen,
        prevView: state.prevView || null,
        journeyWeek: state.journeyWeek,
        stationWeek: state.stationWeek,
        activityReturn: state.activityReturn,
        detailId: state.detailId,
        cardWeek: state.cardWeek,
        careerField: state.careerField,
        activeTypes: state.activeTypes || [],
        activeWeek: state.activeWeek,
        search: state.search || '',
        savedView: !!state.savedView,
        rcReading: state.rcReading,
        lens: state.lens || 'thematic',
        compareIds: state.compareIds || [],
        galWeek: state.galWeek,
        galTopic: state.galTopic,
        glossWeek: state.glossWeek || 'all',
        glossSearch: state.glossSearch || '',
        mapLayer: state.mapLayer || 'admin',
        mapRegion: state.mapRegion || 'mikmaki-lawrence',
        act: state.act || {},
        videoWeek: state.videoWeek || 'all',
        mediaKind: state.mediaKind || 'all'
      }));
    } catch (e) {}
  }
  window.addEventListener('pagehide', saveView);
  window.addEventListener('beforeunload', saveView);
  window.addEventListener('keydown', function (e) {
    var k = String(e.key || '').toLowerCase();
    if (((e.ctrlKey || e.metaKey) && e.shiftKey && k === 'r') || (e.ctrlKey && k === 'f5')) {
      try { sessionStorage.setItem(HKEY, '1'); sessionStorage.removeItem(VKEY); } catch (err) {}
    }
  }, true);
  var refocusSearch = false, focusTarget = null, toastTimer = null;

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function typeMeta(t) { return D.types[t] || D.types.Article; }
  function rec(id) { for (var i = 0; i < D.records.length; i++) if (D.records[i].id === id) return D.records[i]; return null; }
  var OPENSTAX_CH = {
    'soc-intro': 'https://openstax.org/books/introduction-sociology-3e/pages/1-introduction',
    'soc-research': 'https://openstax.org/books/introduction-sociology-3e/pages/2-introduction',
    'soc-socialization': 'https://openstax.org/books/introduction-sociology-3e/pages/5-introduction',
    'soc-stratification': 'https://openstax.org/books/introduction-sociology-3e/pages/9-introduction',
    'soc-family': 'https://openstax.org/books/introduction-sociology-3e/pages/14-introduction',
    'anth-culture': 'https://openstax.org/books/introduction-anthropology/pages/3-introduction',
    'psy-intro': 'https://openstax.org/books/psychology-2e/pages/1-introduction',
    'psy-social': 'https://openstax.org/books/psychology-2e/pages/12-introduction'
  };
  // Only free, openly accessible readings get a public link. Copyrighted or
  // library readings (access 'verified' or 'library') are reached through
  // Blackboard or the Seneca Library, never linked or hosted here (copyright).
  function readUrl(r) {
    return r.pdfUrl || r.url || (r.doi ? 'https://doi.org/' + r.doi : null);
  }
  function sourceUrl(r) {
    var primary = readUrl(r);
    var source = r.sourceUrl || r.landingUrl || r.recordUrl || ((r.pdfUrl && r.url) ? r.url : null) || (r.doi ? 'https://doi.org/' + r.doi : null);
    return (source && source !== primary) ? source : null;
  }
  function sourceLabel(r) {
    if (r.sourceLabel) return r.sourceLabel;
    return r.doi ? 'Source page / DOI' : 'Source page';
  }
  function sourceButton(r) {
    if (!sourceUrl(r)) return '';
    return '<button onclick="SOC.source(\'' + r.id + '\')" style="width:100%;margin:8px 0 9px;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#fff;border:1px solid #DEE3EA;color:#1552D8;border-radius:9px;padding:9px 11px;font-size:.8125rem;font-weight:600;cursor:pointer">' + esc(sourceLabel(r)) + '<span style="display:flex">' + ic('external', 14) + '</span></button>';
  }
  function isPdfReading(r) {
    var u = readUrl(r) || '';
    return !!r.pdfUrl || /\.pdf($|[?#])/i.test(u) || /\/article\/download\/|\/servlets\/purl\/|arxiv\.org\/pdf|EIMJ20241604_09|\/jonus\/index\.php\/jonus\/article\/download\//.test(u);
  }
  function readLabel(r) {
    if (r.fulltext === false) return 'Find it in the Seneca Library';
    return isPdfReading(r) ? 'Open the PDF' : 'Open the reading';
  }
  function accessNote(r) {
    if (r.access === 'openstax') return 'Free and open on OpenStax. Opens in a new tab.';
    if (r.access === 'open') return 'Open access. Opens in a new tab.';
    if (r.access === 'library') return 'A licensed reading. Read it through the Seneca Library, and in this week\'s Readings folder on Blackboard.';
    return 'Posted in this week\'s Readings folder on Blackboard.';
  }
  function eyeLabel(r) { return r.eye === 'indigenous' ? 'Indigenous-scholar reading' : 'Western reading'; }
  function weekTitle(n) { return (D.weeks && D.weeks[n]) ? D.weeks[n] : ''; }
  function weeksWithReadings() { var set = {}; D.records.forEach(function (r) { set[r.week] = (set[r.week] || 0) + 1; }); return Object.keys(set).map(Number).sort(function (a, b) { return a - b; }); }
  function weeksWithContent() { var set = {}; D.records.forEach(function (r) { set[r.week] = 1; }); (D.glossary || []).forEach(function (g) { if (g.week != null) set[g.week] = 1; }); return Object.keys(set).map(Number).sort(function (a, b) { return a - b; }); }

  var ICON = {
    help: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 8v5', 'M12 16h.01'],
    book: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z', 'M4 18.5A2.5 2.5 0 0 1 6.5 16H20'],
    file: ['M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8z', 'M14 3v5h5'],
    clipboard: ['M9 4.5h6v3H9z', 'M9 6H6v15h12V6h-3'],
    search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z', 'M20 20l-4-4'],
    x: ['M6 6l12 12', 'M18 6L6 18'],
    check: ['M4 12.5l5 5 11-11'],
    bookmark: ['M6 3h12v18l-6-4-6 4z'],
    grid: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
    list: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
    layers: ['M12 3l9 5-9 5-9-5z', 'M3 13l9 5 9-5'],
    columns: ['M4 4h7v16H4z', 'M13 4h7v16h-7z'],
    sparkle: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z'],
    chevron: ['M9 6l6 6-6 6'],
    external: ['M14 4h6v6', 'M20 4l-9 9', 'M19 14v5H5V5h5'],
    plus: ['M12 5v14', 'M5 12h14'],
    clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
    globe: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20', 'M12 2a15 15 0 0 0 0 20'],
    gauge: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 12l4-3'],
    calendar: ['M5 5h14v15H5z', 'M5 9h14', 'M9 3v4', 'M15 3v4'],
    type: ['M4 7V5h16v2', 'M9 19h6', 'M12 5v14'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    unlock: ['M7 11V8a5 5 0 0 1 9.9-1', 'M5 11h14v10H5z'],
    play: ['M7 5l11 7-11 7z'],
    gallery: ['M3 5h18v14H3z', 'M3 16l5-5 4 4 3-3 6 6', 'M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2'],
  };
  function ic(name, size, w) {
    var paths = ICON[name] || ICON.file, s = size || 20;
    var out = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    for (var i = 0; i < paths.length; i++) out += '<path d="' + paths[i] + '"></path>';
    return out + '</svg>';
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function announce(msg) {
    var lr = document.getElementById('soc-live');
    if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = msg; }, 30); }
  }
  function readerLensButton() {
    var on = !!state.rlPanelOpen;
    var rn = rlActiveCount();
    return '<button type="button" class="reader-lens-btn' + (on ? ' on' : '') + '" onclick="SOC.rlPanel()" aria-pressed="' + (on ? 'true' : 'false') + '" aria-expanded="' + (on ? 'true' : 'false') + '" aria-label="Reading Lens: open reading supports' + (rn ? ', ' + rn + ' support' + (rn === 1 ? '' : 's') + ' active' : '') + '" title="Reading Lens: text size, spacing, font, tint, ruler, magnifier, read aloud">' + ic('search', 17, 2) + '<span class="reader-lens-label">Reading Lens</span>' + (rn ? '<span class="rl-count" aria-hidden="true">' + rn + '</span>' : '') + '</button>'
      + (('speechSynthesis' in window) ? '<button type="button" class="reader-lens-btn listen-btn' + (rlSpeaking ? ' on' : '') + '" onclick="SOC.listenMenu()" aria-pressed="' + (rlSpeaking ? 'true' : 'false') + '" aria-label="' + (rlSpeaking ? 'Stop reading this page aloud' : 'Listen: open the read aloud controls') + '"><span aria-hidden="true">' + (rlSpeaking ? '&#9632;' : '&#9654;') + '</span><span class="reader-lens-label">' + (rlSpeaking ? 'Stop' : 'Listen') + '</span></button>' : '');
  }
  function rlLangLabel(tag) {
    var t = String(tag || '').replace('_', '-');
    var MAP = {
      'en-US': 'English, United States', 'en-GB': 'English, United Kingdom', 'en-CA': 'English, Canada',
      'en-AU': 'English, Australia', 'en-IN': 'English, India', 'en-NG': 'English, Nigeria',
      'en-ZA': 'English, South Africa', 'en-KE': 'English, Kenya', 'en-IE': 'English, Ireland',
      'en-JM': 'English, Jamaica', 'en-TT': 'English, Trinidad and Tobago', 'en-GH': 'English, Ghana',
      'fr-FR': 'French, France', 'fr-CA': 'French, Canada', 'es-ES': 'Spanish, Spain', 'es-MX': 'Spanish, Mexico',
      'es-US': 'Spanish, United States', 'pt-BR': 'Portuguese, Brazil', 'pt-PT': 'Portuguese, Portugal',
      'zh-CN': 'Chinese, Mainland', 'zh-HK': 'Chinese, Hong Kong', 'zh-TW': 'Chinese, Taiwan',
      'hi-IN': 'Hindi', 'pa-IN': 'Punjabi', 'ta-IN': 'Tamil', 'ur-PK': 'Urdu', 'ar-SA': 'Arabic',
      'sw-KE': 'Swahili', 'am-ET': 'Amharic', 'yo-NG': 'Yoruba', 'ig-NG': 'Igbo', 'ha-NG': 'Hausa',
      'so-SO': 'Somali', 'vi-VN': 'Vietnamese', 'tl-PH': 'Filipino', 'fa-IR': 'Persian', 'ru-RU': 'Russian',
      'uk-UA': 'Ukrainian', 'pl-PL': 'Polish', 'de-DE': 'German', 'it-IT': 'Italian', 'ko-KR': 'Korean', 'ja-JP': 'Japanese'
    };
    return MAP[t] || t;
  }
  function rlVoiceSelect(r) {
    try {
      var vs = (window.speechSynthesis.getVoices() || []).slice();
      if (!vs.length) return '<span class="rl-hint">Your browser has not shared its voice list yet.</span>' + rlBtn('', 'Load voices', false, 'SOC.rlVoicesRefresh()');
      vs.sort(function (x, y) {
        var xe = String(x.lang).indexOf('en') === 0 ? 0 : 1;
        var ye = String(y.lang).indexOf('en') === 0 ? 0 : 1;
        if (xe !== ye) return xe - ye;
        if (x.lang !== y.lang) return String(x.lang) < String(y.lang) ? -1 : 1;
        return String(x.name) < String(y.name) ? -1 : 1;
      });
      return '<select class="rl-voice" aria-label="Read aloud voice and language" onchange="SOC.rlVoice(this.value)"><option value="">Default voice</option>'
        + vs.map(function (v) { var vn = String(v.name).split(' - ')[0].replace(/\s*\([^)]*\)\s*$/, ''); return '<option value="' + esc(v.voiceURI) + '"' + (r.voice === v.voiceURI ? ' selected' : '') + '>' + esc(rlLangLabel(v.lang) + ': ' + vn) + '</option>'; }).join('')
        + '</select>'
        + '<details class="sc-how" style="margin-top:6px"><summary>About voices and languages</summary><p>This reads the page\'s own words aloud, so the words stay in English: picking a voice changes the accent and pronunciation, not the language of the text. Voices come from your own device, so the list differs by phone or computer. Every voice on your device is listed, in a range of tones and styles, labelled only by region and name. Pick whichever sounds most like your community, or simply the one you find easiest to listen to; you can add more voices in your device settings.</p></details>';
    } catch (e) { return ''; }
  }
  function rlActiveCount() {
    var r = rlState(), n = 0;
    if (r.zoom !== 100) n++;
    if (r.space) n++;
    if (r.font) n++;
    if (r.tint !== 'none') n++;
    if (r.ruler) n++;
    if (state.readerLensOpen) n++;
    return n;
  }
  function readerLensOverlay() {
    if (!state.readerLensOpen) return '';
    return '<section id="reader-lens-dock" class="rl-dock" role="region" aria-label="Reading magnifier">'
      + '<div class="rl-dock-head"><strong>' + ic('search', 15, 2) + ' Magnifier</strong>'
      + '<span class="rl-dock-hint">Shows the text under your pointer in large print. Keyboard: Tab to any item and it appears here. Escape turns it off.</span>'
      + '<button type="button" class="rl-btn rl-close" onclick="SOC.toggleReaderLens()" aria-label="Turn magnifier off">' + ic('x', 15, 2) + '</button></div>'
      + '<div id="reader-lens-copy" class="rl-dock-copy" aria-hidden="true">Move your pointer over any text, or Tab through the page.</div>'
      + '</section>';
  }
  var rlDockRaf = 0;
  function readerLensTextAt(x, y) {
    var dock = document.getElementById('reader-lens-dock');
    var stack = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [document.elementFromPoint(x, y)];
    var allowed = /^(p|li|h1|h2|h3|h4|h5|h6|blockquote|td|th|figcaption|label|button|a|summary|small|strong|b)$/;
    for (var i = 0; i < stack.length; i++) {
      var node = stack[i];
      if (dock && dock.contains(node)) continue;
      while (node && node !== document.body) {
        if (dock && dock.contains(node)) break;
        var tag = String(node.tagName || '').toLowerCase();
        if (allowed.test(tag)) {
          var text = (node.textContent || '').replace(/\\s+/g, ' ').trim();
          if (text) return text.length > 700 ? text.slice(0, 697) + '...' : text;
        }
        node = node.parentElement;
      }
    }
    return '';
  }
  function rlDockShow(text) {
    var out = document.getElementById('reader-lens-copy');
    if (out && text) out.textContent = text;
  }
  function rlDockPointer(e) {
    if (rlDockRaf) return;
    var x = e.clientX, y = e.clientY;
    rlDockRaf = requestAnimationFrame(function () {
      rlDockRaf = 0;
      rlDockShow(readerLensTextAt(x, y));
    });
  }
  function rlDockFocus(e) {
    var dock = document.getElementById('reader-lens-dock');
    if (!e.target || (dock && dock.contains(e.target))) return;
    var text = (e.target.textContent || e.target.getAttribute && e.target.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim();
    if (text) rlDockShow(text.length > 700 ? text.slice(0, 697) + '...' : text);
  }
  function rlDockKey(e) {
    if (e.key === 'Escape' && state.readerLensOpen) { SOC.toggleReaderLens(); }
  }
  function rlDockWire(on) {
    if (on) {
      document.addEventListener('pointermove', rlDockPointer, true);
      document.addEventListener('pointerdown', rlDockPointer, true);
      document.addEventListener('focusin', rlDockFocus, true);
      document.addEventListener('keydown', rlDockKey, true);
    } else {
      document.removeEventListener('pointermove', rlDockPointer, true);
      document.removeEventListener('pointerdown', rlDockPointer, true);
      document.removeEventListener('focusin', rlDockFocus, true);
      document.removeEventListener('keydown', rlDockKey, true);
    }
  }

  /* ---------- Reading Supports (Reading Lens v2) ---------- */
  function rlState() {
    if (!state.rl || typeof state.rl !== 'object') state.rl = {};
    var r = state.rl;
    if (r.zoom === 85 || r.zoom === 92) r.zoom = 87;
    if ([75, 87, 100, 115, 130, 150, 175].indexOf(r.zoom) < 0) r.zoom = 100;
    if (['s', 'm', 'l'].indexOf(r.rulerH) < 0) r.rulerH = 'm';
    if (r.rate === 85) r.rate = 75;
    if (r.rate === 115) r.rate = 125;
    if ([50, 75, 100, 125, 150, 200].indexOf(r.rate) < 0) r.rate = 100;
    if (['none', 'warm', 'cream', 'yellow', 'peach', 'rose', 'green', 'blue', 'lilac', 'grey'].indexOf(r.tint) < 0) r.tint = 'none';
    r.space = !!r.space; r.font = !!r.font; r.ruler = !!r.ruler;
    if ([85, 100, 115].indexOf(r.rate) < 0) r.rate = 100;
    return r;
  }
  var rlRulerY = 220, rlRulerRaf = 0, rlSpeaking = false, rlSpeakIdx = -1, rlSpeakBlocks = [];
  function rlRefocus() { setTimeout(function () { var p = document.getElementById('rl-panel'); if (p) p.focus(); }, 0); }
  function rlApply() {
    var r = rlState(), root = document.documentElement;
    ['rl-z75', 'rl-z87', 'rl-z115', 'rl-z130', 'rl-z150', 'rl-z175'].forEach(function (c) { root.classList.remove(c); });
    if (r.zoom !== 100) root.classList.add('rl-z' + r.zoom);
    root.classList.toggle('rl-space', r.space);
    root.classList.toggle('rl-font', r.font);
    var tint = document.getElementById('rl-tint');
    if (r.tint !== 'none') {
      if (!tint) { tint = document.createElement('div'); tint.id = 'rl-tint'; document.body.appendChild(tint); }
      tint.style.background = ({ warm: 'rgba(255,183,106,.42)', cream: 'rgba(255,236,190,.34)', yellow: 'rgba(255,246,153,.32)', peach: 'rgba(255,214,182,.32)', rose: 'rgba(255,205,216,.30)', green: 'rgba(198,236,203,.32)', blue: 'rgba(199,222,255,.34)', lilac: 'rgba(222,208,255,.30)', grey: 'rgba(214,219,227,.4)' })[r.tint] || 'rgba(214,219,227,.4)';
      tint.style.mixBlendMode = (r.tint === 'warm') ? 'multiply' : '';
    } else if (tint) { tint.remove(); }
    rlRulerApply();
  }
  function rlRulerParts() {
    return { top: document.getElementById('rl-ruler-top'), band: document.getElementById('rl-ruler-band'), bot: document.getElementById('rl-ruler-bot') };
  }
  function rlRulerApply() {
    var r = rlState(), p = rlRulerParts();
    if (r.ruler) {
      if (!p.top) {
        ['rl-ruler-top', 'rl-ruler-band', 'rl-ruler-bot'].forEach(function (id) {
          var d = document.createElement('div'); d.id = id; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d);
        });
        document.addEventListener('pointermove', rlRulerFollow, true);
        document.addEventListener('pointerdown', rlRulerDragStart, true);
        document.addEventListener('pointerup', rlRulerDragEnd, true);
        document.addEventListener('keydown', rlRulerKeys, true);
      }
      rlRulerPosition();
    } else if (p.top) {
      p.top.remove(); p.band.remove(); p.bot.remove();
      document.removeEventListener('pointermove', rlRulerFollow, true);
      document.removeEventListener('pointerdown', rlRulerDragStart, true);
      document.removeEventListener('pointerup', rlRulerDragEnd, true);
      document.removeEventListener('keydown', rlRulerKeys, true);
    }
  }
  function rlRulerPosition() {
    var p = rlRulerParts();
    if (!p.top) return;
    var r = rlState();
    var fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    var half = Math.round(fs * (r.rulerH === 's' ? 1.05 : r.rulerH === 'l' ? 2.6 : 1.6));
    var y = Math.max(70, Math.min(window.innerHeight - 40, rlRulerY));
    p.top.style.cssText = 'position:fixed;left:0;right:0;top:0;height:' + Math.max(0, y - half) + 'px;pointer-events:none;z-index:61;background:rgba(27,42,74,.32)';
    p.band.style.cssText = 'position:fixed;left:0;right:0;top:' + (y - half) + 'px;height:' + (half * 2) + 'px;' + (rlState().rulerPin ? 'pointer-events:auto;cursor:grab;' : 'pointer-events:none;') + 'z-index:62;border-top:2px solid rgba(218,41,28,.7);border-bottom:2px solid rgba(218,41,28,.7)';
    p.bot.style.cssText = 'position:fixed;left:0;right:0;top:' + (y + half) + 'px;bottom:0;pointer-events:none;z-index:61;background:rgba(27,42,74,.32)';
  }
  var rlRulerDragging = false;
  function rlRulerFollow(e) {
    if (rlState().rulerPin && !rlRulerDragging) return;
    rlRulerY = e.clientY;
    if (!rlRulerRaf) rlRulerRaf = requestAnimationFrame(function () { rlRulerRaf = 0; rlRulerPosition(); });
  }
  function rlRulerDragStart(e) {
    if (e.target && e.target.id === 'rl-ruler-band' && rlState().rulerPin) {
      rlRulerDragging = true;
      e.preventDefault();
    }
  }
  function rlRulerDragEnd() { rlRulerDragging = false; }
  function rlRulerKeys(e) {
    if (!e.altKey || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
    e.preventDefault();
    rlRulerY += (e.key === 'ArrowDown' ? 34 : -34);
    rlRulerPosition();
  }
  function rlSpeakStop() {
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    rlSpeaking = false; rlSpeakIdx = -1;
    var cur = document.querySelector('.rl-reading-now');
    if (cur) cur.classList.remove('rl-reading-now');
    var b = document.getElementById('rl-speak-btn');
    if (b) { b.setAttribute('aria-pressed', 'false'); b.textContent = 'Read this page aloud'; }
    rlListenBtnSync();
  }
  function rlListenBtnSync() {
    Array.prototype.forEach.call(document.querySelectorAll('.listen-btn'), function (lb) {
      lb.classList.toggle('on', rlSpeaking);
      lb.setAttribute('aria-pressed', String(rlSpeaking));
      lb.setAttribute('aria-label', rlSpeaking ? 'Stop reading this page aloud' : 'Listen: read this page aloud');
      lb.innerHTML = '<span aria-hidden="true">' + (rlSpeaking ? '&#9632;' : '&#9654;') + '</span><span class="reader-lens-label">' + (rlSpeaking ? 'Stop' : 'Listen') + '</span>';
    });
  }
  function rlSpeakNext() {
    if (!rlSpeaking) return;
    rlSpeakIdx++;
    var prev = document.querySelector('.rl-reading-now');
    if (prev) prev.classList.remove('rl-reading-now');
    if (rlSpeakIdx >= rlSpeakBlocks.length) { rlSpeakStop(); announce('Finished reading the page aloud.'); return; }
    var el = rlSpeakBlocks[rlSpeakIdx];
    if (!el || !el.isConnected) { rlSpeakNext(); return; }
    el.classList.add('rl-reading-now');
    var reduced = false;
    try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
    try { el.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); } catch (e) {}
    var u = new SpeechSynthesisUtterance(el.textContent.replace(/\s+/g, ' ').trim().slice(0, 2000));
    u.rate = rlState().rate / 100;
    try {
      var vsel = rlState().voice;
      if (vsel) {
        var vv = (window.speechSynthesis.getVoices() || []).filter(function (v) { return v.voiceURI === vsel; })[0];
        if (vv) { u.voice = vv; u.lang = vv.lang; }
      }
    } catch (e) {}
    u.onend = function () { setTimeout(rlSpeakNext, 120); };
    u.onerror = function () { rlSpeakStop(); };
    try { window.speechSynthesis.speak(u); } catch (e) { rlSpeakStop(); }
  }
  function rlSpeakToggle() {
    if (!('speechSynthesis' in window)) { announce('Read aloud is not available in this browser.'); return; }
    if (rlSpeaking) { rlSpeakStop(); announce('Stopped reading aloud.'); return; }
    var main = document.getElementById('soc-main');
    if (!main) return;
    rlSpeakBlocks = Array.prototype.slice.call(main.querySelectorAll('h1, h2, h3, h4, p, li'))
      .filter(function (el) { return el.offsetParent !== null && el.textContent.replace(/\s+/g, ' ').trim().length > 2; });
    if (!rlSpeakBlocks.length) { announce('Nothing to read on this page.'); return; }
    rlSpeaking = true; rlSpeakIdx = -1;
    var b = document.getElementById('rl-speak-btn');
    if (b) { b.setAttribute('aria-pressed', 'true'); b.textContent = 'Stop reading aloud'; }
    rlListenBtnSync();
    announce('Reading the page aloud from the top.');
    rlSpeakNext();
  }
  function rlBtn(id, label, pressed, handler, extra) {
    return '<button type="button" id="' + (id || '') + '" class="rl-btn" aria-pressed="' + (pressed ? 'true' : 'false') + '" onclick="' + handler + '"' + (extra || '') + '>' + label + '</button>';
  }
  function listenOverlay() {
    if (!state.listenOpen) return '';
    var r = rlState();
    return '<div class="rl-panel listen-pop" role="dialog" aria-label="Listen to this page">'
      + '<div class="rl-head"><strong>Listen</strong><button type="button" class="rl-btn rl-close" onclick="SOC.listenMenu()" aria-label="Close listen controls">' + ic('x', 16, 2) + '</button></div>'
      + '<div class="rl-row"><b>Voice and language</b>' + rlVoiceSelect(r) + '</div>'
      + '<div class="rl-row"><b>Speed</b>' + [50, 75, 100, 125, 150, 200].map(function (v) { return rlBtn('', v === 100 ? '1x' : (v / 100) + 'x', r.rate === v, 'SOC.rlRate(' + v + ')'); }).join('') + '</div>'
      + '<button type="button" id="listen-play" class="wk-cta" style="margin:12px 0 0;width:100%" onclick="SOC.listenGo()">Read this page aloud</button>'
      + '</div>';
  }
  function rlPanelOverlay() {
    if (!state.rlPanelOpen) return '';
    var r = rlState();
    var zoomBtns = [75, 87, 100, 115, 130, 150, 175].map(function (z) {
      return rlBtn('', z === 75 ? 'Smaller' : z === 87 ? 'Small' : z === 100 ? 'Default' : z + '%', r.zoom === z, "SOC.rlZoom(" + z + ")");
    }).join('');
    var tintBtns = [['none', 'None'], ['warm', 'Blue light filter'], ['cream', 'Cream'], ['yellow', 'Yellow'], ['peach', 'Peach'], ['rose', 'Rose'], ['green', 'Green'], ['blue', 'Blue'], ['lilac', 'Lilac'], ['grey', 'Grey']].map(function (t) {
      return rlBtn('', t[1], r.tint === t[0], "SOC.rlTint('" + t[0] + "')");
    }).join('');
    var speech = ('speechSynthesis' in window)
      ? '<div class="rl-row"><b>Listen</b>' + rlBtn('rl-speak-btn', rlSpeaking ? 'Stop reading aloud' : 'Read this page aloud', rlSpeaking, 'SOC.rlSpeak()')
        + [50, 75, 100, 125, 150, 200].map(function (v) { return rlBtn('', v === 100 ? '1x' : (v / 100) + 'x', r.rate === v, 'SOC.rlRate(' + v + ')'); }).join('') + '</div>'
        + '<div class="rl-row"><b>Voice and language</b>' + rlVoiceSelect(r) + '</div>'
      : '';
    return '<section id="rl-panel" class="rl-panel" role="dialog" aria-label="Reading Lens: reading supports" tabindex="-1" onkeydown="SOC.rlPanelKey(event)">'
      + '<div class="rl-head"><strong>Reading Lens</strong><button type="button" class="rl-btn rl-close" onclick="SOC.rlPanel()" aria-label="Close Reading Lens panel">' + ic('x', 16, 2) + '</button></div>'
      + '<p class="rl-sub">Reading supports for this site. Your choices apply everywhere here and save only in this browser.</p>'
      + '<div class="rl-row"><b>Text size</b>' + zoomBtns + '</div>'
      + '<div class="rl-row"><b>Comfortable spacing</b>' + rlBtn('', r.space ? 'On' : 'Off', r.space, 'SOC.rlSpace()') + '</div>'
      + '<div class="rl-row"><b>High-legibility font</b>' + rlBtn('', r.font ? 'On' : 'Off', r.font, 'SOC.rlFont()') + '</div>'
      + '<div class="rl-row"><b>Page tint</b>' + tintBtns + '</div>'
      + '<div class="rl-row"><b>Reading ruler</b>' + rlBtn('', r.ruler ? 'On' : 'Off', r.ruler, 'SOC.rlRuler()')
      + (r.ruler ? [['s', 'Narrow'], ['m', 'Medium'], ['l', 'Wide']].map(function (h) { return rlBtn('', h[1], r.rulerH === h[0], "SOC.rlRulerH('" + h[0] + "')"); }).join('') + rlBtn('', r.rulerPin ? 'Pinned' : 'Pin in place', !!r.rulerPin, 'SOC.rlRulerPin()') : '')
      + '<span class="rl-hint">' + (r.rulerPin ? 'Pinned: drag the band by hand, or press Alt plus Up or Down.' : 'Follows your pointer. Pin it to drag it by hand. Alt plus Up or Down also moves it.') + '</span></div>'
      + '<div class="rl-row"><b>Magnifier</b>' + rlBtn('', state.readerLensOpen ? 'On' : 'Off', !!state.readerLensOpen, 'SOC.toggleReaderLens()') + '<span class="rl-hint">A movable lens that repeats the text under it in large print.</span></div>'
      + speech
      + '<div class="rl-row"><b>Start fresh</b>' + rlBtn('', 'Reset all supports', false, 'SOC.rlReset()') + '<span class="rl-hint">Everything back to default. Your settings otherwise stay on, even with this panel closed, and are remembered for your next visit.</span></div>'
      + '<p class="rl-hint" style="margin:10px 0 0">Escape closes this panel. If any part of the site is still hard to use, use Blackboard and contact the instructor so access can be supported.</p>'
      + '</section>';
  }

  /* ---------- filtering + sorting ---------- */
  function filtered() {
    var q = state.search.trim().toLowerCase();
    var base = state.savedView ? D.records.filter(function (r) { return state.saved.indexOf(r.id) >= 0; }) : D.records;
    var list = base.filter(function (r) {
      if (state.activeTypes.length && state.activeTypes.indexOf(r.type) < 0) return false;
      if (state.activeWeek != null && r.week !== state.activeWeek) return false;
      if (q) {
        var hay = (r.title + ' ' + r.authors + ' ' + r.abstract + ' ' + r.coreIdea + ' ' + r.type + ' Week ' + r.week + ' ' + weekTitle(r.week)).toLowerCase();
        if (hay.indexOf(q) < 0) return false;
      }
      return true;
    });
    var by = state.sort;
    list.sort(function (a, b) {
      return by === 'year' ? b.year - a.year : by === 'title' ? a.title.localeCompare(b.title) : by === 'type' ? (a.type.localeCompare(b.type) || a.week - b.week) : (a.week - b.week || (a.eye === b.eye ? 0 : a.eye === 'western' ? -1 : 1));
    });
    return list;
  }

  /* ---------- style builders ---------- */
  function saveBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid ' + (on ? '#f0d89a' : '#DEE3EA') + ';background:' + (on ? '#FCEFD2' : '#fff') + ';color:' + (on ? '#B7791F' : '#6B7280') + ';flex:none'; }
  function cmpBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid ' + (on ? '#bcd0f2' : '#DEE3EA') + ';background:' + (on ? '#E7EEFB' : '#fff') + ';color:' + (on ? '#1552D8' : '#6B7280') + ';flex:none'; }
  function chipStyle(active, accent) { return 'display:inline-flex;align-items:center;gap:6px;border:1px solid ' + (active ? accent : '#DEE3EA') + ';background:' + (active ? accent + '22' : '#fff') + ';color:' + (active ? '#15171C' : '#474C57') + ';font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';padding:6px 11px;border-radius:999px'; }
  function segStyle(active) { return 'border:none;border-radius:7px;padding:6px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#fff' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';box-shadow:' + (active ? '0 1px 2px rgba(21,23,28,.12)' : 'none') + ';display:flex;align-items:center;gap:6px'; }
  function eyePill(r) {
    var ind = r.eye === 'indigenous';
    return '<span title="' + esc(eyeLabel(r)) + '" style="display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:.625rem;font-weight:600;letter-spacing:.04em;color:' + (ind ? '#1f4d38' : '#3a47a8') + ';background:' + (ind ? '#E4F0E9' : '#E7E9FB') + ';padding:3px 8px;border-radius:999px">' + (ind ? 'INDIGENOUS' : 'WESTERN') + '</span>';
  }
  function weekTag(r) { return '<span class="mono" style="font-size:.6875rem;color:#6B7280;background:#EEF1F5;padding:3px 8px;border-radius:6px">Week ' + r.week + '</span>'; }

  /* ---------- cards ---------- */
  function tileCard(r) {
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    return '<div class="card" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column">'
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="text-align:left;background:none;border:none;padding:0;display:flex;flex-direction:column;flex:1">'
      + '<div style="height:5px;background:' + tm.color + ';width:100%"></div>'
      + '<div style="padding:16px 17px 12px;flex:1;display:flex;flex-direction:column">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:11px;flex-wrap:wrap">'
      + '<span style="display:inline-flex;align-items:center;gap:6px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;letter-spacing:.03em;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 13) + esc(r.type) + '</span>'
      + eyePill(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;margin-left:auto">' + esc(String(r.year)) + '</span></div>'
      + '<h3 style="font-size:1.125rem;line-height:1.28;font-weight:600;margin:0 0 4px;color:#15171C">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:#474C57;margin-bottom:11px">' + esc(r.authors) + '</div>'
      + '<p style="font-size:.875rem;line-height:1.5;color:#474C57;margin:0 0 13px">' + esc(r.abstract) + '</p>'
      + '<div style="margin-top:auto">' + weekTag(r) + '</div>'
      + '</div></button>'
      + '<div style="display:flex;align-items:center;gap:8px;padding:11px 17px;border-top:1px solid #EEF1F5;background:#FBFCFD">'
      + '<span class="mono" style="font-size:.75rem;color:#6B7280">' + esc(r.len) + '</span>'
      + '<button onclick="SOC.compare(\'' + r.id + '\')" aria-label="' + (inC ? 'In compare' : 'Add to compare') + '" title="' + (inC ? 'In compare' : 'Add to compare') + '" style="' + cmpBtnStyle(inC) + ';margin-left:auto">' + ic('columns', 15) + '</button>'
      + '</div></div>';
  }
  function indexRow(r) {
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    return '<div class="idxrow" style="display:flex;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid #EEF1F5">'
      + '<span style="display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:9px;background:' + tm.soft + ';color:' + tm.color + ';flex:none">' + ic(tm.icon, 18) + '</span>'
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="flex:1;min-width:0;text-align:left;background:none;border:none;padding:0">'
      + '<div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><span style="font-size:1rem;font-weight:600;color:#15171C">' + esc(r.title) + '</span><span style="font-size:.8125rem;color:#474C57">' + esc(r.authors) + ' · ' + esc(String(r.year)) + '</span></div>'
      + '<div style="font-size:.8125rem;color:#6B7280;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(r.abstract) + '</div></button>'
      + eyePill(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;flex:none;width:64px;text-align:right">Week ' + r.week + '</span>'
      + '<button onclick="SOC.compare(\'' + r.id + '\')" aria-label="' + (inC ? 'In compare' : 'Add to compare') + '" style="' + cmpBtnStyle(inC) + '">' + ic('columns', 15) + '</button>'
      + '</div>';
  }

  /* ---------- chrome ---------- */
  function header() {
    return '<header style="position:sticky;top:0;z-index:40;height:62px;background:#fff;border-bottom:2px solid var(--red);display:flex;align-items:center;padding:0 22px;gap:14px;flex:none">'
      + '<button class="soc-mobile-menu" onclick="SOC.toggleNav()" aria-label="' + (state.navOpen ? 'Close course navigation' : 'Open course navigation') + '" aria-expanded="' + (state.navOpen ? 'true' : 'false') + '" style="align-items:center;justify-content:center;width:38px;height:38px;border:1px solid #DEE3EA;border-radius:10px;background:#fff;color:#474C57;flex:none">' + ic(state.navOpen ? 'x' : 'list', 18) + '</button>'
      + '<div class="soc-head-brand" style="display:flex;align-items:center;gap:10px;flex:none;min-width:0"><img src="./seneca-logo.png" alt="Seneca Polytechnic" style="height:34px;width:auto;display:block"><span class="soc-head-title" style="font-weight:600;font-size:1.0625rem;color:var(--ink);letter-spacing:0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">SOC122 Companion</span></div>'
      + readerLensButton()
      + (D.course.mode ? '<span class="mono soc-head-mode" style="font-size:.75rem;font-weight:600;color:#474C57;background:#EFF1F4;padding:5px 10px;border-radius:6px;flex:none">' + esc(D.course.mode).toUpperCase() + '</span>' : '')
      + '<span class="mono soc-head-term" style="font-size:.75rem;font-weight:600;color:var(--red);background:#F6E3E1;padding:5px 10px;border-radius:6px;flex:none">FALL 2026</span>'
      + '</header>';
  }
  function sidebar() {
    var s = state;
    var navDefs = [['journey', 'Home', 'gauge'], ['site', 'How This Site Works', 'file'], ['pathways', 'Course Pathways', 'map'], ['readings', 'Readings Library', 'gallery'], ['compare', 'Compare Readings', 'columns'], ['reading', 'Reading Practice', 'book'], ['videos', 'Videos and Podcasts', 'play'], ['glossary', 'Glossary', 'book'], ['cards', 'Concept Flashcards', 'clipboard'], ['assignments', 'Starting Your Assignment', 'clipboard'], ['career', 'Career Choices', 'globe']];
    if (D.course && D.course.frame) navDefs.push(['map', 'Personal Cartography', 'globe']);
    var btns = navDefs.map(function (d) {
      var key = d[0], active = (key === 'journey' && (s.screen === 'journey' || s.screen === 'library' || s.screen === 'station' || s.screen === 'detail')) || s.screen === key;
      var badge = '';
      if (key === 'compare' && s.compareIds.length) badge = '<span class="mono" style="font-size:.6875rem;font-weight:600;color:#1552D8;background:#E7EEFB;padding:1px 7px;border-radius:999px">' + s.compareIds.length + '</span>';
      var click = "SOC.go('" + key + "')";
      return '<button onclick="' + click + '" aria-current="' + (active ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#EEF1F5' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';text-align:left">'
        + '<span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (active ? 'var(--red)' : '#6B7280') + '">' + ic(d[2], 19) + '</span><span style="flex:1;text-align:left">' + d[1] + '</span>' + badge + '</button>';
    });
    var wkActive = s.screen === 'walkthroughs';
    var calActive = s.screen === 'calendar';
    var cal = '<button onclick="SOC.go(\'calendar\')" aria-current="' + (calActive ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (calActive ? '600' : '500') + ';background:' + (calActive ? '#EEF1F5' : 'transparent') + ';color:' + (calActive ? '#15171C' : '#474C57') + ';text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (calActive ? 'var(--red)' : '#6B7280') + '">' + ic('calendar', 19) + '</span><span style="flex:1;text-align:left">Calendar and Due Dates</span></button>';
    var walk = '<button onclick="SOC.go(\'walkthroughs\')" aria-current="' + (wkActive ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (wkActive ? '600' : '500') + ';background:' + (wkActive ? '#EEF1F5' : 'transparent') + ';color:' + (wkActive ? '#15171C' : '#474C57') + ';text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (wkActive ? 'var(--red)' : '#6B7280') + '">' + ic('layers', 19) + '</span><span style="flex:1;text-align:left">Weekly Walkthroughs</span></button>';
    var guide = '<div style="border-radius:10px;padding:10px 12px;color:#474C57"><div style="display:flex;align-items:flex-start;gap:11px;font-size:.9375rem;font-weight:500;line-height:1.25"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('file', 19) + '</span><span style="flex:1;min-width:0">Course Website Instructions</span></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 0 33px"><a href="./guide/" target="_blank" rel="noopener" style="font-size:.75rem;font-weight:600;color:#1B2A4A;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:999px;padding:4px 9px;text-decoration:none">Online guide <span aria-hidden="true">&#8599;</span></a><a href="./guide/SOC122-Companion-Guide.pdf" download style="font-size:.75rem;font-weight:600;color:#1B2A4A;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:999px;padding:4px 9px;text-decoration:none">PDF <span aria-hidden="true">&#8595;</span></a></div></div>';
    var repActive = s.screen === 'report';
    var report = '<button onclick="SOC.reportProblem()" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:500;background:transparent;color:#474C57;text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('help', 19) + '</span><span style="flex:1;text-align:left">Report a problem</span></button>';
    var nav = btns[0] + btns[1] + cal + guide + btns[2] + walk + btns.slice(3).join('') + report;
    var counts = {}; D.records.forEach(function (r) { counts[r.week] = (counts[r.week] || 0) + 1; });
    var navWeeks = [];
    for (var nw = 1; nw <= 14; nw++) navWeeks.push(nw);
    var weekNav = navWeeks.map(function (w) {
      var active = s.screen === 'station' && s.stationWeek === w;
      return '<button onclick="SOC.station(' + w + ')" style="display:flex;align-items:center;gap:9px;width:100%;border:none;border-radius:9px;padding:7px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#E6EAF1' : 'transparent') + ';color:' + (active ? '#1B2A4A' : '#474C57') + ';text-align:left">'
        + '<span class="mono" style="font-size:.6875rem;color:' + (active ? '#1B2A4A' : '#6B7280') + ';flex:none;width:18px">' + w + '</span>'
        + '<span style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(weekTitle(w)) + '</span>'
        + '<span class="mono" style="font-size:.6875rem;color:#6B7280">' + (counts[w] || 0) + '</span></button>';
    }).join('');
    return '<nav class="soc-sidebar' + (state.navOpen ? ' soc-sidebar-open' : '') + '" aria-label="Primary" style="width:240px;flex:none;border-right:1px solid #DEE3EA;background:#fff;padding:18px 14px;display:flex;flex-direction:column;gap:4px;position:sticky;top:62px;align-self:flex-start;height:calc(100vh - 62px);overflow:auto">'
      + nav
      + '<div style="margin-top:14px;padding-top:14px;border-top:1px solid #EEF1F5"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#6B7280;padding:0 12px 8px">WEEKS</div>' + weekNav + '</div>'
      + '<div style="margin-top:auto;padding:13px 12px;border-radius:12px;background:#EEF1F5"><div class="mono" style="font-size:.75rem;color:#474C57;margin-bottom:4px">SOC122</div><div style="font-size:.8125rem;color:#15171C;line-height:1.45">A living collection, week by week. A companion to Blackboard.</div></div>'
      + '</nav>';
  }

  /* ---------- library ---------- */
  function library() {
    var s = section_state();
    return s;
  }
  function section_state() {
    var s = state, list = filtered();
    var typeCounts = {}; D.records.forEach(function (r) { typeCounts[r.type] = (typeCounts[r.type] || 0) + 1; });
    var html = '<div class="rise">' + (s.introOpen ? '' : '<h1 class="vh">SOC122 source library, by week</h1>');

    if (s.introOpen) {
      var stats = [['Readings', D.records.length], ['Weeks', weeksWithReadings().length], ['Formats', Object.keys(typeCounts).length]];
      html += '<section style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;padding:28px 30px;margin-bottom:22px;position:relative;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
        + '<div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;justify-content:space-between">'
        + '<div style="flex:1;min-width:280px"><div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);margin-bottom:10px;font-weight:600">THE COURSE CORPUS</div>'
        + '<h1 style="font-size:2.125rem;line-height:1.14;font-weight:600;margin:0 0 10px;color:var(--ink)">Every reading, week by week.</h1>'
        + '<p style="font-size:1rem;line-height:1.6;color:#474C57;margin:0;">These are the readings behind SOC122, in course order, the Western eye and the Indigenous eye side by side each week. Search them, hold two against each other, and follow the course as it moves.</p></div>'
        + '<div style="display:flex;gap:10px;flex:none">' + stats.map(function (st) { return '<div style="background:#EEF1F5;border:1px solid #DEE3EA;border-radius:12px;padding:12px 16px;text-align:center;min-width:78px"><div class="mono" style="font-size:1.75rem;font-weight:600;line-height:1;color:var(--red)">' + st[1] + '</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:#474C57;margin-top:5px">' + st[0] + '</div></div>'; }).join('') + '</div></div>'
        + '<button onclick="SOC.dismissIntro()" aria-label="Dismiss" style="position:absolute;top:14px;right:14px;background:#EEF1F5;border:none;border-radius:8px;width:30px;height:30px;color:#474C57;display:flex;align-items:center;justify-content:center">' + ic('x', 16) + '</button></section>';
    }

    var layoutDefs = [['byweek', 'By week', 'layers'], ['tiles', 'Tiles', 'grid'], ['index', 'Index', 'list']];
    var layoutChips = layoutDefs.map(function (d) { return '<button onclick="SOC.layout(\'' + d[0] + '\')" title="' + d[1] + '" aria-label="' + d[1] + '" aria-pressed="' + (s.layout === d[0]) + '" style="' + segStyle(s.layout === d[0]) + '">' + ic(d[2], 15) + '<span>' + d[1] + '</span></button>'; }).join('');
    var filtersActive = s.activeTypes.length || s.activeWeek != null || s.search.trim().length || s.savedView;
    var n = list.length;
    var resultLabel = s.savedView ? ('Saved shelf · ' + n + (n === 1 ? ' reading' : ' readings')) : (s.activeWeek != null ? ('Week ' + s.activeWeek + ' · ' + n + (n === 1 ? ' reading' : ' readings')) : (n === D.records.length ? 'All ' + n + ' readings' : n + ' of ' + D.records.length));
    var weekStrip = '<div class="soc-weekstrip" style="gap:8px;overflow-x:auto;margin-bottom:16px;padding-bottom:4px" aria-label="Filter by week">' + weeksWithReadings().map(function (w) { var aw = s.activeWeek === w; return '<button onclick="SOC.week(' + w + ')" aria-pressed="' + aw + '" style="flex:none;border:1px solid ' + (aw ? '#1B2A4A' : '#DEE3EA') + ';background:' + (aw ? '#E6EAF1' : '#fff') + ';color:' + (aw ? '#1B2A4A' : '#474C57') + ';font-size:.8125rem;font-weight:' + (aw ? '600' : '500') + ';padding:8px 12px;border-radius:999px;white-space:nowrap"><span class="mono" style="opacity:.7">W' + w + '</span> ' + esc(weekTitle(w)) + '</button>'; }).join('') + '</div>';

    html += '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:center;gap:10px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:10px;padding:11px 14px">'
      + '<span style="display:flex;color:#6B7280;flex:none">' + ic('search', 18) + '</span>'
      + '<input id="soc-search" value="' + esc(s.search) + '" oninput="SOC.search(this.value)" placeholder="Search by title, author, idea, or week..." aria-label="Search readings" style="flex:1;border:none;background:none;outline:none;font-size:1rem;color:#15171C;min-width:0" />'
      + (s.search ? '<button onclick="SOC.clearSearch()" aria-label="Clear search" style="background:none;border:none;color:#6B7280;display:flex;padding:2px">' + ic('x', 16) + '</button>' : '')
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid #EEF1F5">'
      + '<span style="font-size:.8125rem;color:#474C57">' + resultLabel + '</span>'
      + (filtersActive ? '<button onclick="SOC.clearFilters()" style="background:none;border:none;color:var(--red);font-size:.8125rem;font-weight:600;padding:2px 4px">Clear</button>' : '')
      + '<div style="margin-left:auto;display:flex;gap:4px;background:#EEF1F5;border-radius:9px;padding:4px" role="group" aria-label="Layout">' + layoutChips + '</div>'
      + '</div></section>';
    html += weekStrip;

    if (n === 0) {
      html += '<div style="text-align:center;padding:70px 20px;color:#474C57"><div style="display:inline-flex;color:#C9D1DC;margin-bottom:14px">' + ic('search', 44, 1.4) + '</div><div style="font-size:1.125rem;font-weight:600;color:#15171C;margin-bottom:6px">No readings match that yet.</div><p style="margin:0 0 16px;font-size:.9375rem">Try a broader term or clear a filter.</p><button onclick="SOC.clearFilters()" style="background:#1B2A4A;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-size:.9375rem;font-weight:600">Reset filters</button></div>';
    } else if (s.layout === 'tiles') {
      html += '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(296px,1fr));gap:16px">' + list.map(tileCard).join('') + '</div>';
    } else if (s.layout === 'index') {
      html += '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04)">' + list.map(indexRow).join('') + '</div>';
    } else {
      // by week
      var weeks = {};
      list.forEach(function (r) { (weeks[r.week] = weeks[r.week] || []).push(r); });
      var order = Object.keys(weeks).map(Number).sort(function (a, b) { return a - b; });
      html += '<div style="display:flex;flex-direction:column;gap:26px">' + order.map(function (w) {
        var cards = weeks[w].map(tileCard).join('');
        return '<section><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px">'
          + '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:26px;padding:0 8px;border-radius:8px;background:#1B2A4A;color:#fff;font-family:var(--mono);font-size:.8125rem;font-weight:600;flex:none">' + w + '</span>'
          + '<h2 style="font-size:1.1875rem;font-weight:600;margin:0;color:#15171C">' + esc(weekTitle(w)) + '</h2>'
          + '<span class="mono" style="font-size:.75rem;color:#6B7280">' + weeks[w].length + (weeks[w].length === 1 ? ' reading' : ' readings') + '</span>'
          + '<div style="flex:1;height:1px;background:#EEF1F5"></div></div>'
          + '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(296px,1fr));gap:16px">' + cards + '</div></section>';
      }).join('') + '</div>';
    }
    return html + '</div>';
  }

  /* ---------- library of readings (immersive gallery) ---------- */
  function topicLabel(k) {
    var M = { twoeyed: 'Two-Eyed Seeing', facial: 'Facial Recognition', bias: 'Algorithmic Bias', policing: 'Policing', surveillance: 'Surveillance', policy: 'Law and Policy', resistance: 'Resistance and Design Justice', intersectionality: 'Intersectionality', reconciliation: 'Reconciliation', sociology: 'Sociology', anthropology: 'Anthropology', psychology: 'Psychology', family: 'Family and Kinship', stratification: 'Stratification', socialization: 'Socialization', culture: 'Culture', learning: 'Learning', memory: 'Memory and Recall', motivation: 'Motivation', cognition: 'Cognition', development: 'Development', behaviour: 'Behaviour', behavior: 'Behaviour', identity: 'Identity', education: 'Education', conditioning: 'Conditioning', emotion: 'Emotion' };
    return M[k] || (String(k).charAt(0).toUpperCase() + String(k).slice(1));
  }
  function rgTopics() {
    var seen = {}, out = [];
    D.records.forEach(function (r) { (r.themes || []).forEach(function (t) { if (!seen[t]) { seen[t] = 1; out.push(t); } }); });
    return out.sort(function (a, b) { return topicLabel(a).localeCompare(topicLabel(b)); });
  }
  function rgList() {
    var w = state.galWeek, t = state.galTopic;
    return D.records.filter(function (r) {
      if (w != null && r.week !== w) return false;
      if (t && (r.themes || []).indexOf(t) < 0) return false;
      return true;
    }).sort(function (a, b) { return (a.week - b.week) || a.title.localeCompare(b.title); });
  }
  function rgAccessBadge(r) {
    var full = r.fulltext !== false;
    var fg = full ? '#1f7a4d' : '#B7791F', bg = full ? '#E4F0E9' : '#FCEFD2';
    return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:.6875rem;font-weight:600;letter-spacing:.03em;color:' + fg + ';background:' + bg + ';padding:4px 9px;border-radius:999px">' + ic(full ? 'unlock' : 'book', 12) + (full ? 'Read online' : 'Seneca Library') + '</span>';
  }
  function rgVideoCover(r) {
    var v = r.video;
    return '<div class="rgvideo" style="position:relative;width:100%;aspect-ratio:16/9;background:#15171C;overflow:hidden">'
      + '<button onclick="SOC.playVideo(this,\'' + v.yt + '\')" aria-label="Play a talk by ' + esc(v.scholar || r.authors) + '" style="position:absolute;inset:0;width:100%;height:100%;border:none;padding:0;cursor:pointer;background:none">'
      + '<div class="vid-cover" aria-hidden="true"><span class="vid-cover-play"></span><span class="vid-cover-note">Loads only when you choose</span></div>'
      + '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><span style="display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:999px;background:rgba(218,41,28,.94);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.45)">' + ic('play', 24) + '</span></span>'
      + '<span style="position:absolute;left:0;right:0;bottom:0;padding:22px 13px 10px;background:linear-gradient(transparent,rgba(0,0,0,.9));color:#fff;text-align:left">'
      + '<span class="mono" style="display:block;font-size:.6rem;letter-spacing:.08em;color:#f3b0a8;font-weight:600;margin-bottom:2px">WATCH</span>'
      + '<span style="display:block;font-size:.8125rem;font-weight:700;line-height:1.2">' + esc(v.scholar || r.authors) + '</span>'
      + (v.title ? '<span style="display:block;font-size:.7rem;color:rgba(255,255,255,.8);line-height:1.3;margin-top:2px;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' + esc(v.title) + '</span>' : '')
      + '</span>'
      + '</button></div>';
  }
  function rgCard(r) {
    var tm = typeMeta(r.type);
    var topics = (r.themes || []).slice(0, 3).map(function (t) {
      var on = state.galTopic === t;
      return '<button onclick="SOC.galTopic(\'' + t + '\')" style="border:1px solid ' + (on ? '#DA291C' : '#DEE3EA') + ';background:' + (on ? '#F6E3E1' : '#F7F8FA') + ';color:' + (on ? '#DA291C' : '#474C57') + ';font-size:.6875rem;font-weight:600;padding:3px 9px;border-radius:999px;cursor:pointer">' + esc(topicLabel(t)) + '</button>';
    }).join('');
    return '<div class="rgcard" style="background:#fff;border:1px solid #DEE3EA;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(21,23,28,.06);display:flex;flex-direction:column">'
      + (r.video ? rgVideoCover(r) : '<div style="height:6px;background:' + tm.color + '"></div>')
      + '<div style="padding:16px 17px 15px;flex:1;display:flex;flex-direction:column">'
      + '<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:10px">'
      + '<span style="display:inline-flex;align-items:center;gap:5px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 12) + esc(r.type) + '</span>'
      + rgAccessBadge(r)
      + '<span class="mono" style="font-size:.75rem;color:#6B7280;margin-left:auto">' + esc(String(r.year)) + '</span>'
      + '</div>'
      + '<h3 style="font-size:1.0625rem;line-height:1.3;font-weight:600;margin:0 0 4px;color:#15171C">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:#474C57;margin-bottom:9px">' + esc(r.authors) + '</div>'
      + '<p style="font-size:.84rem;line-height:1.5;color:#5a616e;margin:0 0 12px">' + esc(r.coreIdea || r.abstract) + '</p>'
      + (topics ? '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:13px">' + topics + '</div>' : '')
      + (r.assigned ? '<div style="display:flex;align-items:flex-start;gap:7px;background:#FBF3F2;border:1px solid #F1D5D2;border-radius:9px;padding:8px 11px;margin:0 0 12px"><span style="display:flex;color:var(--red);flex:none;margin-top:1px">' + ic('book', 13) + '</span><span style="font-size:.78rem;line-height:1.4;color:#15171C"><span style="font-weight:700">Read:</span> ' + esc(r.assigned) + '</span></div>' : '')
      + '<div style="margin-top:auto;display:flex;align-items:center;gap:9px">'
      + '<button onclick="SOC.read(\'' + r.id + '\')" style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:var(--red);color:#fff;border:none;border-radius:10px;padding:11px;font-size:.875rem;font-weight:600;cursor:pointer">' + readLabel(r) + '<span style="display:flex">' + ic('external', 15) + '</span></button>'
      + '<button onclick="SOC.open(\'' + r.id + '\')" title="Details" aria-label="Open details" style="display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:10px;border:1px solid #DEE3EA;background:#fff;color:#474C57;cursor:pointer;flex:none">' + ic('chevron', 18) + '</button>'
      + '</div>'
      + sourceButton(r)
      + '<div style="margin-top:10px;display:flex;align-items:center;gap:7px">' + weekTag(r) + ((D.course && D.course.frame) ? eyePill(r) : '') + '</div>'
      + '</div></div>';
  }
  function readingsGallery() {
    var s = state, list = rgList();
    var nFull = D.records.filter(function (r) { return r.fulltext !== false; }).length;
    var nVid = D.records.filter(function (r) { return !!r.video; }).length;
    var weeks = weeksWithReadings(), topics = rgTopics();
    var stats = [['Readings', D.records.length], ['Read online', nFull]];
    if (nVid) stats.push(['Scholar talks', nVid]);
    var hero = '<section style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;padding:26px 30px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;justify-content:space-between">'
      + '<div style="flex:1;min-width:280px">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:10px">LIBRARY OF READINGS</div>'
      + '<h1 style="font-size:2.125rem;line-height:1.14;font-weight:600;margin:0 0 10px;color:var(--ink)">Open every source online.</h1>'
      + '<p style="font-size:1rem;line-height:1.6;color:#474C57;margin:0;">Click any reading to open the full text in a new tab, watch the scholars speak, and filter the collection by week or by topic.</p></div>'
      + '<div style="display:flex;gap:10px;flex:none">'
      + stats.map(function (st) { return '<div style="background:#EEF1F5;border:1px solid #DEE3EA;border-radius:12px;padding:12px 16px;text-align:center;min-width:82px"><div class="mono" style="font-size:1.75rem;font-weight:600;line-height:1;color:var(--red)">' + st[1] + '</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:#474C57;margin-top:5px">' + st[0] + '</div></div>'; }).join('')
      + '</div></div></section>';
    function pill(active, label, onclick, accent) {
      accent = accent || '#DA291C';
      return '<button onclick="' + onclick + '" aria-pressed="' + active + '" style="flex:none;border:1px solid ' + (active ? accent : '#DEE3EA') + ';background:' + (active ? accent : '#fff') + ';color:' + (active ? '#fff' : '#474C57') + ';font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';padding:7px 13px;border-radius:999px;white-space:nowrap;cursor:pointer">' + label + '</button>';
    }
    var weekRail = '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">'
      + pill(s.galWeek == null, 'All weeks', 'SOC.galWeek(null)')
      + weeks.map(function (w) { return pill(s.galWeek === w, '<span class="mono" style="opacity:.7">W' + w + '</span> ' + esc(weekTitle(w)), 'SOC.galWeek(' + w + ')'); }).join('')
      + '</div>';
    var topicRail = '<div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px">'
      + pill(s.galTopic == null, 'All topics', 'SOC.galTopic(null)', '#15171C')
      + topics.map(function (t) { return pill(s.galTopic === t, esc(topicLabel(t)), 'SOC.galTopic(\'' + t + '\')', '#15171C'); }).join('')
      + '</div>';
    var anyFilter = (s.galWeek != null) || s.galTopic;
    var filterBar = '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:14px 16px;margin-bottom:16px;box-shadow:0 1px 2px rgba(21,23,28,.04);position:sticky;top:0;z-index:5">'
      + '<div style="display:flex;align-items:center;gap:7px;margin-bottom:7px"><span style="display:flex;color:#6B7280">' + ic('calendar', 15) + '</span><span style="font-size:.7rem;font-weight:600;letter-spacing:.05em;color:#6B7280;text-transform:uppercase">Filter by week</span></div>'
      + weekRail
      + '<div style="display:flex;align-items:center;gap:7px;margin:13px 0 7px"><span style="display:flex;color:#6B7280">' + ic('sparkle', 15) + '</span><span style="font-size:.7rem;font-weight:600;letter-spacing:.05em;color:#6B7280;text-transform:uppercase">Filter by topic</span></div>'
      + topicRail
      + '<div style="display:flex;align-items:center;gap:11px;margin-top:13px;padding-top:12px;border-top:1px solid #EEF1F5"><span style="font-size:.8125rem;font-weight:500;color:#474C57">' + list.length + ' of ' + D.records.length + ' readings</span>' + (anyFilter ? '<button onclick="SOC.galClear()" style="background:none;border:none;color:var(--red);font-size:.8125rem;font-weight:600;cursor:pointer">Clear filters</button>' : '') + '</div>'
      + '</section>';
    var grid = list.length
      ? '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">' + list.map(rgCard).join('') + '</div>'
      : '<div style="text-align:center;padding:60px 20px;color:#474C57"><div style="font-size:1.0625rem;font-weight:600;color:#15171C;margin-bottom:10px">No readings match those filters.</div><button onclick="SOC.galClear()" style="background:var(--red);color:#fff;border:none;border-radius:9px;padding:10px 18px;font-size:.9375rem;font-weight:600;cursor:pointer">Clear filters</button></div>';
    return '<div class="rise">' + hero + filterBar + grid + '</div>';
  }

  /* ---------- detail ---------- */
  function detail() {
    var r = rec(state.detailId); if (!r) return library();
    var tm = typeMeta(r.type), savedOn = state.saved.indexOf(r.id) >= 0, inC = state.compareIds.indexOf(r.id) >= 0;
    var related = (r.related || []).map(function (id) {
      var rr = rec(id); if (!rr) return ''; var rtm = typeMeta(rr.type);
      var conn = rr.week === r.week ? 'Also in Week ' + rr.week : eyeLabel(rr);
      return '<button onclick="SOC.open(\'' + id + '\')" class="relrow" style="display:flex;align-items:center;gap:13px;text-align:left;background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:13px 15px"><span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9px;background:' + rtm.soft + ';color:' + rtm.color + ';flex:none">' + ic(rtm.icon, 16) + '</span><span style="flex:1;min-width:0"><span style="display:block;font-size:.9375rem;font-weight:600;color:#15171C">' + esc(rr.title) + '</span><span style="display:block;font-size:.8125rem;color:#474C57">' + esc(rr.authors) + ' · ' + esc(conn) + '</span></span><span style="display:flex;color:#C9D1DC;flex:none">' + ic('chevron', 18) + '</span></button>';
    }).join('');
    var facts = [
      [ic('calendar', 16), 'Used in', 'Week ' + r.week + ': ' + esc(weekTitle(r.week))],
      [ic('type', 16), 'Format', esc(r.type)],
      [ic('eye', 16), 'Perspective', esc(eyeLabel(r))],
      [ic('clock', 16), 'Length', esc(r.len)],
      [ic('gauge', 16), 'Level', esc(D.levels[r.diff] || '')],
      [ic('unlock', 16), 'Access', esc((D.accessLabels && D.accessLabels[r.access]) || '')],
      [ic('globe', 16), 'Origin', esc(r.origin)],
    ].map(function (f) { return '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #EEF1F5"><span style="display:flex;color:#6B7280;flex:none">' + f[0] + '</span><span style="font-size:.8125rem;color:#474C57;flex:none;width:84px">' + f[1] + '</span><span style="font-size:.875rem;font-weight:500;color:#15171C;text-align:right;flex:1">' + f[2] + '</span></div>'; }).join('');
    var hasLink = !!readUrl(r);

    return '<div class="rise"><button onclick="SOC.back()" style="background:none;border:none;color:#474C57;font-size:.875rem;font-weight:500;padding:0 0 16px;display:inline-flex;align-items:center;gap:6px">&larr; Back to the library</button>'
      + '<div class="soc-detailgrid" style="display:grid;grid-template-columns:1fr 312px;gap:26px;align-items:start"><div>'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:13px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:7px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.8125rem;font-weight:600;padding:5px 12px;border-radius:999px">' + ic(tm.icon, 15) + esc(r.type) + '</span>' + eyePill(r) + '<button onclick="SOC.week(' + r.week + ')" class="mono" style="font-size:.8125rem;color:#1B2A4A;background:#E6EAF1;border:none;padding:4px 10px;border-radius:999px">Week ' + r.week + '</button><span class="mono" style="font-size:.8125rem;color:#474C57">' + esc(String(r.year)) + ' · ' + esc(r.origin) + '</span></div>'
      + '<h1 style="font-size:2.125rem;line-height:1.15;font-weight:600;margin:0 0 8px">' + esc(r.title) + '</h1>'
      + '<div style="font-size:1.0625rem;color:#474C57;margin-bottom:24px">' + esc(r.authors) + '</div>'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#6B7280;margin-bottom:9px">ABSTRACT</div><p style="font-size:1.0625rem;line-height:1.62;color:#15171C;margin:0 0 26px;">' + esc(r.abstract) + '</p>'
      + '<div style="background:' + tm.soft + ';border-radius:14px;padding:20px 22px;margin-bottom:26px;border:1px solid ' + tm.color + '33"><div style="display:flex;align-items:center;gap:9px;margin-bottom:9px"><span style="display:flex;color:' + tm.color + '">' + ic('sparkle', 17) + '</span><span style="font-size:.8125rem;font-weight:600;color:' + tm.color + ';letter-spacing:.02em">THE CORE IDEA</span></div><p style="font-size:1.1875rem;line-height:1.5;font-weight:500;color:#15171C;margin:0">' + esc(r.coreIdea) + '</p></div>'
      + (related ? '<div class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#6B7280;margin-bottom:12px">READ ALONGSIDE</div><div style="display:flex;flex-direction:column;gap:10px">' + related + '</div>' : '')
      + '</div>'
      + '<aside class="soc-rail" style="position:sticky;top:84px;display:flex;flex-direction:column;gap:14px">'
      + '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<button onclick="SOC.read(\'' + r.id + '\')" aria-label="' + esc(readLabel(r)) + ' in a new tab" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:9px;padding:13px;font-size:1rem;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:9px">' + readLabel(r) + '<span style="display:flex">' + ic('external', 16) + '</span></button>'
      + '<div style="font-size:.75rem;line-height:1.4;color:#6B7280;margin:-2px 0 9px;text-align:center">' + esc(accessNote(r)) + '</div>'
      + sourceButton(r)
      + '<button onclick="SOC.compare(\'' + r.id + '\')" style="width:100%;display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:9px;padding:11px;font-size:.9375rem;font-weight:600;border:1px solid ' + (inC ? '#bcd0f2' : '#DEE3EA') + ';background:' + (inC ? '#E7EEFB' : '#fff') + ';color:' + (inC ? '#1552D8' : '#15171C') + '">' + ic('columns', 16) + (inC ? 'In tray' : 'Compare') + '</button>'
      + '</div>'
      + '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:6px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">' + facts + '</div>'
      + '</aside></div></div>';
  }

  /* ---------- compare ---------- */
  function comparePickList() {
    var list = D.records.slice().sort(function (a, b) { return a.week - b.week || (a.eye === b.eye ? 0 : a.eye === 'western' ? -1 : 1); });
    return list.map(function (r) {
      var tm = typeMeta(r.type), sel = state.compareIds.indexOf(r.id) >= 0;
      return '<button onclick="SOC.compare(\'' + r.id + '\')" class="mapsrc" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:' + (sel ? '#E7EEFB' : 'none') + ';border:none;border-bottom:1px solid #EEF1F5;padding:10px 12px">'
        + '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:' + tm.soft + ';color:' + tm.color + ';flex:none">' + ic(tm.icon, 14) + '</span>'
        + '<span style="flex:1;min-width:0"><span style="display:block;font-size:.8125rem;font-weight:600;color:#15171C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(r.title) + '</span><span style="display:block;font-size:.6875rem;color:#6B7280">Week ' + r.week + ' · ' + (r.eye === 'indigenous' ? 'Indigenous' : 'Western') + '</span></span>'
        + (sel ? '<span style="display:flex;color:#1552D8;flex:none">' + ic('check', 16, 2.2) + '</span>' : '<span style="display:flex;color:#6b7280;flex:none">' + ic('plus', 16) + '</span>') + '</button>';
    }).join('');
  }
  var LENSES = {
    thematic: { label: 'Thematic', hint: 'shared themes or topics, and how each text handles them differently', diff: 'How does each reading treat the shared topic? What does each one emphasize, include, or leave out?' },
    stylistic: { label: 'Stylistic', hint: 'tone, structure, and how each text is written', diff: 'How do their tone, structure, and word choices differ? Who does each one seem written for?' },
    contextual: { label: 'Contextual', hint: 'the history, culture, and who is speaking', diff: 'How do the authors background, time, or community shape what each one says?' },
    theoretical: { label: 'Theoretical', hint: 'a critical lens, for example power or whose knowledge counts', diff: 'Read both through one lens, for example power or whose knowledge counts. What does that lens show in each?' }
  };
  var CMP_EXAMPLE = [
    ['The subject', 'Two newspapers report the same event: a 1.5% city property tax increase.'],
    ['Article A, the Community Gazette', 'A human-interest lens. Empathetic, a little critical. Leads with retirees on fixed incomes and asks whether the council tried other cuts first.'],
    ['Article B, the Metro Financial Daily', 'An economic lens. Objective and forward-looking. Focuses on the transit and roads the revenue funds, and the long-run savings.'],
    ['Similarities', 'Both agree on the core fact, a 1.5% increase, and both treat it as controversial.'],
    ['Differences', 'The Gazette uses a local, emotional frame. The Financial Daily uses a structural, analytical one.'],
    ['The insight', 'A city makeup and its politics shape how the same policy gets framed in the press. The framing is the story behind the story.']
  ];
  function comparativeStudio(recs) {
    var lens = LENSES[state.lens] || LENSES.thematic;
    function zone(n, title, prompt, key, ph) {
      var v = esc((state.cmpNotes && state.cmpNotes[key]) || '');
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px">'
        + '<div style="display:flex;align-items:baseline;gap:10px;margin-bottom:5px"><span style="display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;background:#15171C;color:#fff;border-radius:50%;font-size:.8rem;font-weight:700;flex:none">' + n + '</span><h3 style="margin:0;font-size:1.0625rem">' + title + '</h3></div>'
        + '<p style="margin:0 0 8px;font-size:.875rem;color:#474C57">' + prompt + '</p>'
        + '<textarea oninput="SOC.cmpNote(\'' + key + '\',this.value)" placeholder="' + ph + '" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea></div>';
    }
    var chips = Object.keys(LENSES).map(function (k) {
      var on = state.lens === k;
      return '<button onclick="SOC.setLens(\'' + k + '\')" style="border:1px solid ' + (on ? '#15171C' : '#DEE3EA') + ';background:' + (on ? '#15171C' : '#fff') + ';color:' + (on ? '#fff' : '#15171C') + ';border-radius:999px;padding:7px 15px;font-size:.85rem;font-weight:600">' + LENSES[k].label + '</button>';
    }).join(' ');
    var ex = state.exampleOpen
      ? '<div style="background:#15171C;color:#fff;border-radius:13px;padding:16px 18px;margin-bottom:15px"><div style="display:flex;align-items:center;margin-bottom:10px"><span class="mono" style="font-size:.72rem;letter-spacing:.05em;color:#fff">A WORKED EXAMPLE</span><button onclick="SOC.toggleExample()" style="margin-left:auto;background:rgba(255,255,255,.14);border:none;border-radius:7px;color:#fff;padding:4px 10px;font-size:.78rem;font-weight:600">Hide</button></div>'
        + CMP_EXAMPLE.map(function (r) { return '<div style="margin-bottom:8px"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#9aa3b2">' + esc(r[0]).toUpperCase() + '</div><div style="font-size:.875rem;line-height:1.5;color:rgba(255,255,255,.93)">' + esc(r[1]) + '</div></div>'; }).join('') + '</div>'
      : '<button onclick="SOC.toggleExample()" style="background:none;border:1px solid #DEE3EA;border-radius:9px;padding:9px 14px;font-size:.875rem;font-weight:600;color:#15171C;margin-bottom:15px">See a worked example</button>';
    return '<div style="margin-bottom:18px">'
      + '<h2 style="font-size:1.25rem;margin:0 0 4px">Compare them</h2>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 14px;">Comparative reading goes past what each text says on its own. Read the two together and look for what they share, how they differ, and why those differences matter.</p>'
      + ex
      + '<div style="font-size:.8125rem;font-weight:600;color:#15171C;margin-bottom:7px">Read them through a lens</div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:6px">' + chips + '</div>'
      + '<p style="font-size:.82rem;color:#6B7280;margin:0 0 16px">' + esc(lens.label) + ': ' + esc(lens.hint) + '.</p>'
      + zone('1', 'Similarities', 'What do these readings share? Where do they agree, in facts, topic, or the same idea?', 'sim', 'They both...')
      + zone('2', 'Differences', esc(lens.diff), 'diff', 'The first... while the second...')
      + zone('3', 'Why the differences matter', 'Finish the thought: these differences matter because...', 'ins', 'These differences matter because...')
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-top:4px"><button onclick="SOC.saveComparison()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.9rem;font-weight:600">Save my comparison</button></div>'
      + '</div>';
  }
  var RC_QUESTIONS = {
    thematic: ['What is the main idea or argument of this reading? Put it in one sentence.', 'What evidence or examples does the author use to support it?', 'What is the author really saying about the larger topic or theme?', 'How does this reading change or add to how you understand the topic?'],
    stylistic: ['What is the author tone (for example plain, urgent, careful, personal)?', 'How is the reading organized, and how does that shape its argument?', 'Which words, images, or moments stood out, and what effect did they have?', 'Who does the writing seem to be for?'],
    contextual: ['Who wrote this, and from what background or position?', 'How might the time, place, or community shape what the author says?', 'Whose perspective is centred here, and whose is missing?', 'What would someone need to know about the context to read this fairly?'],
    theoretical: ['Read this through one lens, for example power, or whose knowledge counts. What does that lens reveal?', 'Who benefits from the way this is framed, and who is left out?', 'What does the author assume that a critical reader should question?', 'What would change if you read it through a different lens?']
  };
  var RC_GUIDANCE = {
    thematic: [
      ['States the single main idea in one clear sentence, in your own words.', 'Names the central claim the author argues, not just the topics covered.', 'Is specific enough that a reader could tell which reading it came from.'],
      ['Points to specific evidence the author uses (a study, example, case, or text), not just that evidence exists.', 'Shows HOW that evidence supports the claim, not only that it is there.', 'Separates the author\'s strongest support from a minor or passing example.'],
      ['Moves past the surface topic to the deeper claim the author makes about it.', 'Names what the author wants you to think or do differently.', 'Connects the reading to the wider course theme it speaks to.'],
      ['Names something specific that shifted, was added to, or was challenged in your thinking.', 'Explains why that change matters, not just that it happened.', 'Is honest about what still feels unclear or unresolved.']
    ],
    stylistic: [
      ['Names the tone in a word or two (for example plain, urgent, careful, personal).', 'Points to a specific line or moment where you felt that tone.', 'Says what the tone does to you as a reader (draws you in, warns, reassures).'],
      ['Describes the structure (for example story then analysis, problem then solution, a list of cases).', 'Links that structure to how the argument builds or lands.', 'Notes one place where the order of the ideas matters.'],
      ['Picks one specific word, image, phrase, or moment, not a general impression.', 'Describes the effect it had on you as a reader.', 'Says why the author might have chosen it.'],
      ['Names the likely audience (students, scholars, the public, a community).', 'Points to what in the writing signals who it is for (vocabulary, references, assumptions).', 'Considers who is not addressed.']
    ],
    contextual: [
      ['Identifies the author and the position or background they write from.', 'Notes how that position might shape what they notice or value.', 'Stays within what the reading or its context actually tells you, without guessing.'],
      ['Ties the time, place, or community to a specific choice the author makes.', 'Shows how the same idea might read differently in another context.', 'Treats context as shaping the argument, not just decorating it.'],
      ['Names whose perspective is centred in the reading.', 'Names a perspective that is absent or mentioned only in passing.', 'Gives a reason that absence matters for the argument.'],
      ['Names the specific background a fair reader needs, not just that context matters.', 'Separates what the reading assumes you know from what it explains.', 'Considers how a reader without that background might misread it.']
    ],
    theoretical: [
      ['Picks one clear lens (for example power, gender, colonialism, whose knowledge counts).', 'Says what that lens makes visible in this specific reading.', 'Uses the lens to read the text, not just to label it.'],
      ['Names who benefits from the way the reading frames the issue.', 'Names who is disadvantaged, ignored, or carries the cost.', 'Ties the benefit or harm to a specific part of the text.'],
      ['Identifies an assumption the author treats as given.', 'Explains why a critical reader should question it.', 'Considers what changes if that assumption does not hold.'],
      ['Names a second, different lens.', 'Shows how the reading would look different through it.', 'Says what each lens catches that the other misses.']
    ]
  };
  function rcChips() {
    return Object.keys(LENSES).map(function (k) {
      var on = state.lens === k;
      return '<button onclick="SOC.setLens(\'' + k + '\')" style="border:1px solid ' + (on ? '#15171C' : '#DEE3EA') + ';background:' + (on ? '#15171C' : '#fff') + ';color:' + (on ? '#fff' : '#15171C') + ';border-radius:999px;padding:7px 15px;font-size:.85rem;font-weight:600">' + LENSES[k].label + '</button>';
    }).join(' ');
  }
  function numList(arr) { if (!arr.length) return ''; if (arr.length === 1) return 'question ' + arr[0]; if (arr.length === 2) return 'questions ' + arr[0] + ' and ' + arr[1]; return 'questions ' + arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1]; }
  function listJoin(arr) { if (!arr.length) return ''; if (arr.length === 1) return arr[0]; if (arr.length === 2) return arr[0] + ' and ' + arr[1]; return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1]; }
  var RC_SKILLS = { argument: 'the main argument', concepts: 'the key concepts', context: 'the context and who is speaking', significance: 'why the reading matters' };
  var RC_SKILL_ORDER = ['argument', 'concepts', 'context', 'significance'];
  function rcSkillProfile(rid, items) {
    var stat = {};
    items.forEach(function (m, mi) { var sk = m.skill; if (!sk) return; var sel = state.mcSel[rid + '|mc|' + mi]; if (sel === undefined || sel === null) return; if (!stat[sk]) stat[sk] = { right: 0, total: 0, whys: [] }; stat[sk].total++; if (sel === m.answer) stat[sk].right++; else if (m.why) stat[sk].whys.push(m.why); });
    var strengths = [], opps = [];
    RC_SKILL_ORDER.forEach(function (sk) { var s = stat[sk]; if (!s) return; if (s.right === s.total) strengths.push(RC_SKILLS[sk]); else opps.push({ key: sk, label: RC_SKILLS[sk], whys: s.whys }); });
    return { strengths: strengths, opps: opps, has: (strengths.length + opps.length) > 0 };
  }
  function lcFirst(s) { s = String(s == null ? '' : s); return s.charAt(0).toLowerCase() + s.slice(1); }
  function ucFirst(s) { s = String(s == null ? '' : s); return s.charAt(0).toUpperCase() + s.slice(1); }
  function rcBand(correct, total) {
    if (correct === total) return { label: 'Strong grasp', color: '#2c6b3f', bg: '#E9EFE7', icon: 'check', msg: 'You have a strong hold on this reading across every kind of question. The read-out below shows what came through.' };
    var pct = correct / total;
    if (pct >= 0.6) return { label: 'On your way', color: '#1552D8', bg: '#E7EEFB', icon: 'book', msg: 'You have the core of this reading. The read-out below shows where you are strong and where to look again.' };
    if (pct >= 0.4) return { label: 'Building', color: '#8F5E0F', bg: '#F3ECE0', icon: 'book', msg: 'You are part way into this reading. The read-out below shows what is landing and what to firm up.' };
    return { label: 'Worth another read', color: '#b23121', bg: '#FBE9E7', icon: 'book', msg: 'This reading has not fully landed yet. The read-out below shows exactly where to focus your next pass.' };
  }
  function readingComp() {
    var practiceNote = '<div style="display:flex;align-items:flex-start;gap:9px;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:10px;padding:11px 14px;margin:0 0 16px;font-size:.85rem;line-height:1.5;color:#474C57"><span style="display:flex;color:#6B7280;flex:none;margin-top:1px">' + ic('book', 16) + '</span><span>This is a private space for practice and self-study. Nothing here is graded, recorded, or counted toward a mark. It is here to help you check your own understanding and see where to focus.</span></div>';
    var r = state.rcReading ? rec(state.rcReading) : null;
    if (!r) {
      var picks = D.records.map(function (rd) {
        var tm = typeMeta(rd.type);
        return '<button onclick="SOC.rcPick(\'' + rd.id + '\')" style="display:flex;align-items:center;gap:11px;width:100%;text-align:left;background:#fff;border:1px solid #DEE3EA;border-radius:10px;padding:12px 14px;margin-bottom:8px;color:#15171C"><span style="width:9px;height:9px;border-radius:50%;background:' + tm.color + ';flex:none"></span><span style="flex:1;min-width:0"><span style="display:block;font-weight:600;font-size:.95rem">' + esc(rd.title) + '</span><span style="font-size:.8125rem;color:#474C57">Week ' + rd.week + ' · ' + esc(rd.authors) + '</span></span><span style="color:#6B7280">' + ic('book', 16) + '</span></button>';
      }).join('');
      return '<div class="rise"><h1 style="font-size:1.75rem;margin:0 0 6px">Build Your Reading Comprehension</h1><p class="lede" style="margin:0 0 18px">Pick one reading. You will work through questions that build your understanding of it. Switch the lens to change the kind of questions you answer. Your answers save to your notes.</p>' + practiceNote + picks + '</div>';
    }
    var lens = LENSES[state.lens] || LENSES.thematic;
    var qs = RC_QUESTIONS[state.lens] || RC_QUESTIONS.thematic;
    var guide = RC_GUIDANCE[state.lens] || RC_GUIDANCE.thematic;
    var zones = qs.map(function (q, i) {
      var key = r.id + '|' + state.lens + '|' + i;
      var v = esc((state.rcNotes && state.rcNotes[key]) || '');
      var coreIdea = (i === 0 && r.coreIdea) ? esc(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '.' : '';
      var crit = guide[i] || [];
      var rev = state.revealed[key]
        ? '<div style="margin-top:10px;background:#15171C;color:#fff;border-radius:10px;padding:13px 16px"><div class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:8px">A STRONG RESPONSE COVERS</div><ul style="margin:0;padding-left:17px;font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.93)">' + crit.map(function (c) { return '<li style="margin-bottom:5px">' + esc(c) + '</li>'; }).join('') + '</ul>' + (coreIdea ? '<div style="margin-top:11px;padding-top:10px;border-top:1px solid rgba(255,255,255,.16);font-size:.85rem;line-height:1.5;color:rgba(255,255,255,.9)"><span style="color:#F2A900;font-weight:600">From this reading: </span>the central idea is ' + coreIdea + '</div>' : '') + '<div style="margin-top:11px;font-size:.78rem;color:#9aa3b2">Compare your answer against this. There is no single right wording.</div><button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:9px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:5px 11px;font-size:.78rem;font-weight:600">Hide</button></div>'
        : '<button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:10px;background:none;border:1px solid #DEE3EA;border-radius:8px;padding:7px 13px;font-size:.82rem;font-weight:600;color:#15171C">Reveal a strong response</button>';
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:7px"><span style="display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;background:#15171C;color:#fff;border-radius:50%;font-size:.8rem;font-weight:700;flex:none">' + (i + 1) + '</span><p style="margin:0;font-size:.95rem;color:#15171C">' + esc(q) + '</p></div><textarea oninput="SOC.rcNote(\'' + key + '\',this.value)" placeholder="Your answer" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea>' + rev + '</div>';
    }).join('');
    var mcItems = MC[r.id] || [];
    var mcHtml = '';
    if (mcItems.length) {
      var answered = 0, correct = 0, missed = [];
      var rows = mcItems.map(function (m, mi) {
        var mkey = r.id + '|mc|' + mi;
        var sel = state.mcSel[mkey];
        var done = (sel !== undefined && sel !== null);
        if (done) { answered++; if (sel === m.answer) correct++; else missed.push(mi + 1); }
        var opts = (m.options || []).map(function (o, oi) {
          var isSel = (sel === oi), isCor = (oi === m.answer);
          var bg = '#fff', bd = '#DEE3EA', col = '#15171C';
          if (done && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; }
          else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
          var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
          return '<button onclick="SOC.mcPick(\'' + mkey + '\',' + oi + ')" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.9rem;font-weight:500">' + esc(o) + mark + '</button>';
        }).join('');
        var ok = (sel === m.answer);
        var why = done ? '<div style="margin:9px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.9rem;color:' + (ok ? '#2c6b3f' : '#b23121') + '">' + (ok ? ic('check', 15, 2.4) + 'Correct' : ic('x', 15, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.85rem;line-height:1.5;color:#474C57">' + esc(m.why || '') + '</div></div>' : '';
        return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600;color:#15171C">' + (mi + 1) + '. ' + esc(m.q) + '</p>' + opts + why + '</div>';
      }).join('');
      var total = mcItems.length, pct = Math.round(100 * correct / total);
      var score = '<div style="margin:2px 0 16px;max-width:460px">'
        + '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px"><span style="font-size:.9rem;font-weight:700;color:#15171C">' + (answered ? 'You got ' + correct + ' of ' + total : 'Answer to fill the meter') + '</span><span style="font-size:.78rem;color:#6B7280">' + answered + ' of ' + total + ' answered</span></div>'
        + '<div style="height:11px;background:#EEF1F5;border-radius:999px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#50694C,#74a878);border-radius:999px;transition:width .35s ease"></div></div>'
        + (answered ? '' : '<p style="font-size:.8rem;color:#6B7280;margin:8px 0 0">Pick an answer to check it right away. You can change your choice.</p>') + '</div>';
      var band = (answered === total && total) ? rcBand(correct, total) : null;
      var pctLabel = band ? Math.round(100 * correct / total) + '%' : '';
      var diagLine = '';
      if (band) {
        var prof = rcSkillProfile(r.id, mcItems);
        if (prof.has) {
          if (prof.strengths.length) { var coreBit = (prof.strengths.indexOf(RC_SKILLS.argument) >= 0 && r.coreIdea) ? ' You have the central point, that ' + lcFirst(esc(String(r.coreIdea).replace(/\s*\.?\s*$/, ''))) + '.' : ''; diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#2c6b3f">YOUR STRENGTHS</span><div style="font-size:.9rem;line-height:1.5;color:#15171C;margin-top:3px">Your answers show you read ' + listJoin(prof.strengths) + ' well.' + coreBit + '</div></div>'; }
          if (prof.opps.length) { var oppRows = prof.opps.map(function (o) { return '<div style="margin-top:7px"><span style="font-weight:600;color:#15171C">' + ucFirst(o.label) + '.</span> <span style="color:#474C57">' + (o.whys.length ? esc(o.whys.join(' ')) : 'Go back to this in the reading and read for it directly.') + '</span></div>'; }).join(''); diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#8F5E0F">AREAS OF OPPORTUNITY</span><div style="font-size:.875rem;line-height:1.5;color:#15171C;margin-top:1px">' + oppRows + '</div></div>'; }
          else diagLine += '<div style="margin-top:10px;font-size:.85rem;color:#2c6b3f">No gaps stood out. You handled the argument, the concepts, the context, and the significance, all of it.</div>';
        } else {
          diagLine = (missed.length) ? '<p style="margin:7px 0 0;font-size:.9rem;line-height:1.5;color:#15171C"><span style="font-weight:600">Look again at ' + numList(missed) + '.</span> Those are the ideas to firm up before you move on.</p>' : '<p style="margin:7px 0 0;font-size:.9rem;color:#15171C"><span style="font-weight:600">You answered every question correctly.</span> Nothing to revisit here.</p>';
        }
      }
      var bandHtml = band ? '<div style="margin:18px 0 4px;background:' + band.bg + ';border:1.5px solid ' + band.color + ';border-radius:13px;padding:17px 19px">'
        + '<div class="mono" style="font-size:.68rem;letter-spacing:.06em;color:' + band.color + ';margin-bottom:7px">WHERE YOU ARE IN THIS READING</div>'
        + '<div style="display:flex;align-items:center;gap:11px;flex-wrap:wrap"><span style="display:flex;color:' + band.color + '">' + ic(band.icon, 24, 2.2) + '</span><span style="font-size:1.35rem;font-weight:700;color:' + band.color + '">' + band.label + '</span><span style="margin-left:auto;text-align:right"><span style="display:block;font-size:1.05rem;font-weight:700;color:' + band.color + '">' + correct + ' of ' + total + '</span><span style="font-size:.72rem;color:#474C57">correct (' + pctLabel + ')</span></span></div>'
        + '<div style="height:8px;background:#fff;border-radius:999px;overflow:hidden;margin:11px 0 2px"><div style="height:100%;width:' + Math.round(100 * correct / total) + '%;background:' + band.color + ';border-radius:999px"></div></div>'
        + '<p style="margin:11px 0 0;font-size:.92rem;line-height:1.55;color:#15171C">' + band.msg + '</p>'
        + diagLine
        + '<div style="margin-top:14px;display:flex;gap:9px;flex-wrap:wrap"><button onclick="SOC.read(\'' + r.id + '\')" style="background:' + band.color + ';border:none;color:#fff;border-radius:9px;padding:8px 15px;font-size:.875rem;font-weight:600">' + readLabel(r) + ' &#8599;</button><button onclick="SOC.mcReset(\'' + r.id + '\')" style="background:#fff;border:1px solid ' + band.color + ';color:' + band.color + ';border-radius:9px;padding:8px 15px;font-size:.875rem;font-weight:600">Try these questions again</button></div></div>' : '';
      mcHtml = '<div style="margin:24px 0 4px"><h2 style="font-size:1.15rem;margin:0 0 3px">Check your understanding</h2><p style="font-size:.85rem;color:#6B7280;margin:0 0 12px">Quick questions on this reading, with the answer right away.</p>' + score + rows + bandHtml + '</div>';
    }
    return '<div class="rise"><div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:4px"><h1 style="font-size:1.5rem;margin:0">Build Your Reading Comprehension</h1><button onclick="SOC.rcClear()" style="margin-left:auto;background:none;border:none;color:var(--red);font-size:.875rem;font-weight:600">Choose a different reading</button></div>'
      + practiceNote
      + '<div style="background:#15171C;color:#fff;border-radius:12px;padding:15px 18px;margin:8px 0 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#9aa3b2;margin-bottom:3px">YOUR READING</div><div style="font-size:1.0625rem;font-weight:600">' + esc(r.title) + '</div><div style="font-size:.875rem;color:rgba(255,255,255,.85)">Week ' + r.week + ' · ' + esc(r.authors) + ' · ' + esc(r.year) + '</div><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:10px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:7px 13px;font-size:.85rem;font-weight:600">' + readLabel(r) + ' ↗</button></div>'
      + '<div style="font-size:.8125rem;font-weight:600;color:#15171C;margin-bottom:7px">Choose a lens (this changes the questions)</div><div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:6px">' + rcChips() + '</div><p style="font-size:.82rem;color:#6B7280;margin:0 0 16px">' + esc(lens.label) + ': ' + esc(lens.hint) + '.</p>'
      + zones
      + mcHtml
      + '<button onclick="SOC.saveReadingNotes()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.9rem;font-weight:600;margin-top:8px">Save my notes</button></div>';
  }
  /* ---------- worked weaving (Raymond directive 2026-07-03): the app models one
     weaving for any pair, both eyes kept whole and attributed, then always hands
     the integration back to the student. The Week 14 final project stays the student's own. */
  function surnameOf(r) {
    var first = String(r.authors).replace(/\s*\([^)]*\)/g, '').split(',')[0].split(' and ')[0].split('&')[0].trim();
    if (/^OpenStax/.test(first)) return 'OpenStax';
    if (/Little Bear$/.test(first)) return 'Little Bear';
    var parts = first.split(' ');
    return parts.length > 3 ? first : parts[parts.length - 1];
  }
  function weaveFallback(recs) {
    var named = recs.map(function (r) { return r.title + ' (' + surnameOf(r) + ')'; });
    var ideas = recs.map(function (r) { return surnameOf(r) + (r.eye === 'indigenous' ? ', an Indigenous-scholar reading, ' : ', a Western reading, ') + 'centres this: ' + firstSentence(r.coreIdea); }).join(' ');
    return 'Set side by side: ' + named.join('; ') + '. ' + ideas + ' Each stays whole; what one lets you see, the other may not, and neither is the default.';
  }
  function pairText(a, b) {
    var k = [a.id, b.id].sort().join('|');
    return (D.syntheses && D.syntheses[k]) ? D.syntheses[k] : weaveFallback([a, b]);
  }
  function tripleLead(recs) {
    var names = recs.map(surnameOf);
    var listed = recs.map(function (r) { return r.title + ' (' + surnameOf(r) + ', Week ' + r.week + ')'; });
    return 'Holding three at once: ' + listed[0] + '; ' + listed[1] + '; and ' + listed[2] + '. A three-way weaving is really three relationships, so each pairing is taken in turn below: ' + names[0] + ' with ' + names[1] + ', then ' + names[0] + ' with ' + names[2] + ', then ' + names[1] + ' with ' + names[2] + '. Notice what each pairing lets you see before you hold all three together yourself.';
  }
  function buildWeaving(recs) {
    if (recs.length === 2) return [pairText(recs[0], recs[1])];
    var paras = [tripleLead(recs)];
    for (var i = 0; i < recs.length; i++) for (var j = i + 1; j < recs.length; j++) paras.push(pairText(recs[i], recs[j]));
    return paras;
  }
  var WEAVE_HANDOFF = 'That weaving is the app\'s, one worked example of the practice, not the answer. Two-Eyed Seeing asks you to do your own: What does each reading let you see that the other cannot? Where do they meet your own life and community? Your weaving is the one that counts (Marshall, 2017).';

  function compare() {
    var recs = state.compareIds.map(rec).filter(Boolean);
    var html = '<div class="rise"><div style="display:flex;align-items:baseline;gap:12px;margin-bottom:6px;flex-wrap:wrap"><h1 style="font-size:1.75rem;font-weight:600;margin:0">Hold them side by side</h1><span style="font-size:.9375rem;color:#474C57">' + (recs.length ? recs.length + ' of 3 selected' : 'choose 2 or 3') + '</span>'
      + (recs.length ? '<button onclick="SOC.clearCompare()" style="margin-left:auto;background:none;border:none;color:var(--red);font-size:.875rem;font-weight:600">Clear all</button>' : '') + '</div>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 22px;">Choose readings from the list on the right, up to three, and they appear side by side here. Pairing a week\'s Western and Indigenous reading shows both eyes on the same topic.</p>';

    var left;
    if (recs.length >= 1) {
      var cols = recs.map(function (r) {
        var tm = typeMeta(r.type);
        var rows = [['WEEK', 'Week ' + r.week + ': ' + weekTitle(r.week)], ['YEAR', String(r.year)], ['PERSPECTIVE', eyeLabel(r)], ['ORIGIN', r.origin], ['LENGTH', r.len], ['LEVEL', D.levels[r.diff] || ''], ['THE CORE IDEA', r.coreIdea]]
          .map(function (row) { return '<div style="padding:11px 17px;border-top:1px solid #EEF1F5"><div class="mono" style="font-size:.625rem;letter-spacing:.05em;color:#6B7280;margin-bottom:4px">' + row[0] + '</div><div style="font-size:.875rem;line-height:1.45;color:#15171C">' + esc(row[1]) + '</div></div>'; }).join('');
        return '<div style="flex:none;width:280px;background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column"><div style="height:5px;background:' + tm.color + '"></div><div style="padding:16px 17px 14px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:11px"><span style="display:inline-flex;align-items:center;gap:6px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.6875rem;font-weight:600;padding:4px 9px;border-radius:999px">' + ic(tm.icon, 13) + esc(r.type) + '</span><button onclick="SOC.compare(\'' + r.id + '\')" class="removebtn" aria-label="Remove" style="margin-left:auto;background:none;border:none;color:#6b7280;display:flex;padding:6px">' + ic('x', 16) + '</button></div><button onclick="SOC.open(\'' + r.id + '\')" style="text-align:left;background:none;border:none;padding:0;display:block;margin-bottom:4px"><h3 style="font-size:1.0625rem;line-height:1.3;font-weight:600;margin:0;color:#15171C">' + esc(r.title) + '</h3></button><div style="font-size:.8125rem;color:#474C57">' + esc(r.authors) + '</div></div>' + rows + '</div>';
      }).join('');
      var hint = recs.length < 2 ? '<p style="font-size:.875rem;color:#6B7280;margin:0 0 12px">Pick one more reading on the right to compare it against this one.</p>' : '';
      var connectNote = '';
      if (recs.length >= 2) {
        if (state.showSynthesis) {
          connectNote = '<div style="background:#15171C;color:#fff;border-radius:14px;padding:20px 22px;margin-bottom:18px">'
            + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:12px"><span style="display:flex;color:#fff">' + ic('sparkle', 17) + '</span><span class="mono" style="font-size:.75rem;letter-spacing:.04em;color:#fff">A WORKED WEAVING</span><button onclick="SOC.hideSynthesis()" aria-label="Hide the worked weaving" style="margin-left:auto;background:rgba(255,255,255,.12);border:none;border-radius:7px;color:#fff;width:26px;height:26px;display:flex;align-items:center;justify-content:center">' + ic('x', 15) + '</button></div>'
            + '<div id="syn-body">' + buildWeaving(recs).map(function (p) { return '<p style="font-size:1rem;line-height:1.6;margin:0 0 12px;color:rgba(255,255,255,.92)">' + esc(p) + '</p>'; }).join('') + '</div>'
            + '<div style="border-top:1px solid rgba(255,255,255,.25);padding-top:12px;margin-top:4px"><p style="font-size:.9375rem;line-height:1.6;margin:0;color:#F3B0A8">' + esc(WEAVE_HANDOFF) + '</p></div>'
            + '<div style="display:flex;gap:9px;flex-wrap:wrap;margin-top:6px;border-top:1px solid rgba(255,255,255,.14);padding-top:14px">'
            + '<button type="button" onclick="SOC.synCopy()" style="border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff;border-radius:8px;font-size:.85rem;font-weight:600;padding:8px 14px;cursor:pointer">Copy</button>'
            + '<button type="button" onclick="SOC.synPrint()" style="border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.12);color:#fff;border-radius:8px;font-size:.85rem;font-weight:600;padding:8px 14px;cursor:pointer">Print</button>'
            + '<button type="button" onclick="SOC.synSave()" style="border:1px solid rgba(255,255,255,.35);background:#fff;color:#15171C;border-radius:8px;font-size:.85rem;font-weight:600;padding:8px 14px;cursor:pointer">Save to my notes</button>'
            + '</div>'
            + (state.cmpNotes && state.cmpNotes['saved-synthesis'] ? '<div style="margin-top:10px;font-size:.78rem;color:rgba(255,255,255,.7)">Saved to your notes on this device. Copy or print it above to keep a copy anywhere.</div>' : '')
            + '</div>';
        } else {
          connectNote = '<div style="background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:13px 16px;margin-bottom:16px;font-size:.875rem;line-height:1.55;color:#474C57">The readings are set side by side, each one attributed. If you want to see the practice modelled first, the app can show one worked weaving; the weaving that counts is still your own.</div>'
            + '<button onclick="SOC.synthesize()" style="display:inline-flex;align-items:center;gap:8px;border:none;border-radius:9px;padding:12px 22px;font-size:1rem;font-weight:600;color:#fff;background:#15171C;margin-bottom:18px">' + ic('sparkle', 16) + 'Show a worked weaving</button>';
        }
      }
      left = hint + connectNote + '<div class="hshelf" style="display:flex;gap:16px;align-items:stretch;overflow-x:auto;padding-bottom:10px">' + cols + '</div>';
    } else {
      left = '<div style="background:#fff;border:1px dashed #DEE3EA;border-radius:14px;padding:48px 26px;text-align:center;color:#474C57"><div style="display:inline-flex;color:#C9D1DC;margin-bottom:12px">' + ic('columns', 40, 1.4) + '</div><div style="font-size:1.0625rem;font-weight:600;color:#15171C;margin-bottom:6px">Nothing selected yet.</div><p style="font-size:.9375rem;margin:0">Choose two or three readings from the list on the right.</p></div>';
    }

    var right = '<aside class="soc-rail" style="position:sticky;top:84px">'
      + '<div class="soc-pickbox" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column;max-height:calc(100vh - 110px)">'
      + '<div style="padding:13px 14px;border-bottom:1px solid #EEF1F5;flex:none"><div style="font-size:.9375rem;font-weight:600;color:#15171C">Readings</div><div style="font-size:.75rem;color:#6B7280;margin-top:2px">' + recs.length + ' of 3 selected. Tap to add or remove.</div></div>'
      + '<div class="scrollarea" style="overflow:auto">' + comparePickList() + '</div>'
      + '</div></aside>';

    html += '<div class="soc-detailgrid" style="display:grid;grid-template-columns:1fr 300px;gap:26px;align-items:start"><div>' + left + '</div>' + right + '</div>';
    return html + '</div>';
  }

  /* ---------- glossary & thinkers + self-check (course concepts) ---------- */
  function conceptsForWeek(w) { return (D.glossary || []).filter(function (g) { return g.week === w; }); }
  function thinkersForWeek(w) { return D.records.filter(function (r) { return r.week === w && r.authors.indexOf('OpenStax') < 0; }); }

  function glossaryByWeek(sel) {
    var weeks = (sel === 'all' || sel == null) ? weeksWithContent() : [parseInt(sel, 10)];
    return weeks.map(function (w) {
      var cons = conceptsForWeek(w).map(function (g) {
        return '<div style="margin:12px 0"><div style="font-size:.9375rem;font-weight:600;color:#15171C">' + esc(g.term) + '</div><div style="font-size:.875rem;line-height:1.55;color:#474C57;margin-top:3px">' + esc(g.def) + '</div>' + (g.cite ? '<div style="font-size:.75rem;color:#6B7280;border-left:3px solid #DEE3EA;padding-left:10px;margin-top:7px">' + esc(g.cite) + '</div>' : '') + '</div>';
      }).join('');
      var thinks = thinkersForWeek(w);
      var tk = thinks.length ? '<div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#6B7280;margin:14px 0 5px">SCHOLARS THIS WEEK</div>' + thinks.map(function (r) {
        return '<div style="margin:5px 0;font-size:.8125rem;color:#15171C;line-height:1.5">' + eyePill(r) + ' <button onclick="SOC.open(\'' + r.id + '\')" style="background:none;border:none;padding:0;color:#1552D8;font-weight:600;cursor:pointer">' + esc(r.authors) + '</button>. ' + esc(r.coreIdea) + '</div>';
      }).join('') : '';
      return '<div style="border:1px solid #DEE3EA;border-radius:12px;padding:10px 16px 15px;margin-bottom:14px;background:#fff"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#1B2A4A;margin:6px 0 2px">WEEK ' + w + ' &middot; ' + esc(weekTitle(w)) + '</div>' + (cons || '<p style="color:#6B7280;font-size:.875rem">No concepts listed.</p>') + tk + '</div>';
    }).join('');
  }
  function glossarySearchHTML(q) {
    q = (q || '').toLowerCase().trim(); if (!q) return '';
    var hits = (D.glossary || []).filter(function (g) { return (g.term + ' ' + g.def).toLowerCase().indexOf(q) >= 0; });
    if (!hits.length) return '<p style="color:#6B7280;font-size:.875rem">No matches. Try another word.</p>';
    return '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">' + hits.map(function (g) {
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div style="font-size:.9375rem;font-weight:600;color:#15171C">' + esc(g.term) + '</div><div style="font-size:.8125rem;line-height:1.55;color:#474C57;margin:4px 0 8px">' + esc(g.def) + '</div>' + (g.cite ? '<div style="font-size:.7rem;color:#6B7280;margin-bottom:8px">' + esc(g.cite) + '</div>' : '') + '<button onclick="SOC.glossWeekGo(' + g.week + ')" class="mono" style="font-size:.6875rem;color:#1B2A4A;background:#E6EAF1;border:none;padding:3px 8px;border-radius:6px;cursor:pointer">Week ' + g.week + '</button></div>';
    }).join('') + '</div>';
  }
  function glossaryScreen() {
    var sel = state.glossWeek;
    var weekOpts = '<option value="all"' + (sel === 'all' ? ' selected' : '') + '>All weeks</option>' + weeksWithContent().map(function (w) { return '<option value="' + w + '"' + (String(w) === String(sel) ? ' selected' : '') + '>Week ' + w + ': ' + esc(weekTitle(w)) + '</option>'; }).join('');
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:#6B7280;margin-bottom:8px">REFERENCE</div>'
      + '<h1 style="font-size:1.75rem;font-weight:600;margin:0 0 8px">Glossary and Thinkers</h1>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 18px;">The course concepts in plain words, week by week, and the scholars behind the readings. Built on the Two-Eyed Seeing frame: Indigenous and Western knowledge held side by side.</p>'
      + '<label for="soc-gsearch" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin-bottom:6px">Search every concept</label>'
      + '<input id="soc-gsearch" oninput="SOC.glossSearch(this.value)" value="' + esc(state.glossSearch) + '" placeholder="Type a concept, for example: ways of knowing" autocomplete="off" style="width:100%;max-width:460px;padding:10px 13px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C" />'
      + '<div id="soc-gsearchout" style="margin-top:12px">' + glossarySearchHTML(state.glossSearch) + '</div>'
      + '<label for="soc-gweek" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin:18px 0 6px">Or browse by week</label>'
      + '<select id="soc-gweek" onchange="SOC.glossWeek(this.value)" style="max-width:440px;padding:9px 12px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C">' + weekOpts + '</select>'
      + '<div id="soc-gout" style="margin-top:16px">' + glossaryByWeek(sel) + '</div>'
      + '</div>';
  }

  function card(g) {
    return '<button class="flip" onclick="SOC.flip(this)" aria-label="Self-check: ' + esc(g.term) + '. Activate to reveal the definition.">'
      + '<span class="flip-inner">'
      + '<span class="flip-face flip-front">'
      + '<span style="display:flex;align-items:center;gap:8px;margin-bottom:11px"><span class="mono" style="font-size:.6875rem;color:#6B7280;margin-left:auto">WEEK ' + g.week + '</span></span>'
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#1B2A4A;margin-bottom:6px">RECALL</span>'
      + '<span style="font-size:1.0625rem;font-weight:600;line-height:1.3;color:#15171C">' + esc(g.term) + '</span>'
      + '<span style="margin-top:auto;padding-top:14px;font-size:.8125rem;color:#1552D8;font-weight:600">Reveal the definition &rarr;</span>'
      + '</span>'
      + '<span class="flip-face flip-back">'
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#F2A900;margin-bottom:8px">DEFINITION</span>'
      + '<span style="font-size:.9rem;line-height:1.5;font-weight:500">' + esc(g.def) + '</span>'
      + '<span style="margin-top:auto;padding-top:10px;font-size:.7rem;color:rgba(255,255,255,.62)">' + (g.cite ? esc(g.cite) : 'Week ' + g.week + ' &middot; ' + esc(weekTitle(g.week))) + '</span>'
      + '</span>'
      + '</span></button>';
  }
  function courseCode() { return (D.course && D.course.code) || ''; }
  function courseTitle() { return (D.course && (D.course.name || D.course.title)) || courseCode() || 'this course'; }
  function siteCard(kicker, title, text) {
    return '<article style="border:1px solid #DEE3EA;border-radius:12px;background:#fff;padding:15px 16px"><div class="mono" style="font-size:.64rem;letter-spacing:.07em;color:var(--red);font-weight:700;margin-bottom:6px">' + esc(kicker) + '</div><h3 style="font-size:1rem;line-height:1.25;margin:0 0 6px;color:var(--ink)">' + esc(title) + '</h3><p style="font-size:.88rem;line-height:1.55;color:var(--ink-dim);margin:0">' + esc(text) + '</p></article>';
  }
  function institutionalNoticeHtml() {
    var code = courseCode() || 'this course';
    return '<section class="node" aria-label="Companion website and Blackboard relationship" style="border-left:4px solid var(--red);border-radius:0 14px 14px 0;margin-bottom:18px">'
      + '<div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:8px">COMPANION WEBSITE</div>'
      + '<h2 class="wk-sec" style="margin-bottom:10px">What this site is for</h2>'
      + '<p style="font-size:1rem;line-height:1.62;color:var(--ink);margin:0 0 10px">This instructor-created companion website supports weekly learning in ' + esc(code) + '. Students use this site for weekly learning pathways, readings, key concepts, walkthroughs, and study supports. Blackboard remains the official Seneca course platform for announcements, assignment submission, grades, discussions, course records, and required administrative functions.</p>'
      + '<p style="font-size:.92rem;line-height:1.55;color:var(--ink-dim);margin:0">Use this site to learn and prepare. Use Blackboard for official instructions, submissions, grades, announcements, discussions, and course records.</p>'
      + '</section>';
  }
  function howToUseSiteHtml() {
    var steps = [
      'Start with the current week\'s learning pathway.',
      'Review the guiding questions and key concepts.',
      'Open the assigned readings and media.',
      'Use the walkthroughs and self-checks to prepare for class and assessments.',
      'Use Blackboard for official announcements, assignment submission, discussions, grades, and course records.'
    ];
    return '<section class="node" aria-labelledby="how-site-title"><h2 id="how-site-title" class="wk-sec">How to Use This Site</h2><ol style="display:grid;gap:9px;margin:0;padding-left:22px">'
      + steps.map(function (s) { return '<li style="font-size:.96rem;line-height:1.55;color:var(--ink-dim);padding-left:4px">' + esc(s) + '</li>'; }).join('')
      + '</ol></section>';
  }
  function homeIntroCollapsible() {
    var code = courseCode() || 'this course';
    var name = String(state.studentName || '').trim();
    var days = Object.keys((state.visits && state.visits.days) || {}).length;
    var touched = Object.keys((state.visits && state.visits.weeks) || {}).length;
    var isNew = !name && touched === 0 && days <= 1;
    var steps = [
      'Start with the current week\'s learning pathway.',
      'Review the guiding questions and key concepts.',
      'Open the assigned readings and media.',
      'Use the walkthroughs and self-checks to prepare for class and assessments.',
      'Use Blackboard for official announcements, assignment submission, discussions, grades, and course records.'
    ];
    return '<section class="node home-intro" aria-label="About this companion website" style="border-left:4px solid var(--red);border-radius:0 14px 14px 0;margin-bottom:16px">'
      + '<div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:8px">COMPANION WEBSITE</div>'
      + '<p style="font-size:1rem;line-height:1.6;color:var(--ink);margin:0"><strong>Learn and prepare here. Use Blackboard to submit work, get your grades, and read official announcements.</strong></p>'
      + '<details class="home-about"' + (isNew ? ' open' : '') + '>'
      + '<summary>What this site is for, and how to use it</summary>'
      + '<div class="home-about-body">'
      + '<p style="font-size:.96rem;line-height:1.6;color:var(--ink);margin:0 0 10px">This instructor-created companion website supports weekly learning in ' + esc(code) + '. Students use this site for weekly learning pathways, readings, key concepts, walkthroughs, and study supports. Blackboard remains the official Seneca course platform for announcements, assignment submission, grades, discussions, course records, and required administrative functions.</p>'
      + '<h3>How to use this site</h3>'
      + '<ol style="display:grid;gap:8px;margin:0;padding-left:22px">'
      + steps.map(function (s) { return '<li style="font-size:.93rem;line-height:1.5;color:var(--ink-dim);padding-left:4px">' + esc(s) + '</li>'; }).join('')
      + '</ol></div></details>'
      + '</section>';
  }
  function bbDiagramHtml() {
    var code = courseCode() || 'this course';
    var svg = '<svg viewBox="0 0 760 260" role="img" aria-labelledby="bbd-t bbd-d" style="width:100%;height:auto;display:block;max-width:760px">'
      + '<title id="bbd-t">How this site and Blackboard work together</title>'
      + '<desc id="bbd-d">Two panels. This site is for learning and practice and saves only to your device. Blackboard is the official platform where you submit work and receive grades. Arrows show moving between them: submit on Blackboard, come back here to study.</desc>'
      + '<rect x="10" y="20" width="330" height="190" rx="14" fill="#F7F9FB" stroke="#1B2A4A" stroke-width="2"/>'
      + '<text x="30" y="52" font-size="15" font-weight="700" fill="#1B2A4A" style="letter-spacing:.06em">THIS SITE</text>'
      + '<text x="30" y="82" font-size="13.5" fill="#15171C">Weekly pathway, readings, key concepts</text>'
      + '<text x="30" y="108" font-size="13.5" fill="#15171C">Practice checks, notes, study supports</text>'
      + '<text x="30" y="134" font-size="13.5" fill="#15171C">Never graded, nothing submitted here</text>'
      + '<text x="30" y="160" font-size="13.5" fill="#15171C">Saves only to this device</text>'
      + '<text x="30" y="192" font-size="12" font-weight="600" fill="#6B7280">LEARN AND PRACTICE</text>'
      + '<rect x="420" y="20" width="330" height="190" rx="14" fill="#FFF6F5" stroke="#DA291C" stroke-width="2"/>'
      + '<text x="440" y="52" font-size="15" font-weight="700" fill="#DA291C" style="letter-spacing:.06em">BLACKBOARD</text>'
      + '<text x="440" y="82" font-size="13.5" fill="#15171C">Submit every assignment</text>'
      + '<text x="440" y="108" font-size="13.5" fill="#15171C">Discussions, announcements, messages</text>'
      + '<text x="440" y="134" font-size="13.5" fill="#15171C">Grades and official records</text>'
      + '<text x="440" y="160" font-size="13.5" fill="#15171C">Official due dates</text>'
      + '<text x="440" y="192" font-size="12" font-weight="600" fill="#6B7280">ACT AND SUBMIT</text>'
      + '<line x1="345" y1="80" x2="412" y2="80" stroke="#DA291C" stroke-width="2.5"/>'
      + '<polygon points="412,80 400,74 400,86" fill="#DA291C"/>'
      + '<text x="378" y="66" font-size="11.5" font-weight="600" fill="#DA291C" text-anchor="middle">submit</text>'
      + '<line x1="415" y1="150" x2="348" y2="150" stroke="#1B2A4A" stroke-width="2.5"/>'
      + '<polygon points="348,150 360,144 360,156" fill="#1B2A4A"/>'
      + '<text x="380" y="172" font-size="11.5" font-weight="600" fill="#1B2A4A" text-anchor="middle">study, review</text>'
      + '<text x="380" y="242" font-size="13" font-weight="700" fill="#15171C" text-anchor="middle">If the two ever disagree, Blackboard is the source of truth.</text>'
      + '</svg>';
    return '<section class="node" aria-labelledby="bbd-h" style="margin:16px 0">'
      + '<h2 id="bbd-h" class="wk-sec">How this site works with Blackboard</h2>'
      + '<p style="margin:0 0 14px;font-size:.95rem;line-height:1.6;color:var(--ink-dim)">Think of the two as one loop. You learn and practice here: the weekly pathway, readings, concepts, checks, and notes. You act on Blackboard: every submission, discussion post, grade, and official date lives there. Nothing you do on this site is graded or visible to anyone, and nothing here replaces a Blackboard step.</p>'
      + svg
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">'
      + '<a href="' + BB_URL + '" target="_blank" rel="noopener" class="wk-cta" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Open Blackboard <span aria-hidden="true">&#8599;</span></a>'
      + '<button type="button" onclick="SOC.go(\'calendar\')" class="wk-cta" style="background:#fff;color:#1B2A4A;border:1px solid #1B2A4A">Open course calendar</button>'
      + '</div>'
      + '</section>';
  }
  function siteInfoPage() {
    var code = courseCode() || 'this course';
    var title = courseTitle();
    var cards = [
      ['BLACKBOARD', 'Where official course work happens', 'Blackboard remains the official Seneca course platform for announcements, assignment submission, discussions, grades, course records, and required administrative functions.'],
      ['PRIVACY', 'What this site does not send', 'This site does not require an account, does not collect student submissions, does not store grades, and does not send personal student information to the instructor, Seneca, or any server. The optional first name, notes, and check answers stay in this browser unless you remove or export them.'],
      ['COPYRIGHT', 'How readings and media are used', 'Course readings and media are linked for educational use. Copyright remains with the original creators and publishers. Access readings through the provided links, Seneca library access, or Blackboard where applicable.'],
      ['MEDIA', 'External media', 'Nothing on this site contacts an external service until you choose to load or play a video. When you press a load button, that platform (YouTube in privacy-enhanced mode) applies its own privacy practices inside its player.'],
      ['LANGUAGE', 'Reading in another language', 'Your browser can translate this whole site: right click the page and choose Translate (Chrome, Edge, and Safari all offer this, in more than one hundred languages). It is your choice and happens in your browser. One caution: machine translation can bend key course terms and citations, so check important ideas against the English original before you use them in graded work.'],
      ['ACCESS', 'Accessibility support', 'This site is designed to support accessible course navigation. The Reading Lens button at the top of every page offers text size, spacing, a high-legibility font, page tints, a reading ruler, a magnifier, and read-aloud. If you experience a barrier, use Blackboard and contact the instructor so access can be supported.'],
      ['STUDY', 'What this site is for', 'Use this companion website for weekly learning pathways, readings, key concepts, walkthroughs, self-checks, glossary materials, and study supports.'],
      ['TECHNICAL', 'How this site is built', 'This is a static website: plain HTML, CSS, and JavaScript served from GitHub Pages, with no server, no database, no accounts, and no third-party trackers or analytics. All fonts and scripts load from this site itself.'],
      ['MAINTENANCE', 'How this site is maintained', 'The instructor maintains this site and updates it alongside Blackboard postings each term. If anything here ever looks out of date, Blackboard is the source of truth, and the instructor can be reached through Blackboard.'],
      ['LIMITS', 'Known limits', 'Saved notes and check answers live only in this browser on this device: clearing browser data removes them, and they do not move between devices. Some week videos may not yet have captions; their full scripts are posted in Blackboard. This site needs JavaScript; everything required for the course also remains available through Blackboard.']
    ];
    return '<div class="rise path-page">'
      + '<section class="path-hero"><div><div class="mono">COMPANION WEBSITE</div><h1>How This Site Works</h1><p>This page explains how the ' + esc(code) + ' companion website supports ' + esc(title) + ', what belongs on Blackboard, and how readings, privacy, accessibility, and media are handled.</p></div><div class="path-compass" aria-label="Companion website and Blackboard relationship"><span>THIS SITE</span><b>weekly learning pathway</b><i></i><span>BLACKBOARD</span><b>official course platform</b></div></section>'
      + institutionalNoticeHtml()
      + howToUseSiteHtml()
      + bbDiagramHtml()
      + '<section style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:16px 0">' + cards.map(function (c) { return siteCard(c[0], c[1], c[2]); }).join('') + '</section>'
      + mobileAccessPanel()
      + reportBlock()
      + '<section class="exp-card" style="border-left-color:#1B2A4A;background:#fff;border:1px solid #DEE3EA;border-left:5px solid #1B2A4A;border-radius:14px;padding:20px 22px;margin:0 0 20px" aria-label="Clear saved work"><div class="mono" style="font-size:.68rem;letter-spacing:.08em;color:#1B2A4A;font-weight:700">SHARED OR LAB COMPUTER?</div><h2 style="margin:4px 0 8px;font-size:1.1rem">Clear my saved work on this device</h2><p style="font-size:.9rem;line-height:1.55;margin:0 0 12px">Removes every note, check answer, and setting this site has saved in this browser. Download your weekly notes first if you want to keep them.</p><button type="button" class="wk-cta" style="margin:0" onclick="SOC.clearMyWork()">Clear everything saved here</button></section>'
      + '</div>';
  }
  function screenAnnounceText() {
    if (state.screen === 'station') return 'Week ' + state.stationWeek + ': ' + weekTitle(state.stationWeek);
    if (state.screen === 'site') return 'How This Site Works';
    if (state.screen === 'calendar') return 'Calendar and Due Dates';
    if (state.screen === 'pathways') return 'Course Pathways';
    if (state.screen === 'readings') return 'Readings Library';
    if (state.screen === 'compare') return 'Compare Readings';
    if (state.screen === 'reading') return 'Reading Practice';
    if (state.screen === 'walkthroughs') return 'Weekly Walkthroughs';
    if (state.screen === 'videos') return 'Videos and Podcasts';
    if (state.screen === 'glossary') return 'Glossary';
    if (state.screen === 'cards') return 'Concept Flashcards';
    if (state.screen === 'assignments') return 'Starting Your Assignment';
    if (state.screen === 'career') return 'Career Choices';
    if (state.screen === 'map') return 'Personal Cartography';
    if (state.screen === 'activity') return 'Activity';
    if (state.screen === 'detail') return 'Reading Details';
    if (state.screen && state.screen.indexOf('assignment') === 0) return 'Starting Your Assignment';
    return 'Home';
  }
  function reportBlock() {
    return '<section class="node" aria-labelledby="rep-h" style="margin:16px 0"><h2 id="rep-h" class="wk-sec">Something not working?</h2>'
      + '<p style="margin:0 0 12px;font-size:.95rem;line-height:1.6;color:var(--ink-dim)">If a video will not load, a link is broken, or anything looks wrong, tell the instructor so it can be fixed. The button opens your own email with the page details filled in; you just add what happened and press send. Nothing is collected by this site.</p>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">'
      + '<button type="button" class="wk-cta" style="margin:0" onclick="SOC.reportProblem()">Report a problem by email</button>'
      + '<span style="font-size:.85rem;color:var(--ink-dim)">Use Seneca email or Blackboard messages for course support.</span>'
      + '</div></section>';
  }
  function siteFooter() {
    var code = courseCode() || 'Course';
    return '<footer role="contentinfo" style="margin:28px 0 0;padding:18px 20px;border:1px solid #DEE3EA;border-top:4px solid var(--red);border-radius:14px;background:#fff;color:var(--ink-dim)">'
      + '<p style="font-size:.9rem;line-height:1.55;margin:0 0 8px"><strong style="color:var(--ink)">' + esc(code) + ' companion website.</strong> Blackboard remains the official course platform for submissions, grades, announcements, discussions, and course records.</p>'
      + '<p style="font-size:.84rem;line-height:1.55;margin:0 0 8px">This site does not require an account, does not collect student submissions, does not store grades, and does not send personal student information to the instructor, Seneca, or any server. The optional first name, notes, and check answers stay in this browser unless you remove or export them. No external service is contacted unless you choose to play a video.</p>'
      + '<p style="font-size:.84rem;line-height:1.55;margin:0">This site is designed to support accessible course navigation. Students who experience barriers using the site should use Blackboard and contact the instructor so access can be supported.</p>'
      + '</footer>';
  }
  function focusWeek(sel) { var ws = weeksWithReadings(); return sel == null ? (ws[0] || 1) : sel; }
  function weekReadingRecords(d) {
    var out = [];
    ((d && d.readings) || []).forEach(function (r) {
      var rr = r.id && rec(r.id);
      if (rr) out.push(rr);
    });
    return out;
  }
  function readingRescueQuestion(w, d, anchor, concept) {
    return (d.guiding && d.guiding[0]) || ('What does ' + (concept ? concept.h : 'this week') + ' help you notice?');
  }
  function readingRescueSection(w, d) {
    if (!d || !d.readings || !d.readings.length) return '';
    var records = weekReadingRecords(d);
    var anchor = records[0] || null;
    var concept = (d.concepts && d.concepts[0]) || null;
    var first = d.readings[0] || {};
    var rtitle = anchor ? anchor.title : (first.apa || 'this week\'s first reading');
    var rauth = anchor ? anchor.authors : '';
    var open = anchor ? '<button onclick="SOC.read(\'' + anchor.id + '\')" class="wk-rescue-open">Open the anchor reading <span aria-hidden="true">&#8599;</span></button>' : '';
    var q = readingRescueQuestion(w, d, anchor, concept);
    var conceptName = concept ? concept.h : 'the week\'s main concept';
    var conceptBody = concept ? concept.body.slice(0, 190).replace(/\s+\S*$/, '') + '...' : 'Use this concept to read the week, not just summarize it.';
    return '<div id="wk-rescue" class="wk-rescue" aria-label="Reading Rescue"><div class="wk-rescue-head"><div class="mono">READING RESCUE</div><h3>If you are behind, start here</h3><p>This is not a replacement for the readings. It is the shortest honest path back into them.</p></div>'
      + '<div class="wk-rescue-grid"><div><b>1. Read one anchor source</b><span>' + esc(rtitle) + (rauth ? ' by ' + esc(rauth) : '') + '</span>' + open + '</div>'
      + '<div><b>2. Carry one concept</b><span>' + esc(conceptName) + '</span><small>' + esc(conceptBody) + '</small></div>'
      + '<div><b>3. Answer one evidence question</b><span>' + esc(q) + '</span><small>Your answer should point back to the reading, not only the video or activity.</small></div></div>'
      + '<div class="wk-rescue-foot"><b>Do not stop at the rescue path.</b><span>Use it when you are stuck, then return to the full reading list before you submit anything for marks.</span></div></div>';
  }
  function selField(v) {
    v = String(v || '').trim();
    var i = v.indexOf('::');
    return i >= 0 ? v.slice(0, i) : v;
  }
  function selProgram(v) {
    v = String(v || '').trim();
    var i = v.indexOf('::');
    return i >= 0 ? v.slice(i + 2) : '';
  }
  function selLabel(v) { return selProgram(v) || selField(v); }
  function trackVisit(w) {
    try {
      var d = new Date(), dk = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      state.visits.days = state.visits.days || {};
      state.visits.days[dk] = 1;
      state.visits.weeks = state.visits.weeks || {};
      var vw = state.visits.weeks[w] = state.visits.weeks[w] || { n: 0 };
      vw.n++; vw.last = Date.now();
    } catch (e) {}
  }
  function wkOpenResetWeek(w) {
    if (!state.wkOpen) return;
    var pfx = w + '|';
    Object.keys(state.wkOpen).forEach(function (k) { if (k.indexOf(pfx) === 0) delete state.wkOpen[k]; });
  }
  function wkOpenKey(id) { return (state.stationWeek || 0) + '|' + id; }
  function wkOpenHas(id) { return !!(state.wkOpen && state.wkOpen[wkOpenKey(id)]); }
  var wkSeq = 1;
  function wkOpenSet(id, open) {
    state.wkOpen = state.wkOpen || {};
    if (open) {
      var k; for (k in state.wkOpen) { var v = +state.wkOpen[k] || 1; if (v >= wkSeq) wkSeq = v + 1; }
      state.wkOpen[wkOpenKey(id)] = wkSeq++;
    } else delete state.wkOpen[wkOpenKey(id)];
  }
  /* Raymond rule: at most two sections open per week. Opening a third quietly closes the earliest opened. */
  function wkCapEnforce(keepId) {
    try {
      var secs = document.querySelectorAll('#soc-main section[id^="wk-"]');
      var open = [];
      Array.prototype.forEach.call(secs, function (sec) {
        if (sec.id === 'wk-ov' || sec.id === keepId || !sec.querySelector('h2.wk-sec')) return;
        if (!sec.querySelector('.wk-coll-btn')) return;
        if (sec.classList.contains('wk-collapsed')) return;
        open.push({ id: sec.id, seq: +((state.wkOpen || {})[wkOpenKey(sec.id)]) || 0 });
      });
      open.sort(function (a, b) { return a.seq - b.seq; });
      while (open.length > 1) {
        var old = open.shift();
        wkOpenSet(old.id, false);
        var osec = document.getElementById(old.id);
        if (osec) {
          osec.classList.add('wk-collapsed');
          var ob = osec.querySelector('.wk-coll-btn');
          if (ob) { ob.setAttribute('aria-expanded', 'false'); ob.setAttribute('aria-label', 'Show this section'); ob.textContent = '+'; }
        }
      }
    } catch (e) {}
  }
  function wkExpandFor(id) {
    if (!id || id.indexOf('wk-') !== 0 || id === 'wk-ov') return;
    var el = document.getElementById(id);
    if (!el) return;
    var sec = null;
    if (el.classList && el.classList.contains('wk-collapsed')) sec = el;
    else if (el.closest) sec = el.closest('section.wk-collapsed');
    if (!sec || !sec.id || sec.id === 'wk-ov') return;
    id = sec.id;
    wkOpenSet(id, true);
    sec.classList.remove('wk-collapsed');
    var b = sec.querySelector('.wk-coll-btn');
    if (b) { b.setAttribute('aria-expanded', 'true'); b.setAttribute('aria-label', 'Hide this section'); b.textContent = '\u2212'; }
    wkCapEnforce(id);
    persist();
  }
  function wkEnhanceSections() {
    if (state.screen !== 'station') return;
    var secs = document.querySelectorAll('#soc-main section[id^="wk-"]');
    Array.prototype.forEach.call(secs, function (sec) {
      if (sec.id === 'wk-mode') return;
      var h = sec.querySelector('h2.wk-sec');
      if (!h || h.parentElement !== sec || h.querySelector('.wk-coll-btn')) return;
      var id = sec.id;
      var collapsed = !wkOpenHas(id);
      if (collapsed) sec.classList.add('wk-collapsed');
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wk-coll-btn';
      btn.setAttribute('aria-controls', id);
      btn.setAttribute('aria-expanded', String(!collapsed));
      btn.setAttribute('aria-label', collapsed ? 'Show this section' : 'Hide this section');
      btn.textContent = collapsed ? '+' : '\u2212';
      btn.onclick = function () { SOC.wkColl(id); };
      h.appendChild(btn);
    });
    var rail = document.querySelector('.wk-rail');
    if (rail && !rail.__wkExpandWired) {
      rail.__wkExpandWired = true;
      rail.addEventListener('click', function (e) {
        var link = e.target && e.target.closest ? e.target.closest('a[href^="#wk-"]') : null;
        if (link) { try { wkExpandFor(link.getAttribute('href').slice(1)); } catch (e2) {} }
      });
    }
  }
  function compassRecs() {
    var recs = [];
    try {
      var ws = journeyWeeks();
      var vweeks = (state.visits && state.visits.weeks) || {};
      var visited = ws.filter(function (w) { return vweeks[w]; });
      if (!visited.length) {
        recs.push({ t: 'Begin with Week ' + (ws[0] || 1), b: 'Open the first week and try one section. The site keeps your place on this device.', go: 'SOC.station(' + (ws[0] || 1) + ')', gl: 'Open Week ' + (ws[0] || 1) });
        return recs;
      }
      var lastW = visited[visited.length - 1], lastTs = 0;
      visited.forEach(function (w) { if (vweeks[w].last && vweeks[w].last > lastTs) lastTs = vweeks[w].last; });
      if (lastTs && (Date.now() - lastTs) > 7 * 86400000) {
        recs.push({ t: 'Ease back in', b: 'It has been more than a week since your last visit. Ten minutes back in your most recent week rebuilds momentum faster than starting something new.', go: 'SOC.station(' + lastW + ')', gl: 'Reopen Week ' + lastW });
      }
      if (!(state.careerField || '')) {
        recs.push({ t: 'See yourself in this course', b: 'Pick your program area and the course starts speaking your language: each week gains a lens, a scenario, and a career link written for your field. It shapes how the material reads, never what is graded.', go: 'SOC.go(\'career\')', gl: 'Choose your field' });
      }
      var kcTried = state.kcHist && Object.keys(state.kcHist).length;
      if (!kcTried && visited.length >= 1) {
        recs.push({ t: 'Test yourself once', b: 'You have been reading but have not tried a Knowledge Check yet. One set tells you what actually stuck.', go: 'SOC.jumpWeek(' + lastW + ', \'kc\')', gl: 'Try a check' });
      }
      var sgUsed = state.sgTick && Object.keys(state.sgTick).length;
      if (!sgUsed && visited.length >= 2 && recs.length < 3) {
        recs.push({ t: 'Work through one Study Guide', b: 'You have visited ' + visited.length + ' weeks without ticking off study guide items. The guide turns reading into checkable progress.', go: 'SOC.jumpWeek(' + lastW + ', \'sg\')', gl: 'Open the guide' });
      }
      var refl = state.wkReflect && String(state.wkReflect[lastW] || '').trim();
      if (!refl && recs.length < 3) {
        recs.push({ t: 'Close the loop on Week ' + lastW, b: 'A one-minute written reflection is the difference between having seen an idea and being able to use it.', go: 'SOC.jumpWeek(' + lastW + ', \'reflect\')', gl: 'Write it' });
      }
      if (!recs.length) {
        var nextW = null;
        for (var j = 0; j < ws.length; j++) { if (!vweeks[ws[j]]) { nextW = ws[j]; break; } }
        if (nextW) recs.push({ t: 'You are current. Week ' + nextW + ' is next', b: 'Everything you have opened has work in it. Starting the next week early beats cramming it later.', go: 'SOC.station(' + nextW + ')', gl: 'Open Week ' + nextW });
        else recs.push({ t: 'All weeks visited', b: 'Use the Knowledge Checks and your notes to review the weeks you found hardest.', go: 'SOC.go(\'practice\')', gl: 'Practice' });
      }
    } catch (e) {}
    return recs.slice(0, 3);
  }
  function compassPanel() {
    var name = String(state.studentName || '').trim();
    var days = Object.keys((state.visits && state.visits.days) || {}).length;
    var vweeks = (state.visits && state.visits.weeks) || {};
    var touched = Object.keys(vweeks).length;
    var total = journeyWeeks().length;
    var recs = compassRecs();
    var greet = name ? ('Welcome back, ' + esc(name) + '.') : 'Your study compass';
    var nameUi = name
      ? '<small class="sc-nameline">Saved as ' + esc(name) + ' in this browser only. <button type="button" class="sc-linkbtn" onclick="SOC.nameClear()">Remove my name</button></small>'
      : '<form class="sc-nameform" onsubmit="return SOC.nameSave(event)"><label for="sc-name">Add your first name (optional)</label><div><input id="sc-name" maxlength="40" autocomplete="off" placeholder="Your name"><button type="submit">Save</button></div><small>Stays in this browser on this device, is never sent anywhere, and Clear My Work removes it.</small></form>';
    var scField = selLabel(state.careerField || '');
    var stats = (days || scField)
      ? '<div class="sc-stats">' + (days ? '<span><b>' + days + '</b> day' + (days === 1 ? '' : 's') + ' here</span><span><b>' + touched + '</b> of ' + total + ' weeks opened</span>' : '') + (scField ? '<span>Your lens: <b>' + esc(scField) + '</b></span>' : '') + '</div>'
      : '';
    var recHtml = recs.map(function (r) {
      return '<div class="sc-rec"><div><b>' + r.t + '</b><p>' + r.b + '</p></div><button type="button" onclick="' + r.go + '">' + r.gl + '</button></div>';
    }).join('');
    return '<section class="node sc-panel jfade" aria-label="Your study compass">'
      + '<h2 class="wk-sec" style="margin-top:0">' + greet + '</h2>'
      + stats + recHtml + nameUi
      + '<details class="sc-how"><summary>How these suggestions work</summary><p>No AI and no server. A few fixed rules run in your browser over what you have done on this device: which weeks you opened, whether you tried checks and guides, and whether you wrote reflections. None of it leaves this page, none of it is graded, and Clear My Work in How This Site Works erases all of it.</p></details>'
      + '</section>';
  }
  function weekHasWork(w) {
    try {
      var pfx = w + '|';
      if (state.wkNotes) { for (var k in state.wkNotes) { if (k.indexOf(pfx) === 0 && String(state.wkNotes[k]).trim()) return true; } }
      if (state.wkReflect && String(state.wkReflect[w] || '').trim()) return true;
      if (state.kcHist) { for (var k2 in state.kcHist) { if (k2.indexOf(w + '|') === 0 || k2.indexOf('w' + w) === 0) return true; } }
    } catch (e) {}
    return false;
  }
  function recordsForWeek(w) { return D.records.filter(function (r) { return r.week === w; }); }
  function firstWhere(list, fn) { for (var i = 0; i < list.length; i++) if (fn(list[i])) return list[i]; return null; }
  function firstSentence(s) { var t = String(s || '').replace(/\s+/g, ' ').trim(), m = t.match(/^(.{60,220}?[.!?])\s/); return m ? m[1] : t.slice(0, 240); }
  function studioOpenBtn(r) {
    return r ? '<button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:6px;align-self:flex-start;background:none;border:none;color:#1552D8;font-size:.78rem;font-weight:600;padding:0;cursor:pointer">Open the reading &#8599;</button>' : '';
  }
  function studioPanel(kicker, title, body, meta, icon, accent, r) {
    return '<div style="background:#fff;border:1px solid #DEE3EA;border-top:4px solid ' + accent + ';border-radius:12px;padding:15px 16px;display:flex;flex-direction:column;gap:8px;min-height:190px">'
      + '<div class="mono" style="display:flex;align-items:center;gap:7px;font-size:.6875rem;letter-spacing:.05em;color:#6B7280">' + ic(icon || 'clipboard', 14) + esc(kicker) + '</div>'
      + '<h3 style="font-size:1.0625rem;line-height:1.3;margin:0;color:#15171C">' + esc(title) + '</h3>'
      + '<p style="font-size:.875rem;line-height:1.55;color:#474C57;margin:0">' + esc(body) + '</p>'
      + (meta ? '<div style="margin-top:auto;border-left:3px solid #DEE3EA;padding-left:10px;font-size:.75rem;line-height:1.45;color:#6b7280">' + esc(meta) + '</div>' : '')
      + studioOpenBtn(r)
      + '</div>';
  }
  function studioCheck(key, check) {
    var sel = state.mcSel[key], done = (sel !== undefined && sel !== null), ok = done && sel === check.answer;
    var opts = check.options.map(function (o, oi) {
      var isSel = sel === oi, isCor = oi === check.answer, bg = '#fff', bd = '#DEE3EA', col = '#15171C';
      if (done && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; }
      else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
      var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
      return '<button onclick="SOC.mcPick(\'' + key + '\',' + oi + ')" aria-pressed="' + (isSel ? 'true' : 'false') + '" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.875rem;font-weight:500;cursor:pointer">' + esc(o) + mark + '</button>';
    }).join('');
    var why = done ? '<div style="margin:8px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.875rem;color:' + (ok ? '#2c6b3f' : '#b23121') + '">' + (ok ? ic('check', 14, 2.4) + 'Correct' : ic('x', 14, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.84rem;line-height:1.5;color:#474C57">' + esc(check.why) + '</div></div>' : '';
    return '<div role="group" style="background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px;margin-top:14px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:8px">QUICK CHECK</div><p style="margin:0 0 9px;font-size:.9rem;font-weight:600;color:#15171C">' + esc(check.q) + '</p>' + opts + why + '</div>';
  }
  function studioShell(title, intro, inner) {
    return '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:18px 18px 20px;margin:0 0 22px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:6px">SELF-CHECK STUDIO</div>'
      + '<h2 style="font-size:1.3125rem;line-height:1.25;margin:0 0 7px;color:#15171C">' + esc(title) + '</h2>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:#474C57;margin:0 0 15px;">' + esc(intro) + '</p>' + inner + '</section>';
  }
  function socStudio(sel) {
    if (!HAS_EYE) return '';
    var w = focusWeek(sel), recs = recordsForWeek(w);
    var west = firstWhere(recs, function (r) { return r.eye === 'western'; });
    var ind = firstWhere(recs, function (r) { return r.eye === 'indigenous'; });
    if (!ind) return '';
    var panels = (west ? studioPanel('WESTERN EYE', west.authors, west.coreIdea, west.title + ' (' + west.year + ')', 'eye', '#3a47a8', west) : '')
      + studioPanel('INDIGENOUS EYE', ind.authors, ind.coreIdea, ind.title + ' (' + ind.year + ')', 'eye', '#1f4d38', ind);
    var soloNote = west ? '' : '<div style="margin-top:12px;background:#E4F0E9;border:1px solid #c4ddcf;border-radius:11px;padding:12px 15px;font-size:.85rem;line-height:1.55;color:#1f4d38">This week centres Indigenous knowledge; there is no separate Western-eye reading to set beside it. That is itself a Two-Eyed Seeing observation: not every topic carries a Western counterpart, and the Indigenous frame stands on its own here.</div>';
    var prompts = west
      ? ['What does ' + ind.authors + '\'s reading let you see that ' + west.authors + '\'s does not?', 'What would be missed if this week were read with only the Western eye?', 'What responsibility does ' + ind.authors + ' ask you to keep visible?']
      : ['What does ' + ind.authors + '\'s reading let you see about this week\'s topic?', 'What responsibility does ' + ind.authors + ' ask you to keep visible?'];
    var practice = '<div style="margin-top:14px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:7px">TWO-EYED SEEING PRACTICE</div><p style="font-size:.78rem;color:#6b7280;line-height:1.5;margin:0 0 9px">Two-Eyed Seeing (Etuaptmumk) was named by Mi\'kmaw Elder Albert Marshall: seeing with the strengths of Indigenous knowledge in one eye and Western knowledge in the other, both kept whole. It is a practice you bring, not a synthesis the app writes.</p>' + prompts.map(function (p) { return '<div style="display:flex;gap:9px;align-items:flex-start;font-size:.875rem;line-height:1.5;color:#15171C;margin:6px 0"><span style="color:var(--red);font-weight:700">+</span><span>' + esc(p) + '</span></div>'; }).join('') + '</div>';
    var check = west ? studioCheck('SOC122|studio|' + w, {
      q: 'What is most at risk if this week\'s topic is treated as only a Western research-methods question?',
      options: [firstSentence(ind.coreIdea), 'Nothing important; the Western frame already covers it', 'Only the choice of examples or the citation style'],
      answer: 0,
      why: 'That is ' + ind.authors + '\'s own core idea, stated in the reading itself. Two-Eyed Seeing asks you to keep it in view with its own strength; whether and how it speaks to the Western frame is your work to decide, not the app\'s to write.'
    }) : '';
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Personal Cartography (.docx)</button></div>';
    return studioShell('Two attributed eyes', 'Read the two source frames as attributed readings, then bring Two-Eyed Seeing yourself. If you want a worked example of the practice, the Compare view can model one weaving; here, the weaving is yours.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px">' + panels + '</div>' + soloNote + practice + check + save);
  }
  function psyStudio(sel) {
    var w = focusWeek(sel), recs = recordsForWeek(w), r = recs[0] || D.records[0], g = conceptsForWeek(w)[0] || (D.glossary || [])[0], items = (r && MC[r.id]) || [];
    if (!r) return '';
    var ev = firstWhere(items, function (m) { return m.skill === 'argument' || m.skill === 'context'; });
    var panels = studioPanel('CLAIM', r.title, r.coreIdea, r.authors + ' (' + r.year + ')', 'book', '#1552D8')
      + studioPanel('EVIDENCE', ev ? ev.q : 'What supports the claim?', ev ? ev.why : firstSentence(r.abstract), 'Ground this in the reading before applying it.', 'search', '#1f7a4d')
      + studioPanel('BOUNDARY', 'What this does not prove', 'Do not turn this idea into a rule for every learner. Check the context, supports, workload, strategy, and evidence before giving advice.', g ? g.term : 'Course concept', 'x', '#B7791F')
      + studioPanel('TRANSFER', 'Academic next step', 'Name one course task, one support, one study strategy, and one sign that the strategy is working.', 'No clinical or diagnostic framing.', 'external', '#7C3AED');
    var check = studioCheck('PSY355|studio|' + w, {
      q: 'Which next step uses this idea responsibly, without turning it into a rule or blaming the student?',
      options: ['Name one course task, one support, and one sign the strategy is working, then check the context before advising.', 'Tell the student they just need more grit or a better attitude.', 'Apply it the same way to every student, whatever their situation.'],
      answer: 0,
      why: 'The responsible step respects the boundary: ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + ', but only within its supports and context. Grit-talk blames the learner; one-size-fits-all overstates the reading.'
    });
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Resilience Plan (.docx)</button></div>';
    return studioShell('Evidence Transfer Lab', 'Move from definition to responsible application: claim, evidence, boundary, then academic transfer.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">' + panels + '</div>' + check + save);
  }
  function bfsStudio(sel) {
    var w = focusWeek(sel), recs = recordsForWeek(w), r = recs[0] || D.records[0], g = conceptsForWeek(w)[0] || (D.glossary || [])[0];
    if (!r) return '';
    var response = firstWhere(D.records, function (x) { return (x.themes || []).indexOf('resistance') >= 0 || /Benjamin|Costanza|Tanksley/i.test(x.authors + ' ' + x.title); }) || r;
    var rows = [['System or technology', 'Name the system, platform, model, database, policy, or technical process.'], ['Design, data, or default', 'Locate the design choice, data source, rule, threshold, category, or default setting.'], ['Racialized mechanism', 'Explain how the system sorts, exposes, excludes, predicts, surveils, or ranks people.'], ['Harm and accountability', 'Name the harm and the institutions responsible for changing the structure, not just one bad actor.'], ['Response', 'Ground the repair, refusal, abolitionist tool, or policy response in the course readings.']];
    var chain = rows.map(function (row, i) { return '<div style="display:grid;grid-template-columns:34px minmax(0,1fr);gap:11px;align-items:start;background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:12px 14px"><div class="mono" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:#F6E3E1;color:var(--red);font-weight:700">' + (i + 1) + '</div><div><div style="font-size:.9375rem;font-weight:600;color:#15171C;margin-bottom:3px">' + esc(row[0]) + '</div><div style="font-size:.8125rem;line-height:1.5;color:#474C57">' + esc(row[1]) + '</div></div></div>'; }).join('');
    var anchor = '<div style="margin-top:14px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:7px">SOURCE ANCHORS</div><p style="font-size:.875rem;line-height:1.55;color:#15171C;margin:0 0 8px"><strong>' + esc(r.authors) + ':</strong> ' + esc(r.coreIdea) + '</p><p style="font-size:.875rem;line-height:1.55;color:#15171C;margin:0"><strong>Response reading:</strong> ' + esc(response.coreIdea) + '</p></div>';
    var check = studioCheck('BFS218|studio|' + w, {
      q: 'Which option names the racialized MECHANISM, not only the outcome or someone\'s intent?',
      options: [firstSentence(r.coreIdea), 'Someone built the system to be racist on purpose.', 'The unequal results just happened by chance.'],
      answer: 0,
      why: 'The mechanism sits in the design and data, not in intent or luck: ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '. That is the New Jim Code, harm built into how the system is made.'
    });
    var save = '<div style="margin-top:14px"><button onclick="SOC.saveStudio()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save my work to the Personal Cartography (.docx)</button></div>';
    return studioShell('Accountability Chain Lab', 'Trace techno-racism through mechanism and responsibility. A strong answer names structure, not only intent.', '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px">' + chain + '</div>' + anchor + (g ? '<div style="font-size:.75rem;color:#6B7280;margin-top:10px">Concept anchor: ' + esc(g.term) + '</div>' : '') + check + save);
  }
  function selfCheckStudio(sel) {
    var code = courseCode();
    if (code === 'SOC122') return socStudio(sel);
    if (code === 'PSY355') return psyStudio(sel);
    if (code === 'BFS218') return bfsStudio(sel);
    return '';
  }

  var MAP_CAVEAT = 'This layer is a teaching aid, not a legal or definitive boundary. Regions are anchored in the self-identified nations of the Indigenous scholars assigned this term. For authoritative representations of territories and treaties, consult the Nations themselves and sources such as Native-Land.ca. Map tiles load from OpenStreetMap/CARTO; everything else on this site is self-hosted.';
  var MAP_REGIONS = [
    { id: 'mikmaki-lawrence', region: "Mi'kma'ki (Atlantic)", admin: 'NS / NB / PEI / NL', nation: "Mi'kmaw", scholar: 'Bonita Lawrence', records: ['lawrence2003'], concept: 'regulation of Native identity; social structure', lat: 45.4, lng: -63.0, check: "Lawrence's account of identity regulation: law turns belonging into a bureaucratic category with gendered and racial effects." },
    { id: 'mikmaki-learning', region: "Mi'kma'ki (Atlantic)", admin: 'NS', nation: "Mi'kmaw", scholar: 'Marie Battiste; Albert Marshall', records: ['battiste', 'amarshall'], concept: 'learning spirit; Two-Eyed Seeing (Etuaptmumk)', lat: 45.95, lng: -60.65, check: "Battiste and Marshall's account of learning spirit and Two-Eyed Seeing as a whole-person, two-knowledge practice." },
    { id: 'mikmaki-palmater', region: "Mi'kma'ki (Atlantic)", admin: 'NB', nation: "Mi'kmaw, Eel River Bar", scholar: 'Pamela Palmater', records: ['palmater'], concept: 'poverty produced by law and policy', lat: 47.9, lng: -65.6, check: "Palmater's structural claim that poverty is produced by law and policy, not by culture or individual failure." },
    { id: 'blackfoot', region: 'Niitsitapi / Blackfoot', admin: 'southern Alberta', nation: 'Blackfoot, Kainai', scholar: 'Leroy Little Bear', records: ['littlebear'], concept: 'worldview difference at the root', lat: 49.6, lng: -113.1, check: "Little Bear's worldview claim: colonial mapping can hide the deeper clash between imposed Western categories and Indigenous worldviews." },
    { id: 'redriver', region: 'Red River / Metis homeland', admin: 'Manitoba / prairies', nation: 'Red River Metis; Cree-Metis; Metis', scholar: 'Zoe Todd; Kim Anderson; Janet Smylie', records: ['todd2016', 'anderson2019', 'smylie'], concept: 'place and ontology; kinship as work; centring Indigenous knowledge', lat: 49.9, lng: -97.1, check: 'Todd, Anderson, and Smylie keep place, kinship, and Indigenous health tied to relationships and knowledge control.' },
    { id: 'cree', region: 'Cree territory', admin: 'Sturgeon Lake / prairies-north', nation: 'Cree', scholar: 'Willie Ermine', records: ['ermine'], concept: 'ethical space', lat: 53.0, lng: -106.5, check: "Ermine's ethical space: the meeting place has to be negotiated, not governed by one side's rules." },
    { id: 'anishinaabe', region: 'Anishinaabe', admin: 'Great Lakes', nation: 'Anishinaabe', scholar: 'Amy Bombay', records: ['bombay2014'], concept: 'historical trauma across generations', lat: 48.7, lng: -94.2, check: "Bombay and colleagues' account of historical trauma and community connection across generations." },
    { id: 'aaniiih', region: 'Aaniiih', admin: 'Montana / medicine-line', nation: 'Aaniiih', scholar: 'Joseph P. Gone', records: ['gone2023'], concept: 'trauma as postcolonial, not individual', lat: 48.1, lng: -108.7, check: "Gone's warning that trauma and health inequities are postcolonial and community-defined, not only individual symptoms." }
  ];
  function mapActive() {
    return firstWhere(MAP_REGIONS, function (m) { return m.id === state.mapRegion; }) || MAP_REGIONS[0];
  }
  function mapRecords(m) {
    return (m.records || []).map(rec).filter(Boolean);
  }
  function mapCheck(m) {
    return {
      q: 'What is lost if you read this place only through the administrative label?',
      options: [m.check, 'Nothing important; the administrative label already contains the course concept.', 'Only the spelling of the place name changes.'],
      answer: 0,
      why: 'The administrative label can help you locate the anchor, but it does not carry the course concept by itself. The reading is what brings ' + m.concept + ' into view.'
    };
  }
  function mapLayerTitle(m) {
    return state.mapLayer === 'admin' ? m.admin : m.region;
  }
  function mapLayerMeta(m) {
    return state.mapLayer === 'admin' ? 'Administrative naming' : (m.scholar + ' (' + m.nation + ')');
  }
  function mapPoint(m) {
    var on = state.mapRegion === m.id;
    var label = mapLayerTitle(m), meta = mapLayerMeta(m);
    return '<button onclick="SOC.mapPick(\'' + m.id + '\')" aria-pressed="' + (on ? 'true' : 'false') + '" title="' + esc(m.region + ' / ' + m.admin) + '" style="position:absolute;left:' + m.x + '%;top:' + m.y + '%;transform:translate(-50%,-50%);width:138px;min-height:54px;display:flex;flex-direction:column;justify-content:center;gap:3px;text-align:center;border:2px solid ' + (on ? 'var(--red)' : '#DEE3EA') + ';background:' + (on ? '#F6E3E1' : '#fff') + ';color:#15171C;border-radius:10px;padding:7px 8px;box-shadow:0 4px 12px rgba(21,23,28,.10);font-size:.75rem;font-weight:700;line-height:1.18;white-space:normal;z-index:' + (on ? '4' : '2') + '"><span>' + esc(label) + '</span><span style="font-size:.62rem;font-weight:600;color:#6b7280;line-height:1.2">' + esc(meta) + '</span></button>';
  }
  function mapVisual() {
    var adminOn = state.mapLayer === 'admin', indOn = state.mapLayer === 'indigenous';
    var layerBtns = '<div style="display:flex;gap:4px;background:#EEF1F5;border-radius:9px;padding:4px;align-self:flex-start" role="group" aria-label="Map layer">'
      + '<button onclick="SOC.mapLayer(\'admin\')" aria-pressed="' + adminOn + '" style="' + segStyle(adminOn) + '">' + ic('grid', 15) + '<span>Administrative</span></button>'
      + '<button onclick="SOC.mapLayer(\'indigenous\')" aria-pressed="' + indOn + '" style="' + segStyle(indOn) + '">' + ic('eye', 15) + '<span>Indigenous scholar anchors</span></button></div>';
    return '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px"><div><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:4px">LAYER TOGGLE</div><h2 style="font-size:1.125rem;margin:0;color:#15171C">One land, two naming systems</h2></div>' + layerBtns + '</div>'
      + '<div style="overflow:auto;border:1px solid #DEE3EA;border-radius:14px;background:#EEF1F5">'
      + '<div role="img" aria-label="Teaching map of Canada using approximate reading anchors, not territory boundaries." style="position:relative;min-width:720px;min-height:430px;background:linear-gradient(180deg,#F7FBFF,#EEF1F5);overflow:hidden">'
      + '<div style="position:absolute;left:4%;right:4%;top:20%;bottom:18%;border-radius:46% 42% 38% 40%;background:#fff;border:1px solid #D6DEE9;box-shadow:inset 0 0 0 1px rgba(255,255,255,.8)"></div>'
      + '<div class="mono" style="position:absolute;left:20px;top:16px;font-size:.65rem;letter-spacing:.06em;color:#6B7280">PACIFIC</div>'
      + '<div class="mono" style="position:absolute;right:20px;top:16px;font-size:.65rem;letter-spacing:.06em;color:#6B7280">ATLANTIC</div>'
      + '<div class="mono" style="position:absolute;left:22px;bottom:17px;font-size:.65rem;letter-spacing:.06em;color:#6B7280">GENERAL READING ANCHORS ONLY</div>'
      + MAP_REGIONS.map(mapPoint).join('')
      + '</div></div>'
      + '<p style="font-size:.78rem;line-height:1.5;color:#6b7280;margin:10px 0 0">The visual marks general reading anchors only. It does not draw, define, or replace territory or treaty boundaries.</p>'
      + '</section>';
  }
  function mapNoteBox(k, label, prompt) {
    return '<label style="display:block;background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:13px 15px;margin-bottom:12px"><span class="mono" style="display:block;font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:6px">' + esc(label) + '</span><span style="display:block;font-size:.875rem;line-height:1.45;color:#15171C;margin-bottom:8px">' + esc(prompt) + '</span><textarea oninput="SOC.mapNote(\'' + k + '\',this.value)" style="width:100%;min-height:82px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + esc(state.mapNotes[k] || '') + '</textarea></label>';
  }
  function mapReadingRows(m) {
    return mapRecords(m).map(function (r) {
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:10px;padding:12px 14px;margin-bottom:9px"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px">' + eyePill(r) + weekTag(r) + '<span class="mono" style="font-size:.6875rem;color:#6B7280">' + esc(String(r.year)) + '</span></div><div style="font-size:.95rem;font-weight:700;color:#15171C;line-height:1.25">' + esc(r.title) + '</div><div style="font-size:.8125rem;color:#474C57;margin:3px 0 7px">' + esc(r.authors) + '</div><p style="font-size:.84rem;line-height:1.5;color:#474C57;margin:0">' + esc(r.coreIdea) + '</p><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:9px;background:none;border:none;color:#1552D8;font-size:.8125rem;font-weight:700;padding:0">' + readLabel(r) + ' &#8599;</button></div>';
    }).join('');
  }
  function mapDetail() {
    var m = mapActive();
    return '<section id="map-detail" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--red);font-weight:600;margin-bottom:6px">SELECTED ANCHOR</div>'
      + '<h2 style="font-size:1.25rem;line-height:1.25;margin:0 0 6px;color:#15171C">' + esc(m.region) + '</h2>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px"><span style="font-size:.75rem;font-weight:700;background:#EEF1F5;color:#15171C;border-radius:999px;padding:5px 9px">Administrative: ' + esc(m.admin) + '</span><span style="font-size:.75rem;font-weight:700;background:#E4F0E9;color:#1f4d38;border-radius:999px;padding:5px 9px">' + esc(m.nation) + '</span></div>'
      + '<div style="font-size:.875rem;line-height:1.55;color:#474C57;margin-bottom:11px"><strong>Scholar anchor:</strong> ' + esc(m.scholar) + '<br><strong>Concept:</strong> ' + esc(m.concept) + '</div>'
      + mapReadingRows(m)
      + studioCheck('SOC122|map|' + m.id, mapCheck(m))
      + '<div style="margin-top:14px"><button onclick="SOC.saveMap()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save to Personal Cartography (.docx)</button></div>'
      + '</section>';
  }
  function mapFallbackTable() {
    var rows = MAP_REGIONS.map(function (m) {
      return '<tr><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.region) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.admin) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.scholar + ' (' + m.nation + ')') + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.concept) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5"><button onclick="SOC.mapSelect(\'' + m.id + '\')" style="background:#fff;border:1px solid #DEE3EA;color:#15171C;border-radius:8px;padding:6px 10px;font-size:.8125rem;font-weight:700">Show on map</button></td></tr>';
    }).join('');
    return '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;margin-top:18px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04)"><div style="padding:14px 16px;border-bottom:1px solid #EEF1F5"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:4px">ACCESSIBLE TABLE</div><h2 style="font-size:1.0625rem;margin:0;color:#15171C">Same anchors without the visual</h2></div><div style="overflow:auto"><table style="width:100%;min-width:820px;border-collapse:collapse;font-size:.84rem;color:#15171C"><thead><tr style="text-align:left;background:#F7F8FA"><th style="padding:10px 12px">Indigenous layer</th><th style="padding:10px 12px">Administrative layer</th><th style="padding:10px 12px">Scholar anchor</th><th style="padding:10px 12px">Concept</th><th style="padding:10px 12px">Action</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
  }
  function mapById(id) { return firstWhere(MAP_REGIONS, function (m) { return m.id === id; }) || MAP_REGIONS[0]; }
  var _leafletMap = null, _leafletMarkers = {};
  function ensureLeaflet(cb) {
    if (window.L) { cb(); return; }
    if (!document.getElementById('leaflet-css')) { var lk = document.createElement('link'); lk.id = 'leaflet-css'; lk.rel = 'stylesheet'; lk.href = './vendor/leaflet/leaflet.css'; document.head.appendChild(lk); }
    if (document.getElementById('leaflet-js')) return;
    var sc = document.createElement('script'); sc.id = 'leaflet-js'; sc.src = './vendor/leaflet/leaflet.js';
    sc.onload = cb;
    sc.onerror = function () { var h = document.getElementById('soc-leaflet'); if (h) h.innerHTML = '<div style="padding:26px;color:#6b7280;font-size:.9rem;line-height:1.5">The interactive map could not load (you may be offline). The table below has the same anchors, scholars, and readings.</div>'; };
    document.head.appendChild(sc);
  }
  function initCartography() {
    var host = document.getElementById('soc-leaflet');
    if (!host || !window.L || host.getAttribute('data-init') === '1') return;
    host.setAttribute('data-init', '1');
    _leafletMap = L.map(host, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap contributors &copy; CARTO', subdomains: 'abcd', minZoom: 3, maxZoom: 11 }).addTo(_leafletMap);
    _leafletMarkers = {};
    var pts = [];
    MAP_REGIONS.forEach(function (m) {
      if (m.lat == null) return;
      pts.push([m.lat, m.lng]);
      var icon = L.divIcon({ className: '', html: '<div class="soc-pin"></div>', iconSize: [20, 20], iconAnchor: [10, 10], popupAnchor: [0, -11] });
      var mk = L.marker([m.lat, m.lng], { icon: icon, keyboard: true, title: m.scholar + ' (' + m.nation + ')', alt: m.scholar + ', ' + m.nation }).addTo(_leafletMap);
      mk.bindPopup(mapPopupHTML(m), { maxWidth: 260 });
      mk.on('click', function () { state.mapRegion = m.id; var el = document.getElementById('soc-mapdetail'); if (el) el.innerHTML = mapDetailInner(m); persist(); });
      _leafletMarkers[m.id] = mk;
    });
    if (pts.length) _leafletMap.fitBounds(L.latLngBounds(pts).pad(0.25));
  }
  function mapPopupHTML(m) {
    var r = mapRecords(m)[0];
    return '<div style="min-width:178px"><div style="font-size:.62rem;font-weight:700;letter-spacing:.04em;color:#1f4d38;text-transform:uppercase">' + esc(m.nation) + '</div>'
      + '<div style="font-size:.95rem;font-weight:700;color:#15171C;margin:2px 0 4px">' + esc(m.scholar) + '</div>'
      + (r ? '<div style="font-size:.8rem;color:#474C57;line-height:1.4">' + esc(r.title) + '</div><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:7px;background:#DA291C;border:none;color:#fff;border-radius:7px;padding:6px 11px;font-size:.78rem;font-weight:600;cursor:pointer">Open the reading</button>' : '')
      + '<div style="margin-top:6px;font-size:.7rem;color:#6B7280">Approximate anchor, not a boundary.</div></div>';
  }
  function mapDetailInner(m) {
    return '<section id="map-detail" style="background:#fff;border:1px solid var(--border);border-radius:14px;padding:16px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--red);font-weight:600;margin-bottom:6px">SELECTED ANCHOR</div>'
      + '<h2 style="font-size:1.25rem;line-height:1.25;margin:0 0 8px;color:#15171C">' + esc(m.scholar) + '</h2>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px"><span style="font-size:.75rem;font-weight:700;background:#E4F0E9;color:#1f4d38;border-radius:999px;padding:5px 9px">' + esc(m.nation) + '</span><span style="font-size:.75rem;font-weight:600;background:#EEF1F5;color:#474C57;border-radius:999px;padding:5px 9px">' + esc(m.region) + '</span></div>'
      + '<div style="font-size:.84rem;line-height:1.5;color:#474C57;margin-bottom:12px"><strong style="color:#15171C">Concept:</strong> ' + esc(m.concept) + '</div>'
      + mapReadingRows(m)
      + '</section>';
  }
  function mapNotesSaveBlock() {
    return '<section style="background:#fff;border:1px solid var(--border);border-radius:14px;padding:16px 18px;margin-top:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:6px">YOUR CARTOGRAPHY NOTES</div>'
      + '<label style="display:block"><span style="display:block;font-size:.875rem;line-height:1.5;color:#15171C;margin-bottom:8px">Pick an anchor on the map, open its reading, then note what reading this place through the scholar and the concept makes visible that an administrative map leaves out.</span>'
      + '<textarea oninput="SOC.mapNote(\'apply\',this.value)" style="width:100%;min-height:96px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid var(--border);border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + esc(state.mapNotes.apply || '') + '</textarea></label>'
      + '<div style="margin-top:14px"><button onclick="SOC.saveMap()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save to Personal Cartography (.docx)</button></div>'
      + '</section>';
  }
  function mapScreen() {
    var m = mapActive();
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:8px">PERSONAL CARTOGRAPHY</div>'
      + '<h1 style="font-size:1.75rem;line-height:1.2;font-weight:600;margin:0 0 8px;color:#15171C">Travel the country through the readings.</h1>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:#474C57;margin:0 0 14px;">Each pin marks where an Indigenous scholar assigned this term locates their own nation. Tap a pin to meet the scholar, the place, and the reading. Then note what each place makes visible.</p>'
      + '<div style="display:flex;align-items:flex-start;gap:10px;background:#FCEFD2;border:1px solid #E6C878;border-radius:12px;padding:12px 15px;margin:0 0 18px;color:#59410B;font-size:.85rem;line-height:1.5"><span style="display:flex;flex:none;color:#8F5E0F;margin-top:1px">' + ic('layers', 16) + '</span><span>' + esc(MAP_CAVEAT) + '</span></div>'
      + '<div class="soc-mapgrid">'
      + '<div><div id="soc-leaflet" style="height:540px;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:#EEF1F5" role="application" aria-label="Interactive map of approximate Indigenous scholar reading anchors across Canada"></div>'
      + '<p style="font-size:.78rem;line-height:1.5;color:#6b7280;margin:10px 0 0">Pins are approximate anchors at each scholar\'s self-identified nation. They do not draw, define, or replace territory or treaty boundaries.</p></div>'
      + '<aside id="soc-mapdetail">' + mapDetailInner(m) + '</aside>'
      + '</div>'
      + mapNotesSaveBlock()
      + mapFallbackTable()
      + '</div>';
  }
  function cardsScreen() {
    var weeks = weeksWithContent();
    var sel = state.cardWeek;
    var list = (D.glossary || []).filter(function (g) { return sel == null || g.week === sel; });
    var opts = '<option value="">All weeks</option>' + weeks.map(function (w) { return '<option value="' + w + '"' + (sel === w ? ' selected' : '') + '>Week ' + w + ': ' + esc(weekTitle(w)) + '</option>'; }).join('');
    return '<div class="rise">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:#6B7280;margin-bottom:8px">SELF-CHECK</div>'
      + '<h1 style="font-size:1.75rem;font-weight:600;margin:0 0 8px">Recall the concepts</h1>'
      + '<p style="font-size:.9375rem;color:#474C57;margin:0 0 18px;">Read the concept, define it in your own words, then flip the card to check yourself. Each card is one concept. Private study, never a test.</p>'
      + '<label for="soc-cardweek" style="font-size:.8125rem;font-weight:600;color:#474C57;display:block;margin-bottom:6px">Show concepts for</label>'
      + '<select id="soc-cardweek" onchange="SOC.cardWeek(this.value)" style="max-width:360px;padding:9px 12px;border:1px solid #DEE3EA;border-radius:9px;background:#fff;font-size:.9375rem;color:#15171C;margin-bottom:20px">' + opts + '</select>'
      + selfCheckStudio(sel)
      + '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">' + list.map(card).join('') + '</div></div>';
  }

  /* ---------- immersive journey shell ---------- */
  var JOURNEY_Q = {
    SOC122: {
      1: 'What makes a private trouble a public, patterned question, and who gets to decide what counts as knowledge?',
      2: 'What becomes possible when Indigenous and Western knowledges are held together, each kept whole?',
      3: 'Who decides what counts as knowledge in a classroom, and what would real change ask of the institution?',
      4: 'When the data itself fails Indigenous peoples, what does honest, accountable evidence look like?',
      5: 'What turns an assertion about people into a claim you can defend, and who gets to set the method?',
      6: 'If culture is just what a group learns and shares, how do we understand difference without ranking it, or borrow ideas without erasing people?',
      8: 'How much of who we are is made in relationship, and how much is decided by law?',
      9: 'Is inequality random, or is it engineered and then kept in place?',
      10: 'When we explain the mind, what do we miss if we forget history and colonization?',
      11: 'How much of identity and behaviour is shaped between people, and carried across generations?',
      12: 'What is a family: a structure, a set of relationships, or the ongoing work of keeping a home?'
    }
  };
  function journeyQ(w) { var c = (D.course && D.course.code) || ''; return (JOURNEY_Q[c] && JOURNEY_Q[c][w]) || 'What is this week asking you to see?'; }
  function journeyWeeks() { var c = (D.course && D.course.code) || '', s = {}; weeksWithReadings().forEach(function (w) { s[w] = 1; }); if (typeof WEEKPAGE !== 'undefined' && WEEKPAGE[c]) Object.keys(WEEKPAGE[c]).forEach(function (w) { s[+w] = 1; }); if (window.SOC122_KC && (window.SOC122_KC[7] || []).length) s[7] = 1; return Object.keys(s).map(Number).sort(function (a, b) { return a - b; }); }
  function currentJourneyWeek() { var ws = journeyWeeks(); if (!ws.length) return null; if (state.journeyWeek && ws.indexOf(state.journeyWeek) >= 0) return state.journeyWeek; return ws[0]; }
  function heroArt() {
    return '<svg class="jhero-art" viewBox="0 0 800 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
      + '<path d="M0,250 C160,210 300,300 460,250 C620,200 720,260 800,230 L800,320 L0,320 Z" fill="#DA291C" fill-opacity=".05"/>'
      + '<path d="M0,285 C180,250 320,320 500,280 C660,245 740,295 800,275 L800,320 L0,320 Z" fill="#1B2A4A" fill-opacity=".04"/>'
      + '<g stroke="#DA291C" stroke-opacity=".10" fill="none" stroke-width="1.4"><path d="M360,150 C480,110 600,180 760,130 C800,116 810,120 830,112"/><path d="M360,185 C480,150 600,215 760,165 C800,150 810,156 830,148"/></g>'
      + '<g fill="#DA291C" fill-opacity=".16"><circle cx="690" cy="70" r="2.6"/><circle cx="742" cy="118" r="1.8"/><circle cx="636" cy="52" r="1.6"/></g>'
      + '</svg>';
  }
  function journeyIntro() {
    var fr = (D.course && D.course.frame);
    if (fr) return 'One question runs through this course: how do we understand people and society, and whose knowledge counts? You follow it week by week, with two ways of seeing held side by side, ' + fr + '. Start at the top, or pick up where you left off.';
    return 'Follow one question through the whole course, week by week. Each week sets up what to read, why it matters, and one thing to do with it. Start at the top, or pick up where you left off.';
  }
  function deliveryOverviewPanel() {
    return '<section class="node" style="border-top:4px solid var(--red);margin-bottom:22px"><div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:7px">HOW THE TERM MOVES</div><h2 style="font-size:1.28rem;margin:0 0 8px">Live discussion, independent application, and supported closure</h2><p style="font-size:.95rem;line-height:1.6;color:var(--ink-dim);margin:0 0 12px">Weeks 1 to 3, 5 to 10, and 12 meet live. Week 4 gives you room to apply the early foundations independently. Week 11 is an independent synthesis week before the final live class. Week 13 protects supported completion, and Week 14 closes the course with optional consultation and no graded deadline.</p><button type="button" class="wk-cta" style="margin:0" onclick="SOC.go(\'calendar\')">See the full calendar and reasons</button></section>';
  }
  function journeyHome() {
    var ws = journeyWeeks(), cur = currentJourneyWeek(), started = !!state.journeyWeek;
    var title = (D.course && (D.course.name || D.course.code)) || 'Your course';
    var ctaLabel = started ? ('Resume Week ' + cur) : ('Start Week ' + (ws[0] || 1));
    var hero = '<section class="jhero jfade" style="margin-bottom:26px">' + heroArt()
      + '<div style="position:relative;">'
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.08em;color:var(--red);font-weight:600;margin-bottom:12px">SENECA POLYTECHNIC &middot; FALL 2026</div>'
      + '<h1 class="jhero-title" style="font-size:2.5rem;line-height:1.1;font-weight:600;margin:0 0 14px;letter-spacing:0">' + esc(title) + '</h1>'
      + '<p style="font-size:1.12rem;line-height:1.58;color:var(--ink);margin:0 0 16px">Our class meets live in most weeks. Four clearly marked asynchronous weeks create space to apply, synthesize, complete, and close the course with support.</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px">' + ['Live weeks clearly marked', 'Four asynchronous weeks', 'Recordings by week', 'Blackboard is official'].map(function (t) { return '<span class="mono" style="font-size:.7rem;font-weight:700;color:var(--red);background:#FBF3F2;border:1px solid #F0C8C3;border-radius:999px;padding:5px 11px">' + esc(t) + '</span>'; }).join('') + '</div>'
      + '</div></section>';
    var spineHead = '<div style="display:flex;align-items:baseline;gap:12px;margin:0 0 16px;flex-wrap:wrap"><h2 style="font-size:1.375rem;font-weight:600;margin:0;color:var(--ink)">Your journey</h2><span style="font-size:.875rem;color:var(--ink-faint)">' + ws.length + ' weeks, in course order</span></div>';
    return '<div class="rise">' + hero + deliveryOverviewPanel() + homeIntroCollapsible() + compassPanel() + lensHomeIntro() + spineHead + deliveryLegend() + journeyStations(null) + '</div>';
  }
  function journeyStations(cur) {
    var ws = journeyWeeks();
    var studyDivider = '<div style="display:flex;align-items:center;gap:12px;padding:11px 16px;border:1px dashed var(--border);border-radius:12px;background:#FAFBFC"><span class="mono" style="font-size:.66rem;font-weight:700;letter-spacing:.06em;color:var(--red)">STUDY WEEK</span><span style="font-size:.86rem;color:var(--ink-dim)">' + STUDY_WEEK_DATE + ' &middot; Seneca open, no classes, no new work</span></div>';
    var out = '', studyIn = false;
    var studyMarker = function () { var m = (ws.indexOf(7) < 0) ? '<div style="display:flex;align-items:center;gap:12px;padding:11px 16px;border:1px dashed var(--border);border-radius:12px;background:#FAFBFC"><span class="mono" style="font-size:.66rem;font-weight:700;letter-spacing:.06em;color:var(--ink-faint)">WEEK 7</span><span style="font-size:.86rem;color:var(--ink-dim)">' + esc(weekDate(7)) + ' &middot; Cumulative review, no new readings</span></div>' : ''; return m + studyDivider; };
    ws.forEach(function (w) {
      if (!studyIn && w >= 8) { out += studyMarker(); studyIn = true; }
      var recs = recordsForWeek(w), n = recs.length, isCur = (w === cur), mode = deliveryMode(w);
      var note = mode.short + ' · ' + ((w === OVERVIEW_WEEK) ? 'Course overview' : (WORK_WEEKS.indexOf(w) >= 0 ? 'Focus on your work, no new material' : (n ? (n + (n === 1 ? ' reading' : ' readings')) : 'Cumulative review')));
      out += '<button class="jstation' + (isCur ? ' cur' : '') + '" onclick="SOC.station(' + w + ')">'
        + '<div style="display:flex;align-items:flex-start;gap:16px">'
        + '<span class="jdot" style="display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;flex:none;border-radius:12px;background:' + (isCur ? 'var(--red)' : '#1B2A4A') + ';color:#fff;font-family:var(--mono);font-size:1.0625rem;font-weight:600">' + w + '</span>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:3px"><span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.05em;color:' + (mode.kind === 'live' ? '#15171C' : '#474C57') + ';background:#F4F4F4;border:1px solid ' + (mode.kind === 'live' ? '#15171C' : '#6B7280') + ';padding:2px 8px;border-radius:999px">' + (mode.kind === 'live' ? 'LIVE' : 'ASYNC') + '</span>' + lensCardBadge(w) + '<span class="mono" style="font-size:.66rem;color:var(--ink-faint);letter-spacing:.03em">' + esc(weekDate(w)) + '</span></div>'
        + (weekHasWork(w) ? '<span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.06em;color:#2c6b3f;background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:2px 8px">IN PROGRESS</span>' : '')
        + '<h3 style="font-size:1.0625rem;font-weight:600;margin:0 0 2px;color:var(--ink)">' + esc(weekTitle(w)) + '</h3>'
        + '<p style="font-size:.9375rem;line-height:1.5;color:var(--ink-dim);margin:0 0 8px">' + esc(journeyQ(w)) + '</p>' + lensCardLine(w)
        + '<div style="display:flex;align-items:center;gap:7px;font-size:.75rem;color:var(--ink-faint)"><span style="display:inline-flex;color:#6B7280">' + ic('book', 13) + '</span>' + esc(note) + '<span style="margin:0 4px">&middot;</span><span style="color:var(--red);font-weight:600">Open &rarr;</span></div>'
        + '</div></div></button>';
      if (w === 7) { out += studyDivider; studyIn = true; }
    });
    return '<div style="display:flex;flex-direction:column;gap:12px">' + out + '</div>';
  }
  function stationFraming(w, west, ind) {
    if (west && ind.length) return 'This week sets two readings side by side. ' + west.authors + ' brings the disciplinary view, and ' + ind[0].authors + ' brings an Indigenous one. They are not the same argument, and that is the point.';
    if (ind.length) return 'This week centres an Indigenous reading. Read it on its own terms before you reach for a frame from elsewhere.';
    if (west) return 'This week builds the disciplinary groundwork you carry forward into the rest of the course.';
    return '';
  }
  function stationReading(r, kicker) {
    var u = readUrl(r), eye = r.eye === 'indigenous' ? 'INDIGENOUS' : (r.eye === 'western' ? 'WESTERN' : ''), accent = r.eye === 'indigenous' ? '#1f4d38' : '#3a47a8';
    var look = r.assigned ? ('<div style="margin-top:10px;background:#F7F8FA;border-left:3px solid ' + accent + ';padding:8px 12px;border-radius:0 8px 8px 0;font-size:.8125rem;line-height:1.5;color:var(--ink-dim)"><span style="font-weight:600;color:var(--ink)">Read:</span> ' + esc(r.assigned) + '</div>') : '';
    return '<div style="border:1px solid var(--border);border-top:4px solid ' + accent + ';background:#fff;border-radius:13px;padding:17px 19px">'
      + '<div style="display:flex;align-items:center;gap:9px;margin-bottom:7px"><span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.04em;color:' + accent + '">' + esc(kicker) + '</span>' + (eye ? '<span class="mono" style="font-size:.625rem;color:#6B7280">' + eye + ' EYE</span>' : '') + '</div>'
      + '<h3 style="font-size:1.1875rem;line-height:1.3;font-weight:600;margin:0 0 3px;color:var(--ink)">' + esc(r.title) + '</h3>'
      + '<div style="font-size:.8125rem;color:var(--ink-dim);margin-bottom:9px">' + esc(r.authors) + ' &middot; ' + esc(String(r.year)) + '</div>'
      + '<p style="font-size:.9375rem;line-height:1.55;color:var(--ink-dim);margin:0">' + esc(r.coreIdea) + '</p>'
      + look
      + '<div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">'
      + (u ? '<button onclick="SOC.read(\'' + r.id + '\')" style="display:inline-flex;align-items:center;gap:7px;background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Open the reading' + ic('external', 14, 2.2) + '</button>' : '')
      + '<button onclick="SOC.open(\'' + r.id + '\')" style="background:#fff;border:1px solid var(--border);color:var(--ink);border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Details</button>'
      + '</div></div>';
  }
  function stationDo(w) {
    var tiles = [['See it for yourself', 'Work this week\'s readings in the Self-Check Studio.', 'clipboard', 'SOC.goWeek(\'cards\',' + w + ')']];
    if (D.course && D.course.frame) tiles.push(['Locate it on your map', 'Add this week to your Personal Cartography.', 'globe', 'SOC.go(\'map\')']);
    tiles.push(['Hold two readings together', 'Compare any two readings, side by side.', 'columns', 'SOC.go(\'compare\')']);
    var th = tiles.map(function (t) {
      return '<button class="jtile" onclick="' + t[3] + '"><span style="display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:11px;background:#F6E3E1;color:var(--red)">' + ic(t[2], 19) + '</span><h4 style="font-size:1rem;font-weight:600;margin:4px 0 0;color:var(--ink)">' + t[0] + '</h4><p style="font-size:.84rem;line-height:1.5;color:var(--ink-dim);margin:0">' + t[1] + '</p></button>';
    }).join('');
    return '<div style="margin-top:8px"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--ink-faint);margin:0 0 12px">NOW DO SOMETHING WITH IT</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px">' + th + '</div></div>';
  }
  var WEEKPAGE = {
    SOC122: {
      1: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "", "overview": "Welcome to Introduction to the Social Sciences. The social sciences study how people live, relate, organize, and make meaning together, and they ask you to treat everyday life as something you can examine rather than simply live through. One of the first tools you will meet is the sociological imagination, the idea that a private experience is also tied to history and social structure. This course reads the social world through two knowledge systems held together, Western social science and Indigenous knowledge, and the work of holding both belongs to you, not to a single blended answer.", "purpose": "Week 1 introduces what social science is and gives you a first way of seeing: the sociological imagination, which links a person's private troubles to public, patterned questions. It also opens the frame for the whole course, in which a Western way of knowing and an Indigenous way of knowing are set side by side so you can engage both honestly rather than collapsing them into one.", "outcomes": ["By the end of this week you can explain what the social sciences study and why everyday life can be examined rather than simply lived.", "By the end of this week you can use the sociological imagination to connect a personal experience to history and social structure.", "By the end of this week you can describe, in their own framing, Ermine's idea of ethical space and Battiste's idea of learning as a lifelong journey of the spirit.", "By the end of this week you can hold a Western and an Indigenous way of knowing side by side without merging them into a single answer."], "guiding": ["What is the difference between living your everyday life and examining it the way a social scientist would?", "Take one choice that feels entirely private. How is it also shaped by history and social structure?", "Ermine says an ethical space opens when two worldviews meet. What would it mean to name your own assumptions before speaking across that gap?", "Battiste describes learning as nourishing the spirit across a whole life. How is that different from the way you usually picture learning in school?"], "checks": [{"t": "What the social sciences study, and the idea that everyday life can be examined rather than simply lived", "look": "the OpenStax reading"}, {"t": "The sociological imagination: how a private experience is tied to history and social structure", "look": "the OpenStax reading"}, {"t": "Ethical space: the charged gap that opens when two worldviews meet, where each side's assumptions can be named rather than hidden", "look": "Ermine, 2007"}, {"t": "Learning as a lifelong, holistic journey of the whole person and spirit, nurtured by family, community, and land", "look": "Battiste, 2010"}, {"t": "Practising the move from a private experience to a public, patterned question by matching everyday moments to the idea that explains them", "look": "the activity"}], "concepts": [{"h": "The sociological imagination", "body": "OpenStax opens sociology by treating everyday life as something you can examine rather than simply live. Its central tool is the sociological imagination, C. Wright Mills' idea that a person's choices and experiences are tied to history and social structure. So a decision that feels entirely private, such as whether and whom to marry, is also shaped by social acceptability and circumstance. The lesson is that sociology is a way of seeing, not just a body of facts.", "cite": "OpenStax, 2021"}, {"h": "Scientific inquiry and empirical evidence", "body": "Social science checks its claims through a repeating process: asking a question, gathering evidence, analyzing it, and revising the answer. OpenStax describes this inquiry as self-correcting, so a conclusion stays provisional and open to better evidence. It rests on empirical evidence, information gathered through observation and experience that other people can examine, which is what separates a scientific account from an opinion or assumption.", "cite": "OpenStax, 2021"}, {"h": "Ethical space", "body": "Willie Ermine, who is Cree, argues that when two societies with different worldviews meet, an ethical space opens in the gap between them. It is a charged area where the deeper assumptions, interests, and ways of knowing on each side can be named rather than left hidden. He shows how the dominant culture's claim to universal authority can silence Indigenous thought, and he proposes agreed rules of engagement, built from both sides, as the ground for honest dialogue. Ethical space is a way to engage across knowledge systems without one side's rules simply overriding the other.", "cite": "Ermine, 2007"}, {"h": "Learning as a journey of the spirit", "body": "Marie Battiste, who is Mi'kmaw, describes learning in Indigenous traditions as a lifelong journey of the spirit toward the gifts and purpose a person is born with, nurtured by family, community, land, and ceremony rather than confined to a classroom. She frames this holistic learning spirit, in her own words, and contrasts it with schooling, including residential schools, that ignored or attacked Indigenous knowledge. For a student, learning becomes the formation of a whole person across a life, not just information passed on in school.", "cite": "Battiste, 2010"}], "terms": [{"term": "Sociological imagination", "def": "C. Wright Mills' idea, introduced in the OpenStax chapter, that a person's private choices and experiences are tied to history and social structure, so a private trouble is also a public, patterned question.", "cite": "OpenStax, 2021"}, {"term": "Empirical evidence", "def": "information gathered through observation and experience that other people can examine, rather than opinion or assumption; because it can be checked by others, it is the shared ground on which social scientists build and contest their claims.", "cite": "OpenStax, 2021"}, {"term": "Ethical space", "def": "Ermine's term for the charged gap that opens when two societies with different worldviews meet, where the assumptions and ways of knowing on each side can be named, and where agreed rules of engagement built from both sides make honest dialogue possible.", "cite": "Ermine, 2007"}, {"term": "Learning spirit", "def": "Battiste's term for learning understood as a lifelong, holistic journey of the whole person toward their gifts and purpose, nurtured by family, community, and land rather than confined to a classroom.", "cite": "Battiste, 2010"}], "readings": [{"apa": "OpenStax. (2021). An introduction to sociology. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/1-introduction", "scope": "Open access", "id": "soc-intro"}, {"apa": "Ermine, W. (2007). The ethical space of engagement. Indigenous Law Journal, 6(1), 193-203.", "scope": "Open access", "id": "ermine"}, {"apa": "Battiste, M. (2010). Nourishing the learning spirit. Education Canada, 50(1), 14-18.", "scope": "Open access", "id": "battiste"}], "activity": {"screen": "activity", "archetype": "match", "title": "Read the social world", "what": "You match everyday moments to the idea from this week that helps you see what is really going on beneath them.", "why": "so you practise the core move of social science, turning a private experience into a public, patterned question, and notice when an idea comes from the Western reading and when it comes from a named Indigenous scholar.", "data": {"prompt": "Match each everyday moment to the idea that helps you see it.", "pairs": [{"item": "You assume you chose your major entirely on your own, then notice your family, your school, and the job market all shaped the options you saw", "match": "The sociological imagination", "why": "because a choice that feels private is tied to history and social structure, the link Mills names in the OpenStax reading", "cite": "OpenStax, 2021"}, {"item": "Two friends argue about whether a study's claim is true, and one says we should look at what was actually observed, not just how it feels", "match": "Empirical evidence", "why": "because social science settles claims on information others can examine, not on opinion or assumption, as the OpenStax reading sets out", "cite": "OpenStax, 2021"}, {"item": "In a group project, people from very different backgrounds keep talking past each other, and someone suggests naming each side's assumptions before going further", "match": "Ethical space", "why": "because Ermine describes the charged gap between worldviews as a place where assumptions can be named rather than hidden, with rules built from both sides", "cite": "Ermine, 2007"}, {"item": "An older relative says the most important things they learned came from family, land, and community, long before and after any classroom", "match": "Learning as a journey of the spirit", "why": "because Battiste, in her own framing, describes learning as a lifelong, holistic journey nurtured by family, community, and land, not confined to school", "cite": "Battiste, 2010"}, {"item": "You catch yourself treating one way of knowing as the only valid one, and pause to ask what another knowledge system might see here", "match": "Two ways of knowing held side by side", "why": "because this course sets a Western and an Indigenous way of knowing alongside each other, and Ermine warns against one worldview claiming universal authority over the other", "cite": "Ermine, 2007"}]}}, "youcan": ["You can now explain what the social sciences study and why everyday life can be examined rather than simply lived", "You can now use the sociological imagination to connect a personal experience to history and social structure", "You can now describe Ermine's ethical space and Battiste's learning spirit in their own framing, and hold both eyes side by side"], "reflectPrompt": "In a sentence or two: think of one moment from your week and look at it twice, first through the sociological imagination and then through Ermine's or Battiste's framing. What does each way of seeing show you that the other does not, and what is it like to hold both at once without deciding which is right?"},
      2: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week02", "overview": "This is the framing week for the whole course. Everything you do in SOC122 sits inside one stance: Two-Eyed Seeing. Mi'kmaw Elder Albert Marshall gave us this idea, and the gift is his. He asks you to learn to see with one eye the strengths of Indigenous ways of knowing, and with the other eye the strengths of Western ways of knowing, and, most of all, to use both eyes together for the benefit of all. To understand why this takes real effort, you also read Leroy Little Bear, who shows that Indigenous and Eurocentric worldviews differ at their philosophical roots. They are not two versions of the same picture; they reach the world through different assumptions about time, relationship, and reality. This week you do not blend the two systems into one, and you do not treat Western knowledge as the default that Indigenous knowledge gets added to. You learn what the stance asks of you, and you begin to practise holding both eyes open.", "purpose": "Week 2 sets the stance you will carry through every later week. You read Two-Eyed Seeing in the words of the Elder who named it, Albert Marshall, and you read Leroy Little Bear on why two worldviews can describe the same world and still differ at the root. The aim is to be able to state, in your own words, what Two-Eyed Seeing asks of you: to honour both ways of knowing as whole and complete, to keep them side by side rather than collapsing them into one, and to treat the work as an ongoing journey of co-learning, not a slogan.", "outcomes": ["By the end of this week you can describe Two-Eyed Seeing as Elder Albert Marshall frames it: using the strengths of Indigenous and Western ways of knowing together, for the benefit of all, with neither one displacing the other (Marshall, 2017).", "By the end of this week you can explain, using Leroy Little Bear, why Indigenous and Eurocentric worldviews differ at their philosophical roots, and why that difference matters (Little Bear, 2000).", "By the end of this week you can name what it means to hold both eyes open at once, rather than blending the two systems or treating one as the default (Marshall, 2017).", "By the end of this week you can recognise Two-Eyed Seeing as an ongoing co-learning journey and a gift from Elder Albert Marshall, not a slogan to be trivialized, romanticized, or co-opted (Marshall, 2017)."], "guiding": ["In Marshall's words, what does it mean to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and why does he stress using both eyes together (Marshall, 2017)?", "Little Bear says Indigenous and Eurocentric worldviews differ at the root. What are some of the differences he names, and how would you describe them in your own words (Little Bear, 2000)?", "Why does Marshall insist Two-Eyed Seeing must not be trivialized or co-opted into jargon, and what would it look like to take the stance seriously instead (Marshall, 2017)?", "What is the difference between holding two ways of knowing side by side and blending them into one, and why does Marshall ask you to do the first, not the second (Marshall, 2017)?"], "checks": [{"t": "Two-Eyed Seeing in the words of the Elder who named it: seeing the strengths of both Indigenous and Western ways of knowing, and using both eyes together for the benefit of all", "look": "the Marshall reading and video"}, {"t": "That Two-Eyed Seeing is Elder Albert Marshall's gift, an ongoing co-learning journey, not a slogan to be trivialized, romanticized, or co-opted", "look": "the Marshall reading"}, {"t": "Why Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality, as Little Bear describes them", "look": "the Little Bear reading"}, {"t": "Why holding both eyes side by side is different from blending the two systems into one or treating Western knowledge as the default", "look": "the Marshall reading and the activity"}, {"t": "What the stance asks of you personally, so you can carry Two-Eyed Seeing into every later week of the course", "look": "the activity and your own notes"}], "concepts": [{"h": "Two-Eyed Seeing (Etuaptmumk): the gift and the stance", "body": "Two-Eyed Seeing is Mi'kmaw Elder Albert Marshall's guiding principle, and the English phrase is his. He describes learning to see with one eye the strengths of Indigenous ways of knowing, and with the other eye the strengths of Western ways of knowing, and, most importantly, using both eyes together for the benefit of all. Each way of knowing is a whole, complete eye in its own right, not something to be checked against the other. This is the organizing frame for the entire course, and it is offered here in the coiner's own words.", "cite": "Marshall, 2017"}, {"h": "Both eyes together: do not collapse, do not rank", "body": "The heart of the stance is the word together. Marshall does not ask you to blend the two ways of knowing into a single picture, and he does not ask you to treat Western knowledge as the default that Indigenous knowledge gets added to. He asks you to keep both eyes open at once, so each tradition can do what it does best, for the benefit of all. Holding them side by side, with neither displacing the other, is harder than picking one, and that difficulty is part of the point.", "cite": "Marshall, 2017"}, {"h": "An ongoing co-learning journey, not a slogan", "body": "Marshall is clear that Two-Eyed Seeing is a journey, not a finished idea you can master and set down. It is ongoing co-learning between knowledge traditions, grounded in responsibility and the well-being of future generations. He warns against letting it be trivialized, romanticized, or co-opted into mere jargon. Taking the stance seriously means returning to it, practising it, and letting it shape how you work, rather than treating the phrase as a label.", "cite": "Marshall, 2017"}, {"h": "Why it takes effort: worldviews differ at the root", "body": "Leroy Little Bear explains why holding both eyes open is real work. He argues that Indigenous and Eurocentric worldviews differ at their philosophical roots: an Indigenous worldview of constant flux, wholeness, relationship, and renewal, where all things are animate and time simply is, set against a Eurocentric worldview that is more linear, singular, static, and objective. Because the two reach the world through different assumptions, naming the difference is the first step toward holding them together with respect rather than collapsing one into the other.", "cite": "Little Bear, 2000"}], "terms": [{"term": "Two-Eyed Seeing (Etuaptmumk)", "def": "Mi'kmaw Elder Albert Marshall's guiding principle of using the strengths of Indigenous ways of knowing through one eye and the strengths of Western ways of knowing through the other, and using both eyes together for the benefit of all. It does not blend or rank the two traditions; it holds them side by side so each can do what it does best. It is the gift of Elder Albert Marshall and the organizing frame for this whole course.", "cite": "Marshall, 2017"}, {"term": "Co-learning journey", "def": "Marshall's description of Two-Eyed Seeing as an ongoing, respectful practice between knowledge traditions, not a slogan to be trivialized, romanticized, or co-opted. It is a journey because there is no fixed endpoint: each person keeps learning to see with both eyes over time, and the traditions teach one another.", "cite": "Marshall, 2017"}, {"term": "Worldview", "def": "Little Bear's term for the shared set of assumptions about reality, time, and relationship that a culture uses to interpret the world. He argues that Indigenous and Eurocentric worldviews differ at this root, so two ways of knowing can describe the same world and still reach it through very different assumptions. A worldview usually operates below awareness, which is why naming it is the first step toward holding two eyes together with respect.", "cite": "Little Bear, 2000"}, {"term": "Jagged worldviews", "def": "Little Bear's image for what happens when colonialism forces two root-level different worldviews together by power and law, without recognition, leaving a fragmented consciousness among colonized peoples that still shapes daily life. The word jagged marks that the meeting was not smooth, which is exactly why Two-Eyed Seeing asks for care rather than a careless blending of the two systems.", "cite": "Little Bear, 2000"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "Open access", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "Open access", "id": "littlebear"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "What Two-Eyed Seeing asks of you", "what": "You gather the elements of the Two-Eyed Seeing stance, as Marshall and Little Bear describe them, and set them side by side so you can see what the stance asks of you.", "why": "so you can practise holding both eyes open from the start, and carry the frame, in your own words and not as a slogan, into every later week.", "data": {"goal": "Assemble the elements of the Two-Eyed Seeing stance, as Marshall and Little Bear describe it, so you can practise holding both eyes together rather than blending them into one or treating either way of knowing as the default. The stance is Elder Albert Marshall's gift; your task is to hold the elements, not to write the synthesis for anyone else.", "components": [{"label": "One eye for the strengths of Indigenous ways of knowing", "role": "asks you to see Indigenous knowledge as a whole, complete eye in its own right, valid on its own terms and not as a supplement to Western science.", "cite": "Marshall, 2017"}, {"label": "One eye for the strengths of Western ways of knowing", "role": "asks you to see Western knowledge as a whole eye too, with its own strengths, so that neither eye becomes the default the other is measured against.", "cite": "Marshall, 2017"}, {"label": "Both eyes used together, for the benefit of all", "role": "asks you to keep both eyes open at once and use them together, so each tradition can do what it does best, rather than blending them into one or ranking them.", "cite": "Marshall, 2017"}, {"label": "Respect for the root difference between worldviews", "role": "asks you to remember that Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality, so you hold them with care rather than collapsing one into the other.", "cite": "Little Bear, 2000"}, {"label": "An ongoing co-learning journey, not a slogan", "role": "asks you to treat the stance as ongoing practice grounded in responsibility, returning to it over time, and refusing to let it be trivialized, romanticized, or co-opted into jargon.", "cite": "Marshall, 2017"}]}}, "youcan": ["You can now describe Two-Eyed Seeing in Elder Albert Marshall's own terms: both eyes together, for the benefit of all, with neither way of knowing displacing the other", "You can now explain, using Little Bear, why Indigenous and Eurocentric worldviews differ at the root, and why that makes the stance real work rather than a slogan", "You can now name what the stance asks of you, and carry Two-Eyed Seeing as the frame into every later week of the course"], "reflectPrompt": "In a sentence or two, and in your own words: what does Two-Eyed Seeing ask of you, as Elder Albert Marshall frames it, and what is the hardest part of holding both eyes open at once rather than choosing one?"},
      3: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week03", "overview": "This week asks a plain question with a long history behind it: whose knowledge counts, and who gets to decide? You meet two scholars who answer it from different angles. Debbie Martin describes Two-Eyed Seeing as a respectful pairing of Indigenous and non-Indigenous knowledge, where the two are held together as partners and neither is ranked above the other or absorbed into the other. Brunette-Debassige and colleagues turn to the classroom and the institution, and show that what a school treats as legitimate knowledge is a decision that was made by people and can be remade. Holding both in view, you start to see that knowledge does not simply count on its own. Someone, or some structure, decides that it counts.", "purpose": "Week 3 takes the Two-Eyed Seeing frame you met in Week 2 and looks at the question underneath it: how does a classroom or an institution decide what counts as knowledge, and what would respectful pairing actually require? You work with two scholars on their own terms. Martin frames respectful pairing as the heart of Two-Eyed Seeing. Brunette-Debassige and colleagues frame the legitimacy of knowledge as an institutional decision. The aim is to name the parts of that decision and the conditions of respectful pairing, not to resolve the tension between two knowledge systems into one neat answer.", "outcomes": ["By the end of this week you can explain, in Martin's terms, what respectful pairing of Indigenous and non-Indigenous knowledge means and how it differs from ranking one above the other (Martin, 2012).", "By the end of this week you can explain, in the terms of Brunette-Debassige and colleagues, why what counts as knowledge in a classroom is an institutional decision rather than a given (Brunette-Debassige et al., 2022).", "By the end of this week you can name the parts of how an institution decides what counts as knowledge, and distinguish adding Indigenous content from changing who holds authority (Brunette-Debassige et al., 2022).", "By the end of this week you can describe what respectful pairing requires without writing a bridge that dissolves the difference between the two knowledge systems (Martin, 2012)."], "guiding": ["Martin describes pairing rather than ranking. What is the difference, and why does she treat pairing as something that has to be practised rather than copied (Martin, 2012)?", "Brunette-Debassige and colleagues say the knowledge a classroom treats as legitimate was decided, not given. Who decided, and what does it mean that the decision can be remade (Brunette-Debassige et al., 2022)?", "What is the difference between adding Indigenous readings to an unchanged course and changing who holds authority over what counts (Brunette-Debassige et al., 2022)?", "Martin ties pairing to sovereignty: the community sets the terms on which its knowledge is shared. How does that change what a respectful pairing can ask for (Martin, 2012)?"], "checks": [{"t": "What Two-Eyed Seeing means as a respectful pairing of Indigenous and non-Indigenous knowledge, held as partners rather than ranked", "look": "the Martin reading"}, {"t": "Why what counts as knowledge in a classroom is an institutional decision that was made and can be remade, not a fact handed down", "look": "the Brunette-Debassige and colleagues reading"}, {"t": "The difference between adding Indigenous content to an unchanged structure and changing who holds authority over what counts", "look": "the Brunette-Debassige and colleagues reading"}, {"t": "Why respectful pairing depends on sovereignty: the community setting the terms on which its knowledge is engaged, so it is not extracted into a Western frame", "look": "the Martin reading"}, {"t": "Naming the parts of how knowledge gets decided, and what respectful pairing requires, without writing a bridge that resolves the tension for you", "look": "the activity and both readings"}], "concepts": [{"h": "Respectful pairing, not ranking", "body": "Debbie Martin describes Two-Eyed Seeing as a respectful pairing of Indigenous and non-Indigenous knowledge. The two approaches are held together as partners that can inform one another, and neither is ranked above the other or absorbed into the other. Pairing is not a method you copy once and are done with. It is a relationship that has to be practised, which is why it cannot be reduced to a checklist of readings.", "cite": "Martin, 2012"}, {"h": "What counts as knowledge is decided", "body": "Brunette-Debassige and colleagues argue that the knowledge a classroom treats as legitimate was decided, not given. People and structures made that decision, often long ago, and a decision can be remade. This reframes a familiar feeling that some knowledge just is academic and other knowledge is not. That ranking was put in place; it did not arrive on its own.", "cite": "Brunette-Debassige et al., 2022"}, {"h": "Adding content is not the same as changing authority", "body": "Brunette-Debassige and colleagues distinguish two very different moves. One adds Indigenous readings to a course whose structure stays the same. The other changes how the curriculum is built and who holds authority over what counts. They describe decolonizing as removing colonial barriers and Indigenizing as ongoing institutional work, and they show that only the second move changes the decision about whose knowledge counts.", "cite": "Brunette-Debassige et al., 2022"}, {"h": "Pairing depends on sovereignty", "body": "Martin ties respectful pairing to sovereignty: the authority of a people to govern themselves and to set the terms on which their knowledge is shared and used. Pairing respects sovereignty when Indigenous knowledge is engaged on its own terms rather than extracted into a Western frame. This is what keeps pairing from becoming another way of taking. The community, not the institution, sets the terms.", "cite": "Martin, 2012"}], "terms": [{"term": "Two-Eyed Seeing", "def": "the respectful pairing of Indigenous and non-Indigenous approaches to knowledge, holding the two together as partners that can inform one another, without ranking one above the other or absorbing one into the other.", "cite": "Martin, 2012"}, {"term": "Respectful pairing", "def": "Martin's term for bringing two knowledge systems together as equals that must be practised as an ongoing relationship, rather than copied as a fixed method or merged into a single account.", "cite": "Martin, 2012"}, {"term": "Indigenizing", "def": "making space within institutions for Indigenous knowledge, peoples, and ways of doing, which changes how a curriculum is built and who holds authority in it, rather than only adding content to an unchanged structure.", "cite": "Brunette-Debassige et al., 2022"}, {"term": "Sovereignty", "def": "the authority of a people to govern themselves by their own laws and relationships, which in the context of knowledge includes the right to control their own knowledge and set the terms on which it is shared and used.", "cite": "Martin, 2012"}], "readings": [{"apa": "Martin, D. H. (2012). Two-Eyed Seeing: A framework for understanding Indigenous and non-Indigenous approaches to Indigenous health research. Canadian Journal of Nursing Research, 44(2), 20-42.", "scope": "Open access", "id": "martin2012"}, {"apa": "Brunette-Debassige, C., Wakeham, P., Smithers Graeme, C., Haque, A., & Chitty, S. (2022). Decolonizing and Indigenizing the curriculum: A review of perspectives and approaches in Canadian higher education. Western University.", "scope": "Open access", "id": "brunette2022"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Whose knowledge counts", "what": "You assemble the parts of how a classroom or institution decides what counts as knowledge, and the conditions respectful pairing requires, attributing each part to the scholar who names it.", "why": "so you can name the moving parts of the decision and the requirements of pairing on the scholars' own terms, without writing a bridge that resolves the tension between the two knowledge systems for you.", "data": {"goal": "Assemble two things side by side: the parts of how a classroom or institution decides what counts as knowledge, as Brunette-Debassige and colleagues describe them, and what respectful pairing of Indigenous and non-Indigenous knowledge requires, as Martin describes it. Keep each part attributed to its scholar. The point is not to merge the two into one answer; it is to see clearly what each names and where the tension between them sits.", "components": [{"label": "The decision about what counts", "role": "names the starting move: the knowledge a classroom treats as legitimate was decided by people and structures, not handed down, which means it can be remade", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Who holds authority", "role": "names who gets to make and remake that decision, and shows that changing the list of readings is not the same as changing who holds authority over what counts", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Indigenizing the structure", "role": "names the institutional work of making space for Indigenous knowledge and ways of doing, which changes how a curriculum is built rather than only adding content to an unchanged structure", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Pairing as partners, not a ranking", "role": "names what respectful pairing requires: holding Indigenous and non-Indigenous knowledge together as partners, with neither ranked above the other or absorbed into the other", "cite": "Martin, 2012"}, {"label": "Pairing as a practised relationship", "role": "names that pairing is not a method to copy once but a relationship that must be practised, so it cannot be reduced to a checklist", "cite": "Martin, 2012"}, {"label": "Sovereignty over the terms", "role": "names the condition that the community sets the terms on which its knowledge is shared and used, so pairing engages Indigenous knowledge on its own terms rather than extracting it into a Western frame", "cite": "Martin, 2012"}]}}, "youcan": ["You can now explain respectful pairing in Martin's terms and say how it differs from ranking one knowledge system above the other (Martin, 2012)", "You can now explain why what counts as knowledge in a classroom is an institutional decision that was made and can be remade (Brunette-Debassige et al., 2022)", "You can now name the parts of that decision and the conditions of respectful pairing, and hold the tension between them without resolving it for someone else"], "reflectPrompt": "In a sentence or two: think of one course or setting you have been in. Who decided what counted as real knowledge there, and what would it take to remake that decision in the direction Brunette-Debassige and colleagues describe (Brunette-Debassige et al., 2022)?"},
      4: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week04", "overview": "This week is about truth, and about the order of the words: truth comes before reconciliation. The Truth and Reconciliation Commission documented the residential school system and issued Calls to Action directed at governments, institutions, and Canadians, establishing a public record of harm before naming concrete steps toward repair. Smylie and Anderson show why this order matters for the social sciences: standard health data systems systematically fail Indigenous peoples in Canada, so present-day patterns are too often read as fixed traits rather than the result of a history with a cause. This is structural and historical truth as the scholars and the public record frame it. You will not role-play harm or speak for Survivors or communities. Instead, you will assemble what genuine truth-telling and accountability require before reconciliation can be more than apology.", "purpose": "Week 4 establishes that reconciliation is the ongoing work of repairing relationships grounded in truth and responsibility, not apology alone, and that honest knowledge is a precondition for repair. The point of this week is to help you name the elements that truth-telling and accountability require: an accurate public record of what happened, data that does not erase or stereotype Indigenous peoples, an honest account of how harm passes across generations, and processes that Indigenous communities own and shape. The aim is to be able to tell the difference between an apology and the conditions that make repair possible.", "outcomes": ["By the end of this week you can explain why truth comes before reconciliation, after Smylie and Anderson (2006).", "By the end of this week you can describe what the Truth and Reconciliation Commission documented and why a public record of harm matters.", "By the end of this week you can explain intergenerational impact and cultural safety as the social sciences frame them, and attribute them to Smylie and Anderson (2006).", "By the end of this week you can assemble the elements that genuine truth-telling and accountability require before reconciliation."], "guiding": ["Why do Smylie and Anderson argue that honest knowledge is a precondition for repair, not an optional add-on?", "The Truth and Reconciliation Commission built a public record before it named steps toward repair. Why does that order matter?", "What does it change to read a present-day health pattern as intergenerational impact rather than as a fixed trait?", "Smylie and Anderson say closing health inequities requires data Indigenous communities own and shape. Why is better counting by outsiders not enough?"], "checks": [{"t": "Why truth comes before reconciliation: reconciliation is grounded in truth and responsibility, not apology alone, and honest knowledge is a precondition for repair", "look": "the Key Concepts and the Smylie and Anderson reading"}, {"t": "What the Truth and Reconciliation Commission documented: the residential school system, and Calls to Action that establish a public record of harm before steps toward repair", "look": "the Key Terms and the Smylie and Anderson reading"}, {"t": "Intergenerational impact: how harm and its effects pass from one generation to the next, so current outcomes must be traced to a cause rather than read as fixed traits", "look": "the Smylie and Anderson reading"}, {"t": "Cultural safety and accurate, respectful data: why standard health data systems fail Indigenous peoples, and why closing inequities requires data Indigenous communities own and shape", "look": "the Smylie and Anderson reading"}, {"t": "Assembling the elements that truth-telling and accountability require before reconciliation, and naming what each element contributes", "look": "the activity and the Key Concepts"}], "concepts": [{"h": "Truth before reconciliation", "body": "Reconciliation is the ongoing work of repairing relationships between Indigenous and non-Indigenous peoples, grounded in truth and responsibility rather than apology alone. Smylie and Anderson connect this work to understanding the health of Indigenous peoples accurately, because honest knowledge is a precondition for repair. The order is not decoration: an apology without an accurate account of what happened leaves the harm unnamed, and a harm left unnamed cannot be repaired.", "cite": "Smylie & Anderson, 2006"}, {"h": "A public record of harm", "body": "The Truth and Reconciliation Commission documented the residential school system and issued Calls to Action directed at governments, institutions, and Canadians. Its work established a public record of harm and named concrete steps toward repair. For the social sciences, it is a reminder that accurate knowledge about Indigenous peoples must reckon with this history rather than treat present-day patterns as if they had no cause. The record comes first; the steps toward repair follow from it.", "cite": "Smylie & Anderson, 2006"}, {"h": "Intergenerational impact, not fixed traits", "body": "Intergenerational impact is the way harm and its effects pass from one generation to the next, so that an injury done in the past continues to shape lives long afterward. Smylie and Anderson show that understanding Indigenous health requires tracing these chains of cause rather than reading current outcomes as fixed traits. Naming intergenerational impact moves analysis from blaming individuals to understanding the histories that produced their conditions, which is itself part of telling the truth.", "cite": "Smylie & Anderson, 2006"}, {"h": "Data Indigenous communities own and shape", "body": "Smylie and Anderson show that standard health data systems systematically fail Indigenous peoples in Canada, through problems of data coverage and quality, jurisdiction, governance, and capacity, including the difficulty of accurately and respectfully identifying First Nations, Metis, and Inuit people. They argue that closing health inequities requires data systems owned and shaped by Indigenous communities, not just better counting by outsiders. Cultural safety, treating people in ways that respect and do not undermine their cultural identity, shifts attention from the individual to the system that produces the encounter.", "cite": "Smylie & Anderson, 2006"}], "terms": [{"term": "Reconciliation", "def": "the ongoing work of repairing relationships between Indigenous and non-Indigenous peoples, grounded in truth and responsibility rather than apology alone, where honest knowledge is a precondition for repair.", "cite": "Smylie & Anderson, 2006"}, {"term": "Truth and Reconciliation Commission", "def": "the Canadian commission that documented the residential school system and issued Calls to Action directed at governments, institutions, and Canadians, establishing a public record of harm and naming concrete steps toward repair.", "cite": "Smylie & Anderson, 2006"}, {"term": "Intergenerational impact", "def": "the way harm and its effects pass from one generation to the next, so that an injury done in the past continues to shape lives long afterward and current outcomes must be traced to a cause rather than read as fixed traits.", "cite": "Smylie & Anderson, 2006"}, {"term": "Cultural safety", "def": "a standard in which people are treated in ways that respect and do not undermine their cultural identity, shifting attention from the individual to whether the system itself is safe for the person receiving care or service.", "cite": "Smylie & Anderson, 2006"}], "readings": [{"apa": "Smylie, J., & Anderson, M. (2006). Understanding the health of Indigenous peoples in Canada. Canadian Medical Association Journal, 175(6), 602-605. https://doi.org/10.1503/cmaj.060940", "scope": "Open access", "id": "smylie"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Truth before reconciliation", "what": "You assemble the elements that genuine truth-telling and accountability require, naming what each one contributes, so that reconciliation rests on an accurate record rather than on apology alone.", "why": "so you can tell the difference between an apology and the conditions that make repair possible, and name what truth-before-reconciliation actually requires.", "data": {"goal": "Assemble the elements that truth-telling and accountability require before reconciliation, then name what each element contributes, so that repair is shown to depend on an accurate public record and on data Indigenous communities own and shape, not on apology alone. This assembles the requirements of truth-telling as the scholars and the public record frame them; it is not a simulation of harm.", "components": [{"label": "An accurate public record of what happened", "role": "names the residential school system and its harms through the Truth and Reconciliation Commission's documentation and Calls to Action, so reconciliation begins from a public record rather than from silence.", "cite": "Smylie & Anderson, 2006"}, {"label": "Truth as the ground of reconciliation", "role": "holds reconciliation to truth and responsibility rather than apology alone, since honest knowledge is the precondition that makes any repair more than a gesture.", "cite": "Smylie & Anderson, 2006"}, {"label": "An honest account of intergenerational impact", "role": "traces how harm passes from one generation to the next, so present-day patterns are read as the result of a history with a cause rather than as fixed traits of a people.", "cite": "Smylie & Anderson, 2006"}, {"label": "Accurate and respectful data", "role": "corrects the failure of standard health data systems that miscount or erase Indigenous peoples, because a record that gets the facts wrong cannot tell the truth that repair requires.", "cite": "Smylie & Anderson, 2006"}, {"label": "Data Indigenous communities own and shape", "role": "moves governance of the data from outsiders to the communities themselves, since closing inequities requires data owned and shaped by Indigenous communities, not just better counting by outsiders.", "cite": "Smylie & Anderson, 2006"}, {"label": "Cultural safety as accountability", "role": "asks whether the system, not the individual, is safe and respectful, shifting responsibility for repair onto institutions and the people who run them.", "cite": "Smylie & Anderson, 2006"}]}}, "youcan": ["You can now explain why truth comes before reconciliation, and why honest knowledge is a precondition for repair.", "You can now describe what the Truth and Reconciliation Commission documented and why a public record of harm matters.", "You can now assemble the elements that truth-telling and accountability require, and name what each one contributes."], "reflectPrompt": "In a sentence or two: truth-telling and accountability are not the same as an apology. Drawing only on what Smylie and Anderson and the public record describe, which one element of truth-before-reconciliation would you want named first, and why does naming it matter before any talk of repair?"},
      5: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week05", "overview": "This week is about how we come to know things about people, and it holds two answers side by side without ranking them. OpenStax sets out the Western research method: a researcher forms a testable question, picks a design, gathers evidence either as numbers or as words, and checks the result for reliability and validity, with ethics at the centre. Reid and colleagues set out an Indigenous answer through Two-Eyed Seeing, where Indigenous knowledge is centred as a co-equal system, not folded into Western science as an add-on, and where knowing carries a responsibility to act. You read both as full answers in their own right, then you assemble the parts that make research trustworthy across both, keeping each one whole and attributed.", "purpose": "Week 5 builds the idea that good research is not one tradition's property. The Western method makes a claim defensible through design, evidence, and ethics. Two-Eyed Seeing makes research accountable by treating Indigenous knowledge as co-equal and by binding knowing to action. Neither is the test the other has to pass. The aim is to name the elements that make research trustworthy in each tradition, attribute each to its source, and hold them together without merging them or subordinating one to the other.", "outcomes": ["By the end of this week you can describe the Western research method as designs, evidence, and ethics that turn an assertion about people into a defensible claim, citing OpenStax (2021).", "By the end of this week you can explain Two-Eyed Seeing as an ethic of knowledge coexistence in which Indigenous knowledge is centred as a co-equal system and knowing carries a responsibility to act, citing Reid et al., 2021.", "By the end of this week you can name elements of good research from each tradition and attribute each to its source, without ranking one tradition against the other.", "By the end of this week you can assemble these elements into an account of what makes research trustworthy that holds both knowledge systems together as co-equal."], "guiding": ["OpenStax says method is what separates a defensible claim from a bare assertion. Which parts of method, design, evidence, or ethics, do that work?", "Reid and colleagues warn that integrate or incorporate is often a euphemism for assimilation. What does it change to centre Indigenous knowledge as co-equal instead?", "Reid and colleagues stress an action imperative: knowing carries a responsibility to act. How is that a standard for good research, not just an outcome of it?", "If you had to say what makes research trustworthy, which elements would you take from each tradition, and why would you not simply merge them?"], "checks": [{"t": "How the Western research method turns a question about people into a defensible claim through a testable design and gathered evidence", "look": "the OpenStax reading on sociological research"}, {"t": "Why reliability, results that replicate, and validity, measuring what you intend, are what let a finding be trusted, with ethics at the centre rather than the margin", "look": "the OpenStax reading on sociological research"}, {"t": "Why Reid and colleagues treat the usual call to integrate Indigenous knowledge into Western science as often a euphemism for assimilation, and offer coexistence instead", "look": "the Reid et al. reading on Two-Eyed Seeing"}, {"t": "What the action imperative of Two-Eyed Seeing adds: knowledge transforms the holder, who then bears a responsibility to act on it", "look": "the Reid et al. reading and the three fisheries case studies"}, {"t": "How to hold both answers together as co-equal, naming what each tradition contributes to trustworthy research without subordinating one to the other", "look": "the activity and your own assembled account"}], "concepts": [{"h": "Method as the difference between a claim and an assertion", "body": "OpenStax lays out the Western research method: a researcher forms a testable hypothesis, chooses a research design, and gathers evidence as either quantitative data, such as surveys of many participants, or qualitative data, such as in-depth interviews and participant observation. Method is what separates a claim about people you can defend from one you merely assert. The point is not the numbers or the words on their own but the discipline of building a finding that holds up to scrutiny.", "cite": "OpenStax, 2021"}, {"h": "Reliability, validity, and ethics at the centre", "body": "OpenStax explains why a finding earns trust. Reliability means results that replicate when the study is run again, and validity means the study measures what it intends to measure. OpenStax places research ethics at the centre rather than the margin: consent, accountability, and care in how findings are used are part of what makes research sound, not a form signed at the start. Trust in a claim comes from all three holding together.", "cite": "OpenStax, 2021"}, {"h": "Two-Eyed Seeing centres Indigenous knowledge as co-equal", "body": "Reid and colleagues argue that the usual call to integrate or incorporate Indigenous knowledge into Western science is often a euphemism for assimilation. They offer Two-Eyed Seeing instead, an ethic of knowledge coexistence and complementarity in which Indigenous knowledge is centred as a co-equal system rather than absorbed into Western science as an add-on. When whose knowledge counts genuinely changes, the research itself changes. This is a different account of good research, standing in its own right alongside the Western method, not a stage within it.", "cite": "Reid et al., 2021"}, {"h": "The action imperative: knowing carries a responsibility to act", "body": "Reid and colleagues say what sets Two-Eyed Seeing apart is its action imperative: knowledge transforms the holder, who then bears a responsibility to act on it. They trace this through three Canadian fisheries case studies. Good research, in this frame, is not finished when a claim is defended; it is accountable to the people and relationships it comes from and obliges those who hold it to act. This is a standard for trustworthy research, attributed to its own tradition, not a softer version of validity.", "cite": "Reid et al., 2021"}], "terms": [{"term": "Research design", "def": "the plan a researcher chooses for turning a testable question into evidence, including whether to gather quantitative data across many cases or qualitative data in depth, and the choice that lets a claim about people be defended rather than merely asserted.", "cite": "OpenStax, 2021"}, {"term": "Reliability and validity", "def": "the two tests that let a finding be trusted in the Western method: reliability means results that replicate when the study is repeated, and validity means the study measures what it intends to measure.", "cite": "OpenStax, 2021"}, {"term": "Two-Eyed Seeing", "def": "an Indigenous framework offered by Reid and colleagues as an ethic of knowledge coexistence and complementarity, in which Indigenous knowledge is centred as a co-equal system rather than integrated into Western science, since integrate is often a euphemism for assimilation.", "cite": "Reid et al., 2021"}, {"term": "Action imperative", "def": "the feature Reid and colleagues say sets Two-Eyed Seeing apart: knowledge transforms the holder, who then bears a responsibility to act on it, so that research is accountable and obliging rather than finished once a claim is defended.", "cite": "Reid et al., 2021"}], "readings": [{"apa": "OpenStax. (2021). Sociological research. In Introduction to sociology 3e. OpenStax, Rice University. https://openstax.org/books/introduction-sociology-3e/pages/2-introduction", "scope": "Open access", "id": "soc-research"}, {"apa": "Reid, A. J., Eckert, L. E., Lane, J.-F., Young, N., Hinch, S. G., Darimont, C. T., Cooke, S. J., Ban, N. C., & Marshall, A. (2021). \"Two-Eyed Seeing\": An Indigenous framework to transform fisheries research and management. Fish and Fisheries, 22(2), 243-261. https://doi.org/10.1111/faf.12516", "scope": "Verified open access", "id": "reid2021"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "What makes good research", "what": "You assemble an account of what makes research trustworthy by selecting elements from two traditions, the Western research method and Indigenous Two-Eyed Seeing, and naming what each one contributes.", "why": "so you practise holding both knowledge systems together as co-equal, attributing each element to its source, before you decide for yourself what trustworthy research requires.", "data": {"goal": "Assemble an account of what makes research trustworthy that holds both knowledge systems together: the Western method's design, evidence, and ethics on one side, and Indigenous Two-Eyed Seeing's coexistence and action imperative on the other, each kept whole and attributed, with neither merged into nor ranked above the other.", "components": [{"label": "A testable research design", "role": "From the Western method, this is what lets a question about people become evidence rather than an opinion, by planning in advance how data will be gathered and from whom.", "cite": "OpenStax, 2021"}, {"label": "Reliability and validity", "role": "From the Western method, these are the checks that earn a finding trust: results that replicate, and a study that measures what it intends to measure.", "cite": "OpenStax, 2021"}, {"label": "Ethics at the centre", "role": "From the Western method, this means consent, accountability, and care in how findings are used are part of sound research, not a margin or an afterthought.", "cite": "OpenStax, 2021"}, {"label": "Indigenous knowledge centred as co-equal", "role": "From Two-Eyed Seeing, this is the refusal to integrate Indigenous knowledge into Western science as an add-on, and the commitment to let it stand as a co-equal system that changes what research even asks.", "cite": "Reid et al., 2021"}, {"label": "The action imperative", "role": "From Two-Eyed Seeing, this is the standard that knowing carries a responsibility to act, so research is accountable to the people and relationships it comes from rather than finished once a claim is defended.", "cite": "Reid et al., 2021"}]}}, "youcan": ["You can now describe the Western research method as designs, evidence, and ethics that turn an assertion about people into a defensible claim", "You can now explain Two-Eyed Seeing as centring Indigenous knowledge as a co-equal system and binding knowing to a responsibility to act", "You can now name what each tradition contributes to trustworthy research and attribute it to its source, without ranking one against the other"], "reflectPrompt": "In a sentence or two: when you picture research you would trust about your own community, which elements would you want from each tradition, and what would be lost if one were simply folded into the other?"},
      6: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week06", "overview": "This week we step into anthropology, the social science that studies culture. OpenStax gives us the core idea: culture is whatever is learned and shared by a group rather than inborn, and the anthropologist's job is to understand human difference on its own terms instead of ranking it as better or worse (OpenStax, 2022). Then we turn the lens back on the discipline itself. Zoe Todd, a Red River Metis anthropologist, shows that the field often takes up Indigenous ideas about land and relationship while leaving out the Indigenous people, scholars, and communities those ideas come from (Todd, 2016). She heard a famous scholar describe climate as a shared concern in language that echoed Inuit concepts she had been taught, with no credit given. That is the heart of the week: using a culture's ideas is not the same as honouring the people who hold them. The activity puts you in that exact choice, again and again.", "purpose": "Week 6 introduces the culture concept and then asks an honest question about how that concept gets used. Having learned that culture is learned and shared, and that difference should be understood rather than ranked (OpenStax, 2022), you study Todd's argument that borrowing Indigenous ideas while erasing Indigenous people is colonialism in another form (Todd, 2016). The aim is to tell the difference between respectful engagement, which credits the people and stays accountable to them, and appropriation, which lifts the idea and erases the source.", "outcomes": ["By the end of this week you can explain the culture concept: an element of human life counts as culture when it is learned and shared by a group rather than inborn (OpenStax, 2022).", "By the end of this week you can define cultural relativism and ethnocentrism and say why understanding a practice on its own terms is the anthropological stance (OpenStax, 2022).", "By the end of this week you can state Todd's argument that borrowing Indigenous ideas while erasing Indigenous people and scholars is colonialism in another form, and that honest scholarship must credit them (Todd, 2016).", "By the end of this week you can tell respectful engagement from appropriation in a concrete case, naming who is credited and who is erased (Todd, 2016)."], "guiding": ["OpenStax says culture is learned and shared, not inborn. What follows from that for how we should treat a culture that is not our own (OpenStax, 2022)?", "Cultural relativism asks you to understand a practice on its own terms. How is that different from simply agreeing with it (OpenStax, 2022)?", "Todd heard Indigenous concepts repeated with no credit. Why does she call that colonialism in another form rather than a harmless overlap (Todd, 2016)?", "Todd centres citation and acknowledgement. What does it actually look like to credit and stay accountable to the Indigenous thinkers behind an idea (Todd, 2016)?"], "checks": [{"t": "What culture is in anthropology: learned and shared by a group rather than inborn, and understood on its own terms rather than ranked", "look": "the OpenStax culture chapter"}, {"t": "The difference between cultural relativism, understanding a practice in its own context, and ethnocentrism, judging it by your own standards", "look": "the OpenStax culture chapter"}, {"t": "Todd's argument that borrowing Indigenous ideas while erasing the Indigenous people and scholars behind them is colonialism in another form", "look": "the Todd reading and the Latour and Sila example in it"}, {"t": "Why Todd centres citation and acknowledgement: honest scholarship must credit and stay accountable to the Indigenous thinkers it draws on", "look": "the Todd reading"}, {"t": "How to tell respectful engagement from appropriation in a real case: who is credited, who is erased, and who holds authority over the idea", "look": "the activity and the two readings together"}], "concepts": [{"h": "The culture concept", "body": "OpenStax presents culture as the central idea in anthropology. Something counts as culture when it is learned and shared by a group rather than being inborn, which means culture is not fixed and not natural law but a way of living that people pass on and change over time. Anthropology treats culture holistically, as parts that fit together, and it makes the case that human difference is to be understood on its own terms rather than ranked as superior or inferior. The discipline's core habit of perception is simple to state and hard to practise: describe difference, do not grade it.", "cite": "OpenStax, 2022"}, {"h": "Cultural relativism and ethnocentrism", "body": "Cultural relativism is the practice of understanding a practice within its own cultural context rather than judging it by the standards of another. It asks the observer to set aside their own assumptions long enough to see what a practice means to the people who live it. Its opposite is ethnocentrism: judging another culture by the standards of your own and treating your own as the natural measure of all others. Ethnocentrism is often invisible to the person holding it, which is exactly why anthropology trains people to notice when they are mistaking their own customs for human nature.", "cite": "OpenStax, 2022"}, {"h": "Borrowing the idea, erasing the people", "body": "Zoe Todd, a Red River Metis anthropologist, recounts hearing a celebrated scholar describe climate as a matter of shared concern in language that echoed Inuit concepts such as Sila that she had been taught, with no credit given to Indigenous thinkers. From this she argues that the academy's ontological turn repackages Indigenous thought while erasing the Indigenous people, scholars, and legal orders it comes from. That is why she says ontology can become just another word for colonialism: the ideas are used, and the people who hold them are left out of the citations, the credit, and the room.", "cite": "Todd, 2016"}, {"h": "Citation as accountability", "body": "Todd's response is not to stop sharing ideas but to change how scholars handle them. She centres citational practice and acknowledgement: honest scholarship must credit and stay accountable to the Indigenous thinkers it draws on. Crediting people by name is not a courtesy at the end of a paper but the thing that keeps the knowledge honest, because Indigenous ideas carry their meaning through lived relationship and obligation. Strip an idea away from the people and communities that give it meaning and you are left with a hollow word. The remedy is concrete: name the thinkers, cite the source, and keep the people present.", "cite": "Todd, 2016"}], "terms": [{"term": "Culture", "def": "the shared beliefs, practices, language, and meanings a group of people learn and pass on; culture is learned and shared rather than inborn, and it is contested and always changing as people live it.", "cite": "OpenStax, 2022"}, {"term": "Cultural relativism", "def": "understanding a practice within its own cultural context rather than judging it by the standards of another; a research stance that suspends one's own assumptions long enough to see what a practice means to the people who live it.", "cite": "OpenStax, 2022"}, {"term": "Ethnocentrism", "def": "judging another culture by the standards of one's own and treating one's own as the norm against which others fall short; often invisible to the person holding it, which is the habit cultural relativism is meant to interrupt.", "cite": "OpenStax, 2022"}, {"term": "Citational practice", "def": "Todd's term for crediting and staying accountable to the Indigenous thinkers an idea comes from; naming the people and scholars behind a concept rather than borrowing the idea while erasing its source.", "cite": "Todd, 2016"}], "readings": [{"apa": "OpenStax. (2022). The culture concept. In Introduction to anthropology. https://openstax.org/books/introduction-anthropology/pages/3-introduction", "scope": "Open access", "id": "anth-culture"}, {"apa": "Todd, Z. (2016). An Indigenous feminist's take on the ontological turn: 'Ontology' is just another word for colonialism. Journal of Historical Sociology, 29(1), 4-22. https://doi.org/10.1111/johs.12124", "scope": "Seneca Library", "id": "todd2016"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Engage or appropriate", "what": "You follow someone who wants to use an Indigenous idea in their own work, deciding at each turn whether to credit and stay accountable to the people behind it or to lift the idea and erase its source.", "why": "so you practise telling respectful engagement from appropriation on a concrete case, which is exactly the line Todd asks scholars to hold (Todd, 2016).", "data": {"setup": "A non-Indigenous graduate student is writing about climate and relationship to land. In a class she learns about Inuit concepts such as Sila, and she also reads work by Indigenous scholars on land as a living relationship rather than a resource. The ideas are powerful and she wants to build her project on them. This is the situation Todd describes from the inside: ideas about land and relationship that come from Indigenous people and communities, now picked up by someone outside them (Todd, 2016). You step into the choices she faces as the project takes shape.", "steps": [{"situation": "She drafts the core argument of her project around an Inuit concept she learned in class, and she has to decide how to present where the idea came from.", "choices": [{"label": "Fold the idea into her own framing as a general insight about climate, without naming the Indigenous source", "outcome": "The idea is used and the people who hold it disappear. This is exactly the move Todd names: repackaging Indigenous thought while erasing the Indigenous people and scholars it comes from, which she calls colonialism in another form.", "harm": true, "cite": "Todd, 2016"}, {"label": "Name the concept as Inuit, credit the Indigenous thinkers she learned it from, and cite their work", "outcome": "The idea stays connected to its source. Crediting the people by name and citing them is the citational practice Todd centres, the thing that keeps borrowed knowledge honest and accountable to the people behind it.", "harm": false, "cite": "Todd, 2016"}]}, {"situation": "A reviewer points out that she is describing an Indigenous practice and asks how she is treating it. She decides what stance to take toward the practice itself.", "choices": [{"label": "Judge the practice against her own assumptions about what a sound relationship to land looks like", "outcome": "She measures the practice by the standards of her own culture and treats those standards as the norm. That is ethnocentrism, the habit anthropology trains people to notice and interrupt rather than mistake for human nature.", "harm": true, "cite": "OpenStax, 2022"}, {"label": "Work to understand the practice within its own cultural context before saying anything about it", "outcome": "She suspends her own assumptions long enough to see what the practice means to the people who live it. That is cultural relativism, the anthropological stance of understanding difference on its own terms rather than ranking it.", "harm": false, "cite": "OpenStax, 2022"}]}, {"situation": "The project is nearly done and she considers how, if at all, to involve the Indigenous community whose knowledge she has built on.", "choices": [{"label": "Reach out so the community can see the work, respond, and have authority over how their knowledge is used", "outcome": "She keeps the people present and accountable, not just their ideas. This is what Todd asks for beyond citation: staying accountable to the Indigenous thinkers and communities an idea comes from, so the knowledge is engaged with rather than extracted.", "harm": false, "cite": "Todd, 2016"}, {"label": "Publish as is, since the concepts are interesting and already discussed in academic circles", "outcome": "The ideas are taken and the people are left out of the credit and the decisions. Todd shows this is the failure to avoid: Indigenous knowledge used without Indigenous authority is the colonial pattern repeating, however polished the work looks.", "harm": true, "cite": "Todd, 2016"}, {"label": "Treat the concept as a free-floating idea that belongs to no one in particular now", "outcome": "Cutting the idea loose from the people who hold it is the erasure Todd warns against. Indigenous ideas carry their meaning through lived relationship and obligation, so an idea stripped of its source loses what made it real and erases the thinkers behind it.", "harm": true, "cite": "Todd, 2016"}]}]}}, "youcan": ["You can now explain the culture concept: an element of human life counts as culture when it is learned and shared by a group rather than inborn (OpenStax, 2022)", "You can now tell cultural relativism from ethnocentrism and say why anthropology asks you to understand difference on its own terms (OpenStax, 2022)", "You can now tell respectful engagement from appropriation in a concrete case, naming who is credited, who is erased, and who holds authority over the idea (Todd, 2016)"], "reflectPrompt": "In a sentence or two: think of an idea, practice, or story you have borrowed from a culture that is not your own. What would it take to engage with it the way Todd asks, crediting the people and staying accountable to them, rather than just using it (Todd, 2016)?"},
      8: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week08", "overview": "This week is about a basic sociological idea and what happens when state power gets hold of it. Socialization is the lifelong process by which we learn who we are through relationship, not at birth and not alone. OpenStax shows that almost everything that feels natural about being a person is actually learned in the company of others. Then Bonita Lawrence takes the question one step further: she shows how settler law turned who counts as Indigenous into a bureaucratic question, deciding through the Indian Act and the category of status who legally counted as Indian and who did not. You will hold these two readings together and ask who gets to define an identity category, and on whose terms.", "purpose": "The point of this week is to connect socialization, the everyday way identity is learned in relationship, to social structure, the patterned institutions and laws that organize a society. OpenStax (2021) gives you socialization as learning the self through others; Lawrence (2003) shows what changes when the state, rather than a community, decides who counts. The aim is to see that identity categories are made, and that it matters a great deal who is allowed to make them.", "outcomes": ["By the end of this week you can explain socialization as the lifelong process of learning who we are through relationship rather than forming alone, after OpenStax (2021).", "By the end of this week you can describe how Lawrence (2003) shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status.", "By the end of this week you can distinguish a community defining its own belonging from an outside authority imposing a legal definition, and say why the difference matters.", "By the end of this week you can use the sociological imagination to read a single life as shaped by the larger structures that define its categories, after OpenStax (2021)."], "guiding": ["OpenStax says who we are is learned in relationship. If identity is learned, then who is doing the teaching, and whose terms are being taught?", "Lawrence shows the state deciding who counts as Indigenous. What is gained and what is lost when a law, rather than a community, draws that line?", "Lawrence draws on Foucault to argue these laws can come to feel natural. How does a legal category start to feel like a simple fact?", "When you fill in a form that asks for your identity, who wrote the categories, and who is left without a box to check?"], "checks": [{"t": "Socialization as the lifelong process of learning who we are through relationship, not at birth and not alone", "look": "the OpenStax reading"}, {"t": "Social structure as the patterned institutions and laws that shape a person's options before any choice is made", "look": "the OpenStax reading and the Key Concepts"}, {"t": "How Lawrence shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status", "look": "the Lawrence reading"}, {"t": "Why it matters whether a community defines its own belonging or an outside authority imposes the legal definition", "look": "the Lawrence reading"}, {"t": "Reading an identity category as something made by people and institutions, and naming who gets to make it", "look": "the activity and the readings"}], "concepts": [{"h": "Socialization", "body": "Socialization is the lifelong process by which people learn to be members of a society, taking on its norms, roles, and a sense of self through interaction. OpenStax uses the disturbing cases of feral children, raised without human contact, to show how much of what feels natural about being a person is actually learned in relationship. Who we are is not fixed at birth; it is built, over a whole life, in the company of others.", "cite": "OpenStax, 2021"}, {"h": "Social structure and the sociological imagination", "body": "Social structure is the patterned web of institutions, such as family, school, work, and law, that organizes a society and shapes a person's options before they make any choice. The sociological imagination is the habit of reading a single life against that larger arrangement, so that a private situation can be seen as also produced by history and structure. This is the move that lets us ask not just who a person is, but what defined the categories they live inside.", "cite": "OpenStax, 2021"}, {"h": "The regulation of Native identity", "body": "Bonita Lawrence (Mi'kmaw) argues that regulating Native identity, through the Indian Act in Canada and federal Indian legislation in the United States, has been central to colonization, because deciding who legally counts as Indian also controls access to land and belonging. Drawing on Foucault, she treats these laws as a discourse that produces a way of thinking so familiar it can feel natural. The category of status turned a lived, relational belonging into a bureaucratic question answered by the state.", "cite": "Lawrence, 2003"}, {"h": "Who defines the category", "body": "Holding the two readings together gives the week its question. Socialization tells us identity is learned in relationship; Lawrence shows what happens when an outside authority, rather than a community, draws the line and writes it into law. Lawrence presents the history of status factually and as central to colonization. The sociological point is not to decide who is Indigenous, which is not ours to decide, but to see that identity categories are made, and that it matters a great deal who is allowed to make them.", "cite": "Lawrence, 2003"}], "terms": [{"term": "Socialization", "def": "the lifelong process by which people learn the norms, roles, and sense of self of their society through interaction, so that who we are is learned in relationship rather than fixed at birth.", "cite": "OpenStax, 2021"}, {"term": "Social structure", "def": "the patterned relationships and institutions, such as family, school, work, and law, that organize a society and shape a person's options before any individual choice is made.", "cite": "OpenStax, 2021"}, {"term": "Regulation of Native identity", "def": "Lawrence's term for the way settler law, through the Indian Act and the category of status, decides who legally counts as Indian, turning belonging into a bureaucratic question central to colonization.", "cite": "Lawrence, 2003"}, {"term": "Status", "def": "the legal category, defined by the state under the Indian Act, that determines who is recognized as Indian and so controls access to land, rights, and belonging.", "cite": "Lawrence, 2003"}], "readings": [{"apa": "OpenStax. (2021). Socialization and social interaction. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/5-introduction", "scope": "Open access", "id": "soc-socialization"}, {"apa": "Lawrence, B. (2003). Gender, race, and the regulation of Native identity in Canada and the United States: An overview. Hypatia, 18(2), 3-31.", "scope": "Open access", "id": "lawrence2003"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Who gets to say who counts", "what": "You walk through how one identity category, who legally counts as Indigenous, gets defined, deciding at each turn whether the definition is set by an outside authority or recognized as belonging to the community itself.", "why": "so you practise seeing identity categories as things that are made, and naming who is allowed to make them, before you carry that question into your own life.", "data": {"setup": "Socialization teaches us that who we are is learned in relationship, not handed out at birth. Bonita Lawrence shows what happens when the state takes hold of that question: through the Indian Act and the category of status, settler law decided who legally counted as Indian, and so controlled access to land and belonging. You step into the decision points where an identity category gets defined, and watch whose terms win.", "steps": [{"situation": "A government is deciding how to determine who legally counts as Indigenous. It must choose where the authority to define that belonging will sit.", "choices": [{"label": "Write a single legal definition of status that the state administers for everyone", "outcome": "Belonging becomes a bureaucratic question answered by the state. Lawrence shows this is how the Indian Act worked: deciding who legally counted as Indian also controlled access to land, and an outside authority replaced the community as the one who draws the line.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Recognize that communities define their own members through their own relationships and ways of identifying the self", "outcome": "The authority to say who belongs stays with the community. This keeps identity where socialization says it is formed, in relationship, rather than handing it to a law administered from outside.", "harm": false, "cite": "Lawrence, 2003"}]}, {"situation": "The legal category has been in place for generations. People are now growing up inside it, learning who they are partly through the state's definition.", "choices": [{"label": "Treat the legal category as simply describing a fact about who people are", "outcome": "The category starts to feel natural. Drawing on Foucault, Lawrence shows how a state-made definition can become a way of thinking so familiar it feels like description, when it is actually a rule that was imposed and that displaced Indigenous ways of identifying the self.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Ask how this category was made, and remember it was learned, not given at birth", "outcome": "The category is read as something produced. OpenStax shows the self is learned in relationship, so an identity rule can be examined rather than accepted as fact, which is exactly the sociological imagination at work.", "harm": false, "cite": "OpenStax, 2021"}]}, {"situation": "A person stands at the edge of the category: their belonging is real to their community but does not fit the legal definition. An institution must decide which account of their identity to honour.", "choices": [{"label": "Defer to the legal definition and let it settle who the person is", "outcome": "The state's category overrides the person's lived belonging. Lawrence shows this is the cost of letting status decide identity: a relationship to land and community is set aside because it does not match a definition written from outside.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Honour the belonging the person already holds within their community", "outcome": "Lived belonging is treated as real on its own terms. This recognizes self-determination, the principle that a community, not an outside authority, holds the right to say who counts among its own.", "harm": false, "cite": "Lawrence, 2003"}]}]}}, "youcan": ["You can now explain socialization as the lifelong process of learning who we are through relationship rather than forming alone", "You can now describe how Lawrence shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status", "You can now ask of any identity category who defined it, on whose terms, and whether the people it names had a say"], "reflectPrompt": "In a sentence or two: think of a form or a category that has asked you to name your identity. Who wrote the boxes, whose terms did they use, and what would change if the people being named got to draw the line themselves?"},
      9: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week09", "overview": "This week we look at inequality as something that is built, not something that simply happens. Sociology gives us a name for this: social stratification, the way a society sorts people into layered ranks of advantage tied to class, status, and power. OpenStax (2021) stresses that this layering is produced and reproduced by social structures, so where you land is not earned by you and is not random. We then hold that idea next to a Canadian case. Pamela Palmater (2011), who is Mi'kmaw, argues that chronic and sometimes fatal poverty in First Nations is not a cultural failing but the engineered result of Canada's colonial legal order, where the Indian Act presumes federal control over First Nations life yet fails its fiscal and constitutional duties. We keep the two analyses side by side, each attributed, without folding one into the other: OpenStax (2021) gives us the general machinery of stratification, and Palmater (2011) shows one specific machinery, the colonial legal order, that engineered poverty for peoples once among the wealthiest in the world.", "purpose": "Week 9 asks you to treat inequality as a system with parts you can name. Stratification, in OpenStax (2021), is a layered system of advantage that social structures produce and reproduce. Palmater (2011) gives a concrete Canadian example of that machinery at work: laws and policy that engineered First Nations poverty and that keep it in place. The aim is to assemble the layers and mechanisms that build inequality, to attribute each one to its source, and to see Palmater's structural and legal analysis on its own terms, as a description of how a legal order produces an outcome, never as a deficit of Indigenous people or communities.", "outcomes": ["By the end of this week you can define social stratification and explain why OpenStax (2021) describes it as produced by social structures rather than random.", "By the end of this week you can name several layers or mechanisms by which inequality is built and reproduced, and attribute each to its source.", "By the end of this week you can explain, in Palmater's (2011) own framing, how Canada's colonial legal order engineered First Nations poverty as a structural and legal outcome.", "By the end of this week you can hold the OpenStax (2021) account of stratification and Palmater's (2011) structural-colonial analysis together, each attributed, without merging them into one claim."], "guiding": ["OpenStax (2021) says stratification is produced and reproduced by social structures. What does that change about how you read who is at the top and who is at the bottom?", "Palmater (2011) calls First Nations poverty engineered. What work is the word engineered doing, and what does it rule out?", "How is a caste system, where standing is fixed by ascribed status, different from a class system in the OpenStax (2021) account, and why does that distinction matter for mobility?", "OpenStax (2021) gives the general machinery of stratification and Palmater (2011) names one specific machinery. Why is it worth keeping these two analyses side by side rather than collapsing them into one?"], "checks": [{"t": "What social stratification is, and why OpenStax (2021) insists it is produced and reproduced by social structures rather than random or earned", "look": "the OpenStax Social Stratification reading"}, {"t": "The difference between a caste system, where standing is fixed by ascribed status, and a class system, where achieved factors allow some mobility", "look": "the OpenStax Social Stratification reading"}, {"t": "How Palmater (2011) frames First Nations poverty as engineered by Canada's colonial legal order, a structural and legal outcome and not a cultural failing", "look": "the Palmater reading and keynote"}, {"t": "Why peoples once among the wealthiest in the world were made the most impoverished, in Palmater's (2011) account, because federal laws presume control yet fail their fiscal and constitutional duties", "look": "the Palmater reading"}, {"t": "How to hold the OpenStax (2021) machinery of stratification and Palmater's (2011) colonial-legal machinery together, each attributed, without merging them", "look": "the activity and both readings"}], "concepts": [{"h": "Social stratification", "body": "Social stratification is the way a society sorts people into layered ranks of advantage tied to class, status, and power. OpenStax (2021) stresses that this layering is produced and reproduced by social structures, not by the worth of the people placed within it. That is the core move of the week: where you land in the layers is built and maintained by structures, not earned by you and not random.", "cite": "OpenStax, 2021"}, {"h": "Caste and class systems", "body": "OpenStax (2021) contrasts caste systems, where a person's standing is fixed by ascribed status they are born into, with class systems, where social and achieved factors allow some movement up or down. The contrast matters because it shows that how rigid the layers are is itself a feature of the structure, not a fact of nature. Even where mobility exists, the system of ranks is still doing the sorting.", "cite": "OpenStax, 2021"}, {"h": "Engineered poverty in First Nations", "body": "Pamela Palmater (2011), who is Mi'kmaw, argues that chronic and sometimes fatal poverty in First Nations is engineered by Canada's colonial legal order, not caused by culture. Federal policy is caught between an older aim of assimilation and a newer language of self-governance while the Indian Act remains unchanged, and laws that presume federal control over First Nations life fail their fiscal and constitutional duties. The word engineered locates the cause in the legal order and rules out any reading that blames Indigenous people or communities. This is presented on Palmater's (2011) own terms and is held alongside the OpenStax (2021) account, not merged into it.", "cite": "Palmater, 2011"}, {"h": "Made impoverished, not failing", "body": "Palmater (2011) shows that peoples once among the wealthiest in the world were made the most impoverished through dispossession and a legal order that presumes control yet fails its responsibilities. The point is directional: the outcome was produced by structure and law over time, so poverty here is a result that was built, not a deficit of the people living within it. This is a direct case of the OpenStax (2021) claim that inequality is produced and maintained by social structure, while staying Palmater's (2011) own structural-colonial analysis.", "cite": "Palmater, 2011"}], "terms": [{"term": "Social stratification", "def": "the way a society sorts people into layered ranks of advantage tied to class, status, and power, produced and reproduced by social structures rather than earned or random.", "cite": "OpenStax, 2021"}, {"term": "Ascribed status", "def": "a position a person is assigned at birth or without choice, which in a caste system fixes their standing in the layers of advantage.", "cite": "OpenStax, 2021"}, {"term": "Engineered poverty", "def": "Palmater's framing of chronic poverty in First Nations as the produced result of Canada's colonial legal order, a structural and legal outcome rather than a cultural failing of Indigenous people or communities.", "cite": "Palmater, 2011"}, {"term": "Colonial legal order", "def": "the body of federal law and policy, with the Indian Act at its centre, that presumes control over First Nations life yet fails its fiscal and constitutional responsibilities, in Palmater's account.", "cite": "Palmater, 2011"}], "readings": [{"apa": "OpenStax. (2021). Social stratification. In Introduction to sociology 3e. OpenStax, Rice University. https://openstax.org/books/introduction-sociology-3e/pages/9-introduction", "scope": "Open access", "id": "soc-stratification"}, {"apa": "Palmater, P. (2011). Stretched beyond human limits: Death by poverty in First Nations. Canadian Review of Social Policy, (65/66). https://crsp.journals.yorku.ca/index.php/crsp/article/view/35220", "scope": "Open access", "id": "palmater"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "How inequality is built", "what": "You assemble the layers and mechanisms that build inequality, drawing the general machinery from OpenStax (2021) and one specific machinery, engineered First Nations poverty, from Palmater (2011).", "why": "so you can name inequality as a system that is produced and maintained by structures, and attribute each part to its source, holding the two analyses side by side without merging them.", "data": {"goal": "Assemble the layers and mechanisms by which inequality is produced and reproduced, and specifically how First Nations poverty was engineered, using the OpenStax (2021) account of social stratification as the general machinery and Palmater's (2011) structural-colonial analysis as one concrete case, each part attributed to its source.", "components": [{"label": "Layered ranks of advantage (class, status, power)", "role": "Stratification sorts people into layers tied to class, status, and power, so advantage and disadvantage are organized rather than spread evenly, which is the base structure inequality is built on.", "cite": "OpenStax, 2021"}, {"label": "Production and reproduction by social structures", "role": "Social structures produce the layers and then reproduce them over time, so a person's position is built and maintained by the system rather than earned by them or left to chance.", "cite": "OpenStax, 2021"}, {"label": "Ascribed status that fixes standing", "role": "When standing is fixed by ascribed status, as in a caste system, the layers become rigid and movement is closed off, which hardens inequality into something a person cannot leave.", "cite": "OpenStax, 2021"}, {"label": "A colonial legal order that presumes control", "role": "Federal law, with the Indian Act at its centre, presumes control over First Nations life while failing its fiscal and constitutional duties, which is the specific machinery that engineered First Nations poverty as a structural and legal outcome.", "cite": "Palmater, 2011"}, {"label": "Dispossession that made wealth into poverty", "role": "Through dispossession and that legal order, peoples once among the wealthiest in the world were made the most impoverished, showing the outcome was produced by structure and law over time, not by any deficit of the people.", "cite": "Palmater, 2011"}, {"label": "Policy caught between assimilation and self-governance", "role": "Policy is caught between an older aim of assimilation and a newer language of self-governance while the Indian Act stays unchanged, so the same laws that created the poverty keep it in place.", "cite": "Palmater, 2011"}]}}, "youcan": ["You can now define social stratification and explain why OpenStax (2021) treats it as built and maintained by structures rather than earned or random", "You can now name the layers and mechanisms that produce inequality and attribute each to its source", "You can now explain, in Palmater's (2011) own framing, how Canada's colonial legal order engineered First Nations poverty as a structural and legal outcome, and hold it alongside the OpenStax (2021) account without merging the two"], "reflectPrompt": "In a sentence or two: pick one mechanism you assembled this week and name how it produces an outcome that looks personal but is actually built. What changes once you can see it as structure rather than as the fault of the people living within it?"},
      10: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week10", "overview": "This week we add the third discipline of the course, psychology, the scientific study of the mind and behaviour. OpenStax (2020) presents psychology as the study of the individual, and stresses that it works best when it keeps the social context in view through the biopsychosocial model, where health and behaviour come from biological, psychological, and social factors together rather than any one alone. We then hold that idea next to a Canadian and Indigenous frame. Joseph P. Gone (2023), who is Aaniiih, sets out Indigenous historical trauma as an explanation that locates the cause of present-day mental-health inequities not inside the individual but in the legacies of colonial dispossession. We keep both analyses side by side, each attributed. OpenStax (2020) gives the individual level and the reminder to keep context in view, and Gone (2023) shows one structural and historical account of where mental-health inequities come from. This is a structural and historical explanation of a pattern, presented in Gone's (2023) own framing. It is not a clinical diagnosis, not a list of symptoms, and not a description of any individual person.", "purpose": "Week 10 asks you to read mental-health inequities as something shaped by history and structure, not as a deficit inside individuals. Gone (2023) frames Indigenous historical trauma as an explanation that designates the legacies of colonization as central to present-day community mental-health inequities, and that calls for reconciliation, redress, and structural reform rather than individual blame. The aim is to assemble the contextual and structural factors that, in Gone's (2023) framing, reframe these inequities as consequences of colonization rather than individual deficits, to attribute each factor to its source, and to keep Gone's (2023) account on its own terms. This is about how a pattern is explained in context. It is never a diagnosis of any person, never a checklist of symptoms, and never an invitation to assess yourself.", "outcomes": ["By the end of this week you can define psychology, in OpenStax (2020), as the scientific study of the mind and behaviour, and explain why OpenStax (2020) holds that it is strongest when it keeps the social and biological context in view.", "By the end of this week you can explain, in Gone's (2023) own framing, how Indigenous historical trauma locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual.", "By the end of this week you can name several contextual and structural factors that, in Gone's (2023) account, reframe Indigenous mental-health inequities as consequences of colonization, and attribute each to its source.", "By the end of this week you can hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person."], "guiding": ["OpenStax (2020) defines psychology as the study of the individual but says it is strongest when it keeps the social context in view. What does the biopsychosocial model add that an individual-only account would miss?", "Gone (2023) locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual. What does that move change about who or what is being explained?", "Gone (2023) calls historical trauma an explanation for inequities at the community level. Why does keeping it at the level of structure and history, and not the level of any one person, matter for reading the pattern fairly?", "OpenStax (2020) gives the individual level and Gone (2023) gives a structural and historical level. Why is it worth keeping these two accounts side by side rather than collapsing one into the other?"], "checks": [{"t": "What psychology is, in OpenStax (2020): the scientific study of the mind and behaviour, and why OpenStax (2020) says it is strongest when it keeps the social and biological context in view", "look": "the OpenStax Introduction to Psychology reading"}, {"t": "What the biopsychosocial model is, in OpenStax (2020): that health and behaviour come from biological, psychological, and social factors together rather than any one alone", "look": "the OpenStax Introduction to Psychology reading"}, {"t": "How Gone (2023) frames Indigenous historical trauma as an explanation that locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual", "look": "the Gone reading and keynote"}, {"t": "Why Gone (2023) treats these inequities at the level of community, structure, and history, calling for reconciliation, redress, and structural reform rather than individual blame", "look": "the Gone reading"}, {"t": "How to hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person", "look": "the activity and both readings"}], "concepts": [{"h": "Psychology as the study of mind and behaviour", "body": "OpenStax (2020) defines psychology as the scientific study of the mind and behaviour, surveying approaches from biological to cognitive to sociocultural. It is the third discipline of the course, adding the level of the individual to the sociological view of structure and the anthropological view of culture. OpenStax (2020) is clear that psychology focuses on the individual but is strongest when it remembers that the individual is also biological and social.", "cite": "OpenStax, 2020"}, {"h": "The biopsychosocial model", "body": "OpenStax (2020) describes the biopsychosocial model as the idea that health and behaviour arise from the interaction of biological, psychological, and social factors together, not from any one of them alone. The model matters this week because it keeps the social and historical context in view rather than locating everything inside the individual. It is the bridge from an individual-only account toward an account that takes structure and history seriously.", "cite": "OpenStax, 2020"}, {"h": "Historical trauma as a structural explanation", "body": "Joseph P. Gone (2023), who is Aaniiih, sets out Indigenous historical trauma as an explanation that locates the cause of present-day community mental-health inequities in the legacies of colonial dispossession rather than inside the individual. Gone (2023) presents this as an account that contests mainstream clinical categories and designates colonization as central to these inequities, recasting them as outcomes calling for reconciliation, redress, and structural reform. This is a structural and historical framing of a community-level pattern, presented in Gone's (2023) own terms. It is not a clinical diagnosis, not a list of symptoms, and not a description of any individual person.", "cite": "Gone, 2023"}, {"h": "Inequities as consequences, not deficits", "body": "The core move in Gone (2023) is directional. Mental-health inequities among Indigenous communities are read as consequences of colonization and its ongoing conditions, not as deficits of Indigenous people. Locating the cause in history and structure rules out any reading that blames individuals or communities, and points instead toward redress and structural change. This is a direct case of the OpenStax (2020) reminder to keep social and historical context in view, while remaining Gone's (2023) own structural and historical analysis and never a judgment about any person.", "cite": "Gone, 2023"}], "terms": [{"term": "Psychology", "def": "the scientific study of the mind and behaviour of individuals, drawing on several perspectives that each emphasize different causes; in OpenStax (2020) it is strongest when it keeps the social and biological context in view.", "cite": "OpenStax, 2020"}, {"term": "Biopsychosocial model", "def": "the idea, in OpenStax (2020), that health and behaviour arise from biological, psychological, and social factors interacting together rather than from any one factor alone.", "cite": "OpenStax, 2020"}, {"term": "Sociocultural influence", "def": "the effect of culture, community, and context on individual thought and behaviour, which locates part of the cause of a person's situation outside the person; Gone (2023) shows why this matters for reading mental-health inequities in context.", "cite": "Gone, 2023"}, {"term": "Indigenous historical trauma", "def": "Gone's (2023) framing of present-day Indigenous mental-health inequities as consequences of the legacies of colonization, a structural and historical explanation that calls for reconciliation, redress, and structural reform rather than locating the cause inside the individual.", "cite": "Gone, 2023"}], "readings": [{"apa": "OpenStax. (2020). Introduction to psychology. In Psychology 2e. OpenStax, Rice University. https://openstax.org/books/psychology-2e/pages/1-introduction", "scope": "Open access", "id": "psy-intro"}, {"apa": "Gone, J. P. (2023). Indigenous historical trauma: Alter-Native explanations for mental health inequities. Daedalus, 152(4). https://www.amacad.org/publication/daedalus/indigenous-historical-trauma-alter-native-explanations-mental-health-inequities", "scope": "Open access", "id": "gone2023"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Trauma in context", "what": "You assemble the contextual and structural factors that, in Gone's (2023) framing, reframe Indigenous mental-health inequities as consequences of colonization rather than individual deficits, holding them alongside the OpenStax (2020) reminder to keep social and historical context in view.", "why": "so you can read a community-level pattern as something shaped by history and structure, attribute each factor to its source, and keep Gone's (2023) account on its own terms without turning it into a diagnosis of any person.", "data": {"goal": "Assemble the contextual and structural factors that, in Gone's (2023) account, reframe Indigenous mental-health inequities as consequences of colonization rather than individual deficits, using OpenStax (2020) for the reminder to keep social and historical context in view. This assembles how the pattern is explained in context. It is never a checklist of symptoms, never a diagnosis, and never a self-assessment.", "components": [{"label": "The legacies of colonial dispossession", "role": "Gone (2023) places the legacies of colonial dispossession at the centre of his explanation, designating them as the source of present-day mental-health inequities rather than locating the cause inside the individual.", "cite": "Gone, 2023"}, {"label": "A community and historical level of analysis", "role": "Gone (2023) reads these inequities at the level of community and history, so the pattern is explained across generations and structures rather than as the state of any one person.", "cite": "Gone, 2023"}, {"label": "A structural cause rather than an individual deficit", "role": "Locating the cause in colonization and its ongoing conditions reframes the inequities as consequences produced by structure and history, which rules out any reading that blames Indigenous people or communities.", "cite": "Gone, 2023"}, {"label": "A contest with mainstream clinical categories", "role": "Gone (2023) presents historical trauma as an alter-Native explanation that contests mainstream psychiatric categories, so the inequities are understood through colonization and context rather than only through an individual clinical frame.", "cite": "Gone, 2023"}, {"label": "A call for reconciliation, redress, and structural reform", "role": "Because the cause is structural and historical, Gone (2023) points the response toward reconciliation, redress, and structural reform, the kind of change that fits a structural cause rather than treatment aimed only at individuals.", "cite": "Gone, 2023"}, {"label": "Keeping the social and historical context in view", "role": "OpenStax (2020) holds that psychology is strongest when it keeps the social and biological context in view through the biopsychosocial model, which is the move that makes room for Gone's (2023) structural and historical account alongside the individual level.", "cite": "OpenStax, 2020"}]}}, "youcan": ["You can now define psychology, in OpenStax (2020), as the scientific study of the mind and behaviour, and explain why it is strongest when it keeps the social and historical context in view", "You can now name the contextual and structural factors that, in Gone's (2023) framing, reframe Indigenous mental-health inequities as consequences of colonization, and attribute each to its source", "You can now hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person"], "reflectPrompt": "In a sentence or two, and writing about the ideas rather than about yourself or anyone you know: pick one contextual or structural factor you assembled this week and explain how Gone (2023) uses it to locate the cause of a pattern in history and structure rather than inside individuals. What changes once you can read the inequity as a consequence of colonization rather than a deficit of the people living within it?"},
      11: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week11", "overview": "This week continues our turn to psychology, and it does so with care. Social psychology studies how people affect one another, and one of its steady lessons is that identity, belonging, and even our explanations of other people's behaviour are shaped between people rather than formed alone in one head. We hold that general idea next to a specific, named body of research in Canada. Amy Bombay, Kimberly Matheson and Hymie Anisman review the evidence on the intergenerational effects of the Indian Residential Schools and describe, in structural and historical terms, how the harms of those institutions carry across generations. This is a week about how something passes forward through families and communities over time, not about diagnosing any person. We read the researchers' account as they frame it, attributed by name, and we treat it as history and structure rather than as symptoms to find in yourself or anyone else.", "purpose": "Week 11 extends social psychology's core insight, that who we are and how we explain each other is shaped between people, into one carefully bounded Canadian case. Bombay, Matheson and Anisman's review of the intergenerational effects of residential schools shows that a structural harm done to one generation can carry forward to the next through identifiable pathways. The aim is to be able to name those pathways, in the researchers' own framing, and to understand intergenerational effect as a structural and historical process rather than as a clinical label placed on a community.", "outcomes": ["By the end of this week you can explain the social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people, not formed alone.", "By the end of this week you can describe, in Bombay, Matheson and Anisman's framing, what the intergenerational effects of residential schools are, as a structural and historical account.", "By the end of this week you can name several pathways by which the harms of residential schools carry across generations, and explain what each one carries forward.", "By the end of this week you can distinguish a structural, historical explanation of intergenerational effect from a clinical diagnosis, and say why the distinction matters."], "guiding": ["OpenStax says we are shaped between people, not in isolation. How does that change the way you read an outcome that seems to belong to one individual?", "Bombay, Matheson and Anisman describe effects that accumulate when residential school attendance spans several generations. What does it mean for a harm to accumulate rather than simply repeat?", "Why is it important to present this as a structural and historical account, attributed to the researchers, rather than as a list of symptoms?", "When a harm is done to a structure, a family or a community, rather than only to one person, how does it find its way to the next generation?"], "checks": [{"t": "The social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people rather than formed alone in one head", "look": "the OpenStax reading"}, {"t": "What the intergenerational effects of residential schools are, presented as Bombay, Matheson and Anisman present them: a structural and historical account, not a diagnosis", "look": "Bombay, Matheson and Anisman, 2014"}, {"t": "That a familial history of residential school attendance is linked to more frequent contemporary stressors and to greater effects of those stressors, with cumulative effects across generations", "look": "Bombay, Matheson and Anisman, 2014"}, {"t": "Why a structural, historical explanation of intergenerational effect is different from a clinical diagnosis, and why that difference matters for how we read it", "look": "the activity and Bombay, Matheson and Anisman, 2014"}, {"t": "Assembling the pathways by which the harms of residential schools carry across generations, and naming what each pathway carries forward", "look": "the activity"}], "concepts": [{"h": "We are shaped between people", "body": "OpenStax presents social psychology as the study of how people affect one another's thoughts, feelings, and behaviour, with a steady emphasis on the power of the situation. Identity, belonging, and even our judgments of why other people act as they do are formed between people, not assembled alone in one head. The chapter also names the fundamental attribution error, our common tendency to overestimate someone's personality and underestimate their situation. The lesson for this week is that an outcome which looks like it belongs to one individual is very often shaped by relationships, history, and circumstance around them.", "cite": "OpenStax, 2020"}, {"h": "Intergenerational effects, as the researchers frame them", "body": "Amy Bombay, Kimberly Matheson and Hymie Anisman review the research on the intergenerational effects of Canada's Indian Residential Schools, institutions to which Aboriginal children were removed and where many met neglect and abuse. They describe, as a structural and historical account, how the harms of those schools carry forward beyond the people who attended. This is not a clinical diagnosis of individuals and not a claim about anyone's inner state; it is a review of how a documented historical harm reaches later generations through identifiable pathways.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"h": "Cumulative across generations", "body": "Bombay, Matheson and Anisman find that having a familial history of residential school attendance is linked to more frequent contemporary stressors and to greater effects of those stressors on well-being. Crucially, these effects are cumulative when attendance spans several generations: the more generations affected, the more the burden builds rather than simply repeating once. This is the structural heart of the intergenerational account, and the authors present it as empirical support for the broader concept of historical trauma.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"h": "Structure and history, not diagnosis", "body": "Because identity and well-being form between people, a harm aimed at families and communities, not only at single individuals, can travel forward through those same relationships. Reading Bombay, Matheson and Anisman this way keeps the account where they put it: in the structures of family and community and in the history of a state policy, rather than in a list of symptoms to locate in any person. The point is to understand a process that moves across generations, not to label a community or invite anyone to assess themselves.", "cite": "Bombay, Matheson and Anisman, 2014"}], "terms": [{"term": "Social psychology", "def": "the study of how people affect one another's thoughts, feelings, and behaviour, with a recurring emphasis on the power of the situation; it treats identity, belonging, and our explanations of behaviour as shaped between people rather than formed alone.", "cite": "OpenStax, 2020"}, {"term": "Intergenerational effects", "def": "Bombay, Matheson and Anisman's term for the way the harms of the Indian Residential Schools carry forward beyond those who attended, described as a structural and historical process rather than a clinical diagnosis of any individual.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"term": "Cumulative effect", "def": "in Bombay, Matheson and Anisman's review, the finding that the effects associated with residential school attendance build up, rather than simply repeat, when attendance spans several generations within a family.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"term": "Historical trauma", "def": "the broader concept, for which Bombay, Matheson and Anisman provide empirical support, that a collective harm done to a people through historical events can have effects that reach later generations; in this course it is read as structure and history, not as a label placed on a community.", "cite": "Bombay, Matheson and Anisman, 2014"}], "readings": [{"apa": "OpenStax. (2020). Social psychology. In Psychology (2nd ed.). https://openstax.org/books/psychology-2e/pages/12-introduction", "scope": "Open access", "id": "psy-social"}, {"apa": "Bombay, A., Matheson, K., & Anisman, H. (2014). The intergenerational effects of Indian Residential Schools: Implications for the concept of historical trauma. Transcultural Psychiatry, 51(3), 320-338. https://doi.org/10.1177/1363461513503380", "scope": "Open access", "id": "bombay2014"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "What carries across generations", "what": "You assemble the pathways by which the harms of residential schools carry across generations, in the framing Bombay, Matheson and Anisman use, and name what each pathway carries forward.", "why": "so you can hold the intergenerational-effects research as a structural and historical account, the way the researchers present it, rather than as a list of symptoms or a diagnosis of any person.", "data": {"goal": "Assemble the pathways by which the harms of the Indian Residential Schools carry across generations, as Bombay, Matheson and Anisman describe them. This is a structural and historical account, not a clinical one: you are showing how a documented harm done to families and communities reaches later generations, not locating symptoms in any individual. Seeing the pathways together is the point, because no single piece carries the whole effect; it is how they work together over time.", "components": [{"label": "The original institutional harm", "role": "begins the process: Aboriginal children were removed to residential schools marked by neglect and abuse, so the first harm is done to children, families, and whole communities at once, not to isolated individuals.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Identity and belonging form between people", "role": "is the channel the harm travels along: because identity and belonging are shaped between people rather than alone, a harm aimed at families and communities can carry forward through those same relationships.", "cite": "OpenStax, 2020"}, {"label": "A familial history of attendance", "role": "is the carrier the researchers track: having a parent or grandparent who attended is what links a later generation to the effects, so the pathway runs through the family line, not through any one person's choices.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "More frequent contemporary stressors", "role": "is one effect that carries forward: a familial history of attendance is linked to facing more present-day stressors, so the burden shows up in conditions of life now, not only in the past.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Greater effect of those stressors", "role": "compounds the previous pathway: the same stressors are linked to a greater effect on well-being, so it is not only that there are more stressors but that they weigh more heavily.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Accumulation across several generations", "role": "is how the whole process builds rather than repeats: when residential school attendance spans several generations, the effects are cumulative, which is the structural support the authors give for the concept of historical trauma.", "cite": "Bombay, Matheson and Anisman, 2014"}]}}, "youcan": ["You can now explain the social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people rather than formed alone", "You can now describe, in Bombay, Matheson and Anisman's framing, how the harms of residential schools carry across generations as a structural and historical account", "You can now name the pathways by which those harms carry forward, and tell a structural explanation apart from a clinical diagnosis"], "reflectPrompt": "In a sentence or two: this week describes a harm that carries forward through families and communities over time, not through any one person. What changes in how you understand an outcome once you see it as something shaped between people across generations, rather than as something that belongs to an individual alone?"},
      12: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week12", "overview": "This week we look at the family. In the Western social science reading, OpenStax treats the family as a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a web of relationships, and it shows that both shift with social change rather than staying fixed (OpenStax, 2021). Set alongside this, Kim Anderson, who is Cree-Metis, reflects on kinship, motherhood, and the everyday work of running a home, and reframes kinship not as a fixed list of relatives but as ongoing labour and responsibility, the daily work that keeps a family and a home going (Anderson, 2020). The two views are held side by side, each attributed, and the work of holding both belongs to you.", "purpose": "Week 12 sets two ways of seeing the family next to each other without merging them. OpenStax gives you the Western social science view of family as a structure and a set of relationships that change across cultures and over time (OpenStax, 2021). Anderson gives you an Indigenous feminist view from the inside, where kinship is the work you do and the responsibility you carry, not only a category on a chart (Anderson, 2020). The aim is to name what each view contributes and to hold both at once.", "outcomes": ["By the end of this week you can describe the Western social science view of the family as both a structure and a web of relationships that changes across cultures and over time (OpenStax, 2021).", "By the end of this week you can explain, in Anderson's own framing, kinship as ongoing work and responsibility rather than a fixed list of relatives (Anderson, 2020).", "By the end of this week you can name what the family-as-structure view and the kinship-as-work view each contribute, attributing each to its source.", "By the end of this week you can hold the Western and the Indigenous view of the family side by side without collapsing them into a single answer."], "guiding": ["OpenStax says there is no single natural family form to measure others against. What changes for you once family is something you can examine rather than assume?", "Anderson reframes kinship as the work you do, not only who you are related to. What everyday work in your own life keeps a family going?", "OpenStax treats the family as a structure and a set of relationships; Anderson treats kinship as labour and responsibility. Where do these two views meet, and where do they stay distinct?", "What is it like to hold both the family-as-structure view and the kinship-as-work view at once, without deciding that one is the real one?"], "checks": [{"t": "The family as a social institution that is both a structure (household and marriage forms) and a web of relationships, with both changing across cultures and over time", "look": "OpenStax (2021)"}, {"t": "That there is no single natural family form to measure others against, since definitions of marriage and family vary across cultures and history", "look": "OpenStax (2021)"}, {"t": "Kinship reframed, in Anderson's own words, as ongoing work and responsibility rather than a fixed list of relatives", "look": "Anderson, 2020"}, {"t": "Family seen from the inside, where standing comes from the care and responsibility a person carries, not from a category on a chart", "look": "Anderson, 2020"}, {"t": "Assembling the kinship-as-work view alongside the family-as-structure view and holding both, each attributed to its source", "look": "the activity"}], "concepts": [{"h": "The family as structure and relationships", "body": "OpenStax treats the family as a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a set of relationships. Both the forms it takes and the meaning of marriage shift with social change rather than staying fixed. The chapter notes that definitions of marriage and family vary across cultures and over time, covering arrangements such as monogamy and polygamy and the place of kinship. The lesson for a student is that there is no single natural family form to measure others against.", "cite": "OpenStax, 2021"}, {"h": "The family as the first agent of socialization", "body": "OpenStax also treats the family as the first agent of socialization, the place where a person first learns the norms, roles, and expectations of their society before any classroom does. This is why the family matters to social science beyond its household form: it is one of the earliest settings in which identity and belonging are shaped. Here too the point holds that the family is something you can examine rather than simply take as given.", "cite": "OpenStax, 2021"}, {"h": "Kinship as work", "body": "Kim Anderson, who is Cree-Metis, reflects on kinship, motherhood, and the everyday work of running a home as Indigenous feminist practice, holding the family as relationship and responsibility rather than only a household structure. She reframes kinship not as a fixed list of relatives but as ongoing labour and obligation, the daily work that builds and sustains belonging across the seasons of a life. In her framing, kinship is not only who you are related to; it is the work you do and the responsibility you carry to keep a family and a home going.", "cite": "Anderson, 2020"}, {"h": "Family seen from the inside", "body": "Anderson offers a view of family from the inside, where standing comes from the care and responsibility a person carries, not from a category on a chart. Set next to the OpenStax view of the family as a structure that can be mapped, Anderson's view asks what the family looks like to the people doing the daily work of sustaining it. The two views are not merged: one looks at the form a family takes, the other at the labour and obligation that keep it going, and a student is asked to hold both.", "cite": "Anderson, 2020"}], "terms": [{"term": "Family", "def": "in the OpenStax reading, a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a web of relationships, with both the forms and the meaning of marriage changing across cultures and over time.", "cite": "OpenStax, 2021"}, {"term": "Agent of socialization", "def": "in the OpenStax reading, a setting through which a person learns the norms, roles, and expectations of their society; the family is treated as the first agent of socialization.", "cite": "OpenStax, 2021"}, {"term": "Kinship as work", "def": "Anderson's reframing of kinship not as a fixed list of relatives but as ongoing labour and responsibility, the daily work that builds and sustains belonging across the seasons of a life.", "cite": "Anderson, 2020"}, {"term": "Family as responsibility", "def": "Anderson's view of the family seen from the inside, where a person's standing comes from the care and responsibility they carry rather than from a category on a chart.", "cite": "Anderson, 2020"}], "readings": [{"apa": "OpenStax. (2021). Marriage and family. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/14-introduction", "scope": "Open access", "id": "soc-family"}, {"apa": "Anderson, K. (2020). On seasons of an Indigenous feminism, kinship, and the program of home management. Hypatia, 35(1), 204-213. https://doi.org/10.1017/hyp.2019.10", "scope": "Seneca Library", "id": "anderson2019"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Kinship as work", "what": "You assemble a picture of the family by gathering elements of kinship-as-work alongside elements of family-as-structure, and holding both views together.", "why": "so you practise naming what each view contributes, the Western family-as-structure view and Anderson's kinship-as-work view, and keep them side by side, each attributed, rather than collapsing them into one.", "data": {"goal": "Assemble a picture of the family that holds two views at once: what kinship-as-work involves, in Anderson's framing, where kinship is the ongoing labour and responsibility that keeps a family and a home going (Anderson, 2020), alongside the Western view of family-as-structure, where the family is a social institution made of household and marriage forms and a web of relationships that change across cultures and over time (OpenStax, 2021). The goal is to gather the elements of each and keep both in view without merging them.", "components": [{"label": "Household and marriage forms", "role": "gives the family-as-structure view its shape: the patterns of household, marriage, and partnership that the family takes, which vary across cultures and over time", "cite": "OpenStax, 2021"}, {"label": "The web of relationships", "role": "names the relational side of the Western view, the ties among members that the family holds together alongside its formal structure", "cite": "OpenStax, 2021"}, {"label": "First agent of socialization", "role": "marks the family as the earliest place a person learns the norms, roles, and expectations of their society, which is why social science studies it beyond its form", "cite": "OpenStax, 2021"}, {"label": "Daily work and responsibility", "role": "supplies the heart of Anderson's kinship-as-work view: the ongoing labour and obligation of running a home and caring for others that builds and sustains belonging", "cite": "Anderson, 2020"}, {"label": "Belonging across the seasons of a life", "role": "shows that in Anderson's framing kinship is sustained over time through continued work, not fixed once by a category, holding a family together across a life", "cite": "Anderson, 2020"}, {"label": "Standing from care, not category", "role": "completes the inside view: in Anderson's framing a person's standing in a family comes from the care and responsibility they carry rather than from a place on a chart", "cite": "Anderson, 2020"}]}}, "youcan": ["You can now describe the Western social science view of the family as both a structure and a web of relationships that changes across cultures and over time", "You can now explain, in Anderson's own framing, kinship as ongoing work and responsibility rather than a fixed list of relatives", "You can now hold the family-as-structure view and the kinship-as-work view side by side, each attributed, without merging them into one answer"], "reflectPrompt": "In a sentence or two: think of one family or household you know well and look at it twice, first as a structure of forms and relationships in the OpenStax sense, then as the daily work and responsibility that keeps it going in Anderson's sense. What does each way of seeing show you that the other does not, and what is it like to hold both at once without deciding which is the real one?"},
    
      13: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "", "overview": "This week brings no new reading. Instead, you return to your Personal Cartography, the map you have been building across the whole term, and you revisit it one dimension at a time. The frame for this revisit is the one you first met in Week 2: Two-Eyed Seeing, the gift of Mi'kmaw Elder Albert Marshall, which asks you to see with one eye the strengths of Indigenous ways of knowing and with the other eye the strengths of Western ways of knowing, and to use both eyes together for the benefit of all. As you reread your map, you keep the two eyes whole and distinct. The page does not write the connections for you, and it does not blend the two ways of knowing into one. That work is yours. Your task is to look back honestly: notice what each eye showed you, where your understanding moved, and what you still hold open.", "purpose": "Week 13 is a reflective final project. There is nothing new to learn here; there is your own map to revisit. The aim is to look back across the term using the Two-Eyed Seeing frame from Week 2, so you can name, in your own words, what each eye showed you, how your understanding changed, and what remains unfinished (Marshall, 2017). You do this without collapsing the two ways of knowing into one. Holding them side by side, as Elder Albert Marshall asks, is still the work, and any connection between them stays your own (Marshall, 2017).", "outcomes": ["By the end of this week you can revisit your Personal Cartography and describe, in your own words, what each eye showed you, keeping the two ways of knowing distinct rather than blended (Marshall, 2017).", "By the end of this week you can name where your understanding moved across the term and point to the earlier idea it grew from (Marshall, 2017).", "By the end of this week you can identify which scholars and ideas you returned to most, and say what kept drawing you back (Marshall, 2017).", "By the end of this week you can hold open what is still unresolved, treating the map as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames the stance (Marshall, 2017)."], "guiding": ["When you reread your map, what did the Indigenous eye show you that the Western eye did not, and what did the Western eye show that the Indigenous eye did not, kept side by side rather than merged (Marshall, 2017)?", "Where did your understanding move across the term, and which earlier idea on the map did it grow out of (Marshall, 2017)?", "Which scholars or ideas did you return to most often, and what kept drawing you back to them (Marshall, 2017)?", "What do you still hold open on your map, and why does treating Two-Eyed Seeing as an ongoing journey, not a finished answer, leave room for that (Marshall, 2017)?"], "checks": [{"t": "What each eye showed you across the term, kept whole and distinct, with neither way of knowing blended into the other or treated as the default", "look": "your own Personal Cartography"}, {"t": "Where your understanding moved this term, named against a specific earlier idea on the map rather than asserted in general", "look": "your map"}, {"t": "Which scholars and ideas you returned to most often, and what kept drawing you back to them", "look": "your own Personal Cartography"}, {"t": "What you still hold open, treating Two-Eyed Seeing as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames it", "look": "the Marshall reading and your map"}, {"t": "That any connection between the two eyes is yours to make, since the frame keeps the two ways of knowing side by side and asks you, not the page, to hold them together", "look": "your own Personal Cartography"}], "concepts": [{"h": "Revisiting the map: the frame you carry back", "body": "Two-Eyed Seeing is the frame you have carried since Week 2, and you carry it back now. Elder Albert Marshall asks you to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and to use both eyes together for the benefit of all. Returning to your Personal Cartography, you keep both eyes open and both whole. The revisit is not a final blend; it is a careful rereading of what each eye has shown you across the term.", "cite": "Marshall, 2017"}, {"h": "Reflexivity: turning the lens on yourself", "body": "Revisiting your own map means examining how your position and assumptions shaped what you saw. You started the term from somewhere, with a worldview already in hand, and Two-Eyed Seeing asks you first to become aware of that starting eye. Marshall frames the stance as ongoing co-learning, which means noticing how you have learned, not only what. Rereading your map is a chance to see your own movement honestly, naming where you began and how your seeing has changed.", "cite": "Marshall, 2017"}, {"h": "Growth named, not asserted", "body": "Looking back is most honest when it is specific. Rather than claiming in general that you have learned, you point to an earlier idea on your map and the more developed understanding that grew from it. Marshall describes Two-Eyed Seeing as a journey with no fixed endpoint, so growth here means tracing concrete movement along that journey. Naming a particular shift, and the earlier thought it came from, keeps your reflection grounded in the map you actually built.", "cite": "Marshall, 2017"}, {"h": "Holding two eyes open, still distinct", "body": "Even at the end, the stance does not change: you hold both eyes open without collapsing them. Little Bear shows why this stays real work, since Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality. Revisiting your map, you keep those roots distinct rather than smoothing them into one account. Any place where the two eyes meet in your own thinking is yours to hold; the page does not write that meeting for you.", "cite": "Little Bear, 2000"}], "terms": [{"term": "Revision", "def": "Changing an earlier understanding in light of reflection and new seeing. Revision is a sign of learning, not failure, because it shows an idea has been tested rather than simply held. As you revisit your Personal Cartography, naming what you now see differently from the start of the term is part of honest reflection, and it fits Marshall's framing of Two-Eyed Seeing as an ongoing journey rather than a finished answer.", "cite": "Marshall, 2017"}, {"term": "Reflexivity", "def": "Examining how your own position and assumptions shape what you see. It asks you to turn the lens back on yourself and notice the worldview you brought to every observation. Reflexivity matters for Two-Eyed Seeing because holding two ways of knowing together requires first becoming aware of the one you started with, which is exactly the work of revisiting your own map.", "cite": "Marshall, 2017"}, {"term": "Growth", "def": "Visible movement in understanding across the term, named with evidence rather than asserted. Growth is shown by pointing to a specific earlier idea on your map and the more developed understanding that replaced it. Treating growth as evidence-based keeps reflection honest, and it suits Marshall's account of Two-Eyed Seeing as a journey you keep travelling rather than a destination you reach.", "cite": "Marshall, 2017"}, {"term": "Worldview", "def": "Little Bear's term for the shared set of assumptions about reality, time, and relationship that a culture uses to interpret the world. He argues that Indigenous and Eurocentric worldviews differ at this root, so two ways of knowing can describe the same world and still reach it through very different assumptions. Revisiting your map, you keep these roots distinct rather than blending them, which is why naming your own starting worldview matters.", "cite": "Little Bear, 2000"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "The frame you revisit (from Week 2)", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "The frame you revisit (from Week 2)", "id": "littlebear"}], "youcan": ["You can now revisit your Personal Cartography one dimension at a time, naming what each eye showed you while keeping the two ways of knowing whole and distinct", "You can now point to specific movement in your understanding across the term, tracing a later idea back to the earlier one it grew from", "You can now hold open what is still unresolved on your map, treating Two-Eyed Seeing as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames it"], "reflectPrompt": "In a sentence or two, and in your own words: rereading your Personal Cartography, what is one thing each eye showed you that you want to carry forward, and what do you still hold open? Keep the two eyes distinct; the connection, if you make one, is yours.", "activity": {"screen": "activity", "archetype": "capstone", "title": "Revisiting your Personal Cartography", "what": "You return to the Personal Cartography you built across the term and revisit it one dimension at a time, marking each as you reread it.", "why": "so you can look back honestly within the Two-Eyed Seeing frame, naming what each eye showed you and how your understanding moved, while keeping the two ways of knowing distinct and the connections yours to make.", "data": {"prompt": "Revisit your Personal Cartography one dimension at a time. Mark each as you reread it.", "items": [{"label": "What each eye showed you", "prompt": "Reread your map and note, separately, what the Indigenous eye showed you and what the Western eye showed you. Keep the two columns distinct; do not write a blend. The point is to see each clearly on its own terms, as Elder Albert Marshall asks.", "cite": "Marshall, 2017"}, {"label": "Where your understanding moved", "prompt": "Find one place on the map where your thinking changed this term. Name the earlier idea, then name the more developed understanding that grew from it. Point to the specific shift rather than claiming growth in general.", "cite": "Marshall, 2017"}, {"label": "Which scholars you returned to", "prompt": "Look across your map for the scholars or ideas you came back to most often. Note which ones, and write a line for yourself about what kept drawing you back to them.", "cite": "Marshall, 2017"}, {"label": "What you still hold open", "prompt": "Mark a question or tension on the map that is still unresolved for you. Leave it open on purpose, and note why treating Two-Eyed Seeing as an ongoing journey makes room for it.", "cite": "Marshall, 2017"}, {"label": "Where the roots stay distinct", "prompt": "Find a spot where the Indigenous and Western views reach the world through different assumptions about time, relationship, or reality. Note the difference in your own words, and resist smoothing it into one account.", "cite": "Little Bear, 2000"}, {"label": "What you would add now", "prompt": "Looking at the whole map with fresh eyes, write down one thing you would add if you were starting it today. Keep it as your own mark; the page is not writing the connection for you.", "cite": "Marshall, 2017"}], "callout": "Your final project: your own cartography, revisited. The map and its meaning are yours."}}},
      14: {"deck": "", "time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "overview": "This is the final week, and the work this week is yours. All term you have set a Western way of knowing and an Indigenous way of knowing side by side, each kept whole, each attributed, without collapsing them into one answer. Now you hold the whole course together in your own way. Two-Eyed Seeing, Mi'kmaw Elder Albert Marshall's gift, asks you to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and to use both eyes together (Marshall, 2017). The synthesis is yours to write. This page does not write it for you, and it does not hand you a finished account that ties the two eyes together. It gives you the threads of the course, one at a time, and asks you to articulate what you now see, in your own words. Both eyes stay whole. You are the one who holds them together.", "purpose": "Week 14 closes the course by asking you to perform your own Two-Eyed Seeing across everything you have met. You return to the frame in the words of the Elder who named it, Albert Marshall, and to Leroy Little Bear on why two worldviews can describe the same world and still differ at the root (Marshall, 2017; Little Bear, 2000). The aim is for you, not the app, to revisit the big threads of the term, the Western disciplines you met as one whole eye, the Indigenous scholars and knowledge you met as a whole eye in their own right, and the places each eye saw something the other could not, and to hold them together in your own account. The integration is your work, and it stays your work.", "outcomes": ["By the end of this week you can revisit the whole course and name, in your own words, what social science has asked you to do, keeping the work of holding both eyes as your own (Marshall, 2017).", "By the end of this week you can describe the Western disciplines you met as one whole eye, and the Indigenous scholars and knowledge you met as a whole eye in their own right, without ranking one above the other (Marshall, 2017).", "By the end of this week you can name, for yourself, places across the term where each eye saw something the other could not, holding the two side by side rather than collapsing them into one (Little Bear, 2000).", "By the end of this week you can state what Two-Eyed Seeing asks of you as you leave the course, treating it as an ongoing responsibility and a gift from Elder Albert Marshall, not a slogan (Marshall, 2017)."], "guiding": ["Looking back across the whole term, how would you say in your own words what social science has asked you to do, and what it now lets you see that you could not see before (Marshall, 2017)?", "Across the course you met Western disciplines and you met named Indigenous scholars and knowledge. How would you describe each as a whole eye in its own right, without making either one the default (Marshall, 2017)?", "Little Bear says the two worldviews differ at the root. Where in this course did each eye see something the other could not, and how would you name those moments yourself (Little Bear, 2000)?", "As you leave this course, what does Two-Eyed Seeing ask of you now, and how will you keep it an ongoing responsibility rather than letting it become a slogan (Marshall, 2017)?"], "checks": [{"t": "That the synthesis of this course is your own work to write, and that holding both eyes together is something you do, not something the page does for you", "look": "the Marshall reading and the activity"}, {"t": "What social science has asked of you across the whole term, in your own words, and what it now lets you see", "look": "the activity and your own notes from across the course"}, {"t": "The Western disciplines you met held as one whole eye, and the named Indigenous scholars and knowledge you met held as a whole eye in their own right, with neither ranked above the other", "look": "the Marshall reading and your week-by-week notes"}, {"t": "Places across the term where each eye saw something the other could not, named by you and held side by side rather than blended into one", "look": "the Little Bear reading and the activity"}, {"t": "What Two-Eyed Seeing asks of you as you leave the course, as Elder Albert Marshall's gift and an ongoing responsibility, not a slogan", "look": "the Marshall reading and your own reflection"}], "concepts": [{"h": "The synthesis is yours to write", "body": "Two-Eyed Seeing is Mi'kmaw Elder Albert Marshall's guiding principle: seeing with one eye the strengths of Indigenous ways of knowing, with the other the strengths of Western ways of knowing, and using both eyes together for the benefit of all. In a closing week the temptation is to be handed a finished answer that ties the two eyes into one. Marshall's stance refuses that. The holding together is the learner's own ongoing work, returned to over time. This page gives you the threads and asks you to do the integrating yourself, in your own words.", "cite": "Marshall, 2017"}, {"h": "Two whole eyes, revisited", "body": "Across the term you met Western social science disciplines and you met named Indigenous scholars and knowledge. Marshall asks you to keep each as a whole, complete eye in its own right: the Western eye is not the default that Indigenous knowledge is added to, and the Indigenous eye is not a supplement to be checked against Western science. As you revisit the course, your task is to describe each eye on its own terms and to keep both open at once, so each can do what it does best, rather than ranking them or folding one into the other.", "cite": "Marshall, 2017"}, {"h": "Why each eye sees what the other cannot", "body": "Leroy Little Bear explains why holding both eyes open is real work. Indigenous and Eurocentric worldviews differ at their philosophical roots, in their assumptions about time, relationship, and reality. Because they reach the world differently, each eye can see something the other cannot. Naming those places across the course is part of taking the difference seriously. Your work this week is to find those moments yourself and hold the two views side by side with respect, rather than collapsing them into a single account that would erase what makes each distinct.", "cite": "Little Bear, 2000"}, {"h": "A responsibility you carry forward", "body": "Marshall is clear that Two-Eyed Seeing is a journey, not a finished idea you master and set down. It is ongoing co-learning between knowledge traditions, grounded in responsibility and the well-being of future generations, and he warns against letting it be trivialized, romanticized, or co-opted into jargon. As you leave the course, the stance becomes something you carry: a way of working you keep practising, in your own words and your own life, not a label you apply once and consider finished.", "cite": "Marshall, 2017"}], "terms": [{"term": "Two-Eyed Seeing (Etuaptmumk)", "def": "Mi'kmaw Elder Albert Marshall's guiding principle of using the strengths of Indigenous ways of knowing through one eye and the strengths of Western ways of knowing through the other, and using both eyes together for the benefit of all. In this closing week it names the work you do yourself: holding both eyes whole and together across the whole course, in your own words, rather than receiving a finished synthesis from anyone else. It is Elder Albert Marshall's gift and the frame for your own final project.", "cite": "Marshall, 2017"}, {"term": "Co-learning journey", "def": "Marshall's description of Two-Eyed Seeing as an ongoing, respectful practice between knowledge traditions, not a slogan to be trivialized, romanticized, or co-opted. As the course ends, it names why your synthesis is never finished: each person keeps learning to see with both eyes over time, carrying the practice forward as a responsibility rather than completing it.", "cite": "Marshall, 2017"}, {"term": "Root difference of worldviews", "def": "Little Bear's account of how Indigenous and Eurocentric worldviews differ at their philosophical roots, in their assumptions about time, relationship, and reality. Because the two reach the world differently, each eye can see something the other cannot, which is why this week asks you to find and name those places yourself and hold the two views side by side rather than blending them into one.", "cite": "Little Bear, 2000"}, {"term": "Both eyes whole", "def": "the requirement, in Marshall's framing, that each way of knowing stays a whole, complete eye in its own right: the Western eye not treated as the default, the Indigenous eye not treated as a supplement. As you revisit the course, holding both eyes whole means describing each on its own terms and keeping them distinct even as you, the learner, hold them together.", "cite": "Marshall, 2017"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "The frame for your own synthesis", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "The frame for your own synthesis", "id": "littlebear"}], "youcan": ["You can now revisit the whole course and say, in your own words, what social science has asked of you and what it lets you see, keeping the work of holding both eyes as your own", "You can now describe the Western disciplines you met as one whole eye and the named Indigenous scholars and knowledge you met as a whole eye in their own right, without ranking one above the other", "You can now carry Two-Eyed Seeing forward as Elder Albert Marshall's gift and an ongoing responsibility, holding both eyes together in your own way rather than treating the stance as a slogan"], "reflectPrompt": "In a sentence or two, and in your own words: now that the course is done, what does it mean to you to hold both eyes together, and what is one place across the term where you saw something through one eye that you could not have seen through the other? The synthesis is yours: write what you see, not what anyone else has woven for you.", "activity": {"screen": "activity", "archetype": "capstone", "title": "Your own Two-Eyed Seeing of the whole course", "what": "You revisit the big threads of the course one at a time and hold them together in your own words. The page gives you the threads; you write what you now see.", "why": "so the integration is yours: you practise Two-Eyed Seeing on the whole course, keeping both eyes whole and distinct while you, not the app, hold them together.", "data": {"prompt": "Hold the course together in your own way, one thread at a time. The synthesis is yours to write; the app does not write it for you.", "items": [{"label": "What social science asks", "prompt": "In your own words, write what social science has asked you to do across this course, and what you can now see that you could not see at the start. Do not summarize the readings back; say what the term means to you.", "cite": "Marshall, 2017"}, {"label": "The Western disciplines, kept as one eye", "prompt": "Name the Western social science disciplines and ideas you met this term and describe them as one whole eye in its own right. Write what this eye does well, in your own words, without making it the default that everything else is measured against.", "cite": "Marshall, 2017"}, {"label": "The Indigenous scholars and knowledge, kept as a whole eye", "prompt": "Name the Indigenous scholars and knowledge you met this term and describe them as a whole eye in their own right, valid on their own terms. Write, in your own words, what this eye does well, and attribute each scholar correctly rather than speaking for Indigenous peoples in general.", "cite": "Marshall, 2017"}, {"label": "Where each eye saw what the other could not", "prompt": "Find one or two places across the course where each eye saw something the other could not, and name them yourself. Set the two side by side in your own words. Do not fold them into a single account; keep each distinct and say what each one shows.", "cite": "Little Bear, 2000"}, {"label": "The root difference, held with respect", "prompt": "In your own words, say why holding both eyes open took real effort across this course, drawing on the idea that the two worldviews differ at the root. Write how you kept them distinct rather than blending them, and why that mattered to you.", "cite": "Little Bear, 2000"}, {"label": "What Two-Eyed Seeing asks of you now", "prompt": "Write what Two-Eyed Seeing asks of you as you leave this course, in your own words. Name one ongoing responsibility you will carry forward, and how you will keep the stance a living practice rather than a slogan.", "cite": "Marshall, 2017"}], "callout": "Your final project: your own Two-Eyed Seeing of the whole course, in your words. Both eyes stay whole; you hold them together."}}},
    }
  };
  function weekData(w) { var c = (D.course && D.course.code) || ''; return (WEEKPAGE[c] && WEEKPAGE[c][w]) || null; }
  function wkOptBtns(key) {
    var sel = state.wkCheck[key], opts = ['New to me', 'Getting it', 'I can'];
    return opts.map(function (o, i) { var on = sel === i; return '<button onclick="SOC.wkCheck(\'' + key + '\',' + i + ')" aria-pressed="' + on + '" class="wk-opt' + (on ? ' on' : '') + '">' + o + '</button>'; }).join('');
  }
  function wkOpts(key) { return '<div class="wk-opts" id="opts-' + key + '">' + wkOptBtns(key) + '</div>'; }
  // a check is {t: a key idea from the week, look?: where to revisit it}. The student rates their OWN grasp:
  // New to me (0) / Getting it (1) / I can (2). This monitors understanding; there is no right or wrong.
  function checkText(c) { return (typeof c === 'string') ? c : c.t; }
  function checkStat(w, phase, d) {
    var items = d.checks.map(function (c, i) {
      var r = state.wkCheck[phase + '|' + w + '|' + i];
      return { t: checkText(c), look: (typeof c === 'string') ? '' : (c.look || ''), r: (r == null ? null : r) };
    });
    var g = { can: 0, getting: 0, newto: 0 };
    items.forEach(function (x) { if (x.r === 2) g.can++; else if (x.r === 1) g.getting++; else if (x.r === 0) g.newto++; });
    return { items: items, total: d.checks.length, answered: items.filter(function (x) { return x.r != null; }).length, g: g };
  }
  function checkBand(g, n) {
    if (n && g.can === n) return { label: 'You can speak to all of this', color: '#2c6b3f', bg: '#E9EFE7' };
    if (n && g.can >= Math.ceil(n * 0.6)) return { label: 'Most of this is yours', color: '#1552D8', bg: '#E7EEFB' };
    if (n && (g.can + g.getting) >= Math.ceil(n * 0.6)) return { label: 'Coming together', color: '#8F5E0F', bg: '#F3ECE0' };
    return { label: 'Still early, and that is fine', color: '#6b7280', bg: '#F3F4F6' };
  }
  function checkBars(items) {
    return '<div style="display:flex;gap:4px;margin:10px 0" role="img" aria-label="your grasp across the ' + items.length + ' ideas">' + items.map(function (x) {
      var col = x.r === 2 ? '#2c6b3f' : (x.r === 1 ? '#C99A2E' : '#C7CDD6');
      return '<div style="flex:1;height:8px;border-radius:4px;background:' + col + '"></div>';
    }).join('') + '</div>';
  }
  function checkMeter(w, phase, d) {
    var s = checkStat(w, phase, d), L = ['New to me', 'Getting it', 'I can'];
    if (s.answered < s.total) return '<div style="margin-top:12px;font-size:.82rem;color:var(--ink-faint)">Rate all ' + s.total + ' to see where your understanding sits (' + s.answered + ' of ' + s.total + ' done). No grade, just your own read.</div>';
    var b = checkBand(s.g, s.total);
    var head = '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;flex-wrap:wrap"><div style="font-size:1.05rem;font-weight:700;color:' + b.color + '">' + b.label + '</div><div style="font-family:var(--mono);font-size:.78rem;color:' + b.color + '">' + (phase === 'pre' ? 'your starting read' : 'where you are now') + '</div></div>';
    if (phase === 'pre') {
      var profile = 'You can already speak to <b>' + s.g.can + ' of ' + s.total + '</b>, getting there on ' + s.g.getting + ', new to ' + s.g.newto + '. You will rate these again at the end, to see how far your understanding moves.';
      return '<div style="margin-top:14px;background:' + b.bg + ';border:1px solid ' + b.color + '40;border-radius:12px;padding:14px 16px">' + head + checkBars(s.items) + '<div style="font-size:.85rem;color:var(--ink-dim)">' + profile + '</div></div>';
    }
    var pre = checkStat(w, 'pre', d), moved = 0;
    var detail = s.items.map(function (x, i) {
      var pr = pre.items[i] ? pre.items[i].r : null, up = (pr != null && x.r != null && x.r > pr); if (up) moved++;
      var arrow = (pr == null) ? '' : (x.r > pr ? ' (moved up)' : (x.r < pr ? ' (moved back)' : ' (steady)'));
      var from = (pr == null ? 'not rated before' : L[pr]);
      var still = (x.r < 2) ? '<div style="font-size:.8rem;color:#8F5E0F;margin-top:2px">Still building. ' + esc(x.look || 'Revisit the readings and the activity for this idea.') + '</div>' : '';
      return '<div style="border-top:1px solid var(--border);padding:9px 0"><div style="font-size:.86rem;font-weight:600;color:var(--ink)">' + esc(x.t) + '</div><div style="font-size:.8rem;color:var(--ink-dim);margin-top:3px">' + from + ' &#8594; ' + L[x.r] + arrow + '</div>' + still + '</div>';
    }).join('');
    var movedLine = (pre.answered === pre.total) ? '<div style="font-size:.86rem;color:var(--ink-dim);margin:2px 0 6px">Your understanding moved forward on <b>' + moved + ' of ' + s.total + '</b> since the start.</div>' : '<div style="font-size:.82rem;color:var(--ink-faint);margin:2px 0 6px">Rate the same ideas under Before you begin to see your movement.</div>';
    return '<div style="margin-top:14px;background:' + b.bg + ';border:1px solid ' + b.color + '40;border-radius:12px;padding:14px 16px">' + head + checkBars(s.items) + movedLine + '<div style="margin-top:4px">' + detail + '</div></div>';
  }
  function refreshWeekChecks(w, d) {
    if (!d) return;
    ['pre', 'post'].forEach(function (ph) {
      d.checks.forEach(function (c, i) {
        var key = ph + '|' + w + '|' + i, el = document.getElementById('opts-' + key);
        if (el) el.innerHTML = wkOptBtns(key);
      });
      var m = document.getElementById('wkmeter-' + ph + '-' + w);
      if (m) m.innerHTML = checkMeter(w, ph, d);
    });
  }
  function wkChecks(w, phase, d) {
    var qs = d.checks.map(function (c, i) { return '<div class="wk-q">' + (i + 1) + '. ' + esc(checkText(c)) + wkOpts(phase + '|' + w + '|' + i) + '</div>'; }).join('');
    var label = phase === 'pre' ? 'Before' : 'Now';
    var reset = '<div class="wk-resetrow"><button onclick="SOC.wkClear(' + w + ',\'' + phase + '\')" class="wk-reset">Reset ' + label + ' ratings</button><span>Click a selected rating again to clear only that idea.</span></div>';
    return qs + reset + '<div id="wkmeter-' + phase + '-' + w + '">' + checkMeter(w, phase, d) + '</div>';
  }
  function sgSection(w) {
    var d = weekData(w);
    if (!d || !d.concepts || !d.concepts.length) return { html: '' };
    state.sgNotes = state.sgNotes || {}; state.sgShow = state.sgShow || {}; state.sgFlip = state.sgFlip || {}; state.sgTick = state.sgTick || {};
    /* 1. spaced-recall warm-up: two terms from earlier weeks */
    var warm = '';
    var priorTerms = [];
    for (var pw = w - 1; pw >= 1 && priorTerms.length < 2; pw--) {
      var pd = weekData(pw);
      if (pd && pd.terms && pd.terms.length) priorTerms.push({ t: pd.terms[(w + pw) % pd.terms.length], wk: pw });
    }
    if (priorTerms.length) {
      warm = '<div style="margin:0 0 18px"><h3 style="font-size:1rem;margin:0 0 8px">Still got these?</h3><p class="wk-hint" style="margin:0 0 10px">Two ideas from earlier weeks. Say the meaning out loud, then flip to check yourself.</p>'
        + priorTerms.map(function (x, xi) {
          var fk = 'sg' + w + '|warm|' + xi;
          var open = state.sgFlip[fk];
          return '<button onclick="SOC.sgFlip(\'' + fk + '\',' + w + ')" aria-expanded="' + !!open + '" style="display:block;width:100%;text-align:left;background:#fff;border:1.5px solid var(--border);border-radius:12px;padding:13px 16px;margin-bottom:8px;cursor:pointer">'
            + '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#6B7280">WEEK ' + x.wk + '</span>'
            + '<div style="font-weight:700;margin-top:2px">' + esc(x.t.term) + '</div>'
            + (open ? '<div style="margin-top:8px;font-size:.9rem;line-height:1.55;color:var(--ink-dim)">' + esc(x.t.def) + ' <span class="wk-cite">(' + esc(x.t.cite) + ')</span></div>' : '<div style="margin-top:6px;font-size:.8rem;color:var(--ink-faint)">Flip to check \u2192</div>')
            + '</button>';
        }).join('') + '</div>';
    }
    /* 2. explain-it-back tiles: one per key concept */
    var tiles = '<div style="margin:0 0 18px"><h3 style="font-size:1rem;margin:0 0 8px">Explain it back</h3><p class="wk-hint" style="margin:0 0 10px">The real test of understanding: explain each idea to a classmate who missed the week, in your own words. Then compare with the reading\'s version. Nothing you type is recorded or graded.</p>'
      + d.concepts.map(function (c, ci) {
        var nk = 'sg' + w + '|c|' + ci;
        var val = state.sgNotes[nk] || '';
        var show = state.sgShow[nk];
        return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:10px">'
          + '<div style="font-weight:700;margin-bottom:8px">' + esc(c.h) + '</div>'
          + '<textarea oninput="SOC.sgNote(\'' + nk + '\', this.value)" placeholder="Your explanation, one or two sentences..." style="width:100%;min-height:64px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(val) + '</textarea>'
          + '<button onclick="SOC.sgCompare(\'' + nk + '\',' + w + ')" style="margin-top:8px;border:1px solid var(--border);background:#fff;border-radius:8px;padding:6px 12px;font-size:.82rem;cursor:pointer">' + (show ? 'Hide the reading\'s version' : 'Compare with the reading') + '</button>'
          + (show ? '<div style="margin-top:9px;padding:10px 13px;border-radius:9px;background:#FBF8F3;border:1px solid var(--border);font-size:.875rem;line-height:1.55">' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></div>' : '')
          + '</div>';
      }).join('') + '</div>';
    /* 3. the question ladder: guiding questions as rungs, recall -> connect -> apply */
    var rungNames = ['Recall', 'Connect', 'Apply'];
    var gqs = (d.guiding || []).slice(0, 3);
    var ladder = '';
    if (gqs.length) {
      var rows = '';
      for (var ri = 0; ri < gqs.length; ri++) {
        var rk = 'sg' + w + '|r|' + ri;
        var prevDone = ri === 0 || (state.sgTick[('sg' + w + '|r|' + (ri - 1))] && (state.sgNotes[('sg' + w + '|r|' + (ri - 1))] || '').length >= 20);
        if (!prevDone) { rows += '<div style="border:1.5px dashed var(--border);border-radius:12px;padding:13px 16px;margin-bottom:10px;color:var(--ink-faint);font-size:.88rem">Rung ' + (ri + 1) + ' \u00B7 ' + rungNames[Math.min(ri, 2)] + ' unlocks when you finish the rung above.</div>'; continue; }
        var rv = state.sgNotes[rk] || '';
        var ticked = state.sgTick[rk] && rv.length >= 20;
        rows += '<div style="background:#fff;border:1.5px solid ' + (ticked ? '#50694C' : 'var(--border)') + ';border-radius:12px;padding:14px 16px;margin-bottom:10px">'
          + '<div class="mono" style="font-size:.62rem;letter-spacing:.06em;color:' + (ticked ? '#2c6b3f' : '#6B7280') + '">RUNG ' + (ri + 1) + ' \u00B7 ' + rungNames[Math.min(ri, 2)].toUpperCase() + (ticked ? ' \u2713' : '') + '</div>'
          + '<div style="font-weight:600;margin:5px 0 8px;line-height:1.5">' + esc(gqs[ri]) + '</div>'
          + '<textarea oninput="SOC.sgNote(\'' + rk + '\', this.value)" placeholder="Work it out here..." style="width:100%;min-height:56px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(rv) + '</textarea>'
          + (ticked ? '' : '<button onclick="SOC.sgTickRung(\'' + rk + '\',' + w + ')" style="margin-top:8px;border:1px solid var(--border);background:#fff;border-radius:8px;padding:6px 12px;font-size:.82rem;cursor:pointer">Done, next rung</button>')
          + '</div>';
      }
      var lastRk = 'sg' + w + '|r|' + (gqs.length - 1);
      var ladderDone = state.sgTick[lastRk] && (state.sgNotes[lastRk] || '').length >= 20;
      ladder = '<div><h3 style="font-size:1rem;margin:0 0 8px">The question ladder</h3><p class="wk-hint" style="margin:0 0 10px">This week\'s guiding questions, one rung at a time: remember it, connect it, apply it to your own world. Twenty words or more moves you up.</p>' + rows
        + (ladderDone ? '<div style="background:#E9EFE7;border:1px solid #9CC4A8;border-radius:12px;padding:13px 16px;font-size:.92rem;font-weight:600;color:#2c3b29">You have worked the whole ladder. You are ready for the Knowledge Check below. <a href="#wk-kc" style="color:#2c6b3f">Go to it \u2193</a></div>' : '')
        + '</div>';
    }
    var html = '<section id="wk-sg" class="node"><h2 class="wk-sec">Study Guide</h2>'
      + '<p class="wk-hint">Your rehearsal space before the Knowledge Check. Nothing here is recorded or graded; it lives only in your browser.</p>'
      + warm + tiles + ladder + '</section>';
    return { html: html };
  }
  function kcHashKey(s) { var h = 0, str = String(s || ''); for (var i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; } return 'q' + (h >>> 0).toString(36); }
  function kcSection(w, reviewOnly) {
    var kcVer = (state.kcVersion && state.kcVersion[w]) || 0;   /* 0 = Set A, 1 = Set B, 2 = Set C */
    var isC = (kcVer === 2);
    var revKey = w + '|' + kcVer;
    var kcTier = kcVer + 1;
    var KB = window.SOC122_KC || {};
    var hist = state.kcHist || {};
    function bank(week) { return KB[week] || []; }
    function isShort(m) { return !!(m && m.type === 'short'); }
    function isMatch(m) { return !!(m && m.kind === 'match'); }
    function isScenario(m) { return !!(m && m.kind === 'scenario'); }
    /* Sets A and B: plain multiple choice, from the readings and the plain-MC bank */
    function mcPool(week) {
      var pool = [];
      recordsForWeek(week).forEach(function (r) { if (MC[r.id]) pool = pool.concat(MC[r.id]); });
      pool = pool.concat(bank(week).filter(function (m) { return !m.kind && !isShort(m); }));
      pool = pool.filter(function (m) { return (m.options || []).length >= 4; });
      pool.sort(function (a, b) { return Math.abs((a.diff || 2) - kcTier) - Math.abs((b.diff || 2) - kcTier); });
      return pool;
    }
    /* Set C: something different, scenario + matching (both auto-scored) */
    function scoredCPool(week) { return bank(week).filter(function (m) { return (isScenario(m) || isMatch(m)) && (m.options || []).length >= 4; }); }
    function shortCPool(week) { return bank(week).filter(isShort); }

    var kcItems = [], kcSeen = {}, shortItems = [];
    if (isC) {
      var cp = scoredCPool(w);
      for (var ci = 0; ci < cp.length && kcItems.length < 15; ci++) { if (!kcSeen[cp[ci].q]) { kcSeen[cp[ci].q] = 1; kcItems.push(cp[ci]); } }
      shortItems = shortCPool(w).slice(0, 3);
    } else {
      var kcOwnPool = mcPool(w);
      /* adaptive review: gather up to two per earlier week, weighting ideas missed before to the front */
      var reviewPool = [];
      for (var pw = w - 1; pw >= 1; pw--) {
        var pool = mcPool(pw).slice();
        pool.sort(function (a, b) { var ha = hist[kcHashKey(a.q)], hb = hist[kcHashKey(b.q)]; var wa = (ha && ha.n && ha.right < ha.n) ? 0 : 1, wb = (hb && hb.n && hb.right < hb.n) ? 0 : 1; return wa - wb; });
        var took = 0, rseen = {};
        for (var pi = 0; pi < pool.length && took < 2; pi++) {
          var cand = pool[pi];
          if (!rseen[cand.q]) { rseen[cand.q] = 1; took++; reviewPool.push({ q: cand.q, options: cand.options, answer: cand.answer, why: cand.why, whyWrong: cand.whyWrong, diff: cand.diff, rw: pw }); }
        }
      }
      var reserve = Math.min(5, reviewPool.length);
      var ownTarget = Math.min(kcOwnPool.length, 15 - reserve);
      for (var oi2 = 0; oi2 < kcOwnPool.length && kcItems.length < ownTarget; oi2++) { var own = kcOwnPool[(oi2 + kcVer * 4) % kcOwnPool.length]; if (!kcSeen[own.q]) { kcSeen[own.q] = 1; kcItems.push(own); } }
      for (var ri = 0; ri < reviewPool.length && kcItems.length < 15; ri++) { if (!kcSeen[reviewPool[ri].q]) { kcSeen[reviewPool[ri].q] = 1; kcItems.push(reviewPool[ri]); } }
    }

    if (!kcItems.length && !shortItems.length) return { html: '', items: [] };

    /* score + calibration pass */
    var kAns = 0, kCor = 0, nT = 0, nC = 0, rT = 0, rC = 0, missWk = {};
    var mastered = 0, fragile = 0, misc = [], edge = 0, confSet = 0;
    kcItems.forEach(function (m, mi) {
      var key = 'wk' + w + '|kc' + kcVer + '|' + mi;
      var sel = state.mcSel[key];
      if (sel !== undefined && sel !== null) {
        kAns++; var right = (sel === m.answer); if (right) kCor++;
        if (m.rw) { rT++; if (right) rC++; else missWk[m.rw] = 1; }
        else { nT++; if (right) nC++; }
        var conf = state.mcConf && state.mcConf[key];
        if (conf) {
          confSet++;
          if (right && conf === 'sure') mastered++;
          else if (right && conf !== 'sure') fragile++;
          else if (!right && conf === 'sure') misc.push({ q: m.q, rw: m.rw, mi: mi });
          else edge++;
        }
      }
    });
    var allAns = kcItems.length ? (kAns === kcItems.length) : false;
    var reveal = allAns && !!(state.kcReveal && state.kcReveal[revKey]);
    /* record outcomes to the on-device history once a set is fully answered */
    if (reveal) {
      state.kcHist = state.kcHist || {};
      kcItems.forEach(function (m, mi) {
        var sel = state.mcSel['wk' + w + '|kc' + kcVer + '|' + mi]; if (sel === undefined || sel === null) return;
        var hk = kcHashKey(m.q), h = state.kcHist[hk] || { n: 0, right: 0 };
        if (!h._seen || h._seen !== (kcVer + 1)) { h.n = (h.n || 0) + 1; if (sel === m.answer) h.right = (h.right || 0) + 1; h._seen = kcVer + 1; state.kcHist[hk] = h; }
      });
      persist();
    }

    var lastGroup = null;
    var kRows = kcItems.map(function (m, mi) {
      var mkey = 'wk' + w + '|kc' + kcVer + '|' + mi;
      var sel = state.mcSel[mkey];
      var done = (sel !== undefined && sel !== null);
      var conf = state.mcConf && state.mcConf[mkey];
      var groupHead = '';
      if (isMatch(m)) { if (m.mgroup !== lastGroup) { lastGroup = m.mgroup; groupHead = '<p style="margin:6px 0 9px;font-size:.92rem;font-weight:600;color:var(--ink)">' + esc(m.mlabel || 'Match each item to the best fit.') + '</p>'; } }
      else { lastGroup = null; }

      /* matching row: compact dropdown, same scoring key as an MC item */
      if (isMatch(m)) {
        var optHtml = '<option value="-1"' + (!done ? ' selected' : '') + '>Choose...</option>' + (m.options || []).map(function (o, oi) { return '<option value="' + oi + '"' + (sel === oi ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('');
        var rowMark = '', bd = 'var(--border)';
        if (reveal) { if (sel === m.answer) { rowMark = '<span style="color:#2c6b3f;font-weight:700;margin-left:8px">✓</span>'; bd = '#50694C'; } else { rowMark = '<span style="color:var(--red);font-weight:600;margin-left:8px;font-size:.85rem">✗ ' + esc(m.options[m.answer] || '') + '</span>'; bd = 'var(--red)'; } }
        var whyM = (reveal && sel !== m.answer && m.why) ? '<div style="margin:7px 0 0;font-size:.83rem;color:var(--ink-dim);line-height:1.5">' + esc(m.why) + '</div>' : '';
        return groupHead + '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 15px;margin-bottom:9px"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span style="font-size:.92rem;font-weight:600;flex:1;min-width:130px">' + esc(m.q) + '</span><select onchange="SOC.mcPickSel(\'' + mkey + '\',this.value)" aria-label="Match for ' + esc(m.q) + '" style="font:inherit;font-size:.88rem;padding:7px 10px;border:1.5px solid ' + bd + ';border-radius:8px;background:#fff;color:var(--ink);max-width:100%">' + optHtml + '</select>' + rowMark + '</div>' + whyM + '</div>';
      }

      /* standard / scenario multiple choice */
      var opts = (m.options || []).map(function (o, oi) {
        var isSel = (sel === oi), isCor = (oi === m.answer);
        var bg = '#fff', bd = 'var(--border)', col = 'var(--ink)', mark = '';
        if (reveal && isCor) { bg = '#E9EFE7'; bd = '#50694C'; col = '#2c3b29'; mark = ' ✓'; }
        else if (reveal && isSel && !isCor) { bg = '#F6E3E1'; bd = 'var(--red)'; col = '#8f1b12'; mark = ' ✗'; }
        else if (isSel) { bg = '#FDF0EE'; bd = 'var(--red)'; col = 'var(--ink)'; mark = ' ●'; }
        return '<button onclick="SOC.mcPick(\'' + mkey + '\',' + oi + ')" aria-pressed="' + isSel + '" style="display:block;width:100%;text-align:left;border:1.5px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.9rem;cursor:pointer">' + esc(o) + mark + '</button>';
      }).join('');
      /* confidence prompt appears once answered, before the whole set is revealed */
      var confRow = (done && !reveal) ? '<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:2px 0 2px"><span style="font-size:.78rem;color:var(--ink-faint)">How sure?</span>' + [['sure', 'Sure'], ['mid', 'Think so'], ['guess', 'Guessing']].map(function (c) { var on = conf === c[0]; return '<button onclick="SOC.mcConf(\'' + mkey + '\',\'' + c[0] + '\',' + w + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? 'var(--red)' : 'var(--border)') + ';background:' + (on ? '#FDF0EE' : '#fff') + ';color:' + (on ? 'var(--red)' : 'var(--ink-dim)') + ';border-radius:999px;padding:4px 11px;font-size:.76rem;font-weight:' + (on ? '700' : '500') + ';cursor:pointer">' + c[1] + '</button>'; }).join('') + '</div>' : '';
      /* diagnostic on reveal: distractor-specific note for a wrong pick, else the general why */
      var diag = '';
      if (reveal) {
        var wrongNote = (sel !== m.answer && m.whyWrong && m.whyWrong[sel]) ? m.whyWrong[sel] : '';
        var body = wrongNote || m.why;
        if (body) { var okBg = (sel === m.answer); var confTag = (conf === 'sure' && sel !== m.answer) ? '<div style="font-size:.72rem;font-weight:700;letter-spacing:.03em;color:#8f1b12;margin-bottom:5px">A CONFIDENT MISS, WORTH UNLEARNING</div>' : ''; diag = '<div style="margin:9px 0 0;padding:10px 13px;border-radius:9px;background:' + (okBg ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (okBg ? '#9CC4A8' : '#E5B8B0') + ';font-size:.875rem;line-height:1.55">' + confTag + esc(body) + '</div>'; }
      }
      var revTag = m.rw ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#6B7280;background:#EEF1F5;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">REVIEW · WEEK ' + m.rw + '</span>' : (isScenario(m) ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#8a5a1a;background:#FBEFD9;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">SCENARIO</span>' : '');
      return groupHead + '<div id="kcq-' + mkey.replace(/[^a-zA-Z0-9]/g, '-') + '" style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600">' + (mi + 1) + '. ' + esc(m.q) + revTag + '</p>' + opts + confRow + diag + '</div>';
    }).join('');

    /* Set C short-answer: write first, then reveal a model to compare against, then self-rate */
    var shortHtml = '';
    if (shortItems.length) {
      var srows = shortItems.map(function (m, si) {
        var skey = 'wk' + w + '|kc' + kcVer + '|short' + si;
        var txt = (state.kcShort && state.kcShort[skey]) || '';
        var shown = state.kcShortShown && state.kcShortShown[skey];
        var rated = state.kcShortRate && state.kcShortRate[skey];
        var model = shown
          ? '<div style="background:#15171C;color:#fff;border-radius:12px;padding:15px 18px;margin-top:11px"><div class="mono" style="font-size:.68rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:8px">A MODEL ANSWER</div><p style="margin:0;font-size:.92rem;line-height:1.6;color:rgba(255,255,255,.94)">' + esc(m.model || '') + '</p><p style="font-size:.8rem;margin:9px 0 0;color:#9aa3b2">One strong answer. Compare it with yours, do not copy it. How close were you?</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:11px">' + [['got', 'I had this'], ['part', 'Partly there'], ['not', 'Not yet']].map(function (r) { var on = rated === r[0]; return '<button onclick="SOC.kcShortRate(\'' + skey + '\',\'' + r[0] + '\',' + w + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? '#fff' : 'rgba(255,255,255,.35)') + ';background:' + (on ? '#fff' : 'transparent') + ';color:' + (on ? '#15171C' : '#fff') + ';border-radius:999px;padding:6px 13px;font-size:.82rem;font-weight:600;cursor:pointer">' + r[1] + '</button>'; }).join('') + '</div></div>'
          : '<button onclick="SOC.kcShortReveal(\'' + skey + '\',' + w + ')" style="margin-top:10px;background:none;border:1px solid #15171C;color:#15171C;border-radius:9px;padding:9px 15px;font-size:.88rem;font-weight:600;cursor:pointer">Reveal a model answer</button>';
        var ratedLine = (shown && rated) ? '<p style="margin:9px 0 0;font-size:.82rem;color:var(--ink-faint)">You rated yourself: ' + (rated === 'got' ? 'I had this.' : rated === 'part' ? 'Partly there.' : 'Not yet, and that is fine, that is what the reading is for.') + '</p>' : '';
        return '<div style="background:#F7F8FA;border:1px solid var(--border);border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600">' + esc(m.q) + '</p><textarea oninput="SOC.kcShortText(\'' + skey + '\',this.value)" aria-label="Your answer" class="wk-ta" placeholder="Write your answer, then reveal a model to compare..." style="min-height:80px">' + esc(txt) + '</textarea>' + model + ratedLine + '</div>';
      }).join('');
      shortHtml = '<div style="margin-top:6px"><h3 style="margin:14px 0 4px;font-size:1.05rem">Reflect and compare</h3><p class="wk-hint" style="margin-bottom:11px">Not scored, nothing recorded. Write your own answer first, then reveal a model answer and rate how close you were. The point is the comparison, not a mark.</p>' + srows + '</div>';
    }

    var setMeta = [['A', 'multiple choice'], ['B', 'more multiple choice'], ['C', 'applied and different']];
    var vers = [0, 1, 2].map(function (v) { var on = (v === kcVer); return '<button onclick="SOC.kcVer(' + w + ',' + v + ')" aria-pressed="' + on + '" style="border:1px solid ' + (on ? 'var(--red)' : 'var(--border)') + ';background:' + (on ? '#FDF0EE' : '#fff') + ';color:' + (on ? 'var(--red)' : 'var(--ink)') + ';font-weight:' + (on ? '700' : '500') + ';border-radius:999px;padding:6px 14px;font-size:.82rem;cursor:pointer">Set ' + setMeta[v][0] + '</button>'; }).join('');
    var setNote = '<p class="wk-hint" style="margin:0 0 12px;font-size:.82rem">Set ' + setMeta[kcVer][0] + ': ' + setMeta[kcVer][1] + '. ' + (isC ? 'Scenarios and matching are scored; the short written reflections at the end are for you to compare against a model.' : 'Fresh multiple choice, ' + (kcVer === 0 ? 'foundational' : 'a step harder') + ', from this week plus a short review of earlier weeks that leans on ideas you have missed before.') + '</p>';
    var retake = kAns ? '<button onclick="SOC.kcClear(' + w + ',' + kcVer + ')" style="border:1px solid var(--border);background:#fff;border-radius:999px;padding:6px 14px;font-size:.82rem;cursor:pointer">Clear and retake this set</button>' : '';
    var progress = (kcItems.length && !allAns) ? '<p class="wk-hint" style="margin:0 0 12px">' + kAns + ' of ' + kcItems.length + ' answered. Mark how sure you were as you go.</p>' : '';
    var revealCta = (allAns && !reveal) ? '<button onclick="SOC.kcShow(' + w + ')" class="wk-cta" style="margin:2px 0 14px">See how I did →</button>' : '';

    var summary = '';
    if (reveal && kcItems.length) {
      var pct = Math.round(100 * kCor / kcItems.length);
      var head, body;
      if (pct >= 93) { head = 'Command'; body = 'You are not just recognising these ideas, you can tell them apart under pressure, which is exactly what the course asks of you.'; }
      else if (pct >= 80) { head = 'Solid'; body = 'You have the spine of this material. The few you missed are explained below; read those once more and you are at full strength.'; }
      else if (pct >= 60) { head = 'Developing'; body = 'A real start. You are recognising the ideas but some are still blurring together. Read the explanations below, then take another set fresh.'; }
      else { head = 'Starting point'; body = 'This tells you where you are starting from, and that is useful information, not a judgment. Work back through this week\'s key concepts and readings, then take another set and watch the difference.'; }
      /* calibration read-out leads with confident misses */
      var calib = '';
      if (confSet) {
        var mlist = misc.map(function (x) { return '<li style="margin:3px 0;font-size:.88rem;line-height:1.5;color:#f3d3ce">' + esc(x.q) + (x.rw ? ' <span style="color:#9aa3b2">(review, Week ' + x.rw + ')</span>' : '') + '</li>'; }).join('');
        calib = '<div style="margin:12px 0 0;padding-top:12px;border-top:1px solid rgba(255,255,255,.16)">'
          + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:#9aa3af;margin-bottom:7px">HOW SURE YOU WERE vs HOW IT WENT</div>'
          + '<div style="display:flex;gap:14px;flex-wrap:wrap;font-size:.85rem">'
          + '<span style="color:#bfe3c8">● Mastered ' + mastered + '</span>'
          + '<span style="color:#e7dca6">● Right but unsure ' + fragile + '</span>'
          + '<span style="color:#f3b1a8">● Confident miss ' + misc.length + '</span>'
          + '<span style="color:#c8cdd6">● Still finding it ' + edge + '</span></div>'
          + (misc.length ? '<p style="margin:10px 0 4px;font-size:.88rem;line-height:1.55;color:#f3d3ce">Start here. You were sure on these and they did not land, a confident wrong belief is the one that costs you later:</p><ul style="margin:0;padding-left:18px">' + mlist + '</ul>' : (mastered ? '<p style="margin:9px 0 0;font-size:.88rem;color:#bfe3c8">No confident misses, what you are sure of, you have right. That is the calibration you want.</p>' : ''))
          + (fragile ? '<p style="margin:9px 0 0;font-size:.85rem;color:#e7dca6">' + fragile + ' you got right but were not sure about. You know more than you trust; name why the answer is right and it becomes solid.</p>' : '')
          + '</div>';
      }
      var split = '';
      if (nT && rT) split = '<p style="margin:8px 0 0;font-size:.9rem;line-height:1.55">On this week\'s new ideas you got ' + nC + ' of ' + nT + '. On review from earlier weeks you got ' + rC + ' of ' + rT + '.' + (rC < rT ? ' Earlier material fades fastest; a short revisit brings it back.' : ' Your earlier weeks are holding, which is the whole point of the review.') + '</p>';
      var revisit = Object.keys(missWk).map(function (n) { return '<button onclick="SOC.station(' + n + ')" style="border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;border-radius:8px;padding:7px 13px;font-size:.85rem;margin:10px 8px 0 0;cursor:pointer">Revisit Week ' + n + ' →</button>'; }).join('');
      var refLine = shortItems.length ? '<p style="margin:8px 0 0;font-size:.88rem;color:#e5e7eb">Then there ' + (shortItems.length === 1 ? 'is 1 short reflection' : 'are ' + shortItems.length + ' short reflections') + ' below to compare against a model, not scored.</p>' : '';
      summary = '<div style="margin:6px 0 14px;background:#15171C;color:#fff;border-radius:12px;padding:17px 20px">'
        + '<div class="mono" style="font-size:.66rem;letter-spacing:.08em;color:#9aa3af">WHERE YOU STAND · ' + kCor + ' OF ' + kcItems.length + '</div>'
        + '<div style="font-size:1.05rem;font-weight:700;margin:6px 0 4px">' + head + '</div>'
        + '<p style="margin:0;font-size:.9rem;line-height:1.6;color:#e5e7eb">' + body + '</p>'
        + (split ? '<div style="color:#e5e7eb">' + split + '</div>' : '')
        + calib + refLine + (revisit ? '<div>' + revisit + '</div>' : '')
        + '</div>';
    }

    var badge = '<span class="mono" style="font-size:.62rem;letter-spacing:.06em;color:#2c6b3f;background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:3px 10px;margin-left:10px;vertical-align:middle">NOT GRADED</span>';
    var kc = '<section id="wk-kc" class="node"><h2 class="wk-sec">Knowledge Check ' + badge + '</h2>'
      + '<p class="wk-hint">Nothing here counts toward your grade and nothing is recorded. Three sets: Set A and Set B are multiple choice; Set C brings scenarios, matching, and short written reflections. Answer, say how sure you were, and the check shows you not just what you got right but where a confident answer was actually wrong, the thing most worth fixing.</p>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px">' + vers + retake + '</div>'
      + setNote + progress + revealCta + summary + kRows + shortHtml + '</section>';
    return { html: kc, items: kcItems.concat(shortItems) };
  }

  function weekHero(w, d, opt) {
    d = d || {};
    opt = opt || {};
    var route = opt.route || ['Read', 'See', 'Try', 'Reflect'];
    var routeHtml = route.map(function (x, i) { return '<span><b>' + (i + 1) + '</b>' + esc(x) + '</span>'; }).join('');
    var startPart = opt.startPart || 'pre';
    var startLabel = opt.startLabel || 'Start this week';
    var sub = opt.sub || d.overview || '';
    var q = opt.question === false ? '' : (opt.question || journeyQ(w));
    return '<section id="wk-ov" class="node jhero jfade wk-hero2">'
      + '<div class="wk-hero-main"><div class="mono wk-hero-kicker">WEEK ' + w + ' | ' + esc(weekDate(w)) + ' | ' + esc(opt.label || deliveryMode(w).label) + '</div>'
      + '<h1>' + esc(opt.title || weekTitle(w)) + '</h1>'
      + (sub ? '<p>' + esc(sub) + '</p>' : '')
      + (q ? '<div class="wk-hero-question">' + esc(q) + '</div>' : '')
      + '<div class="wk-hero-actions"><button type="button" onclick="SOC.jumpWeek(' + w + ',\'' + startPart + '\')">' + esc(startLabel) + '</button><span>' + ic('calendar', 13) + ' ' + esc(deliveryMode(w).short) + '</span></div></div>'
      + '<aside class="wk-hero-route" aria-label="Weekly route"><div class="mono">MODULE ROUTE</div>' + routeHtml + '</aside>'
      + '</section>';
  }

  function weekPage(w, d) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var sec = function (id, title, inner) { return '<section id="wk-' + id + '" class="node"><h2 class="wk-sec">' + esc(title) + '</h2>' + inner + '</section>'; };
    var hero = weekHero(w, d, { startPart: 'pre', startLabel: 'Start this week', label: deliveryMode(w).label });
    var pre = sec('pre', 'Before you begin', '<p class="wk-hint">A quick read on where your understanding sits right now, no grade. Rate each idea, then meet them again at the end to see how far your thinking moves.</p>' + wkChecks(w, 'pre', d));
    var purpose = '<section id="wk-learn" class="node"><h2 class="wk-sec">Purpose</h2><p style="margin:0">' + esc(d.purpose) + '</p></section>';
    var outcomes = sec('out', 'Learning outcomes', '<p style="margin:0 0 8px;font-size:.9rem">By the end of this week, you will be able to:</p>' + d.outcomes.map(function (o) { return '<div class="wk-oc"><span class="b"></span>' + esc(o) + '</div>'; }).join(''));
    var guiding = sec('gq', 'Guiding questions', '<p style="margin:0 0 8px;font-size:.9rem">Hold these in mind as you work:</p>' + d.guiding.map(function (q) { return '<div class="wk-gq"><span class="q">+</span>' + esc(q) + '</div>'; }).join(''));
    var programLens = lensProgramSection(w, d);
    var programCase = lensCaseStudySection(w, d);
    var concepts = sec('con', 'Key concepts', '<p class="wk-hint">These are the week\'s big ideas, explained. Read them to understand the argument; this is what your discussions and written work draw on.</p>' + d.concepts.map(function (c) { return '<div class="wk-concept"><h3>' + esc(c.h) + '</h3><p>' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></p></div>'; }).join(''));
    var terms = sec('term', 'Key terms', '<p class="wk-hint">These are the precise vocabulary. Learn them to speak and write accurately; they feed the flashcards and Knowledge Check.</p>' + d.terms.map(function (t) { return '<div class="wk-term"><b>' + esc(t.term) + '</b>: ' + esc(t.def) + ' <span class="wk-cite">(' + esc(t.cite) + ')</span></div>'; }).join(''));
    var readings = sec('read', 'Readings', d.readings.map(function (r) { var resolves = (typeof rec === 'function') && r.id && rec(r.id); var tail = resolves ? '<button onclick="SOC.read(\'' + r.id + '\')" class="wk-scope">' + esc(r.scope || 'Open the reading') + ' &#8599;</button>' : (r.scope ? '<div class="wk-scope" style="background:none;border:none;color:var(--ink-faint);padding:6px 0;cursor:default">' + esc(r.scope) + '</div>' : ''); return '<div class="wk-read"><div class="ref">' + r.apa + '</div>' + tail + '</div>'; }).join('') + readingRescueSection(w, d));
    var watch = d.deck ? '<section id="wk-watch" class="node"><h2 class="wk-sec">Walkthrough</h2><p style="margin:0 0 12px;font-size:.92rem">A short, immersive walk through this week\'s core idea, with its diagrams. Step through it right here.</p><button type="button" class="wk-cta" style="margin:0" onclick="SOC.playWalk(' + w + ')">Play the walkthrough</button></section>' : '';
    var act = '<section id="wk-do" class="node interactive"><h2 class="wk-sec">The activity: ' + esc(d.activity.title) + '</h2><div class="wk-whatwhy"><b>What this is:</b> ' + esc(d.activity.what) + '<br><br><b>Why you are doing it:</b> ' + esc(d.activity.why) + '</div>' + lensActivityBlock(w, d.activity, false) + '<button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">Start the activity' + ic('chevron', 17, 2.4) + '</button><p style="margin:10px 0 0;font-size:.74rem;color:var(--ink-faint)">Every activity works the same way: predict, then do it, then see the result, then name it with the reading.</p></section>';
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Reflection</h2>'
      + '<div class="wk-ocheck"><div class="mono" style="font-size:.78rem;font-weight:700;color:var(--ink-faint);margin-bottom:7px">YOU CAN NOW</div>' + d.youcan.map(function (y) { return '<div class="wk-row"><span class="t">' + ic('check', 14, 2.6) + '</span>' + esc(y) + '</div>'; }).join('') + '</div>'
      + '<h3 style="margin:16px 0 4px">Now, what do you think?</h3><p class="wk-hint" style="margin-bottom:8px">The same ideas from the start. Rate them again to see where your understanding sits now, and how far it moved.</p>' + wkChecks(w, 'post', d)
      + '<h3 style="margin:16px 0 4px">Your reflection</h3><p style="margin:0 0 8px;font-size:.95rem">' + esc(d.reflectPrompt) + '</p>'
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
      + '</section>';
    var notes = '<section id="wk-notes" class="node"><h2 class="wk-sec">Generate Your Weekly Notes</h2>'
      + '<div class="wk-savebox" style="margin-top:0"><h3>Your organized Week ' + w + ' record</h3><p style="margin:0 0 4px;font-size:.9rem">This makes one Word file (.docx) on Seneca letterhead. It organizes your private weekly check answers, activity summary, and reflection for review before Blackboard work.</p><ul><li>your before-and-after answers to the five check questions</li><li>a summary of what you did in this week\'s activity</li><li>your answer to the reflection question</li></ul><button onclick="SOC.saveWeek(' + w + ')" class="wk-save">Generate Your Weekly Notes</button></div>'
      + '</section>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var sg = sgSection(w).html;
    var kcR = kcSection(w);
    var kc = kcR.html, kcItems = kcR.items;
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Overview'], ['mode', 'How this week works'], ['rec', deliveryMode(w).kind === 'live' ? 'Class recording' : 'Instructor update'], ['pre', 'Before you begin'], ['learn', 'Purpose'], ['out', 'Learning outcomes'], ['gq', 'Guiding questions']].concat(programLens ? [['lens', 'For your program']] : []).concat([['con', 'Key concepts'], ['term', 'Key terms'], ['read', 'Readings']]).concat(d.deck ? [['watch', 'Walkthrough']] : []).concat(programCase ? [['case', 'Case study']] : []).concat([['do', 'The activity'], ['reflect', 'Reflection']]).concat(sg ? [['sg', 'Study Guide']] : []).concat(kcItems.length ? [['kc', 'Knowledge Check']] : []).concat([['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('calendar', 12) + ' ' + esc(deliveryMode(w).short) + '</div></div></aside>';
    var collBar = '<div class="wk-coll-bar" role="group" aria-label="Section display controls"><button type="button" onclick="SOC.wkCollAll(' + w + ',1)">Collapse all sections</button><span>Weeks start folded so you can see the whole map. Up to two sections stay open at once; opening a third closes the earliest one. Sections fold again when you leave the week.</span></div>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><main>' + collBar + pre + purpose + outcomes + guiding + programLens + concepts + terms + readings + watch + programCase + act + reflect + sg + kc + notes + navRow + '</main>' + rail + '</div></div>';
  }
  /* ---------- generic week activities: match / scenario / toggle / assemble / lab ---------- */
  function actCard(inner) { return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin:0 0 12px">' + inner + '</div>'; }
  function actCite(c) { return c ? '<div style="font-size:.74rem;color:var(--ink-faint);margin-top:6px">(' + esc(c) + ')</div>' : ''; }
  function actBadge(harm) { return harm ? '<span style="display:inline-block;background:#FBE9EA;color:#B11722;font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">a weaker move</span>' : '<span style="display:inline-block;background:#E7F3EC;color:#1C7A43;font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">a stronger move</span>'; }
  function actCaseBox(label, txt) { return txt ? '<div style="background:#15171C;color:#fff;border-radius:12px;padding:14px 18px;margin:0 0 16px"><div style="font-size:.7rem;font-weight:700;color:#F2A900;margin-bottom:4px">' + label + '</div><div style="font-size:.98rem;line-height:1.5">' + esc(txt) + '</div></div>' : ''; }
  function actMatch(w, a) {
    var d = a.data || {}, pairs = d.pairs || [], uniq = [], seen = {};
    pairs.forEach(function (p) { if (!seen[p.match]) { seen[p.match] = 1; uniq.push(p.match); } });
    var rows = pairs.map(function (p, i) {
      var key = 'a|' + w + '|m|' + i, sel = state.act[key];
      var btns = uniq.map(function (o, oi) {
        var picked = (sel === oi), correct = (o === p.match), bg = '#fff', bd = 'var(--border)', col = 'var(--ink)';
        if (sel != null) { if (correct) { bg = '#E7F3EC'; bd = '#1C7A43'; col = '#155f34'; } else if (picked) { bg = '#FBE9EA'; bd = '#B11722'; col = '#8f1119'; } }
        return '<button onclick="SOC.actPick(\'' + key + '\',' + oi + ')" aria-pressed="' + picked + '" style="text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:9px;padding:8px 12px;font-size:.86rem;font-weight:600;cursor:pointer;margin:0 6px 6px 0">' + esc(o) + '</button>';
      }).join('');
      var fb = (sel != null) ? '<div style="margin-top:8px;font-size:.86rem;color:var(--ink-dim)">' + (uniq[sel] === p.match ? '<b style="color:#1C7A43">Yes. </b>' : '<b style="color:#B11722">Not quite. </b>') + esc(p.why) + actCite(p.cite) + '</div>' : '';
      return actCard('<div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:5px">EXAMPLE ' + (i + 1) + '</div><div style="font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:10px">' + esc(p.item) + '</div><div style="font-size:.78rem;color:var(--ink-faint);margin-bottom:6px">Which mechanism does this show?</div>' + btns + fb);
    }).join('');
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Match each example to the mechanism it shows.') + '</p>' + rows;
  }
  function actScenario(w, a) {
    var d = a.data || {}, steps = d.steps || [];
    var rows = steps.map(function (st, i) {
      var key = 'a|' + w + '|s|' + i, sel = state.act[key];
      var choices = (st.choices || []).map(function (c, ci) {
        var picked = (sel === ci), bd = picked ? (c.harm ? '#B11722' : '#1C7A43') : 'var(--border)', bg = picked ? (c.harm ? '#FBE9EA' : '#E7F3EC') : '#fff';
        return '<button onclick="SOC.actPick(\'' + key + '\',' + ci + ')" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.9rem;font-weight:600;cursor:pointer;margin:0 0 7px">' + esc(c.label) + (picked ? actBadge(c.harm) : '') + '</button>' + (picked ? '<div style="font-size:.86rem;color:var(--ink-dim);margin:0 0 10px;padding:0 2px">' + esc(c.outcome) + actCite(c.cite) + '</div>' : '');
      }).join('');
      return actCard('<div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:6px">DECISION ' + (i + 1) + '</div><div style="font-size:.98rem;font-weight:600;color:var(--ink);margin-bottom:10px">' + esc(st.situation) + '</div>' + choices);
    }).join('');
    return actCaseBox('THE CASE', d.setup) + '<p style="margin:0 0 14px;color:var(--ink-dim)">Make a call at each point, then see where it leads.</p>' + rows;
  }
  function actToggle(w, a) {
    var d = a.data || {}, tgs = d.toggles || [];
    var rows = tgs.map(function (t, i) {
      var key = 'a|' + w + '|t|' + i, on = !!state.act[key];
      var sw = '<button onclick="SOC.actToggle(\'' + key + '\')" aria-pressed="' + on + '" aria-label="' + esc(t.label) + '" style="border:none;border-radius:999px;width:52px;height:28px;background:' + (on ? '#1C7A43' : '#C7CDD6') + ';position:relative;cursor:pointer;flex:0 0 auto"><span style="position:absolute;top:3px;left:' + (on ? '27px' : '3px') + ';width:22px;height:22px;border-radius:50%;background:#fff"></span></button>';
      return actCard('<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">' + sw + '<div style="font-size:.96rem;font-weight:700;color:var(--ink)">' + esc(t.label) + '<span style="font-size:.72rem;font-weight:600;color:var(--ink-faint);margin-left:8px">' + (on ? 'ON' : 'OFF') + '</span></div></div><div style="font-size:.88rem;color:var(--ink-dim)">' + esc(on ? t.on : t.off) + '</div><div style="font-size:.82rem;color:#B11722;margin-top:6px"><b>What it affects:</b> ' + esc(t.whoHarmed) + '</div>' + actCite(t.cite));
    }).join('');
    return actCaseBox('THE SYSTEM', d.system) + '<p style="margin:0 0 14px;color:var(--ink-dim)">Flip each setting and watch what changes.</p>' + rows;
  }
  function actAssemble(w, a) {
    var d = a.data || {}, comps = d.components || [], key = 'a|' + w + '|asm', added = state.act[key] || [];
    var avail = comps.map(function (c, i) { return added.indexOf(i) >= 0 ? '' : '<button onclick="SOC.actAdd(\'' + key + '\',' + i + ')" style="display:block;width:100%;text-align:left;border:1px dashed var(--border);background:#fff;color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.9rem;font-weight:600;cursor:pointer;margin:0 0 7px">+ ' + esc(c.label) + '</button>'; }).join('');
    var built = added.map(function (idx, n) { var c = comps[idx] || {}; return '<div style="border-left:3px solid var(--red);background:#fff;border:1px solid var(--border);border-radius:9px;padding:10px 13px;margin:0 0 8px"><div style="font-size:.92rem;font-weight:700;color:var(--ink)">' + (n + 1) + '. ' + esc(c.label) + '</div><div style="font-size:.85rem;color:var(--ink-dim);margin-top:3px">' + esc(c.role) + actCite(c.cite) + '</div></div>'; }).join('');
    var done = (added.length >= comps.length && comps.length) ? '<div style="margin-top:14px;background:#E7F3EC;border:1px solid #1C7A43;border-radius:10px;padding:12px 15px;font-size:.9rem;color:#155f34;font-weight:600">You have assembled the whole picture. Seeing the parts together is the point: it is how they fit that matters, not any one piece.</div>' : '';
    return actCaseBox('THE GOAL', d.goal) + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px"><div><div style="font-size:.7rem;font-weight:700;color:var(--ink-faint);margin-bottom:8px">PARTS TO ADD</div>' + (avail || '<div style="font-size:.85rem;color:var(--ink-faint)">All parts added.</div>') + '</div><div><div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:8px">WHAT YOU HAVE BUILT</div>' + (built || '<div style="font-size:.85rem;color:var(--ink-faint)">Nothing yet. Add parts from the left.</div>') + '</div></div>' + done;
  }
  function actLab(w, a) {
    var d = a.data || {}, levers = d.levers || [], pick = d.pick || 2, key = 'a|' + w + '|lab', chosen = state.act[key] || [];
    var rows = levers.map(function (l, i) {
      var sel = chosen.indexOf(i) >= 0;
      var head = '<button onclick="SOC.actLabPick(\'' + key + '\',' + i + ',' + pick + ')" style="display:flex;align-items:center;gap:9px;width:100%;text-align:left;border:1px solid ' + (sel ? 'var(--red)' : 'var(--border)') + ';background:' + (sel ? '#FDECEC' : '#fff') + ';color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.92rem;font-weight:700;cursor:pointer;margin:0 0 ' + (sel ? '0' : '8px') + '"><span style="width:18px;height:18px;border-radius:5px;border:2px solid ' + (sel ? 'var(--red)' : '#C7CDD6') + ';background:' + (sel ? 'var(--red)' : '#fff') + ';flex:0 0 auto"></span>' + esc(l.label) + '</button>';
      var body = sel ? '<div style="border:1px solid var(--red);border-top:none;border-radius:0 0 9px 9px;background:#fff;padding:10px 13px;margin:0 0 8px;font-size:.86rem;color:var(--ink-dim)"><b>What it does:</b> ' + esc(l.effect) + '<br><b>The trade-off:</b> ' + esc(l.tradeoff) + actCite(l.cite) + '</div>' : '';
      return head + body;
    }).join('');
    var note = chosen.length >= pick ? '<div style="margin-top:8px;background:#E7F3EC;border:1px solid #1C7A43;border-radius:10px;padding:12px 15px;font-size:.88rem;color:#155f34;font-weight:600">You picked your ' + pick + '. There is no clean answer here: every option gives something and costs something. That trade-off is the real choice.</div>' : '<div style="margin-top:8px;font-size:.82rem;color:var(--ink-faint)">Choose ' + pick + ' levers (' + chosen.length + ' of ' + pick + ' chosen).</div>';
    return actCaseBox('THE CASE', d['case']) + '<p style="margin:0 0 12px;color:var(--ink-dim)">You are weighing the options. Pick the ' + pick + ' levers you would use, and weigh what each one costs.</p>' + rows + note;
  }
  function actCapstone(w, a) {
    var d = a.data || {}, items = d.items || [];
    var rows = items.map(function (it, i) {
      var key = 'a|' + w + '|cap|' + i, on = !!state.act[key];
      var btn = '<button onclick="SOC.actToggle(\'' + key + '\')" style="display:flex;align-items:center;gap:11px;width:100%;text-align:left;border:1px solid ' + (on ? '#1C7A43' : 'var(--border)') + ';background:' + (on ? '#E7F3EC' : '#fff') + ';border-radius:9px;padding:11px 14px;font-size:.95rem;font-weight:700;color:var(--ink);cursor:pointer;margin:0 0 ' + (on ? '0' : '8px') + '"><span style="width:20px;height:20px;border-radius:50%;border:2px solid ' + (on ? '#1C7A43' : '#C7CDD6') + ';background:' + (on ? '#1C7A43' : '#fff') + ';color:#fff;flex:0 0 auto;display:flex;align-items:center;justify-content:center">' + (on ? ic('check', 12, 3) : '') + '</span>' + esc(it.label) + '</button>';
      var body = on ? '<div style="border:1px solid #1C7A43;border-top:none;border-radius:0 0 9px 9px;background:#fff;padding:10px 14px;margin:0 0 8px;font-size:.88rem;color:var(--ink-dim)">' + esc(it.prompt) + actCite(it.cite) + '</div>' : '';
      return btn + body;
    }).join('');
    var callout = d.callout ? '<div style="margin-top:14px;background:#15171C;color:#fff;border-radius:12px;padding:16px 18px"><div style="font-size:.7rem;font-weight:700;color:#F2A900;margin-bottom:5px">YOUR FINAL PROJECT</div><div style="font-size:.95rem;line-height:1.5">' + esc(d.callout) + '</div></div>' : '';
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Revisit your cartography one dimension at a time. Mark each as you reread it.') + '</p>' + rows + callout;
  }
  function activityScreen() {
    var w = state.activityReturn, d = weekData(w);
    if (!d || !d.activity) return '<div style="padding:30px 0;color:var(--ink-dim)">No activity here. <button onclick="SOC.go(\'journey\')" style="background:none;border:none;color:var(--red);font-weight:600;cursor:pointer">Back to your journey</button></div>';
    var a = d.activity;
    var head = '<section class="jhero" style="margin:0 0 18px;padding:26px 28px"><div class="mono" style="font-size:.7rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">WEEK ' + w + ' ACTIVITY</div><h1 style="font-size:1.7rem;line-height:1.15;font-weight:700;margin:0 0 12px;color:var(--ink)">' + esc(a.title) + '</h1><div class="wk-whatwhy" style="margin:0"><b>What this is:</b> ' + esc(a.what) + '<br><br><b>Why you are doing it:</b> ' + esc(a.why) + '</div></section>' + lensActivityBlock(w, a, true);
    var inner = '';
    switch (a.archetype) { case 'match': inner = actMatch(w, a); break; case 'scenario': inner = actScenario(w, a); break; case 'toggle': inner = actToggle(w, a); break; case 'assemble': inner = actAssemble(w, a); break; case 'lab': inner = actLab(w, a); break; case 'capstone': inner = actCapstone(w, a); break; default: inner = '<p style="color:var(--ink-dim)">This activity is not set up yet.</p>'; }
    var foot = '<div style="margin-top:22px;padding-top:18px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap"><div style="font-size:.86rem;color:var(--ink-dim)">When you are done, go back to the week to answer the reflection and save your work.</div><button onclick="SOC.station(' + w + ')" class="wk-cta" style="margin:0">Back to Week ' + w + ' ' + ic('chevron', 16, 2.4) + '</button></div>';
    return '<div class="rise" style="margin:0 auto">' + head + inner + foot + '</div>';
  }
  function activitySummary(w, d) {
    var a = d.activity || {};
    var actMap = (state.actResult && typeof state.actResult === 'object') ? state.actResult : (state.act || {});
    if (a.screen === 'sandbox' || a.archetype == null) {
      var audited = Object.keys(state.auditedSystems || {});
      return audited.length ? ('You audited ' + audited.length + ' of 3 systems. Every system you tested failed darker-skinned women the most (up to 34.7 percent), against near-zero error for lighter-skinned men. The disparity was hidden by overall accuracy and only an intersectional cut revealed it.') : '(activity not run yet)';
    }
    var data = a.data || {};
    if (a.archetype === 'match') { var pairs = data.pairs || [], uniq = [], seen = {}, done = 0, correct = 0; pairs.forEach(function (q) { if (!seen[q.match]) { seen[q.match] = 1; uniq.push(q.match); } }); pairs.forEach(function (p, i) { var s = actMap['a|' + w + '|m|' + i]; if (s != null) { done++; if (uniq[s] === p.match) correct++; } }); return done ? ('You matched ' + correct + ' of ' + pairs.length + ' examples to the mechanism each one shows.') : '(activity not started yet)'; }
    if (a.archetype === 'scenario') { var steps = data.steps || [], n = 0; steps.forEach(function (st, i) { if (actMap['a|' + w + '|s|' + i] != null) n++; }); return n ? ('You worked through ' + n + ' of ' + steps.length + ' decision points and saw which design choices lead to harm.') : '(activity not started yet)'; }
    if (a.archetype === 'toggle') { var tgs = data.toggles || [], n2 = 0; tgs.forEach(function (t, i) { if (actMap['a|' + w + '|t|' + i]) n2++; }); return 'You explored the system defaults and saw who each one harms (' + n2 + ' of ' + tgs.length + ' turned on).'; }
    if (a.archetype === 'assemble') { var comps = data.components || [], added = (actMap['a|' + w + '|asm'] || []).length; return added ? ('You assembled ' + added + ' of ' + comps.length + ' parts and saw how they work together as a system.') : '(activity not started yet)'; }
    if (a.archetype === 'lab') { var levers = data.levers || [], ch = actMap['a|' + w + '|lab'] || []; if (!ch.length) return '(activity not started yet)'; var names = ch.map(function (i) { return levers[i] ? levers[i].label : ''; }).filter(Boolean); return 'For the case, you chose: ' + names.join(', ') + '. Each lever buys something and costs something.'; }
    if (a.archetype === 'capstone') { var citems = data.items || [], cn = 0; citems.forEach(function (it, i) { if (actMap['a|' + w + '|cap|' + i]) cn++; }); return cn ? ('You revisited ' + cn + ' of ' + citems.length + ' dimensions of your cartography across the term.') : '(revisit not started yet)'; }
    return '(activity not started yet)';
  }
  var WEEK_DATES = { 1: 'Sept 11', 2: 'Sept 18', 3: 'Sept 25', 4: 'Oct 2', 5: 'Oct 9', 6: 'Oct 16', 7: 'Oct 23', 8: 'Nov 6', 9: 'Nov 13', 10: 'Nov 20', 11: 'Nov 27', 12: 'Dec 4', 13: 'Dec 11', 14: 'async by Dec 16' };
  var STUDY_WEEK_DATE = 'Oct 26 to 30';
  var WORK_WEEKS = [13, 14];
  function weekDate(w) { return WEEK_DATES[w] || ''; }
  function deliveryMode(w) {
    if (w === 4) return { kind: 'async', label: 'ASYNCHRONOUS INDEPENDENT LEARNING', short: 'Asynchronous learning; no lecture', reason: 'There is no lecture this week. Use the flexible class time to apply the early foundations independently through Truth and Reconciliation work before the course returns to live discussion.' };
    if (w === 11) return { kind: 'async', label: 'ASYNCHRONOUS INDEPENDENT LEARNING', short: 'Asynchronous learning; no lecture', reason: 'There is no lecture this week. Use this deliberate independent synthesis point and the psychology readings and reflection prompts to prepare one connection for the final substantive live class.' };
    if (w === 13) return { kind: 'async', label: 'OFFICE HOURS + SUPPORTED ASYNCHRONOUS COMPLETION', short: 'Office hours; no lecture', reason: 'There is no lecture this week. The usual class window becomes office hours for focused Personal Cartography support and consultation. Office hours are not recorded by default.' };
    if (w === 14) return { kind: 'async', label: 'OFFICE HOURS + ASYNCHRONOUS COURSE CLOSURE', short: 'Office hours; no lecture', reason: 'There is no lecture this week. The usual class window becomes optional office hours for feedback and final questions. No graded work is due, and office hours are not recorded by default.' };
    return { kind: 'live', label: 'SYNCHRONOUS LIVE CLASS', short: 'Live class', reason: w === 12 ? 'This is the final substantive live class. Bring the connection you prepared in Week 11 and use the meeting to strengthen the whole-course synthesis.' : 'Our class meets live this week. Use the week page before class to prepare and return after class to reflect, practise, and save what matters.' };
  }
  function deliveryNotice(w) {
    var m = deliveryMode(w);
    return '<section id="wk-mode" class="delivery-note ' + (m.kind === 'live' ? '' : m.kind) + '" aria-labelledby="wk-mode-h"><div class="mono">' + esc(m.label) + '</div><h2 id="wk-mode-h">How this week works</h2><p>' + esc(m.reason) + '</p></section>';
  }
  function deliveryLegend() { return '<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin:0 0 14px;font-size:.8rem;color:var(--ink-dim)"><span style="display:inline-flex;align-items:center;gap:6px"><i style="width:12px;height:12px;border-radius:4px;background:#15171C"></i> Live class</span><span style="display:inline-flex;align-items:center;gap:6px"><i style="width:12px;height:12px;border-radius:2px;background:#6B7280"></i> Asynchronous; no lecture</span><span style="display:inline-flex;align-items:center;gap:6px"><i style="width:12px;height:12px;border-radius:4px;background:#fff;border:2px solid #6B7280"></i> Study Week</span></div>'; }
  function recordingEntry(w) { return RECORDINGS[String(w)] || RECORDINGS[w] || null; }
  function safeZoomRecordingUrl(raw) {
    try { var u = new URL(String(raw || '')); if (u.protocol !== 'https:' || !/(^|\.)zoom\.us$/i.test(u.hostname) || /(?:^|[?&])(pwd|passcode)=/i.test(u.search)) return ''; return u.href; } catch (e) { return ''; }
  }
  function recordingSection(w) {
    var m = deliveryMode(w), e = recordingEntry(w), live = m.kind === 'live';
    var heading = live ? 'Class recording' : 'Instructor update';
    var empty = live ? 'The recording space is ready. After class, the captioned recording will appear here when it has been processed and posted.' : 'There is no live class recording this week. If the instructor posts a short update, it will appear here.';
    var body = '';
    if (e) {
      var title = e.title || ('Week ' + w + ' ' + (live ? 'class recording' : 'instructor update'));
      var access = e.access || 'Check the player or recording page for captions and transcript options.';
      if (e.platform === 'youtube' && /^[A-Za-z0-9_-]{6,20}$/.test(String(e.videoId || e.yt || ''))) {
        var id = String(e.videoId || e.yt);
        body = '<div class="wk-rec-frame"><button type="button" class="wk-rec-play" onclick="SOC.playVideo(this,\'' + esc(id) + '\',\'' + esc(title) + '\')" aria-label="Load ' + esc(title) + '"><b>Play ' + esc(title) + '</b><small>YouTube loads only after you choose to play.</small></button></div>';
      } else if (e.platform === 'zoom' && safeZoomRecordingUrl(e.url)) {
        body = '<a class="wk-rec-link" href="' + esc(safeZoomRecordingUrl(e.url)) + '" target="_blank" rel="noopener">Open ' + esc(title) + ' on Zoom <span aria-hidden="true">&#8599;</span></a>';
      }
      if (body) body += '<div class="wk-rec-meta">' + (e.date ? '<span>Posted ' + esc(e.date) + '</span>' : '') + '<span>' + esc(access) + '</span>' + (e.transcriptUrl ? '<a href="' + esc(e.transcriptUrl) + '" target="_blank" rel="noopener">Open transcript</a>' : '') + '</div>';
      else empty = 'The recording entry needs attention before it can be shown safely. Use a valid YouTube video ID or a Zoom recording link without an embedded passcode.';
    }
    return '<section id="wk-rec" class="wk-rec" aria-labelledby="wk-rec-h"><div class="wk-rec-inner"><div class="wk-rec-kick">' + esc(live ? 'AFTER CLASS' : 'THIS WEEK') + '</div><h2 id="wk-rec-h">' + esc(heading) + '</h2>' + (body || '<p>' + esc(empty) + '</p>') + '</div></section>';
  }
  var KD_MON = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function keyDatesList() {
    return [
      { d: '2026-09-11', it: [['Week 1 live class', 'Course orientation and shared start', 'class'], ['Personal Cartography 1 opens', 'Build this from Weeks 1 to 3', 'open']] },
      { d: '2026-09-18', it: [['Week 2 live class', '', 'class'], ['Two-Eyed Seeing Journal begins', 'weekly, Weeks 2 to 12', 'open']] },
      { d: '2026-09-25', it: [['Week 3 live class', '', 'class']] },
      { d: '2026-10-02', it: [['Week 4 asynchronous learning', 'Independent application of the early foundations', 'async'], ['Personal Cartography 1', 'due in Week 4', 'due'], ['Knowledge in Two Eyes opens', 'Build this from Weeks 4 to 6 and 8', 'open']] },
      { d: '2026-10-09', it: [['Week 5 live class', '', 'class']] },
      { d: '2026-10-16', it: [['Week 6 live class', '', 'class']] },
      { d: '2026-10-23', it: [['Week 7 live class', 'Cumulative review before Study Week', 'class']] },
      { d: '2026-10-26', it: [['Study Week', 'Oct 26 to 30. No class and no new module.', 'support']] },
      { d: '2026-11-06', it: [['Week 8 live class', '', 'class'], ['Knowledge in Two Eyes', 'due in Week 8', 'due'], ['A Question of Reconciliation opens', 'Build this toward Week 12', 'open']] },
      { d: '2026-11-13', it: [['Week 9 live class', '', 'class']] },
      { d: '2026-11-20', it: [['Week 10 live class', '', 'class']] },
      { d: '2026-11-27', it: [['Week 11 asynchronous learning', 'Independent synthesis before the final live class', 'async']] },
      { d: '2026-12-04', it: [['Week 12 live class', 'Final substantive class meeting', 'class'], ['Two-Eyed Seeing Journal', 'final check in Week 12', 'due'], ['A Question of Reconciliation', 'due in Week 12', 'due']] },
      { d: '2026-12-07', it: [['Week 13 asynchronous office hours and supported completion begin', 'No lecture; focused work and consultation', 'async'], ['Revisiting Personal Cartography opens', 'Introduced in Week 13', 'open']] },
      { d: '2026-12-11', it: [['Revisiting Personal Cartography', 'due in Week 13', 'due']] },
      { d: '2026-12-14', it: [['Week 14 asynchronous office hours and course closure', 'No lecture; optional consultation, feedback, and final questions', 'async']] },
      { d: '2026-12-16', it: [['Last day of the term', 'No graded work is due in Week 14', 'support']] }
    ];
  }
  function kdDaysUntil(iso) { try { var t = new Date(); var a = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()); var p = iso.split('-'); return Math.round((Date.UTC(+p[0], +p[1] - 1, +p[2]) - a) / 86400000); } catch (e) { return 999; } }
  function kdMonthDay(iso) { var p = iso.split('-'); return KD_MON[+p[1] - 1] + ' ' + (+p[2]); }
  function deadlineRule() { return '<aside class="deadline-rule" role="note" style="border:1px solid #E7C3BF;border-left:5px solid #DA291C;border-radius:0 11px 11px 0;background:#fff;padding:12px 14px;margin:0 0 16px;color:#15171C"><strong style="color:#961A13">Submission time:</strong> All assignments are due by 11:59 p.m. Eastern Time, EDT or EST as applicable, on the date shown. Blackboard remains the official submission record.</aside>'; }
  function mobileCalendarSubscription() { var code = courseCode(), base = location.protocol + '//' + location.host + location.pathname.replace(/[^\/]*$/, ''), feed = (base + 'calendar/' + code + '_key_dates.ics').replace(/^https?:/i, 'webcal:'); return '<section class="mobile-cal-sub" aria-labelledby="mobile-cal-title"><div class="mono">MOBILE CALENDAR</div><h2 id="mobile-cal-title">Keep these dates on your phone</h2><p>This is a live calendar subscription, not a downloaded copy. Your calendar app can refresh it when the course schedule changes. Blackboard remains the official source.</p><a href="' + esc(feed) + '">Subscribe on this phone <span aria-hidden="true">&#8594;</span></a></section>'; }
  function mobileAccessPanel() { var url = (location.origin + location.pathname).replace(/index\.html$/i, ''); return '<section class="mobile-access-panel" aria-labelledby="mobile-access-title"><div class="mono">PHONE OR TABLET</div><h2 id="mobile-access-title">Use the same site on any device</h2><p>There is no separate app. This responsive site is the mobile version too. Share or copy the link, then open it on your phone or tablet.</p><div><a href="' + esc(url) + '">Open the site link</a><button type="button" onclick="SOC.shareMobileSite()">Share or copy the link</button></div><small>Your saved notes stay on the device and browser where you typed them.</small></section>'; }
  function upcomingParts(e) { var title = String(e.title || ''), note = String(e.note || ''), label = 'Course date', name = title, m; if (e.kind === 'open') { label = 'Assignment released'; m = title.match(/^(.*?)\s+(?:opens|begins)(?:\s+(.*))?$/i); if (m) { name = m[1]; if (!note && m[2]) note = m[2]; } } else if (e.kind === 'due') { label = 'Assignment due'; name = title.replace(/\s+(?:due|close|closes)$/i, ''); note = note.replace(/^due,?\s*/i, ''); } else if (/study week/i.test(title)) label = 'Study Week'; else if (e.kind === 'class') label = 'Live class'; else if (e.kind === 'async') label = 'Asynchronous week'; return { label: label, name: name, note: note, date: kdMonthDay(e.date) }; }
  function upcomingBanner() {
    var rows = keyDatesList(), todayIso = '', entries = [];
    try { var now = new Date(); todayIso = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2); } catch (e) {}
    rows.forEach(function (row) {
      if (todayIso && row.d < todayIso) return;
      (row.it || []).forEach(function (it) { if (entries.length < 10) entries.push({ date: row.d, title: it[0], note: it[1] || '', kind: it[2] || 'event' }); });
    });
    if (!entries.length) return '';
    function item(e, hidden) { var p = upcomingParts(e); return '<span class="upcoming-item upcoming-' + esc(e.kind) + '"' + (hidden ? ' aria-hidden="true"' : '') + '><i aria-hidden="true"></i><b>' + esc(p.label) + ' (' + esc(p.date) + '):</b><span>' + esc(p.name) + (p.note ? ' <small>' + esc(p.note) + '</small>' : '') + '</span></span>'; }
    var first = entries.map(function (e) { return item(e, false); }).join(''), repeat = entries.map(function (e) { return item(e, true); }).join(''), paused = !!state.tickerPaused;
    return '<section class="upcoming-banner' + (paused ? ' paused' : '') + '" aria-label="Coming up in SOC122"><button type="button" class="upcoming-label" onclick="SOC.go(\'calendar\')"><span>Coming up</span><small>Open calendar</small></button><div class="upcoming-window" tabindex="0"><div class="upcoming-track"><div class="upcoming-loop">' + first + '</div><div class="upcoming-loop" aria-hidden="true">' + repeat + '</div></div></div><button type="button" class="upcoming-pause" onclick="SOC.tickerPause()" aria-pressed="' + paused + '">' + (paused ? 'Resume' : 'Pause') + '</button></section>';
  }
  var upcomingReminderFocus = null;
  function showUpcomingReminder() {
    var key = SKEY + '.upcomingReminder.session.v1';
    try { if (sessionStorage.getItem(key) === '1') return; sessionStorage.setItem(key, '1'); } catch (e) {}
    if (document.getElementById('upcoming-reminder')) return;
    var rows = keyDatesList(), todayIso = '', entries = [];
    try { var now = new Date(); todayIso = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2); } catch (e2) {}
    rows.forEach(function (row) { if (todayIso && row.d < todayIso) return; (row.it || []).forEach(function (it) { if (entries.length < 4) entries.push({ date: row.d, title: it[0], note: it[1] || '' }); }); });
    if (!entries.length) return;
    upcomingReminderFocus = document.activeElement;
    var box = document.createElement('div'); box.id = 'upcoming-reminder'; box.className = 'upcoming-reminder'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'upcoming-reminder-title');
    box.innerHTML = '<div class="upcoming-reminder-card"><button type="button" class="upcoming-reminder-close" onclick="SOC.closeUpcomingReminder()" aria-label="Close coming-up reminder">&times;</button><div class="mono">BEFORE YOU BEGIN</div><h2 id="upcoming-reminder-title">Here is what is coming up</h2><ul>' + entries.map(function (e) { var p = upcomingParts(e); return '<li><b>' + esc(p.label) + '<small>(' + esc(p.date) + ')</small></b><span>' + esc(p.name) + (p.note ? ' <small>' + esc(p.note) + '</small>' : '') + '</span></li>'; }).join('') + '</ul><p>The banner at the top of every page stays current. Blackboard remains the official source for announcements and changed dates.</p><div><button type="button" onclick="SOC.closeUpcomingReminder();SOC.go(\'calendar\')">Open full calendar</button><button type="button" class="secondary" onclick="SOC.closeUpcomingReminder()">Continue to the site</button></div></div>';
    document.body.appendChild(box);
    box.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.preventDefault(); SOC.closeUpcomingReminder(); return; } if (e.key !== 'Tab') return; var focusable = box.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])'); if (!focusable.length) return; var first = focusable[0], last = focusable[focusable.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } });
    setTimeout(function () { var b = box.querySelector('.upcoming-reminder-close'); if (b) b.focus(); }, 0);
  }
  function keyDatesRows(cats) { var out = '', mon = ''; keyDatesList().forEach(function (row) { var items = row.it.filter(function (x) { return !cats || cats.indexOf(x[2]) >= 0; }); if (!items.length) return; var p = row.d.split('-'), name = KD_MON[+p[1] - 1]; if (name !== mon) { out += '<div class="kd-mon">' + name + '</div>'; mon = name; } out += '<div class="kd-row"><div class="kd-date"><span class="kd-day">' + (+p[2]) + '</span><span class="kd-mo">' + name.slice(0, 3) + '</span></div><div class="kd-items">' + items.map(function (x) { return '<div class="kd-item kd-' + x[2] + '"><span class="kd-dot"></span><span>' + esc(x[0]) + (x[1] ? ' <em>' + esc(x[1]) + '</em>' : '') + '</span></div>'; }).join('') + '</div></div>'; }); return out; }
  function calEventsByIso() { var map = {}; keyDatesList().forEach(function (r) { var due = r.it.filter(function (x) { return x[2] === 'due'; }), a = r.it.filter(function (x) { return x[2] === 'async'; }), s = r.it.filter(function (x) { return x[2] === 'support'; }), c = r.it.filter(function (x) { return x[2] === 'class'; }), o = r.it.filter(function (x) { return x[2] === 'open'; }); if (due.length) map[r.d] = { kind: 'due', label: due.length > 1 ? due.length + ' assessments due' : due[0][0] + ' due' }; else if (a.length) map[r.d] = { kind: 'async', label: a[0][0] }; else if (s.length) map[r.d] = { kind: 'support', label: s[0][0] }; else if (c.length) map[r.d] = { kind: 'class', label: c[0][0] }; else if (o.length) map[r.d] = { kind: 'open', label: o[0][0] }; }); ['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30'].forEach(function (d) { map[d] = { kind: 'study', label: 'Study Week' }; }); return map; }
  function calMonthGrid(year, m) { var first = new Date(Date.UTC(year, m, 1)).getUTCDay(), days = new Date(Date.UTC(year, m + 1, 0)).getUTCDate(), ev = calEventsByIso(), dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function (x) { return '<div class="cal-dow">' + x + '</div>'; }).join(''), cells = ''; for (var i = 0; i < first; i++) cells += '<div class="cal-cell cal-blank"></div>'; for (var d = 1; d <= days; d++) { var iso = year + '-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + d).slice(-2), e = ev[iso]; cells += '<div class="cal-cell' + (e ? ' cal-' + e.kind : '') + '"><span class="cal-num">' + d + '</span>' + (e ? '<span class="cal-tag">' + esc(e.label) + '</span>' : '') + '</div>'; } return '<div class="cal-month"><div class="cal-mhead">' + KD_MON[m] + ' ' + year + '</div><div class="cal-grid">' + dow + cells + '</div></div>'; }
  function calendarPage() { var grids = [8,9,10,11].map(function (m) { return calMonthGrid(2026, m); }).join(''); return '<div class="rise cal-page"><div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:4px">CALENDAR</div><h1 style="font-size:1.9rem;line-height:1.15;font-weight:600;margin:0 0 8px;color:var(--ink)">Every date and delivery mode that matters</h1><p style="font-size:1rem;line-height:1.6;color:var(--ink-dim);margin:0 0 20px">This calendar keeps due dates and delivery modes clearly apart. Seneca red marks due dates. Black marks live classes. Neutral grey marks every asynchronous week with no lecture, including the office-hour weeks. A light grey outline marks Study Week. Week 4 applies the early foundations independently. Week 11 creates a synthesis point before the final live class. Weeks 13 and 14 protect focused completion, consultation, feedback, and closure. Blackboard remains the official word on dates.</p>' + deadlineRule() + mobileCalendarSubscription() + '<div class="cal-legend"><span class="cal-lg"><span class="cal-sw cal-sw-due"></span>Due date</span><span class="cal-lg"><span class="cal-sw cal-sw-class"></span>Live class</span><span class="cal-lg"><span class="cal-sw cal-sw-async"></span>Asynchronous; no lecture</span><span class="cal-lg"><span class="cal-sw cal-sw-study"></span>Study Week</span><span class="cal-lg"><span class="cal-sw cal-sw-support"></span>Term marker</span></div><div class="cal-grids">' + grids + '</div><section class="node"><h2 class="wk-sec">Assessment dates</h2><div>' + keyDatesRows(['due','open']) + '</div><h2 class="wk-sec" style="margin-top:24px">Class and asynchronous schedule</h2><div>' + keyDatesRows(['class','async','support']) + '</div></section></div>'; }
  function workWeekPage(w) {
    var d = weekData(w) || {};
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var isFinal = (next == null);
    var hero = weekHero(w, d, {
      label: deliveryMode(w).label,
      route: d.activity ? ['Project', 'Reflect', 'Save notes'] : ['Reflect', 'Save notes'],
      startPart: d.activity ? 'do' : 'reflect',
      startLabel: d.activity ? 'Open final project' : 'Start reflection',
      question: 'No new readings or teaching material this week. This time is yours: focus on your work' + (isFinal ? ' and close out the course. Nothing is due.' : '. Your final project is due this week.'),
      time: 'No new material'
    });
    var act = d.activity ? '<section id="wk-do" class="node interactive"><h2 class="wk-sec">' + esc(d.activity.title) + '</h2><div class="wk-whatwhy"><b>What this is:</b> ' + esc(d.activity.what) + '<br><br><b>Why you are doing it:</b> ' + esc(d.activity.why) + '</div><button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">Open your final project' + ic('chevron', 17, 2.4) + '</button></section>' : '';
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Your reflection</h2>'
      + (d.reflectPrompt ? '<p style="margin:0 0 8px;font-size:.95rem">' + esc(d.reflectPrompt) + '</p>' : '')
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
      + '</section>';
    var notes = '<section id="wk-notes" class="node"><h2 class="wk-sec">Generate Your Weekly Notes</h2>'
      + '<div class="wk-savebox" style="margin-top:0"><h3>Your organized Week ' + w + ' record</h3><p style="margin:0 0 6px;font-size:.9rem">This makes one Word file (.docx) on Seneca letterhead, your organized weekly record.</p><button onclick="SOC.saveWeek(' + w + ')" class="wk-save">Generate Your Weekly Notes</button></div></section>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'This week'], ['mode', 'How this week works'], ['rec', 'Instructor update']].concat(d.activity ? [['do', 'Your final project']] : []).concat([['reflect', 'Reflection'], ['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' No new material</div></div></aside>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><section>' + act + reflect + notes + navRow + '</section>' + rail + '</div></div>';
  }
  var OVERVIEW_WEEK = 1;
  function overviewPage(w) {
    var d = weekData(w) || {};
    var ws = journeyWeeks(), idx = ws.indexOf(w), next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var cname = (D.course && (D.course.name || D.course.title)) || weekTitle(w);
    var hero = weekHero(w, d, {
      label: 'COURSE OVERVIEW',
      title: cname,
      question: false,
      route: ['Orient', 'Open Week ' + (next != null ? next : 2), 'Use the tools'],
      startPart: 'how',
      startLabel: 'How this course works',
      time: 'Overview, no readings'
    });
    var how = '<section id="wk-how" class="node"><h2 class="wk-sec">How this course works</h2>'
      + '<p style="margin:0 0 10px;font-size:1rem;line-height:1.6">This is a blended synchronous course. Weeks 1 to 3, 5 to 10, and 12 meet live. Weeks 4 and 11 are independent asynchronous learning weeks. Week 13 is supported asynchronous completion with office hours, and Week 14 is asynchronous course closure with optional consultation and no graded deadline. Every week page names its mode and purpose. Live weeks include a class-recording space; asynchronous weeks may carry a short instructor update. Study Week, October 26 to 30, has no class and no new module. Blackboard remains the official Seneca course platform.</p>'
      + '<p style="margin:0;font-size:1rem;line-height:1.6">This week is your orientation. There are no readings and nothing to submit. When you are ready, begin with Week ' + (next != null ? next : 2) + '.</p></section>';
    var beginRow = (next != null) ? '<div style="margin-top:18px"><button onclick="SOC.station(' + next + ')" style="border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 18px;cursor:pointer;text-align:left;min-width:220px"><div class="mono" style="font-size:.66rem;color:var(--red)">BEGIN &rarr;</div><div style="font-size:.95rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button></div>' : '';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Overview'], ['mode', 'How this week works'], ['rec', 'Class recording'], ['how', 'How this course works']].map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' Overview, no readings</div></div></aside>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><section>' + how + beginRow + '</section>' + rail + '</div></div>';
  }
  var STUDY_WEEK = 7;
  function studyWeekPage(w) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var priors = ws.filter(function (x) { return x < w; });
    var hero = weekHero(w, { time: 'No classes this week' }, {
      label: 'STUDY WEEK',
      title: 'Study Week',
      sub: 'Seneca is open but there are no classes this week (October 26 to 30). There are no new readings, no new content, and nothing is due. Use the week to rest, catch up on anything still open, and let the first half of the course settle.',
      question: 'Nothing here is graded or required. Everything below is optional, and only for your own review.',
      route: priors.length ? ['Rest', 'Review', 'Optional check'] : ['Rest', 'Optional check'],
      startPart: priors.length ? 'catch' : 'kc',
      startLabel: priors.length ? 'Review earlier weeks' : 'Open optional check'
    });
    var catchup = priors.length ? '<section id="wk-catch" class="node"><h2 class="wk-sec">Catch up and review</h2>'
      + '<p style="margin:0 0 12px;font-size:.95rem;color:var(--ink-dim)">If you want to use the week to consolidate, revisit any earlier week. Nothing new to read, only what you have already met.</p>'
      + '<div style="display:flex;flex-wrap:wrap;gap:8px">' + priors.map(function (n) { return '<button onclick="SOC.station(' + n + ')" style="border:1px solid var(--border);background:#fff;border-radius:9px;padding:9px 13px;font-size:.86rem;font-weight:600;color:var(--ink);cursor:pointer;text-align:left">Week ' + n + ': ' + esc(weekTitle(n)) + '</button>'; }).join('') + '</div></section>' : '';
    var kcR = kcSection(w, true);
    var kc = kcR.html, kcItems = kcR.items;
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Study Week']].concat(priors.length ? [['catch', 'Catch up and review']] : []).concat(kcItems.length ? [['kc', 'Knowledge Check']] : []).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' No classes this week</div></div></aside>';
    return '<div class="rise">' + hero + '<div class="wk-grid"><section>' + catchup + kc + navRow + '</section>' + rail + '</div></div>';
  }
  function kcWeekPage(w) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var dt = (typeof weekDate === 'function') ? weekDate(w) : '';
    var hero = weekHero(w, { time: 'Optional review' }, {
      label: 'CUMULATIVE REVIEW',
      title: weekTitle(w) || 'Cumulative Review Week',
      sub: 'There is no new reading this week. It is a chance to look back across everything so far and see where your understanding actually stands. Work through the sets below: Set A and Set B are multiple choice drawn from Weeks 2 to 6, and Set C asks you to apply those ideas. Nothing here counts toward your grade.',
      question: false,
      route: ['Review', 'Check', 'Reflect'],
      startPart: 'kc',
      startLabel: 'Start review'
    });
    var kcR = kcSection(w);
    var kc = kcR.html || '<p style="color:var(--ink-dim);font-size:1rem">The check for this week is being prepared.</p>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:190px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:190px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + kc + navRow + '</div>';
  }
  function weekStation(w) {
    if (w === OVERVIEW_WEEK) return overviewPage(w);
    if (WORK_WEEKS.indexOf(w) >= 0) return workWeekPage(w);
    var d = weekData(w);
    if (d) return weekPage(w, d);
    if ((window.SOC122_KC && (window.SOC122_KC[w] || []).length) && !recordsForWeek(w).length) return kcWeekPage(w);
    var ws = journeyWeeks(), idx = ws.indexOf(w), recs = recordsForWeek(w);
    if (idx < 0 || !recs.length) return '<div style="padding:40px 0;color:var(--ink-dim);font-size:1rem">This week has no readings posted yet. <button onclick="SOC.go(\'journey\')" style="background:none;border:none;color:var(--red);font-weight:600;cursor:pointer">Back to your journey</button></div>';
    var west = null, ind = [];
    recs.forEach(function (r) { if (r.eye === 'western') { west = west || r; } else { ind.push(r); } });
    var hero = weekHero(w, { overview: stationFraming(w, west, ind), time: 'Work at your own pace' }, { label: 'READING WEEK', route: ['Read', 'Practise', 'Reflect'], startPart: 'do', startLabel: 'Use this week' });
    var framing = '';
    var readBlocks = '<div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px">';
    if (west) readBlocks += stationReading(west, 'Start here, the disciplinary view');
    ind.forEach(function (r) { readBlocks += stationReading(r, west ? 'Then, the Indigenous view' : 'Indigenous reading'); });
    readBlocks += '</div>';
    var prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var navRow = '<div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:190px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:190px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    return '<div class="rise">' + hero + framing + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--ink-faint);margin:0 0 12px">WHAT YOU ARE READING</div>' + readBlocks + stationDo(w) + navRow + '</div>';
  }
  function exploreHub() {
    var tiles = [];
    if (D.course && D.course.frame) tiles.push(['Personal Cartography', 'Place each week on a map of scholars, nations, and ideas, and keep your own notes.', 'globe', 'SOC.go(\'map\')']);
    tiles.push(['Self-Check Studio', 'Practise with a week\'s readings and save your work.', 'clipboard', 'SOC.go(\'cards\')']);
    tiles.push(['Compare readings', 'Hold any two readings side by side and see where they meet.', 'columns', 'SOC.go(\'compare\')']);
    tiles.push(['Build reading comprehension', 'Read closely with guided questions, then check yourself.', 'book', 'SOC.go(\'reading\')']);
    var th = tiles.map(function (t) {
      return '<button class="jtile" onclick="' + t[3] + '" style="min-height:172px"><span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:12px;background:#F6E3E1;color:var(--red)">' + ic(t[2], 22) + '</span><h3 style="font-size:1.1875rem;font-weight:600;margin:6px 0 0;color:var(--ink)">' + t[0] + '</h3><p style="font-size:.9rem;line-height:1.55;color:var(--ink-dim);margin:0">' + t[1] + '</p><span style="margin-top:auto;color:var(--red);font-weight:600;font-size:.875rem">Open &rarr;</span></button>';
    }).join('');
    return '<div class="rise"><div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:8px">EXPLORE</div><h1 style="font-size:1.75rem;font-weight:600;margin:0 0 8px;color:var(--ink)">Ways to go deeper</h1><p style="font-size:.9375rem;color:var(--ink-dim);margin:0 0 22px;">Beyond the week-by-week path, here are the hands-on tools. Use them whenever you like.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px">' + th + '</div></div>';
  }

  /* ---------- render ---------- */
  /* ---------- Field Lens: persistent, visible, optional program personalization ---------- */
  function lensParse() {
    var raw = state.careerField || '';
    if (!raw || raw === '__explore') return null;
    if (raw.indexOf('::') >= 0) { var p = raw.split('::'); return { area: p[0], program: p[1], label: p[1] }; }
    return { area: raw, program: null, label: 'All of ' + raw };
  }
  function lensProgramOpts(raw, placeholder) {
    var C = window[(D.course && D.course.code) + '_CAREER'] || {};
    var PROG = window.SENECA_PROGRAMS || null;
    var opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>';
    if (PROG) {
      (C.fields || []).forEach(function (fld) {
        var progs = PROG[fld] || [];
        opts += '<optgroup label="' + esc(fld) + '">';
        opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>All of ' + esc(fld) + '</option>';
        progs.forEach(function (pr) { var v = fld + '::' + pr; opts += '<option value="' + esc(v) + '"' + (raw === v ? ' selected' : '') + '>' + esc(pr) + '</option>'; });
        opts += '</optgroup>';
      });
      opts += '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    } else {
      (C.fields || []).forEach(function (fld) { opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>' + esc(fld) + '</option>'; });
    }
    return opts;
  }
  function lensChip() {
    var C = window[(D.course && D.course.code) + '_CAREER'] || null;
    if (!C) return '';
    var L = lensParse();
    var raw = state.careerField || '';
    var sel = '<select onchange="SOC.careerField(this.value)" aria-label="Choose your program to personalize this course" style="font:inherit;font-size:.82rem;padding:6px 10px;border:1.5px solid var(--border);border-radius:8px;background:#fff;color:var(--ink);max-width:260px">' + lensProgramOpts(raw, L ? 'Change program...' : 'See this course through your program...') + '</select>';
    if (!L) {
      return '<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:16px"><span style="color:var(--red);display:inline-flex">' + ic('globe', 15, 2) + '</span><span style="font-size:.85rem;color:var(--ink-dim);font-weight:500">See this course through your program:</span>' + sel + '</div>';
    }
    return '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:16px;background:#FDF0EE;border:1px solid var(--red);border-radius:12px;padding:8px 8px 8px 14px"><span style="color:var(--red);display:inline-flex">' + ic('globe', 15, 2) + '</span><span style="font-size:.85rem;color:var(--ink);font-weight:500">Viewing as <b>' + esc(L.label) + '</b></span>' + sel + '<button onclick="SOC.lensOff()" aria-label="Turn off program personalization" style="background:#fff;border:1px solid var(--border);border-radius:8px;color:var(--ink-dim);font-size:.8rem;font-weight:600;cursor:pointer;padding:5px 11px">Turn off</button></div>';
  }
  function lensHomeIntro() {
    var L = lensParse();
    if (!L) return '';
    var C = window[(D.course && D.course.code) + '_CAREER'];
    var f = C && C.byField && C.byField[L.area];
    var line = f && (f.lens || (f.paras && f.paras[0]));
    if (!line) return '';
    return '<section class="jfade" style="background:#15171C;color:#fff;border-radius:16px;padding:20px 24px;margin:0 0 24px">'
      + '<div class="mono" style="font-size:.66rem;letter-spacing:.06em;color:#f3b1a8;font-weight:700;margin-bottom:8px">FOR YOUR FIELD &middot; ' + esc(L.label.toUpperCase()) + '</div>'
      + '<p style="margin:0 0 9px;font-size:1.05rem;line-height:1.55;font-weight:500">' + esc(line) + '</p>'
      + '<p style="margin:0;font-size:.8rem;color:#B9BEC8;line-height:1.5">This is a lens on the course. Every student does the same readings and the same assessments. <button onclick="SOC.go(\'career\')" style="background:none;border:none;color:#f3b1a8;font-weight:600;cursor:pointer;padding:0;font-size:.8rem;text-decoration:underline">See the full write-up for your field</button></p>'
      + '</section>';
  }
  function lensCardBadge(w) {
    var L = lensParse();
    if (!L) return '';
    var C = window[(D.course && D.course.code) + '_CAREER'];
    var f = C && C.byField && C.byField[L.area];
    if (f && f.weeks && f.weeks.indexOf(w) >= 0) return '<span class="mono" style="font-size:.6rem;font-weight:700;letter-spacing:.05em;color:var(--red);background:#F6E3E1;padding:2px 8px;border-radius:999px">KEY FOR YOUR FIELD</span>';
    return '';
  }
  function lensCardLine(w) {
    var L = lensParse();
    if (!L) return '';
    var LENS = window[(D.course && D.course.code) + '_LENS'];
    var hook = LENS && LENS.byArea && LENS.byArea[L.area] && LENS.byArea[L.area][String(w)];
    if (!hook) return '';
    return '<div style="display:flex;gap:8px;margin:0 0 9px;padding:8px 11px;background:#FDF0EE;border-radius:9px">'
      + '<span class="mono" style="color:var(--red);flex:none;font-weight:700;font-size:.62rem;letter-spacing:.04em;padding-top:2px">FOR YOUR FIELD</span>'
      + '<span style="font-size:.82rem;line-height:1.5;color:var(--ink)">' + esc(hook) + '</span></div>';
  }
  function lensPracticeLine(L) {
    if (!L) return '';
    var label = L.program || L.area;
    var byArea = {
      "Aviation": "For {program}, put this beside crew culture, passenger service, safety debriefs, remote routes, and the social context around a technical decision.",
      "Business": "For {program}, put this beside customers, teams, markets, hiring, pricing, workplace culture, and the social patterns behind a business decision.",
      "Creative Arts, Animation and Design": "For {program}, put this beside representation, audience belonging, cultural borrowing, client briefs, and the social meaning of images and stories.",
      "Education, Community and Social Services": "For {program}, put this beside family, community, institutions, support systems, cultural safety, and the public patterns behind private struggles.",
      "Engineering Technology": "For {program}, put this beside land, infrastructure, standards, consultation, users, workers, and who carries the cost of a built decision.",
      "Fashion and Esthetics": "For {program}, put this beside beauty standards, body norms, cultural expression, service relationships, and who is treated as the default client.",
      "Health and Wellness": "For {program}, put this beside patients, families, culture, social determinants of health, trust, and the whole person behind a chart.",
      "Hospitality and Tourism": "For {program}, put this beside guests, hosts, cultural expectations, belonging, Indigenous tourism, and who controls the story being shared.",
      "Information Technology": "For {program}, put this beside data, users, communities, access, design defaults, and whose reality the system assumes.",
      "Law, Administration and Public Safety": "For {program}, put this beside law, discretion, records, enforcement, community trust, reconciliation, and the structures behind individual cases.",
      "Liberal Arts and University Transfers": "For {program}, put this beside research, evidence, disciplinary assumptions, seminar debate, and whose knowledge is treated as central.",
      "Media and Communications": "For {program}, put this beside sources, audiences, headlines, framing, platform culture, and who gets to define the public story.",
      "Science": "For {program}, put this beside methods, samples, lab routines, environmental evidence, research ethics, and whose knowledge counts as evidence."
    };
    var template = byArea[L.area] || "For {program}, connect this week to people, communities, institutions, evidence, culture, and the social patterns shaping the field.";
    return template.replace(/\{program\}/g, label);
  }
  function lensChangeLine() {
    return 'What changes: your program filter changes the expanded week hook, field diagram, case study, activity map, home field panel, key-week badges, and Career Choices write-up. What stays the same: readings, assessments, and outcomes.';
  }
  function lensFieldContext(L) {
    var label = (L && (L.program || L.area)) || 'your field';
    var byArea = {
      "Aviation": { place: 'crew debriefs, passenger service, safety data, remote routes, flight operations, and community access', decision: 'a safety judgment, service choice, crew response, or way of reading a situation before blaming a person', people: 'passengers, crew, dispatchers, maintenance teams, northern communities, and people served by air travel', pressure: 'a changed route, weather call, passenger issue, crew handoff, or safety review', setting: 'an airport, aircraft, dispatch desk, security line, or maintenance bay' },
      "Business": { place: 'markets, teams, customer research, hiring, pricing, supply chains, and workplace culture', decision: 'a business claim, research choice, management decision, or way of reading customer and worker lives', people: 'customers, applicants, staff, suppliers, communities, and people affected by the market decision', pressure: 'a missed target, client complaint, hiring decision, cash-flow problem, or team deadline', setting: 'a store, office, client file, sales funnel, HR process, or financial decision' },
      "Creative Arts, Animation and Design": { place: 'stories, images, portfolios, character design, style references, public audiences, and cultural materials', decision: 'a representation choice, source choice, collaboration choice, or way of handling cultural material', people: 'audiences, clients, creators, communities represented, performers, and people left out of the frame', pressure: 'a critique, rejected draft, changing brief, technical failure, or production deadline', setting: 'a studio, editing bay, platform feed, client presentation, or production pipeline' },
      "Education, Community and Social Services": { place: 'classrooms, families, agencies, intake work, support plans, referrals, and community programs', decision: 'a support choice, interpretation of behaviour, referral, or way of reading private trouble as public pattern', people: 'children, families, clients, teachers, frontline workers, and communities around the learner', pressure: 'a difficult placement, crisis call, family meeting, behaviour concern, or referral decision', setting: 'a classroom, agency, intake desk, program meeting, or family support plan' },
      "Engineering Technology": { place: 'land, infrastructure, sites, standards, measurements, consultation, and public systems', decision: 'a design choice, consultation choice, measurement decision, or way of reading social impact', people: 'residents, workers, commuters, inspectors, communities, and people who live with the built result', pressure: 'a failed test, changed site condition, deadline, inspection issue, or team handoff', setting: 'a project site, public space, transport route, utility system, or housing development' },
      "Fashion and Esthetics": { place: 'beauty standards, client care, salons, studios, cultural expression, product ranges, and public image', decision: 'a service choice, representation choice, product choice, or way of reading beauty as cultural rather than universal', people: 'clients, models, stylists, estheticians, communities, and people not centred by default beauty standards', pressure: 'a difficult client service, critique, trend shift, product mismatch, or event deadline', setting: 'a salon, studio, treatment room, runway, retail floor, or client consultation' },
      "Health and Wellness": { place: 'patients, families, care plans, clinics, health records, culture, and social determinants of health', decision: 'a care choice, assessment choice, communication choice, or way of seeing a whole person behind the chart', people: 'patients, families, practitioners, caregivers, communities, and people carrying history into the care setting', pressure: 'a high-stress placement, patient concern, difficult assessment, shift handoff, or care decision', setting: 'a clinic, hospital unit, treatment room, wellness program, or patient chart' },
      "Hospitality and Tourism": { place: 'guest service, cultural expectations, tourism stories, events, bookings, ratings, and community-led experiences', decision: 'a welcome, service recovery, cultural presentation, or way of reading a guest on their own terms', people: 'guests, workers, hosts, families, travellers, communities, and people whose culture is being shared', pressure: 'a difficult guest, busy service, bad review, changed itinerary, or event problem', setting: 'a hotel, restaurant, event, booking desk, tour route, or guest-service counter' },
      "Information Technology": { place: 'data, users, design defaults, platforms, access, support tickets, and communities represented by a system', decision: 'a data choice, design choice, access choice, or way of deciding whose knowledge counts', people: 'users, clients, admins, support staff, communities in the data, and people the design assumes or ignores', pressure: 'a broken build, outage, new requirement, security issue, or support escalation', setting: 'a codebase, help desk, database, deployment pipeline, app screen, or security review' },
      "Law, Administration and Public Safety": { place: 'law, records, case files, discretion, public service, community trust, and reconciliation work', decision: 'a judgment, note, enforcement choice, service response, or way of reading structure around an individual case', people: 'clients, residents, officers, staff, witnesses, communities, and people subject to public authority', pressure: 'a tense interaction, urgent file, policy conflict, client appeal, or public safety decision', setting: 'a counter, case file, dispatch desk, hearing room, patrol context, or public office' },
      "Liberal Arts and University Transfers": { place: 'research, seminar debate, readings, definitions, evidence rules, writing, and disciplinary methods', decision: 'a source choice, definition, research question, or way of deciding what counts as knowledge', people: 'readers, classmates, researchers, communities studied, instructors, and people left out by a discipline', pressure: 'a difficult reading, seminar debate, research pivot, writing block, or transfer decision', setting: 'a seminar, essay, research file, library search, or future discipline' },
      "Media and Communications": { place: 'sources, headlines, story angles, audience data, platform culture, campaigns, and public messaging', decision: 'a frame, edit, source choice, audience choice, or way of deciding who gets heard', people: 'audiences, sources, communities in the story, clients, journalists, and people shaped by the public narrative', pressure: 'a fast deadline, public response, client change, source conflict, or platform issue', setting: 'a newsroom, campaign room, social feed, client brief, podcast, or crisis channel' },
      "Science": { place: 'samples, instruments, lab protocols, field sites, data, research ethics, and peer review', decision: 'a sample choice, method choice, ethics choice, or way of deciding what counts as evidence', people: 'participants, lab teams, researchers, patients, communities, and people affected by scientific claims', pressure: 'a failed trial, lab error, uncertain result, deadline, or protocol change', setting: 'a lab, field site, dataset, protocol, instrument, or research report' }
    };
    var ctx = byArea[L && L.area] || { place: 'people, communities, evidence, institutions, culture, and everyday work in the field', decision: 'a professional judgment, research choice, service response, or way of reading social context', people: 'clients, coworkers, communities, and people affected by the decision', pressure: 'a hard task, deadline, conflict, uncertainty, or public decision', setting: 'a workplace, client file, classroom, project, service, or public institution' };
    ctx.label = label;
    return ctx;
  }
  function lensActivityProfile(w, a, L) {
    var ctx = lensFieldContext(L);
    var code = (D.course && D.course.code) || '';
    var title = a && a.title ? a.title : 'this activity';
    if (code === 'PSY355') {
      return {
        flow: [
          ['Course skill', title],
          ['Field pressure', ctx.pressure],
          ['Recovery move', 'plan, practise, ask, adjust, and try again'],
          ['Who depends on it', ctx.people]
        ],
        use: 'Use the activity as a rehearsal for how you learn under pressure in ' + ctx.label + ': what you try first, what support you use, and how you recover when the first attempt does not work.',
        check: 'The custom question: what would keep your judgment steady in ' + ctx.setting + '?'
      };
    }
    if (code === 'SOC122') {
      return {
        flow: [
          ['Course lens', title],
          ['Field setting', ctx.setting],
          ['People and power', ctx.people],
          ['Respectful action', 'listen, compare perspectives, and let affected communities lead']
        ],
        use: 'Use the activity to translate the course idea into ' + ctx.label + ': who is present, who has power, whose knowledge is trusted, and what respectful action would look like.',
        check: 'The custom question: what would this activity make visible in ' + ctx.setting + '?'
      };
    }
    return {
      flow: [
        ['Course idea', title],
        ['Field system', ctx.place],
        ['Decision point', ctx.decision],
        ['People affected', ctx.people]
      ],
      use: 'Use the activity to test one field decision in ' + ctx.label + ': who benefits, who carries risk, what evidence you would need, and what would make the system more accountable.',
      check: 'The custom question: where could this same pattern appear in ' + ctx.setting + '?'
    };
  }
  function lensActivityBlock(w, a, inScreen) {
    var L = lensParse();
    if (!L || !a) return '';
    var profile = lensActivityProfile(w, a, L);
    var cells = profile.flow.map(function (x, i) {
      return '<div style="border:1px solid var(--border);background:#fff;border-radius:8px;padding:10px 12px;min-height:74px">'
        + '<div class="mono" style="font-size:.6rem;letter-spacing:.05em;color:var(--red);font-weight:700;margin-bottom:5px">STEP ' + (i + 1) + '</div>'
        + '<div style="font-size:.83rem;font-weight:700;color:var(--ink);margin-bottom:4px">' + esc(x[0]) + '</div>'
        + '<div style="font-size:.78rem;line-height:1.35;color:var(--ink-dim)">' + esc(x[1]) + '</div></div>';
    }).join('');
    return '<div style="background:#F7F8FA;border:1px solid var(--border);border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:14px 16px;margin:' + (inScreen ? '0 0 18px' : '14px 0 16px') + '">'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">ACTIVITY MAP FOR ' + esc((L.program || L.area).toUpperCase()) + '</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:10px">' + cells + '</div>'
      + '<p style="margin:0 0 6px;font-size:.9rem;line-height:1.5;color:var(--ink)">' + esc(profile.use) + '</p>'
      + '<p style="margin:0;font-size:.78rem;line-height:1.45;color:var(--ink-dim)">' + esc(profile.check) + ' The activity itself stays the same for everyone.</p></div>';
  }
  function lensProgramFocus(L) {
    var p = ((L && L.program) || '').toLowerCase();
    if (/civil|building|construction/.test(p)) return 'For this program, pay special attention to public infrastructure, site drawings, grading, drainage, accessibility, inspection records, and the people who rely on the built environment every day.';
    if (/fire/.test(p)) return 'For this program, pay special attention to life-safety systems, emergency access, alarms, codes, inspection records, and the people who depend on fast, clear decisions.';
    if (/mechanical|manufacturing|mechatronic|tool|cnc/.test(p)) return 'For this program, pay special attention to tolerances, machine settings, maintenance logs, safety guards, production defaults, and the workers affected by every technical choice.';
    if (/electrical|electronics|energy/.test(p)) return 'For this program, pay special attention to circuits, sensors, controls, power access, failure modes, and who is protected or exposed when a system behaves badly.';
    if (/environment|water|chemical|biotech|bio/.test(p)) return 'For this program, pay special attention to samples, lab thresholds, environmental monitoring, compliance records, and communities affected by technical evidence.';
    if (/computer|software|cyber|informatics|data|programming/.test(p)) return 'For this program, pay special attention to data fields, defaults, permissions, logs, testing, release decisions, and users who cannot see or challenge the system.';
    if (/nursing|health|fitness|therapeutic|pharmacy|optician|veterinary/.test(p)) return 'For this program, pay special attention to assessment tools, patient records, devices, care plans, referrals, and who carries the cost when a screen is wrong.';
    if (/early childhood|social service|child|youth|community|mental health|behaviour/.test(p)) return 'For this program, pay special attention to intake forms, family records, risk notes, referrals, placements, and how families are represented in the file.';
    if (/aviation|flight/.test(p)) return 'For this program, pay special attention to checklists, crew handoffs, dispatch records, screening tools, safety margins, and who can challenge a bad flag.';
    if (/account|finance|business|marketing|human resources|supply|project management/.test(p)) return 'For this program, pay special attention to metrics, dashboards, hiring screens, customer data, approvals, and who gets filtered before a person reviews the case.';
    if (/law|paralegal|police|public safety|security|immigration|court/.test(p)) return 'For this program, pay special attention to case notes, policy thresholds, discretion points, risk tools, records, and appeal paths.';
    if (/journalism|media|communication|public relations|broadcast/.test(p)) return 'For this program, pay special attention to story frames, source choices, platform ranking, audience data, moderation, and who controls the public narrative.';
    if (/animation|design|visual|fashion|esthetic|cosmetic|art/.test(p)) return 'For this program, pay special attention to visual defaults, references, body and skin assumptions, client records, platform tools, and who gets represented well.';
    if (/hospitality|tourism|event|culinary/.test(p)) return 'For this program, pay special attention to booking systems, guest profiles, ratings, staffing, service scripts, and who is welcomed or treated as risk.';
    return 'For this program, pay special attention to the tools, records, standards, clients, and decisions that shape everyday work in the field.';
  }
  function lensTopicFocus(d) {
    var c = d && d.concepts && d.concepts[0] ? d.concepts[0] : null;
    var q = d && d.guiding && d.guiding[0] ? d.guiding[0] : '';
    var r = d && d.readings && d.readings[0] ? d.readings[0] : null;
    return {
      concept: c && c.h ? c.h : (d && d.title ? d.title : 'This week\'s concept'),
      explanation: c && c.body ? c.body : (d && d.purpose ? d.purpose : ''),
      cite: c && c.cite ? c.cite : '',
      question: q,
      reading: r && r.apa ? r.apa : ''
    };
  }
  function lensProgramCaseQuestions(code, L, ctx) {
    var p = ((L && L.program) || '').toLowerCase();
    if (/mental health|behaviour|behavior|social service|child|youth|community|early childhood/.test(p)) {
      return [
        'Which intake field, risk note, referral rule, or placement label would shape how this client is first understood?',
        'What family, culture, disability, housing, trauma, or community context might be flattened by that record?',
        'Who can challenge the risk score or placement recommendation before it follows the client into the next service?',
        'How would you document strengths, consent, and client voice so the file does not become only a deficit story?'
      ];
    }
    if (/civil|building|construction/.test(p)) {
      return [
        'Which drawing, site measurement, code requirement, drainage assumption, or access standard would drive the first design choice?',
        'Who uses this space in ways the default spec might not imagine, including disabled users, shift workers, children, elders, or transit riders?',
        'What field evidence would show that the design works for the people most likely to be overlooked?',
        'Where would you build in a review point before the technical choice becomes concrete, steel, traffic flow, or permanent access?'
      ];
    }
    if (/computer|software|cyber|informatics|data|programming/.test(p)) {
      return [
        'Which data field, permission level, model output, log, test case, or default setting would shape the user experience first?',
        'Which users are missing from the test set, support tickets, access review, or release decision?',
        'How would someone discover, contest, or appeal a wrong system decision?',
        'What evidence would prove that the fix works for the user group most likely to be misread?'
      ];
    }
    if (/nursing|health|fitness|therapeutic|pharmacy|optician|veterinary/.test(p)) {
      return [
        'Which screen, device reading, chart note, referral rule, or care-plan default would shape the first response?',
        'Whose pain, risk, communication style, body, or history might the tool read poorly?',
        'What patient, family, or practitioner evidence should sit beside the score before a decision is made?',
        'How would you create a check-back so a wrong first screen does not become the whole care pathway?'
      ];
    }
    if (/law|paralegal|police|public safety|security|immigration|court/.test(p)) {
      return [
        'Which policy threshold, report field, risk flag, discretion point, or file note would shape the first decision?',
        'Who gets treated as credible, risky, compliant, or suspicious before they can explain their own context?',
        'What appeal path, review step, or documentation practice would let a person challenge the decision?',
        'How would you record uncertainty so the file does not make a contested judgment look final?'
      ];
    }
    if (/account|finance|business|marketing|human resources|supply|project management/.test(p)) {
      return [
        'Which metric, dashboard, hiring screen, credit rule, price model, or approval threshold would drive the decision?',
        'Who is filtered out before a person reviews the case, and what proxy variable might be doing that work?',
        'What human explanation, audit trail, or exception process would make the decision answerable?',
        'How would you test whether the rule rewards the same people it was already built around?'
      ];
    }
    if (/aviation|flight/.test(p)) {
      return [
        'Which checklist, screening tool, dispatch note, maintenance log, weather call, or safety margin would shape the decision?',
        'Who is delayed, flagged, rerouted, or silenced by the procedure when the pressure is high?',
        'What crew, passenger, maintenance, or operations evidence would challenge a bad flag?',
        'Where does the handoff need a second look so safety does not become unequal treatment?'
      ];
    }
    if (/animation|design|visual|fashion|esthetic|cosmetic|art/.test(p)) {
      return [
        'Which reference, visual default, shade range, body assumption, image crop, style guide, or platform tool shapes what looks normal?',
        'Who is represented accurately, who is made invisible, and who is treated as an exception to the design?',
        'What client, audience, model, or community feedback would change the creative decision?',
        'How would you document the choice so representation is part of the work, not a late correction?'
      ];
    }
    if (/hospitality|tourism|event|culinary/.test(p)) {
      return [
        'Which booking rule, guest profile, rating, staffing call, service script, or event plan shapes the first response?',
        'Who is welcomed, who is treated as a risk, and who has trouble getting the same level of service?',
        'What worker, guest, or accessibility evidence should change the service decision?',
        'How would you build a recovery step that fixes the harm without blaming the guest or front-line worker?'
      ];
    }
    if (/journalism|media|communication|public relations|broadcast/.test(p)) {
      return [
        'Which headline, source list, edit, platform rule, audience metric, or campaign frame shapes what the public sees first?',
        'Who becomes credible, who becomes a problem, and who is missing from the story or message?',
        'What source, community review, or audience evidence would complicate the first frame?',
        'How would you revise the message so speed does not flatten people into a single story?'
      ];
    }
    if (/science|environment|water|chemical|biotech|bio/.test(p)) {
      return [
        'Which sample, instrument setting, threshold, lab protocol, model assumption, or compliance record shapes the finding?',
        'Whose data fits the method, whose results are treated as noise, and who lives with the consequence?',
        'What field, lab, participant, or community evidence would test the assumption?',
        'How would you report uncertainty so the method does not hide its limits?'
      ];
    }
    return [
      'Which tool, record, standard, client interaction, or professional judgment would shape the first decision in ' + ctx.label + '?',
      'Who is easiest for that process to see, and who becomes an exception, a delay, or a problem to manage?',
      'What evidence from affected people would change the decision before it becomes routine?',
      'How would you make the decision reviewable by someone who was harmed by it?'
    ];
  }
  function lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w) {
    var label = (L && (L.program || L.area)) || 'your program';
    if (code === 'PSY355') {
      return {
        nodes: [
          ['Week topic', topic.concept],
          ['Program pressure', ctx.pressure],
          ['Learning move', 'notice, practise, ask for feedback, and recover'],
          ['Who depends on it', ctx.people],
          ['Activity test', profile.check.replace(/^The custom question: /, '')]
        ],
        intro: 'Imagine this week\'s psychology concept showing up inside ' + ctx.setting + '. The pressure is ' + ctx.pressure + ', and the professional move is not just knowing the concept. It is noticing how stress, feedback, bias, motivation, memory, or recovery can shape what you do next.',
        concept: 'Use it to ask what the person is experiencing, what support would change the path, and how a small recovery move could prevent a bad first attempt from becoming a fixed story about ability.',
        focus: focus,
        questions: lensProgramCaseQuestions(code, L, ctx),
        lensQuestions: ['What pressure triggers the setback?', 'What support or feedback changes the outcome?', 'What recovery move keeps learning possible?', 'What would you try differently next time?']
      };
    }
    if (code === 'SOC122') {
      return {
        nodes: [
          ['Week topic', topic.concept],
          ['Program setting', ctx.setting],
          ['People and power', ctx.people],
          ['Missing voices', 'who is not in the room, record, source, or decision'],
          ['Respectful action', 'listen, compare perspectives, and let affected communities lead']
        ],
        intro: 'Imagine this week\'s sociology concept showing up inside ' + ctx.setting + '. The issue is not only what happened. It is who is present, who is missing, whose knowledge is trusted, and how the setting teaches people what counts as normal.',
        concept: 'Use it to map people, place, power, representation, and responsibility before you decide what respectful action would look like in ' + label + '.',
        focus: focus,
        questions: lensProgramCaseQuestions(code, L, ctx),
        lensQuestions: ['Who is present and who is missing?', 'Whose knowledge is trusted?', 'What power relationship shapes the setting?', 'What would respectful action look like here?']
      };
    }
    return {
      nodes: [
        ['Week topic', topic.concept],
        ['Program setting', ctx.setting],
        ['Field decision', ctx.decision],
        ['Who feels it', ctx.people],
        ['Activity test', profile.check.replace(/^The custom question: /, '')]
      ],
      intro: 'Imagine this week\'s concept showing up inside ' + ctx.setting + '. The decision is not abstract: it is ' + ctx.decision + '. In ' + label + ', that decision sits inside ' + ctx.place + '.',
      concept: 'Use it to ask who the system sees clearly, who it treats as an exception, and what evidence would show the harm before it becomes normal practice.',
      focus: focus,
      questions: lensProgramCaseQuestions(code, L, ctx),
      lensQuestions: ['Who benefits from the default?', 'Who carries the risk if it fails?', 'What data or testimony is missing?', 'What would accountability look like here?']
    };
  }
  function lensProgramSection(w, d) {
    var L = lensParse();
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var nodes = frame.nodes;
    var label = L.program || L.area;
    var diagram = nodes.map(function (n, i) {
      return '<div style="position:relative;border:1px solid var(--border);background:#fff;border-radius:10px;padding:12px 13px;min-height:92px">'
        + '<div class="mono" style="font-size:.6rem;letter-spacing:.05em;color:var(--red);font-weight:700;margin-bottom:6px">' + esc(n[0].toUpperCase()) + '</div>'
        + '<div style="font-size:.86rem;line-height:1.4;color:var(--ink);font-weight:600">' + esc(n[1]) + '</div>'
        + (i < nodes.length - 1 ? '<div aria-hidden="true" style="position:absolute;right:-14px;top:40%;font-size:1.1rem;color:var(--red);font-weight:700;z-index:2">&rarr;</div>' : '')
        + '</div>';
    }).join('');
    return '<section id="wk-lens" class="node"><h2 class="wk-sec">For your program</h2>'
      + '<p style="margin:0 0 12px;font-size:.95rem;line-height:1.55;color:var(--ink-dim)">This section changes with your selected program. It turns the week\'s topic into a field diagram while keeping the same readings, assessment, and outcomes for everyone.</p>'
      + '<div style="background:#FDF0EE;border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:14px 16px;margin-bottom:14px"><div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">TOPIC-AWARE FIELD DIAGRAM: ' + esc(label.toUpperCase()) + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px">' + diagram + '</div></div>'
      + '</section>';
  }
  function lensCaseStudySection(w, d) {
    var L = lensParse();
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var label = L.program || L.area;
    var qGrid = function (title, questions) {
      return '<div style="margin-top:14px"><div class="mono" style="font-size:.62rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:8px">' + title + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px">'
        + (questions || []).map(function (q) { return '<div style="background:#F7F8FA;border:1px solid var(--border);border-radius:8px;padding:11px 13px;font-size:.86rem;line-height:1.48;color:var(--ink)">' + esc(q) + '</div>'; }).join('')
        + '</div></div>';
    };
    return '<section id="wk-case" class="node"><h2 class="wk-sec">Case study</h2>'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">IN-DEPTH PROGRAM CASE STUDY</div>'
      + '<h3 style="font-size:1.08rem;margin:0 0 8px;color:var(--ink)">' + esc(label + ': a field case for Week ' + w) + '</h3>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">' + esc(frame.intro) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)"><b>' + esc(topic.concept) + '</b>' + (topic.cite ? ' (' + esc(topic.cite) + ')' : '') + ': ' + esc(frame.concept) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">' + esc(frame.focus) + '</p>'
      + '<p style="margin:0 0 10px;line-height:1.62;color:var(--ink)">Work the case in two passes. First, trace the program-specific tool, record, standard, or professional judgment that would shape the decision. Then bring the course concept back in and ask what the case reveals that routine practice might miss.</p>'
      + qGrid('PROGRAM TRACE QUESTIONS', frame.questions)
      + qGrid('COURSE LENS QUESTIONS', frame.lensQuestions)
      + '</section>';
  }
  function lensHookExpansion(w) {
    var L = lensParse();
    var d = weekData(w);
    if (!L || !d) return '';
    var ctx = lensFieldContext(L);
    var topic = lensTopicFocus(d);
    var profile = lensActivityProfile(w, d.activity || {}, L);
    var focus = lensProgramFocus(L);
    var code = (D.course && D.course.code) || '';
    var frame = lensProgramCaseFrame(code, L, ctx, topic, profile, focus, w);
    var label = L.program || L.area;
    var lead = 'Read this week as a field systems check. In ' + label + ', the week matters when ' + ctx.decision + ' becomes a default inside ' + ctx.place + '.';
    if (code === 'PSY355') lead = 'Read this week as a field rehearsal, not a generic psychology unit. In ' + label + ', the week matters when ' + ctx.pressure + ' and the first interpretation of a client, learner, patient, teammate, or system problem starts to shape the response.';
    if (code === 'SOC122') lead = 'Read this week as a field map. In ' + label + ', the week matters when a setting such as ' + ctx.setting + ' hides power relationships, missing voices, or inherited assumptions.';
    var cells = frame.questions.slice(0, 3).map(function (q) {
      return '<div style="background:#fff;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font-size:.82rem;line-height:1.42;color:var(--ink)">' + esc(q) + '</div>';
    }).join('');
    return '<div style="margin-top:11px;padding-top:11px;border-top:1px solid rgba(177,23,34,.18)">'
      + '<div class="mono" style="font-size:.6rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:6px">READ IT THROUGH ' + esc(label.toUpperCase()) + '</div>'
      + '<p style="margin:0 0 8px;font-size:.9rem;line-height:1.55;color:var(--ink)">' + esc(lead) + '</p>'
      + '<p style="margin:0 0 9px;font-size:.88rem;line-height:1.55;color:var(--ink-dim)">Carry the week\'s concept, ' + esc(topic.concept) + ', into the concrete tools, records, people, and pressures of the program. The goal is to notice where the course idea would change what you ask, document, design, recommend, or challenge.</p>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px">' + cells + '</div>'
      + '</div>';
  }
  function lensHook(w) {
    var L = lensParse();
    if (!L) return '';
    var LENS = window[(D.course && D.course.code) + '_LENS'];
    if (!LENS || !LENS.byArea || !LENS.byArea[L.area]) return '';
    var hook = LENS.byArea[L.area][String(w)];
    if (!hook) return '';
    var practice = lensPracticeLine(L);
    var expanded = lensHookExpansion(w);
    return '<div style="background:#FDF0EE;border-left:3px solid var(--red);border-radius:0 10px 10px 0;padding:12px 16px;margin:0 0 18px">'
      + '<div class="mono" style="font-size:.64rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:5px">FOR YOUR FIELD &middot; ' + esc(L.label.toUpperCase()) + '</div>'
      + '<p style="margin:0;font-size:.97rem;line-height:1.6;color:var(--ink)">' + esc(hook) + '</p>'
      + (practice ? '<p style="margin:8px 0 0;font-size:.92rem;line-height:1.55;color:var(--ink)">' + esc(practice) + '</p>' : '')
      + expanded
      + '<div style="margin-top:9px;font-size:.76rem;line-height:1.45;color:var(--ink-dim)">' + esc(lensChangeLine()) + '</div>'
      + '</div>';
  }
  function pathwaysPage() {
    var steps = [
      ['Prepare', 'Every week', 'Open the week page, read the delivery label, and choose one guiding question.'],
      ['Meet or work independently', 'Follow the week label', 'Live weeks use discussion. Asynchronous weeks use the complete week page for independent application or synthesis.'],
      ['Return', 'After the main work', 'Complete the activity, reflection, and private checks that help you consolidate the ideas.'],
      ['Save', 'Keep your record', 'Generate your weekly notes so your thinking does not remain only in the browser.'],
      ['Carry forward', 'Build the cartography', 'Use the strongest weekly notes and journal entries in the Personal Cartography sequence.']
    ];
    var route = '<section class="path-route path-sync"><div class="path-route-head"><div class="mono">BLENDED SYNCHRONOUS COURSE</div><h2>One course rhythm with purposeful mode changes</h2><p>Most weeks meet live. Weeks 4 and 11 are independent asynchronous learning. Week 13 protects supported completion, and Week 14 provides asynchronous closure and optional consultation.</p></div><ol>' + steps.map(function (s, i) { return '<li><span>' + (i + 1) + '</span><div><b>' + esc(s[0]) + '</b><em>' + esc(s[1]) + '</em><p>' + esc(s[2]) + '</p></div></li>'; }).join('') + '</ol></section>';
    return '<div class="rise path-page">'
      + '<section class="path-hero"><div><div class="mono">COURSE RHYTHM</div><h1>Prepare, meet or work independently, reflect, and carry it forward</h1><p>SOC122 uses live discussion and four purposeful asynchronous weeks. The delivery label on every week page tells you exactly how that week works.</p></div><div class="path-compass" aria-label="SOC122 weekly rhythm"><span>PREPARE</span><b>read and orient</b><i></i><span>REFLECT</span><b>connect both ways of seeing</b></div></section>'
      + '<section class="path-summary"><div><b>Live weeks build shared meaning</b><span>Bring one question and use discussion to test what each reading helps you see.</span></div><div><b>Async weeks have a purpose</b><span>Week 4 applies, Week 11 synthesizes, Week 13 supports completion, and Week 14 closes the course.</span></div><div><b>The cartography is the spine</b><span>Weekly notes and journal entries build the record used in the final sequence.</span></div></section>'
      + '<div class="path-routes">' + route + '</div>'
      + '<section class="path-close"><h2>Start with the current week</h2><p>Open the week, check its delivery label and purpose, then follow the route on that page. Blackboard holds graded submissions.</p><div class="path-actions"><button type="button" onclick="SOC.station(1)"><b>Open the weekly journey</b><small>See the mode and weekly route.</small></button><button type="button" onclick="SOC.go(\'calendar\')"><b>Calendar and Due Dates</b><small>See delivery modes and deadlines.</small></button><button type="button" onclick="SOC.careerChoices()"><b>Career Choices</b><small>Connect the course to your path.</small></button><button type="button" onclick="SOC.go(\'assignments\')"><b>Starting Your Assignment</b><small>Plan the graded work.</small></button></div></section>'
      + '</div>';
  }
  function assignmentIntegrityNotice() {
    var rows = [
      ['Instructor contact first', 'If there is an academic-integrity concern, the instructor contacts you and names the specific issue before any formal report is submitted.'],
      ['Your response matters', 'The first step is information gathering. You have a chance to explain your process, disclosure, sources, and assignment choices.'],
      ['Blackboard records', 'Blackboard Activity Log evidence may be reviewed. A Progress report is not enough by itself and needs the Activity Log with it.']
    ];
    return deadlineRule() + '<section class="path-summary integrity-note" aria-label="Academic integrity process">' + rows.map(function (r) {
      return '<div><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></div>';
    }).join('') + '</section>';
  }
  function assignmentsPage() {
    var items = [
      ['Personal Cartography sequence', 'Course spine', 'Use the weekly rooms to build the map slowly instead of trying to invent it at the end.'],
      ['Two-Eyed Seeing Journal', 'Recurring work', 'Keep each entry grounded in the named source and in respectful, attributed language.'],
      ['Knowledge in Two Eyes', 'Reading and evidence practice', 'Use comparison, reading practice, and flashcards before writing.'],
      ['A Question of Reconciliation', 'Later-term application', 'Connect course concepts to responsibility without speaking for a community.'],
      ['Final project integration', 'Week 13 window', 'Bring the whole course map together with Blackboard as the official submission point.']
    ];
    var steps = items.map(function (x, i) { return '<li><span>' + (i + 1) + '</span><div><b>' + esc(x[0]) + '</b><em>' + esc(x[1]) + '</em><p>' + esc(x[2]) + '</p></div></li>'; }).join('');
    return '<div class="rise path-page"><section class="path-hero"><div><div class="mono">STARTING YOUR ASSIGNMENT</div><h1>Use the site to prepare, then submit in Blackboard</h1><p>This page gives you the standard starting pattern: find the official assignment in Blackboard, use this site to gather concepts and evidence, then write and submit the final work yourself.</p></div><div class="path-compass"><span>SITE</span><b>practice, notes, evidence</b><i></i><span>BLACKBOARD</span><b>official brief, dropbox, grade</b></div></section><section class="path-summary"><div><b>Blackboard is official</b><span>Due dates, dropboxes, rubrics, feedback, and grades stay in Blackboard.</span></div><div><b>Use weekly notes</b><span>Generate notes from the weeks that feed the assignment before drafting.</span></div><div><b>Keep the course lens visible</b><span>Name the source, the course concept, the limit, and the responsibility question.</span></div></section>' + assignmentIntegrityNotice() + '<section class="path-route"><div class="path-route-head"><div class="mono">ASSIGNMENT ROUTE</div><h2>Start from the active SOC122 package</h2><p>Use this as a planning map only. Always check Blackboard for the complete instructions before submitting.</p></div><ol>' + steps + '</ol></section><section class="path-close"><h2>Start with the week that feeds the work</h2><p>Open the relevant weekly room, generate your notes, then come back to this assignment map when you are ready to draft.</p><div class="path-actions"><button type="button" onclick="SOC.station(4)"><b>Week 4</b><small>Cartography start.</small></button><button type="button" onclick="SOC.station(8)"><b>Week 8</b><small>Identity and relation.</small></button><button type="button" onclick="SOC.station(12)"><b>Week 12</b><small>Responsibility question.</small></button><button type="button" onclick="SOC.station(13)"><b>Week 13</b><small>Final project integration.</small></button></div></section></div>';
  }
  function scholarMedia() {
    var out = [];
    function add(r, source, kind) {
      if (!source) return;
      var isYouTube = !!source.yt;
      var mediaId = String(source.yt || source.platform || source.kind || kind || 'media').replace(/[^A-Za-z0-9_-]/g, '');
      out.push({ key: r.id + '|' + mediaId, week: r.week, kind: source.kind || kind || (isYouTube ? 'Video' : 'Podcast'), title: source.title || r.title, scholar: source.scholar || r.authors, source: source.channel || source.source || (isYouTube ? 'YouTube' : 'Source site'), platform: source.platform || (isYouTube ? 'youtube' : 'source'), id: source.yt || '', embed: source.embed === false ? false : isYouTube, url: source.url || (isYouTube ? 'https://www.youtube.com/watch?v=' + source.yt : readUrl(r)), synopsis: r.coreIdea || r.abstract || 'Use this media item as an on-ramp into the assigned reading.', watchFor: [r.coreIdea || 'The central claim of the source', 'Where the media helps you enter the reading', 'What still needs evidence from the assigned text'], readNext: 'Then return to Week ' + r.week + ' and read the assigned source for evidence.', fieldPrompt: mediaFieldPrompt(r.week) });
    }
    D.records.forEach(function (r) { add(r, r.video, 'Video'); add(r, r.audio, 'Podcast'); });
    return out.sort(function (a, b) { return (a.week - b.week) || a.scholar.localeCompare(b.scholar); });
  }
  function mediaFieldPrompt(w) {
    var L = lensParse();
    if (!L) return '';
    var ctx = lensFieldContext(L);
    return 'For ' + (L.program || L.area) + ', use this media item to notice one social pattern in ' + ctx.place + '. Then return to the reading and name the course idea that explains it.';
  }
  function mediaWeekOptions(items) {
    var weeks = [];
    items.forEach(function (v) { if (weeks.indexOf(v.week) < 0) weeks.push(v.week); });
    weeks.sort(function (a, b) { return a - b; });
    return '<div class="vid-tabs" role="group" aria-label="Filter scholar media by week"><button type="button" onclick="SOC.videoWeek(\'all\')" class="' + (state.videoWeek === 'all' ? 'on' : '') + '">All weeks</button>' + weeks.map(function (w) { return '<button type="button" onclick="SOC.videoWeek(' + w + ')" class="' + (String(state.videoWeek) === String(w) ? 'on' : '') + '">Week ' + w + '</button>'; }).join('') + '</div>';
  }
  function mediaKindOptions(items) {
    var kinds = [];
    items.forEach(function (v) { var k = String(v.kind || 'Media'); if (kinds.indexOf(k) < 0) kinds.push(k); });
    return '<div class="vid-tabs vid-kind-tabs" role="group" aria-label="Filter scholar media by type"><button type="button" onclick="SOC.mediaKind(\'all\')" class="' + (state.mediaKind === 'all' ? 'on' : '') + '">All media</button>' + kinds.map(function (k) { return '<button type="button" onclick="SOC.mediaKind(\'' + esc(k) + '\')" class="' + (String(state.mediaKind) === k ? 'on' : '') + '">' + esc(k) + '</button>'; }).join('') + '</div>';
  }
  function videoEmbed(v) {
    if (v.platform === 'youtube' && v.embed) return '<button type="button" class="vid-load" onclick="SOC.playVideo(this,\'' + esc(v.id) + '\')" aria-label="Load video: ' + esc(v.title + ' - ' + v.scholar) + '"><span>' + esc(v.kind || 'Video') + '</span><b>Load official player</b><small>Loads YouTube only after you choose to play it.</small></button>';
    return '<a class="vid-linkout" href="' + esc(v.url) + '" target="_blank" rel="noopener"><span>' + esc(v.kind || 'Media') + '</span><b>Open on source site</b><small>Playback stays with the official source. Nothing is downloaded or rehosted here.</small></a>';
  }
  function videoCard(v) {
    var note = state.mediaNotes && state.mediaNotes[v.key] ? state.mediaNotes[v.key] : '';
    return '<article class="vid-card"><div class="vid-frame">' + videoEmbed(v) + '</div><div class="vid-copy"><div class="mono">WEEK ' + v.week + ' &middot; ' + esc(v.kind || 'Media') + ' &middot; ' + esc(v.source) + '</div><h2>' + esc(v.title) + '</h2><h3>' + esc(v.scholar) + '</h3><p>' + esc(v.synopsis) + '</p><div class="vid-watch"><b>Watch for</b><ul>' + v.watchFor.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div><div class="vid-read"><b>Then read</b><span>' + esc(v.readNext) + '</span></div>' + (v.fieldPrompt ? '<div class="vid-field"><b>Use it in your program</b><span>' + esc(v.fieldPrompt) + '</span></div>' : '') + '<label class="vid-note"><b>Reading Rescue note</b><span>After the media, write one sentence you can prove from the reading.</span><textarea oninput="SOC.mediaNote(\'' + esc(v.key) + '\',this.value)" placeholder="One evidence-backed sentence...">' + esc(note) + '</textarea></label><a href="' + esc(v.url) + '" target="_blank" rel="noopener">Open source page <span aria-hidden="true">&#8599;</span></a></div></article>';
  }
  function walkPad(w) { return (w < 10 ? '0' : '') + w; }
  function walkFig(w, idx) {
    var d = weekData(w);
    if (!d || !d.deck) return null;
    var code = (D.course && D.course.code) || '';
    var man = (typeof window !== 'undefined' && window[code + '_WALKFIGS']) || {};
    var list = man[w] || man[String(w)];
    if (!list || !list[idx]) return null;
    return 'walkthroughs/' + d.deck + '/images/' + list[idx];
  }
  function walkTheme() { var r = rlState(); return r.walkTheme === 'light' ? 'light' : 'dark'; }
  function walkSlides(w) {
    var d = weekData(w);
    if (!d) return [];
    var s = [];
    s.push({ kind: 'cover', title: weekTitle(w), question: (d.guiding && d.guiding[0]) || journeyQ(w), lead: firstSentence(d.overview || '') });
    try { var _cc = (typeof courseCode === 'function') ? courseCode() : ''; var _HOLO = _cc && (typeof window !== 'undefined') && window[_cc + '_HOLO']; if (_HOLO && _HOLO.supports && typeof visualSpec === 'function') { var _vs = visualSpec(w, d); if (_vs && _HOLO.supports(_vs.kind)) s.push({ kind: 'model', week: w }); } } catch (e) {}
    (d.concepts || []).forEach(function (c, ci) {
      s.push({ kind: 'concept', h: c.h, body: c.body, cite: c.cite });
      var fig = walkFig(w, ci);
      if (fig) s.push({ kind: 'figure', src: fig, h: c.h });
    });
    if (d.terms && d.terms.length) s.push({ kind: 'terms', items: d.terms.slice(0, 4) });
    if (d.guiding && d.guiding.length > 1) s.push({ kind: 'questions', items: d.guiding.slice(0, 4) });
    s.push({ kind: 'close', youcan: (d.youcan || []).slice(0, 3), reflect: d.reflectPrompt || '' });
    return s;
  }
  var _walk = null;
  function walkSlideHtml(s, w) {
    if (s.kind === 'cover') {
      return '<div class="walk-kicker">WEEK ' + w + ' WALKTHROUGH</div>'
        + '<h2 class="walk-title">' + esc(s.title) + '</h2>'
        + (s.lead ? '<p class="walk-lead">' + esc(s.lead) + '</p>' : '')
        + '<div class="walk-q"><span>The question this week</span><b>' + esc(s.question) + '</b></div>';
    }
    if (s.kind === 'concept') {
      return '<div class="walk-kicker">KEY IDEA</div><h2 class="walk-h">' + esc(s.h) + '</h2>'
        + '<p class="walk-body">' + esc(s.body) + '</p>'
        + (s.cite ? '<div class="walk-cite">' + esc(s.cite) + '</div>' : '');
    }
    if (s.kind === 'figure') {
      return '<div class="walk-figwrap">'
        + '<div class="walk-figtext">'
        + '<div class="walk-kicker">THE DIAGRAM</div>'
        + '<h2 class="walk-fighead">' + esc(s.h) + '</h2>'
        + '<p class="walk-figcap">A visual map of this idea. Follow how each part connects.</p>'
        + '</div>'
        + '<div class="walk-figview"><img class="walk-figimg" src="' + esc(s.src) + '" alt="Diagram for ' + esc(s.h) + '" onerror="var f=this.closest(&quot;.walk-figwrap&quot;);if(f){var v=f.querySelector(&quot;.walk-figview&quot;);if(v)v.innerHTML=&quot;<p class=walk-fignote>The diagram could not load.</p>&quot;;}"></div>'
        + '</div>';
    }
    if (s.kind === 'model') {
      var md = weekData(s.week);
      var sp = visualSpec(s.week, md);
      var vw = visualViewFor(s.week, 'overview');
      var mt = esc(sp.title || weekTitle(s.week));
      return '<div class="walk-figwrap">'
        + '<div class="walk-figtext">'
        + '<div class="walk-kicker">EXAMINE IN 3D</div>'
        + '<h2 class="walk-fighead">' + mt + '</h2>'
        + '<p class="walk-figcap">A 3D model of the core idea for this week. Drag the scene to turn it, and use the buttons to zoom or reset.</p>'
        + '</div>'
        + '<div class="walk-figview walk-modelview"><div class="wk-model-shell walk-modelshell">'
        + '<canvas class="wk-model-canvas" role="img" aria-label="Interactive 3D model for ' + mt + '" data-topic-model="overview" data-week="' + s.week + '" data-kind="' + esc(sp.kind || 'pipeline') + '" data-view="' + esc(vw) + '"></canvas>'
        + '<div class="wk-cam-ctl" role="group" aria-label="3D view controls">'
        + '<button type="button" onclick="return SOC.camCtl(event,\'spin\',-1)" aria-label="Rotate left">&#8634;</button>'
        + '<button type="button" onclick="return SOC.camCtl(event,\'spin\',1)" aria-label="Rotate right">&#8635;</button>'
        + '<button type="button" onclick="return SOC.camCtl(event,\'zoom\',1)" aria-label="Zoom in">+</button>'
        + '<button type="button" onclick="return SOC.camCtl(event,\'zoom\',-1)" aria-label="Zoom out">&#8722;</button>'
        + '<button type="button" onclick="return SOC.camCtl(event,\'reset\')" aria-label="Reset the view">Reset</button>'
        + '</div></div></div>';
    }
    if (s.kind === 'terms') {
      return '<div class="walk-kicker">THE WORDS TO KNOW</div><div class="walk-terms">'
        + s.items.map(function (t) { return '<div class="walk-term"><div class="walk-term-h">' + esc(t.term) + '</div><div class="walk-term-d">' + esc(t.def) + (t.cite ? ' <i>(' + esc(t.cite) + ')</i>' : '') + '</div></div>'; }).join('')
        + '</div>';
    }
    if (s.kind === 'questions') {
      return '<div class="walk-kicker">CARRY THESE QUESTIONS</div><ul class="walk-qlist">' + s.items.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>';
    }
    return '<div class="walk-kicker">YOU CAN NOW</div><ul class="walk-can">' + (s.youcan || []).map(function (y) { return '<li>' + esc(y) + '</li>'; }).join('') + '</ul>'
      + (s.reflect ? '<div class="walk-reflect"><span>Then reflect</span><p>' + esc(s.reflect) + '</p></div>' : '')
      + '<button type="button" class="walk-cta" onclick="SOC.walkGoWeek()">Open Week ' + _walk.week + ' in full</button>';
  }
  function walkFigApply() {
    if (!_walk) return;
    var img = document.querySelector('.walk-figimg');
    if (img && _walk.fig) img.style.transform = 'translate(' + _walk.fig.tx + 'px,' + _walk.fig.ty + 'px) scale(' + _walk.fig.scale + ') rotate(' + _walk.fig.rot + 'deg)';
  }
  function walkFigWire() {
    var view = document.querySelector('.walk-figview'), img = document.querySelector('.walk-figimg');
    if (!view || !img) return;
    _walk.fig = { scale: 1, rot: 0, tx: 0, ty: 0 };
    var drag = null;
    view.addEventListener('pointerdown', function (e) { drag = { x: e.clientX - _walk.fig.tx, y: e.clientY - _walk.fig.ty }; try { view.setPointerCapture(e.pointerId); } catch (er) {} view.style.cursor = 'grabbing'; });
    view.addEventListener('pointermove', function (e) { if (!drag) return; _walk.fig.tx = e.clientX - drag.x; _walk.fig.ty = e.clientY - drag.y; walkFigApply(); });
    view.addEventListener('pointerup', function () { drag = null; view.style.cursor = 'grab'; });
    view.addEventListener('wheel', function (e) { e.preventDefault(); _walk.fig.scale = Math.max(0.4, Math.min(6, _walk.fig.scale * (e.deltaY < 0 ? 1.12 : 0.89))); walkFigApply(); }, { passive: false });
  }
  function walkMount() {
    var ov = document.getElementById('walk-overlay');
    if (!ov || !_walk) return;
    var slides = _walk.slides, i = Math.max(0, Math.min(slides.length - 1, _walk.i)), s = slides[i];
    ov.className = 'walk-' + walkTheme();
    var dots = slides.map(function (_, k) { return '<button type="button" class="walk-dot' + (k === i ? ' on' : '') + '" onclick="SOC.walkGoto(' + k + ')" aria-label="Slide ' + (k + 1) + '"></button>'; }).join('');
    ov.innerHTML = '<button type="button" class="walk-theme" onclick="SOC.walkTheme()" aria-label="Switch background between light and dark">' + (walkTheme() === 'dark' ? 'Light background' : 'Dark background') + '</button>'
      + '<button type="button" class="walk-close" onclick="SOC.walkClose()" aria-label="Close the walkthrough">' + ic('x', 20) + '</button>'
      + '<div class="walk-stage"><div class="walk-slide wkslide-' + s.kind + '" key="' + i + '">' + walkSlideHtml(s, _walk.week) + '</div></div>'
      + '<div class="walk-bar"><button type="button" class="walk-prev" onclick="SOC.walkNav(-1)"' + (i === 0 ? ' disabled' : '') + ' aria-label="Previous slide">' + ic('chevron', 20, 2.4) + '</button>'
      + '<div class="walk-dots">' + dots + '</div><div class="walk-count">' + (i + 1) + ' / ' + slides.length + '</div>'
      + '<button type="button" class="walk-next" onclick="SOC.walkNav(1)"' + (i === slides.length - 1 ? ' disabled' : '') + ' aria-label="Next slide">' + ic('chevron', 20, 2.4) + '</button></div>';
    if (s.kind === 'model') { try { initTopicModels(); } catch (e) {} }
    try { sessionStorage.setItem(WKKEY, JSON.stringify({ w: _walk.week, i: _walk.i })); } catch (e) {}
  }
  function walkKey(e) {
    if (!_walk) return;
    if (e.key === 'Escape') { e.preventDefault(); SOC.walkClose(); }
    else if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); SOC.walkNav(1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); SOC.walkNav(-1); }
  }
  function walkOpen(w) {
    walkCloseDom();
    var slides = walkSlides(w);
    if (!slides.length) return;
    _walk = { week: w, i: 0, slides: slides, fig: null };
    var ov = document.createElement('div');
    ov.id = 'walk-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Week ' + w + ' walkthrough'); ov.tabIndex = -1;
    document.body.appendChild(ov);
    walkMount();
    ov.focus();
    document.addEventListener('keydown', walkKey, true);
  }
  function walkCloseDom() {
    var ov = document.getElementById('walk-overlay');
    if (ov) ov.remove();
    document.removeEventListener('keydown', walkKey, true);
    try { sessionStorage.removeItem(WKKEY); } catch (e) {}
  }
  function walkthroughsPage() {
    var ws = [];
    for (var w = 1; w <= 14; w++) { var d = weekData(w); if (d && d.deck) ws.push({ w: w, deck: d.deck }); }
    var cards = ws.map(function (it) {
      return '<article class="vid-card" style="padding:0"><div style="padding:18px 20px">'
        + '<div class="mono" style="font-size:.7rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:6px">WEEK ' + it.w + '</div>'
        + '<h2 style="font-size:1.0625rem;margin:0 0 4px;color:#15171C">' + esc(weekTitle(it.w)) + '</h2>'
        + '<p style="font-size:.875rem;color:#474C57;margin:0 0 14px">A short slide walkthrough of this week\'s core idea, built to step through at your own pace.</p>'
        + '<div style="display:flex;gap:9px;flex-wrap:wrap">'
        + '<button type="button" class="wk-cta" style="margin:0" onclick="SOC.playWalk(' + it.w + ')">Play the walkthrough</button>'
        + '<button type="button" onclick="SOC.station(' + it.w + ')" style="border:1px solid #DEE3EA;background:#fff;color:#1B2A4A;border-radius:9px;font-size:.85rem;font-weight:600;padding:8px 14px;cursor:pointer">Go to Week ' + it.w + '</button>'
        + '</div></div></article>';
    }).join('');
    return '<div class="rise vid-page">'
      + '<section class="vid-hero"><div class="mono">SLIDE WALKTHROUGHS</div><h1>Weekly Walkthroughs</h1><p>Each week has a short set of slides that walks through its core idea. Open one to step through it right here, then jump straight into that week. The walkthroughs support the readings; they do not replace them.</p></section>'
      + (cards ? '<section class="vid-grid" aria-label="Weekly walkthrough decks">' + cards + '</section>' : '<p class="vid-empty">Walkthroughs are being prepared.</p>')
      + '</div>';
  }
  function videosPage() {
    var items = scholarMedia();
    var filter = state.videoWeek || 'all';
    var kindFilter = state.mediaKind || 'all';
    var shown = items.filter(function (v) { return (filter === 'all' || String(v.week) === String(filter)) && (kindFilter === 'all' || String(v.kind) === String(kindFilter)); });
    var L = lensParse();
    var field = L ? '<section class="vid-field-hero"><div><div class="mono">PROGRAM LENS IS ON</div><h2>' + esc(L.program || L.area) + '</h2><p>Each card now includes a field prompt. Use it to turn the media item into a concrete question about your future work, then return to the reading for evidence.</p></div><button type="button" onclick="SOC.go(\'career\')">Review my field notes</button></section>' : '';
    return '<div class="rise vid-page"><section class="vid-hero"><div class="mono">CURATED SCHOLAR MEDIA</div><h1>Scholar Media Gallery</h1><p>Use these videos and podcasts as on-ramps into the readings, not replacements for them. Each card tells you what the item explains, what to watch or listen for, and which reading move to make next.</p></section><section class="vid-rule"><div><b>Watch or listen, then read</b><span>The media gives you a way in. Your assignments still need concepts and evidence from the readings.</span></div><div><b>Official sources only</b><span>Embeddable videos use official platform players. Podcasts and restricted media link out to the source site.</span></div><div><b>Use the program lens</b><span>If you choose a program, each card adds a field prompt without changing the required work.</span></div></section>' + field + mediaWeekOptions(items) + mediaKindOptions(items) + '<section class="vid-grid" aria-label="Scholar media cards">' + shown.map(videoCard).join('') + '</section>' + (shown.length ? '' : '<p class="vid-empty">No media items are currently curated for that filter.</p>') + '</div>';
  }
  function homeBar() {
    return '<div class="page-return-row" aria-label="Page navigation"><button type="button" onclick="SOC.prev()">&#8592; Return to Previous Screen</button><button type="button" onclick="SOC.go(\'journey\')">Home</button></div>';
  }
  function backBar() {
    return homeBar();
  }
  function mobileJumpItem(label, action, primary) {
    return '<button type="button" class="' + (primary ? 'primary' : '') + '" onclick="' + action + '">' + esc(label) + '</button>';
  }
  function mobileWeekActions(w, d) {
    d = d || {};
    var items = [
      mobileJumpItem('Menu', 'SOC.openNav()', true),
      mobileJumpItem('Home', "SOC.go('journey')", false)
    ];
    if (d.activity) items.push(mobileJumpItem('Activity', "SOC.jumpWeek(" + w + ",'do')", false));
    items.push(mobileJumpItem('Reflect', "SOC.jumpWeek(" + w + ",'reflect')", false));
    items.push(mobileJumpItem('Notes', "SOC.jumpWeek(" + w + ",'notes')", false));
    return '<nav class="soc-mobile-jump" aria-label="Mobile week shortcuts">' + items.join('') + '</nav>';
  }
  function mobileActivityActions(w) {
    var items = [
      mobileJumpItem('Menu', 'SOC.openNav()', true),
      mobileJumpItem('Week ' + w, 'SOC.station(' + w + ')', false),
      mobileJumpItem('Home', "SOC.go('journey')", false),
      mobileJumpItem('Reflect', "SOC.jumpWeek(" + w + ",'reflect')", false),
      mobileJumpItem('Notes', "SOC.jumpWeek(" + w + ",'notes')", false)
    ];
    return '<nav class="soc-mobile-jump" aria-label="Mobile activity shortcuts">' + items.join('') + '</nav>';
  }
  function body() {
    if (state.screen === 'journey' || state.screen === 'library') return journeyHome();
    if (state.screen === 'station') { var _sw = state.stationWeek || currentJourneyWeek(); return homeBar() + mobileWeekActions(_sw, weekData(_sw)) + lensHook(_sw) + weekStation(_sw); }
    if (state.screen === 'explore') return homeBar() + exploreHub();
    if (state.screen === 'detail') return homeBar() + detail();
    if (state.screen === 'pathways') return homeBar() + pathwaysPage();
    if (state.screen === 'site') return homeBar() + siteInfoPage();
    if (state.screen === 'calendar') return homeBar() + calendarPage();
    if (state.screen === 'walkthroughs') return homeBar() + walkthroughsPage();
    if (state.screen === 'videos') return homeBar() + videosPage();
    if (state.screen === 'readings') return homeBar() + readingsGallery();
    if (state.screen === 'compare') return homeBar() + compare();
    if (state.screen === 'reading') return homeBar() + readingComp();
    if (state.screen === 'glossary') return homeBar() + glossaryScreen();
    if (state.screen === 'cards') return homeBar() + cardsScreen();
    if (state.screen === 'assignments') return homeBar() + assignmentsPage();
    if (state.screen === 'career') return homeBar() + careerScreen();
    if (state.screen === 'activity') { var _aw = state.activityReturn || state.stationWeek || currentJourneyWeek(); return backBar() + mobileActivityActions(_aw) + activityScreen(); }
    if (state.screen === 'map' && D.course && D.course.frame) return homeBar() + mapScreen();
    return journeyHome();
  }
  function careerScreen() {
    var C = window[(D.course && D.course.code) + '_CAREER'] || null;
    if (!C) return '<div class="rise career-page"><section class="career-empty"><h2>Career Choices is being prepared.</h2><p>This section is not ready yet.</p></section></div>';
    var raw = state.careerField || '', area = raw, program = null;
    if (raw.indexOf('::') >= 0) { var parts = raw.split('::'); area = parts[0]; program = parts[1]; }
    var PROG = window.SENECA_PROGRAMS || null;
    var opts;
    if (PROG) {
      opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>';
      (C.fields || []).forEach(function (fld) {
        var progs = PROG[fld] || [];
        opts += '<optgroup label="' + esc(fld) + '">';
        opts += '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>All of ' + esc(fld) + '</option>';
        progs.forEach(function (pr) { var v = fld + '::' + pr; opts += '<option value="' + esc(v) + '"' + (raw === v ? ' selected' : '') + '>' + esc(pr) + '</option>'; });
        opts += '</optgroup>';
      });
      opts += '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    } else {
      opts = '<option value=""' + (!raw ? ' selected' : '') + '>General stream / no program</option>'
        + (C.fields || []).map(function (fld) { return '<option value="' + esc(fld) + '"' + (raw === fld ? ' selected' : '') + '>' + esc(fld) + '</option>'; }).join('')
        + '<option value="__explore"' + (raw === '__explore' ? ' selected' : '') + '>Still exploring / undecided</option>';
    }
    var selected = raw ? (program || area || 'Selected lens') : 'No program lens selected yet';
    var picker = '<aside class="career-picker"><label for="career-sel">Choose your program lens</label><select id="career-sel" onchange="SOC.careerField(this.value)" aria-label="Select your program or field of study">' + opts + '</select><p>Current lens: <b>' + esc(selected) + '</b>. You can change this any time. The assignments stay the same.</p></aside>';
    var hero = '<section class="career-hero"><div><div class="mono">CAREER CHOICES</div><h1>Read SOC122 through your future work</h1><p>' + esc(C.intro || 'Choose a program lens to connect the course to your field.') + ' The lens does not change the required course. It changes the examples, prompts, and field questions that help the course feel closer to your world.</p></div>' + picker + '</section>';
    var impact = '<section id="career-choices" class="career-impact" aria-label="What the program lens changes"><div><b>Weekly field hooks</b><span>The weekly page points to examples that feel closer to your program or field.</span></div><div><b>Stronger assignment choices</b><span>You get help finding social patterns and examples that fit the assignment prompt.</span></div><div><b>Same grading standard</b><span>Your work is still assessed on the same SOC122 expectations as everyone else.</span></div></section>';
    var wrap = function (inner) { return '<div class="rise career-page">' + hero + impact + inner + '</div>'; };
    var card = function (k, h, inner, tint) {
      return '<div class="career-box"' + (tint ? ' style="background:' + tint + '"' : '') + '><div class="mono">' + esc(k) + '</div><h3 style="font-size:1.05rem;line-height:1.25;font-weight:800;color:var(--ink);margin:0 0 9px">' + esc(h) + '</h3>' + inner + '</div>';
    };
    var list = function (items) { return '<ul>' + (items || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; };
    if (!raw) return wrap('<section id="career-main" class="career-field"><div class="mono">GENERAL STREAM</div><h2>Start general, or choose a lens now</h2>'
      + card('GENERAL STREAM', 'Use the course without choosing a program', '<p style="margin:0;font-size:1rem;line-height:1.65;color:var(--ink)">Stay with the general stream if you are undecided or if you want the standard SOC122 path. You will still practise the main course moves: reading social patterns, using evidence carefully, noticing institutions, respecting different ways of knowing, and asking how family, culture, power, and community shape people.</p>', '#F7F8FA')
      + card('HOW TO USE IT', 'Keep the question simple', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">As you move through the weeks, ask: what social pattern is shaping this situation? You can answer that question in any field, even before you know where you are headed.</p>') + '</section>');
    if (raw === '__explore') return wrap('<section id="career-main" class="career-field"><div class="mono">STILL EXPLORING</div><h2>You do not need a final career plan to use SOC122</h2>'
      + card('STILL EXPLORING', 'You do not need a final career plan to use SOC122', '<p style="margin:0;font-size:1rem;line-height:1.65;color:var(--ink)">Use the course as a way to learn how people, families, communities, and institutions shape one another. That kind of noticing transfers into any program you choose later.</p>', '#F7F8FA')
      + card('TRY THIS', 'Read each week as a social map', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">When an activity asks you to analyse a situation, imagine a real classroom, workplace, clinic, service counter, courtroom, aircraft, lab, media platform, or community setting. The point is not to guess your future. It is to practise seeing social context.</p>') + '</section>');
    var f = (C.byField || {})[area];
    if (!f) return wrap('<section id="career-main" class="career-empty"><h2>This lens is being prepared</h2><p>The write-up for ' + esc(area) + ' is being prepared.</p></section>');
    var L = { area: area, program: program, label: program || ('All of ' + area) };
    var ctx = lensFieldContext(L);
    var pnote = program && (C.byProgram || {})[program];
    var out = '<section id="career-main" class="career-field"><div class="mono">YOUR SELECTED FIELD</div><h2>' + esc(program || area) + '</h2>';
    out += card('SECTION 1', 'Program context', '<p style="margin:0 0 10px;font-size:1rem;line-height:1.65;color:var(--ink)">' + esc(pnote || ('You are looking at ' + (program || area) + ' through the larger ' + area + ' area. Use this page to connect course ideas to the people, communities, institutions, evidence, and relationships that shape everyday work in this field.')) + '</p>'
      + '<div class="career-mini-grid">'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Where to look</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.place) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Social questions</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.decision) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">People in the picture</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.people) + '</span></div></div>', '#F7F8FA');
    if (f.lens) out += '<div class="career-lens"><div class="mono">READ THE COURSE THIS WAY</div><p>' + esc(f.lens) + '</p></div>';
    out += card('SECTION 2', 'How SOC122 connects', '<p style="margin:0 0 10px;font-size:.97rem;line-height:1.65;color:var(--ink)">' + esc((f.paras && f.paras[0]) || '') + '</p>' + (f.skills && f.skills.length ? list(f.skills) : ''));
    out += card('SECTION 3', 'How to use this in the course', '<p style="margin:0 0 10px;font-size:.97rem;line-height:1.65;color:var(--ink)">Do not use this page to speak for a community or to replace the readings. Use your program to make the social science concrete. The course question stays the same: what social pattern, institution, relationship, or way of knowing is shaping the situation?</p>'
      + list(['Name one real setting from ' + (program || area) + '.', 'Connect it to a SOC122 idea such as sociological imagination, culture, family, research methods, stratification, identity, or Two-Eyed Seeing.', 'Use respectful language. If a community is involved, do not claim to know what that community needs unless the evidence comes from that community.']));
    if (f.scenario) out += card('FIELD SCENARIO', 'Picture the idea in motion', '<p style="margin:0;font-size:.97rem;line-height:1.65;color:var(--ink)">' + esc(f.scenario) + '</p>', '#FBF4F3');
    if (f.weeks && f.weeks.length) {
      var wl = f.weeks.map(function (w) { return '<button onclick="SOC.station(' + w + ')" style="border:1px solid var(--border);background:#fff;border-radius:8px;padding:7px 13px;font-size:.85rem;font-weight:600;color:var(--ink);margin:0 8px 0 0;cursor:pointer">Week ' + w + ' &#8594;</button>'; }).join('');
      out += card('KEY WEEKS', 'Start with these weeks', (f.weeksWhy ? '<p style="margin:0 0 9px;font-size:.95rem;line-height:1.6;color:var(--ink)">' + esc(f.weeksWhy) + '</p>' : '') + '<div class="career-week-buttons">' + wl + '</div>');
    }
    if (f.roles && f.roles.length) out += card('WHERE THIS SHOWS UP', 'Possible roles and settings', '<p style="margin:0;font-size:.95rem;line-height:1.6;color:var(--ink)">' + f.roles.map(esc).join(' | ') + '</p>');
    var rk = 'career|' + (program || area), rv = esc((state.careerReflect && state.careerReflect[rk]) || '');
    out += '<div class="career-note"><h3 style="margin:10px 0 4px;font-size:1.02rem">What do you want to remember?</h3><p class="wk-hint" style="margin-bottom:8px">A quick note to yourself, saved in this browser on this device. Nothing is submitted, and it will be here when you come back in this browser. Use Generate Your Weekly Notes to keep a permanent copy.</p>'
      + '<textarea oninput="SOC.careerReflect(\'' + rk + '\',this.value)" aria-label="Your reflection" class="wk-ta" placeholder="One place I can already picture this showing up in my field...">' + rv + '</textarea></div></section>';
    return wrap(out);
  }
  var __fromPop = false, __lastNavKey = null, __pushed = false;
  function navKey() {
    return [state.screen, state.stationWeek, state.journeyWeek, state.detailId, state.cardWeek, state.activeWeek, state.galWeek, state.galTopic, state.assignmentTab, state.assignmentFaq, state.rcReading, state.showSynthesis ? 1 : 0, (state.compareIds || []).length].join('~');
  }
  function navHistorySync() {
    if (__fromPop) return;
    var k = navKey();
    try {
      if (__lastNavKey === null) history.replaceState(viewSnapshot(), '');
      else if (k !== __lastNavKey) { history.pushState(viewSnapshot(), ''); __pushed = true; }
    } catch (e) {}
    __lastNavKey = k;
  }
  function render() {
    if (state.screen !== 'compare' && render._prev !== undefined && render._prev !== state.screen && (state.compareIds.length || state.showSynthesis)) { state.compareIds = []; state.showSynthesis = false; }
    render._prev = state.screen;
    var toast = state.toast ? '<div role="status" style="position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:80;background:#15171C;color:#fff;font-size:.9375rem;font-weight:500;padding:12px 20px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.24);display:flex;align-items:center;gap:10px"><span style="display:flex;color:#F2A900">' + ic('check', 16, 2.2) + '</span>' + esc(state.toast) + '</div>' : '';
    document.getElementById('app').innerHTML =
      '<div style="min-height:100vh;display:flex;flex-direction:column;background:#F7F8FA">' + header()
      + (state.navOpen ? '<button class="soc-mobile-scrim" onclick="SOC.closeNav()" aria-label="Close course navigation"></button>' : '')
      + '<div style="display:flex;flex:1;min-height:0">' + sidebar()
      + '<main id="soc-main" tabindex="-1" class="scrollarea" style="flex:1;min-width:0;overflow:auto;height:calc(100vh - 62px)"><div style="margin:0 auto;padding:30px 30px 110px">' + (['journey','library','station','videos'].indexOf(state.screen) >= 0 ? lensChip() : '') + upcomingBanner() + body() + siteFooter() + '</div></main>'
      + '</div>' + readerLensOverlay() + rlPanelOverlay() + listenOverlay() + toast + '</div>';
    if (refocusSearch) {
      var el = document.getElementById('soc-search');
      if (el) { el.focus(); var v = el.value; el.setSelectionRange(v.length, v.length); }
      refocusSearch = false;
    }
    if (focusTarget) {
      var ft = document.getElementById(focusTarget);
      if (ft) { if (!ft.hasAttribute('tabindex')) ft.setAttribute('tabindex', '-1'); ft.focus(); }
      focusTarget = null;
    }
    var ann = screenAnnounceText();
    if (ann && render._announced !== ann) {
      render._announced = ann;
      document.title = ann + ' | ' + (courseCode() || 'Course') + ' Companion';
      var lr = document.getElementById('soc-live');
      if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = 'Loaded ' + ann; }, 30); }
    }
    if (state.screen === 'map' && D.course && D.course.frame) ensureLeaflet(initCartography);
    saveView();
    wkEnhanceSections();
    setTimeout(showUpcomingReminder, 80);
    navHistorySync();
  }
  function topScroll() { var m = document.getElementById('soc-main'); if (m) m.scrollTop = 0; }
  function renderKeepScroll() {
    var m = document.getElementById('soc-main'), y = m ? m.scrollTop : 0;
    render();
    var m2 = document.getElementById('soc-main');
    if (m2) m2.scrollTop = y;
  }
  function scrollWeekPart(part) {
    if (!part) { topScroll(); return; }
    setTimeout(function () {
      try { wkExpandFor('wk-' + part); } catch (e) {}
      var el = document.getElementById('wk-' + part);
      var m = document.getElementById('soc-main');
      if (el && m) m.scrollTop = Math.max(0, el.offsetTop - 10);
      else if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' });
    }, 20);
  }
  function scrollToId(id) {
    setTimeout(function () {
      var el = document.getElementById(id);
      var m = document.getElementById('soc-main');
      if (el && m) m.scrollTop = Math.max(0, el.offsetTop - 12);
      else if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start' });
    }, 20);
  }
  function viewSnapshot() {
    return {
      screen: state.screen,
      journeyWeek: state.journeyWeek,
      stationWeek: state.stationWeek,
      activityReturn: state.activityReturn,
      detailId: state.detailId,
      cardWeek: state.cardWeek,
      activeTypes: (state.activeTypes || []).slice(),
      activeWeek: state.activeWeek,
      search: state.search || '',
      savedView: !!state.savedView,
      rcReading: state.rcReading,
      lens: state.lens || 'thematic',
      compareIds: (state.compareIds || []).slice(),
      showSynthesis: !!state.showSynthesis,
      galWeek: state.galWeek,
      galTopic: state.galTopic,
      glossWeek: state.glossWeek || 'all',
      glossSearch: state.glossSearch || '',
      mapLayer: state.mapLayer || 'admin',
      mapRegion: state.mapRegion || 'mikmaki-lawrence',
      act: state.act || {},
      videoWeek: state.videoWeek || 'all',
      mediaKind: state.mediaKind || 'all'
    };
  }
  function sameView(a, b) {
    try { return JSON.stringify(a || {}) === JSON.stringify(b || {}); } catch (e) { return false; }
  }
  function rememberPrevious() {
    var v = viewSnapshot();
    if (!state.prevView || !sameView(v, state.prevView)) state.prevView = v;
  }
  function restoreView(v) {
    v = v || { screen: 'journey' };
    state.screen = cleanScreen(v.screen);
    state.journeyWeek = cleanWeek(v.journeyWeek);
    state.stationWeek = cleanWeek(v.stationWeek);
    state.activityReturn = cleanWeek(v.activityReturn);
    state.detailId = v.detailId || null;
    state.cardWeek = cleanWeek(v.cardWeek);
    state.activeTypes = Array.isArray(v.activeTypes) ? v.activeTypes.slice() : [];
    state.activeWeek = cleanWeek(v.activeWeek);
    state.search = v.search || '';
    state.savedView = !!v.savedView;
    state.rcReading = v.rcReading || null;
    state.lens = v.lens || 'thematic';
    state.compareIds = Array.isArray(v.compareIds) ? v.compareIds.slice() : [];
    state.showSynthesis = !!v.showSynthesis;
    state.galWeek = cleanWeek(v.galWeek);
    state.galTopic = v.galTopic || null;
    state.glossWeek = v.glossWeek || 'all';
    state.glossSearch = v.glossSearch || '';
    state.mapLayer = v.mapLayer || 'admin';
    state.mapRegion = v.mapRegion || 'mikmaki-lawrence';
    state.act = (v.act && typeof v.act === 'object') ? v.act : (state.act || {});
    state.videoWeek = v.videoWeek || 'all';
    state.mediaKind = v.mediaKind || 'all';
    state.navOpen = false;
  }
  function goPrevious() {
    if (__pushed) { try { history.back(); return; } catch (e) {} }
    var current = viewSnapshot();
    var prev = state.prevView;
    if (prev && prev.screen && !sameView(prev, current)) {
      restoreView(prev);
      state.prevView = current;
    } else if (state.activityReturn != null) {
      restoreView({ screen: 'station', stationWeek: state.activityReturn, journeyWeek: state.activityReturn });
      state.prevView = current;
    } else {
      restoreView({ screen: 'journey' });
      state.prevView = current;
    }
    persist();
    focusTarget = 'soc-main';
    render();
    topScroll();
  }

  /* ---------- actions ---------- */
  function flash(msg) { clearTimeout(toastTimer); var lr = document.getElementById('soc-live'); if (lr) { lr.textContent = ''; setTimeout(function () { lr.textContent = msg; }, 30); } state.toast = msg; render(); toastTimer = setTimeout(function () { state.toast = null; render(); }, 2200); }
  /* ---- real .docx (OOXML, dependency-free) ---- */
  var DX_FONT = 'IBM Plex Sans';
  var DX_BODY_SIZE = 22;
  function dxEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]; }); }
  function dxRun(text, opt) { opt = opt || {}; var size = opt.size || DX_BODY_SIZE; var rpr = '<w:rPr>'; if (opt.bold) rpr += '<w:b/>'; if (opt.italic) rpr += '<w:i/>'; if (opt.color) rpr += '<w:color w:val="' + opt.color + '"/>'; rpr += '<w:sz w:val="' + size + '"/><w:szCs w:val="' + size + '"/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '" w:cs="' + DX_FONT + '"/></w:rPr>'; var parts = String(text == null ? '' : text).split('\n'), t = ''; for (var i = 0; i < parts.length; i++) { if (i > 0) t += '<w:br/>'; t += '<w:t xml:space="preserve">' + dxEsc(parts[i]) + '</w:t>'; } return '<w:r>' + rpr + t + '</w:r>'; }
  function dxPara(runsXml, opt) { opt = opt || {}; var ppr = '<w:pPr>'; if (opt.style) ppr += '<w:pStyle w:val="' + opt.style + '"/>'; if (opt.keep) ppr += '<w:keepNext/><w:keepLines/>'; if (opt.align) ppr += '<w:jc w:val="' + opt.align + '"/>'; ppr += '<w:spacing w:before="' + (opt.before || 0) + '" w:after="' + (opt.after || 120) + '" w:line="300" w:lineRule="auto"/>'; if (opt.border) ppr += '<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="6" w:color="DEE3EA"/></w:pBdr>'; ppr += '</w:pPr>'; return '<w:p>' + ppr + runsXml + '</w:p>'; }
  function dxLogoRun(rid, id, cx, cy) { return '<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="' + cx + '" cy="' + cy + '"/><wp:docPr id="' + id + '" name="Seneca logo"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="' + (id + 1) + '" name="seneca-logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="' + rid + '"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + cx + '" cy="' + cy + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>'; }
  function dxLogoPara(rid) { return dxPara(dxLogoRun(rid, 1, 1760000, 360000), { align: 'left', after: 180 }); }
  function dxTc(inner, opt) { opt = opt || {}; var props = '<w:tcPr>'; if (opt.w) props += '<w:tcW w:w="' + opt.w + '" w:type="dxa"/>'; if (opt.shade) props += '<w:shd w:fill="' + opt.shade + '"/>'; props += '<w:tcMar><w:top w:w="110" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar></w:tcPr>'; return '<w:tc>' + props + inner + '</w:tc>'; }
  function dxCellText(text, opt) { opt = opt || {}; return dxPara(dxRun(text, { bold: opt.bold, color: opt.color || '15171C', size: opt.size || DX_BODY_SIZE }), { after: opt.after == null ? 60 : opt.after }); }
  function dxTable(rows, opt) { opt = opt || {}; var out = '<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="6" w:color="DEE3EA"/><w:left w:val="single" w:sz="6" w:color="DEE3EA"/><w:bottom w:val="single" w:sz="6" w:color="DEE3EA"/><w:right w:val="single" w:sz="6" w:color="DEE3EA"/><w:insideH w:val="single" w:sz="4" w:color="DEE3EA"/><w:insideV w:val="single" w:sz="4" w:color="DEE3EA"/></w:tblBorders></w:tblPr>'; rows.forEach(function (row, ri) { out += '<w:tr><w:trPr><w:cantSplit/>' + (ri === 0 && opt.header ? '<w:tblHeader/>' : '') + '</w:trPr>'; row.forEach(function (cell) { var obj = (cell && typeof cell === 'object') ? cell : { text: cell }; var shade = obj.shade || (ri === 0 && opt.header ? '1B2A4A' : null); var color = obj.color || (ri === 0 && opt.header ? 'FFFFFF' : '15171C'); out += dxTc(dxCellText(obj.text || '', { bold: obj.bold || (ri === 0 && opt.header), color: color }), { shade: shade, w: obj.w || opt.w }); }); out += '</w:tr>'; }); return out + '</w:tbl>'; }
  function dxList(items) { return (items || []).map(function (item) { return dxPara(dxRun(String(item || ''), { color: '15171C' }), { after: 50 }); }).join(''); }
  function dxHeaderXml() { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">' + dxPara(dxLogoRun('rIdLogoHeader', 10, 1320000, 270000), { align: 'right', after: 40 }) + '</w:hdr>'; }
  function dxFooterXml(label) { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:top w:val="single" w:sz="4" w:space="6" w:color="DEE3EA"/></w:pBdr></w:pPr>' + dxRun(label + ' | Page ', { color: '474C57', size: 20 }) + '<w:fldSimple w:instr="PAGE"><w:r><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple>' + dxRun(' of ', { color: '474C57', size: 20 }) + '<w:fldSimple w:instr="NUMPAGES"><w:r><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="20"/></w:rPr><w:t>1</w:t></w:r></w:fldSimple></w:p></w:ftr>'; }
  function dxDoc(course, title, subLines, sections) { var body = ''; body += dxLogoPara('rIdLogo'); body += dxPara(dxRun('SENECA POLYTECHNIC | ' + course, { bold: true, color: 'DA291C', size: 20 }), { after: 40, keep: true }); body += dxPara(dxRun(title, { bold: true, color: '15171C', size: 32 }), { style: 'Title', after: 60, keep: true }); (subLines || []).forEach(function (line, i) { body += dxPara(dxRun(line, { color: '474C57' }), { after: (i === subLines.length - 1 ? 160 : 40), border: (i === subLines.length - 1) }); }); (sections || []).forEach(function (sec) { body += dxPara(dxRun(sec.h, { bold: true, color: 'DA291C', size: 26 }), { style: 'Heading1', before: 170, after: 60, keep: true }); if (sec.type === 'table') body += dxTable(sec.rows || [], { header: true }); else if (sec.type === 'list') body += dxList(sec.items || []); else if (sec.t !== undefined && sec.t !== null) { var t = (String(sec.t).trim()) ? sec.t : '(not written yet)'; body += dxPara(dxRun(t, { color: '15171C' }), { after: 80 }); } }); return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><w:body>' + body + '<w:sectPr><w:headerReference w:type="default" r:id="rIdHeader"/><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>'; }
  function dxStylesXml() { return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '" w:cs="' + DX_FONT + '"/><w:sz w:val="' + DX_BODY_SIZE + '"/><w:szCs w:val="' + DX_BODY_SIZE + '"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="32"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/></w:pPr><w:rPr><w:b/><w:color w:val="DA291C"/><w:rFonts w:ascii="' + DX_FONT + '" w:hAnsi="' + DX_FONT + '"/><w:sz w:val="26"/></w:rPr></w:style></w:styles>'; }
  function dxCoreXml(course, title) { var now = new Date().toISOString(); var docTitle = title ? ((course && String(title).indexOf(course) !== 0) ? course + ' ' + title : title) : (course || 'Seneca Document'); return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>' + dxEsc(docTitle) + '</dc:title><dc:creator>Raymond Peart</dc:creator><cp:lastModifiedBy>Raymond Peart</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">' + now + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + now + '</dcterms:modified></cp:coreProperties>'; }
  var DX_CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>';
  var DX_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>';
  var DX_DOC_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/seneca-logo.png"/><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>';
  var DX_HEADER_RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdLogoHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/seneca-logo.png"/></Relationships>';
  var dxCrcT = null;
  function dxCrc(bytes) { if (!dxCrcT) { dxCrcT = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); dxCrcT[n] = c >>> 0; } } var crc = 0xFFFFFFFF; for (var i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ dxCrcT[(crc ^ bytes[i]) & 0xFF]; return (crc ^ 0xFFFFFFFF) >>> 0; }
  function dxCat(arrs) { var len = 0, i; for (i = 0; i < arrs.length; i++) len += arrs[i].length; var out = new Uint8Array(len), off = 0; for (i = 0; i < arrs.length; i++) { out.set(arrs[i], off); off += arrs[i].length; } return out; }
  function dxU16(n) { return new Uint8Array([n & 255, (n >> 8) & 255]); }
  function dxU32(n) { return new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]); }
  function dxZip(files) { var enc = new TextEncoder(); var chunks = [], central = [], offset = 0; files.forEach(function (f) { var nameB = enc.encode(f.name); var data = (f.data instanceof Uint8Array) ? f.data : enc.encode(f.data); var crc = dxCrc(data), size = data.length; var lfh = dxCat([dxU32(0x04034b50), dxU16(20), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(crc), dxU32(size), dxU32(size), dxU16(nameB.length), dxU16(0), nameB, data]); chunks.push(lfh); central.push(dxCat([dxU32(0x02014b50), dxU16(20), dxU16(20), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(crc), dxU32(size), dxU32(size), dxU16(nameB.length), dxU16(0), dxU16(0), dxU16(0), dxU16(0), dxU32(0), dxU32(offset), nameB])); offset += lfh.length; }); var centralB = dxCat(central); var eocd = dxCat([dxU32(0x06054b50), dxU16(0), dxU16(0), dxU16(files.length), dxU16(files.length), dxU32(centralB.length), dxU32(offset), dxU16(0)]); return dxCat([dxCat(chunks), centralB, eocd]); }
  function senecaDoc(course, title, subLines, sections, fn) {
    return fetch('./seneca-logo.png').then(function (r) {
      if (!r.ok) throw new Error('Seneca logo could not be loaded.');
      return r.arrayBuffer();
    }).then(function (buf) {
      var logoBytes = new Uint8Array(buf);
      var bytes = dxZip([
        { name: '[Content_Types].xml', data: DX_CT },
        { name: '_rels/.rels', data: DX_RELS },
        { name: 'docProps/core.xml', data: dxCoreXml(course, title) },
        { name: 'word/_rels/document.xml.rels', data: DX_DOC_RELS },
        { name: 'word/_rels/header1.xml.rels', data: DX_HEADER_RELS },
        { name: 'word/media/seneca-logo.png', data: logoBytes },
        { name: 'word/styles.xml', data: dxStylesXml() },
        { name: 'word/header1.xml', data: dxHeaderXml() },
        { name: 'word/footer1.xml', data: dxFooterXml(title) },
        { name: 'word/document.xml', data: dxDoc(course, title, subLines, sections) }
      ]);
      var blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = fn + '.docx';
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href);
      flash('Saved to your device as a Seneca branded document.');
    }).catch(function () {
      flash('Export stopped: the Seneca logo could not be embedded.');
    });
  }
  window.SOC = {
    openNav: function () { state.navOpen = true; renderKeepScroll(); },
    toggleNav: function () { state.navOpen = !state.navOpen; renderKeepScroll(); },
    closeNav: function () { state.navOpen = false; renderKeepScroll(); },
    wkColl: function (id) {
      var nowColl = wkOpenHas(id);
      wkOpenSet(id, nowColl ? false : true);
      persist();
      var sec = document.getElementById(id);
      if (sec) {
        sec.classList.toggle('wk-collapsed', nowColl);
        var b = sec.querySelector('.wk-coll-btn');
        if (b) {
          b.setAttribute('aria-expanded', String(!nowColl));
          b.setAttribute('aria-label', nowColl ? 'Show this section' : 'Hide this section');
          b.textContent = nowColl ? '+' : '\u2212';
        }
      }
      if (!nowColl) { wkCapEnforce(id); persist(); }
      announce(nowColl ? 'Section hidden. The heading stays so you can bring it back.' : 'Section shown.');
    },
    wkCollAll: function (w, mode) {
      var secs = document.querySelectorAll('#soc-main section[id^="wk-"]');
      Array.prototype.forEach.call(secs, function (sec) {
        if (sec.id === 'wk-ov' || !sec.querySelector('h2.wk-sec')) return;
        wkOpenSet(sec.id, mode ? false : true);
      });
      persist();
      renderKeepScroll();
      announce(mode ? 'All sections collapsed to their headings.' : 'All sections expanded.');
    },
    nameSave: function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      var el = document.getElementById('sc-name');
      var v = el ? String(el.value || '').replace(/[<>&"]/g, '').trim().slice(0, 40) : '';
      if (!v) { announce('Type a name first, or skip this. It is optional.'); return false; }
      state.studentName = v;
      persist();
      render();
      announce('Saved. Your name stays in this browser only.');
      return false;
    },
    nameClear: function () {
      state.studentName = '';
      persist();
      render();
      announce('Name removed.');
    },
    toggleReaderLens: function () {
      state.readerLensOpen = !state.readerLensOpen;
      if (state.readerLensOpen) state.rlPanelOpen = false;
      rlDockWire(state.readerLensOpen);
      renderKeepScroll();
      announce(state.readerLensOpen ? 'Magnifier on. Text under your pointer or keyboard focus appears in large print at the bottom of the screen.' : 'Magnifier off.');
    },
    clearMyWork: function () {
      if (!window.confirm('Remove all notes, check answers, and settings saved by this site in this browser? Downloaded files are not affected.')) return;
      try {
        var prefix = SKEY; /* full site-scoped key: never touch another course site's saves on the shared github.io origin */
        Object.keys(localStorage).forEach(function (k) { if (k.indexOf(prefix) === 0) localStorage.removeItem(k); });
      } catch (e) {}
      location.reload();
    },
    tickerPause: function () {
      state.tickerPaused = !state.tickerPaused;
      var banner = document.querySelector('.upcoming-banner');
      var button = banner ? banner.querySelector('.upcoming-pause') : null;
      if (banner) banner.classList.toggle('paused', state.tickerPaused);
      if (button) {
        button.textContent = state.tickerPaused ? 'Resume' : 'Pause';
        button.setAttribute('aria-pressed', String(state.tickerPaused));
      }
      announce(state.tickerPaused ? 'Coming-up banner paused.' : 'Coming-up banner resumed.');
    },
    closeUpcomingReminder: function () {
      var box = document.getElementById('upcoming-reminder');
      if (box) box.remove();
      if (upcomingReminderFocus && upcomingReminderFocus.focus) { try { upcomingReminderFocus.focus(); } catch (e) {} }
      upcomingReminderFocus = null;
    },
    rlPanel: function () { state.rlPanelOpen = !state.rlPanelOpen; renderKeepScroll(); announce(state.rlPanelOpen ? 'Reading Lens panel open.' : 'Reading Lens panel closed.'); if (state.rlPanelOpen) { var p = document.getElementById('rl-panel'); if (p) p.focus(); } else { var b = document.querySelector('.reader-lens-btn'); if (b) b.focus(); } },
    rlPanelKey: function (e) { if (e.key === 'Escape') { e.stopPropagation(); SOC.rlPanel(); } },
    rlZoom: function (v) { rlState().zoom = v; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce('Text size ' + (v === 100 ? 'default.' : v + ' percent.')); },
    rlSpace: function () { var r = rlState(); r.space = !r.space; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.space ? 'Comfortable spacing on.' : 'Comfortable spacing off.'); },
    rlFont: function () { var r = rlState(); r.font = !r.font; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.font ? 'High-legibility font on.' : 'High-legibility font off.'); },
    rlTint: function (v) { rlState().tint = v; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(v === 'none' ? 'Page tint off.' : v + ' page tint on.'); },
    rlReset: function () {
      if (rlSpeaking) rlSpeakStop();
      state.rl = {};
      if (state.readerLensOpen) { state.readerLensOpen = false; rlDockWire(false); }
      persist();
      rlApply();
      renderKeepScroll();
      rlRefocus();
      announce('All reading supports are back to default.');
    },
    rlRulerH: function (h) { var r = rlState(); r.rulerH = h; persist(); rlRulerPosition(); renderKeepScroll(); rlRefocus(); announce('Ruler band set to ' + (h === 's' ? 'narrow' : h === 'l' ? 'wide' : 'medium') + '.'); },
    rlRulerPin: function () { var r = rlState(); r.rulerPin = !r.rulerPin; persist(); rlRulerPosition(); renderKeepScroll(); rlRefocus(); announce(r.rulerPin ? 'Ruler pinned. Drag the band by hand, or use Alt with the arrow keys.' : 'Ruler released. It follows your pointer again.'); },
    rlRuler: function () { var r = rlState(); r.ruler = !r.ruler; persist(); rlApply(); renderKeepScroll(); rlRefocus(); announce(r.ruler ? 'Reading ruler on. Move your pointer, or hold Alt and press the up or down arrows.' : 'Reading ruler off.'); },
    rlSpeak: function () { rlSpeakToggle(); },
    listenMenu: function () {
      if (rlSpeaking) { rlSpeakToggle(); return; }
      state.listenOpen = !state.listenOpen;
      renderKeepScroll();
      if (state.listenOpen) {
        setTimeout(function () { var b = document.getElementById('listen-play'); if (b) b.focus(); }, 60);
        announce('Listen controls open. Pick a voice and speed if you like, then press Read this page aloud.');
      } else { announce('Listen controls closed.'); }
    },
    listenGo: function () {
      state.listenOpen = false;
      renderKeepScroll();
      rlSpeakToggle();
    },
    rlVoicesRefresh: function () {
      try { window.speechSynthesis.getVoices(); } catch (e) {}
      setTimeout(function () { if (state.rlPanelOpen || state.listenOpen) renderKeepScroll(); }, 250);
      announce('Checking for voices.');
    },
    rlVoice: function (v) { rlState().voice = String(v || ''); persist(); announce(v ? 'Voice updated. It applies from the next line read.' : 'Default voice restored.'); },
    rlRate: function (v) { rlState().rate = v; persist(); renderKeepScroll(); rlRefocus(); announce('Reading speed set.'); },
    closeReaderLens: function () { if (state.readerLensOpen) SOC.toggleReaderLens(); },
    readerLensPointerDown: function () {},
    readerLensKey: function () {},
    prev: goPrevious,
    shareMobileSite: function () {
      var url = (location.origin + location.pathname).replace(/index\.html$/i, '');
      if (navigator.share) { navigator.share({ title: courseCode() + ' companion website', url: url }).then(function () { announce('Site link shared.'); }).catch(function () {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(function () { announce('Site link copied.'); }).catch(function () { announce('Copy the address from your browser to use this site on another device.'); }); return; }
      announce('Copy the address from your browser to use this site on another device.');
    },
    reportProblem: function () {
      var scr = screenAnnounceText ? screenAnnounceText() : (state.screen || 'a page');
      var wk = state.screen === 'station' ? (' (Week ' + state.stationWeek + ')') : '';
      var vp = (window.innerWidth || '?') + 'x' + (window.innerHeight || '?');
      var ua = (navigator.userAgent || '').slice(0, 160);
      var course = (D.course && D.course.code) || 'Course';
      var subject = course + ' companion site: problem report';
      var body = 'Hi Professor Peart,\n\nI ran into a problem on the ' + course + ' companion website.\n\nWhat happened (please describe):\n\n\n---- details that help fix it (please leave these) ----\nPage: ' + scr + wk + '\nAddress: ' + (location.href || '') + '\nScreen: ' + vp + '\nBrowser: ' + ua + '\n';
      var href = 'mailto:raymond.peart@senecapolytechnic.ca?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      try { window.location.href = href; } catch (e) {}
      announce('Opening your email app with the page details filled in. Add what happened, then send.');
    },
    go: function (s) {
      var target = cleanScreen(s); if (target !== state.screen) rememberPrevious(); state.navOpen = false; if (target === 'library') { state.savedView = false; } if (target === 'reading') { state.rcReading = null; state.lens = 'thematic'; } if (target === 'readings') { state.galWeek = null; state.galTopic = null; } state.screen = target; focusTarget = 'soc-main'; render(); topScroll(); },
    careerField: function (v) { state.careerField = v; persist(); render(); topScroll(); },
    lensOff: function () { state.careerField = ''; persist(); render(); },
    careerReflect: function (k, v) { state.careerReflect = state.careerReflect || {}; state.careerReflect[k] = v; persist(); },
    mediaNote: function (k, v) { state.mediaNotes = state.mediaNotes || {}; state.mediaNotes[k] = v; persist(); },
    videoWeek: function (w) { state.videoWeek = w || 'all'; render(); topScroll(); },
    mediaKind: function (k) { state.mediaKind = k || 'all'; render(); topScroll(); },
    careerLens: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-sel'); },
    careerChoices: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-choices'); },
    station: function (w) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; trackVisit(w); persist(); focusTarget = 'soc-main'; render(); topScroll(); },
    jumpWeek: function (w, part) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; trackVisit(w); persist(); focusTarget = 'soc-main'; render(); scrollWeekPart(part); },
    startActivity: function (s, w) { rememberPrevious(); state.activityReturn = cleanWeek(w) || w; state.screen = cleanScreen(s || 'activity'); focusTarget = 'soc-main'; render(); topScroll(); },
    wkCheck: function (k, o) {
      if (state.wkCheck[k] === o) delete state.wkCheck[k]; else state.wkCheck[k] = o;
      persist();
      var el = document.getElementById('opts-' + k); if (el) el.innerHTML = wkOptBtns(k);
      var parts = k.split('|'), w = +parts[1], d = weekData(w);
      refreshWeekChecks(w, d);
    },
    wkReflect: function (w, v) { state.wkReflect[w] = v; persist(); },
    wkClear: function (w, phase) {
      var d = weekData(w); if (!d) return;
      d.checks.forEach(function (c, i) { delete state.wkCheck[phase + '|' + w + '|' + i]; });
      persist(); refreshWeekChecks(w, d);
    },
    actPick: function (key, idx) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; state.act[key] = idx; state.actResult = state.actResult || {}; state.actResult[key] = idx; persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actToggle: function (key) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var val = !state.act[key]; state.act[key] = val; state.actResult = state.actResult || {}; state.actResult[key] = val; persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actAdd: function (key, idx) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var arr = state.act[key] || []; if (arr.indexOf(idx) < 0) arr.push(idx); state.act[key] = arr; state.actResult = state.actResult || {}; state.actResult[key] = arr.slice(); persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    actLabPick: function (key, idx, max) { var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0; var arr = state.act[key] || [], p = arr.indexOf(idx); if (p >= 0) arr.splice(p, 1); else { if (arr.length >= max) arr.shift(); arr.push(idx); } state.act[key] = arr; state.actResult = state.actResult || {}; state.actResult[key] = arr.slice(); persist(); render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    saveWeek: function (w) {
      var d = weekData(w); if (!d) { flash('Open a week first.'); return; }
      var lab = ['New to me', 'Getting it', 'I can'];
      var rate = function (k) { var s = state.wkCheck[k]; return s == null ? '(not rated)' : lab[s]; };
      var postStat = checkStat(w, 'post', d), moved = 0;
      var checkLines = d.checks.map(function (q, i) {
        var pr = state.wkCheck['pre|' + w + '|' + i], po = state.wkCheck['post|' + w + '|' + i];
        if (pr != null && po != null && po > pr) moved++;
        return (i + 1) + '. ' + checkText(q) + '\n   Before: ' + rate('pre|' + w + '|' + i) + '   After: ' + rate('post|' + w + '|' + i);
      }).join('\n\n');
      var scoreLine = 'Where your understanding sits: after the week you can speak to ' + postStat.g.can + ' of ' + postStat.total + ' of these ideas (getting there on ' + postStat.g.getting + ', new to ' + postStat.g.newto + '), and your read moved forward on ' + moved + ' of ' + postStat.total + ' since the start.';
      var auditText = activitySummary(w, d);
      var sections = [
        { h: 'Week ' + w + ': ' + weekTitle(w), t: d.purpose },
        { h: 'Before and after, your check answers', t: scoreLine + '\n\n' + checkLines },
        { h: 'The activity: ' + d.activity.title, t: auditText },
        { h: 'Your reflection', t: (state.wkReflect[w] || '').trim() || '(not written yet)' }
      ];
      senecaDoc((D.course && D.course.code) || '', weekTitle(w) + ' (Week ' + w + ')', ['Seneca ' + ((D.course && D.course.code) || ''), 'Your week record'], sections, ((D.course && D.course.code) || '') + '_Week' + w + '_my_work');
    },
    goWeek: function (s, w) { if (state.screen !== cleanScreen(s) || state.cardWeek !== w) rememberPrevious(); state.cardWeek = w; state.screen = cleanScreen(s); focusTarget = 'soc-main'; render(); topScroll(); },
    galWeek: function (w) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galWeek = (state.galWeek === w) ? null : w; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galTopic: function (t) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galTopic = (state.galTopic === t) ? null : t; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galClear: function () { state.galWeek = null; state.galTopic = null; render(); },
    playVideo: function (el, id, title) { var box = el.closest ? el.closest('.rgvideo, .vid-frame, .wk-rec-frame') : el.parentNode; if (box && /^[A-Za-z0-9_-]{6,20}$/.test(String(id || ''))) { box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" referrerpolicy="strict-origin-when-cross-origin" title="' + esc(title || 'Scholar talk') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>'; } },
    back: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; focusTarget = 'soc-main'; render(); var m = document.getElementById('soc-main'); if (m) m.scrollTop = state.libScroll || 0; },
    open: function (id) { rememberPrevious(); var m = document.getElementById('soc-main'); if (m) state.libScroll = m.scrollTop; state.screen = 'detail'; state.detailId = id; focusTarget = 'soc-main'; render(); topScroll(); },
    layout: function (l) { state.layout = l; persist(); render(); },
    sort: function (s) { state.sort = s; render(); },
    search: function (v) { state.search = v; refocusSearch = true; render(); },
    clearSearch: function () { state.search = ''; render(); },
    type: function (t) { state.activeTypes = (state.activeTypes.length === 1 && state.activeTypes[0] === t) ? [] : [t]; render(); },
    week: function (w) { if (state.screen !== 'library' || state.activeWeek !== w) rememberPrevious(); state.activeWeek = (state.activeWeek === w) ? null : w; state.savedView = false; state.screen = 'library'; focusTarget = 'soc-main'; render(); topScroll(); },
    clearFilters: function () { state.activeTypes = []; state.activeWeek = null; state.search = ''; state.savedView = false; render(); },
    dismissIntro: function () { state.introOpen = false; persist(); render(); },
    save: function (id) { var a = state.saved, i = a.indexOf(id); var msg; if (i >= 0) { a.splice(i, 1); msg = 'Removed from saved.'; } else { a.push(id); msg = 'Saved to your shelf.'; } persist(); flash(msg); },
    compare: function (id) { var a = state.compareIds, i = a.indexOf(id); if (i >= 0) { a.splice(i, 1); persist(); flash('Removed from compare.'); } else { if (a.length >= 3) { flash('Compare holds three at a time.'); return; } a.push(id); persist(); flash('Added to compare.'); } },
    synCopy: function () {
      var el = document.getElementById('syn-body');
      var txt = el ? el.textContent.replace(/\s+\n/g, '\n').trim() : '';
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(txt).then(function () { announce('Copied to your clipboard.'); }, function () { announce('Copy failed. Select the text and copy it manually.'); }); }
      else { announce('Copy is not available in this browser. Select the text to copy it.'); }
    },
    synPrint: function () {
      var el = document.getElementById('syn-body');
      var txt = el ? el.innerHTML : '';
      var w = window.open('', '_blank');
      if (!w) { announce('Allow pop-ups to print, or use Copy instead.'); return; }
      w.document.write('<!doctype html><meta charset=utf-8><title>Reading synthesis</title><body style="font-family:Georgia,serif;max-width:640px;margin:40px auto;padding:0 20px;color:#15171C;line-height:1.6"><h1 style="font-size:1.2rem">How these readings connect</h1>' + txt + '<script>window.onload=function(){window.print();}<\/script></body>');
      w.document.close();
    },
    synSave: function () {
      var el = document.getElementById('syn-body');
      var txt = el ? el.textContent.replace(/\s+\n/g, '\n').trim() : '';
      if (!txt) { announce('Nothing to save yet.'); return; }
      state.cmpNotes = state.cmpNotes || {};
      state.cmpNotes['saved-synthesis'] = txt;
      persist();
      renderKeepScroll();
      announce('Saved to your notes on this device. It will be here when you come back in this browser.');
    },
    clearCompare: function () { state.compareIds = []; state.showSynthesis = false; render(); },
    synthesize: function () { state.showSynthesis = true; render(); },
    playWalk: function (w) { walkOpen(cleanWeek(w) || w); },
    walkNav: function (dir) { if (!_walk) return; var n = Math.max(0, Math.min(_walk.slides.length - 1, _walk.i + dir)); if (n === _walk.i) return; _walk.i = n; walkMount(); },
    walkGoto: function (k) { if (!_walk) return; _walk.i = k; walkMount(); },
    walkClose: function () { walkCloseDom(); _walk = null; },
    walkGoWeek: function () { var w = _walk && _walk.week; walkCloseDom(); _walk = null; if (w) SOC.station(w); },
    walkTheme: function () { var r = rlState(); r.walkTheme = (r.walkTheme === 'light' ? 'dark' : 'light'); persist(); walkMount(); },
    walkFig: function (op) {
      if (!_walk || !_walk.fig) return;
      if (op === 'zin') _walk.fig.scale = Math.min(6, _walk.fig.scale * 1.2);
      else if (op === 'zout') _walk.fig.scale = Math.max(0.4, _walk.fig.scale / 1.2);
      else if (op === 'rl') _walk.fig.rot -= 90;
      else if (op === 'rr') _walk.fig.rot += 90;
      else { _walk.fig = { scale: 1, rot: 0, tx: 0, ty: 0 }; }
      walkFigApply();
    },


    hideSynthesis: function () { state.showSynthesis = false; render(); },
    setLens: function (l) { state.lens = l; render(); },
    rcPick: function (id) { state.rcReading = id; state.lens = 'thematic'; persist(); render(); topScroll(); },
    rcClear: function () { state.rcReading = null; render(); topScroll(); },
    rcNote: function (k, v) { state.rcNotes[k] = v; persist(); },
    rcReveal: function (k) { var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; state.revealed[k] = !state.revealed[k]; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    sgNote: function (k, v) { state.sgNotes = state.sgNotes || {}; state.sgNotes[k] = v; persist(); },
    sgCompare: function (k, w) { state.sgShow = state.sgShow || {}; state.sgShow[k] = !state.sgShow[k]; var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    sgFlip: function (k, w) { state.sgFlip = state.sgFlip || {}; state.sgFlip[k] = !state.sgFlip[k]; var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    sgTickRung: function (k, w) { state.sgTick = state.sgTick || {}; state.sgTick[k] = true; persist(); var sec = document.getElementById('wk-sg'); if (sec) sec.outerHTML = sgSection(w).html; },
    mcPick: function (k, i) {
      if (state.mcSel[k] === i) { delete state.mcSel[k]; } else { state.mcSel[k] = i; }
      var kcm = /^wk(\d+)\|kc/.exec(k);
      if (kcm) {
        var sec = document.getElementById('wk-kc');
        if (sec) { sec.outerHTML = kcSection(Number(kcm[1])).html; return; }
      }
      var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; var wy = window.scrollY;
      render();
      var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top;
      window.scrollTo(0, wy);
    },
    kcVer: function (w, v) { state.kcVersion = state.kcVersion || {}; state.kcVersion[w] = v; var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(w).html; } },
    kcClear: function (w, v) { var pre = 'wk' + w + '|kc' + v + '|'; [state.mcSel, state.mcConf].forEach(function (map) { if (!map) return; Object.keys(map).forEach(function (k) { if (k.indexOf(pre) === 0) delete map[k]; }); }); if (state.kcReveal) delete state.kcReveal[w + '|' + v]; var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(w).html; } },
    mcConf: function (k, c, w) { state.mcConf = state.mcConf || {}; if (state.mcConf[k] === c) delete state.mcConf[k]; else state.mcConf[k] = c; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    mcPickSel: function (k, v) { v = Number(v); if (isNaN(v) || v < 0) delete state.mcSel[k]; else state.mcSel[k] = v; var kcm = /^wk(\d+)\|kc/.exec(k); if (kcm) { var sec = document.getElementById('wk-kc'); if (sec) { sec.outerHTML = kcSection(Number(kcm[1])).html; return; } } render(); },
    kcShow: function (w) { var v = (state.kcVersion && state.kcVersion[w]) || 0; state.kcReveal = state.kcReveal || {}; state.kcReveal[w + '|' + v] = true; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    kcShortText: function (k, v) { state.kcShort = state.kcShort || {}; state.kcShort[k] = v; persist(); },
    kcShortReveal: function (k, w) { state.kcShortShown = state.kcShortShown || {}; state.kcShortShown[k] = !state.kcShortShown[k]; var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    kcShortRate: function (k, r, w) { state.kcShortRate = state.kcShortRate || {}; state.kcShortRate[k] = r; persist(); var sec = document.getElementById('wk-kc'); if (sec) sec.outerHTML = kcSection(w).html; },
    mcReset: function (id) { var m = document.getElementById('soc-main'); var top = m ? m.scrollTop : 0; var keep = {}; Object.keys(state.mcSel).forEach(function (k) { if (k.indexOf(id + '|mc|') !== 0) keep[k] = state.mcSel[k]; }); state.mcSel = keep; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top; },
    saveReadingNotes: function () {
      var r = state.rcReading && rec(state.rcReading); if (!r) { flash('Pick a reading first.'); return; }
      var cc = (D.course && D.course.code) || 'Course';
      var L = (LENSES[state.lens] || LENSES.thematic).label, qs = RC_QUESTIONS[state.lens] || RC_QUESTIONS.thematic;
      var sections = qs.map(function (q, i) { return { h: q, t: (state.rcNotes[r.id + '|' + state.lens + '|' + i] || '').trim() }; });
      var mcItems = MC[r.id] || [];
      if (mcItems.length) {
        var ans = 0, cor = 0, miss = [];
        mcItems.forEach(function (m, mi) { var s = state.mcSel[r.id + '|mc|' + mi]; if (s !== undefined && s !== null) { ans++; if (s === m.answer) cor++; else miss.push(mi + 1); } });
        var head = 'Score: ' + cor + ' of ' + mcItems.length + ' correct' + (ans < mcItems.length ? ' (' + ans + ' of ' + mcItems.length + ' answered).' : '.');
        if (ans === mcItems.length) {
          var b = rcBand(cor, mcItems.length); head += '\nWhere you are: ' + b.label + '. ' + b.msg;
          var prof = rcSkillProfile(r.id, mcItems);
          if (prof.has) {
            if (prof.strengths.length) { var cb = (prof.strengths.indexOf(RC_SKILLS.argument) >= 0 && r.coreIdea) ? ' You have the central point, that ' + lcFirst(String(r.coreIdea).replace(/\s*\.?\s*$/, '')) + '.' : ''; head += '\nYour strengths: you read ' + listJoin(prof.strengths) + ' well.' + cb; }
            if (prof.opps.length) { head += '\nAreas of opportunity:'; prof.opps.forEach(function (o) { head += '\n  ' + ucFirst(o.label) + '. ' + (o.whys.length ? o.whys.join(' ') : 'Go back to this in the reading and read for it directly.'); }); }
          } else if (miss.length) head += '\nLook again at ' + numList(miss) + '.';
        }
        sections.push({ h: 'Check your understanding', t: head });
        mcItems.forEach(function (m, mi) {
          var sel = state.mcSel[r.id + '|mc|' + mi];
          var done = (sel !== undefined && sel !== null);
          var chosen = done ? (m.options[sel] || '') : '(not answered)';
          var verdict = !done ? 'Not answered.' : (sel === m.answer ? 'Correct.' : 'Not quite.');
          var t = 'Your answer: ' + chosen + '\n' + verdict;
          if (done && sel !== m.answer) t += ' The correct answer is: ' + (m.options[m.answer] || '') + '.';
          if (m.why) t += '\n' + m.why;
          sections.push({ h: (mi + 1) + '. ' + m.q, t: t });
        });
      }
      senecaDoc(cc, 'Build Your Reading Comprehension', ['Reading: ' + r.title + ' by ' + r.authors, 'Lens: ' + L], sections, cc + '_reading_comprehension');
    },
    saveStudio: function () {
      var cc = courseCode(), w = focusWeek(state.cardWeek), recs = recordsForWeek(w), sections = [], sub = [], sel = state.mcSel[cc + '|studio|' + w], checkQ = '';
      if (cc === 'SOC122') {
        var west = firstWhere(recs, function (r) { return r.eye === 'western'; }), ind = firstWhere(recs, function (r) { return r.eye === 'indigenous'; });
        if (!ind) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Two attributed eyes', 'Week ' + w];
        if (west) sections.push({ h: 'Western eye', t: west.authors + ', ' + west.title + ' (' + west.year + ')\n' + west.coreIdea });
        sections.push({ h: 'Indigenous eye', t: ind.authors + ', ' + ind.title + ' (' + ind.year + ')\n' + ind.coreIdea });
        sections.push({ h: 'Two-Eyed Seeing practice', t: 'Two-Eyed Seeing (Etuaptmumk), named by Mi\'kmaw Elder Albert Marshall. The bridge is the practice you bring, not one the app writes.' });
        checkQ = 'What is most at risk if this is treated as only a Western research-methods question?';
      } else if (cc === 'PSY355') {
        var rp = recs[0] || D.records[0]; if (!rp) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Evidence Transfer Lab', 'Week ' + w];
        sections.push({ h: 'Claim', t: rp.authors + ' (' + rp.year + '): ' + rp.coreIdea });
        sections.push({ h: 'Boundary', t: 'What this does not prove: do not turn it into a rule for every learner; check context, supports, workload, strategy, and evidence first.' });
        sections.push({ h: 'Academic transfer', t: 'One course task, one support, one study strategy, and one sign the strategy is working. No clinical framing.' });
        checkQ = 'Which next step applies the idea responsibly, without blaming the student or overstating the reading?';
      } else if (cc === 'BFS218') {
        var rb = recs[0] || D.records[0]; if (!rb) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Accountability Chain Lab', 'Week ' + w];
        sections.push({ h: 'Source anchor', t: rb.authors + ': ' + rb.coreIdea });
        sections.push({ h: 'Accountability chain', t: 'System or technology, then design or data or default, then the racialized mechanism, then harm and the institutions responsible (not one bad actor), then a response grounded in the readings.' });
        checkQ = 'Which option names the racialized mechanism, not only the outcome or intent?';
      } else { flash('Self-Check Studio save is for the course sites.'); return; }
      if (sel !== undefined && sel !== null) sections.push({ h: 'Quick check', t: 'Q: ' + checkQ + '\nYour answer was ' + (sel === 0 ? 'the grounded one. Correct.' : 'not the grounded one. Look again at what the reading actually claims.') });
      senecaDoc(cc || 'Course', 'Self-Check Studio', sub, sections, (cc || 'Course') + '_self_check_studio');
    },
    mapLayer: function (layer) {
      var m = document.getElementById('soc-main'), top = m ? m.scrollTop : 0;
      state.mapLayer = layer === 'indigenous' ? 'indigenous' : 'admin';
      persist();
      render();
      var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = top;
    },
    mapPick: function (id) {
      state.mapRegion = id;
      persist();
      focusTarget = 'map-detail';
      render();
    },
    mapNote: function (k, v) {
      state.mapNotes[k] = v;
      persist();
    },
    mapSelect: function (id) {
      state.mapRegion = id; persist();
      var m = mapById(id), el = document.getElementById('soc-mapdetail'); if (el) el.innerHTML = mapDetailInner(m);
      if (_leafletMap && m.lat != null) { _leafletMap.setView([m.lat, m.lng], 5); var mk = _leafletMarkers[id]; if (mk) mk.openPopup(); }
      var d = document.getElementById('soc-leaflet'); if (d && d.scrollIntoView) d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    saveMap: function () {
      var m = mapActive(), rs = mapRecords(m);
      var readings = rs.map(function (r) { return 'Week ' + r.week + ': ' + r.title + ' by ' + r.authors + ' (' + r.year + ')\n' + r.coreIdea; }).join('\n\n');
      var sections = [
        { h: 'Caveat', t: MAP_CAVEAT },
        { h: 'Selected anchor', t: 'Scholar: ' + m.scholar + ' (' + m.nation + ')\nRegion: ' + m.region + '\nConcept: ' + m.concept },
        { h: 'Readings connected to this anchor', t: readings },
        { h: 'What this place makes visible', t: (state.mapNotes.apply || '').trim() }
      ];
      senecaDoc('SOC122', 'Personal Cartography Workspace', ['SOC122 Introduction to the Social Sciences', 'Selected anchor: ' + m.scholar + ' (' + m.nation + ')'], sections, 'SOC122_personal_cartography_workspace');
    },
    read: function (id) { var r = rec(id); var u = r && readUrl(r); if (u) { window.open(u, '_blank', 'noopener'); } else { rememberPrevious(); state.screen = 'detail'; state.detailId = id; focusTarget = 'soc-main'; render(); topScroll(); } },
    source: function (id) { var r = rec(id); var u = r && sourceUrl(r); if (u) window.open(u, '_blank', 'noopener'); },
    openSaved: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; state.activeTypes = []; state.activeWeek = null; state.search = ''; state.savedView = state.saved.length > 0; flash(state.saved.length ? 'Your saved shelf.' : 'Nothing saved yet. Tap the bookmark on any reading.'); topScroll(); },
    cardWeek: function (v) { state.cardWeek = (v === '' ? null : parseInt(v, 10)); render(); },
    glossWeek: function (v) { state.glossWeek = v; var o = document.getElementById('soc-gout'); if (o) o.innerHTML = glossaryByWeek(v); },
    glossSearch: function (v) { state.glossSearch = v; var o = document.getElementById('soc-gsearchout'); if (o) o.innerHTML = glossarySearchHTML(v); },
    glossWeekGo: function (w) { state.glossWeek = String(w); var sel = document.getElementById('soc-gweek'); if (sel) sel.value = String(w); var o = document.getElementById('soc-gout'); if (o) { o.innerHTML = glossaryByWeek(String(w)); o.scrollIntoView({ behavior: 'smooth', block: 'start' }); } },
    flip: function (el) { var c = el && (el.classList && el.classList.contains('flip') ? el : (el.closest ? el.closest('.flip') : null)); if (c) c.classList.toggle('flipped'); },
  };

  state.wkOpen = {};
  render();
  try { if (location.search) history.replaceState(viewSnapshot(), '', location.pathname + location.hash); } catch (e) {}
  window.addEventListener('popstate', function (e) {
    var __ov = document.getElementById('walk-overlay');
    if (__ov) { try { walkCloseDom(); _walk = null; } catch (er) {} try { history.pushState(viewSnapshot(), ''); } catch (er) {} return; }
    __fromPop = true;
    try { restoreView(e.state && typeof e.state === 'object' && e.state.screen ? e.state : { screen: 'journey' }); } catch (er) {}
    __lastNavKey = navKey();
    render();
    __fromPop = false;
  });
  if (routePart0) scrollWeekPart(routePart0);
  try { var __wk = JSON.parse(sessionStorage.getItem(WKKEY) || 'null'); if (__wk && __wk.w) { walkOpen(cleanWeek(__wk.w) || __wk.w); if (_walk && __wk.i) { _walk.i = Math.max(0, Math.min(_walk.slides.length - 1, __wk.i)); walkMount(); } } } catch (e) {}

  /* Reading Supports boot: apply saved settings, keep them across renders, stop speech on navigation */
  try {
    try { if ('speechSynthesis' in window) window.speechSynthesis.getVoices(); } catch (e0) {}
    if ('speechSynthesis' in window && window.speechSynthesis.addEventListener) {
      window.speechSynthesis.addEventListener('voiceschanged', function () { if (state.rlPanelOpen) renderKeepScroll(); });
    }
    var rlSaved = load();
    if (rlSaved && rlSaved.rl && typeof rlSaved.rl === 'object') state.rl = rlSaved.rl;
    rlApply();
    var rlMo = new MutationObserver(function () {
      if (rlSpeaking) rlSpeakStop();
      rlApply();
    });
    var rlMain = document.getElementById('soc-main');
    if (rlMain && rlMain.parentElement) rlMo.observe(rlMain.parentElement, { childList: true, subtree: false });
  } catch (e) {}
})();
