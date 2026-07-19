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
  function persist() { try { localStorage.setItem(SKEY, JSON.stringify({ saved: state.saved, cmpNotes: state.cmpNotes, rcNotes: state.rcNotes, sgNotes: state.sgNotes, sgTick: state.sgTick, mapNotes: state.mapNotes, wkCheck: state.wkCheck, wkReflect: state.wkReflect, actResult: state.actResult, mcSel: state.mcSel, mcConf: state.mcConf, kcShort: state.kcShort, kcShortRate: state.kcShortRate, kcHist: state.kcHist, mediaNotes: state.mediaNotes, careerReflect: state.careerReflect, careerField: state.careerField, learningEmphasis: state.learningEmphasis, contextCompare: state.contextCompare, contextWeek: state.contextWeek, contextNotes: state.contextNotes, synthesisNotes: state.synthesisNotes, spotState: state.spotState, spotReports: state.spotReports, rl: state.rl, studentName: state.studentName, visits: state.visits })); } catch (e) {} }
  function loadView() { try { var o = JSON.parse(sessionStorage.getItem(VKEY) || '{}'); return o && typeof o === 'object' ? o : {}; } catch (e) { return {}; } }
  function clearView() { try { sessionStorage.removeItem(VKEY); sessionStorage.removeItem(HKEY); } catch (e) {} }
  function shouldResumeView(v) {
    var hard = false;
    try { hard = sessionStorage.getItem(HKEY) === '1'; sessionStorage.removeItem(HKEY); } catch (e) {}
    if (hard) { clearView(); return false; }
    return !!(v && v.screen);
  }
  function cleanScreen(s) {
    return ['journey', 'site', 'library', 'station', 'explore', 'detail', 'pathways', 'contexts', 'synthesis', 'videos', 'readings', 'compare', 'reading', 'glossary', 'cards', 'assignments', 'career', 'activity', 'walkthroughs', 'map', 'calendar'].indexOf(s) >= 0 ? s : 'journey';
  }
  function cleanWeek(w) {
    w = Number(w);
    return (isFinite(w) && w >= 1 && w <= 20) ? w : null;
  }
  function cleanEmphasis(v) { return ['western', 'two', 'indigenous'].indexOf(String(v || '')) >= 0 ? String(v) : 'two'; }
  function cleanWeekPart(part) {
    part = String(part || '');
    return ['ov', 'mode', 'rec', 'pre', 'learn', 'out', 'gq', 'lens', 'context', 'con', 'term', 'read', 'watch', 'case', 'do', 'reflect', 'sg', 'kc', 'notes', 'how', 'catch'].indexOf(part) >= 0 ? part : null;
  }
  function initialRoute() {
    try {
      var p = new URLSearchParams(location.search || '');
      var walk = cleanWeek(p.get('walk'));
      if (walk) return { screen: 'walkthroughs', week: walk, walk: walk };
      var w = cleanWeek(p.get('week') || p.get('w'));
      if (w) return { screen: 'station', week: w, part: cleanWeekPart(p.get('part')) };
      if (p.get('screen')) return { screen: cleanScreen(p.get('screen')), week: null };
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
    careerField: (typeof saved0.careerField === 'string' && saved0.careerField) ? saved0.careerField : (resumeView0 ? (view0.careerField || '') : ''),
    learningEmphasis: cleanEmphasis(saved0.learningEmphasis || (resumeView0 && view0.learningEmphasis) || 'two'),
    contextCompare: Array.isArray(saved0.contextCompare) ? saved0.contextCompare.slice(0, 3) : [],
    contextWeek: cleanWeek(saved0.contextWeek) || 5,
    contextNotes: (saved0.contextNotes && typeof saved0.contextNotes === 'object') ? saved0.contextNotes : {},
    synthesisNotes: (saved0.synthesisNotes && typeof saved0.synthesisNotes === 'object') ? saved0.synthesisNotes : {},
    spotState: (saved0.spotState && typeof saved0.spotState === 'object') ? saved0.spotState : { completed: {}, dismissed: {} },
    spotReports: (saved0.spotReports && typeof saved0.spotReports === 'object') ? saved0.spotReports : {},
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
  state.spotState = state.spotState || {};
  state.spotState.thresholdPrompted = (state.spotState.thresholdPrompted && typeof state.spotState.thresholdPrompted === 'object') ? state.spotState.thresholdPrompted : {};
  state.spotState.completedForms = (state.spotState.completedForms && typeof state.spotState.completedForms === 'object') ? state.spotState.completedForms : {};
  state.spotState.questionSeen = (state.spotState.questionSeen && typeof state.spotState.questionSeen === 'object') ? state.spotState.questionSeen : {};
  state.spotState.formChoice = (state.spotState.formChoice && typeof state.spotState.formChoice === 'object') ? state.spotState.formChoice : {};
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
        learningEmphasis: state.learningEmphasis,
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
    return '<button onclick="SOC.source(\'' + r.id + '\')" style="width:100%;margin:8px 0 9px;display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#fff;border:1px solid #DEE3EA;color:#961A13;border-radius:9px;padding:9px 11px;font-size:.8125rem;font-weight:600;cursor:pointer">' + esc(sourceLabel(r)) + '<span style="display:flex">' + ic('external', 14) + '</span></button>';
  }
  function isPdfReading(r) {
    var u = readUrl(r) || '';
    return !!r.pdfUrl || /\.pdf($|[?#])/i.test(u) || /\/article\/download\/|\/servlets\/purl\/|arxiv\.org\/pdf|EIMJ20241604_09|\/jonus\/index\.php\/jonus\/article\/download\//.test(u);
  }
  function readLabel(r) {
    if (r.fulltext === false) return 'Find it in the Seneca Library';
    if (r.primaryLabel) return r.primaryLabel;
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
  function saveBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid ' + (on ? '#DA291C' : '#DEE3EA') + ';background:' + (on ? '#FBF4F3' : '#fff') + ';color:' + (on ? '#961A13' : '#6B7280') + ';flex:none'; }
  function cmpBtnStyle(on) { return 'display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;border:1px solid #DEE3EA;background:' + (on ? '#EEF1F5' : '#fff') + ';color:' + (on ? '#961A13' : '#6B7280') + ';flex:none'; }
  function chipStyle(active, accent) { return 'display:inline-flex;align-items:center;gap:6px;border:1px solid ' + (active ? accent : '#DEE3EA') + ';background:' + (active ? accent + '22' : '#fff') + ';color:' + (active ? '#15171C' : '#474C57') + ';font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';padding:6px 11px;border-radius:999px'; }
  function segStyle(active) { return 'border:none;border-radius:7px;padding:6px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#fff' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';box-shadow:' + (active ? '0 1px 2px rgba(21,23,28,.12)' : 'none') + ';display:flex;align-items:center;gap:6px'; }
  function eyePill(r) {
    var ind = r.eye === 'indigenous';
    return '<span title="' + esc(eyeLabel(r)) + '" style="display:inline-flex;align-items:center;gap:5px;font-family:var(--mono);font-size:.625rem;font-weight:600;letter-spacing:.04em;color:' + (ind ? '#961A13' : '#15171C') + ';background:' + (ind ? '#F4F4F4' : '#EEF1F5') + ';padding:3px 8px;border-radius:999px">' + (ind ? 'INDIGENOUS' : 'WESTERN') + '</span>';
  }
  function weekTag(r) { return '<span class="mono" style="font-size:.6875rem;color:#5A6270;background:#EEF1F5;padding:3px 8px;border-radius:6px">Week ' + r.week + '</span>'; }

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
      + '<span class="mono soc-head-term" style="font-size:.75rem;font-weight:600;color:var(--red-dark);background:#F6E3E1;padding:5px 10px;border-radius:6px;flex:none">FALL 2026</span>'
      + '</header>';
  }
  function sidebar() {
    var s = state;
    var navDefs = [['journey', 'Home', 'gauge'], ['site', 'How This Site Works', 'file'], ['pathways', 'Course Pathways', 'map'], ['contexts', 'Cultural Comparison Lab', 'globe'], ['synthesis', 'Course Synthesis', 'globe'], ['readings', 'Readings and Media', 'gallery'], ['compare', 'Compare Sources', 'columns'], ['reading', 'Source Practice', 'book'], ['videos', 'Videos and Podcasts', 'play'], ['glossary', 'Glossary', 'book'], ['cards', 'Concept Flashcards', 'clipboard'], ['assignments', 'Starting Your Assignment', 'clipboard'], ['career', 'Career Choices', 'globe']];
    var byKey = {};
    var btns = navDefs.map(function (d) {
      var key = d[0], active = (key === 'journey' && (s.screen === 'journey' || s.screen === 'library' || s.screen === 'station' || s.screen === 'detail')) || s.screen === key;
      var badge = '';
      if (key === 'compare' && s.compareIds.length) badge = '<span class="mono" style="font-size:.6875rem;font-weight:600;color:#961A13;background:#EEF1F5;padding:1px 7px;border-radius:999px">' + s.compareIds.length + '</span>';
      var click = "SOC.go('" + key + "')";
      var html = '<button onclick="' + click + '" aria-current="' + (active ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#EEF1F5' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';text-align:left">'
        + '<span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (active ? 'var(--red)' : '#6B7280') + '">' + ic(d[2], 19) + '</span><span style="flex:1;text-align:left">' + d[1] + '</span>' + badge + '</button>';
      byKey[key] = html; return html;
    });
    var wkActive = s.screen === 'walkthroughs';
    var calActive = s.screen === 'calendar';
    var cal = '<button onclick="SOC.go(\'calendar\')" aria-current="' + (calActive ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (calActive ? '600' : '500') + ';background:' + (calActive ? '#EEF1F5' : 'transparent') + ';color:' + (calActive ? '#15171C' : '#474C57') + ';text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (calActive ? 'var(--red)' : '#6B7280') + '">' + ic('calendar', 19) + '</span><span style="flex:1;text-align:left">Calendar and Due Dates</span></button>';
    var walk = '<button onclick="SOC.go(\'walkthroughs\')" aria-current="' + (wkActive ? 'page' : 'false') + '" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:' + (wkActive ? '600' : '500') + ';background:' + (wkActive ? '#EEF1F5' : 'transparent') + ';color:' + (wkActive ? '#15171C' : '#474C57') + ';text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:' + (wkActive ? 'var(--red)' : '#6B7280') + '">' + ic('layers', 19) + '</span><span style="flex:1;text-align:left">Weekly Experiences</span></button>';
    var guide = '<div style="border-radius:10px;padding:10px 12px;color:#474C57"><div style="display:flex;align-items:flex-start;gap:11px;font-size:.9375rem;font-weight:500;line-height:1.25"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('file', 19) + '</span><span style="flex:1;min-width:0">Course Website Instructions</span></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 0 33px"><a href="./guide/" target="_blank" rel="noopener" style="font-size:.75rem;font-weight:600;color:#15171C;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:999px;padding:4px 9px;text-decoration:none">Online guide <span aria-hidden="true">&#8599;</span></a><a href="./guide/SOC122-Companion-Guide.pdf" download style="font-size:.75rem;font-weight:600;color:#15171C;background:#EEF1F5;border:1px solid #DEE3EA;border-radius:999px;padding:4px 9px;text-decoration:none">PDF <span aria-hidden="true">&#8595;</span></a></div></div>';
    var repActive = s.screen === 'report';
    var report = '<button onclick="SOC.reportProblem()" style="display:flex;align-items:center;gap:11px;width:100%;border:none;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:500;background:transparent;color:#474C57;text-align:left"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:#6B7280">' + ic('help', 19) + '</span><span style="flex:1;text-align:left">Report a problem</span></button>';
    var counts = {}; D.records.forEach(function (r) { counts[r.week] = (counts[r.week] || 0) + 1; });
    var navWeeks = [];
    for (var nw = 1; nw <= 14; nw++) navWeeks.push(nw);
    var weekNav = navWeeks.map(function (w) {
      var active = s.screen === 'station' && s.stationWeek === w;
      return '<button onclick="SOC.station(' + w + ')" style="display:flex;align-items:center;gap:9px;width:100%;border:none;border-radius:9px;padding:7px 12px;font-size:.8125rem;font-weight:' + (active ? '600' : '500') + ';background:' + (active ? '#EEF1F5' : 'transparent') + ';color:' + (active ? '#15171C' : '#474C57') + ';text-align:left">'
        + '<span class="mono" style="font-size:.6875rem;color:' + (active ? '#15171C' : '#6B7280') + ';flex:none;width:18px">' + w + '</span>'
        + '<span style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(weekTitle(w)) + '</span>'
        + '<span class="mono" style="font-size:.6875rem;color:#474C57">' + (counts[w] || 0) + '</span></button>';
    }).join('');
    function group(label, html) { return '<section class="soc-nav-group"><div class="soc-nav-label">' + label + '</div>' + html + '</section>'; }
    var weekOpen = s.screen === 'library' || s.screen === 'station' || s.screen === 'detail';
    var weekGroup = '<details class="soc-nav-weekgroup"' + (weekOpen ? ' open' : '') + '><summary><span>WEEKLY JOURNEY</span><b>' + (s.stationWeek ? 'Week ' + s.stationWeek : 'Weeks 1-14') + '</b></summary><div>' + weekNav + '</div></details>';
    var nav = group('ORIENT', byKey.site + byKey.journey + byKey.pathways + cal)
      + weekGroup
      + group('IMMERSIVE ROOMS', walk + byKey.contexts)
      + group('EVIDENCE WORKBENCH', byKey.readings + byKey.videos + byKey.reading + byKey.compare)
      + group('PRACTISE & APPLY', byKey.cards + byKey.glossary + byKey.assignments + byKey.career)
      + group('SYNTHESIZE', byKey.synthesis)
      + group('SITE SUPPORT', guide + report);
    return '<nav class="soc-sidebar' + (state.navOpen ? ' soc-sidebar-open' : '') + '" aria-label="Primary" style="width:240px;flex:none;border-right:1px solid #DEE3EA;background:#fff;padding:18px 14px;display:flex;flex-direction:column;gap:4px;position:sticky;top:62px;align-self:flex-start;height:calc(100vh - 62px);overflow:auto">'
      + nav
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
        + '<h1 style="font-size:2.125rem;line-height:1.14;font-weight:600;margin:0 0 10px;color:var(--ink)">Every source, week by week.</h1>'
        + '<p style="font-size:1rem;line-height:1.6;color:#474C57;margin:0;">These are the readings behind SOC122 in course order. Western disciplinary sources appear beside named Indigenous scholars whose Nations, communities, questions, and evidence remain distinct. Search them, compare two carefully, and follow the course as it moves.</p></div>'
        + '<div style="display:flex;gap:10px;flex:none">' + stats.map(function (st) { return '<div style="background:#EEF1F5;border:1px solid #DEE3EA;border-radius:12px;padding:12px 16px;text-align:center;min-width:78px"><div class="mono" style="font-size:1.75rem;font-weight:600;line-height:1;color:var(--red)">' + st[1] + '</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:#474C57;margin-top:5px">' + st[0] + '</div></div>'; }).join('') + '</div></div>'
        + '<button onclick="SOC.dismissIntro()" aria-label="Dismiss" style="position:absolute;top:14px;right:14px;background:#EEF1F5;border:none;border-radius:8px;width:30px;height:30px;color:#474C57;display:flex;align-items:center;justify-content:center">' + ic('x', 16) + '</button></section>';
    }

    var layoutDefs = [['byweek', 'By week', 'layers'], ['tiles', 'Tiles', 'grid'], ['index', 'Index', 'list']];
    var layoutChips = layoutDefs.map(function (d) { return '<button onclick="SOC.layout(\'' + d[0] + '\')" title="' + d[1] + '" aria-label="' + d[1] + '" aria-pressed="' + (s.layout === d[0]) + '" style="' + segStyle(s.layout === d[0]) + '">' + ic(d[2], 15) + '<span>' + d[1] + '</span></button>'; }).join('');
    var filtersActive = s.activeTypes.length || s.activeWeek != null || s.search.trim().length || s.savedView;
    var n = list.length;
    var resultLabel = s.savedView ? ('Saved shelf · ' + n + (n === 1 ? ' reading' : ' readings')) : (s.activeWeek != null ? ('Week ' + s.activeWeek + ' · ' + n + (n === 1 ? ' reading' : ' readings')) : (n === D.records.length ? 'All ' + n + ' readings' : n + ' of ' + D.records.length));
    var weekStrip = '<div class="soc-weekstrip" style="gap:8px;overflow-x:auto;margin-bottom:16px;padding-bottom:4px" aria-label="Filter by week">' + weeksWithReadings().map(function (w) { var aw = s.activeWeek === w; return '<button onclick="SOC.week(' + w + ')" aria-pressed="' + aw + '" style="flex:none;border:1px solid ' + (aw ? '#DA291C' : '#DEE3EA') + ';background:' + (aw ? '#FBF4F3' : '#fff') + ';color:' + (aw ? '#961A13' : '#474C57') + ';font-size:.8125rem;font-weight:' + (aw ? '600' : '500') + ';padding:8px 12px;border-radius:999px;white-space:nowrap"><span class="mono" style="opacity:.7">W' + w + '</span> ' + esc(weekTitle(w)) + '</button>'; }).join('') + '</div>';

    html += '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div style="display:flex;align-items:center;gap:10px;background:#F7F8FA;border:1px solid #DEE3EA;border-radius:10px;padding:11px 14px">'
      + '<span style="display:flex;color:#6B7280;flex:none">' + ic('search', 18) + '</span>'
      + '<input id="soc-search" value="' + esc(s.search) + '" oninput="SOC.search(this.value)" placeholder="Search by title, author, idea, or week..." aria-label="Search readings" style="flex:1;border:none;background:none;font-size:1rem;color:#15171C;min-width:0" />'
      + (s.search ? '<button onclick="SOC.clearSearch()" aria-label="Clear search" style="background:none;border:none;color:#6B7280;display:flex;padding:2px">' + ic('x', 16) + '</button>' : '')
      + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid #EEF1F5">'
      + '<span style="font-size:.8125rem;color:#474C57">' + resultLabel + '</span>'
      + (filtersActive ? '<button onclick="SOC.clearFilters()" style="background:none;border:none;color:var(--red);font-size:.8125rem;font-weight:600;padding:2px 4px">Clear</button>' : '')
      + '<div style="margin-left:auto;display:flex;gap:4px;background:#EEF1F5;border-radius:9px;padding:4px" role="group" aria-label="Layout">' + layoutChips + '</div>'
      + '</div></section>';
    html += weekStrip;

    if (n === 0) {
      html += '<div style="text-align:center;padding:70px 20px;color:#474C57"><div style="display:inline-flex;color:#C9D1DC;margin-bottom:14px">' + ic('search', 44, 1.4) + '</div><div style="font-size:1.125rem;font-weight:600;color:#15171C;margin-bottom:6px">No readings match that yet.</div><p style="margin:0 0 16px;font-size:.9375rem">Try a broader term or clear a filter.</p><button onclick="SOC.clearFilters()" style="background:#15171C;color:#fff;border:none;border-radius:8px;padding:10px 18px;font-size:.9375rem;font-weight:600">Reset filters</button></div>';
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
          + '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:26px;padding:0 8px;border-radius:8px;background:#15171C;color:#fff;font-family:var(--mono);font-size:.8125rem;font-weight:600;flex:none">' + w + '</span>'
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
    var fg = full ? '#1f7a4d' : '#474C57', bg = full ? '#F4F4F4' : '#F6E3E1';
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
      + '<div class="mono" style="font-size:.75rem;letter-spacing:.06em;color:var(--red);font-weight:600;margin-bottom:10px">READINGS AND MEDIA</div>'
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
    return '<div class="rise">' + hero + '<h2 style="font-size:1.35rem;line-height:1.2;margin:0 0 12px;color:var(--ink)">Browse the collection</h2>' + filterBar + grid + '</div>';
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
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:13px;flex-wrap:wrap"><span style="display:inline-flex;align-items:center;gap:7px;background:' + tm.soft + ';color:' + tm.color + ';font-size:.8125rem;font-weight:600;padding:5px 12px;border-radius:999px">' + ic(tm.icon, 15) + esc(r.type) + '</span>' + eyePill(r) + '<button onclick="SOC.week(' + r.week + ')" class="mono" style="font-size:.8125rem;color:#15171C;background:#EEF1F5;border:none;padding:4px 10px;border-radius:999px">Week ' + r.week + '</button><span class="mono" style="font-size:.8125rem;color:#474C57">' + esc(String(r.year)) + ' · ' + esc(r.origin) + '</span></div>'
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
      + '<button onclick="SOC.compare(\'' + r.id + '\')" style="width:100%;display:inline-flex;align-items:center;justify-content:center;gap:7px;border-radius:9px;padding:11px;font-size:.9375rem;font-weight:600;border:1px solid ' + (inC ? '#DEE3EA' : '#DEE3EA') + ';background:' + (inC ? '#EEF1F5' : '#fff') + ';color:' + (inC ? '#961A13' : '#15171C') + '">' + ic('columns', 16) + (inC ? 'In tray' : 'Compare') + '</button>'
      + '</div>'
      + '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:6px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">' + facts + '</div>'
      + '</aside></div></div>';
  }

  /* ---------- compare ---------- */
  function comparePickList() {
    var list = D.records.slice().sort(function (a, b) { return a.week - b.week || (a.eye === b.eye ? 0 : a.eye === 'western' ? -1 : 1); });
    return list.map(function (r) {
      var tm = typeMeta(r.type), sel = state.compareIds.indexOf(r.id) >= 0;
      return '<button onclick="SOC.compare(\'' + r.id + '\')" class="mapsrc" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:' + (sel ? '#EEF1F5' : 'none') + ';border:none;border-bottom:1px solid #EEF1F5;padding:10px 12px">'
        + '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:7px;background:' + tm.soft + ';color:' + tm.color + ';flex:none">' + ic(tm.icon, 14) + '</span>'
        + '<span style="flex:1;min-width:0"><span style="display:block;font-size:.8125rem;font-weight:600;color:#15171C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(r.title) + '</span><span style="display:block;font-size:.6875rem;color:#6B7280">Week ' + r.week + ' · ' + (r.eye === 'indigenous' ? 'Indigenous' : 'Western') + '</span></span>'
        + (sel ? '<span style="display:flex;color:#961A13;flex:none">' + ic('check', 16, 2.2) + '</span>' : '<span style="display:flex;color:#6b7280;flex:none">' + ic('plus', 16) + '</span>') + '</button>';
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
        + '<textarea oninput="SOC.cmpNote(\'' + key + '\',this.value)" aria-label="' + esc(title + ' notes') + '" placeholder="' + ph + '" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea></div>';
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
    if (correct === total) return { label: 'Strong grasp', color: 'var(--green)', bg: '#E9EFE7', icon: 'check', msg: 'You have a strong hold on this reading across every kind of question. The read-out below shows what came through.' };
    var pct = correct / total;
    if (pct >= 0.6) return { label: 'On your way', color: '#961A13', bg: '#EEF1F5', icon: 'book', msg: 'You have the core of this reading. The read-out below shows where you are strong and where to look again.' };
    if (pct >= 0.4) return { label: 'Building', color: '#961A13', bg: '#FBF4F3', icon: 'book', msg: 'You are part way into this reading. The read-out below shows what is landing and what to firm up.' };
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
      return '<div class="rise"><h1 style="font-size:1.75rem;margin:0 0 6px">Build Your Source Comprehension</h1><p class="lede" style="margin:0 0 18px">Pick one course source, including a reading, video, or audio item. Work through questions that build your understanding of it. Switch the lens to change the kind of questions you answer. Your answers save to your notes.</p>' + practiceNote + picks + '</div>';
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
        ? '<div style="margin-top:10px;background:#15171C;color:#fff;border-radius:10px;padding:13px 16px"><div class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#9aa3b2;margin-bottom:8px">A STRONG RESPONSE COVERS</div><ul style="margin:0;padding-left:17px;font-size:.875rem;line-height:1.55;color:rgba(255,255,255,.93)">' + crit.map(function (c) { return '<li style="margin-bottom:5px">' + esc(c) + '</li>'; }).join('') + '</ul>' + (coreIdea ? '<div style="margin-top:11px;padding-top:10px;border-top:1px solid rgba(255,255,255,.16);font-size:.85rem;line-height:1.5;color:rgba(255,255,255,.9)"><span style="color:#6B7280;font-weight:600">From this reading: </span>the central idea is ' + coreIdea + '</div>' : '') + '<div style="margin-top:11px;font-size:.78rem;color:#9aa3b2">Compare your answer against this. There is no single right wording.</div><button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:9px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:5px 11px;font-size:.78rem;font-weight:600">Hide</button></div>'
        : '<button onclick="SOC.rcReveal(\'' + key + '\')" style="margin-top:10px;background:none;border:1px solid #DEE3EA;border-radius:8px;padding:7px 13px;font-size:.82rem;font-weight:600;color:#15171C">Reveal a strong response</button>';
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:7px"><span style="display:inline-flex;width:24px;height:24px;align-items:center;justify-content:center;background:#15171C;color:#fff;border-radius:50%;font-size:.8rem;font-weight:700;flex:none">' + (i + 1) + '</span><p style="margin:0;font-size:.95rem;color:#15171C">' + esc(q) + '</p></div><textarea oninput="SOC.rcNote(\'' + key + '\',this.value)" aria-label="Answer source-practice question ' + (i + 1) + '" placeholder="Your answer" style="width:100%;min-height:68px;font:inherit;font-size:.9rem;line-height:1.5;padding:10px 12px;border:1px solid #DEE3EA;border-radius:8px;color:#15171C;background:#fff;resize:vertical">' + v + '</textarea>' + rev + '</div>';
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
          if (done && isCor) { bg = '#E9EFE7'; bd = 'var(--green)'; col = '#2c3b29'; }
          else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
          var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
          return '<button onclick="SOC.mcPick(\'' + mkey + '\',' + oi + ')" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.9rem;font-weight:500">' + esc(o) + mark + '</button>';
        }).join('');
        var ok = (sel === m.answer);
        var why = done ? '<div style="margin:9px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.9rem;color:' + (ok ? 'var(--green)' : '#b23121') + '">' + (ok ? ic('check', 15, 2.4) + 'Correct' : ic('x', 15, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.85rem;line-height:1.5;color:#474C57">' + esc(m.why || '') + '</div></div>' : '';
        return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:15px 17px;margin-bottom:11px"><p style="margin:0 0 9px;font-size:.95rem;font-weight:600;color:#15171C">' + (mi + 1) + '. ' + esc(m.q) + '</p>' + opts + why + '</div>';
      }).join('');
      var total = mcItems.length, pct = Math.round(100 * correct / total);
      var score = '<div style="margin:2px 0 16px;max-width:460px">'
        + '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:6px"><span style="font-size:.9rem;font-weight:700;color:#15171C">' + (answered ? 'You got ' + correct + ' of ' + total : 'Answer to fill the meter') + '</span><span style="font-size:.78rem;color:#6B7280">' + answered + ' of ' + total + ' answered</span></div>'
        + '<div style="height:11px;background:#EEF1F5;border-radius:999px;overflow:hidden"><div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,var(--green),#74a878);border-radius:999px;transition:width .35s ease"></div></div>'
        + (answered ? '' : '<p style="font-size:.8rem;color:#6B7280;margin:8px 0 0">Pick an answer to check it right away. You can change your choice.</p>') + '</div>';
      var band = (answered === total && total) ? rcBand(correct, total) : null;
      var pctLabel = band ? Math.round(100 * correct / total) + '%' : '';
      var diagLine = '';
      if (band) {
        var prof = rcSkillProfile(r.id, mcItems);
        if (prof.has) {
          if (prof.strengths.length) { var coreBit = (prof.strengths.indexOf(RC_SKILLS.argument) >= 0 && r.coreIdea) ? ' You have the central point, that ' + lcFirst(esc(String(r.coreIdea).replace(/\s*\.?\s*$/, ''))) + '.' : ''; diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:var(--green)">YOUR STRENGTHS</span><div style="font-size:.9rem;line-height:1.5;color:#15171C;margin-top:3px">Your answers show you read ' + listJoin(prof.strengths) + ' well.' + coreBit + '</div></div>'; }
          if (prof.opps.length) { var oppRows = prof.opps.map(function (o) { return '<div style="margin-top:7px"><span style="font-weight:600;color:#15171C">' + ucFirst(o.label) + '.</span> <span style="color:#474C57">' + (o.whys.length ? esc(o.whys.join(' ')) : 'Go back to this in the reading and read for it directly.') + '</span></div>'; }).join(''); diagLine += '<div style="margin-top:12px"><span class="mono" style="font-size:.66rem;letter-spacing:.05em;color:#961A13">AREAS OF OPPORTUNITY</span><div style="font-size:.875rem;line-height:1.5;color:#15171C;margin-top:1px">' + oppRows + '</div></div>'; }
          else diagLine += '<div style="margin-top:10px;font-size:.85rem;color:var(--green)">No gaps stood out. You handled the argument, the concepts, the context, and the significance, all of it.</div>';
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
    return '<div class="rise"><div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:4px"><h1 style="font-size:1.5rem;margin:0">Build Your Source Comprehension</h1><button onclick="SOC.rcClear()" style="margin-left:auto;background:none;border:none;color:var(--red);font-size:.875rem;font-weight:600">Choose a different source</button></div>'
      + practiceNote
      + '<div style="background:#15171C;color:#fff;border-radius:12px;padding:15px 18px;margin:8px 0 16px"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#9aa3b2;margin-bottom:3px">YOUR SOURCE</div><div style="font-size:1.0625rem;font-weight:600">' + esc(r.title) + '</div><div style="font-size:.875rem;color:rgba(255,255,255,.85)">Week ' + r.week + ' · ' + esc(r.authors) + ' · ' + esc(r.year) + '</div><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:10px;background:rgba(255,255,255,.14);border:none;color:#fff;border-radius:7px;padding:7px 13px;font-size:.85rem;font-weight:600">' + readLabel(r) + ' ↗</button></div>'
      + '<div style="font-size:.8125rem;font-weight:600;color:#15171C;margin-bottom:7px">Choose a lens (this changes the questions)</div><div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:6px">' + rcChips() + '</div><p style="font-size:.82rem;color:#6B7280;margin:0 0 16px">' + esc(lens.label) + ': ' + esc(lens.hint) + '.</p>'
      + zones
      + mcHtml
      + '<button onclick="SOC.saveReadingNotes()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:10px 18px;font-size:.9rem;font-weight:600;margin-top:8px">Save my notes</button></div>';
  }
  /* ---------- worked weaving (Raymond directive 2026-07-03): the app models one
     weaving for any pair, both eyes kept whole and attributed, then always hands
     the integration back to the student. The Week 14 final project stays the student's own. */
  function surnameOf(r) {
    if (r.id === 'tz-number12' || r.id === 'tz-nightmare20000') return 'The Twilight Zone';
    if (r.id === 'blackmirror-nosedive') return 'Black Mirror';
    if (r.id === 'letexier2019') return 'Le Texier';
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
      + '<div style="padding:13px 14px;border-bottom:1px solid #EEF1F5;flex:none"><div style="font-size:.9375rem;font-weight:600;color:#15171C">Course sources</div><div style="font-size:.75rem;color:#6B7280;margin-top:2px">' + recs.length + ' of 3 selected. Tap to add or remove.</div></div>'
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
        return '<div style="margin:5px 0;font-size:.8125rem;color:#15171C;line-height:1.5">' + eyePill(r) + ' <button onclick="SOC.open(\'' + r.id + '\')" style="background:none;border:none;padding:0;color:#961A13;font-weight:600;cursor:pointer">' + esc(r.authors) + '</button>. ' + esc(r.coreIdea) + '</div>';
      }).join('') : '';
      return '<div style="border:1px solid #DEE3EA;border-radius:12px;padding:10px 16px 15px;margin-bottom:14px;background:#fff"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#15171C;margin:6px 0 2px">WEEK ' + w + ' &middot; ' + esc(weekTitle(w)) + '</div>' + (cons || '<p style="color:#6B7280;font-size:.875rem">No concepts listed.</p>') + tk + '</div>';
    }).join('');
  }
  function glossarySearchHTML(q) {
    q = (q || '').toLowerCase().trim(); if (!q) return '';
    var hits = (D.glossary || []).filter(function (g) { return (g.term + ' ' + g.def).toLowerCase().indexOf(q) >= 0; });
    if (!hits.length) return '<p style="color:#6B7280;font-size:.875rem">No matches. Try another word.</p>';
    return '<div class="soc-cardgrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">' + hits.map(function (g) {
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:12px;padding:14px 16px"><div style="font-size:.9375rem;font-weight:600;color:#15171C">' + esc(g.term) + '</div><div style="font-size:.8125rem;line-height:1.55;color:#474C57;margin:4px 0 8px">' + esc(g.def) + '</div>' + (g.cite ? '<div style="font-size:.7rem;color:#6B7280;margin-bottom:8px">' + esc(g.cite) + '</div>' : '') + '<button onclick="SOC.glossWeekGo(' + g.week + ')" class="mono" style="font-size:.6875rem;color:#15171C;background:#EEF1F5;border:none;padding:3px 8px;border-radius:6px;cursor:pointer">Week ' + g.week + '</button></div>';
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
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#15171C;margin-bottom:6px">RECALL</span>'
      + '<span style="font-size:1.0625rem;font-weight:600;line-height:1.3;color:#15171C">' + esc(g.term) + '</span>'
      + '<span style="margin-top:auto;padding-top:14px;font-size:.8125rem;color:#961A13;font-weight:600">Reveal the definition &rarr;</span>'
      + '</span>'
      + '<span class="flip-face flip-back">'
      + '<span class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:8px">DEFINITION</span>'
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
      + '<p style="font-size:1rem;line-height:1.62;color:var(--ink);margin:0 0 10px">This instructor-created companion website supports weekly learning in ' + esc(code) + '. Students use this site for weekly learning pathways, readings, key concepts, immersive weekly experiences, and study supports. Blackboard remains the official Seneca course platform for announcements, assignment submission, grades, discussions, course records, and required administrative functions.</p>'
      + '<p style="font-size:.92rem;line-height:1.55;color:var(--ink-dim);margin:0">Use this site to learn and prepare. Use Blackboard for official instructions, submissions, grades, announcements, discussions, and course records.</p>'
      + '</section>';
  }
  function howToUseSiteHtml() {
    var steps = [
      'Start with the current week\'s learning pathway.',
      'Review the guiding questions and key concepts.',
      'Open the assigned readings and media.',
      'Enter the weekly experiences and use the self-checks to prepare for class and assessments.',
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
      'Enter the weekly experiences and use the self-checks to prepare for class and assessments.',
      'Use Blackboard for official announcements, assignment submission, discussions, grades, and course records.'
    ];
    return '<section class="node home-intro" aria-label="About this companion website" style="border-left:4px solid var(--red);border-radius:0 14px 14px 0;margin-bottom:16px">'
      + '<div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:8px">COMPANION WEBSITE</div>'
      + '<p style="font-size:1rem;line-height:1.6;color:var(--ink);margin:0"><strong>Learn and prepare here. Use Blackboard to submit work, get your grades, and read official announcements.</strong></p>'
      + '<details class="home-about"' + (isNew ? ' open' : '') + '>'
      + '<summary>What this site is for, and how to use it</summary>'
      + '<div class="home-about-body">'
      + '<p style="font-size:.96rem;line-height:1.6;color:var(--ink);margin:0 0 10px">This instructor-created companion website supports weekly learning in ' + esc(code) + '. Students use this site for weekly learning pathways, readings, key concepts, immersive weekly experiences, and study supports. Blackboard remains the official Seneca course platform for announcements, assignment submission, grades, discussions, course records, and required administrative functions.</p>'
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
      + '<rect x="10" y="20" width="330" height="190" rx="14" fill="#F7F9FB" stroke="#15171C" stroke-width="2"/>'
      + '<text x="30" y="52" font-size="15" font-weight="700" fill="#15171C" style="letter-spacing:.06em">THIS SITE</text>'
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
      + '<line x1="415" y1="150" x2="348" y2="150" stroke="#15171C" stroke-width="2.5"/>'
      + '<polygon points="348,150 360,144 360,156" fill="#15171C"/>'
      + '<text x="380" y="172" font-size="11.5" font-weight="600" fill="#15171C" text-anchor="middle">study, review</text>'
      + '<text x="380" y="242" font-size="13" font-weight="700" fill="#15171C" text-anchor="middle">If the two ever disagree, Blackboard is the source of truth.</text>'
      + '</svg>';
    return '<section class="node" aria-labelledby="bbd-h" style="margin:16px 0">'
      + '<h2 id="bbd-h" class="wk-sec">How this site works with Blackboard</h2>'
      + '<p style="margin:0 0 14px;font-size:.95rem;line-height:1.6;color:var(--ink-dim)">Think of the two as one loop. You learn and practice here: the weekly pathway, readings, concepts, checks, and notes. You act on Blackboard: every submission, discussion post, grade, and official date lives there. Nothing you do on this site is graded or visible to anyone, and nothing here replaces a Blackboard step.</p>'
      + svg
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:14px">'
      + '<a href="' + BB_URL + '" target="_blank" rel="noopener" class="wk-cta" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px">Open Blackboard <span aria-hidden="true">&#8599;</span></a>'
      + '<button type="button" onclick="SOC.go(\'calendar\')" class="wk-cta" style="background:#fff;color:#15171C;border:1px solid #15171C">Open course calendar</button>'
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
      ['STUDY', 'What this site is for', 'Use this companion website for weekly learning pathways, readings, key concepts, immersive weekly experiences, self-checks, glossary materials, and study supports.'],
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
      + '<section class="exp-card" style="border-left-color:#15171C;background:#fff;border:1px solid #DEE3EA;border-left:5px solid #15171C;border-radius:14px;padding:20px 22px;margin:0 0 20px" aria-label="Clear saved work"><div class="mono" style="font-size:.68rem;letter-spacing:.08em;color:#15171C;font-weight:700">SHARED OR LAB COMPUTER?</div><h2 style="margin:4px 0 8px;font-size:1.1rem">Clear my saved work on this device</h2><p style="font-size:.9rem;line-height:1.55;margin:0 0 12px">Removes every note, check answer, and setting this site has saved in this browser. Download your weekly notes first if you want to keep them.</p><button type="button" class="wk-cta" style="margin:0" onclick="SOC.clearMyWork()">Clear everything saved here</button></section>'
      + '</div>';
  }
  function screenAnnounceText() {
    if (state.screen === 'station') return 'Week ' + state.stationWeek + ': ' + weekTitle(state.stationWeek);
    if (state.screen === 'site') return 'How This Site Works';
    if (state.screen === 'calendar') return 'Calendar and Due Dates';
    if (state.screen === 'pathways') return 'Course Pathways';
    if (state.screen === 'contexts') return 'Cultural Comparison Lab';
    if (state.screen === 'synthesis') return 'Course Synthesis';
    if (state.screen === 'readings') return 'Readings and Media';
    if (state.screen === 'compare') return 'Compare Sources';
    if (state.screen === 'reading') return 'Source Practice';
    if (state.screen === 'walkthroughs') return 'Weekly Experiences';
    if (state.screen === 'videos') return 'Videos and Podcasts';
    if (state.screen === 'glossary') return 'Glossary';
    if (state.screen === 'cards') return 'Concept Flashcards';
    if (state.screen === 'assignments') return 'Understanding Your Assignment';
    if (state.screen === 'career') return 'Career Choices';
    if (state.screen === 'map') return 'Personal Cartography';
    if (state.screen === 'activity') return 'Activity';
    if (state.screen === 'detail') return 'Reading Details';
    if (state.screen && state.screen.indexOf('assignment') === 0) return 'Understanding Your Assignment';
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
  function explorationMark(bucket, id) {
    if (!id) return false;
    state.visits = state.visits || {};
    state.visits[bucket] = state.visits[bucket] || {};
    id = String(id);
    if (state.visits[bucket][id]) return false;
    state.visits[bucket][id] = Date.now();
    persist();
    return true;
  }
  function explorationProgress() {
    var v = state.visits || {}, weeks = Object.keys(v.weeks || {}).length;
    var core = ['site','calendar','pathways','contexts','synthesis','walkthroughs','readings','compare','reading','videos','assignments'];
    var screens = core.filter(function (s) { return !!(v.screens && v.screens[s]); }).length;
    var rooms = Object.keys(v.walkRooms || {}).length, sources = Object.keys(v.sources || {}).length;
    var meaning = 0;
    if (contextSelected().length) meaning++;
    if (Object.keys(state.wkReflect || {}).some(function (w) { return String(state.wkReflect[w] || '').trim().length >= 12; })) meaning++;
    if ((state.kcHist && Object.keys(state.kcHist).length) || Object.keys(state.spotReports || {}).length) meaning++;
    var pct = 40 * Math.min(1, weeks / Math.max(1, journeyWeeks().length))
      + 15 * Math.min(1, screens / core.length)
      + 25 * Math.min(1, rooms / 30)
      + 15 * Math.min(1, sources / 12)
      + 5 * Math.min(1, meaning / 3);
    return { pct: Math.max(0, Math.min(100, Math.round(pct))), weeks: weeks, screens: screens, rooms: rooms, sources: sources, meaning: meaning };
  }

  var _spot = null, spotFocus = null, spotInviteTimer = null, sessionExplorationMoves = 0;
  function markSessionExploration() { sessionExplorationMoves++; }
  var SPOT_RUBRIC = {
    Concepts: { plain: 'Use a course idea accurately and explain what it helps you notice.', rubric: 'accurate concept use and coherence', try: 'Define the idea without notes. Then apply it to one specific public, fictional, or general example.' },
    Evidence: { plain: 'Use a source to support a careful claim and say what the evidence cannot prove.', rubric: 'grounding, evidence, and a stated limit', try: 'Complete two sentences for one source: “The evidence supports...” and “The evidence does not establish...”' },
    Attribution: { plain: 'Name who an idea comes from and keep that source’s purpose and context visible.', rubric: 'respectful engagement and both eyes held on their own terms', try: 'For every important idea, name the scholar or knowledge holder and explain what question that source is answering.' },
    Comparison: { plain: 'Show how sources or contexts differ, then connect them without blending them into one.', rubric: 'seeing difference and braiding', try: 'Write one sentence for what each source contributes before you write any sentence that connects them.' },
    Categories: { plain: 'Ask who created a category, what it measures, and which differences it hides.', rubric: 'specificity and attention to definition and measurement', try: 'Take one category from the course. Name its maker, purpose, consequence, and one kind of variation it compresses.' },
    Institutions: { plain: 'Move beyond individual choices and identify the law, policy, market, organization, or research setting shaping the outcome.', rubric: 'a real structural question and accurate social-science application', try: 'Circle the institution in your example. Then explain one rule or practice through which it affects people.' },
    Transfer: { plain: 'Apply an idea to a new case without assuming the people, histories, or categories are the same.', rubric: 'specificity and responsible application', try: 'Name what travels into the new case, what does not travel, and what extra evidence you would need.' },
    Synthesis: { plain: 'Build one clear account across several ideas while keeping their evidence and limits visible.', rubric: 'integration and coherence', try: 'State the shared question first. Then give each source a distinct job before drawing the connection.' }
  };
  function spotSkillInfo(skill) { return SPOT_RUBRIC[skill] || { plain: 'Explain the course idea clearly and test it against the evidence.', rubric: 'course understanding', try: 'Return to the named source, explain the idea once without notes, and test it on a specific example.' }; }
  var SPOT_FEEDBACK = {
    strong: [
      'You distinguished the course ideas under pressure and usually chose the bounded claim over the fluent overstatement. That is the recognition base strong assessment work needs.',
      'Your responses show that the central distinctions are holding: source and assumption, culture and racialization, comparison and equivalence, evidence and proof. The next challenge is to construct those distinctions in your own example.',
      'You read this set with control. Your strongest move was keeping context, attribution, and evidence limits visible at the same time instead of reaching for the broadest answer.'
    ],
    grounded: [
      'The foundation is holding. Most of your choices were defensible, but one or two distinctions still blurred when the question moved from recognition into application.',
      'You have the spine of this material. The report below shows the specific places where your reasoning is grounded and the places where a familiar-looking option pulled you away from the source.',
      'Your understanding is usable, not yet automatic. You can recognize the stronger move in most cases; revisiting the named edges will make your next comparison more precise.'
    ],
    developing: [
      'This is a real developing understanding: you recognize several course ideas, but some answers still rely on broad categories, confident wording, or description where the question requires evidence and limits.',
      'You are partway from seeing the concept to using it. The pattern below is more useful than the total score: it identifies exactly which distinctions are beginning to hold and which need another encounter.',
      'Some of the course language is familiar, but application remains uneven. Slow down at the point where a source changes purpose, a category changes country, or a claim exceeds its evidence.'
    ],
    starting: [
      'The key distinction in this form is not reliable yet. That does not measure your effort or predict your grade. It tells you where to focus: rebuild the idea, test it against the source, and explain it once without notes.',
      'This check caught the misunderstanding early, which is useful. Do not reread everything. Start with the first priority below, compare your answers with the evidence, and practise one clear explanation in your own words.',
      'Some answer choices sounded plausible but were not the best match for the course evidence. The goal now is not to memorize letters; it is to learn the rule that makes one answer stronger than the others.'
    ]
  };
  function spotData() { return window.SOC122_SPOT_CHECKS || { early: [], middle: [], deep: [], forms: [] }; }
  function spotForms() { return spotData().forms || []; }
  function spotForm(id) { var forms = spotForms(); for (var i = 0; i < forms.length; i++) if (forms[i].id === id) return forms[i]; return null; }
  function spotHash(s) { var h = 2166136261, str = String(s || ''); for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function spotInferSkill(q, fallback) {
    var t = String(q || '').toLowerCase();
    if (/indigenous|two-eyed|etuaptmumk|source|scholar|knowledge holder|citation/.test(t)) return 'Attribution';
    if (/sample|evidence|measure|claim|valid|reliab|prove|support|archive|statistic|number/.test(t)) return 'Evidence';
    if (/law|institution|policy|state|market|system|power|structure/.test(t)) return 'Institutions';
    if (/race|category|classif|census|identity/.test(t)) return 'Categories';
    if (/compare|culture|difference|same|equivalent|context/.test(t)) return 'Comparison';
    if (/apply|responsib|transfer|action|assessment/.test(t)) return 'Transfer';
    return fallback || 'Concepts';
  }
  function spotNormalize(m, w, fallback, prefix) {
    if (!m || !m.q || !Array.isArray(m.options) || m.options.length < 4 || m.answer == null) return null;
    return { id: (prefix || 'q') + '-' + kcHashKey(m.q), q: m.q, options: m.options.slice(), answer: Number(m.answer), why: m.why || 'Return to the named source and test each option against what the evidence actually supports.', week: Number(m.week || w || 0), skill: m.skill || spotInferSkill(m.q, fallback), revisit: m.revisit || ('Week ' + (m.week || w) + ': revisit the relevant source and key concept'), diff: Number(m.diff || 2) };
  }
  function spotQuestionSet(form) {
    var data = spotData(), levels = form.tier === 1 ? [data.early] : form.tier === 2 ? [data.early, data.middle] : form.tier === 3 ? [data.middle, data.deep] : [data.deep, data.middle];
    var pool = [], seen = {};
    levels.forEach(function (bank) { (bank || []).forEach(function (m) { var q = spotNormalize(m, m.week, form.focus[0], 'spot'); if (q && !seen[q.q]) { seen[q.q] = 1; pool.push(q); } }); });
    var visited = Object.keys((state.visits && state.visits.weeks) || {}).map(Number).filter(function (w) { return isFinite(w); });
    if (!visited.length) visited = journeyWeeks().slice(0, Math.max(3, form.tier * 3));
    visited.forEach(function (w) {
      recordsForWeek(w).forEach(function (r) { (MC[r.id] || []).forEach(function (m) { var q = spotNormalize(m, w, form.focus[0], 'mc'); if (q && !seen[q.q]) { seen[q.q] = 1; pool.push(q); } }); });
      ((window.SOC122_KC || {})[w] || []).forEach(function (m) { if (m.type === 'short') return; var q = spotNormalize(m, w, form.focus[0], 'kc'); if (q && !seen[q.q]) { seen[q.q] = 1; pool.push(q); } });
    });
    var qseen = (state.spotState && state.spotState.questionSeen) || {};
    pool.sort(function (a, b) {
      function rank(x) { var focus = form.focus.indexOf(x.skill); return (focus < 0 ? 18 : focus * 4) + Math.min(9, qseen[x.id] || 0) * 5 + Math.abs((x.diff || 2) - Math.min(3, form.tier)) * 2 + (spotHash(form.id + '|' + x.id) % 1000) / 1000; }
      return rank(a) - rank(b);
    });
    var out = pool.slice(0, form.count);
    if (out.length < form.count) {
      (data.early || []).concat(data.middle || [], data.deep || []).forEach(function (m) { var q = spotNormalize(m, m.week, form.focus[0], 'fill'); if (q && !out.some(function (x) { return x.q === q.q; }) && out.length < form.count) out.push(q); });
    }
    return out;
  }
  function spotNextForm(threshold) {
    var forms = spotForms().filter(function (f) { return f.threshold === threshold; }); if (!forms.length) return null;
    state.spotState = state.spotState || {}; state.spotState.formChoice = state.spotState.formChoice || {};
    var chosen = state.spotState.formChoice[threshold], found = chosen && spotForm(chosen); if (found) return found;
    var n = 0;
    try { var a = new Uint32Array(1); crypto.getRandomValues(a); n = a[0] % forms.length; } catch (e) { n = spotHash(String(Date.now()) + '|' + threshold) % forms.length; }
    state.spotState.formChoice[threshold] = forms[n].id; persist(); return forms[n];
  }
  function spotNextThreshold(pct) {
    var prompted = (state.spotState && state.spotState.thresholdPrompted) || {};
    var thresholds = [20, 40, 65, 85];
    for (var i = 0; i < thresholds.length; i++) if (pct >= thresholds[i] && !prompted[thresholds[i]]) return thresholds[i];
    return null;
  }
  function spotTrap(box) {
    if (box.getAttribute('data-spot-trap') === '1') return;
    box.setAttribute('data-spot-trap', '1');
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); if (box.id === 'spot-invite') SOC.spotDismiss(Number(box.getAttribute('data-threshold'))); else SOC.spotClose(); return; }
      if (e.key !== 'Tab') return;
      var els = box.querySelectorAll('button:not([disabled]),a[href],select,textarea,[tabindex]:not([tabindex="-1"])'); if (!els.length) return;
      var first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  function showSpotInvite(form, pct) {
    if (!form || document.getElementById('spot-invite') || document.getElementById('spot-check')) return;
    spotFocus = document.activeElement;
    var wing = form.tier, box = document.createElement('div');
    box.id = 'spot-invite'; box.className = 'spot-overlay'; box.setAttribute('data-threshold', form.threshold); box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'spot-invite-title');
    box.innerHTML = '<section class="spot-invite-card"><div class="spot-eyebrow">REFLECTION WING ' + wing + ' UNLOCKED</div><div class="spot-gauge" aria-label="' + pct + ' percent of the course pathway explored"><i style="width:' + pct + '%"></i></div><span class="spot-percent">' + pct + '% of the course pathway explored on this device</span><h2 id="spot-invite-title">Want to find out what is holding?</h2><p>' + esc(form.subtitle) + '. This optional ' + form.count + '-question check is automatically scored and thoroughly evaluated, but it is worth no course marks and stays private on this device.</p><div class="spot-invite-actions"><button type="button" onclick="SOC.spotStart(\'' + form.id + '\')">Enter this reflection room</button><button type="button" class="secondary" onclick="SOC.spotDismiss(' + form.threshold + ')">Skip this benchmark</button></div><small>Only four benchmark invitations can appear. One of fifteen different forms is selected locally so students do not all receive the same check.</small></section>';
    document.body.appendChild(box); spotTrap(box); setTimeout(function () { var b = box.querySelector('button'); if (b) b.focus(); }, 0);
  }
  function maybeSpotInvite() {
    clearTimeout(spotInviteTimer);
    spotInviteTimer = setTimeout(function () {
      /* Never offer a Reflection Wing on arrival. A student must make a
         deliberate course-navigation move in this browser session first. */
      if (sessionExplorationMoves < 1) return;
      if (document.getElementById('walk-overlay') || document.getElementById('spot-invite') || document.getElementById('spot-check') || document.getElementById('upcoming-reminder')) return;
      var p = explorationProgress(), threshold = spotNextThreshold(p.pct); if (!threshold) return;
      var sessionKey = SKEY + '.spotPrompt.session';
      try { if (sessionStorage.getItem(sessionKey) === '1') return; sessionStorage.setItem(sessionKey, '1'); } catch (e) {}
      showSpotInvite(spotNextForm(threshold), p.pct);
    }, 650);
  }
  function spotBuildReport() {
    var form = _spot.form, qs = _spot.questions, answers = _spot.answers, confidence = _spot.confidence, by = {}, missed = [], review = [], correct = 0, confidentMisses = 0;
    var confidenceCounts = { sure: 0, mid: 0, guess: 0, unstated: 0 }, confidenceLabel = { sure: 'I was sure', mid: 'I thought so', guess: 'I was guessing' };
    qs.forEach(function (q, i) {
      var ok = answers[i] === q.answer; if (ok) correct++;
      by[q.skill] = by[q.skill] || { right: 0, total: 0 }; by[q.skill].total++; if (ok) by[q.skill].right++;
      if (!ok) { missed.push(q); if (confidence[i] === 'sure') confidentMisses++; }
      confidenceCounts[confidence[i] || 'unstated']++;
      review.push({ q: q.q, skill: q.skill, correct: ok, chosen: q.options[answers[i]] || '(not answered)', strongest: q.options[q.answer] || '', why: q.why, confidence: confidenceLabel[confidence[i]] || 'I did not choose a confidence level', revisit: q.revisit });
    });
    var skills = Object.keys(by), strengths = skills.filter(function (s) { return by[s].right / by[s].total >= .75; }), edges = skills.filter(function (s) { return by[s].right / by[s].total < .75; });
    var pct = Math.round(100 * correct / Math.max(1, qs.length)), key = pct >= 85 ? 'strong' : pct >= 70 ? 'grounded' : pct >= 50 ? 'developing' : 'starting';
    var band = key === 'strong' ? 'Strong recognition; now make it your own' : key === 'grounded' ? 'A sound base, with a few points to repair' : key === 'developing' ? 'Some ideas are holding; others still blur' : 'Start here: rebuild the core distinction';
    var templates = SPOT_FEEDBACK[key], feedback = templates[spotHash(form.id + '|' + pct + '|' + correct) % templates.length];
    var revisits = []; missed.forEach(function (q) { if (revisits.indexOf(q.revisit) < 0) revisits.push(q.revisit); });
    var priority = edges.slice().sort(function (a, b) { var ap = by[a].right / by[a].total, bp = by[b].right / by[b].total; return ap - bp || by[b].total - by[a].total; })[0] || '';
    var tested = skills.length === 1 ? skills[0] : listJoin(skills);
    var pattern = correct === 0
      ? 'None of the ' + qs.length + ' answers matched the best-supported response. Because the pattern is consistent across the form, this is more useful than five unrelated mistakes: the underlying ' + tested.toLowerCase() + ' distinction needs to be rebuilt before you add more details.'
      : correct === qs.length
        ? 'Every answer matched the best-supported response. That shows reliable recognition in this form. The next test is harder: explain the same ideas in your own example without answer choices.'
        : correct + ' of ' + qs.length + ' answers matched the best-supported response. The mixed pattern means some recognition is present, but it is not yet reliable when the wording, source, or setting changes.';
    var confidenceNote = confidentMisses >= 2
      ? 'You were sure about ' + confidentMisses + ' answer' + (confidentMisses === 1 ? '' : 's') + ' that did not match the evidence. That usually means a plausible but inaccurate rule is competing with the course idea. Compare each confident answer with the best-supported answer and explain why the evidence favours one.'
      : confidentMisses === 1
        ? 'One confident answer did not match the evidence. Repair that item first: confident misunderstandings are more likely to travel into later work than an unsure guess.'
        : missed.length
          ? 'Your missed answers were not marked “Sure.” That is a healthy sign of uncertainty. Use the explanations below to turn the uncertainty into a clear rule you can state in your own words.'
          : 'Your confidence and accuracy were well aligned in this form. Keep checking that confidence against source evidence when you move into your own writing.';
    var nextSteps = [];
    if (priority) nextSteps.push(spotSkillInfo(priority).try);
    if (revisits.length) nextSteps.push('Revisit ' + listJoin(revisits.slice(0, 2)) + '. Read for the exact distinction named in the feedback; do not reread the entire week without a question.');
    nextSteps.push('Close the source and explain, in two or three sentences, why the best-supported answer is stronger than the answer you first chose. Use a public, fictional, or general example.');
    var readyWhen = priority ? 'You are ready to move forward when you can ' + spotSkillInfo(priority).plain.charAt(0).toLowerCase() + spotSkillInfo(priority).plain.slice(1) + ' Then state one limit without looking at the answer choices.' : 'You are ready to move forward when you can explain the pattern in a new example and state one evidence limit without looking at the answer choices.';
    return { formId: form.id, title: form.title, tier: form.tier, date: new Date().toISOString(), explorationProgress: explorationProgress().pct, correct: correct, total: qs.length, pct: pct, band: band, feedback: feedback, pattern: pattern, strengths: strengths, edges: edges, priority: priority, skillProfile: by, confidentMisses: confidentMisses, confidenceCounts: confidenceCounts, confidenceNote: confidenceNote, nextSteps: nextSteps, readyWhen: readyWhen, revisits: revisits.slice(0, 5), review: review };
  }
  function spotReportHtml(report) {
    function skillList(list, empty) { return list.length ? list.map(function (s) { var info = spotSkillInfo(s); return '<li><b>' + esc(s) + '</b><span>' + esc(info.plain) + '</span><small>Rubric connection: ' + esc(info.rubric) + '</small></li>'; }).join('') : '<li><span>' + esc(empty) + '</span></li>'; }
    var skillRows = Object.keys(report.skillProfile || {}).map(function (s) { var p = report.skillProfile[s], info = spotSkillInfo(s); return '<div><b>' + esc(s) + '</b><span>' + p.right + ' of ' + p.total + '</span><i><u style="width:' + Math.round(100 * p.right / Math.max(1, p.total)) + '%"></u></i><small>' + esc(info.plain) + '<br>Rubric connection: ' + esc(info.rubric) + '</small></div>'; }).join('');
    var review = (report.review || []).map(function (m, i) { return '<details class="' + (m.correct ? 'correct' : 'miss') + '"' + (m.correct ? '' : ' open') + '><summary><span>' + (m.correct ? '&#10003;' : '&#8594;') + '</span>' + (i + 1) + '. ' + esc(m.q) + '</summary><div><p><b>Your answer:</b> ' + esc(m.chosen) + '</p>' + (m.correct ? '' : '<p><b>Best-supported answer:</b> ' + esc(m.strongest) + '</p>') + '<p><b>Why this answer is better supported:</b> ' + esc(m.why) + '</p><p><b>Your confidence:</b> ' + esc(m.confidence) + '</p><small>Return to: ' + esc(m.revisit) + '</small></div></details>'; }).join('');
    var plan = (report.nextSteps || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    var rubricLinks = Object.keys(report.skillProfile || {}).map(function (s) { return spotSkillInfo(s).rubric; });
    return '<div class="spot-report"><div class="spot-eyebrow">SCORED PRACTICE | PRIVATE FEEDBACK REPORT</div><h2 id="spot-check-title">' + esc(report.band) + '</h2><div class="spot-report-score"><strong>' + report.correct + '<span> / ' + report.total + '</span></strong><div><b>' + report.pct + '% on this practice check</b><p>This means ' + report.correct + ' answer' + (report.correct === 1 ? '' : 's') + ' matched the best-supported response. It is worth no course marks and does not predict an assessment grade.</p></div></div>'
      + '<section class="spot-pattern"><h3>What this result suggests</h3><p>' + esc(report.pattern) + '</p><p>' + esc(report.feedback) + '</p></section>'
      + '<div class="spot-report-grid"><section><h3>What is beginning to hold</h3><ul>' + skillList(report.strengths, 'This short form did not show a stable strength yet. That does not mean you know nothing; it means there was not a reliable pattern to name.') + '</ul></section><section><h3>First priority</h3><ul>' + skillList(report.priority ? [report.priority] : [], 'No urgent repair appeared in this form. Your next task is to explain the ideas without answer choices.') + '</ul></section></div>'
      + '<div class="spot-calibration"><b>Check your confidence</b><span>' + esc(report.confidenceNote) + '</span></div>'
      + '<section class="spot-action-plan"><h3>Your next 15 minutes</h3><ol>' + plan + '</ol><p><b>Move forward when:</b> ' + esc(report.readyWhen) + '</p></section>'
      + '<section class="spot-skill-profile"><h3>Your skill-by-skill picture</h3><p>The bars show only this form. The plain-language descriptions explain the skill; the rubric terms show where it appears in graded work. These are not criterion grades.</p>' + skillRows + '</section>'
      + '<section class="spot-rubric-note"><h3>How this connects to graded work</h3><p>This form practised ' + esc(listJoin(rubricLinks)) + '. Your actual assessments also require your own examples, positioning, source choices, reflection, and construction of the comparison. A multiple-choice check cannot evaluate ownership, growth across time, your recorded voice, or whether you genuinely build the connection. Those must appear in your work.</p></section>'
      + '<section class="spot-revisit"><h3>Question-by-question feedback</h3><p>Items that need attention are open already. Compare your answer with the best-supported answer, read why the evidence favours it, and use the named return point.</p>' + review + '</section>'
      + '<div class="spot-report-actions"><button type="button" onclick="SOC.spotSaveReport()">Save this feedback report</button><button type="button" class="secondary" onclick="SOC.spotClose()">Return to the classroom</button></div></div>';
  }
  function spotRender() {
    var box = document.getElementById('spot-check'); if (!box || !_spot) return;
    if (_spot.report) { box.innerHTML = '<section class="spot-check-card report-mode">' + spotReportHtml(_spot.report) + '</section>'; spotTrap(box); setTimeout(function () { var h = box.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus(); } }, 0); return; }
    var q = _spot.questions[_spot.i], answered = _spot.answers[_spot.i] != null, conf = _spot.confidence[_spot.i] || '';
    var opts = q.options.map(function (o, i) { var on = _spot.answers[_spot.i] === i; return '<button type="button" class="spot-option' + (on ? ' on' : '') + '" aria-pressed="' + on + '" onclick="SOC.spotAnswer(' + i + ')"><span>' + String.fromCharCode(65 + i) + '</span>' + esc(o) + '</button>'; }).join('');
    var confidence = answered ? '<div class="spot-confidence"><span>How certain are you?</span>' + [['sure','Sure'],['mid','Think so'],['guess','Guessing']].map(function (c) { return '<button type="button" class="' + (conf === c[0] ? 'on' : '') + '" aria-pressed="' + (conf === c[0]) + '" onclick="SOC.spotConfidence(\'' + c[0] + '\')">' + c[1] + '</button>'; }).join('') + '</div>' : '';
    box.innerHTML = '<section class="spot-check-card"><header><div><div class="spot-eyebrow">REFLECTION WING ' + _spot.form.tier + ' | ' + esc(_spot.form.title.toUpperCase()) + '</div><span>Question ' + (_spot.i + 1) + ' of ' + _spot.questions.length + '</span></div><button type="button" class="spot-x" onclick="SOC.spotClose()" aria-label="Close this spot check">&#215;</button></header><div class="spot-question-progress"><i style="width:' + ((_spot.i + 1) / _spot.questions.length * 100) + '%"></i></div><main><div class="spot-skill">' + esc(q.skill) + '</div><h2 id="spot-check-title">' + esc(q.q) + '</h2><div class="spot-options">' + opts + '</div>' + confidence + '</main><footer><button type="button" class="secondary" onclick="SOC.spotNav(-1)"' + (_spot.i === 0 ? ' disabled' : '') + '>Previous</button><span>Answers stay hidden until the report.</span><button type="button" onclick="SOC.spotNav(1)"' + (!answered ? ' disabled' : '') + '>' + (_spot.i === _spot.questions.length - 1 ? 'See my feedback' : 'Next question') + '</button></footer></section>';
    spotTrap(box);
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
        if (sec.id === 'wk-ov' || sec.id === 'wk-idea' || sec.id === keepId || !sec.querySelector('h2.wk-sec')) return;
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
      if (!h || sec.id === 'wk-idea' || h.parentElement !== sec || h.querySelector('.wk-coll-btn')) return;
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
  function courseProgressPanel() {
    var ws = journeyWeeks();
    var visits = (state.visits && state.visits.weeks) || {};
    var opened = ws.filter(function (w) { return !!visits[w]; });
    var worked = ws.filter(weekHasWork);
    var pct = ws.length ? Math.round((opened.length / ws.length) * 100) : 0;
    var phases = [
      { title: 'Foundations and responsibility', weeks: [1, 2, 3, 4], note: 'What social science is, Two-Eyed Seeing, Indigenous Canada, and Truth and Reconciliation.' },
      { title: 'Methods and anthropology', weeks: [5, 6, 7], note: 'How claims are built, how culture is studied, and what the first half holds together.' },
      { title: 'Sociology and psychology', weeks: [8, 9, 10, 11], note: 'How disciplines formed, what they reveal, and how power shapes their questions and evidence.' },
      { title: 'Family and integration', weeks: [12, 13, 14], note: 'Kinship, responsibility, revisiting the map, and carrying the course forward.' }
    ];
    var phaseHtml = phases.map(function (p) {
      var n = p.weeks.filter(function (w) { return !!visits[w]; }).length;
      var wp = Math.round((n / p.weeks.length) * 100);
      return '<article class="progress-phase"><div><b>' + esc(p.title) + '</b><span>' + n + ' of ' + p.weeks.length + ' weeks opened</span></div><div class="progress-track" aria-hidden="true"><i style="width:' + wp + '%"></i></div><p>' + esc(p.note) + '</p></article>';
    }).join('');
    var weekButtons = ws.map(function (w) {
      var isOpen = !!visits[w], hasWork = worked.indexOf(w) >= 0;
      return '<button type="button" class="progress-week' + (isOpen ? ' opened' : '') + (hasWork ? ' worked' : '') + '" onclick="SOC.station(' + w + ')" aria-label="Open Week ' + w + ': ' + esc(weekTitle(w)) + (hasWork ? '. Work saved on this device.' : (isOpen ? '. Opened on this device.' : '. Not opened on this device.')) + '"><span>' + w + '</span>' + (hasWork ? '<i aria-hidden="true"></i>' : '') + '</button>';
    }).join('');
    return '<section class="node course-progress" aria-labelledby="course-progress-title"><div class="progress-head"><div><div class="mono">YOUR COURSE MAP</div><h2 id="course-progress-title">You have opened ' + opened.length + ' of ' + ws.length + ' weeks</h2></div><strong aria-label="' + pct + ' percent of weeks opened">' + pct + '%</strong></div><div class="progress-weeks" role="list" aria-label="Course weeks">' + weekButtons + '</div><div class="progress-phases">' + phaseHtml + '</div><p class="progress-note">This is a private orientation aid, not a grade. A week is counted when you open it on this device. A small red marker appears after you write a reflection, try a Knowledge Check, or save a note. Nothing is sent to the instructor or to a server.</p></section>';
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
    return r ? '<button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:6px;align-self:flex-start;background:none;border:none;color:#961A13;font-size:.78rem;font-weight:600;padding:0;cursor:pointer">Open the reading &#8599;</button>' : '';
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
      if (done && isCor) { bg = '#E9EFE7'; bd = 'var(--green)'; col = '#2c3b29'; }
      else if (done && isSel) { bg = '#F6E3E1'; bd = '#DA291C'; col = '#8f1b12'; }
      var mark = (done && isCor) ? ' &#10003;' : ((done && isSel) ? ' &#10007;' : '');
      return '<button onclick="SOC.mcPick(\'' + key + '\',' + oi + ')" aria-pressed="' + (isSel ? 'true' : 'false') + '" style="display:block;width:100%;text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:8px;padding:9px 12px;margin-bottom:7px;font-size:.875rem;font-weight:500;cursor:pointer">' + esc(o) + mark + '</button>';
    }).join('');
    var why = done ? '<div style="margin:8px 0 0;padding:10px 13px;border-radius:9px;background:' + (ok ? '#E9EFE7' : '#FBE9E7') + ';border:1px solid ' + (ok ? '#9CC4A8' : '#E5A9A2') + '"><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:.875rem;color:' + (ok ? 'var(--green)' : '#b23121') + '">' + (ok ? ic('check', 14, 2.4) + 'Correct' : ic('x', 14, 2.4) + 'Not quite') + '</span><div style="margin-top:4px;font-size:.84rem;line-height:1.5;color:#474C57">' + esc(check.why) + '</div></div>' : '';
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
    var panels = (west ? studioPanel('WESTERN EYE', west.authors, west.coreIdea, west.title + ' (' + west.year + ')', 'eye', '#15171C', west) : '')
      + studioPanel('INDIGENOUS EYE', ind.authors, ind.coreIdea, ind.title + ' (' + ind.year + ')', 'eye', '#961A13', ind);
    var soloNote = west ? '' : '<div style="margin-top:12px;background:#F4F4F4;border:1px solid #c4ddcf;border-radius:11px;padding:12px 15px;font-size:.85rem;line-height:1.55;color:#961A13">This week centres Indigenous knowledge; there is no separate Western-eye reading to set beside it. That is itself a Two-Eyed Seeing observation: not every topic carries a Western counterpart, and the Indigenous frame stands on its own here.</div>';
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
    var panels = studioPanel('CLAIM', r.title, r.coreIdea, r.authors + ' (' + r.year + ')', 'book', '#961A13')
      + studioPanel('EVIDENCE', ev ? ev.q : 'What supports the claim?', ev ? ev.why : firstSentence(r.abstract), 'Ground this in the reading before applying it.', 'search', '#1f7a4d')
      + studioPanel('BOUNDARY', 'What this does not prove', 'Do not turn this idea into a rule for every learner. Check the context, supports, workload, strategy, and evidence before giving advice.', g ? g.term : 'Course concept', 'x', '#6B7280')
      + studioPanel('TRANSFER', 'Academic next step', 'Name one course task, one support, one study strategy, and one sign that the strategy is working.', 'No clinical or diagnostic framing.', 'external', '#961A13');
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

  var MAP_CAVEAT = 'This self-contained teaching map is not a legal or definitive boundary map. Its approximate reading anchors connect assigned Indigenous scholars with the Nations and places they identify. For authoritative representations of territories and treaties, consult the Nations themselves and sources such as Native-Land.ca.';
  var MAP_REGIONS = [
    { id: 'mikmaki-lawrence', region: "Mi'kma'ki (Atlantic)", admin: 'NS / NB / PEI / NL', nation: "Mi'kmaw", scholar: 'Bonita Lawrence', records: ['lawrence2003'], concept: 'regulation of Native identity; social structure', x: 82, y: 56, check: "Lawrence's account of identity regulation: law turns belonging into a bureaucratic category with gendered and racial effects." },
    { id: 'mikmaki-learning', region: "Mi'kma'ki (Atlantic)", admin: 'NS', nation: "Mi'kmaw", scholar: 'Marie Battiste; Albert Marshall', records: ['battiste', 'amarshall'], concept: 'learning spirit; Two-Eyed Seeing (Etuaptmumk)', x: 88, y: 43, check: "Battiste and Marshall's account of learning spirit and Two-Eyed Seeing as a whole-person, two-knowledge practice." },
    { id: 'mikmaki-palmater', region: "Mi'kma'ki (Atlantic)", admin: 'NB', nation: "Mi'kmaw, Eel River Bar", scholar: 'Pamela Palmater', records: ['palmater'], concept: 'poverty produced by law and policy', x: 79, y: 35, check: "Palmater's structural claim that poverty is produced by law and policy, not by culture or individual failure." },
    { id: 'blackfoot', region: 'Niitsitapi / Blackfoot', admin: 'southern Alberta', nation: 'Blackfoot, Kainai', scholar: 'Leroy Little Bear', records: ['littlebear'], concept: 'worldview difference at the root', x: 25, y: 55, check: "Little Bear's worldview claim: colonial mapping can hide the deeper clash between imposed Western categories and Indigenous worldviews." },
    { id: 'redriver', region: 'Red River / Métis homeland', admin: 'Manitoba / prairies', nation: 'Red River Métis; Cree-Métis; Métis', scholar: 'Zoe Todd; Kim Anderson; Janet Smylie', records: ['todd2016', 'anderson2019', 'smylie'], concept: 'place and ontology; kinship as work; centring Indigenous knowledge', x: 45, y: 58, check: 'Todd, Anderson, and Smylie keep place, kinship, and Indigenous health tied to relationships and knowledge control.' },
    { id: 'cree', region: 'Cree territory', admin: 'Sturgeon Lake / prairies-north', nation: 'Cree', scholar: 'Willie Ermine', records: ['ermine'], concept: 'ethical space', x: 35, y: 35, check: "Ermine's ethical space: the meeting place has to be negotiated, not governed by one side's rules." },
    { id: 'anishinaabe', region: 'Anishinaabe', admin: 'Great Lakes', nation: 'Anishinaabe', scholar: 'Amy Bombay', records: ['bombay2014'], concept: 'historical trauma across generations', x: 55, y: 50, check: "Bombay and colleagues' account of historical trauma and community connection across generations." },
    { id: 'aaniiih', region: 'Aaniiih', admin: 'Montana / medicine-line', nation: 'Aaniiih', scholar: 'Joseph P. Gone', records: ['gone2023'], concept: 'trauma as postcolonial, not individual', x: 28, y: 70, check: "Gone's warning that trauma and health inequities are postcolonial and community-defined, not only individual symptoms." }
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
      + '<div role="img" aria-label="Teaching map of Canada using approximate reading anchors, not territory boundaries." style="position:relative;min-width:720px;min-height:430px;background:linear-gradient(180deg,#F7F8FA,#EEF1F5);overflow:hidden">'
      + '<div style="position:absolute;left:4%;right:4%;top:20%;bottom:18%;border-radius:46% 42% 38% 40%;background:#fff;border:1px solid #D7D7D7;box-shadow:inset 0 0 0 1px rgba(255,255,255,.8)"></div>'
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
      return '<div style="background:#fff;border:1px solid #DEE3EA;border-radius:10px;padding:12px 14px;margin-bottom:9px"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px">' + eyePill(r) + weekTag(r) + '<span class="mono" style="font-size:.6875rem;color:#6B7280">' + esc(String(r.year)) + '</span></div><div style="font-size:.95rem;font-weight:700;color:#15171C;line-height:1.25">' + esc(r.title) + '</div><div style="font-size:.8125rem;color:#474C57;margin:3px 0 7px">' + esc(r.authors) + '</div><p style="font-size:.84rem;line-height:1.5;color:#474C57;margin:0">' + esc(r.coreIdea) + '</p><button onclick="SOC.read(\'' + r.id + '\')" style="margin-top:9px;background:none;border:none;color:#961A13;font-size:.8125rem;font-weight:700;padding:0">' + readLabel(r) + ' &#8599;</button></div>';
    }).join('');
  }
  function mapDetail() {
    var m = mapActive();
    return '<section id="map-detail" style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;padding:16px 18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'
      + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--red);font-weight:600;margin-bottom:6px">SELECTED ANCHOR</div>'
      + '<h2 style="font-size:1.25rem;line-height:1.25;margin:0 0 6px;color:#15171C">' + esc(m.region) + '</h2>'
      + '<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px"><span style="font-size:.75rem;font-weight:700;background:#EEF1F5;color:#15171C;border-radius:999px;padding:5px 9px">Administrative: ' + esc(m.admin) + '</span><span style="font-size:.75rem;font-weight:700;background:#F4F4F4;color:#961A13;border-radius:999px;padding:5px 9px">' + esc(m.nation) + '</span></div>'
      + '<div style="font-size:.875rem;line-height:1.55;color:#474C57;margin-bottom:11px"><strong>Scholar anchor:</strong> ' + esc(m.scholar) + '<br><strong>Concept:</strong> ' + esc(m.concept) + '</div>'
      + mapReadingRows(m)
      + studioCheck('SOC122|map|' + m.id, mapCheck(m))
      + '<div style="margin-top:14px"><button onclick="SOC.saveMap()" style="background:var(--red);border:none;color:#fff;border-radius:9px;padding:9px 16px;font-size:.875rem;font-weight:600;cursor:pointer">Save to Personal Cartography (.docx)</button></div>'
      + '</section>';
  }
  function mapFallbackTable() {
    var rows = MAP_REGIONS.map(function (m) {
      return '<tr><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.region) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.admin) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.scholar + ' (' + m.nation + ')') + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5">' + esc(m.concept) + '</td><td style="padding:10px 12px;border-top:1px solid #EEF1F5"><button onclick="SOC.mapSelect(\'' + m.id + '\')" style="background:#fff;border:1px solid #DEE3EA;color:#15171C;border-radius:8px;padding:6px 10px;font-size:.8125rem;font-weight:700">Select anchor</button></td></tr>';
    }).join('');
    return '<section style="background:#fff;border:1px solid #DEE3EA;border-radius:14px;margin-top:18px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04)"><div style="padding:14px 16px;border-bottom:1px solid #EEF1F5"><div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:#6B7280;margin-bottom:4px">ACCESSIBLE TABLE</div><h2 style="font-size:1.0625rem;margin:0;color:#15171C">Same anchors without the visual</h2></div><div style="overflow:auto"><table style="width:100%;min-width:820px;border-collapse:collapse;font-size:.84rem;color:#15171C"><thead><tr style="text-align:left;background:#F7F8FA"><th style="padding:10px 12px">Indigenous layer</th><th style="padding:10px 12px">Administrative layer</th><th style="padding:10px 12px">Scholar anchor</th><th style="padding:10px 12px">Concept</th><th style="padding:10px 12px">Action</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
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
      + '<div style="display:flex;align-items:flex-start;gap:10px;background:#F7F8FA;border:1px solid #D7D7D7;border-left:4px solid #DA291C;border-radius:0 12px 12px 0;padding:12px 15px;margin:0 0 18px;color:#474C57;font-size:.85rem;line-height:1.5"><span style="display:flex;flex:none;color:#961A13;margin-top:1px">' + ic('layers', 16) + '</span><span>' + esc(MAP_CAVEAT) + '</span></div>'
      + '<div class="soc-mapgrid">' + mapVisual() + mapDetail() + '</div>'
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
    return '<iframe class="jhero-art" src="visuals/hero-art.html" title="" aria-hidden="true" tabindex="-1" scrolling="no" loading="eager" style="border:0;pointer-events:none"></iframe>';
  }
  // Hero opens the week with a GENERAL, thematic image (a scene or concept), never an individual portrait.
  // Individual knowledge holders belong in the in-week content panels, not the week-opening image.
  var HERO_THEME = (window.SOC122_HERO_THEME || {});
  function heroThemeRecord(w) {
    var base = (window.SOC122_HERO_THEME || {})[w];
    if (!base) return null;
    var states = base.emphases || base.byEmphasis;
    if (!states) return base;
    var chosen = states[cleanEmphasis(state.learningEmphasis)] || states.two || states.western || states.indigenous || {};
    var out = {};
    Object.keys(base).forEach(function (k) { if (k !== 'emphases' && k !== 'byEmphasis') out[k] = base[k]; });
    Object.keys(chosen).forEach(function (k) { out[k] = chosen[k]; });
    return out;
  }
  function heroItems(im) {
    if (!im) return [];
    if (Array.isArray(im.gallery) && im.gallery.length) return im.gallery;
    return im.file ? [im] : [];
  }
  function heroItemCaption(im) {
    return (im.label ? '<b>' + esc(im.label) + '</b>' : '')
      + (im.credit ? '<span>' + esc(im.credit) + '</span>' : '')
      + (im.source ? ' <a href="' + esc(im.source) + '" target="_blank" rel="noopener">source</a>' : '');
  }
  function heroThemeImage(w) {
    var im = heroThemeRecord(w);
    var items = heroItems(im);
    if (!im || !items.length) return '';
    var cap = esc(im.caption || '');
    var credit = im.credit ? esc(im.credit) : '';
    var gallery = items.length > 1;
    var media = items.map(function (item) {
      var styles = [];
      if (item.position) styles.push('object-position:' + esc(item.position));
      if (item.fit === 'contain') styles.push('object-fit:contain!important;background:#15171C');
      var style = styles.length ? ' style="' + styles.join(';') + '"' : '';
      return '<div class="wk-hero-tile"><img class="wk-hero-banner-img" src="' + esc(item.file) + '" alt="' + esc(item.alt || '') + '" loading="lazy" decoding="async"' + style + '>'
        + (gallery ? '<div class="wk-hero-tile-cap">' + heroItemCaption(item) + '</div>' : '') + '</div>';
    }).join('');
    return '<figure class="wk-hero-banner emphasis-' + esc(cleanEmphasis(state.learningEmphasis)) + (gallery ? ' is-gallery' : '') + '">'
      + '<div class="wk-hero-media">' + media + '</div>'
      + (cap || credit || im.statement || im.lensLabel ? '<figcaption class="wk-hero-cap">' + (im.lensLabel ? '<span class="wk-hero-lens">Visual route | ' + esc(im.lensLabel) + '</span>' : '') + (im.statement ? '<strong>' + esc(im.statement) + '</strong>' : '') + (cap ? '<b>' + cap + '</b>' : '') + (credit ? '<span>' + credit + '</span>' : '') + (!gallery && im.source ? ' <a href="' + esc(im.source) + '" target="_blank" rel="noopener">source</a>' : '') + '</figcaption>' : '')
      + '</figure>';
  }
  function spotlightRouteDefinition(id) {
    if (id === 'western') return 'Western social science begins with the questions, concepts, research methods, and evidence rules developed within academic disciplines. It can reveal patterns and test claims, but its categories were made by people and have histories, strengths, and limits.';
    if (id === 'indigenous') return 'This route begins with the named Indigenous scholar, knowledge holder, Nation, community, place, or project assigned for this week. It never treats Indigenous peoples as one culture or turns a specific teaching into a generic Indigenous lens.';
    return 'Two-Eyed Seeing, or Etuaptmumk, is Mi\'kmaw Elder Albert Marshall\'s teaching about using the strengths of Indigenous knowledges and Western knowledges together for the benefit of all. Each eye stays whole; neither absorbs or certifies the other.';
  }
  function spotlightBaseRecord(w) {
    var m = (window.SOC122_CASES || {})[w];
    if (m) return m;
    var im = (window.SOC122_IMAGES || {})[w];
    if (!im) return null;
    return {
      eyebrow: 'NAMED CONTEXT IN VIEW', title: im.name, image: im.file, imageKind: 'real', ready: true,
      alt: im.alt, credit: im.credit, source: im.source,
      why: 'This verified image keeps ' + im.name + ' in view within this named context: ' + im.context + '. The image gives the week a specific person, community, place, or project instead of an anonymous symbol.',
      notice: 'This is one named context. It does not represent every First Nations, Inuit, or Métis person, community, experience, or knowledge tradition.'
    };
  }
  function spotlightRecord(w) {
    var id = cleanEmphasis(state.learningEmphasis), option = emphasisOption(id), er = emphasisRecord(w) || {};
    var base = spotlightBaseRecord(w), visual = heroThemeRecord(w);
    // The week opener and in-week spotlight must never repeat the same image.
    // Keep the selected emphasis in the opener, then use the week's distinct,
    // named scholar, community, place, or project for the contextual spotlight.
    var useBase = !!(base && base.image && base.ready !== false);
    var items = [];
    if (useBase && base.image && base.ready !== false) {
      items = [{ file: base.image, alt: base.alt, credit: base.credit, source: base.source, position: base.position, fit: base.fit }];
    } else {
      items = heroItems(visual);
    }
    if (!items.length && base && base.image && base.ready !== false) {
      useBase = true;
      items = [{ file: base.image, alt: base.alt, credit: base.credit, source: base.source, position: base.position, fit: base.fit }];
    }
    if (!items.length) return null;
    var caption = useBase ? (base.title || '') : ((visual && visual.caption) || '');
    var why = useBase
      ? (base.why || '')
      : [visual && visual.statement, er.conceptMove].filter(Boolean).join(' ');
    var notice = useBase
      ? (base.notice || 'Read this as one named and attributed context, not as a symbol for a whole people or knowledge tradition.')
      : ((visual && visual.credit && /instructor-created/i.test(visual.credit))
        ? 'This is a conceptual teaching image, not documentary evidence. It organizes the week\'s questions but does not prove a claim about people or communities.'
        : 'This photograph shows only the named scene and source context. It does not prove the week\'s wider claim by itself.');
    if (er.limit) notice += ' ' + er.limit;
    return {
      emphasisId: id,
      emphasisLabel: option.label,
      eyebrow: useBase ? (base.eyebrow || 'IDEA IN VIEW') : (option.label.toUpperCase() + ' VISUAL ROUTE'),
      title: useBase ? (base.title || caption || 'Idea in view') : (caption || option.label + ' in view'),
      definition: spotlightRouteDefinition(id),
      frame: er.frame || option.description || '',
      why: why,
      notice: notice,
      question: er.question || (base && base.question) || journeyQ(w),
      credit: useBase ? (base.credit || '') : ((visual && visual.credit) || ''),
      source: useBase ? (base.source || '') : ((visual && visual.source) || ''),
      caption: caption,
      generated: useBase ? base.imageKind === 'generated' : !!(visual && visual.credit && /instructor-created/i.test(visual.credit)),
      items: items,
      program: programWeekCase(w)
    };
  }
  function spotlightItemStyle(item) {
    var styles = [];
    if (item.position) styles.push('object-position:' + esc(item.position));
    if (item.fit === 'contain') styles.push('object-fit:contain;background:#15171C');
    return styles.length ? ' style="' + styles.join(';') + '"' : '';
  }
  function spotlightPageMedia(m) {
    var gallery = m.items.length > 1;
    var tiles = m.items.map(function (item) {
      return '<div class="idea-media-tile"><img src="' + esc(item.file) + '" alt="' + esc(item.alt || '') + '" loading="lazy" decoding="async"' + spotlightItemStyle(item) + ' onerror="var t=this.closest(&quot;.idea-media-tile&quot;);if(t)t.remove()">'
        + (gallery ? '<div class="idea-media-credit">' + (item.label ? '<b>' + esc(item.label) + '</b>' : '') + '<span>' + esc(item.credit || '') + '</span>' + (item.source ? '<a href="' + esc(item.source) + '" target="_blank" rel="noopener">Image source <span aria-hidden="true">&#8599;</span></a>' : '') + '</div>' : '')
        + '</div>';
    }).join('');
    return '<figure class="idea-figure' + (gallery ? ' is-gallery' : '') + '"><div class="idea-media">' + tiles + '</div><figcaption>'
      + (m.caption ? '<b>' + esc(m.caption) + '</b>' : '')
      + (!gallery && m.credit ? '<span>' + esc(m.credit) + '</span>' : '')
      + (m.generated ? '<strong>Conceptual image, not documentary evidence</strong>' : '')
      + (!gallery && m.source ? '<a href="' + esc(m.source) + '" target="_blank" rel="noopener">Open the image source <span aria-hidden="true">&#8599;</span></a>' : '')
      + '</figcaption></figure>';
  }
  function spotlightWalkMedia(m) {
    var gallery = m.items.length > 1;
    return '<div class="walk-figview walk-spotlight-media' + (gallery ? ' is-gallery' : '') + '">' + m.items.map(function (item) {
      return '<figure class="walk-spotlight-tile"><img class="walk-figimg" src="' + esc(item.file) + '" alt="' + esc(item.alt || m.title) + '"' + spotlightItemStyle(item) + ' onerror="var t=this.closest(&quot;.walk-spotlight-tile&quot;);if(t)t.remove()">'
        + (gallery ? '<figcaption>' + (item.label ? '<b>' + esc(item.label) + '</b>' : '') + '<span>' + esc(item.credit || '') + '</span>' + (item.source ? '<a href="' + esc(item.source) + '" target="_blank" rel="noopener">Source</a>' : '') + '</figcaption>' : '')
        + '</figure>';
    }).join('') + '</div>';
  }
  function journeyIntro() {
    var fr = (D.course && D.course.frame);
    if (fr) return 'One question runs through this course: how do we understand people and society, and whose knowledge counts? You follow it week by week, with two ways of seeing held side by side, ' + fr + '. Start at the top, or pick up where you left off.';
    return 'Follow one question through the whole course, week by week. Each week sets up what to read, why it matters, and one thing to do with it. Start at the top, or pick up where you left off.';
  }
  function deliveryOverviewPanel() {
    return '<section class="node" style="border-top:4px solid var(--red);margin-bottom:22px"><div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:7px">HOW THE TERM MOVES</div><h2 style="font-size:1.28rem;margin:0 0 8px">Live discussion, independent application, and supported closure</h2><p style="font-size:.95rem;line-height:1.6;color:var(--ink-dim);margin:0 0 12px">Weeks 1 to 3, 5 to 10, and 12 meet live. Week 7 is a live cumulative review with no new reading. Weeks 4 and 11 are independent learning weeks with no lecture. Week 13 protects supported completion, and Week 14 closes the course with optional consultation and no graded deadline.</p><button type="button" class="wk-cta" style="margin:0" onclick="SOC.go(\'calendar\')">See the full calendar and reasons</button></section>';
  }

  /* ---------- Cultural Comparison Lab: up to three named evidence contexts ---------- */
  function contextData() { return window.SOC122_CONTEXT_LAB || { groups: [], contexts: {}, principles: [] }; }
  function contextIds() { return Object.keys(contextData().contexts || {}); }
  function contextSlots() {
    var valid = contextData().contexts || {}, raw = Array.isArray(state.contextCompare) ? state.contextCompare.slice(0, 3) : [], out = ['', '', ''], seen = {};
    for (var i = 0; i < 3; i++) {
      var id = raw[i];
      if (id && valid[id] && !seen[id]) { out[i] = id; seen[id] = true; }
    }
    state.contextCompare = out;
    return out;
  }
  function contextSelected() { return contextSlots().filter(function (id) { return !!id; }); }
  function contextWeekQuestion(w) {
    var prompts = {
      1: 'Which social-science question does this evidence make visible, and which discipline would be most able to test it?',
      2: 'This context is not another eye inside Etuaptmumk. What would respectful comparison require while keeping Two-Eyed Seeing specifically Mi\'kmaw?',
      3: 'What people, place, language, institution, and history must be named before this context can be compared with a specific First Nation, Métis, or Inuit source?',
      4: 'How is this institution historically different from Canada\'s residential-school system? Do not turn either history into a metaphor for the other.',
      5: 'What categories, sample, relationships, and missing evidence would a responsible study of this context need?',
      6: 'Who has authority to interpret this setting, and what would anthropology need to cite, return, or leave outside its claim?',
      7: 'Which course concept would you revisit through this evidence, and what new source would you need before extending the claim?',
      8: 'Which historical conditions, institutions, and categories shaped this case, and how do they differ from the history of Western sociology?',
      9: 'Which law, market, status system, media system, or institution structures the outcome rather than merely reflecting an attitude?',
      10: 'How would a psychology claim need to account for language, history, institutions, and community without diagnosing a culture?',
      11: 'What does this evidence support, what remains uncertain, and what stronger claim does it not establish?',
      12: 'How do law, migration, care, work, religion, and kinship shape family arrangements here without defining one normal family?',
      13: 'What primary or community-grounded source would you need before using this context in your final work?',
      14: 'What responsibility follows from making this comparison without flattening, ranking, or claiming more than the source shows?'
    };
    return prompts[w] || prompts[14];
  }
  function contextWeekPrompt(ctx, w) {
    var direct = (ctx.weeks || []).indexOf(Number(w)) >= 0;
    return { direct: direct, text: (direct ? ctx.question + ' ' : '') + contextWeekQuestion(w) };
  }
  function contextGroupById(id) {
    var groups = contextData().groups || [];
    for (var i = 0; i < groups.length; i++) if (groups[i].id === id) return groups[i];
    return null;
  }
  function contextOptions(slot) {
    var data = contextData(), slots = contextSlots(), picked = slots[slot] || '', used = {};
    slots.forEach(function (id, i) { if (id && i !== slot) used[id] = true; });
    var html = '<option value=""' + (!picked ? ' selected' : '') + '>Choose a named context...</option>';
    (data.groups || []).forEach(function (group) {
      var ids = contextIds().filter(function (id) { return data.contexts[id].group === group.id; });
      if (!ids.length) return;
      html += '<optgroup label="' + esc(group.label) + '">';
      ids.forEach(function (id) { var c = data.contexts[id]; html += '<option value="' + esc(id) + '"' + (picked === id ? ' selected' : '') + (used[id] ? ' disabled' : '') + '>' + esc(c.label) + '</option>'; });
      html += '</optgroup>';
    });
    return html;
  }
  function contextSourceHtml(ctx) {
    var url = ctx.source || '', label = ctx.sourceLabel || 'Open evidence source';
    if (!url && ctx.sourceId) {
      var r = rec(ctx.sourceId);
      if (r) { url = readUrl(r) || sourceUrl(r) || ''; label = r.title + ' - ' + r.authors; }
    }
    var out = url ? '<a class="context-source" href="' + esc(url) + '" target="_blank" rel="noopener">Open evidence source <span aria-hidden="true">&#8599;</span><small>' + esc(label) + '</small></a>' : '';
    if (ctx.bio && ctx.bio !== url) out += '<a class="context-bio" href="' + esc(ctx.bio) + '" target="_blank" rel="noopener">Named-person context <span aria-hidden="true">&#8599;</span></a>';
    return out;
  }
  function contextCardHtml(id, w, mode, slot) {
    var ctx = contextData().contexts[id];
    if (!ctx) return '';
    var wp = contextWeekPrompt(ctx, w), group = contextGroupById(ctx.group), compact = mode === 'walk';
    return '<article class="context-card' + (wp.direct ? ' direct' : '') + '" data-context-id="' + esc(id) + '">'
      + '<div class="context-card-top"><span>CONTEXT ' + String.fromCharCode(65 + slot) + '</span><b>' + (wp.direct ? 'DIRECT WEEK CONNECTION' : 'TRANSFER CAREFULLY') + '</b></div>'
      + '<h3>' + esc(ctx.label) + '</h3><p class="context-place">' + esc(ctx.place) + '</p>'
      + '<div class="context-tags">' + (ctx.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>'
      + '<dl><div><dt>Object of study</dt><dd>' + esc(ctx.unit) + '</dd></div>'
      + (compact ? '' : '<div class="context-evidence"><dt>Evidence base</dt><dd>' + esc(ctx.evidence) + '</dd></div>')
      + '<div class="context-guard"><dt>Do not conflate</dt><dd>' + esc(ctx.guardrail) + '</dd></div>'
      + '<div class="context-week-move"><dt>Week ' + w + ' move</dt><dd>' + esc(wp.text) + '</dd></div></dl>'
      + (compact ? '' : contextSourceHtml(ctx)) + '</article>';
  }
  function contextSelectorsHtml(w, mode) {
    var slots = contextSlots();
    return '<div class="context-selectors" role="group" aria-label="Choose up to three named contexts">' + [0, 1, 2].map(function (slot) {
      return '<label><span>CONTEXT ' + String.fromCharCode(65 + slot) + '</span><select aria-label="Context ' + String.fromCharCode(65 + slot) + '" onchange="SOC.contextPick(' + slot + ',this.value,' + w + ',\'' + mode + '\')">' + contextOptions(slot) + '</select>' + (slots[slot] ? '<small>' + esc((contextGroupById(contextData().contexts[slots[slot]].group) || {}).note || '') + '</small>' : '') + '</label>';
    }).join('') + '</div>';
  }
  function contextCompareInner(w, mode) {
    var selected = contextSlots(), cards = '';
    selected.forEach(function (id, slot) { if (id) cards += contextCardHtml(id, w, mode, slot); });
    var chosen = selected.filter(Boolean).length;
    return contextSelectorsHtml(w, mode)
      + (chosen ? '<div class="context-card-grid count-' + chosen + '">' + cards + '</div>' : '<div class="context-empty"><b>Choose one context to investigate, or two or three to compare.</b><span>The headings organize the menu. Only named evidence contexts are selectable.</span></div>');
  }
  function contextCompareShell(w, mode) {
    return '<div class="context-compare-shell" data-context-week="' + w + '" data-context-mode="' + mode + '">' + contextCompareInner(w, mode) + '</div>';
  }
  function contextMethodHtml() {
    var steps = [
      ['Choose named contexts', 'Start with a named place, population, institution, scholar, or evidence base. A region, race, or religion is too broad to function as the case.'],
      ['Name one shared question', 'Decide what can legitimately be asked across the selected contexts. Do not assume the contexts are equivalent because the same word appears in each.'],
      ['Inspect evidence and authority', 'Ask who produced the source, what it studied, which institution shaped the case, and who has authority to interpret what the source cannot settle.'],
      ['Identify a difference and a limit', 'State one difference the evidence supports and one conclusion it does not support. A bounded claim is stronger than a sweeping one.'],
      ['Explain why the comparison matters', 'Carry forward a responsible reason for placing the contexts together. The lab preserves your decisions; it does not write the conclusion.']
    ];
    return '<section class="context-method" aria-labelledby="context-method-title"><header><div class="mono">THE COMPARISON METHOD</div><h2 id="context-method-title">Five moves. No cultural shortcuts.</h2><p>Comparison becomes educational when the question, source, institution, and limit remain visible. Use the sequence as a method, not as a formula for a finished answer.</p></header><ol>'
      + steps.map(function (s, i) { return '<li><span>' + (i + 1) + '</span><div><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div></li>'; }).join('') + '</ol></section>';
  }
  function contextMatrixHtml(w) {
    var ids = contextSelected();
    if (!ids.length) return '<section class="context-matrix context-matrix-empty" aria-labelledby="context-matrix-title"><div><div class="mono">LIVE EVIDENCE MATRIX</div><h2 id="context-matrix-title">The comparison surface is waiting.</h2><p>Choose a named context above. With two or three, the matrix makes the common question and the non-equivalences visible at the same time.</p></div></section>';
    var rows = [
      ['Where the evidence is located', function (c) { return c.place; }],
      ['Object of study', function (c) { return c.unit; }],
      ['Evidence base', function (c) { return c.evidence; }],
      ['Analytic anchors', function (c) { return (c.tags || []).join(', '); }],
      ['Do not conflate', function (c) { return c.guardrail; }],
      ['Week ' + w + ' question', function (c) { return contextWeekPrompt(c, w).text; }]
    ];
    var head = ids.map(function (id, i) { return '<th scope="col"><span>CONTEXT ' + String.fromCharCode(65 + i) + '</span>' + esc(contextData().contexts[id].label) + '</th>'; }).join('');
    var body = rows.map(function (row) { return '<tr><th scope="row">' + esc(row[0]) + '</th>' + ids.map(function (id) { return '<td>' + esc(row[1](contextData().contexts[id])) + '</td>'; }).join('') + '</tr>'; }).join('');
    return '<section class="context-matrix" aria-labelledby="context-matrix-title"><header><div><div class="mono">LIVE EVIDENCE MATRIX</div><h2 id="context-matrix-title">See what can, and cannot, travel across the comparison.</h2></div><p>' + (ids.length === 1 ? 'One context can be investigated on its own. Add a second or third only when you can name a legitimate shared question.' : 'Shared rows do not make the cases equivalent. Read across each row, then read down each context before you write.') + '</p></header><div class="context-matrix-scroll" tabindex="0" role="region" aria-label="Scrollable comparison matrix"><table><caption>Evidence matrix for ' + ids.length + ' selected context' + (ids.length === 1 ? '' : 's') + ' using Week ' + w + '</caption><thead><tr><th scope="col">Comparison lens</th>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div></section>';
  }
  function contextReadingHtml(w) {
    var ids = contextSelected();
    if (!ids.length) return '';
    var contexts = ids.map(function (id) { return contextData().contexts[id]; });
    var evidence = contexts.map(function (c) { return '<li><b>' + esc(c.label) + '</b><span><em>Object of study:</em> ' + esc(c.unit) + '</span><span><em>Evidence base:</em> ' + esc(c.evidence) + '</span></li>'; }).join('');
    var limits = contexts.map(function (c) { return '<li><b>' + esc(c.label) + '</b><span>' + esc(c.guardrail) + '</span></li>'; }).join('');
    var lead = contexts.length === 1
      ? 'This is an investigation before it is a comparison. The selected case is bounded by a named source, place, object of study, and evidence base. It does not make a whole place, people, or identity group into one case.'
      : 'You are not comparing the selected places or peoples as whole cultures. You are comparing ' + contexts.length + ' bounded evidence cases through one Week ' + w + ' question. Each source carries its own history, institution, method, and authority. The value lies in what changes across those dimensions, not in forcing a cultural contrast.';
    return '<section class="context-reading" aria-labelledby="context-reading-title"><header><div class="mono">CURATOR\'S READING</div><h2 id="context-reading-title">What this comparison can responsibly mean</h2></header><p class="context-reading-lead">' + esc(lead) + '</p>'
      + '<div class="context-reading-question"><span>SHARED QUESTION FOR WEEK ' + w + '</span><p>' + esc(contextWeekQuestion(w)) + '</p></div>'
      + '<div class="context-reading-columns"><section><h3>What the evidence contributes</h3><p>Each source carries a different kind of authority. Read what it actually studies before deciding that two sources agree or disagree.</p><ul>' + evidence + '</ul></section><section><h3>Where the comparison must stop</h3><p>A careful comparison does not turn a pattern into a personality, a policy into a culture, or one scholar into a spokesperson for everyone.</p><ul>' + limits + '</ul></section></div>'
      + '<aside><b>Your interpretive work begins here.</b><span>Use the matrix to identify one supported difference. Then state what additional evidence you would need before making a broader claim. The lab gives you the intellectual terrain; the reasoning and wording must remain yours.</span></aside></section>';
  }
  function contextCatalogHtml(w) {
    var data = contextData(), selected = contextSelected();
    var groups = (data.groups || []).map(function (group) {
      var ids = contextIds().filter(function (id) { return data.contexts[id].group === group.id; });
      if (!ids.length) return '';
      var cards = ids.map(function (id) {
        var c = data.contexts[id], on = selected.indexOf(id) >= 0;
        return '<article class="context-catalog-card"><header><div><h3>' + esc(c.label) + '</h3><p>' + esc(c.place) + '</p></div><button type="button" onclick="SOC.contextAdd(\'' + esc(id) + '\')"' + (on ? ' disabled' : '') + '>' + (on ? 'On comparison wall' : 'Add to comparison') + '</button></header>'
          + '<div class="context-tags">' + (c.tags || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>'
          + '<dl><div><dt>Evidence base</dt><dd>' + esc(c.evidence) + '</dd></div><div><dt>Boundary</dt><dd>' + esc(c.guardrail) + '</dd></div></dl>'
          + '<div class="context-catalog-foot"><span>Connects directly to ' + (c.weeks || []).map(function (wk) { return 'Week ' + wk; }).join(', ') + '</span>' + contextSourceHtml(c) + '</div></article>';
      }).join('');
      return '<details class="context-catalog-group"><summary><span><b>' + esc(group.label) + '</b><small>' + esc(group.note) + '</small></span><i>' + ids.length + ' named context' + (ids.length === 1 ? '' : 's') + '</i></summary><div class="context-catalog-items">' + cards + '</div></details>';
    }).join('');
    return '<section class="context-catalog" aria-labelledby="context-catalog-title"><header><div><div class="mono">THE SOURCE CATALOGUE</div><h2 id="context-catalog-title">Browse the cases before you compare them.</h2><p>The seven broad headings below are shelves, not cultures. Open a shelf to inspect the named cases, evidence bases, limits, direct week connections, and source provenance.</p></div><button type="button" class="secondary" onclick="SOC.contextClear()">Clear comparison wall</button></header>' + groups + '</section>';
  }
  function contextAssessmentBridge(w) {
    var special = '';
    if (w === 8) special = '<p><b>Knowledge in Two Eyes:</b> this lab can help you audit a category or numerical claim, but it does not replace the required Western and Indigenous course sources, your own community or life observation, or your 60 to 90 second voice reflection.</p>';
    else if (w === 12) special = '<p><b>A Question of Reconciliation:</b> a global comparison cannot substitute for a specific Call to Action or local reconciliation question. Use it only to clarify why histories and responsibilities are not interchangeable.</p>';
    else if (w >= 2 && w <= 12) special = '<p><b>Two-Eyed Seeing Journal:</b> use a context only after reading the assigned sources. Record what changed in your thinking; do not turn the context into a generic example or replace the named Indigenous source.</p>';
    return '<aside class="context-assessment"><div class="mono">ASSESSMENT TRANSFER, NOT AN ANSWER</div><h3>Carry your decisions, not generated prose.</h3>'
      + special
      + '<p>The official instructions, required sources, submission format, and grading remain on Blackboard.</p><button type="button" onclick="SOC.go(\'assignments\')">See the assessment pathway <span aria-hidden="true">&#8594;</span></button></aside>';
  }
  function contextTrailHtml(w) {
    var key = 'w' + w, notes = (state.contextNotes && state.contextNotes[key]) || {};
    return '<section class="context-trail" aria-labelledby="context-trail-title"><div><div class="mono">YOUR EVIDENCE TRAIL</div><h2 id="context-trail-title">Make the comparison yours</h2><p>Nothing is submitted from this site. These prompts preserve your reasoning process without writing the answer for you.</p></div>'
      + '<div class="context-trail-grid"><label><span>One supported difference</span><small>Point to the evidence source, not an assumption.</small><textarea rows="3" oninput="SOC.contextNote(' + w + ',\'difference\',this.value)" placeholder="The sources support this difference because...">' + esc(notes.difference || '') + '</textarea></label>'
      + '<label><span>One limit</span><small>Name what the evidence cannot prove.</small><textarea rows="3" oninput="SOC.contextNote(' + w + ',\'limit\',this.value)" placeholder="This comparison cannot establish...">' + esc(notes.limit || '') + '</textarea></label>'
      + '<label><span>Why compare these?</span><small>Explain the legitimate shared question without making the contexts equivalent.</small><textarea rows="3" oninput="SOC.contextNote(' + w + ',\'why\',this.value)" placeholder="These contexts belong together for this question because...">' + esc(notes.why || '') + '</textarea></label></div></section>';
  }
  function contextHomePanel(w) {
    return '<section class="context-home" aria-labelledby="context-home-title"><header><div><div class="mono">CULTURAL COMPARISON LAB</div><h2 id="context-home-title">Choose the contexts you want to investigate.</h2><p>Compare up to three named evidence contexts. Culture is learned, shared, contested, and changing; it is not a synonym for race, religion, region, Nation, or country.</p></div><button type="button" onclick="SOC.go(\'contexts\')">Open the full lab <span aria-hidden="true">&#8594;</span></button></header>'
      + contextCompareShell(w, 'home')
      + '<footer><span>Compare one, two, or three evidence contexts</span><span>No identity disclosure</span></footer></section>';
  }
  function contextWeekSection(w) {
    if (!contextIds().length) return '';
    var chosen = contextSlots().filter(Boolean).length;
    if (!chosen) {
      return '<section id="wk-context" class="node context-week context-week-invite"><div class="mono context-kicker">CULTURAL COMPARISON LAB</div><h2 class="wk-sec">Carry this week into a named context</h2><p class="wk-hint">The full lab is a separate room in the left navigation. Choose one, two, or three bounded evidence contexts there; your selections will return here after the readings so you can test what this week changes.</p><button type="button" class="wk-cta" onclick="SOC.go(\'contexts\')">Choose contexts in the Cultural Lab</button></section>';
    }
    return '<section id="wk-context" class="node context-week"><div class="mono context-kicker">CULTURAL COMPARISON LAB</div><h2 class="wk-sec">Test this week across named contexts</h2><p class="wk-hint">Your choices follow you through the course. Compare evidence and institutions, not whole cultures or kinds of people.</p>'
      + contextCompareShell(w, 'week') + contextAssessmentBridge(w) + '</section>';
  }
  function contextLabPage() {
    var w = cleanWeek(state.contextWeek) || currentJourneyWeek() || 5, data = contextData();
    var weekOpts = journeyWeeks().map(function (wk) { return '<option value="' + wk + '"' + (wk === w ? ' selected' : '') + '>Week ' + wk + ': ' + esc(weekTitle(wk)) + '</option>'; }).join('');
    return '<div class="rise context-page"><section class="context-page-hero"><div class="mono">CULTURAL COMPARISON LAB</div><h1>Understand culture through evidence, context, and comparison.</h1><p>Select up to three named contexts. Culture can shape meaning and practice, but it never operates alone: law, language, migration, institutions, history, racialization, class, religion, gender, and power also matter. The lab keeps those differences visible and makes you name the limit. It will not write the conclusion.</p></section>'
      + '<section class="context-principles"><div><h2>The comparison contract</h2><p>These rules protect intellectual honesty and keep Indigenous, regional, racial, religious, and national differences from collapsing into one another.</p></div><ul>' + (data.principles || []).map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></section>'
      + contextMethodHtml()
      + '<section class="context-workbench"><header><div><div class="mono">WEEK LENS</div><h2>Change the week. Watch the questions change.</h2></div><div class="context-workbench-actions"><label><span>Use the concepts from</span><select aria-label="Choose a week for the Cultural Comparison Lab" onchange="SOC.contextSetWeek(this.value)">' + weekOpts + '</select></label><button type="button" onclick="SOC.contextClear()">Reset comparison</button></div></header>'
      + contextCompareShell(w, 'page') + '</section>'
      + contextReadingHtml(w) + contextMatrixHtml(w) + contextTrailHtml(w) + contextCatalogHtml(w) + contextAssessmentBridge(w) + '</div>';
  }
  function synthesisPage() {
    var world = walkWorld(14) || { title: 'One world does not mean one answer.', lead: '', items: [] };
    var items = world.items || [], notes = state.synthesisNotes || {}, emphasis = emphasisOption(), visual = heroThemeRecord(14), visualItem = heroItems(visual)[0] || {};
    var tabs = items.map(function (x, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" class="' + (i === 0 ? 'on' : '') + '" onclick="SOC.synthesisPick(this,' + i + ')"><span>' + String(i + 1).padStart(2, '0') + '</span>' + esc(x.label) + '</button>'; }).join('');
    var panels = items.map(function (x, i) { return '<article class="synthesis-panel' + (i === 0 ? ' on' : '') + '" data-synthesis-panel="' + i + '"' + (i === 0 ? '' : ' hidden') + '><span>' + esc(x.label) + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p><b>' + esc(x.prompt) + '</b></article>'; }).join('');
    var pc = programWeekCase(14), program = pc ? '<section class="synthesis-program"><div class="mono">YOUR CURRENT ROUTE</div><h2>' + esc(pc.profile.program) + ' through ' + esc(emphasis.label) + '</h2><p>' + esc(pc.emphasis) + '</p><div><b>Field inquiry</b><span>' + esc(pc.scenario) + '</span></div><div><b>Evidence boundary</b><span>' + esc(pc.evidence) + '</span></div><small>' + esc(pc.profile.boundary) + '</small></section>' : '<section class="synthesis-program"><div class="mono">GENERAL COURSE ROUTE</div><h2>' + esc(emphasis.label) + '</h2><p>' + esc((emphasisRecord(14) || {}).frame || emphasis.description || '') + '</p><small>Choose a Seneca program in the personalization bar if you want the synthesis questions located in a specific field setting.</small></section>';
    var selected = contextSelected(), contexts = selected.map(function (id) { return contextData().contexts[id]; }).filter(Boolean);
    var context = '<section class="synthesis-context"><div><div class="mono">CONTEXTS IN YOUR ORBIT</div><h2>' + (contexts.length ? 'Your selected evidence cases remain distinct.' : 'No cultural contexts are selected yet.') + '</h2><p>' + (contexts.length ? 'The globe does not turn these cases into representative cultures. Carry forward the source, place, institution, evidence, and limit attached to each one.' : 'The synthesis works without a cultural comparison. Add one, two, or three named evidence cases only when they sharpen a legitimate question.') + '</p></div>' + (contexts.length ? '<ul>' + contexts.map(function (c) { return '<li><b>' + esc(c.label) + '</b><span>' + esc(c.unit) + '</span><small>' + esc(c.guardrail) + '</small></li>'; }).join('') + '</ul>' : '') + '<button type="button" onclick="SOC.go(\'contexts\')">' + (contexts.length ? 'Review these contexts' : 'Open the Cultural Lab') + '</button></section>';
    var lensVisual = visualItem.file ? '<figure class="synthesis-lens-visual"><img src="' + esc(visualItem.file) + '" alt="' + esc(visualItem.alt || '') + '"><figcaption><span>Current visual route | ' + esc(visual.lensLabel || emphasis.label) + '</span><b>' + esc(visual.statement || '') + '</b><small>' + esc(visualItem.credit || visual.credit || '') + '</small>' + (visualItem.source || visual.source ? '<a href="' + esc(visualItem.source || visual.source) + '" target="_blank" rel="noopener">Image source</a>' : '') + '</figcaption></figure>' : '';
    function field(key, label, help, placeholder) { return '<label><span>' + esc(label) + '</span><small>' + esc(help) + '</small><textarea rows="4" oninput="SOC.synthesisNote(\'' + key + '\',this.value)" placeholder="' + esc(placeholder) + '">' + esc(notes[key] || '') + '</textarea></label>'; }
    return '<div class="rise synthesis-page"><section class="synthesis-hero"><div><div class="mono">COURSE SYNTHESIS</div><h1>Turn the globe. Keep the differences.</h1><p>One Earth contains many places, histories, institutions, cultures, knowledge systems, and unequal relationships. Synthesis does not compress them into one answer. It asks you to decide what can travel across a comparison, what changes, what cannot be equated, and what responsibility follows.</p><div><button type="button" onclick="SOC.station(14)">Open Week 14</button><span>The route changes. The final meaning remains yours.</span></div></div><figure class="synthesis-earth"><div><img src="images/lenses/w14_two.jpg" alt="The eastern hemisphere of Earth against black space, with Africa, Europe, Asia, Australia, clouds, oceans, and ice visible together."></div><figcaption><b>One shared Earth, never one uniform context</b><span>NASA imagery by Reto Stockli; public domain</span><a href="https://commons.wikimedia.org/wiki/File:Blue_Marble_Eastern_Hemisphere.jpg" target="_blank" rel="noopener">Image source</a></figcaption></figure></section>'
      + '<section class="synthesis-world"><header><div class="mono">THE LIVING WORLD ATLAS</div><h2>' + esc(world.title) + '</h2><p>' + esc(world.lead) + '</p></header><div class="synthesis-world-grid"><div class="synthesis-mini-globe" aria-hidden="true"><i></i><i></i><i></i><i></i></div><div class="synthesis-routes" role="tablist" aria-label="Choose a synthesis route">' + tabs + '<div class="synthesis-panels">' + panels + '</div></div></div></section>'
      + program + lensVisual + context
      + '<section class="synthesis-trail"><header><div class="mono">YOUR SYNTHESIS TRAIL</div><h2>Construct the meaning; do not collect a finished answer.</h2><p>These private notes remain in this browser. Each prompt asks for a decision that the site cannot make for you.</p></header><div>'
      + field('question', 'One question worth carrying', 'Name the social-science problem before selecting evidence.', 'The question I can now ask more precisely is...')
      + field('source', 'One source and its job', 'Name who produced it, what it can support, and where it stops.', 'This source can carry the claim that... It cannot establish...')
      + field('difference', 'One difference that must remain', 'Do not reward a smooth synthesis by erasing a history, Nation, method, or purpose.', 'The distinction I must keep visible is...')
      + field('responsibility', 'What follows for you', 'State a responsibility in how you will inquire, compare, cite, or act. Do not prescribe for a community.', 'Because I now know this, I am responsible for...')
      + '</div><aside><b>This is preparation, not assessment prose.</b><span>The official assessment instructions and grading remain on Blackboard. Use these notes to remember your reasoning, then construct your own submission from the assigned sources.</span><button type="button" onclick="SOC.go(\'assignments\')">Open the assessment pathway</button></aside></section></div>';
  }
  function journeyHome() {
    var ws = journeyWeeks(), cur = currentJourneyWeek(), started = !!state.journeyWeek;
    var title = (D.course && (D.course.name || D.course.code)) || 'Your course';
    var ctaLabel = started ? ('Resume Week ' + cur) : ('Start Week ' + (ws[0] || 1));
    var hero = '<section class="soc-home-hero jfade" aria-labelledby="soc-home-title">'
      + '<figure class="soc-home-scene"><img src="images/themes/course_social_world_toronto.jpg" alt="A wide view looks down Toronto\'s Taste of Lawrence street festival. A large, multigenerational crowd moves among food stalls, signs, apartment buildings, transit wires, workers, and public infrastructure."><figcaption><b>Public life in Toronto</b><span>Photo by Dillan Payne, Taste of Lawrence, 2026; CC BY-SA 4.0</span><a href="https://commons.wikimedia.org/wiki/File:Taste_of_Lawrence,_July_5_2026_(06).jpg" target="_blank" rel="noopener">Image source</a></figcaption></figure>'
      + '<div class="soc-home-veil" aria-hidden="true"></div><div class="soc-home-copy">'
      + '<div class="mono soc-home-kicker">SOC122 &middot; ' + esc(title) + ' &middot; FALL 2026</div>'
      + '<h1 id="soc-home-title">The social world is already around you. Learn how to read it.</h1>'
      + '<p>Move from everyday choices to institutions, histories, communities, and evidence. Western social science and Indigenous scholarship remain distinct and attributed, held together through Elder Albert Marshall\'s Two-Eyed Seeing frame.</p>'
      + '<div class="soc-home-actions"><button type="button" onclick="SOC.station(' + cur + ')">' + esc(ctaLabel) + '<span aria-hidden="true">&#8594;</span></button><button type="button" class="secondary" onclick="SOC.go(\'walkthroughs\')">Enter the weekly experiences</button></div>'
      + '<div class="soc-home-lenses" aria-label="Course through-lines"><span>People and relationships</span><span>Institutions and power</span><span>Knowledge and evidence</span></div>'
      + '</div></section>';
    var spineHead = '<div style="display:flex;align-items:baseline;gap:12px;margin:0 0 16px;flex-wrap:wrap"><h2 style="font-size:1.375rem;font-weight:600;margin:0;color:var(--ink)">Your journey</h2><span style="font-size:.875rem;color:var(--ink-faint)">' + ws.length + ' weeks, in course order</span></div>';
    return '<div class="rise">' + hero + deliveryOverviewPanel() + homeIntroCollapsible() + compassPanel() + courseProgressPanel() + emphasisHomeIntro() + lensHomeIntro() + spineHead + deliveryLegend() + journeyStations(null) + '</div>';
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
        + '<span class="jdot" style="display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;flex:none;border-radius:12px;background:' + (isCur ? 'var(--red)' : '#15171C') + ';color:#fff;font-family:var(--mono);font-size:1.0625rem;font-weight:600">' + w + '</span>'
        + '<div style="flex:1;min-width:0">'
        + '<div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:3px"><span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.05em;color:' + (mode.kind === 'live' ? '#15171C' : '#474C57') + ';background:#F4F4F4;border:1px solid ' + (mode.kind === 'live' ? '#15171C' : '#6B7280') + ';padding:2px 8px;border-radius:999px">' + (mode.kind === 'live' ? 'LIVE' : 'ASYNC') + '</span>' + lensCardBadge(w) + '<span class="mono" style="font-size:.66rem;color:var(--ink-faint);letter-spacing:.03em">' + esc(weekDate(w)) + '</span></div>'
        + (weekHasWork(w) ? '<span class="mono" style="font-size:.625rem;font-weight:700;letter-spacing:.06em;color:var(--green);background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:2px 8px">IN PROGRESS</span>' : '')
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
    var u = readUrl(r), eye = r.eye === 'indigenous' ? 'INDIGENOUS' : (r.eye === 'western' ? 'WESTERN' : ''), accent = r.eye === 'indigenous' ? '#961A13' : '#15171C';
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
      1: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "", "overview": "Welcome to Introduction to the Social Sciences. The social sciences study how people live, relate, organize, and make meaning together, and they ask you to treat everyday life as something you can examine rather than simply live through. One of the first tools you will meet is the sociological imagination, the idea that a private experience is also tied to history and social structure. This course places Western social science in relation to named Indigenous scholars and knowledge holders. It does not present one universal Indigenous knowledge system. Your task is to keep each source attributed, understand what it contributes, and resist a single blended answer.", "purpose": "Week 1 introduces what social science is and gives you a first way of seeing: the sociological imagination, which links a person's private troubles to public, patterned questions. It also opens the frame for the whole course, in which Western social science is placed beside named Indigenous scholarship so you can engage each source honestly rather than collapsing them into one.", "outcomes": ["By the end of this week you can explain what the social sciences study and why everyday life can be examined rather than simply lived.", "By the end of this week you can use the sociological imagination to connect a personal experience to history and social structure.", "By the end of this week you can describe, in their own framing, Ermine's idea of ethical space and Battiste's idea of learning as a lifelong journey of the spirit.", "By the end of this week you can hold Western concepts beside Ermine's and Battiste's distinct accounts without turning either scholar into a universal Indigenous view."], "guiding": ["What is the difference between living your everyday life and examining it the way a social scientist would?", "Take one choice that feels entirely private. How is it also shaped by history and social structure?", "Ermine says an ethical space opens when two worldviews meet. What would it mean to name your own assumptions before speaking across that gap?", "Battiste describes learning as nourishing the spirit across a whole life. How is that different from the way you usually picture learning in school?"], "checks": [{"t": "What the social sciences study, and the idea that everyday life can be examined rather than simply lived", "look": "the OpenStax reading"}, {"t": "The sociological imagination: how a private experience is tied to history and social structure", "look": "the OpenStax reading"}, {"t": "Ethical space: the charged gap that opens when two worldviews meet, where each side's assumptions can be named rather than hidden", "look": "Ermine, 2007"}, {"t": "Learning as a lifelong, holistic journey of the whole person and spirit, nurtured by family, community, and land", "look": "Battiste, 2010"}, {"t": "Practising the move from a private experience to a public, patterned question by matching everyday moments to the idea that explains them", "look": "the activity"}], "concepts": [{"h": "The sociological imagination", "body": "OpenStax opens sociology by treating everyday life as something you can examine rather than simply live. Its central tool is the sociological imagination, C. Wright Mills' idea that a person's choices and experiences are tied to history and social structure. So a decision that feels entirely private, such as whether and whom to marry, is also shaped by social acceptability and circumstance. The lesson is that sociology is a way of seeing, not just a body of facts.", "cite": "OpenStax, 2021"}, {"h": "Scientific inquiry and empirical evidence", "body": "Social science checks its claims through a repeating process: asking a question, gathering evidence, analyzing it, and revising the answer. OpenStax describes this inquiry as self-correcting, so a conclusion stays provisional and open to better evidence. It rests on empirical evidence, information gathered through observation and experience that other people can examine, which is what separates a scientific account from an opinion or assumption.", "cite": "OpenStax, 2021"}, {"h": "Ethical space", "body": "Willie Ermine, who is Cree, argues that when two societies with different worldviews meet, an ethical space opens in the gap between them. It is a charged area where the deeper assumptions, interests, and ways of knowing on each side can be named rather than left hidden. He shows how the dominant culture's claim to universal authority can silence Indigenous thought, and he proposes agreed rules of engagement, built from both sides, as the ground for honest dialogue. Ethical space is a way to engage across knowledge systems without one side's rules simply overriding the other.", "cite": "Ermine, 2007"}, {"h": "Learning as a journey of the spirit", "body": "Marie Battiste, who is Mi'kmaw, describes learning in Indigenous traditions as a lifelong journey of the spirit toward the gifts and purpose a person is born with, nurtured by family, community, land, and ceremony rather than confined to a classroom. She frames this holistic learning spirit, in her own words, and contrasts it with schooling, including residential schools, that ignored or attacked Indigenous knowledge. For a student, learning becomes the formation of a whole person across a life, not just information passed on in school.", "cite": "Battiste, 2010"}], "terms": [{"term": "Sociological imagination", "def": "C. Wright Mills' idea, introduced in the OpenStax chapter, that a person's private choices and experiences are tied to history and social structure, so a private trouble is also a public, patterned question.", "cite": "OpenStax, 2021"}, {"term": "Empirical evidence", "def": "information gathered through observation and experience that other people can examine, rather than opinion or assumption; because it can be checked by others, it is the shared ground on which social scientists build and contest their claims.", "cite": "OpenStax, 2021"}, {"term": "Ethical space", "def": "Ermine's term for the charged gap that opens when two societies with different worldviews meet, where the assumptions and ways of knowing on each side can be named, and where agreed rules of engagement built from both sides make honest dialogue possible.", "cite": "Ermine, 2007"}, {"term": "Learning spirit", "def": "Battiste's term for learning understood as a lifelong, holistic journey of the whole person toward their gifts and purpose, nurtured by family, community, and land rather than confined to a classroom.", "cite": "Battiste, 2010"}], "readings": [{"apa": "OpenStax. (2021). An introduction to sociology. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/1-introduction", "scope": "Open access", "id": "soc-intro"}, {"apa": "Ermine, W. (2007). The ethical space of engagement. Indigenous Law Journal, 6(1), 193-203.", "scope": "Open access", "id": "ermine"}, {"apa": "Battiste, M. (2010). Nourishing the learning spirit. Education Canada, 50(1), 14-18.", "scope": "Open access", "id": "battiste"}], "activity": {"screen": "activity", "archetype": "match", "title": "Read the social world", "what": "You match everyday moments to the idea from this week that helps you see what is really going on beneath them.", "why": "so you practise the core move of social science, turning a private experience into a public, patterned question, and notice when an idea comes from the Western reading and when it comes from a named Indigenous scholar.", "data": {"prompt": "Match each everyday moment to the idea that helps you see it.", "pairs": [{"item": "You assume you chose your major entirely on your own, then notice your family, your school, and the job market all shaped the options you saw", "match": "The sociological imagination", "why": "because a choice that feels private is tied to history and social structure, the link Mills names in the OpenStax reading", "cite": "OpenStax, 2021"}, {"item": "Two friends argue about whether a study's claim is true, and one says we should look at what was actually observed, not just how it feels", "match": "Empirical evidence", "why": "because social science settles claims on information others can examine, not on opinion or assumption, as the OpenStax reading sets out", "cite": "OpenStax, 2021"}, {"item": "In a group project, people from very different backgrounds keep talking past each other, and someone suggests naming each side's assumptions before going further", "match": "Ethical space", "why": "because Ermine describes the charged gap between worldviews as a place where assumptions can be named rather than hidden, with rules built from both sides", "cite": "Ermine, 2007"}, {"item": "An older relative says the most important things they learned came from family, land, and community, long before and after any classroom", "match": "Learning as a journey of the spirit", "why": "because Battiste, in her own framing, describes learning as a lifelong, holistic journey nurtured by family, community, and land, not confined to school", "cite": "Battiste, 2010"}, {"item": "You catch yourself treating one way of knowing as the only valid one, and pause to ask what another knowledge system might see here", "match": "Named sources held in responsible relation", "why": "because this course places Western social science beside named Indigenous scholars, and Ermine warns against one worldview claiming universal authority over another", "cite": "Ermine, 2007"}]}}, "youcan": ["You can now explain what the social sciences study and why everyday life can be examined rather than simply lived", "You can now use the sociological imagination to connect a personal experience to history and social structure", "You can now describe Ermine's ethical space and Battiste's learning spirit in their own framing, and hold the sources in relation without turning them into one Indigenous view"], "reflectPrompt": "In a sentence or two: think of one moment from your week and look at it twice, first through the sociological imagination and then through Ermine's or Battiste's framing. What does each way of seeing show you that the other does not, and what is it like to hold both at once without deciding which is right?"},
      2: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week02", "overview": "This is the framing week for the whole course. Everything you do in SOC122 sits inside one stance: Two-Eyed Seeing. Mi'kmaw Elder Albert Marshall gave us this idea, and the gift is his. He asks you to learn to see with one eye the strengths of Indigenous ways of knowing, and with the other eye the strengths of Western ways of knowing, and, most of all, to use both eyes together for the benefit of all. To understand why this takes real effort, you also read Leroy Little Bear, who shows that Indigenous and Eurocentric worldviews differ at their philosophical roots. They are not two versions of the same picture; they reach the world through different assumptions about time, relationship, and reality. This week you do not blend the two systems into one, and you do not treat Western knowledge as the default that Indigenous knowledge gets added to. You learn what the stance asks of you, and you begin to practise holding both eyes open.", "purpose": "Week 2 sets the stance you will carry through every later week. You read Two-Eyed Seeing in the words of the Elder who named it, Albert Marshall, and you read Leroy Little Bear on why two worldviews can describe the same world and still differ at the root. The aim is to be able to state, in your own words, what Two-Eyed Seeing asks of you: to honour both ways of knowing as whole and complete, to keep them side by side rather than collapsing them into one, and to treat the work as an ongoing journey of co-learning, not a slogan.", "outcomes": ["By the end of this week you can describe Two-Eyed Seeing as Elder Albert Marshall frames it: using the strengths of Indigenous and Western ways of knowing together, for the benefit of all, with neither one displacing the other (Marshall, 2017).", "By the end of this week you can explain, using Leroy Little Bear, why Indigenous and Eurocentric worldviews differ at their philosophical roots, and why that difference matters (Little Bear, 2000).", "By the end of this week you can name what it means to hold both eyes open at once, rather than blending the two systems or treating one as the default (Marshall, 2017).", "By the end of this week you can recognise Two-Eyed Seeing as an ongoing co-learning journey and a gift from Elder Albert Marshall, not a slogan to be trivialized, romanticized, or co-opted (Marshall, 2017)."], "guiding": ["In Marshall's words, what does it mean to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and why does he stress using both eyes together (Marshall, 2017)?", "Little Bear says Indigenous and Eurocentric worldviews differ at the root. What are some of the differences he names, and how would you describe them in your own words (Little Bear, 2000)?", "Why does Marshall insist Two-Eyed Seeing must not be trivialized or co-opted into jargon, and what would it look like to take the stance seriously instead (Marshall, 2017)?", "What is the difference between holding two ways of knowing side by side and blending them into one, and why does Marshall ask you to do the first, not the second (Marshall, 2017)?"], "checks": [{"t": "Two-Eyed Seeing in the words of the Elder who named it: seeing the strengths of both Indigenous and Western ways of knowing, and using both eyes together for the benefit of all", "look": "the Marshall reading and video"}, {"t": "That Two-Eyed Seeing is Elder Albert Marshall's gift, an ongoing co-learning journey, not a slogan to be trivialized, romanticized, or co-opted", "look": "the Marshall reading"}, {"t": "Why Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality, as Little Bear describes them", "look": "the Little Bear reading"}, {"t": "Why holding both eyes side by side is different from blending the two systems into one or treating Western knowledge as the default", "look": "the Marshall reading and the activity"}, {"t": "What the stance asks of you personally, so you can carry Two-Eyed Seeing into every later week of the course", "look": "the activity and your own notes"}], "concepts": [{"h": "Two-Eyed Seeing (Etuaptmumk): the gift and the stance", "body": "Two-Eyed Seeing is Mi'kmaw Elder Albert Marshall's guiding principle, and the English phrase is his. He describes learning to see with one eye the strengths of Indigenous ways of knowing, and with the other eye the strengths of Western ways of knowing, and, most importantly, using both eyes together for the benefit of all. Each way of knowing is a whole, complete eye in its own right, not something to be checked against the other. This is the organizing frame for the entire course, and it is offered here in the coiner's own words.", "cite": "Marshall, 2017"}, {"h": "Both eyes together: do not collapse, do not rank", "body": "The heart of the stance is the word together. Marshall does not ask you to blend the two ways of knowing into a single picture, and he does not ask you to treat Western knowledge as the default that Indigenous knowledge gets added to. He asks you to keep both eyes open at once, so each tradition can do what it does best, for the benefit of all. Holding them side by side, with neither displacing the other, is harder than picking one, and that difficulty is part of the point.", "cite": "Marshall, 2017"}, {"h": "An ongoing co-learning journey, not a slogan", "body": "Marshall is clear that Two-Eyed Seeing is a journey, not a finished idea you can master and set down. It is ongoing co-learning between knowledge traditions, grounded in responsibility and the well-being of future generations. He warns against letting it be trivialized, romanticized, or co-opted into mere jargon. Taking the stance seriously means returning to it, practising it, and letting it shape how you work, rather than treating the phrase as a label.", "cite": "Marshall, 2017"}, {"h": "Why it takes effort: worldviews differ at the root", "body": "Leroy Little Bear explains why holding both eyes open is real work. He argues that Indigenous and Eurocentric worldviews differ at their philosophical roots: an Indigenous worldview of constant flux, wholeness, relationship, and renewal, where all things are animate and time simply is, set against a Eurocentric worldview that is more linear, singular, static, and objective. Because the two reach the world through different assumptions, naming the difference is the first step toward holding them together with respect rather than collapsing one into the other.", "cite": "Little Bear, 2000"}], "terms": [{"term": "Two-Eyed Seeing (Etuaptmumk)", "def": "Mi'kmaw Elder Albert Marshall's guiding principle of using the strengths of Indigenous ways of knowing through one eye and the strengths of Western ways of knowing through the other, and using both eyes together for the benefit of all. It does not blend or rank the two traditions; it holds them side by side so each can do what it does best. It is the gift of Elder Albert Marshall and the organizing frame for this whole course.", "cite": "Marshall, 2017"}, {"term": "Co-learning journey", "def": "Marshall's description of Two-Eyed Seeing as an ongoing, respectful practice between knowledge traditions, not a slogan to be trivialized, romanticized, or co-opted. It is a journey because there is no fixed endpoint: each person keeps learning to see with both eyes over time, and the traditions teach one another.", "cite": "Marshall, 2017"}, {"term": "Worldview", "def": "Little Bear's term for the shared set of assumptions about reality, time, and relationship that a culture uses to interpret the world. He argues that Indigenous and Eurocentric worldviews differ at this root, so two ways of knowing can describe the same world and still reach it through very different assumptions. A worldview usually operates below awareness, which is why naming it is the first step toward holding two eyes together with respect.", "cite": "Little Bear, 2000"}, {"term": "Jagged worldviews", "def": "Little Bear's image for what happens when colonialism forces two root-level different worldviews together by power and law, without recognition, leaving a fragmented consciousness among colonized peoples that still shapes daily life. The word jagged marks that the meeting was not smooth, which is exactly why Two-Eyed Seeing asks for care rather than a careless blending of the two systems.", "cite": "Little Bear, 2000"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "Open access", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "Open access", "id": "littlebear"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "What Two-Eyed Seeing asks of you", "what": "You gather the elements of the Two-Eyed Seeing stance, as Marshall and Little Bear describe them, and set them side by side so you can see what the stance asks of you.", "why": "so you can practise holding both eyes open from the start, and carry the frame, in your own words and not as a slogan, into every later week.", "data": {"goal": "Assemble the elements of the Two-Eyed Seeing stance, as Marshall and Little Bear describe it, so you can practise holding both eyes together rather than blending them into one or treating either way of knowing as the default. The stance is Elder Albert Marshall's gift; your task is to hold the elements, not to write the synthesis for anyone else.", "components": [{"label": "One eye for the strengths of Indigenous ways of knowing", "role": "asks you to see Indigenous knowledge as a whole, complete eye in its own right, valid on its own terms and not as a supplement to Western science.", "cite": "Marshall, 2017"}, {"label": "One eye for the strengths of Western ways of knowing", "role": "asks you to see Western knowledge as a whole eye too, with its own strengths, so that neither eye becomes the default the other is measured against.", "cite": "Marshall, 2017"}, {"label": "Both eyes used together, for the benefit of all", "role": "asks you to keep both eyes open at once and use them together, so each tradition can do what it does best, rather than blending them into one or ranking them.", "cite": "Marshall, 2017"}, {"label": "Respect for the root difference between worldviews", "role": "asks you to remember that Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality, so you hold them with care rather than collapsing one into the other.", "cite": "Little Bear, 2000"}, {"label": "An ongoing co-learning journey, not a slogan", "role": "asks you to treat the stance as ongoing practice grounded in responsibility, returning to it over time, and refusing to let it be trivialized, romanticized, or co-opted into jargon.", "cite": "Marshall, 2017"}]}}, "youcan": ["You can now describe Two-Eyed Seeing in Elder Albert Marshall's own terms: both eyes together, for the benefit of all, with neither way of knowing displacing the other", "You can now explain, using Little Bear, why Indigenous and Eurocentric worldviews differ at the root, and why that makes the stance real work rather than a slogan", "You can now name what the stance asks of you, and carry Two-Eyed Seeing as the frame into every later week of the course"], "reflectPrompt": "In a sentence or two, and in your own words: what does Two-Eyed Seeing ask of you, as Elder Albert Marshall frames it, and what is the hardest part of holding both eyes open at once rather than choosing one?"},
      3: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week03", "overview": "This week asks a plain question with a long history behind it: whose knowledge counts, and who gets to decide? You meet two scholars who answer it from different angles. Debbie Martin describes Two-Eyed Seeing as a respectful pairing of Indigenous and non-Indigenous knowledge, where the two are held together as partners and neither is ranked above the other or absorbed into the other. Brunette-Debassige and colleagues turn to the classroom and the institution, and show that what a school treats as legitimate knowledge is a decision that was made by people and can be remade. Holding both in view, you start to see that knowledge does not simply count on its own. Someone, or some structure, decides that it counts.", "purpose": "Week 3 takes the Two-Eyed Seeing frame you met in Week 2 and looks at the question underneath it: how does a classroom or an institution decide what counts as knowledge, and what would respectful pairing actually require? You work with two scholars on their own terms. Martin frames respectful pairing as the heart of Two-Eyed Seeing. Brunette-Debassige and colleagues frame the legitimacy of knowledge as an institutional decision. The aim is to name the parts of that decision and the conditions of respectful pairing, not to resolve the tension between two knowledge systems into one neat answer.", "outcomes": ["By the end of this week you can explain, in Martin's terms, what respectful pairing of Indigenous and non-Indigenous knowledge means and how it differs from ranking one above the other (Martin, 2012).", "By the end of this week you can explain, in the terms of Brunette-Debassige and colleagues, why what counts as knowledge in a classroom is an institutional decision rather than a given (Brunette-Debassige et al., 2022).", "By the end of this week you can name the parts of how an institution decides what counts as knowledge, and distinguish adding Indigenous content from changing who holds authority (Brunette-Debassige et al., 2022).", "By the end of this week you can describe what respectful pairing requires without writing a bridge that dissolves the difference between the two knowledge systems (Martin, 2012)."], "guiding": ["Martin describes pairing rather than ranking. What is the difference, and why does she treat pairing as something that has to be practised rather than copied (Martin, 2012)?", "Brunette-Debassige and colleagues say the knowledge a classroom treats as legitimate was decided, not given. Who decided, and what does it mean that the decision can be remade (Brunette-Debassige et al., 2022)?", "What is the difference between adding Indigenous readings to an unchanged course and changing who holds authority over what counts (Brunette-Debassige et al., 2022)?", "Martin ties pairing to sovereignty: the community sets the terms on which its knowledge is shared. How does that change what a respectful pairing can ask for (Martin, 2012)?"], "checks": [{"t": "What Two-Eyed Seeing means as a respectful pairing of Indigenous and non-Indigenous knowledge, held as partners rather than ranked", "look": "the Martin reading"}, {"t": "Why what counts as knowledge in a classroom is an institutional decision that was made and can be remade, not a fact handed down", "look": "the Brunette-Debassige and colleagues reading"}, {"t": "The difference between adding Indigenous content to an unchanged structure and changing who holds authority over what counts", "look": "the Brunette-Debassige and colleagues reading"}, {"t": "Why respectful pairing depends on sovereignty: the community setting the terms on which its knowledge is engaged, so it is not extracted into a Western frame", "look": "the Martin reading"}, {"t": "Naming the parts of how knowledge gets decided, and what respectful pairing requires, without writing a bridge that resolves the tension for you", "look": "the activity and both readings"}], "concepts": [{"h": "Respectful pairing, not ranking", "body": "Debbie Martin describes Two-Eyed Seeing as a respectful pairing of Indigenous and non-Indigenous knowledge. The two approaches are held together as partners that can inform one another, and neither is ranked above the other or absorbed into the other. Pairing is not a method you copy once and are done with. It is a relationship that has to be practised, which is why it cannot be reduced to a checklist of readings.", "cite": "Martin, 2012"}, {"h": "What counts as knowledge is decided", "body": "Brunette-Debassige and colleagues argue that the knowledge a classroom treats as legitimate was decided, not given. People and structures made that decision, often long ago, and a decision can be remade. This reframes a familiar feeling that some knowledge just is academic and other knowledge is not. That ranking was put in place; it did not arrive on its own.", "cite": "Brunette-Debassige et al., 2022"}, {"h": "Adding content is not the same as changing authority", "body": "Brunette-Debassige and colleagues distinguish two very different moves. One adds Indigenous readings to a course whose structure stays the same. The other changes how the curriculum is built and who holds authority over what counts. They describe decolonizing as removing colonial barriers and Indigenizing as ongoing institutional work, and they show that only the second move changes the decision about whose knowledge counts.", "cite": "Brunette-Debassige et al., 2022"}, {"h": "Pairing depends on sovereignty", "body": "Martin ties respectful pairing to sovereignty: the authority of a people to govern themselves and to set the terms on which their knowledge is shared and used. Pairing respects sovereignty when Indigenous knowledge is engaged on its own terms rather than extracted into a Western frame. This is what keeps pairing from becoming another way of taking. The community, not the institution, sets the terms.", "cite": "Martin, 2012"}], "terms": [{"term": "Two-Eyed Seeing", "def": "the respectful pairing of Indigenous and non-Indigenous approaches to knowledge, holding the two together as partners that can inform one another, without ranking one above the other or absorbing one into the other.", "cite": "Martin, 2012"}, {"term": "Respectful pairing", "def": "Martin's term for bringing two knowledge systems together as equals that must be practised as an ongoing relationship, rather than copied as a fixed method or merged into a single account.", "cite": "Martin, 2012"}, {"term": "Indigenizing", "def": "making space within institutions for Indigenous knowledge, peoples, and ways of doing, which changes how a curriculum is built and who holds authority in it, rather than only adding content to an unchanged structure.", "cite": "Brunette-Debassige et al., 2022"}, {"term": "Sovereignty", "def": "the authority of a people to govern themselves by their own laws and relationships, which in the context of knowledge includes the right to control their own knowledge and set the terms on which it is shared and used.", "cite": "Martin, 2012"}], "readings": [{"apa": "Martin, D. H. (2012). Two-Eyed Seeing: A framework for understanding Indigenous and non-Indigenous approaches to Indigenous health research. Canadian Journal of Nursing Research, 44(2), 20-42.", "scope": "Open access", "id": "martin2012"}, {"apa": "Brunette-Debassige, C., Wakeham, P., Smithers Graeme, C., Haque, A., & Chitty, S. (2022). Decolonizing and Indigenizing the curriculum: A review of perspectives and approaches in Canadian higher education. Western University.", "scope": "Open access", "id": "brunette2022"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Whose knowledge counts", "what": "You assemble the parts of how a classroom or institution decides what counts as knowledge, and the conditions respectful pairing requires, attributing each part to the scholar who names it.", "why": "so you can name the moving parts of the decision and the requirements of pairing on the scholars' own terms, without writing a bridge that resolves the tension between the two knowledge systems for you.", "data": {"goal": "Assemble two things side by side: the parts of how a classroom or institution decides what counts as knowledge, as Brunette-Debassige and colleagues describe them, and what respectful pairing of Indigenous and non-Indigenous knowledge requires, as Martin describes it. Keep each part attributed to its scholar. The point is not to merge the two into one answer; it is to see clearly what each names and where the tension between them sits.", "components": [{"label": "The decision about what counts", "role": "names the starting move: the knowledge a classroom treats as legitimate was decided by people and structures, not handed down, which means it can be remade", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Who holds authority", "role": "names who gets to make and remake that decision, and shows that changing the list of readings is not the same as changing who holds authority over what counts", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Indigenizing the structure", "role": "names the institutional work of making space for Indigenous knowledge and ways of doing, which changes how a curriculum is built rather than only adding content to an unchanged structure", "cite": "Brunette-Debassige et al., 2022"}, {"label": "Pairing as partners, not a ranking", "role": "names what respectful pairing requires: holding Indigenous and non-Indigenous knowledge together as partners, with neither ranked above the other or absorbed into the other", "cite": "Martin, 2012"}, {"label": "Pairing as a practised relationship", "role": "names that pairing is not a method to copy once but a relationship that must be practised, so it cannot be reduced to a checklist", "cite": "Martin, 2012"}, {"label": "Sovereignty over the terms", "role": "names the condition that the community sets the terms on which its knowledge is shared and used, so pairing engages Indigenous knowledge on its own terms rather than extracting it into a Western frame", "cite": "Martin, 2012"}]}}, "youcan": ["You can now explain respectful pairing in Martin's terms and say how it differs from ranking one knowledge system above the other (Martin, 2012)", "You can now explain why what counts as knowledge in a classroom is an institutional decision that was made and can be remade (Brunette-Debassige et al., 2022)", "You can now name the parts of that decision and the conditions of respectful pairing, and hold the tension between them without resolving it for someone else"], "reflectPrompt": "In a sentence or two: think of one course or setting you have been in. Who decided what counted as real knowledge there, and what would it take to remake that decision in the direction Brunette-Debassige and colleagues describe (Brunette-Debassige et al., 2022)?"},
      4: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week04", "overview": "This week asks what responsible reconciliation work requires from evidence and institutions. The Truth and Reconciliation Commission of Canada built a public record from Survivor testimony, records, and research on the residential school system, then issued 94 Calls to Action. Janet Smylie and Marcia Anderson examine a different institution: Indigenous health-data systems. They identify problems of coverage, quality, jurisdiction, governance, relevance, and capacity, including failures to identify First Nations, Métis, and Inuit people accurately and respectfully. The First Nations Health Authority defines cultural safety as an outcome shaped by respectful engagement and attention to power imbalances in health care. These sources do different work. Keep the TRC's public record, Smylie and Anderson's analysis of measurement and governance, and the FNHA's First Nations-led health-system framework distinct while asking what responsibility follows.", "purpose": "Week 4 moves from acknowledgement to institutional responsibility. You will use the TRC summary to identify documented harms and Calls to Action, Smylie and Anderson to examine who controls health information and whose purposes it serves, and the First Nations Health Authority to examine power and safety in a health-care encounter. The aim is not to speak for Survivors or communities. It is to distinguish the authority, evidence, and limits of each source, then make a bounded claim about what an institution must change.", "outcomes": ["By the end of this week you can explain why the Truth and Reconciliation Commission built a public record before issuing Calls to Action, using the Commission's 2015 summary.", "By the end of this week you can identify the data coverage, jurisdiction, governance, relevance, and capacity problems Smylie and Anderson document.", "By the end of this week you can explain the First Nations Health Authority's distinction between cultural safety as an outcome and cultural humility as an ongoing practice.", "By the end of this week you can compare three sources with different purposes without treating them as interchangeable evidence."], "guiding": ["What kind of evidence did the Truth and Reconciliation Commission gather, and what responsibilities do its Calls to Action place on institutions?", "When official data misidentify or omit people, how does that shape what institutions think they know and what they decide to do?", "Why do Smylie and Anderson treat data governance as more than a technical question?", "How does the First Nations Health Authority shift cultural safety from a claim made by a provider to an outcome experienced by the person receiving care?"], "checks": [{"t": "The Truth and Reconciliation Commission used Survivor testimony and institutional records to document the residential school system and issued 94 Calls to Action", "look": "the TRC summary and Calls to Action"}, {"t": "Smylie and Anderson identify problems of coverage and quality, jurisdiction and utility, governance and relevance, and human-resource capacity", "look": "Smylie and Anderson, 2006"}, {"t": "First Nations, Métis, and Inuit are distinct peoples, and data systems must identify them accurately and respectfully rather than collapse them into one category", "look": "Smylie and Anderson, 2006"}, {"t": "The First Nations Health Authority defines cultural safety as an outcome and cultural humility as an ongoing process of self-reflection and relationship", "look": "First Nations Health Authority"}, {"t": "A comparison is responsible only when each source's authority, purpose, evidence, and limits remain visible", "look": "the activity and Key Concepts"}], "concepts": [{"h": "A public record before institutional action", "body": "The Truth and Reconciliation Commission's 2015 summary documents the residential school system through Survivor testimony, records, and research. Its Calls to Action direct specific responsibilities to governments, churches, schools, professional bodies, archives, and other institutions. The public record and the Calls are connected but not identical: one documents what happened and its continuing effects; the other names actions institutions are called to take.", "cite": "Truth and Reconciliation Commission of Canada, 2015"}, {"h": "Measurement is governed", "body": "Smylie and Anderson show that Indigenous health data in Canada are shaped by decisions about coverage, identification, jurisdiction, ownership, relevance, and capacity. A number can be technically produced and still fail the people it claims to describe. Their account keeps First Nations, Métis, and Inuit distinctions visible and argues that Indigenous governments and communities must shape and govern information used for local planning and health equity.", "cite": "Smylie & Anderson, 2006"}, {"h": "Cultural safety is an outcome", "body": "The First Nations Health Authority defines cultural safety as an outcome of respectful engagement that recognizes and works to address power imbalances in health care. Cultural humility is the continuing practice of self-reflection, learning, and relationship that can help make that outcome possible. A provider cannot declare an encounter culturally safe simply because they intended to be respectful; the experience and the institutional conditions matter.", "cite": "First Nations Health Authority"}, {"h": "Compare without substituting", "body": "The TRC summary, Smylie and Anderson's academic article, and the First Nations Health Authority framework have different authors, purposes, and evidence bases. The TRC public record cannot be reduced to a health-data study. A First Nations-led cultural-safety framework cannot be generalized to every Indigenous people or institution. Responsible synthesis names the relation among sources without making any one of them stand in for the others.", "cite": "TRC, 2015; Smylie & Anderson, 2006; First Nations Health Authority"}], "terms": [{"term": "Reconciliation", "def": "In the TRC summary, an ongoing process of establishing and maintaining respectful relationships that requires awareness of the past, acknowledgement of harm, atonement, and action to change behaviour. It is not completed by a single apology.", "cite": "Truth and Reconciliation Commission of Canada, 2015"}, {"term": "Truth and Reconciliation Commission of Canada", "def": "The Commission created under the Indian Residential Schools Settlement Agreement that gathered testimony and records, documented the residential school system and its continuing effects, and issued 94 Calls to Action in 2015.", "cite": "Truth and Reconciliation Commission of Canada, 2015"}, {"term": "Indigenous data governance", "def": "The authority of Indigenous governments and communities to shape, control, interpret, and use information about their peoples. Smylie and Anderson connect governance to coverage, jurisdiction, relevance, local planning, and health equity.", "cite": "Smylie & Anderson, 2006"}, {"term": "Cultural safety and cultural humility", "def": "In the First Nations Health Authority framework, cultural safety is an outcome in which power imbalances, racism, and discrimination are addressed so people feel safe in care. Cultural humility is the ongoing self-reflection and relationship-building practice that supports that outcome.", "cite": "First Nations Health Authority"}], "readings": [{"apa": "Truth and Reconciliation Commission of Canada. (2015). Honouring the truth, reconciling for the future: Summary of the final report of the Truth and Reconciliation Commission of Canada.", "scope": "Use the assigned excerpts and Calls to Action", "id": "trc2015"}, {"apa": "Smylie, J., & Anderson, M. (2006). Understanding the health of Indigenous peoples in Canada. Canadian Medical Association Journal, 175(6), 602-605. https://doi.org/10.1503/cmaj.060940", "scope": "Open access", "id": "smylie"}, {"apa": "First Nations Health Authority. (n.d.). Cultural safety and humility.", "scope": "Open access framework", "id": "fnha-cultural-safety"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "From evidence to institutional responsibility", "what": "You assemble an evidence wall that keeps three sources separate, then identify one bounded institutional responsibility supported by the evidence.", "why": "so you can move from acknowledgement to action without collapsing Survivor testimony, an academic data-governance analysis, and a First Nations-led health framework into one source or one generic Indigenous perspective.", "data": {"goal": "Build an evidence trail from source to responsibility. For each component, name who produced the source, what evidence or authority it carries, what it supports, and what it does not establish. Do not role-play harm, speak for a community, or turn one framework into a universal Indigenous position.", "components": [{"label": "TRC public record", "role": "identifies the residential school system, its harms and continuing effects through Survivor testimony, records, and research.", "cite": "Truth and Reconciliation Commission of Canada, 2015"}, {"label": "TRC Calls to Action", "role": "name concrete responsibilities directed to governments, institutions, professions, and people in Canada; they are action demands connected to the public record.", "cite": "Truth and Reconciliation Commission of Canada, 2015"}, {"label": "Coverage and identification", "role": "shows how data systems can omit or misidentify First Nations, Métis, and Inuit people, weakening both national understanding and local usefulness.", "cite": "Smylie & Anderson, 2006"}, {"label": "Jurisdiction and data governance", "role": "asks who has authority over information, whose purposes the data serve, and whether communities can use it for their own planning.", "cite": "Smylie & Anderson, 2006"}, {"label": "Cultural safety as an outcome", "role": "places attention on power, racism, discrimination, and the person's experience of care rather than on a provider's good intention alone.", "cite": "First Nations Health Authority"}, {"label": "A bounded institutional change", "role": "states one change in rules, resources, authority, records, or relationships, and identifies exactly which source supports it and which questions remain open.", "cite": "Your evidence trail"}]}}, "youcan": ["You can now explain the distinct work of the TRC public record and Calls to Action", "You can now identify the data-system problems Smylie and Anderson document and explain why governance matters", "You can now distinguish cultural safety as an outcome from cultural humility as a practice", "You can now build a source-specific claim about institutional responsibility without conflating peoples or evidence"], "reflectPrompt": "Choose one institution or professional setting. What is one responsibility supported by this week's sources? Name the source that supports the responsibility, explain its evidence or authority, and state one limit or unanswered question. Do not speak for Survivors or a community; keep the claim at the level the source can support."},
      5: {"time":"Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.","deck":"SOC122_Week05","overview":"This week begins with one public claim: CBC Marketplace asks why people are drawn back to their smartphones. The investigation is the source of the lesson. You watch it as a social scientist, not as a passive viewer. First, identify how the story defines the problem, who it studies, what it measures, which experts it trusts, and where it moves from observation to explanation. Then use OpenStax to audit the investigation through research design, sampling, reliability, validity, causal inference, and ethics. Finally, use Reid and colleagues to ask a second set of questions: whose knowledge defines the problem, who has authority in the research, what relationships must be respected, and what responsibility follows from knowing. The video supplies the case. The readings supply two rigorous ways to question it.","purpose":"Week 5 turns a familiar media story into a research-methods lab. The goal is not to decide whether phones are simply good or bad, or to diagnose every user as addicted. The goal is to decide what the Marketplace investigation can support, what remains uncertain, and how the research question changes when method, evidence, knowledge authority, ethics, and responsibility are all visible.","outcomes":["By the end of this week you can identify the main claims, sample, measures, evidence types, causal language, and limits in the CBC Marketplace investigation.","By the end of this week you can use OpenStax to evaluate whether a public research claim is supported by its design, reliability, validity, and ethics.","By the end of this week you can explain how Two-Eyed Seeing changes questions about whose knowledge counts, who holds authority, and what responsibility follows from research.","By the end of this week you can write a careful conclusion that separates what the video shows, what it suggests, and what it does not establish."],"guiding":["What does the Marketplace investigation mean by addicted, and how is that idea measured rather than assumed?","Who is included in the family experiment, and what can one family reveal or not represent about a wider population?","Where does the video show an observation, an association, a plausible mechanism, or a causal claim? Does the design support each move?","How would the research question, relationships, and responsibility change if the people being studied held co-equal authority over the investigation?"],"checks":[{"t":"The Marketplace investigation's central claim, the evidence it shows, and the difference between a headline and a measured conclusion","look":"the CBC Marketplace video and your source note"},{"t":"How operational definitions, sampling, reliability, validity, and ethics determine what a research claim can support","look":"the OpenStax reading on sociological research"},{"t":"The difference between observation, association, causal inference, and interpretation in a public investigation","look":"the video, the OpenStax reading, and the Week 5 methods audit"},{"t":"Why Reid and colleagues reject absorbing Indigenous knowledge into Western science and instead centre knowledge systems as co-equal","look":"the Reid et al. reading on Two-Eyed Seeing"},{"t":"How trustworthy research makes its limits visible and names who has authority, who carries risk, and what responsibility follows","look":"the source-comparison activity and your reflection"}],"concepts":[{"h":"A headline is a research claim to examine","body":"Marketplace uses the word addicted to make the investigation immediate. A social-science reading pauses before accepting that label. Ask how the term is defined, whether the investigation measures a clinical condition, repeated use, loss of control, design pressure, self-report, or something else, and whether the conclusion stays within that definition. The stronger move is not to reject the headline automatically. It is to make the claim precise enough to test.","cite":"CBC Marketplace, 2017; OpenStax, 2021"},{"h":"Sample, measure, and inference set the boundary","body":"The family experiment offers detailed observation of real people over time, but one family cannot represent every age, culture, income, disability, occupation, or reason for using a phone. Tracking time can show frequency and pattern; it does not by itself explain motive or establish a diagnosis. A careful conclusion matches the scale of the claim to the sample and the measure, then states what remains uncertain.","cite":"CBC Marketplace, 2017; OpenStax, 2021"},{"h":"Method audits the story without flattening it","body":"OpenStax gives you a method audit: identify the research question, operational definition, design, sample, quantitative and qualitative evidence, reliability, validity, causal language, and ethics. This does not make the video useless because it is journalism. It lets you use the video responsibly by separating a vivid example from a general claim and a plausible mechanism from a demonstrated cause.","cite":"OpenStax, 2021"},{"h":"Two-Eyed Seeing changes authority and responsibility","body":"Reid and colleagues argue that Indigenous knowledge should not be incorporated into Western science as an add-on. It must stand as a co-equal knowledge system, and knowing carries an action imperative. Applied to the video, this raises questions that a standard method checklist may not answer on its own: who defined harmful use, whose relationships to technology are centred, who controls the data, who benefits from the finding, and what responsibility the knowledge creates.","cite":"Reid et al., 2021"}],"terms":[{"term":"Operational definition","def":"the precise rule used to turn an idea such as addiction, repeated checking, or problematic use into something that can be observed or measured.","cite":"OpenStax, 2021"},{"term":"Sample and generalization","def":"the people actually studied and the limits on applying what happened in that group to a wider population.","cite":"OpenStax, 2021"},{"term":"Causal inference","def":"a conclusion that one factor helped produce another, which requires stronger evidence than showing that two things occurred together.","cite":"OpenStax, 2021"},{"term":"Two-Eyed Seeing and action imperative","def":"a framework in which Indigenous and Western knowledge systems remain co-equal, and knowledge changes the holder by creating a responsibility to act.","cite":"Reid et al., 2021"}],"readings":[{"apa":"CBC News, Marketplace. (2017). Why you're addicted to your smartphone [Video]. YouTube. https://www.youtube.com/watch?v=ZFJUYS6wY7U","scope":"Watch the captioned lesson source","id":"cbcsmartphone2017"},{"apa":"OpenStax. (2021). Sociological research. In Introduction to sociology 3e. OpenStax, Rice University. https://openstax.org/books/introduction-sociology-3e/pages/2-introduction","scope":"Read Chapter 2, pp. 35-61, as the methods audit","id":"soc-research"},{"apa":"Reid, A. J., Eckert, L. E., Lane, J.-F., Young, N., Hinch, S. G., Darimont, C. T., Cooke, S. J., Ban, N. C., and Marshall, A. (2021). Two-Eyed Seeing: An Indigenous framework to transform fisheries research and management. Fish and Fisheries, 22(2), 243-261. https://doi.org/10.1111/faf.12516","scope":"Use this reading to question knowledge authority and responsibility","id":"reid2021"}],"activity":{"screen":"activity","archetype":"assemble","title":"Audit the Marketplace investigation","what":"You build an evidence map of the CBC investigation by separating its claim, definition, sample, measures, evidence, inference, ethics, knowledge authority, and limits.","why":"so you can use a public video as a serious course source without mistaking a vivid story for stronger evidence than the investigation provides.","data":{"goal":"Build a careful conclusion about what the Marketplace investigation shows, suggests, and does not establish. Attribute each test to its source and keep uncertainty visible.","components":[{"label":"The claim","role":"Write the investigation's main claim without repeating the headline as if it were already proven.","cite":"CBC Marketplace, 2017"},{"label":"The operational definition","role":"Identify what the investigation actually observes or measures when it uses the word addicted.","cite":"OpenStax, 2021"},{"label":"The sample","role":"Name who is studied and one reason the sample may not represent a wider population.","cite":"OpenStax, 2021"},{"label":"The evidence","role":"Separate tracked behaviour, interviews, expert explanation, demonstrations, and interpretation.","cite":"CBC Marketplace, 2017; OpenStax, 2021"},{"label":"The inference","role":"Mark where the story moves from what happened to why it happened, then decide whether the design supports that move.","cite":"OpenStax, 2021"},{"label":"Ethics and power","role":"Ask who collects behavioural data, who benefits from engagement, who carries risk, and who can refuse.","cite":"CBC Marketplace, 2017; OpenStax, 2021"},{"label":"Knowledge authority","role":"Ask whose knowledge defines the problem and how co-equal authority would change the question or method.","cite":"Reid et al., 2021"},{"label":"The careful conclusion","role":"State what the evidence supports, what it only suggests, and what further evidence would be needed.","cite":"CBC Marketplace, 2017; OpenStax, 2021; Reid et al., 2021"}]}},"youcan":["You can now audit a public video by identifying its claim, sample, measures, evidence, inference, ethics, and limits","You can now separate what a source shows from what it suggests and what it does not establish","You can now use Western research-methods standards and Two-Eyed Seeing without collapsing one into the other"],"reflectPrompt":"Write three sentences about the video: one sentence for what the evidence shows, one for what it suggests but does not prove, and one for how the research question or responsibility would change if the people being studied held co-equal authority."},
      6: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week06", "overview": "This week we step into anthropology, the social science that studies culture. OpenStax gives us the core idea: culture is whatever is learned and shared by a group rather than inborn, and the anthropologist's job is to understand human difference on its own terms instead of ranking it as better or worse (OpenStax, 2022). Then we turn the lens back on the discipline itself. Zoe Todd, a Red River Métis anthropologist, shows that the field often takes up Indigenous ideas about land and relationship while leaving out the Indigenous people, scholars, and communities those ideas come from (Todd, 2016). She heard a famous scholar describe climate as a shared concern in language that echoed Inuit concepts she had been taught, with no credit given. That is the heart of the week: using a culture's ideas is not the same as honouring the people who hold them. The activity puts you in that exact choice, again and again.", "purpose": "Week 6 introduces the culture concept and then asks an honest question about how that concept gets used. Having learned that culture is learned and shared, and that difference should be understood rather than ranked (OpenStax, 2022), you study Todd's argument that borrowing Indigenous ideas while erasing Indigenous people is colonialism in another form (Todd, 2016). The aim is to tell the difference between respectful engagement, which credits the people and stays accountable to them, and appropriation, which lifts the idea and erases the source.", "outcomes": ["By the end of this week you can explain the culture concept: an element of human life counts as culture when it is learned and shared by a group rather than inborn (OpenStax, 2022).", "By the end of this week you can define cultural relativism and ethnocentrism and say why understanding a practice on its own terms is the anthropological stance (OpenStax, 2022).", "By the end of this week you can state Todd's argument that borrowing Indigenous ideas while erasing Indigenous people and scholars is colonialism in another form, and that honest scholarship must credit them (Todd, 2016).", "By the end of this week you can tell respectful engagement from appropriation in a concrete case, naming who is credited and who is erased (Todd, 2016)."], "guiding": ["OpenStax says culture is learned and shared, not inborn. What follows from that for how we should treat a culture that is not our own (OpenStax, 2022)?", "Cultural relativism asks you to understand a practice on its own terms. How is that different from simply agreeing with it (OpenStax, 2022)?", "Todd heard Indigenous concepts repeated with no credit. Why does she call that colonialism in another form rather than a harmless overlap (Todd, 2016)?", "Todd centres citation and acknowledgement. What does it actually look like to credit and stay accountable to the Indigenous thinkers behind an idea (Todd, 2016)?"], "checks": [{"t": "What culture is in anthropology: learned and shared by a group rather than inborn, and understood on its own terms rather than ranked", "look": "the OpenStax culture chapter"}, {"t": "The difference between cultural relativism, understanding a practice in its own context, and ethnocentrism, judging it by your own standards", "look": "the OpenStax culture chapter"}, {"t": "Todd's argument that borrowing Indigenous ideas while erasing the Indigenous people and scholars behind them is colonialism in another form", "look": "the Todd reading and the Latour and Sila example in it"}, {"t": "Why Todd centres citation and acknowledgement: honest scholarship must credit and stay accountable to the Indigenous thinkers it draws on", "look": "the Todd reading"}, {"t": "How to tell respectful engagement from appropriation in a real case: who is credited, who is erased, and who holds authority over the idea", "look": "the activity and the two readings together"}], "concepts": [{"h": "The culture concept", "body": "OpenStax presents culture as the central idea in anthropology. Something counts as culture when it is learned and shared by a group rather than being inborn, which means culture is not fixed and not natural law but a way of living that people pass on and change over time. Anthropology treats culture holistically, as parts that fit together, and it makes the case that human difference is to be understood on its own terms rather than ranked as superior or inferior. The discipline's core habit of perception is simple to state and hard to practise: describe difference, do not grade it.", "cite": "OpenStax, 2022"}, {"h": "Cultural relativism and ethnocentrism", "body": "Cultural relativism is the practice of understanding a practice within its own cultural context rather than judging it by the standards of another. It asks the observer to set aside their own assumptions long enough to see what a practice means to the people who live it. Its opposite is ethnocentrism: judging another culture by the standards of your own and treating your own as the natural measure of all others. Ethnocentrism is often invisible to the person holding it, which is exactly why anthropology trains people to notice when they are mistaking their own customs for human nature.", "cite": "OpenStax, 2022"}, {"h": "Borrowing the idea, erasing the people", "body": "Zoe Todd, a Red River Métis anthropologist, recounts hearing a celebrated scholar describe climate as a matter of shared concern in language that echoed Inuit concepts such as Sila that she had been taught, with no credit given to Indigenous thinkers. From this she argues that the academy's ontological turn repackages Indigenous thought while erasing the Indigenous people, scholars, and legal orders it comes from. That is why she says ontology can become just another word for colonialism: the ideas are used, and the people who hold them are left out of the citations, the credit, and the room.", "cite": "Todd, 2016"}, {"h": "Citation as accountability", "body": "Todd's response is not to stop sharing ideas but to change how scholars handle them. She centres citational practice and acknowledgement: honest scholarship must credit and stay accountable to the Indigenous thinkers it draws on. Crediting people by name is not a courtesy at the end of a paper but the thing that keeps the knowledge honest, because Indigenous ideas carry their meaning through lived relationship and obligation. Strip an idea away from the people and communities that give it meaning and you are left with a hollow word. The remedy is concrete: name the thinkers, cite the source, and keep the people present.", "cite": "Todd, 2016"}], "terms": [{"term": "Culture", "def": "the shared beliefs, practices, language, and meanings a group of people learn and pass on; culture is learned and shared rather than inborn, and it is contested and always changing as people live it.", "cite": "OpenStax, 2022"}, {"term": "Cultural relativism", "def": "understanding a practice within its own cultural context rather than judging it by the standards of another; a research stance that suspends one's own assumptions long enough to see what a practice means to the people who live it.", "cite": "OpenStax, 2022"}, {"term": "Ethnocentrism", "def": "judging another culture by the standards of one's own and treating one's own as the norm against which others fall short; often invisible to the person holding it, which is the habit cultural relativism is meant to interrupt.", "cite": "OpenStax, 2022"}, {"term": "Citational practice", "def": "Todd's term for crediting and staying accountable to the Indigenous thinkers an idea comes from; naming the people and scholars behind a concept rather than borrowing the idea while erasing its source.", "cite": "Todd, 2016"}], "readings": [{"apa": "OpenStax. (2022). The culture concept. In Introduction to anthropology. https://openstax.org/books/introduction-anthropology/pages/3-introduction", "scope": "Open access", "id": "anth-culture"}, {"apa": "Todd, Z. (2016). An Indigenous feminist's take on the ontological turn: 'Ontology' is just another word for colonialism. Journal of Historical Sociology, 29(1), 4-22. https://doi.org/10.1111/johs.12124", "scope": "Seneca Library", "id": "todd2016"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Engage or appropriate", "what": "You follow someone who wants to use an Indigenous idea in their own work, deciding at each turn whether to credit and stay accountable to the people behind it or to lift the idea and erase its source.", "why": "so you practise telling respectful engagement from appropriation on a concrete case, which is exactly the line Todd asks scholars to hold (Todd, 2016).", "data": {"setup": "A non-Indigenous graduate student is writing about climate and relationship to land. In a class she learns about Inuit concepts such as Sila, and she also reads work by Indigenous scholars on land as a living relationship rather than a resource. The ideas are powerful and she wants to build her project on them. This is the situation Todd describes from the inside: ideas about land and relationship that come from Indigenous people and communities, now picked up by someone outside them (Todd, 2016). You step into the choices she faces as the project takes shape.", "steps": [{"situation": "She drafts the core argument of her project around an Inuit concept she learned in class, and she has to decide how to present where the idea came from.", "choices": [{"label": "Fold the idea into her own framing as a general insight about climate, without naming the Indigenous source", "outcome": "The idea is used and the people who hold it disappear. This is exactly the move Todd names: repackaging Indigenous thought while erasing the Indigenous people and scholars it comes from, which she calls colonialism in another form.", "harm": true, "cite": "Todd, 2016"}, {"label": "Name the concept as Inuit, credit the Indigenous thinkers she learned it from, and cite their work", "outcome": "The idea stays connected to its source. Crediting the people by name and citing them is the citational practice Todd centres, the thing that keeps borrowed knowledge honest and accountable to the people behind it.", "harm": false, "cite": "Todd, 2016"}]}, {"situation": "A reviewer points out that she is describing an Indigenous practice and asks how she is treating it. She decides what stance to take toward the practice itself.", "choices": [{"label": "Judge the practice against her own assumptions about what a sound relationship to land looks like", "outcome": "She measures the practice by the standards of her own culture and treats those standards as the norm. That is ethnocentrism, the habit anthropology trains people to notice and interrupt rather than mistake for human nature.", "harm": true, "cite": "OpenStax, 2022"}, {"label": "Work to understand the practice within its own cultural context before saying anything about it", "outcome": "She suspends her own assumptions long enough to see what the practice means to the people who live it. That is cultural relativism, the anthropological stance of understanding difference on its own terms rather than ranking it.", "harm": false, "cite": "OpenStax, 2022"}]}, {"situation": "The project is nearly done and she considers how, if at all, to involve the Indigenous community whose knowledge she has built on.", "choices": [{"label": "Reach out so the community can see the work, respond, and have authority over how their knowledge is used", "outcome": "She keeps the people present and accountable, not just their ideas. This is what Todd asks for beyond citation: staying accountable to the Indigenous thinkers and communities an idea comes from, so the knowledge is engaged with rather than extracted.", "harm": false, "cite": "Todd, 2016"}, {"label": "Publish as is, since the concepts are interesting and already discussed in academic circles", "outcome": "The ideas are taken and the people are left out of the credit and the decisions. Todd shows this is the failure to avoid: Indigenous knowledge used without Indigenous authority is the colonial pattern repeating, however polished the work looks.", "harm": true, "cite": "Todd, 2016"}, {"label": "Treat the concept as a free-floating idea that belongs to no one in particular now", "outcome": "Cutting the idea loose from the people who hold it is the erasure Todd warns against. Indigenous ideas carry their meaning through lived relationship and obligation, so an idea stripped of its source loses what made it real and erases the thinkers behind it.", "harm": true, "cite": "Todd, 2016"}]}]}}, "youcan": ["You can now explain the culture concept: an element of human life counts as culture when it is learned and shared by a group rather than inborn (OpenStax, 2022)", "You can now tell cultural relativism from ethnocentrism and say why anthropology asks you to understand difference on its own terms (OpenStax, 2022)", "You can now tell respectful engagement from appropriation in a concrete case, naming who is credited, who is erased, and who holds authority over the idea (Todd, 2016)"], "reflectPrompt": "In a sentence or two: think of an idea, practice, or story you have borrowed from a culture that is not your own. What would it take to engage with it the way Todd asks, crediting the people and staying accountable to them, rather than just using it (Todd, 2016)?"},
      8: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week08", "overview": "This week is about a basic sociological idea and what happens when state power gets hold of it. Socialization is the lifelong process by which we learn who we are through relationship, not at birth and not alone. OpenStax shows that almost everything that feels natural about being a person is actually learned in the company of others. Then Bonita Lawrence takes the question one step further: she shows how settler law turned who counts as Indigenous into a bureaucratic question, deciding through the Indian Act and the category of status who legally counted as Indian and who did not. You will hold these two readings together and ask who gets to define an identity category, and on whose terms.", "purpose": "The point of this week is to connect socialization, the everyday way identity is learned in relationship, to social structure, the patterned institutions and laws that organize a society. OpenStax (2021) gives you socialization as learning the self through others; Lawrence (2003) shows what changes when the state, rather than a community, decides who counts. The aim is to see that identity categories are made, and that it matters a great deal who is allowed to make them.", "outcomes": ["By the end of this week you can explain socialization as the lifelong process of learning who we are through relationship rather than forming alone, after OpenStax (2021).", "By the end of this week you can describe how Lawrence (2003) shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status.", "By the end of this week you can distinguish a community defining its own belonging from an outside authority imposing a legal definition, and say why the difference matters.", "By the end of this week you can use the sociological imagination to read a single life as shaped by the larger structures that define its categories, after OpenStax (2021)."], "guiding": ["OpenStax says who we are is learned in relationship. If identity is learned, then who is doing the teaching, and whose terms are being taught?", "Lawrence shows the state deciding who counts as Indigenous. What is gained and what is lost when a law, rather than a community, draws that line?", "Lawrence draws on Foucault to argue these laws can come to feel natural. How does a legal category start to feel like a simple fact?", "When you fill in a form that asks for your identity, who wrote the categories, and who is left without a box to check?"], "checks": [{"t": "Socialization as the lifelong process of learning who we are through relationship, not at birth and not alone", "look": "the OpenStax reading"}, {"t": "Social structure as the patterned institutions and laws that shape a person's options before any choice is made", "look": "the OpenStax reading and the Key Concepts"}, {"t": "How Lawrence shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status", "look": "the Lawrence reading"}, {"t": "Why it matters whether a community defines its own belonging or an outside authority imposes the legal definition", "look": "the Lawrence reading"}, {"t": "Reading an identity category as something made by people and institutions, and naming who gets to make it", "look": "the activity and the readings"}], "concepts": [{"h": "Socialization", "body": "Socialization is the lifelong process by which people learn to be members of a society, taking on its norms, roles, and a sense of self through interaction. OpenStax discusses difficult cases of extreme social isolation to show how much of what feels natural about being a person is actually learned in relationship. Who we are is not fixed at birth; it is built, over a whole life, in the company of others.", "cite": "OpenStax, 2021"}, {"h": "Social structure and the sociological imagination", "body": "Social structure is the patterned web of institutions, such as family, school, work, and law, that organizes a society and shapes a person's options before they make any choice. The sociological imagination is the habit of reading a single life against that larger arrangement, so that a private situation can be seen as also produced by history and structure. This is the move that lets us ask not just who a person is, but what defined the categories they live inside.", "cite": "OpenStax, 2021"}, {"h": "The regulation of Native identity", "body": "Bonita Lawrence (Mi'kmaw) argues that regulating Native identity, through the Indian Act in Canada and federal Indian legislation in the United States, has been central to colonization, because deciding who legally counts as Indian also controls access to land and belonging. Drawing on Foucault, she treats these laws as a discourse that produces a way of thinking so familiar it can feel natural. The category of status turned a lived, relational belonging into a bureaucratic question answered by the state.", "cite": "Lawrence, 2003"}, {"h": "Who defines the category", "body": "Holding the two readings together gives the week its question. Socialization tells us identity is learned in relationship; Lawrence shows what happens when an outside authority, rather than a community, draws the line and writes it into law. Lawrence presents the history of status factually and as central to colonization. The sociological point is not to decide who is Indigenous, which is not ours to decide, but to see that identity categories are made, and that it matters a great deal who is allowed to make them.", "cite": "Lawrence, 2003"}], "terms": [{"term": "Socialization", "def": "the lifelong process by which people learn the norms, roles, and sense of self of their society through interaction, so that who we are is learned in relationship rather than fixed at birth.", "cite": "OpenStax, 2021"}, {"term": "Social structure", "def": "the patterned relationships and institutions, such as family, school, work, and law, that organize a society and shape a person's options before any individual choice is made.", "cite": "OpenStax, 2021"}, {"term": "Regulation of Native identity", "def": "Lawrence's term for the way settler law, through the Indian Act and the category of status, decides who legally counts as Indian, turning belonging into a bureaucratic question central to colonization.", "cite": "Lawrence, 2003"}, {"term": "Status", "def": "the legal category, defined by the state under the Indian Act, that determines who is recognized as Indian and so controls access to land, rights, and belonging.", "cite": "Lawrence, 2003"}], "readings": [{"apa": "OpenStax. (2021). Socialization and social interaction. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/5-introduction", "scope": "Open access", "id": "soc-socialization"}, {"apa": "Lawrence, B. (2003). Gender, race, and the regulation of Native identity in Canada and the United States: An overview. Hypatia, 18(2), 3-31.", "scope": "Open access", "id": "lawrence2003"}], "activity": {"screen": "activity", "archetype": "scenario", "title": "Who gets to say who counts", "what": "You walk through how one identity category, who legally counts as Indigenous, gets defined, deciding at each turn whether the definition is set by an outside authority or recognized as belonging to the community itself.", "why": "so you practise seeing identity categories as things that are made, and naming who is allowed to make them, before you carry that question into your own life.", "data": {"setup": "Socialization teaches us that who we are is learned in relationship, not handed out at birth. Bonita Lawrence shows what happens when the state takes hold of that question: through the Indian Act and the category of status, settler law decided who legally counted as Indian, and so controlled access to land and belonging. You step into the decision points where an identity category gets defined, and watch whose terms win.", "steps": [{"situation": "A government is deciding how to determine who legally counts as Indigenous. It must choose where the authority to define that belonging will sit.", "choices": [{"label": "Write a single legal definition of status that the state administers for everyone", "outcome": "Belonging becomes a bureaucratic question answered by the state. Lawrence shows this is how the Indian Act worked: deciding who legally counted as Indian also controlled access to land, and an outside authority replaced the community as the one who draws the line.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Recognize that communities define their own members through their own relationships and ways of identifying the self", "outcome": "The authority to say who belongs stays with the community. This keeps identity where socialization says it is formed, in relationship, rather than handing it to a law administered from outside.", "harm": false, "cite": "Lawrence, 2003"}]}, {"situation": "The legal category has been in place for generations. People are now growing up inside it, learning who they are partly through the state's definition.", "choices": [{"label": "Treat the legal category as simply describing a fact about who people are", "outcome": "The category starts to feel natural. Drawing on Foucault, Lawrence shows how a state-made definition can become a way of thinking so familiar it feels like description, when it is actually a rule that was imposed and that displaced Indigenous ways of identifying the self.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Ask how this category was made, and remember it was learned, not given at birth", "outcome": "The category is read as something produced. OpenStax shows the self is learned in relationship, so an identity rule can be examined rather than accepted as fact, which is exactly the sociological imagination at work.", "harm": false, "cite": "OpenStax, 2021"}]}, {"situation": "A person stands at the edge of the category: their belonging is real to their community but does not fit the legal definition. An institution must decide which account of their identity to honour.", "choices": [{"label": "Defer to the legal definition and let it settle who the person is", "outcome": "The state's category overrides the person's lived belonging. Lawrence shows this is the cost of letting status decide identity: a relationship to land and community is set aside because it does not match a definition written from outside.", "harm": true, "cite": "Lawrence, 2003"}, {"label": "Honour the belonging the person already holds within their community", "outcome": "Lived belonging is treated as real on its own terms. This recognizes self-determination, the principle that a community, not an outside authority, holds the right to say who counts among its own.", "harm": false, "cite": "Lawrence, 2003"}]}]}}, "youcan": ["You can now explain socialization as the lifelong process of learning who we are through relationship rather than forming alone", "You can now describe how Lawrence shows settler law turning who counts as Indigenous into a bureaucratic question through the Indian Act and the category of status", "You can now ask of any identity category who defined it, on whose terms, and whether the people it names had a say"], "reflectPrompt": "In a sentence or two: think of a form or a category that has asked you to name your identity. Who wrote the boxes, whose terms did they use, and what would change if the people being named got to draw the line themselves?"},
      9: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week09", "overview": "This week we look at inequality as something that is built, not something that simply happens. Sociology gives us a name for this: social stratification, the way a society sorts people into layered ranks of advantage tied to class, status, and power. OpenStax (2021) stresses that this layering is produced and reproduced by social structures, so where you land is not earned by you and is not random. We then hold that idea next to a Canadian case. Pamela Palmater (2011), who is Mi'kmaw, argues that chronic and sometimes fatal poverty in First Nations is not a cultural failing but the engineered result of Canada's colonial legal order, where the Indian Act presumes federal control over First Nations life yet fails its fiscal and constitutional duties. We keep the two analyses side by side, each attributed, without folding one into the other: OpenStax (2021) gives us the general machinery of stratification, and Palmater (2011) shows one specific machinery, the colonial legal order, that engineered poverty for peoples once among the wealthiest in the world.", "purpose": "Week 9 asks you to treat inequality as a system with parts you can name. Stratification, in OpenStax (2021), is a layered system of advantage that social structures produce and reproduce. Palmater (2011) gives a concrete Canadian example of that machinery at work: laws and policies that engineered First Nations poverty. The aim is to assemble the layers and mechanisms that build inequality, to attribute each one to its source, and to see Palmater's structural and legal analysis on its own terms, as a description of how a legal order produces an outcome, never as a deficit of Indigenous people or communities.", "outcomes": ["By the end of this week you can define social stratification and explain why OpenStax (2021) describes it as produced by social structures rather than random.", "By the end of this week you can name several layers or mechanisms by which inequality is built and reproduced, and attribute each to its source.", "By the end of this week you can explain, in Palmater's (2011) own framing, how Canada's colonial legal order engineered First Nations poverty as a structural and legal outcome.", "By the end of this week you can hold the OpenStax (2021) account of stratification and Palmater's (2011) structural-colonial analysis together, each attributed, without merging them into one claim."], "guiding": ["OpenStax (2021) says stratification is produced and reproduced by social structures. What does that change about how you read who is at the top and who is at the bottom?", "Palmater (2011) calls First Nations poverty engineered. What work is the word engineered doing, and what does it rule out?", "How is a caste system, where standing is fixed by ascribed status, different from a class system in the OpenStax (2021) account, and why does that distinction matter for mobility?", "OpenStax (2021) gives the general machinery of stratification and Palmater (2011) names one specific machinery. Why is it worth keeping these two analyses side by side rather than collapsing them into one?"], "checks": [{"t": "What social stratification is, and why OpenStax (2021) insists it is produced and reproduced by social structures rather than random or earned", "look": "the OpenStax Social Stratification reading"}, {"t": "The difference between a caste system, where standing is fixed by ascribed status, and a class system, where achieved factors allow some mobility", "look": "the OpenStax Social Stratification reading"}, {"t": "How Palmater (2011) frames First Nations poverty as engineered by Canada's colonial legal order, a structural and legal outcome and not a cultural failing", "look": "the Palmater reading and keynote"}, {"t": "Why peoples once among the wealthiest in the world were made the most impoverished, in Palmater's (2011) account, because federal laws presume control yet fail their fiscal and constitutional duties", "look": "the Palmater reading"}, {"t": "How to hold the OpenStax (2021) machinery of stratification and Palmater's (2011) colonial-legal machinery together, each attributed, without merging them", "look": "the activity and both readings"}], "concepts": [{"h": "Social stratification", "body": "Social stratification is the way a society sorts people into layered ranks of advantage tied to class, status, and power. OpenStax (2021) stresses that this layering is produced and reproduced by social structures, not by the worth of the people placed within it. That is the core move of the week: where you land in the layers is built and maintained by structures, not earned by you and not random.", "cite": "OpenStax, 2021"}, {"h": "Caste and class systems", "body": "OpenStax (2021) contrasts caste systems, where a person's standing is fixed by ascribed status they are born into, with class systems, where social and achieved factors allow some movement up or down. The contrast matters because it shows that how rigid the layers are is itself a feature of the structure, not a fact of nature. Even where mobility exists, the system of ranks is still doing the sorting.", "cite": "OpenStax, 2021"}, {"h": "Engineered poverty in First Nations", "body": "Pamela Palmater (2011), who is Mi'kmaw, argues that chronic and sometimes fatal poverty in First Nations is engineered by Canada's colonial legal order, not caused by culture. She wrote that federal policy had shifted from an older aim of assimilation toward a newer language of self-governance, while the Indian Act and its related policies had not been amended to reflect that change. She also argues that laws which presume federal control over First Nations life fail their fiscal and constitutional duties. The word engineered locates the cause in the legal order and rules out any reading that blames Indigenous people or communities. This is presented on Palmater's (2011) own terms and is held alongside the OpenStax (2021) account, not merged into it.", "cite": "Palmater, 2011"}, {"h": "Made impoverished, not failing", "body": "Palmater (2011) shows that peoples once among the wealthiest in the world were made the most impoverished through dispossession and a legal order that presumes control yet fails its responsibilities. The point is directional: the outcome was produced by structure and law over time, so poverty here is a result that was built, not a deficit of the people living within it. This is a direct case of the OpenStax (2021) claim that inequality is produced and maintained by social structure, while staying Palmater's (2011) own structural-colonial analysis.", "cite": "Palmater, 2011"}], "terms": [{"term": "Social stratification", "def": "the way a society sorts people into layered ranks of advantage tied to class, status, and power, produced and reproduced by social structures rather than earned or random.", "cite": "OpenStax, 2021"}, {"term": "Ascribed status", "def": "a position a person is assigned at birth or without choice, which in a caste system fixes their standing in the layers of advantage.", "cite": "OpenStax, 2021"}, {"term": "Engineered poverty", "def": "Palmater's framing of chronic poverty in First Nations as the produced result of Canada's colonial legal order, a structural and legal outcome rather than a cultural failing of Indigenous people or communities.", "cite": "Palmater, 2011"}, {"term": "Colonial legal order", "def": "the body of federal law and policy, with the Indian Act at its centre, that presumes control over First Nations life yet fails its fiscal and constitutional responsibilities, in Palmater's account.", "cite": "Palmater, 2011"}], "readings": [{"apa": "OpenStax. (2021). Social stratification. In Introduction to sociology 3e. OpenStax, Rice University. https://openstax.org/books/introduction-sociology-3e/pages/9-introduction", "scope": "Open access", "id": "soc-stratification"}, {"apa": "Palmater, P. (2011). Stretched beyond human limits: Death by poverty in First Nations. Canadian Review of Social Policy, (65/66). https://crsp.journals.yorku.ca/index.php/crsp/article/view/35220", "scope": "Open access", "id": "palmater"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "How inequality is built", "what": "You assemble the layers and mechanisms that build inequality, drawing the general machinery from OpenStax (2021) and one specific machinery, engineered First Nations poverty, from Palmater (2011).", "why": "so you can name inequality as a system that is produced and maintained by structures, and attribute each part to its source, holding the two analyses side by side without merging them.", "data": {"goal": "Assemble the layers and mechanisms by which inequality is produced and reproduced, and specifically how First Nations poverty was engineered, using the OpenStax (2021) account of social stratification as the general machinery and Palmater's (2011) structural-colonial analysis as one concrete case, each part attributed to its source.", "components": [{"label": "Layered ranks of advantage (class, status, power)", "role": "Stratification sorts people into layers tied to class, status, and power, so advantage and disadvantage are organized rather than spread evenly, which is the base structure inequality is built on.", "cite": "OpenStax, 2021"}, {"label": "Production and reproduction by social structures", "role": "Social structures produce the layers and then reproduce them over time, so a person's position is built and maintained by the system rather than earned by them or left to chance.", "cite": "OpenStax, 2021"}, {"label": "Ascribed status that fixes standing", "role": "When standing is fixed by ascribed status, as in a caste system, the layers become rigid and movement is closed off, which hardens inequality into something a person cannot leave.", "cite": "OpenStax, 2021"}, {"label": "A colonial legal order that presumes control", "role": "Federal law, with the Indian Act at its centre, presumes control over First Nations life while failing its fiscal and constitutional duties, which is the specific machinery that engineered First Nations poverty as a structural and legal outcome.", "cite": "Palmater, 2011"}, {"label": "Dispossession that made wealth into poverty", "role": "Through dispossession and that legal order, peoples once among the wealthiest in the world were made the most impoverished, showing the outcome was produced by structure and law over time, not by any deficit of the people.", "cite": "Palmater, 2011"}, {"label": "Policy between assimilation and self-governance", "role": "Palmater wrote in 2011 that policy had shifted from an older aim of assimilation toward a newer language of self-governance while the Indian Act and its related policies had not been amended to reflect that change. Her claim identifies a conflict inside the legal machinery that produced the poverty.", "cite": "Palmater, 2011"}]}}, "youcan": ["You can now define social stratification and explain why OpenStax (2021) treats it as built and maintained by structures rather than earned or random", "You can now name the layers and mechanisms that produce inequality and attribute each to its source", "You can now explain, in Palmater's (2011) own framing, how Canada's colonial legal order engineered First Nations poverty as a structural and legal outcome, and hold it alongside the OpenStax (2021) account without merging the two"], "reflectPrompt": "In a sentence or two: pick one mechanism you assembled this week and name how it produces an outcome that looks personal but is actually built. What changes once you can see it as structure rather than as the fault of the people living within it?"},
      10: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week10", "overview": "This week we add the third discipline of the course, psychology, the scientific study of the mind and behaviour. OpenStax (2020) presents psychology as the study of the individual, and stresses that it works best when it keeps the social context in view through the biopsychosocial model, where health and behaviour come from biological, psychological, and social factors together rather than any one alone. We then hold that idea next to a Canadian and Indigenous frame. Joseph P. Gone (2023), who is Aaniiih, sets out Indigenous historical trauma as an explanation that locates the cause of present-day mental-health inequities not inside the individual but in the legacies of colonial dispossession. We keep both analyses side by side, each attributed. OpenStax (2020) gives the individual level and the reminder to keep context in view, and Gone (2023) shows one structural and historical account of where mental-health inequities come from. This is a structural and historical explanation of a pattern, presented in Gone's (2023) own framing. It is not a clinical diagnosis, not a list of symptoms, and not a description of any individual person.", "purpose": "Week 10 asks you to read mental-health inequities as something shaped by history and structure, not as a deficit inside individuals. Gone (2023) frames Indigenous historical trauma as an explanation that designates the legacies of colonization as central to present-day community mental-health inequities, and that calls for reconciliation, redress, and structural reform rather than individual blame. The aim is to assemble the contextual and structural factors that, in Gone's (2023) framing, reframe these inequities as consequences of colonization rather than individual deficits, to attribute each factor to its source, and to keep Gone's (2023) account on its own terms. This is about how a pattern is explained in context. It is never a diagnosis of any person, never a checklist of symptoms, and never an invitation to assess yourself.", "outcomes": ["By the end of this week you can define psychology, in OpenStax (2020), as the scientific study of the mind and behaviour, and explain why OpenStax (2020) holds that it is strongest when it keeps the social and biological context in view.", "By the end of this week you can explain, in Gone's (2023) own framing, how Indigenous historical trauma locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual.", "By the end of this week you can name several contextual and structural factors that, in Gone's (2023) account, reframe Indigenous mental-health inequities as consequences of colonization, and attribute each to its source.", "By the end of this week you can hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person."], "guiding": ["OpenStax (2020) defines psychology as the study of the individual but says it is strongest when it keeps the social context in view. What does the biopsychosocial model add that an individual-only account would miss?", "Gone (2023) locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual. What does that move change about who or what is being explained?", "Gone (2023) calls historical trauma an explanation for inequities at the community level. Why does keeping it at the level of structure and history, and not the level of any one person, matter for reading the pattern fairly?", "OpenStax (2020) gives the individual level and Gone (2023) gives a structural and historical level. Why is it worth keeping these two accounts side by side rather than collapsing one into the other?"], "checks": [{"t": "What psychology is, in OpenStax (2020): the scientific study of the mind and behaviour, and why OpenStax (2020) says it is strongest when it keeps the social and biological context in view", "look": "the OpenStax Introduction to Psychology reading"}, {"t": "What the biopsychosocial model is, in OpenStax (2020): that health and behaviour come from biological, psychological, and social factors together rather than any one alone", "look": "the OpenStax Introduction to Psychology reading"}, {"t": "How Gone (2023) frames Indigenous historical trauma as an explanation that locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual", "look": "the Gone reading and keynote"}, {"t": "Why Gone (2023) treats these inequities at the level of community, structure, and history, calling for reconciliation, redress, and structural reform rather than individual blame", "look": "the Gone reading"}, {"t": "How to hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person", "look": "the activity and both readings"}], "concepts": [{"h": "Psychology as the study of mind and behaviour", "body": "OpenStax (2020) defines psychology as the scientific study of the mind and behaviour, surveying approaches from biological to cognitive to sociocultural. It is the third discipline of the course, adding the level of the individual to the sociological view of structure and the anthropological view of culture. OpenStax (2020) is clear that psychology focuses on the individual but is strongest when it remembers that the individual is also biological and social.", "cite": "OpenStax, 2020"}, {"h": "The biopsychosocial model", "body": "OpenStax (2020) describes the biopsychosocial model as the idea that health and behaviour arise from the interaction of biological, psychological, and social factors together, not from any one of them alone. The model matters this week because it keeps the social and historical context in view rather than locating everything inside the individual. It is the bridge from an individual-only account toward an account that takes structure and history seriously.", "cite": "OpenStax, 2020"}, {"h": "Historical trauma as a structural explanation", "body": "Joseph P. Gone (2023), who is Aaniiih, sets out Indigenous historical trauma as an explanation that locates the cause of present-day community mental-health inequities in the legacies of colonial dispossession rather than inside the individual. Gone (2023) presents this as an account that contests mainstream clinical categories and designates colonization as central to these inequities, recasting them as outcomes calling for reconciliation, redress, and structural reform. This is a structural and historical framing of a community-level pattern, presented in Gone's (2023) own terms. It is not a clinical diagnosis, not a list of symptoms, and not a description of any individual person.", "cite": "Gone, 2023"}, {"h": "Inequities as consequences, not deficits", "body": "The core move in Gone (2023) is directional. Mental-health inequities among Indigenous communities are read as consequences of colonization and its ongoing conditions, not as deficits of Indigenous people. Locating the cause in history and structure rules out any reading that blames individuals or communities, and points instead toward redress and structural change. This is a direct case of the OpenStax (2020) reminder to keep social and historical context in view, while remaining Gone's (2023) own structural and historical analysis and never a judgment about any person.", "cite": "Gone, 2023"}], "terms": [{"term": "Psychology", "def": "the scientific study of the mind and behaviour of individuals, drawing on several perspectives that each emphasize different causes; in OpenStax (2020) it is strongest when it keeps the social and biological context in view.", "cite": "OpenStax, 2020"}, {"term": "Biopsychosocial model", "def": "the idea, in OpenStax (2020), that health and behaviour arise from biological, psychological, and social factors interacting together rather than from any one factor alone.", "cite": "OpenStax, 2020"}, {"term": "Sociocultural influence", "def": "the effect of culture, community, and context on individual thought and behaviour, which locates part of the cause of a person's situation outside the person; Gone (2023) shows why this matters for reading mental-health inequities in context.", "cite": "Gone, 2023"}, {"term": "Indigenous historical trauma", "def": "Gone's (2023) framing of present-day Indigenous mental-health inequities as consequences of the legacies of colonization, a structural and historical explanation that calls for reconciliation, redress, and structural reform rather than locating the cause inside the individual.", "cite": "Gone, 2023"}], "readings": [{"apa": "OpenStax. (2020). Introduction to psychology. In Psychology 2e. OpenStax, Rice University. https://openstax.org/books/psychology-2e/pages/1-introduction", "scope": "Open access", "id": "psy-intro"}, {"apa": "Gone, J. P. (2023). Indigenous historical trauma: Alter-Native explanations for mental health inequities. Daedalus, 152(4). https://www.amacad.org/publication/daedalus/indigenous-historical-trauma-alter-native-explanations-mental-health-inequities", "scope": "Open access", "id": "gone2023"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Trauma in context", "what": "You assemble the contextual and structural factors that, in Gone's (2023) framing, reframe Indigenous mental-health inequities as consequences of colonization rather than individual deficits, holding them alongside the OpenStax (2020) reminder to keep social and historical context in view.", "why": "so you can read a community-level pattern as something shaped by history and structure, attribute each factor to its source, and keep Gone's (2023) account on its own terms without turning it into a diagnosis of any person.", "data": {"goal": "Assemble the contextual and structural factors that, in Gone's (2023) account, reframe Indigenous mental-health inequities as consequences of colonization rather than individual deficits, using OpenStax (2020) for the reminder to keep social and historical context in view. This assembles how the pattern is explained in context. It is never a checklist of symptoms, never a diagnosis, and never a self-assessment.", "components": [{"label": "The legacies of colonial dispossession", "role": "Gone (2023) places the legacies of colonial dispossession at the centre of his explanation, designating them as the source of present-day mental-health inequities rather than locating the cause inside the individual.", "cite": "Gone, 2023"}, {"label": "A community and historical level of analysis", "role": "Gone (2023) reads these inequities at the level of community and history, so the pattern is explained across generations and structures rather than as the state of any one person.", "cite": "Gone, 2023"}, {"label": "A structural cause rather than an individual deficit", "role": "Locating the cause in colonization and its ongoing conditions reframes the inequities as consequences produced by structure and history, which rules out any reading that blames Indigenous people or communities.", "cite": "Gone, 2023"}, {"label": "A contest with mainstream clinical categories", "role": "Gone (2023) presents historical trauma as an alter-Native explanation that contests mainstream psychiatric categories, so the inequities are understood through colonization and context rather than only through an individual clinical frame.", "cite": "Gone, 2023"}, {"label": "A call for reconciliation, redress, and structural reform", "role": "Because the cause is structural and historical, Gone (2023) points the response toward reconciliation, redress, and structural reform, the kind of change that fits a structural cause rather than treatment aimed only at individuals.", "cite": "Gone, 2023"}, {"label": "Keeping the social and historical context in view", "role": "OpenStax (2020) holds that psychology is strongest when it keeps the social and biological context in view through the biopsychosocial model, which is the move that makes room for Gone's (2023) structural and historical account alongside the individual level.", "cite": "OpenStax, 2020"}]}}, "youcan": ["You can now define psychology, in OpenStax (2020), as the scientific study of the mind and behaviour, and explain why it is strongest when it keeps the social and historical context in view", "You can now name the contextual and structural factors that, in Gone's (2023) framing, reframe Indigenous mental-health inequities as consequences of colonization, and attribute each to its source", "You can now hold the OpenStax (2020) individual-level account and Gone's (2023) structural and historical account together, each attributed, without reducing either to a diagnosis of any person"], "reflectPrompt": "In a sentence or two, and writing about the ideas rather than about yourself or anyone you know: pick one contextual or structural factor you assembled this week and explain how Gone (2023) uses it to locate the cause of a pattern in history and structure rather than inside individuals. What changes once you can read the inequity as a consequence of colonization rather than a deficit of the people living within it?"},
      11: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week11", "overview": "This week continues our turn to psychology, and it does so with care. Social psychology studies how people affect one another, and one of its steady lessons is that identity, belonging, and even our explanations of other people's behaviour are shaped between people rather than formed alone in one head. We hold that general idea next to a specific, named body of research in Canada. Amy Bombay, Kimberly Matheson and Hymie Anisman review the evidence on the intergenerational effects of the Indian Residential Schools and describe, in structural and historical terms, how the harms of those institutions carry across generations. This is a week about how something passes forward through families and communities over time, not about diagnosing any person. We read the researchers' account as they frame it, attributed by name, and we treat it as history and structure rather than as symptoms to find in yourself or anyone else.", "purpose": "Week 11 extends social psychology's core insight, that who we are and how we explain each other is shaped between people, into one carefully bounded Canadian case. Bombay, Matheson and Anisman's review of the intergenerational effects of residential schools shows that a structural harm done to one generation can carry forward to the next through identifiable pathways. The aim is to be able to name those pathways, in the researchers' own framing, and to understand intergenerational effect as a structural and historical process rather than as a clinical label placed on a community.", "outcomes": ["By the end of this week you can explain the social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people, not formed alone.", "By the end of this week you can describe, in Bombay, Matheson and Anisman's framing, what the intergenerational effects of residential schools are, as a structural and historical account.", "By the end of this week you can name several pathways by which the harms of residential schools carry across generations, and explain what each one carries forward.", "By the end of this week you can distinguish a structural, historical explanation of intergenerational effect from a clinical diagnosis, and say why the distinction matters."], "guiding": ["OpenStax says we are shaped between people, not in isolation. How does that change the way you read an outcome that seems to belong to one individual?", "Bombay, Matheson and Anisman describe effects that accumulate when residential school attendance spans several generations. What does it mean for a harm to accumulate rather than simply repeat?", "Why is it important to present this as a structural and historical account, attributed to the researchers, rather than as a list of symptoms?", "When a harm is done to a structure, a family or a community, rather than only to one person, how does it find its way to the next generation?"], "checks": [{"t": "The social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people rather than formed alone in one head", "look": "the OpenStax reading"}, {"t": "What the intergenerational effects of residential schools are, presented as Bombay, Matheson and Anisman present them: a structural and historical account, not a diagnosis", "look": "Bombay, Matheson and Anisman, 2014"}, {"t": "That a familial history of residential school attendance is linked to more frequent contemporary stressors and to greater effects of those stressors, with cumulative effects across generations", "look": "Bombay, Matheson and Anisman, 2014"}, {"t": "Why a structural, historical explanation of intergenerational effect is different from a clinical diagnosis, and why that difference matters for how we read it", "look": "the activity and Bombay, Matheson and Anisman, 2014"}, {"t": "Assembling the pathways by which the harms of residential schools carry across generations, and naming what each pathway carries forward", "look": "the activity"}], "concepts": [{"h": "We are shaped between people", "body": "OpenStax presents social psychology as the study of how people affect one another's thoughts, feelings, and behaviour, with a steady emphasis on the power of the situation. Identity, belonging, and even our judgments of why other people act as they do are formed between people, not assembled alone in one head. The chapter also names the fundamental attribution error, our common tendency to overestimate someone's personality and underestimate their situation. The lesson for this week is that an outcome which looks like it belongs to one individual is very often shaped by relationships, history, and circumstance around them.", "cite": "OpenStax, 2020"}, {"h": "Intergenerational effects, as the researchers frame them", "body": "Amy Bombay, Kimberly Matheson and Hymie Anisman review the research on the intergenerational effects of Canada's Indian Residential Schools, institutions to which Aboriginal children were removed and where many met neglect and abuse. They describe, as a structural and historical account, how the harms of those schools carry forward beyond the people who attended. This is not a clinical diagnosis of individuals and not a claim about anyone's inner state; it is a review of how a documented historical harm reaches later generations through identifiable pathways.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"h": "Cumulative across generations", "body": "Bombay, Matheson and Anisman find that having a familial history of residential school attendance is linked to more frequent contemporary stressors and to greater effects of those stressors on well-being. Crucially, these effects are cumulative when attendance spans several generations: the more generations affected, the more the burden builds rather than simply repeating once. This is the structural heart of the intergenerational account, and the authors present it as empirical support for the broader concept of historical trauma.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"h": "Structure and history, not diagnosis", "body": "Because identity and well-being form between people, a harm aimed at families and communities, not only at single individuals, can travel forward through those same relationships. Reading Bombay, Matheson and Anisman this way keeps the account where they put it: in the structures of family and community and in the history of a state policy, rather than in a list of symptoms to locate in any person. The point is to understand a process that moves across generations, not to label a community or invite anyone to assess themselves.", "cite": "Bombay, Matheson and Anisman, 2014"}], "terms": [{"term": "Social psychology", "def": "the study of how people affect one another's thoughts, feelings, and behaviour, with a recurring emphasis on the power of the situation; it treats identity, belonging, and our explanations of behaviour as shaped between people rather than formed alone.", "cite": "OpenStax, 2020"}, {"term": "Intergenerational effects", "def": "Bombay, Matheson and Anisman's term for the way the harms of the Indian Residential Schools carry forward beyond those who attended, described as a structural and historical process rather than a clinical diagnosis of any individual.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"term": "Cumulative effect", "def": "in Bombay, Matheson and Anisman's review, the finding that the effects associated with residential school attendance build up, rather than simply repeat, when attendance spans several generations within a family.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"term": "Historical trauma", "def": "the broader concept, for which Bombay, Matheson and Anisman provide empirical support, that a collective harm done to a people through historical events can have effects that reach later generations; in this course it is read as structure and history, not as a label placed on a community.", "cite": "Bombay, Matheson and Anisman, 2014"}], "readings": [{"apa": "OpenStax. (2020). Social psychology. In Psychology (2nd ed.). https://openstax.org/books/psychology-2e/pages/12-introduction", "scope": "Open access", "id": "psy-social"}, {"apa": "Bombay, A., Matheson, K., & Anisman, H. (2014). The intergenerational effects of Indian Residential Schools: Implications for the concept of historical trauma. Transcultural Psychiatry, 51(3), 320-338. https://doi.org/10.1177/1363461513503380", "scope": "Open access", "id": "bombay2014"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "What carries across generations", "what": "You assemble the pathways by which the harms of residential schools carry across generations, in the framing Bombay, Matheson and Anisman use, and name what each pathway carries forward.", "why": "so you can hold the intergenerational-effects research as a structural and historical account, the way the researchers present it, rather than as a list of symptoms or a diagnosis of any person.", "data": {"goal": "Assemble the pathways by which the harms of the Indian Residential Schools carry across generations, as Bombay, Matheson and Anisman describe them. This is a structural and historical account, not a clinical one: you are showing how a documented harm done to families and communities reaches later generations, not locating symptoms in any individual. Seeing the pathways together is the point, because no single piece carries the whole effect; it is how they work together over time.", "components": [{"label": "The original institutional harm", "role": "begins the process: Aboriginal children were removed to residential schools marked by neglect and abuse, so the first harm is done to children, families, and whole communities at once, not to isolated individuals.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Identity and belonging form between people", "role": "is the channel the harm travels along: because identity and belonging are shaped between people rather than alone, a harm aimed at families and communities can carry forward through those same relationships.", "cite": "OpenStax, 2020"}, {"label": "A familial history of attendance", "role": "is the carrier the researchers track: having a parent or grandparent who attended is what links a later generation to the effects, so the pathway runs through the family line, not through any one person's choices.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "More frequent contemporary stressors", "role": "is one effect that carries forward: a familial history of attendance is linked to facing more present-day stressors, so the burden shows up in conditions of life now, not only in the past.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Greater effect of those stressors", "role": "compounds the previous pathway: the same stressors are linked to a greater effect on well-being, so it is not only that there are more stressors but that they weigh more heavily.", "cite": "Bombay, Matheson and Anisman, 2014"}, {"label": "Accumulation across several generations", "role": "is how the whole process builds rather than repeats: when residential school attendance spans several generations, the effects are cumulative, which is the structural support the authors give for the concept of historical trauma.", "cite": "Bombay, Matheson and Anisman, 2014"}]}}, "youcan": ["You can now explain the social-psychology idea that identity, belonging, and our explanations of behaviour are shaped between people rather than formed alone", "You can now describe, in Bombay, Matheson and Anisman's framing, how the harms of residential schools carry across generations as a structural and historical account", "You can now name the pathways by which those harms carry forward, and tell a structural explanation apart from a clinical diagnosis"], "reflectPrompt": "In a sentence or two: this week describes a harm that carries forward through families and communities over time, not through any one person. What changes in how you understand an outcome once you see it as something shaped between people across generations, rather than as something that belongs to an individual alone?"},
      12: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "SOC122_Week12", "overview": "This week we look at the family. In the Western social science reading, OpenStax treats the family as a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a web of relationships, and it shows that both shift with social change rather than staying fixed (OpenStax, 2021). Set alongside this, Kim Anderson, who is Cree-Métis, reflects on kinship, motherhood, and the everyday work of running a home, and reframes kinship not as a fixed list of relatives but as ongoing labour and responsibility, the daily work that keeps a family and a home going (Anderson, 2020). The two views are held side by side, each attributed, and the work of holding both belongs to you.", "purpose": "Week 12 sets two ways of seeing the family next to each other without merging them. OpenStax gives you the Western social science view of family as a structure and a set of relationships that change across cultures and over time (OpenStax, 2021). Anderson gives you an Indigenous feminist view from the inside, where kinship is the work you do and the responsibility you carry, not only a category on a chart (Anderson, 2020). The aim is to name what each view contributes and to hold both at once.", "outcomes": ["By the end of this week you can describe the Western social science view of the family as both a structure and a web of relationships that changes across cultures and over time (OpenStax, 2021).", "By the end of this week you can explain, in Anderson's own framing, kinship as ongoing work and responsibility rather than a fixed list of relatives (Anderson, 2020).", "By the end of this week you can name what the family-as-structure view and the kinship-as-work view each contribute, attributing each to its source.", "By the end of this week you can hold the Western and the Indigenous view of the family side by side without collapsing them into a single answer."], "guiding": ["OpenStax says there is no single natural family form to measure others against. What changes for you once family is something you can examine rather than assume?", "Anderson reframes kinship as the work you do, not only who you are related to. What everyday work in your own life keeps a family going?", "OpenStax treats the family as a structure and a set of relationships; Anderson treats kinship as labour and responsibility. Where do these two views meet, and where do they stay distinct?", "What is it like to hold both the family-as-structure view and the kinship-as-work view at once, without deciding that one is the real one?"], "checks": [{"t": "The family as a social institution that is both a structure (household and marriage forms) and a web of relationships, with both changing across cultures and over time", "look": "OpenStax (2021)"}, {"t": "That there is no single natural family form to measure others against, since definitions of marriage and family vary across cultures and history", "look": "OpenStax (2021)"}, {"t": "Kinship reframed, in Anderson's own words, as ongoing work and responsibility rather than a fixed list of relatives", "look": "Anderson, 2020"}, {"t": "Family seen from the inside, where standing comes from the care and responsibility a person carries, not from a category on a chart", "look": "Anderson, 2020"}, {"t": "Assembling the kinship-as-work view alongside the family-as-structure view and holding both, each attributed to its source", "look": "the activity"}], "concepts": [{"h": "The family as structure and relationships", "body": "OpenStax treats the family as a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a set of relationships. Both the forms it takes and the meaning of marriage shift with social change rather than staying fixed. The chapter notes that definitions of marriage and family vary across cultures and over time, covering arrangements such as monogamy and polygamy and the place of kinship. The lesson for a student is that there is no single natural family form to measure others against.", "cite": "OpenStax, 2021"}, {"h": "The family as the first agent of socialization", "body": "OpenStax also treats the family as the first agent of socialization, the place where a person first learns the norms, roles, and expectations of their society before any classroom does. This is why the family matters to social science beyond its household form: it is one of the earliest settings in which identity and belonging are shaped. Here too the point holds that the family is something you can examine rather than simply take as given.", "cite": "OpenStax, 2021"}, {"h": "Kinship as work", "body": "Kim Anderson, who is Cree-Métis, reflects on kinship, motherhood, and the everyday work of running a home as Indigenous feminist practice, holding the family as relationship and responsibility rather than only a household structure. She reframes kinship not as a fixed list of relatives but as ongoing labour and obligation, the daily work that builds and sustains belonging across the seasons of a life. In her framing, kinship is not only who you are related to; it is the work you do and the responsibility you carry to keep a family and a home going.", "cite": "Anderson, 2020"}, {"h": "Family seen from the inside", "body": "Anderson offers a view of family from the inside, where standing comes from the care and responsibility a person carries, not from a category on a chart. Set next to the OpenStax view of the family as a structure that can be mapped, Anderson's view asks what the family looks like to the people doing the daily work of sustaining it. The two views are not merged: one looks at the form a family takes, the other at the labour and obligation that keep it going, and a student is asked to hold both.", "cite": "Anderson, 2020"}], "terms": [{"term": "Family", "def": "in the OpenStax reading, a social institution that is at the same time a structure, made of household forms and marriage and partnership patterns, and a web of relationships, with both the forms and the meaning of marriage changing across cultures and over time.", "cite": "OpenStax, 2021"}, {"term": "Agent of socialization", "def": "in the OpenStax reading, a setting through which a person learns the norms, roles, and expectations of their society; the family is treated as the first agent of socialization.", "cite": "OpenStax, 2021"}, {"term": "Kinship as work", "def": "Anderson's reframing of kinship not as a fixed list of relatives but as ongoing labour and responsibility, the daily work that builds and sustains belonging across the seasons of a life.", "cite": "Anderson, 2020"}, {"term": "Family as responsibility", "def": "Anderson's view of the family seen from the inside, where a person's standing comes from the care and responsibility they carry rather than from a category on a chart.", "cite": "Anderson, 2020"}], "readings": [{"apa": "OpenStax. (2021). Marriage and family. In Introduction to sociology (3rd ed.). https://openstax.org/books/introduction-sociology-3e/pages/14-introduction", "scope": "Open access", "id": "soc-family"}, {"apa": "Anderson, K. (2020). On seasons of an Indigenous feminism, kinship, and the program of home management. Hypatia, 35(1), 204-213. https://doi.org/10.1017/hyp.2019.10", "scope": "Seneca Library", "id": "anderson2019"}], "activity": {"screen": "activity", "archetype": "assemble", "title": "Kinship as work", "what": "You assemble a picture of the family by gathering elements of kinship-as-work alongside elements of family-as-structure, and holding both views together.", "why": "so you practise naming what each view contributes, the Western family-as-structure view and Anderson's kinship-as-work view, and keep them side by side, each attributed, rather than collapsing them into one.", "data": {"goal": "Assemble a picture of the family that holds two views at once: what kinship-as-work involves, in Anderson's framing, where kinship is the ongoing labour and responsibility that keeps a family and a home going (Anderson, 2020), alongside the Western view of family-as-structure, where the family is a social institution made of household and marriage forms and a web of relationships that change across cultures and over time (OpenStax, 2021). The goal is to gather the elements of each and keep both in view without merging them.", "components": [{"label": "Household and marriage forms", "role": "gives the family-as-structure view its shape: the patterns of household, marriage, and partnership that the family takes, which vary across cultures and over time", "cite": "OpenStax, 2021"}, {"label": "The web of relationships", "role": "names the relational side of the Western view, the ties among members that the family holds together alongside its formal structure", "cite": "OpenStax, 2021"}, {"label": "First agent of socialization", "role": "marks the family as the earliest place a person learns the norms, roles, and expectations of their society, which is why social science studies it beyond its form", "cite": "OpenStax, 2021"}, {"label": "Daily work and responsibility", "role": "supplies the heart of Anderson's kinship-as-work view: the ongoing labour and obligation of running a home and caring for others that builds and sustains belonging", "cite": "Anderson, 2020"}, {"label": "Belonging across the seasons of a life", "role": "shows that in Anderson's framing kinship is sustained over time through continued work, not fixed once by a category, holding a family together across a life", "cite": "Anderson, 2020"}, {"label": "Standing from care, not category", "role": "completes the inside view: in Anderson's framing a person's standing in a family comes from the care and responsibility they carry rather than from a place on a chart", "cite": "Anderson, 2020"}]}}, "youcan": ["You can now describe the Western social science view of the family as both a structure and a web of relationships that changes across cultures and over time", "You can now explain, in Anderson's own framing, kinship as ongoing work and responsibility rather than a fixed list of relatives", "You can now hold the family-as-structure view and the kinship-as-work view side by side, each attributed, without merging them into one answer"], "reflectPrompt": "In a sentence or two: think of one family or household you know well and look at it twice, first as a structure of forms and relationships in the OpenStax sense, then as the daily work and responsibility that keeps it going in Anderson's sense. What does each way of seeing show you that the other does not, and what is it like to hold both at once without deciding which is the real one?"},
    
      13: {"time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "deck": "", "overview": "This week brings no new reading. Instead, you return to your Personal Cartography, the map you have been building across the whole term, and you revisit it one dimension at a time. The frame for this revisit is the one you first met in Week 2: Two-Eyed Seeing, the gift of Mi'kmaw Elder Albert Marshall, which asks you to see with one eye the strengths of Indigenous ways of knowing and with the other eye the strengths of Western ways of knowing, and to use both eyes together for the benefit of all. As you reread your map, you keep the two eyes whole and distinct. The page does not write the connections for you, and it does not blend the two ways of knowing into one. That work is yours. Your task is to look back honestly: notice what each eye showed you, where your understanding moved, and what you still hold open.", "purpose": "Week 13 is a reflective final project. There is nothing new to learn here; there is your own map to revisit. The aim is to look back across the term using the Two-Eyed Seeing frame from Week 2, so you can name, in your own words, what specific sources showed you, how your understanding changed, and what remains unfinished (Marshall, 2017). You do this without collapsing the two ways of knowing into one. Holding them side by side, as Elder Albert Marshall asks, is still the work, and any connection between them stays your own (Marshall, 2017).", "outcomes": ["By the end of this week you can revisit your Personal Cartography and describe, in your own words, what specific Western and named Indigenous sources showed you, keeping their claims and contexts distinct rather than blended (Marshall, 2017).", "By the end of this week you can name where your understanding moved across the term and point to the earlier idea it grew from (Marshall, 2017).", "By the end of this week you can identify which scholars and ideas you returned to most, and say what kept drawing you back (Marshall, 2017).", "By the end of this week you can hold open what is still unresolved, treating the map as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames the stance (Marshall, 2017)."], "guiding": ["When you reread your map, what did one named Indigenous source show you that a Western source did not, and what did a Western source show that the named Indigenous source did not, kept side by side rather than merged (Marshall, 2017)?", "Where did your understanding move across the term, and which earlier idea on the map did it grow out of (Marshall, 2017)?", "Which scholars or ideas did you return to most often, and what kept drawing you back to them (Marshall, 2017)?", "What do you still hold open on your map, and why does treating Two-Eyed Seeing as an ongoing journey, not a finished answer, leave room for that (Marshall, 2017)?"], "checks": [{"t": "What specific Western and named Indigenous sources showed you across the term, with each source kept attributed and distinct", "look": "your own Personal Cartography"}, {"t": "Where your understanding moved this term, named against a specific earlier idea on the map rather than asserted in general", "look": "your map"}, {"t": "Which scholars and ideas you returned to most often, and what kept drawing you back to them", "look": "your own Personal Cartography"}, {"t": "What you still hold open, treating Two-Eyed Seeing as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames it", "look": "the Marshall reading and your map"}, {"t": "That any connection between the two eyes is yours to make, since the frame keeps the two ways of knowing side by side and asks you, not the page, to hold them together", "look": "your own Personal Cartography"}], "concepts": [{"h": "Revisiting the map: the frame you carry back", "body": "Two-Eyed Seeing is the frame you have carried since Week 2, and you carry it back now. Elder Albert Marshall asks you to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and to use both eyes together for the benefit of all. Returning to your Personal Cartography, you keep both eyes open and both whole. The revisit is not a final blend; it is a careful rereading of what specific sources have shown you across the term.", "cite": "Marshall, 2017"}, {"h": "Reflexivity: turning the lens on yourself", "body": "Revisiting your own map means examining how your position and assumptions shaped what you saw. You started the term from somewhere, with a worldview already in hand, and Two-Eyed Seeing asks you first to become aware of that starting eye. Marshall frames the stance as ongoing co-learning, which means noticing how you have learned, not only what. Rereading your map is a chance to see your own movement honestly, naming where you began and how your seeing has changed.", "cite": "Marshall, 2017"}, {"h": "Growth named, not asserted", "body": "Looking back is most honest when it is specific. Rather than claiming in general that you have learned, you point to an earlier idea on your map and the more developed understanding that grew from it. Marshall describes Two-Eyed Seeing as a journey with no fixed endpoint, so growth here means tracing concrete movement along that journey. Naming a particular shift, and the earlier thought it came from, keeps your reflection grounded in the map you actually built.", "cite": "Marshall, 2017"}, {"h": "Holding two eyes open, still distinct", "body": "Even at the end, the stance does not change: you hold both eyes open without collapsing them. Little Bear shows why this stays real work, since Indigenous and Eurocentric worldviews differ at their philosophical roots, in time, relationship, and reality. Revisiting your map, you keep those roots distinct rather than smoothing them into one account. Any place where the two eyes meet in your own thinking is yours to hold; the page does not write that meeting for you.", "cite": "Little Bear, 2000"}], "terms": [{"term": "Revision", "def": "Changing an earlier understanding in light of reflection and new seeing. Revision is a sign of learning, not failure, because it shows an idea has been tested rather than simply held. As you revisit your Personal Cartography, naming what you now see differently from the start of the term is part of honest reflection, and it fits Marshall's framing of Two-Eyed Seeing as an ongoing journey rather than a finished answer.", "cite": "Marshall, 2017"}, {"term": "Reflexivity", "def": "Examining how your own position and assumptions shape what you see. It asks you to turn the lens back on yourself and notice the worldview you brought to every observation. Reflexivity matters for Two-Eyed Seeing because holding two ways of knowing together requires first becoming aware of the one you started with, which is exactly the work of revisiting your own map.", "cite": "Marshall, 2017"}, {"term": "Growth", "def": "Visible movement in understanding across the term, named with evidence rather than asserted. Growth is shown by pointing to a specific earlier idea on your map and the more developed understanding that replaced it. Treating growth as evidence-based keeps reflection honest, and it suits Marshall's account of Two-Eyed Seeing as a journey you keep travelling rather than a destination you reach.", "cite": "Marshall, 2017"}, {"term": "Worldview", "def": "Little Bear's term for the shared set of assumptions about reality, time, and relationship that a culture uses to interpret the world. He argues that Indigenous and Eurocentric worldviews differ at this root, so two ways of knowing can describe the same world and still reach it through very different assumptions. Revisiting your map, you keep these roots distinct rather than blending them, which is why naming your own starting worldview matters.", "cite": "Little Bear, 2000"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "The frame you revisit (from Week 2)", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "The frame you revisit (from Week 2)", "id": "littlebear"}], "youcan": ["You can now revisit your Personal Cartography one dimension at a time, naming what each eye showed you while keeping the two ways of knowing whole and distinct", "You can now point to specific movement in your understanding across the term, tracing a later idea back to the earlier one it grew from", "You can now hold open what is still unresolved on your map, treating Two-Eyed Seeing as an ongoing journey rather than a finished answer, as Elder Albert Marshall frames it"], "reflectPrompt": "In a sentence or two, and in your own words: rereading your Personal Cartography, what is one thing each eye showed you that you want to carry forward, and what do you still hold open? Keep the two eyes distinct; the connection, if you make one, is yours.", "activity": {"screen": "activity", "archetype": "capstone", "title": "Revisiting your Personal Cartography", "what": "You return to the Personal Cartography you built across the term and revisit it one dimension at a time, marking each as you reread it.", "why": "so you can look back honestly within the Two-Eyed Seeing frame, naming what specific Western and named Indigenous sources showed you and how your understanding moved, while keeping the two ways of knowing distinct and the connections yours to make.", "data": {"prompt": "Revisit your Personal Cartography one dimension at a time. Mark each as you reread it.", "items": [{"label": "What specific sources showed you", "prompt": "Reread your map and note separately what one named Indigenous source showed you and what one Western source showed you. Keep the two columns distinct; do not write a blend. The point is to see each clearly on its own terms, as Elder Albert Marshall asks.", "cite": "Marshall, 2017"}, {"label": "Where your understanding moved", "prompt": "Find one place on the map where your thinking changed this term. Name the earlier idea, then name the more developed understanding that grew from it. Point to the specific shift rather than claiming growth in general.", "cite": "Marshall, 2017"}, {"label": "Which scholars you returned to", "prompt": "Look across your map for the scholars or ideas you came back to most often. Note which ones, and write a line for yourself about what kept drawing you back to them.", "cite": "Marshall, 2017"}, {"label": "What you still hold open", "prompt": "Mark a question or tension on the map that is still unresolved for you. Leave it open on purpose, and note why treating Two-Eyed Seeing as an ongoing journey makes room for it.", "cite": "Marshall, 2017"}, {"label": "Where the roots stay distinct", "prompt": "Find a spot where the Indigenous and Western views reach the world through different assumptions about time, relationship, or reality. Note the difference in your own words, and resist smoothing it into one account.", "cite": "Little Bear, 2000"}, {"label": "What you would add now", "prompt": "Looking at the whole map with fresh eyes, write down one thing you would add if you were starting it today. Keep it as your own mark; the page is not writing the connection for you.", "cite": "Marshall, 2017"}], "callout": "Your final project: your own cartography, revisited. The map and its meaning are yours."}}},
      14: {"deck": "", "time": "Flexible pacing: work in manageable blocks and use breaks and accessibility supports as needed.", "overview": "This is the final week, and the work this week is yours. All term you have made Western social science visible and worked with named Indigenous scholars and knowledge holders. Those scholars, Nations, communities, and teachings are not one interchangeable Indigenous perspective. Now you hold the whole course together in your own way. Two-Eyed Seeing, Mi'kmaw Elder Albert Marshall's gift, asks you to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing, and to use both eyes together (Marshall, 2017). The synthesis is yours to write. This page does not write it for you, and it does not hand you a finished account that ties the two eyes together. It gives you the threads of the course, one at a time, and asks you to articulate what you now see, in your own words. Both eyes stay whole. You are the one who holds them together.", "purpose": "Week 14 closes the course by asking you to perform your own Two-Eyed Seeing across everything you have met. You return to the frame in the words of the Elder who named it, Albert Marshall, and to Leroy Little Bear on why two worldviews can describe the same world and still differ at the root (Marshall, 2017; Little Bear, 2000). The aim is for you, not the app, to revisit the big threads of the term, the strengths and limits of Western disciplines, the distinct contributions of named Indigenous scholars, and the places Marshall's relational frame changed what became visible, and to hold them together in your own account. The integration is your work, and it stays your work.", "outcomes": ["By the end of this week you can revisit the whole course and name, in your own words, what social science has asked you to do, keeping the work of holding both eyes as your own (Marshall, 2017).", "By the end of this week you can describe the strengths and limits of Western disciplines and the distinct contributions of named Indigenous scholars without ranking, merging, or treating one source as universal (Marshall, 2017).", "By the end of this week you can name, for yourself, places across the term where each eye saw something the other could not, holding the two side by side rather than collapsing them into one (Little Bear, 2000).", "By the end of this week you can state what Two-Eyed Seeing asks of you as you leave the course, treating it as an ongoing responsibility and a gift from Elder Albert Marshall, not a slogan (Marshall, 2017)."], "guiding": ["Looking back across the whole term, how would you say in your own words what social science has asked you to do, and what it now lets you see that you could not see before (Marshall, 2017)?", "Across the course you met Western disciplines and named Indigenous scholars. How would you describe what each specific source contributes without making any one source the default or a spokesperson for a whole people (Marshall, 2017)?", "Little Bear says the two worldviews differ at the root. Where in this course did each eye see something the other could not, and how would you name those moments yourself (Little Bear, 2000)?", "As you leave this course, what does Two-Eyed Seeing ask of you now, and how will you keep it an ongoing responsibility rather than letting it become a slogan (Marshall, 2017)?"], "checks": [{"t": "That the synthesis of this course is your own work to write, and that holding both eyes together is something you do, not something the page does for you", "look": "the Marshall reading and the activity"}, {"t": "What social science has asked of you across the whole term, in your own words, and what it now lets you see", "look": "the activity and your own notes from across the course"}, {"t": "The strengths and limits of Western disciplines and the distinct contributions of named Indigenous scholars, with no source treated as universal or interchangeable", "look": "the Marshall reading and your week-by-week notes"}, {"t": "Places across the term where each eye saw something the other could not, named by you and held side by side rather than blended into one", "look": "the Little Bear reading and the activity"}, {"t": "What Two-Eyed Seeing asks of you as you leave the course, as Elder Albert Marshall's gift and an ongoing responsibility, not a slogan", "look": "the Marshall reading and your own reflection"}], "concepts": [{"h": "The synthesis is yours to write", "body": "Two-Eyed Seeing is Mi'kmaw Elder Albert Marshall's guiding principle: seeing with one eye the strengths of Indigenous ways of knowing, with the other the strengths of Western ways of knowing, and using both eyes together for the benefit of all. In a closing week the temptation is to be handed a finished answer that ties the two eyes into one. Marshall's stance refuses that. The holding together is the learner's own ongoing work, returned to over time. This page gives you the threads and asks you to do the integrating yourself, in your own words.", "cite": "Marshall, 2017"}, {"h": "Two whole eyes, revisited", "body": "Across the term you met Western social-science disciplines and named Indigenous scholars from distinct intellectual, community, and Nation-specific contexts. Marshall's principle asks that Indigenous knowledge not be reduced to an add-on judged by Western science. The course does not claim that its readings combine into one universal Indigenous eye. As you revisit the course, name each source on its own terms, explain what it contributes, and keep unearned connections unmade.", "cite": "Marshall, 2017"}, {"h": "Why each eye sees what the other cannot", "body": "Leroy Little Bear explains why holding both eyes open is real work. Indigenous and Eurocentric worldviews differ at their philosophical roots, in their assumptions about time, relationship, and reality. Because they reach the world differently, each eye can see something the other cannot. Naming those places across the course is part of taking the difference seriously. Your work this week is to find those moments yourself and hold the two views side by side with respect, rather than collapsing them into a single account that would erase what makes each distinct.", "cite": "Little Bear, 2000"}, {"h": "A responsibility you carry forward", "body": "Marshall is clear that Two-Eyed Seeing is a journey, not a finished idea you master and set down. It is ongoing co-learning between knowledge traditions, grounded in responsibility and the well-being of future generations, and he warns against letting it be trivialized, romanticized, or co-opted into jargon. As you leave the course, the stance becomes something you carry: a way of working you keep practising, in your own words and your own life, not a label you apply once and consider finished.", "cite": "Marshall, 2017"}], "terms": [{"term": "Two-Eyed Seeing (Etuaptmumk)", "def": "Mi'kmaw Elder Albert Marshall's guiding principle of using the strengths of Indigenous ways of knowing through one eye and the strengths of Western ways of knowing through the other, and using both eyes together for the benefit of all. In this closing week it names the work you do yourself: holding both eyes whole and together across the whole course, in your own words, rather than receiving a finished synthesis from anyone else. It is Elder Albert Marshall's gift and the frame for your own final project.", "cite": "Marshall, 2017"}, {"term": "Co-learning journey", "def": "Marshall's description of Two-Eyed Seeing as an ongoing, respectful practice between knowledge traditions, not a slogan to be trivialized, romanticized, or co-opted. As the course ends, it names why your synthesis is never finished: each person keeps learning to see with both eyes over time, carrying the practice forward as a responsibility rather than completing it.", "cite": "Marshall, 2017"}, {"term": "Root difference of worldviews", "def": "Little Bear's account of how Indigenous and Eurocentric worldviews differ at their philosophical roots, in their assumptions about time, relationship, and reality. Because the two reach the world differently, each eye can see something the other cannot, which is why this week asks you to find and name those places yourself and hold the two views side by side rather than blending them into one.", "cite": "Little Bear, 2000"}, {"term": "Both eyes whole", "def": "the requirement, in Marshall's framing, that each way of knowing stays a whole, complete eye in its own right: the Western eye not treated as the default, the Indigenous eye not treated as a supplement. As you revisit the course, holding both eyes whole means describing each on its own terms and keeping them distinct even as you, the learner, hold them together.", "cite": "Marshall, 2017"}], "readings": [{"apa": "Marshall, A. (2017). Two-Eyed Seeing: Elder Albert Marshall's guiding principle. Thinkers Lodge, Centre for Local Prosperity.", "scope": "The frame for your own synthesis", "id": "amarshall"}, {"apa": "Little Bear, L. (2000). Jagged worldviews colliding. In M. Battiste (Ed.), Reclaiming Indigenous voice and vision (pp. 77-85). UBC Press.", "scope": "The frame for your own synthesis", "id": "littlebear"}], "youcan": ["You can now revisit the whole course and say, in your own words, what social science has asked of you and what it lets you see, keeping the work of holding both eyes as your own", "You can now describe the strengths and limits of Western disciplines and the distinct contributions of named Indigenous scholars without ranking or merging them", "You can now carry Two-Eyed Seeing forward as Elder Albert Marshall's gift and an ongoing responsibility, holding both eyes together in your own way rather than treating the stance as a slogan"], "reflectPrompt": "In a sentence or two, and in your own words: now that the course is done, what does it mean to you to hold both eyes together, and what is one place across the term where you saw something through one eye that you could not have seen through the other? The synthesis is yours: write what you see, not what anyone else has woven for you.", "activity": {"screen": "activity", "archetype": "capstone", "title": "Your own Two-Eyed Seeing of the whole course", "what": "You revisit the big threads of the course one at a time and hold them together in your own words. The page gives you the threads; you write what you now see.", "why": "so the integration is yours: you practise Two-Eyed Seeing on the whole course, keeping both eyes whole and distinct while you, not the app, hold them together.", "data": {"prompt": "Hold the course together in your own way, one thread at a time. The synthesis is yours to write; the app does not write it for you.", "items": [{"label": "What social science asks", "prompt": "In your own words, write what social science has asked you to do across this course, and what you can now see that you could not see at the start. Do not summarize the readings back; say what the term means to you.", "cite": "Marshall, 2017"}, {"label": "The Western disciplines, kept as one eye", "prompt": "Name the Western social science disciplines and ideas you met this term and describe them as one whole eye in its own right. Write what this eye does well, in your own words, without making it the default that everything else is measured against.", "cite": "Marshall, 2017"}, {"label": "Named Indigenous scholars, kept distinct and attributed", "prompt": "Choose two named Indigenous scholars from the term. For each, state the scholar's Nation or context when supported, the exact question or contribution, the evidence used, and one limit. Do not merge them into one Indigenous position or speak for Indigenous peoples in general.", "cite": "Marshall, 2017"}, {"label": "Where each eye saw what the other could not", "prompt": "Find one or two places across the course where each eye saw something the other could not, and name them yourself. Set the two side by side in your own words. Do not fold them into a single account; keep each distinct and say what each one shows.", "cite": "Little Bear, 2000"}, {"label": "The root difference, held with respect", "prompt": "In your own words, say why holding both eyes open took real effort across this course, drawing on the idea that the two worldviews differ at the root. Write how you kept them distinct rather than blending them, and why that mattered to you.", "cite": "Little Bear, 2000"}, {"label": "What Two-Eyed Seeing asks of you now", "prompt": "Write what Two-Eyed Seeing asks of you as you leave this course, in your own words. Name one ongoing responsibility you will carry forward, and how you will keep the stance a living practice rather than a slogan.", "cite": "Marshall, 2017"}], "callout": "Your final project: your own Two-Eyed Seeing of the whole course, in your words. Both eyes stay whole; you hold them together."}}},
    }
  };
  function weekData(w) {
    var c = (D.course && D.course.code) || '';
    var base = (WEEKPAGE[c] && WEEKPAGE[c][w]) || null;
    var add = (window.SOC122_CASE_CURRICULUM || {})[w];
    if (!base || !add) return base;
    var out = {}, k;
    for (k in base) out[k] = Array.isArray(base[k]) ? base[k].slice() : base[k];
    for (k in add) {
      if (/Mode$/.test(k)) continue;
      if (Array.isArray(add[k])) {
        if (add[k + 'Mode'] === 'replace') out[k] = add[k].slice();
        else out[k] = (Array.isArray(out[k]) ? out[k] : []).concat(add[k]);
      } else out[k] = add[k];
    }
    return out;
  }
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
    if (n && g.can === n) return { label: 'You can speak to all of this', color: 'var(--green)', bg: '#E9EFE7' };
    if (n && g.can >= Math.ceil(n * 0.6)) return { label: 'Most of this is yours', color: '#961A13', bg: '#EEF1F5' };
    if (n && (g.can + g.getting) >= Math.ceil(n * 0.6)) return { label: 'Coming together', color: '#961A13', bg: '#FBF4F3' };
    return { label: 'Still early, and that is fine', color: '#6b7280', bg: '#F3F4F6' };
  }
  function checkBars(items) {
    return '<div style="display:flex;gap:4px;margin:10px 0" role="img" aria-label="your grasp across the ' + items.length + ' ideas">' + items.map(function (x) {
      var col = x.r === 2 ? 'var(--green)' : (x.r === 1 ? '#961A13' : '#C7CDD6');
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
      var still = (x.r < 2) ? '<div style="font-size:.8rem;color:#961A13;margin-top:2px">Still building. ' + esc(x.look || 'Revisit the readings and the activity for this idea.') + '</div>' : '';
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
          + '<textarea oninput="SOC.sgNote(\'' + nk + '\', this.value)" aria-label="Explain ' + esc(c.h) + ' in your own words" placeholder="Your explanation, one or two sentences..." style="width:100%;min-height:64px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(val) + '</textarea>'
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
        rows += '<div style="background:#fff;border:1.5px solid ' + (ticked ? 'var(--green)' : 'var(--border)') + ';border-radius:12px;padding:14px 16px;margin-bottom:10px">'
          + '<div class="mono" style="font-size:.62rem;letter-spacing:.06em;color:' + (ticked ? 'var(--green)' : '#6B7280') + '">RUNG ' + (ri + 1) + ' \u00B7 ' + rungNames[Math.min(ri, 2)].toUpperCase() + (ticked ? ' \u2713' : '') + '</div>'
          + '<div style="font-weight:600;margin:5px 0 8px;line-height:1.5">' + esc(gqs[ri]) + '</div>'
          + '<textarea oninput="SOC.sgNote(\'' + rk + '\', this.value)" aria-label="Your response to question ' + (ri + 1) + '" placeholder="Work it out here..." style="width:100%;min-height:56px;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font:inherit;font-size:.9rem;resize:vertical">' + esc(rv) + '</textarea>'
          + (ticked ? '' : '<button onclick="SOC.sgTickRung(\'' + rk + '\',' + w + ')" style="margin-top:8px;border:1px solid var(--border);background:#fff;border-radius:8px;padding:6px 12px;font-size:.82rem;cursor:pointer">Done, next rung</button>')
          + '</div>';
      }
      var lastRk = 'sg' + w + '|r|' + (gqs.length - 1);
      var ladderDone = state.sgTick[lastRk] && (state.sgNotes[lastRk] || '').length >= 20;
      ladder = '<div><h3 style="font-size:1rem;margin:0 0 8px">The question ladder</h3><p class="wk-hint" style="margin:0 0 10px">This week\'s guiding questions, one rung at a time: remember it, connect it, apply it to your own world. Twenty words or more moves you up.</p>' + rows
        + (ladderDone ? '<div style="background:#E9EFE7;border:1px solid #9CC4A8;border-radius:12px;padding:13px 16px;font-size:.92rem;font-weight:600;color:#2c3b29">You have worked the whole ladder. You are ready for the Knowledge Check below. <a href="#wk-kc" style="color:var(--green)">Go to it \u2193</a></div>' : '')
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
        if (reveal) { if (sel === m.answer) { rowMark = '<span style="color:var(--green);font-weight:700;margin-left:8px">✓</span>'; bd = 'var(--green)'; } else { rowMark = '<span style="color:var(--red);font-weight:600;margin-left:8px;font-size:.85rem">✗ ' + esc(m.options[m.answer] || '') + '</span>'; bd = 'var(--red)'; } }
        var whyM = (reveal && sel !== m.answer && m.why) ? '<div style="margin:7px 0 0;font-size:.83rem;color:var(--ink-dim);line-height:1.5">' + esc(m.why) + '</div>' : '';
        return groupHead + '<div style="background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 15px;margin-bottom:9px"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><span style="font-size:.92rem;font-weight:600;flex:1;min-width:130px">' + esc(m.q) + '</span><select onchange="SOC.mcPickSel(\'' + mkey + '\',this.value)" aria-label="Match for ' + esc(m.q) + '" style="font:inherit;font-size:.88rem;padding:7px 10px;border:1.5px solid ' + bd + ';border-radius:8px;background:#fff;color:var(--ink);max-width:100%">' + optHtml + '</select>' + rowMark + '</div>' + whyM + '</div>';
      }

      /* standard / scenario multiple choice */
      var opts = (m.options || []).map(function (o, oi) {
        var isSel = (sel === oi), isCor = (oi === m.answer);
        var bg = '#fff', bd = 'var(--border)', col = 'var(--ink)', mark = '';
        if (reveal && isCor) { bg = '#E9EFE7'; bd = 'var(--green)'; col = '#2c3b29'; mark = ' ✓'; }
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
      var revTag = m.rw ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#5A6270;background:#EEF1F5;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">REVIEW · WEEK ' + m.rw + '</span>' : (isScenario(m) ? '<span class="mono" style="font-size:.62rem;letter-spacing:.05em;color:#961A13;background:#FBF4F3;border-radius:999px;padding:2px 8px;margin-left:8px;vertical-align:middle">SCENARIO</span>' : '');
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
          + '<span style="color:#F3B1A8">● Right but unsure ' + fragile + '</span>'
          + '<span style="color:#f3b1a8">● Confident miss ' + misc.length + '</span>'
          + '<span style="color:#c8cdd6">● Still finding it ' + edge + '</span></div>'
          + (misc.length ? '<p style="margin:10px 0 4px;font-size:.88rem;line-height:1.55;color:#f3d3ce">Start here. You were sure on these and they did not land, a confident wrong belief is the one that costs you later:</p><ul style="margin:0;padding-left:18px">' + mlist + '</ul>' : (mastered ? '<p style="margin:9px 0 0;font-size:.88rem;color:#bfe3c8">No confident misses, what you are sure of, you have right. That is the calibration you want.</p>' : ''))
          + (fragile ? '<p style="margin:9px 0 0;font-size:.85rem;color:#F3B1A8">' + fragile + ' you got right but were not sure about. You know more than you trust; name why the answer is right and it becomes solid.</p>' : '')
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

    var badge = '<span class="mono" style="font-size:.62rem;letter-spacing:.06em;color:var(--green);background:#E9EFE7;border:1px solid #9CC4A8;border-radius:999px;padding:3px 10px;margin-left:10px;vertical-align:middle">NOT GRADED</span>';
    var kc = '<section id="wk-kc" class="node"><h2 class="wk-sec">Knowledge Check ' + badge + '</h2>'
      + '<p class="wk-hint">Nothing here counts toward your grade and nothing is recorded. Three sets: Set A and Set B are multiple choice; Set C brings scenarios, matching, and short written reflections. Answer, say how sure you were, and the check shows you not just what you got right but where a confident answer was actually wrong, the thing most worth fixing.</p>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 10px">' + vers + retake + '</div>'
      + setNote + progress + revealCta + summary + kRows + shortHtml + '</section>';
    return { html: kc, items: kcItems.concat(shortItems) };
  }

  function weekHero(w, d, opt) {
    d = d || {};
    opt = opt || {};
    var emphasis = emphasisRecord(w);
    var route = opt.route || ['Read', 'See', 'Try', 'Reflect'];
    var routeHtml = route.map(function (x, i) { return '<span><b>' + (i + 1) + '</b>' + esc(x) + '</span>'; }).join('');
    var startPart = opt.startPart || 'pre';
    var startLabel = opt.startLabel || 'Start this week';
    var sub = opt.sub || (emphasis && emphasis.frame) || d.overview || '';
    var q = opt.question === false ? '' : (opt.question || (emphasis && emphasis.question) || journeyQ(w));
    var pp = programProfile();
    var programRoute = pp ? '<div class="wk-hero-program"><span>PROGRAM ROUTE</span><b>' + esc(pp.program) + '</b><small>' + esc(programWeekMove(w).concept) + '</small></div>' : '';
    return '<section id="wk-ov" class="node jhero jfade wk-hero2">'
      + heroThemeImage(w)
      + '<div class="wk-hero-main"><header class="wk-hero-heading"><div class="mono wk-hero-kicker">WEEK ' + w + ' | ' + esc(weekDate(w)) + ' | ' + esc(opt.label || deliveryMode(w).label) + '</div>'
      + '<h1>' + esc(opt.title || weekTitle(w)) + '</h1>' + programRoute + '</header>'
      + '<div class="wk-hero-copy">' + (sub ? '<p>' + esc(sub) + '</p>' : '') + '</div>'
      + '<aside class="wk-hero-prompt" aria-label="This week\'s opening question">' + (q ? '<div class="wk-hero-question">' + esc(q) + '</div>' : '')
      + '<div class="wk-hero-actions"><button type="button" onclick="SOC.jumpWeek(' + w + ',\'' + startPart + '\')">' + esc(startLabel) + '</button><span>' + ic('calendar', 13) + ' ' + esc(deliveryMode(w).short) + '</span></div></aside></div>'
      + '<aside class="wk-hero-route" aria-label="Weekly route"><div class="mono">MODULE ROUTE</div>' + routeHtml + '</aside>'
      + '</section>';
  }

  function weekIdeaPanel(w) {
    var m = spotlightRecord(w);
    if (!m) return '';
    var media = spotlightPageMedia(m);
    var program = m.program ? '<div class="idea-program"><b>In ' + esc(m.program.profile.program) + '</b><p>' + esc(m.program.scenario) + '</p><p><strong>How this route changes the inquiry.</strong> ' + esc(m.program.emphasis) + '</p><p><strong>Evidence boundary.</strong> ' + esc(m.program.evidence) + '</p></div>' : '';
    return '<section id="wk-idea" class="node idea-panel" data-emphasis="' + esc(m.emphasisId) + '"><div class="idea-grid has-media">' + media
      + '<div class="idea-copy"><div class="mono idea-kicker">' + esc(m.eyebrow || 'IDEA IN VIEW') + '</div>'
      + '<h2 class="wk-sec">' + esc(m.title || 'Idea in view') + '</h2>'
      + '<div class="idea-definition"><b>What ' + esc(m.emphasisLabel) + ' means here</b><p>' + esc(m.definition) + '</p><p><strong>This week:</strong> ' + esc(m.frame) + '</p></div>'
      + '<div class="idea-block"><b>Why this image belongs</b><p>' + esc(m.why || '') + '</p></div>'
      + (m.notice ? '<div class="idea-block"><b>What this image can and cannot show</b><p>' + esc(m.notice) + '</p></div>' : '')
      + program
      + (m.question ? '<div class="idea-question"><b>Question to carry forward</b><p>' + esc(m.question) + '</p></div>' : '')
      + '</div></div></section>';
  }

  function weekTermsInPlainLanguage(w) {
    var byWeek = {
      3: [
        ['Positivism', 'A view that reliable knowledge should come from observable evidence and scientific method. Martin examines how this stance was used to dismiss Indigenous knowledge as unscientific.', 'Martin, 2012']
      ],
      6: [
        ['Ontology and the ontological turn', 'Ontology means a theory about what exists and how beings relate. The ontological turn is a movement in anthropology that made these questions central. Todd argues that this movement often borrowed Indigenous thought without naming or crediting Indigenous thinkers.', 'Todd, 2016']
      ],
      8: [
        ['Discourse and Foucault', 'A discourse is a connected way of speaking, classifying, and thinking that can make a human-made category feel natural. Lawrence draws on Michel Foucault to examine how law produced and normalized ways of seeing Native identity.', 'Lawrence, 2003']
      ],
      9: [
        ['Interpellation', 'Althusser\'s term for the process by which an ideology calls someone into a social identity or role. The person recognizes the call and begins to act within the position it offers.', 'Althusser, 1970']
      ]
    };
    var rows = byWeek[w] || [];
    if (!rows.length) return '';
    return '<section id="wk-language" class="node"><h2 class="wk-sec">Terms in plain language</h2><p class="wk-hint">These terms appear in the assigned source or practice questions. Start with the plain meaning, then return to the author\'s exact use.</p>'
      + rows.map(function (row) { return '<div class="wk-term"><b>' + esc(row[0]) + '</b>: ' + esc(row[1]) + ' <span class="wk-cite">(' + esc(row[2]) + ')</span></div>'; }).join('') + '</section>';
  }

  function weekPage(w, d) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var sec = function (id, title, inner) { return '<section id="wk-' + id + '" class="node"><h2 class="wk-sec">' + esc(title) + '</h2>' + inner + '</section>'; };
    var hero = weekHero(w, d, { startPart: 'pre', startLabel: 'Start this week', label: deliveryMode(w).label });
    var img = weekIdeaPanel(w);
    var pre = sec('pre', 'Before you begin', '<p class="wk-hint">A quick read on where your understanding sits right now, no grade. Rate each idea, then meet them again at the end to see how far your thinking moves.</p>' + wkChecks(w, 'pre', d));
    var purpose = '<section id="wk-learn" class="node"><h2 class="wk-sec">Purpose</h2><p style="margin:0">' + esc(d.purpose) + '</p></section>';
    var emphasis = emphasisPanel(w);
    var outcomes = sec('out', 'Learning outcomes', '<p style="margin:0 0 8px;font-size:.9rem">By the end of this week, you will be able to:</p>' + d.outcomes.map(function (o) { return '<div class="wk-oc"><span class="b"></span>' + esc(o) + '</div>'; }).join(''));
    var guiding = sec('gq', 'Guiding questions', '<p style="margin:0 0 8px;font-size:.9rem">Hold these in mind as you work:</p>' + d.guiding.map(function (q) { return '<div class="wk-gq"><span class="q">+</span>' + esc(q) + '</div>'; }).join(''));
    var plainTerms = weekTermsInPlainLanguage(w);
    var care = d.careNote ? '<section id="wk-care" class="node wk-care"><div class="mono">CONTENT AND CHOICE</div><h2 class="wk-sec">Work with this material without over-disclosure</h2><p>' + esc(d.careNote) + '</p></section>' : '';
    var programLens = lensProgramSection(w, d);
    var programCase = lensCaseStudySection(w, d);
    var globalContext = contextWeekSection(w);
    var concepts = sec('con', 'Key concepts', '<p class="wk-hint">These are full explanations written through your selected route. The cited source meaning stays intact, but the entry point, sequence, use, and boundary change.</p>' + d.concepts.map(function (c, i) { return emphasisConceptHtml(w, c, i); }).join(''));
    var terms = sec('term', 'Key terms', '<p class="wk-hint">Each definition remains source-grounded. The selected route changes how the term is framed, tested, and limited in use.</p>' + d.terms.map(function (t, i) { return emphasisTermHtml(w, t, i); }).join(''));
    var orderedReadings = emphasisReadingOrder(w, d.readings);
    var readings = sec('read', 'Readings', emphasisReadingIntro(w) + orderedReadings.map(function (r) { var resolves = (typeof rec === 'function') && r.id && rec(r.id); var tail = resolves ? '<button onclick="SOC.read(\'' + r.id + '\')" class="wk-scope">' + esc(r.scope || 'Open the reading') + ' &#8599;</button>' : (r.scope ? '<div class="wk-scope" style="background:none;border:none;color:var(--ink-faint);padding:6px 0;cursor:default">' + esc(r.scope) + '</div>' : ''); return '<div class="wk-read"><div class="ref">' + r.apa + '</div>' + tail + '</div>'; }).join('') + readingRescueSection(w, d));
    var weekMedia = scholarMedia().filter(function (item) { return Number(item.week) === Number(w); });
    var mediaHint = w === 5
      ? 'This required CBC Marketplace video is the source of the lesson. Watch it first, then use OpenStax and Reid and colleagues to test its evidence, limits, knowledge authority, and responsibilities. Load the official player only when you are ready.'
      : 'Use this media as a course source. Load the official player only when you are ready.';
    var media = weekMedia.length ? '<section id="wk-media" class="node"><h2 class="wk-sec">Watch and question</h2><p class="wk-hint">' + esc(emphasisMediaCopy(w, mediaHint)) + '</p><div class="vid-grid">' + weekMedia.map(videoCard).join('') + '</div></section>' : '';
    var watch = walkWorld(w) ? '<section id="wk-watch" class="node"><h2 class="wk-sec">Weekly experience</h2><p style="margin:0 0 12px;font-size:.92rem">Enter this week\'s distinct interactive world. The experience supports the readings and asks you to make meaning; it does not replace the evidence or write the conclusion.</p><button type="button" class="wk-cta" style="margin:0" data-experience-week="' + w + '" onclick="SOC.enterExperience(' + w + ')">' + esc(experienceActionLabel(w)) + '</button></section>' : '';
    var activityCopy = emphasisActivityCopy(w, d.activity);
    var act = '<section id="wk-do" class="node interactive"><h2 class="wk-sec">The activity: ' + esc(d.activity.title) + '</h2><div class="wk-whatwhy emphasis-activity-copy"><b>What this becomes through ' + esc(emphasisOption().label) + ':</b> ' + esc(activityCopy.what) + '<br><br><b>Why you are doing it through this route:</b> ' + esc(activityCopy.why) + '</div>' + lensActivityBlock(w, d.activity, false) + '<button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">Start the activity' + ic('chevron', 17, 2.4) + '</button><p style="margin:10px 0 0;font-size:.74rem;color:var(--ink-faint)">Predict, do the work, inspect the result, and name the evidence. The required activity remains common; its intellectual purpose changes with the route.</p></section>';
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Reflection</h2>'
      + '<div class="wk-ocheck"><div class="mono" style="font-size:.78rem;font-weight:700;color:var(--ink-faint);margin-bottom:7px">YOU CAN NOW</div>' + d.youcan.map(function (y) { return '<div class="wk-row"><span class="t">' + ic('check', 14, 2.6) + '</span>' + esc(y) + '</div>'; }).join('') + '</div>'
      + '<h3 style="margin:16px 0 4px">Now, what do you think?</h3><p class="wk-hint" style="margin-bottom:8px">The same ideas from the start. Rate them again to see where your understanding sits now, and how far it moved.</p>' + wkChecks(w, 'post', d)
      + '<h3 style="margin:16px 0 4px">Your reflection</h3>' + emphasisReflectionPrompt(w, d.reflectPrompt)
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" aria-label="Week ' + w + ' reflection" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
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
      + [['ov', 'Overview'], ['mode', 'How this week works'], ['rec', deliveryMode(w).kind === 'live' ? 'Class recording and updates' : 'Updates for this week'], ['pre', 'Before you begin'], ['learn', 'Purpose']].concat(emphasis ? [['emphasis', 'Learning emphasis']] : []).concat([['out', 'Learning outcomes'], ['gq', 'Guiding questions']]).concat(plainTerms ? [['language', 'Terms in plain language']] : []).concat(care ? [['care', 'Content and choice']] : []).concat(img ? [['idea', 'Idea in view']] : []).concat(programLens ? [['lens', 'For your program']] : []).concat(media ? [['media', 'Watch and question']] : []).concat([['con', 'Key concepts'], ['term', 'Key terms'], ['read', 'Readings']]).concat(globalContext ? [['context', 'Cultural comparison']] : []).concat(walkWorld(w) ? [['watch', 'Experience']] : []).concat(programCase ? [['case', 'Case study']] : []).concat([['do', 'The activity'], ['reflect', 'Reflection']]).concat(sg ? [['sg', 'Study Guide']] : []).concat(kcItems.length ? [['kc', 'Knowledge Check']] : []).concat([['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('calendar', 12) + ' ' + esc(deliveryMode(w).short) + '</div></div></aside>';
    var collBar = '<div class="wk-coll-bar" role="group" aria-label="Section display controls"><button type="button" onclick="SOC.wkCollAll(' + w + ',1)">Collapse all sections</button><span>Weeks start folded so you can see the whole map. Up to two sections stay open at once; opening a third closes the earliest one. Sections fold again when you leave the week.</span></div>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><main>' + collBar + pre + purpose + emphasis + outcomes + guiding + plainTerms + care + img + programLens + media + concepts + terms + readings + globalContext + watch + programCase + act + reflect + sg + kc + notes + navRow + '</main>' + rail + '</div></div>';
  }
  /* ---------- generic week activities: match / scenario / toggle / assemble / lab ---------- */
  function actCard(inner) { return '<div style="background:#fff;border:1px solid var(--border);border-radius:12px;padding:16px 18px;margin:0 0 12px">' + inner + '</div>'; }
  function actCite(c) { return c ? '<div style="font-size:.74rem;color:var(--ink-faint);margin-top:6px">(' + esc(c) + ')</div>' : ''; }
  function actBadge(harm) { return harm ? '<span style="display:inline-block;background:#FBE9EA;color:#B11722;font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">a weaker move</span>' : '<span style="display:inline-block;background:#E7F3EC;color:var(--green);font-size:.7rem;font-weight:700;border-radius:999px;padding:2px 9px;margin-left:8px">a stronger move</span>'; }
  function actCaseBox(label, txt) { return txt ? '<div style="background:#15171C;color:#fff;border-radius:12px;padding:14px 18px;margin:0 0 16px"><div style="font-size:.7rem;font-weight:700;color:#6B7280;margin-bottom:4px">' + label + '</div><div style="font-size:.98rem;line-height:1.5">' + esc(txt) + '</div></div>' : ''; }
  function actMatch(w, a) {
    var d = a.data || {}, pairs = d.pairs || [], uniq = [], seen = {};
    pairs.forEach(function (p) { if (!seen[p.match]) { seen[p.match] = 1; uniq.push(p.match); } });
    var rows = pairs.map(function (p, i) {
      var key = 'a|' + w + '|m|' + i, sel = state.act[key];
      var btns = uniq.map(function (o, oi) {
        var picked = (sel === oi), correct = (o === p.match), bg = '#fff', bd = 'var(--border)', col = 'var(--ink)';
        if (sel != null) { if (correct) { bg = '#E7F3EC'; bd = 'var(--green)'; col = '#155f34'; } else if (picked) { bg = '#FBE9EA'; bd = '#B11722'; col = '#8f1119'; } }
        return '<button onclick="SOC.actPick(\'' + key + '\',' + oi + ')" aria-pressed="' + picked + '" style="text-align:left;border:1px solid ' + bd + ';background:' + bg + ';color:' + col + ';border-radius:9px;padding:8px 12px;font-size:.86rem;font-weight:600;cursor:pointer;margin:0 6px 6px 0">' + esc(o) + '</button>';
      }).join('');
      var fb = (sel != null) ? '<div style="margin-top:8px;font-size:.86rem;color:var(--ink-dim)">' + (uniq[sel] === p.match ? '<b style="color:var(--green)">Yes. </b>' : '<b style="color:#B11722">Not quite. </b>') + esc(p.why) + actCite(p.cite) + '</div>' : '';
      return actCard('<div style="font-size:.7rem;font-weight:700;color:var(--red);margin-bottom:5px">EXAMPLE ' + (i + 1) + '</div><div style="font-size:1rem;font-weight:600;color:var(--ink);margin-bottom:10px">' + esc(p.item) + '</div><div style="font-size:.78rem;color:var(--ink-faint);margin-bottom:6px">Which mechanism does this show?</div>' + btns + fb);
    }).join('');
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Match each example to the mechanism it shows.') + '</p>' + rows;
  }
  function actScenario(w, a) {
    var d = a.data || {}, steps = d.steps || [];
    var rows = steps.map(function (st, i) {
      var key = 'a|' + w + '|s|' + i, sel = state.act[key];
      var choices = (st.choices || []).map(function (c, ci) {
        var picked = (sel === ci), bd = picked ? (c.harm ? '#B11722' : 'var(--green)') : 'var(--border)', bg = picked ? (c.harm ? '#FBE9EA' : '#E7F3EC') : '#fff';
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
      var sw = '<button onclick="SOC.actToggle(\'' + key + '\')" aria-pressed="' + on + '" aria-label="' + esc(t.label) + '" style="border:none;border-radius:999px;width:52px;height:28px;background:' + (on ? 'var(--green)' : '#C7CDD6') + ';position:relative;cursor:pointer;flex:0 0 auto"><span style="position:absolute;top:3px;left:' + (on ? '27px' : '3px') + ';width:22px;height:22px;border-radius:50%;background:#fff"></span></button>';
      return actCard('<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">' + sw + '<div style="font-size:.96rem;font-weight:700;color:var(--ink)">' + esc(t.label) + '<span style="font-size:.72rem;font-weight:600;color:var(--ink-faint);margin-left:8px">' + (on ? 'ON' : 'OFF') + '</span></div></div><div style="font-size:.88rem;color:var(--ink-dim)">' + esc(on ? t.on : t.off) + '</div><div style="font-size:.82rem;color:#B11722;margin-top:6px"><b>What it affects:</b> ' + esc(t.whoHarmed) + '</div>' + actCite(t.cite));
    }).join('');
    return actCaseBox('THE SYSTEM', d.system) + '<p style="margin:0 0 14px;color:var(--ink-dim)">Flip each setting and watch what changes.</p>' + rows;
  }
  function actAssemble(w, a) {
    var d = a.data || {}, comps = d.components || [], key = 'a|' + w + '|asm', added = state.act[key] || [];
    var avail = comps.map(function (c, i) { return added.indexOf(i) >= 0 ? '' : '<button onclick="SOC.actAdd(\'' + key + '\',' + i + ')" style="display:block;width:100%;text-align:left;border:1px dashed var(--border);background:#fff;color:var(--ink);border-radius:9px;padding:10px 13px;font-size:.9rem;font-weight:600;cursor:pointer;margin:0 0 7px">+ ' + esc(c.label) + '</button>'; }).join('');
    var built = added.map(function (idx, n) { var c = comps[idx] || {}; return '<div style="border-left:3px solid var(--red);background:#fff;border:1px solid var(--border);border-radius:9px;padding:10px 13px;margin:0 0 8px"><div style="font-size:.92rem;font-weight:700;color:var(--ink)">' + (n + 1) + '. ' + esc(c.label) + '</div><div style="font-size:.85rem;color:var(--ink-dim);margin-top:3px">' + esc(c.role) + actCite(c.cite) + '</div></div>'; }).join('');
    var done = (added.length >= comps.length && comps.length) ? '<div style="margin-top:14px;background:#E7F3EC;border:1px solid var(--green);border-radius:10px;padding:12px 15px;font-size:.9rem;color:#155f34;font-weight:600">You have assembled the whole picture. Seeing the parts together is the point: it is how they fit that matters, not any one piece.</div>' : '';
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
    var note = chosen.length >= pick ? '<div style="margin-top:8px;background:#E7F3EC;border:1px solid var(--green);border-radius:10px;padding:12px 15px;font-size:.88rem;color:#155f34;font-weight:600">You picked your ' + pick + '. There is no clean answer here: every option gives something and costs something. That trade-off is the real choice.</div>' : '<div style="margin-top:8px;font-size:.82rem;color:var(--ink-faint)">Choose ' + pick + ' levers (' + chosen.length + ' of ' + pick + ' chosen).</div>';
    return actCaseBox('THE CASE', d['case']) + '<p style="margin:0 0 12px;color:var(--ink-dim)">You are weighing the options. Pick the ' + pick + ' levers you would use, and weigh what each one costs.</p>' + rows + note;
  }
  function actCapstone(w, a) {
    var d = a.data || {}, items = d.items || [];
    var rows = items.map(function (it, i) {
      var key = 'a|' + w + '|cap|' + i, on = !!state.act[key];
      var btn = '<button onclick="SOC.actToggle(\'' + key + '\')" style="display:flex;align-items:center;gap:11px;width:100%;text-align:left;border:1px solid ' + (on ? 'var(--green)' : 'var(--border)') + ';background:' + (on ? '#E7F3EC' : '#fff') + ';border-radius:9px;padding:11px 14px;font-size:.95rem;font-weight:700;color:var(--ink);cursor:pointer;margin:0 0 ' + (on ? '0' : '8px') + '"><span style="width:20px;height:20px;border-radius:50%;border:2px solid ' + (on ? 'var(--green)' : '#C7CDD6') + ';background:' + (on ? 'var(--green)' : '#fff') + ';color:#fff;flex:0 0 auto;display:flex;align-items:center;justify-content:center">' + (on ? ic('check', 12, 3) : '') + '</span>' + esc(it.label) + '</button>';
      var body = on ? '<div style="border:1px solid var(--green);border-top:none;border-radius:0 0 9px 9px;background:#fff;padding:10px 14px;margin:0 0 8px;font-size:.88rem;color:var(--ink-dim)">' + esc(it.prompt) + actCite(it.cite) + '</div>' : '';
      return btn + body;
    }).join('');
    var callout = d.callout ? '<div style="margin-top:14px;background:#15171C;color:#fff;border-radius:12px;padding:16px 18px"><div style="font-size:.7rem;font-weight:700;color:#6B7280;margin-bottom:5px">YOUR FINAL PROJECT</div><div style="font-size:.95rem;line-height:1.5">' + esc(d.callout) + '</div></div>' : '';
    return '<p style="margin:0 0 14px;color:var(--ink-dim)">' + esc(d.prompt || 'Revisit your cartography one dimension at a time. Mark each as you reread it.') + '</p>' + rows + callout;
  }
  function activityScreen() {
    var w = state.activityReturn, d = weekData(w);
    if (!d || !d.activity) return '<div style="padding:30px 0;color:var(--ink-dim)">No activity here. <button onclick="SOC.go(\'journey\')" style="background:none;border:none;color:var(--red);font-weight:600;cursor:pointer">Back to your journey</button></div>';
    var a = d.activity, activityCopy = emphasisActivityCopy(w, a);
    var head = '<section class="jhero" style="margin:0 0 18px;padding:26px 28px"><div class="mono" style="font-size:.7rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:7px">WEEK ' + w + ' ACTIVITY &middot; ' + esc(emphasisOption().label.toUpperCase()) + '</div><h1 style="font-size:1.7rem;line-height:1.15;font-weight:700;margin:0 0 12px;color:var(--ink)">' + esc(a.title) + '</h1><div class="wk-whatwhy emphasis-activity-copy" style="margin:0"><b>What this becomes through your selected route:</b> ' + esc(activityCopy.what) + '<br><br><b>Why you are doing it through this route:</b> ' + esc(activityCopy.why) + '</div></section>' + lensActivityBlock(w, a, true);
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
  /* The last two weeks use the completion renderer. It exposes every authored
     review field while labelling the sources and concepts as returns to earlier
     learning, not new teaching or a new graded deadline. */
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
    var heading = live ? 'Class recording and updates' : 'Updates for this week';
    var empty = live ? 'After class, I will post the captioned recording here when it is ready. I will also use this space for any week-specific update.' : 'There is no live class this week, so there is no class recording. I have not posted an additional update. If I do, you will find it here.';
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
      { d: '2026-10-23', it: [['Week 7 live class', 'Cumulative review before Study Week; no new reading', 'class']] },
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
    box.innerHTML = '<div class="upcoming-reminder-card"><div class="mono">BEFORE YOU BEGIN</div><h2 id="upcoming-reminder-title">Here is what is coming up</h2><ul>' + entries.map(function (e) { var p = upcomingParts(e); return '<li><b>' + esc(p.label) + '<small>(' + esc(p.date) + ')</small></b><span>' + esc(p.name) + (p.note ? ' <small>' + esc(p.note) + '</small>' : '') + '</span></li>'; }).join('') + '</ul><p>The banner at the top of every page stays current. Blackboard remains the official source for announcements and changed dates.</p><div><button type="button" onclick="SOC.closeUpcomingReminder();SOC.go(\'calendar\')">Open full calendar</button><button type="button" class="secondary" onclick="SOC.closeUpcomingReminder()">Continue to the site</button></div></div>';
    document.body.appendChild(box);
    box.addEventListener('keydown', function (e) { if (e.key !== 'Tab') return; var focusable = box.querySelectorAll('button:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])'); if (!focusable.length) return; var first = focusable[0], last = focusable[focusable.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } });
    setTimeout(function () { var b = box.querySelector('button'); if (b) b.focus(); }, 0);
  }
  function keyDatesRows(cats) { var out = '', mon = ''; keyDatesList().forEach(function (row) { var items = row.it.filter(function (x) { return !cats || cats.indexOf(x[2]) >= 0; }); if (!items.length) return; var p = row.d.split('-'), name = KD_MON[+p[1] - 1]; if (name !== mon) { out += '<div class="kd-mon">' + name + '</div>'; mon = name; } out += '<div class="kd-row"><div class="kd-date"><span class="kd-day">' + (+p[2]) + '</span><span class="kd-mo">' + name.slice(0, 3) + '</span></div><div class="kd-items">' + items.map(function (x) { return '<div class="kd-item kd-' + x[2] + '"><span class="kd-dot"></span><span>' + esc(x[0]) + (x[1] ? ' <em>' + esc(x[1]) + '</em>' : '') + '</span></div>'; }).join('') + '</div></div>'; }); return out; }
  function calEventsByIso() { var map = {}; keyDatesList().forEach(function (r) { var due = r.it.filter(function (x) { return x[2] === 'due'; }), a = r.it.filter(function (x) { return x[2] === 'async'; }), s = r.it.filter(function (x) { return x[2] === 'support'; }), c = r.it.filter(function (x) { return x[2] === 'class'; }), o = r.it.filter(function (x) { return x[2] === 'open'; }); if (due.length) map[r.d] = { kind: 'due', label: due.length > 1 ? due.length + ' assessments due' : due[0][0] + ' due' }; else if (a.length) map[r.d] = { kind: 'async', label: a[0][0] }; else if (s.length) map[r.d] = { kind: 'support', label: s[0][0] }; else if (c.length) map[r.d] = { kind: 'class', label: c[0][0] }; else if (o.length) map[r.d] = { kind: 'open', label: o[0][0] }; }); ['2026-10-26','2026-10-27','2026-10-28','2026-10-29','2026-10-30'].forEach(function (d) { map[d] = { kind: 'study', label: 'Study Week' }; }); return map; }
  function calMonthGrid(year, m) { var first = new Date(Date.UTC(year, m, 1)).getUTCDay(), days = new Date(Date.UTC(year, m + 1, 0)).getUTCDate(), ev = calEventsByIso(), dow = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function (x) { return '<div class="cal-dow">' + x + '</div>'; }).join(''), cells = ''; for (var i = 0; i < first; i++) cells += '<div class="cal-cell cal-blank"></div>'; for (var d = 1; d <= days; d++) { var iso = year + '-' + ('0' + (m + 1)).slice(-2) + '-' + ('0' + d).slice(-2), e = ev[iso]; cells += '<div class="cal-cell' + (e ? ' cal-' + e.kind : '') + '"><span class="cal-num">' + d + '</span>' + (e ? '<span class="cal-tag">' + esc(e.label) + '</span>' : '') + '</div>'; } return '<div class="cal-month"><div class="cal-mhead">' + KD_MON[m] + ' ' + year + '</div><div class="cal-grid">' + dow + cells + '</div></div>'; }
  function calendarPage() { var grids = [8,9,10,11].map(function (m) { return calMonthGrid(2026, m); }).join(''); return '<div class="rise cal-page"><div class="mono" style="font-size:.7rem;letter-spacing:.08em;color:var(--red);font-weight:700;margin-bottom:4px">CALENDAR</div><h1 style="font-size:1.9rem;line-height:1.15;font-weight:600;margin:0 0 8px;color:var(--ink)">Every date and delivery mode that matters</h1><p style="font-size:1rem;line-height:1.6;color:var(--ink-dim);margin:0 0 20px">This calendar keeps due dates and delivery modes clearly apart. Seneca red marks due dates. Black marks live classes. Neutral grey marks every asynchronous week with no lecture, including the office-hour weeks. A light grey outline marks Study Week. Week 4 applies the early foundations independently. Week 11 creates a synthesis point before the final live class. Weeks 13 and 14 protect focused completion, consultation, feedback, and closure. Blackboard remains the official word on dates.</p>' + deadlineRule() + mobileCalendarSubscription() + '<div class="cal-legend"><span class="cal-lg"><span class="cal-sw cal-sw-due"></span>Due date</span><span class="cal-lg"><span class="cal-sw cal-sw-class"></span>Live class</span><span class="cal-lg"><span class="cal-sw cal-sw-async"></span>Asynchronous; no lecture</span><span class="cal-lg"><span class="cal-sw cal-sw-study"></span>Study Week</span><span class="cal-lg"><span class="cal-sw cal-sw-support"></span>Term marker</span></div><div class="cal-grids">' + grids + '</div><section class="node"><h2 class="wk-sec">Assessment dates</h2><div>' + keyDatesRows(['due','open']) + '</div><h2 class="wk-sec" style="margin-top:24px">Class and asynchronous schedule</h2><div>' + keyDatesRows(['class','async','support']) + '</div></section></div>'; }
  function workWeekPage(w) {
    var d = weekData(w) || {};
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var isFinal = (next == null);
    var sec = function (id, title, inner) { return '<section id="wk-' + id + '" class="node"><h2 class="wk-sec">' + esc(title) + '</h2>' + inner + '</section>'; };
    var hero = weekHero(w, d, {
      label: deliveryMode(w).label,
      route: d.activity ? [isFinal ? 'Synthesize' : 'Project', 'Reflect', 'Save notes'] : ['Reflect', 'Save notes'],
      startPart: d.activity ? 'do' : 'reflect',
      startLabel: d.activity ? (isFinal ? 'Open course closure' : 'Open final project') : 'Start reflection',
      question: 'No new readings or teaching material this week. This time is yours: focus on your work' + (isFinal ? ' and close out the course. Nothing is due.' : '. Your final project is due this week.'),
      time: 'No new material'
    });
    var workActivityCopy = d.activity ? emphasisActivityCopy(w, d.activity) : null;
    var act = d.activity ? '<section id="wk-do" class="node interactive"><h2 class="wk-sec">' + esc(d.activity.title) + '</h2><div class="wk-whatwhy emphasis-activity-copy"><b>What this becomes through ' + esc(emphasisOption().label) + ':</b> ' + esc(workActivityCopy.what) + '<br><br><b>Why you are doing it through this route:</b> ' + esc(workActivityCopy.why) + '</div><button onclick="SOC.startActivity(\'' + d.activity.screen + '\',' + w + ')" class="wk-cta">' + (isFinal ? 'Open the course closure activity' : 'Open your final project') + ic('chevron', 17, 2.4) + '</button></section>' : '';
    var review = sec('review', isFinal ? 'Course review and your own synthesis' : 'Review and final-project synthesis',
      '<p class="wk-hint">These are not new readings or lessons. They reopen ideas already taught so you can revisit your own work and make the connections yourself.</p>'
      + '<p style="margin:0 0 14px;font-size:1rem;line-height:1.62">' + esc(d.overview || '') + '</p>'
      + '<div style="border-left:4px solid var(--red);background:#FFF8F7;padding:12px 14px"><b style="display:block;margin-bottom:4px">Purpose of this return</b><p style="margin:0;font-size:.92rem;line-height:1.58;color:var(--ink-dim)">' + esc(d.purpose || '') + '</p></div>');
    var outcomes = sec('out', 'What this review lets you do', '<p class="wk-hint">Use these as return points, not as new learning outcomes.</p>' + (d.outcomes || []).map(function (o) { return '<div class="wk-oc"><span class="b"></span>' + esc(o) + '</div>'; }).join(''));
    var guiding = sec('gq', 'Questions for your own synthesis', '<p class="wk-hint">The page gives you the questions. The connections and conclusions remain yours.</p>' + (d.guiding || []).map(function (q) { return '<div class="wk-gq"><span class="q">+</span>' + esc(q) + '</div>'; }).join(''));
    var concepts = sec('con', 'Concepts to revisit', '<p class="wk-hint">Return to these already-taught concepts through your selected learning emphasis. Keep every named source and knowledge tradition distinct and attributed.</p>' + (d.concepts || []).map(function (c, i) { return emphasisConceptHtml(w, c, i); }).join(''));
    var terms = sec('term', 'Language to carry forward', '<p class="wk-hint">These are review definitions for your own synthesis, not a new vocabulary list.</p>' + (d.terms || []).map(function (t, i) { return emphasisTermHtml(w, t, i); }).join(''));
    var orderedReadings = emphasisReadingOrder(w, d.readings || []);
    var readings = sec('read', 'Return to earlier sources', '<p class="wk-hint">No new reading is assigned. Reopen only the earlier source you need to verify a claim, quotation, attribution, or boundary in your own work.</p>' + orderedReadings.map(function (r) { var resolves = (typeof rec === 'function') && r.id && rec(r.id); return '<div class="wk-read"><div class="ref">' + esc(r.apa || '') + '</div>' + (r.scope ? '<div style="font-size:.78rem;line-height:1.45;color:var(--ink-faint);margin-top:6px">' + esc(r.scope) + '</div>' : '') + (resolves ? '<button onclick="SOC.read(\'' + r.id + '\')" class="wk-scope">Return to this source &#8599;</button>' : '') + '</div>'; }).join(''));
    var checklist = sec('check', 'Review checklist', '<p class="wk-hint">Use this to decide what needs one more look before you finish. It is not a quiz and nothing is recorded.</p>' + (d.checks || []).map(function (c) { var look = (typeof c === 'string') ? '' : (c.look || ''); return '<div class="wk-oc"><span class="b"></span><span>' + esc(checkText(c)) + (look ? '<small style="display:block;margin-top:3px;color:var(--ink-faint)">Return to ' + esc(look) + '.</small>' : '') + '</span></div>'; }).join(''));
    var reflect = '<section id="wk-reflect" class="node"><h2 class="wk-sec">Your reflection</h2>'
      + ((d.youcan || []).length ? '<div class="wk-ocheck"><div class="mono" style="font-size:.78rem;font-weight:700;color:var(--ink-faint);margin-bottom:7px">YOU CAN NOW</div>' + d.youcan.map(function (y) { return '<div class="wk-row"><span class="t">' + ic('check', 14, 2.6) + '</span>' + esc(y) + '</div>'; }).join('') + '</div>' : '')
      + emphasisReflectionPrompt(w, d.reflectPrompt || '')
      + '<textarea oninput="SOC.wkReflect(' + w + ',this.value)" aria-label="Week ' + w + ' reflection" class="wk-ta" placeholder="Your reflection...">' + esc(state.wkReflect[w] || '') + '</textarea>'
      + '</section>';
    var notes = '<section id="wk-notes" class="node"><h2 class="wk-sec">Generate Your Weekly Notes</h2>'
      + '<div class="wk-savebox" style="margin-top:0"><h3>Your organized Week ' + w + ' record</h3><p style="margin:0 0 6px;font-size:.9rem">This makes one Word file (.docx) on Seneca letterhead, your organized weekly record.</p><button onclick="SOC.saveWeek(' + w + ')" class="wk-save">Generate Your Weekly Notes</button></div></section>';
    var navRow = '<div style="display:flex;gap:12px;margin-top:18px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:180px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:180px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.66rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.92rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    var img = weekIdeaPanel(w);
    var programLens = lensProgramSection(w, d);
    var programCase = lensCaseStudySection(w, d);
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'This week'], ['mode', 'How this week works'], ['rec', deliveryMode(w).kind === 'live' ? 'Class recording and updates' : 'Updates for this week'], ['emphasis', 'Learning emphasis'], ['review', isFinal ? 'Course review' : 'Project review'], ['out', 'Review outcomes'], ['gq', 'Synthesis questions'], ['con', 'Concepts to revisit'], ['term', 'Language to carry'], ['read', 'Earlier sources'], ['check', 'Review checklist']].concat(img ? [['idea', 'Idea in view']] : []).concat(programLens ? [['lens', 'For your program']] : []).concat(programCase ? [['case', 'Case study']] : []).concat(d.activity ? [['do', isFinal ? 'Course closure activity' : 'Your final project']] : []).concat([['reflect', 'Reflection'], ['notes', 'Generate notes']]).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' No new material</div></div></aside>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><section>' + emphasisPanel(w) + review + outcomes + guiding + concepts + terms + readings + checklist + img + programLens + programCase + act + reflect + notes + navRow + '</section>' + rail + '</div></div>';
  }
  /* The journey home is now the course landing page. Week 1 therefore remains
     a full curriculum week instead of being replaced by a second orientation. */
  var OVERVIEW_WEEK = 0;
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
      + '<p style="margin:0 0 10px;font-size:1rem;line-height:1.6">This is a blended synchronous course. Weeks 1 to 3, 5 to 10, and 12 meet live. Weeks 4 and 11 are independent asynchronous learning weeks. Week 7 is a live cumulative-review class with no new reading. Week 13 is supported asynchronous completion with office hours, and Week 14 is asynchronous course closure with optional consultation and no graded deadline. Every week page names its mode and purpose. Live weeks include a class-recording space; asynchronous weeks may carry a short instructor update. Study Week, October 26 to 30, falls between Weeks 7 and 8 and has no class or new module. Blackboard remains the official Seneca course platform.</p>'
      + '<p style="margin:0;font-size:1rem;line-height:1.6">This week is your orientation. There are no readings and nothing to submit. When you are ready, begin with Week ' + (next != null ? next : 2) + '.</p></section>';
    var beginRow = (next != null) ? '<div style="margin-top:18px"><button onclick="SOC.station(' + next + ')" style="border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 18px;cursor:pointer;text-align:left;min-width:220px"><div class="mono" style="font-size:.66rem;color:var(--red)">BEGIN &rarr;</div><div style="font-size:.95rem;font-weight:700;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button></div>' : '';
    var img = weekIdeaPanel(w);
    var rail = '<aside class="wk-rail"><div class="wk-railbox"><div class="wk-railh">IN THIS WEEK</div>'
      + [['ov', 'Overview'], ['mode', 'How this week works'], ['rec', 'Class recording and updates'], ['how', 'How this course works'], ['emphasis', 'Learning emphasis']].concat(img ? [['idea', 'Idea in view']] : []).map(function (it) { return '<a href="#wk-' + it[0] + '"><span class="s"></span>' + it[1] + '</a>'; }).join('')
      + '<div class="wk-railt">' + ic('clock', 12) + ' Overview, no readings</div></div></aside>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + '<div class="wk-grid"><section>' + how + emphasisPanel(w) + img + beginRow + '</section>' + rail + '</div></div>';
  }
  function kcWeekPage(w) {
    var ws = journeyWeeks(), idx = ws.indexOf(w), prev = idx > 0 ? ws[idx - 1] : null, next = idx < ws.length - 1 ? ws[idx + 1] : null;
    var dt = (typeof weekDate === 'function') ? weekDate(w) : '';
    var er = emphasisRecord(w);
    var hero = weekHero(w, { time: 'Optional review' }, {
      label: 'CUMULATIVE REVIEW',
      title: weekTitle(w) || 'Cumulative Review Week',
      sub: (er ? er.frame + ' ' : '') + 'There is no new reading this week. Use the cumulative sets to test this selected route against Weeks 2 to 6. Nothing here counts toward your grade.',
      question: er ? er.question : false,
      route: ['Review', 'Check', 'Reflect'],
      startPart: 'kc',
      startLabel: 'Start review'
    });
    var kcR = kcSection(w);
    var kc = kcR.html || '<p style="color:var(--ink-dim);font-size:1rem">The check for this week is being prepared.</p>';
    var programLens = lensProgramSection(w, {});
    var programCase = lensCaseStudySection(w, {});
    var navRow = '<div style="display:flex;gap:12px;margin-top:26px;flex-wrap:wrap">'
      + (prev != null ? '<button onclick="SOC.station(' + prev + ')" style="flex:1;min-width:190px;text-align:left;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--ink-faint)">&larr; PREVIOUS</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + prev + ': ' + esc(weekTitle(prev)) + '</div></button>' : '')
      + (next != null ? '<button onclick="SOC.station(' + next + ')" style="flex:1;min-width:190px;text-align:right;border:1px solid var(--border);background:#fff;border-radius:12px;padding:13px 16px;cursor:pointer"><div class="mono" style="font-size:.6875rem;color:var(--red)">NEXT &rarr;</div><div style="font-size:.9375rem;font-weight:600;color:var(--ink);margin-top:2px">Week ' + next + ': ' + esc(weekTitle(next)) + '</div></button>' : '')
      + '</div>';
    return '<div class="rise">' + hero + deliveryNotice(w) + recordingSection(w) + emphasisPanel(w) + weekIdeaPanel(w) + programLens + programCase + kc + navRow + '</div>';
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
    return '<div class="rise">' + hero + emphasisPanel(w) + framing + '<div class="mono" style="font-size:.6875rem;letter-spacing:.05em;color:var(--ink-faint);margin:0 0 12px">WHAT YOU ARE READING</div>' + readBlocks + stationDo(w) + navRow + '</div>';
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
  function programProfile() {
    var L = lensParse();
    if (!L || !L.program) return null;
    var P = window.SOC122_PROGRAM_PROFILES || {};
    var key = L.area + '::' + L.program;
    if (P.bySelection && P.bySelection[key]) return P.bySelection[key];
    return P.byProgram && P.byProgram[L.program] ? P.byProgram[L.program] : null;
  }
  var PROGRAM_WEEK_MOVES = {
    1: { concept: 'the sociological imagination', term: 'private trouble and public issue', caseMove: 'take an event that could be blamed on one person and trace the history, institution, role, and resource pattern around it', evidenceMove: 'separate the immediate event from the wider pattern using records, testimony, and institutional context', reflection: 'What first looked personal, and what became visible once the setting and institution entered the explanation?' },
    2: { concept: 'knowledge authority and Two-Eyed Seeing', term: 'Etuaptmumk and ethical space', caseMove: 'identify which knowledge system defines the problem, which evidence receives authority, and what respectful relationship would be required before acting', evidenceMove: 'keep Elder Albert Marshall\'s Mi\'kmaw teaching named and distinct while examining the Western evidence rules used in the field', reflection: 'Who is authorized to explain this situation, and what would change if another named knowledge source held co-equal standing?' },
    3: { concept: 'colonization, worldview, and cultural safety', term: 'colonization and worldview', caseMove: 'ask how law, institutional history, and taken-for-granted ideas of normality shaped the program setting', evidenceMove: 'name the Nation, people, community, place, and source whenever Indigenous experience or knowledge is relevant; never substitute a pan-Indigenous category', reflection: 'Which institutional assumption looks natural only because its history has been hidden?' },
    4: { concept: 'truth, reconciliation, and institutional responsibility', term: 'reconciliation and cultural safety', caseMove: 'move from acknowledgement to a concrete institutional responsibility supported by the Truth and Reconciliation evidence used in the course', evidenceMove: 'distinguish a symbolic response from a change in rules, resources, authority, records, or relationships', reflection: 'What responsibility belongs to the institution or professional role, and what would count as evidence that the response changed practice?' },
    5: { concept: 'research design and evidence limits', term: 'sample, measure, validity, and causal inference', caseMove: 'turn the field problem into a research question, define what will be measured, identify who is sampled, and match the conclusion to the design', evidenceMove: 'use quantitative and qualitative evidence for different jobs and state what neither source establishes', reflection: 'What can the available evidence support in this program case, and what stronger claim must remain unmade?' },
    6: { concept: 'culture as learned, shared, contested, and changing', term: 'culture, ethnocentrism, and cultural relativism', caseMove: 'examine how meaning is learned in the setting without treating a country, race, religion, region, or profession as one culture', evidenceMove: 'look for internal variation by place, language, generation, class, gender, migration, institution, and position', reflection: 'Which broad label was tempting, and what specific evidence would be needed before using it responsibly?' },
    7: { concept: 'cumulative comparison and evidence repair', term: 'claim, source, context, and limit', caseMove: 'revisit one field assumption from Weeks 1 to 6 and repair it by naming the concept, source, evidence, and boundary', evidenceMove: 'show what changed in the reasoning rather than merely adding more information', reflection: 'Which earlier explanation would you now qualify, and what evidence caused the change?' },
    8: { concept: 'socialization, identity regulation, and institutional classification', term: 'socialization and identity regulation', caseMove: 'trace how roles and identities are learned in the setting, then keep Bonita Lawrence\'s account of state regulation of Indigenous identity legally and historically specific', evidenceMove: 'separate everyday socialization from the power of law and institutions to classify belonging, status, and access', reflection: 'Which identity in the setting is learned through interaction, and which is being regulated by an institution?' },
    9: { concept: 'ideology, normalization, stratification, and institutional power', term: 'ideology, status, stratification, and normalization', caseMove: 'trace how a preferred norm becomes ordinary, how rewards and penalties stabilize it, and who gains status or access as a result', evidenceMove: 'keep race, culture, class, religion, nationality, and institutional category analytically distinct even when they intersect', reflection: 'Which rule or rating appears neutral, who benefits from its normality, and what evidence reveals the distribution of consequences?' },
    10: { concept: 'normality, stigma, credibility, and mental-health institutions', term: 'stigma, normality, and credibility', caseMove: 'ask how the program setting decides whose perception, distress, or behaviour is credible and which response becomes normal', evidenceMove: 'avoid diagnosis and personal disclosure; use public, fictional, historical, institutional, or policy evidence', reflection: 'What changes when the situation is read through context and institution instead of as a defect inside one person?' },
    11: { concept: 'situation, role, researcher power, and evidence audit', term: 'fundamental attribution error and situational power', caseMove: 'audit how instructions, roles, hierarchy, surveillance, and the research or work setting help produce the behaviour being explained', evidenceMove: 'prefer a bounded claim about the constructed situation over a universal claim about human nature', reflection: 'Which part of the setting was being treated as background even though it helped produce the outcome?' },
    12: { concept: 'family, household, kinship, care, and social change', term: 'family as institution and kinship as work', caseMove: 'map household form, care labour, socialization, obligation, migration, policy, and relationship without ranking one family arrangement as natural', evidenceMove: 'keep Kim Anderson\'s Cree-Métis account attributed and distinct from the OpenStax institutional account', reflection: 'What does the program case reveal when family is viewed once as structure and again as relationship, care, and responsibility?' },
    13: { concept: 'personal cartography and responsible transfer', term: 'position, source trail, and transfer boundary', caseMove: 'choose one field assumption and map how the course changed the question, evidence, and responsibility attached to it', evidenceMove: 'identify the primary or community-grounded source still needed before using the case in assessed work', reflection: 'What can you now see in the program setting, and what must you still refuse to claim?' },
    14: { concept: 'plural social science and course synthesis', term: 'synthesis, non-equivalence, and responsibility', caseMove: 'build one argument across several course sources while keeping each source\'s purpose, evidence, context, and limit visible', evidenceMove: 'show what travels across contexts, what changes, and what cannot be treated as equivalent', reflection: 'What meaning have you constructed across the course, and what responsibility follows from the way you now use evidence?' }
  };
  function programWeekMove(w) { return PROGRAM_WEEK_MOVES[w] || PROGRAM_WEEK_MOVES[14]; }
  function programEmphasisMove(w, p) {
    if (!p) return '';
    var m = programWeekMove(w), id = cleanEmphasis(state.learningEmphasis);
    if (id === 'western') return 'Begin by defining and measuring ' + m.concept + ' through the field records, categories, institutions, and methods available in ' + p.program + '. Then state what those tools leave outside the frame.';
    if (id === 'indigenous') return 'Begin with the named Indigenous scholar, Nation, people, community, place, or project assigned this week. Ask what someone working in ' + p.program + ' would need to listen to, return, protect, or leave under community authority. Do not turn this into a generic Indigenous professional model.';
    return 'Keep the Western social-science account and the named Indigenous source whole and attributed. Use the ' + p.program + ' case to examine the relationship between them, not to blend them or turn the profession into an additional eye.';
  }
  function programWeekCase(w) {
    var p = programProfile(); if (!p) return null;
    var m = programWeekMove(w), o = emphasisOption();
    var career = window.SOC122_CAREER || {};
    var field = career.byField && career.byField[p.area];
    var fieldLead = field && field.lens ? field.lens : ('What would this week help you notice in ' + p.program + '?');
    return {
      profile: p,
      move: m,
      title: p.program + ': Week ' + w + ' field inquiry',
      scenario: fieldLead + ' In this fictional ' + p.program + ' case, the setting is ' + p.setting + '. The week-specific move is to ' + m.caseMove + '. Keep these people visible: ' + p.people + '.',
      evidence: 'Start with ' + p.evidence + '. Then ' + m.evidenceMove + '. The decision to examine is ' + p.decision + '.',
      tension: 'Watch for this: ' + p.tension + '.',
      emphasis: programEmphasisMove(w, p),
      question: m.reflection,
      label: o.label
    };
  }
  function programConceptHtml(w, c) {
    var x = programWeekCase(w); if (!x) return '';
    return '<div class="program-inside primary-program-writing"><span>' + esc(x.profile.program) + ' FIELD TRANSLATION</span><p><b>Where “' + esc(c.h) + '” becomes concrete.</b> ' + esc(x.scenario) + '</p><p><b>How this route changes the inquiry.</b> ' + esc(x.emphasis) + '</p><p><b>Evidence boundary.</b> ' + esc(x.evidence) + '</p></div>';
  }
  function programConceptPlain(w, c) {
    var x = programWeekCase(w); if (!x) return '';
    return ' In ' + x.profile.program + ', ' + c.h + ' becomes concrete in this course case: ' + x.scenario + ' ' + x.emphasis + ' Evidence boundary: ' + x.evidence;
  }
  function programTermHtml(w, t) {
    var x = programWeekCase(w); if (!x) return '';
    return '<div class="program-inside program-term-use"><span>USE “' + esc(t.term.toUpperCase()) + '” IN ' + esc(x.profile.program.toUpperCase()) + '</span><p>' + esc(x.move.term.charAt(0).toUpperCase() + x.move.term.slice(1)) + ' is the week\'s program-use test. Apply the term to ' + esc(x.profile.decision) + ', then check it against ' + esc(x.profile.evidence) + '.</p><p><b>Do not overreach:</b> ' + esc(x.profile.tension) + '.</p></div>';
  }
  function programTermPlain(w, t) {
    var x = programWeekCase(w); if (!x) return '';
    return ' Program use in ' + x.profile.program + ': apply ' + t.term + ' to ' + x.profile.decision + ' and test it against ' + x.profile.evidence + '. Do not overreach: ' + x.profile.tension + '.';
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
  function emphasisData() { return window.SOC122_LEARNING_EMPHASES || { defaultId: 'two', options: [], weeks: {} }; }
  function emphasisOption(id) {
    id = cleanEmphasis(id || state.learningEmphasis);
    var opts = emphasisData().options || [];
    for (var i = 0; i < opts.length; i++) if (opts[i].id === id) return opts[i];
    return { id: 'two', label: 'Two-Eyed Seeing', short: 'Two-Eyed Seeing', description: 'Hold required sources in relation while keeping each attributed and whole.' };
  }
  function emphasisRecord(w) {
    var byWeek = (emphasisData().weeks || {})[w] || {};
    return byWeek[cleanEmphasis(state.learningEmphasis)] || byWeek.two || null;
  }
  function emphasisOptionsHtml() {
    var cur = cleanEmphasis(state.learningEmphasis);
    return (emphasisData().options || []).map(function (o) { return '<option value="' + esc(o.id) + '"' + (o.id === cur ? ' selected' : '') + '>' + esc(o.label) + '</option>'; }).join('');
  }
  function lensChip() {
    var C = window[(D.course && D.course.code) + '_CAREER'] || null;
    if (!C) return '';
    var L = lensParse();
    var raw = state.careerField || '';
    var option = emphasisOption();
    return '<section class="personalize-bar" aria-labelledby="personalize-title"><div class="personalize-intro"><span aria-hidden="true">' + ic('globe', 17, 2) + '</span><div><b id="personalize-title">Personalize your route</b><small>The required sources, outcomes, assessments, and grading stay the same.</small></div></div>'
      + '<label><span>Your program</span><select onchange="SOC.careerField(this.value)" aria-label="Choose your Seneca program to personalize SOC122">' + lensProgramOpts(raw, L ? 'Change program...' : 'Choose your program...') + '</select><small>Changes concept and term examples, the field case, activity purpose, questions, and reflection.</small></label>'
      + '<label><span>Learning emphasis</span><select onchange="SOC.learningEmphasis(this.value)" aria-label="Choose a learning emphasis for SOC122">' + emphasisOptionsHtml() + '</select><small>' + esc(option.description) + '</small></label>'
      + '</section>';
  }
  function emphasisHomeIntro() {
    var o = emphasisOption(), invariants = emphasisData().invariants || [];
    return '<section class="emphasis-home jfade"><div><div class="mono">CURRENT LEARNING EMPHASIS</div><h2>' + esc(o.label) + '</h2><p>' + esc(o.description) + '</p></div><details><summary>What this changes, and what it never changes</summary><ul>' + invariants.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></details></section>';
  }
  function emphasisPanel(w) {
    var r = emphasisRecord(w), o = emphasisOption(); if (!r) return '';
    var route = (r.route || []).map(function (x, i) { return '<li><span>' + (i + 1) + '</span><p>' + esc(x) + '</p></li>'; }).join('');
    var pc = programWeekCase(w);
    var program = pc ? '<div class="emphasis-program-entry"><span>' + esc(o.label.toUpperCase()) + ' IN ' + esc(pc.profile.program.toUpperCase()) + '</span><p>' + esc(pc.emphasis) + '</p><small>' + esc(pc.profile.boundary) + '</small></div>' : '';
    return '<section id="wk-emphasis" class="node emphasis-week"><header><div class="mono">LEARNING EMPHASIS</div><h2 class="wk-sec">' + esc(o.label) + '</h2><p>' + esc(r.frame) + '</p></header><div class="emphasis-question"><span>THE QUESTION THIS ROUTE FOREGROUNDS</span><p>' + esc(r.question) + '</p></div><ol class="emphasis-route">' + route + '</ol><div class="emphasis-grid"><article><span>KEY CONCEPT MOVE</span><p>' + esc(r.conceptMove) + '</p></article><article><span>KEY TERM MOVE</span><p>' + esc(r.termMove) + '</p></article><article><span>ACTIVITY MOVE</span><p>' + esc(r.activity) + '</p></article><article><span>REFLECTION MOVE</span><p>' + esc(r.reflection) + '</p></article></div>' + program + '<aside><b>Boundary for this route</b><span>' + esc(r.limit) + '</span></aside></section>';
  }
  function emphasisThread(r, i) {
    var threads = [r.conceptMove, r.question, r.activity, r.limit];
    return threads[i % threads.length] || r.conceptMove;
  }
  function emphasisConceptHtml(w, c, i) {
    var r = emphasisRecord(w), o = emphasisOption();
    if (!r) return '<div class="wk-concept"><h3>' + esc(c.h) + '</h3><p>' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></p>' + programConceptHtml(w, c) + '</div>';
    var route = (r.route || [])[i % Math.max(1, (r.route || []).length)] || r.frame;
    return '<article class="wk-concept emphasis-rewritten"><header><span>' + esc(o.label) + ' &middot; CONCEPT ' + (i + 1) + '</span><h3>' + esc(c.h) + '</h3></header>'
      + '<p class="emphasis-opening">' + esc(route) + '</p>'
      + '<p>' + esc(c.body) + ' <span class="wk-cite">(' + esc(c.cite) + ')</span></p>'
      + '<p class="emphasis-use"><b>What this concept must do in this route:</b> ' + esc(emphasisThread(r, i)) + '</p>' + programConceptHtml(w, c) + '</article>';
  }
  function emphasisConceptPlain(w, c, i) {
    var r = emphasisRecord(w); if (!r) return c.body;
    var route = (r.route || [])[i % Math.max(1, (r.route || []).length)] || r.frame;
    return route + ' ' + c.body + ' What this concept must do in this route: ' + emphasisThread(r, i) + programConceptPlain(w, c);
  }
  function emphasisTermHtml(w, t, i) {
    var r = emphasisRecord(w), o = emphasisOption();
    if (!r) return '<div class="wk-term"><b>' + esc(t.term) + '</b>: ' + esc(t.def) + ' <span class="wk-cite">(' + esc(t.cite) + ')</span>' + programTermHtml(w, t) + '</div>';
    var route = (r.route || [])[i % Math.max(1, (r.route || []).length)] || r.termMove;
    return '<article class="wk-term emphasis-term-rewritten"><header><span>' + esc(o.label) + ' &middot; TERM ' + (i + 1) + '</span><h3>' + esc(t.term) + '</h3></header>'
      + '<p><b>Working definition.</b> ' + esc(t.def) + ' <span class="wk-cite">(' + esc(t.cite) + ')</span></p>'
      + '<p><b>How the selected route changes its use.</b> ' + esc(r.termMove) + '</p>'
      + '<p class="emphasis-use"><b>Use test.</b> ' + esc(route) + ' Ask whether “' + esc(t.term) + '” clarifies that move without claiming more than the cited source supports.</p>' + programTermHtml(w, t) + '</article>';
  }
  function emphasisTermPlain(w, t, i) {
    var r = emphasisRecord(w); if (!r) return t.def;
    var route = (r.route || [])[i % Math.max(1, (r.route || []).length)] || r.termMove;
    return t.def + ' Through this route: ' + r.termMove + ' Use test: ' + route + ' Ask whether the term clarifies that move without claiming more than the cited source supports.' + programTermPlain(w, t);
  }
  function emphasisActivityCopy(w, activity) {
    var r = emphasisRecord(w), o = emphasisOption();
    var pc = programWeekCase(w);
    if (!r) return { what: activity.what + (pc ? ' Program case: ' + pc.scenario : ''), why: activity.why + (pc ? ' Program evidence boundary: ' + pc.evidence : '') };
    return {
      what: r.activity + ' You will still complete “' + activity.title + ',” but the selected ' + o.label + ' route changes which evidence, relationship, or limit you must make visible while doing it. ' + activity.what + (pc ? ' In your ' + pc.profile.program + ' field inquiry, ' + pc.scenario : ''),
      why: 'The route is organized around this question: ' + r.question + ' ' + activity.why + ' Keep this boundary visible throughout: ' + r.limit + (pc ? ' The program-use boundary is equally important: ' + pc.evidence : '')
    };
  }
  function emphasisMediaCopy(w, common) {
    var r = emphasisRecord(w), o = emphasisOption(); if (!r) return common;
    return common + ' Through ' + o.label + ', the media is not background decoration. Use it to test this route question: ' + r.question + ' Then return to the assigned text and apply this evidence boundary: ' + r.limit;
  }
  function emphasisReadingOrder(w, readings) {
    var id = cleanEmphasis(state.learningEmphasis), list = (readings || []).slice();
    if (id === 'two') return list;
    return list.map(function (r, i) { var rr = r.id && typeof rec === 'function' ? rec(r.id) : null; return { r: r, i: i, eye: rr && rr.eye }; })
      .sort(function (a, b) {
        var wanted = id === 'indigenous' ? 'indigenous' : 'western';
        var av = a.eye === wanted ? 0 : a.eye ? 1 : 2, bv = b.eye === wanted ? 0 : b.eye ? 1 : 2;
        return av - bv || a.i - b.i;
      }).map(function (x) { return x.r; });
  }
  function emphasisReflectionPrompt(w, commonPrompt) {
    var r = emphasisRecord(w), o = emphasisOption(); if (!r) return commonPrompt ? '<p style="margin:0 0 8px;font-size:.95rem">' + esc(commonPrompt) + '</p>' : '';
    var pc = programWeekCase(w);
    return '<div class="emphasis-reflection"><span>' + esc(o.label) + ' ROUTE</span><p><b>Your central reflection:</b> ' + esc(r.reflection) + '</p>'
      + (commonPrompt ? '<p><b>Keep the week’s shared problem in view:</b> ' + esc(commonPrompt) + '</p>' : '')
      + (pc ? '<p><b>In ' + esc(pc.profile.program) + ':</b> ' + esc(pc.question) + '</p><p><b>Field evidence to name:</b> ' + esc(pc.profile.evidence) + '.</p>' : '')
      + '<p><b>Evidence boundary:</b> ' + esc(r.limit) + '</p></div>';
  }
  function emphasisReadingIntro(w) {
    var r = emphasisRecord(w), o = emphasisOption(); if (!r) return '';
    return '<section class="emphasis-reading-order"><header><b>' + esc(o.label) + ' reading route</b><span>The required source set is unchanged. The intellectual entry point, order, and work asked of you are different.</span></header><ol>'
      + (r.route || []).map(function (x, i) { return '<li><span>' + (i + 1) + '</span><p>' + esc(x) + '</p></li>'; }).join('')
      + '</ol><p><b>Reading boundary:</b> ' + esc(r.limit) + '</p></section>';
  }
  function lensHomeIntro() {
    var L = lensParse();
    if (!L) return '';
    var p = programProfile();
    if (p) {
      var o = emphasisOption();
      return '<section class="program-home jfade"><div class="mono">YOUR PROGRAM ROUTE &middot; ' + esc(p.area.toUpperCase()) + '</div><h2>' + esc(p.program) + '</h2><p class="program-home-scene">Across the course, your field inquiry is located in ' + esc(p.setting) + '.</p><div><article><b>People kept in view</b><span>' + esc(p.people) + '.</span></article><article><b>Evidence you will interrogate</b><span>' + esc(p.evidence) + '.</span></article><article><b>Recurring decision</b><span>' + esc(p.decision) + '.</span></article></div><aside><b>Current learning emphasis: ' + esc(o.label) + '</b><span>The program changes the concrete field world. The emphasis changes the intellectual route through it. Required sources and assessed expectations stay common.</span></aside><button type="button" onclick="SOC.go(\'career\')">Open the full program route</button></section>';
    }
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
    return 'What changes: your program filter changes the primary concept and key-term examples, field inquiry, case study, activity purpose, reflection prompt, expanded week hook, home panel, and Career Choices route. What stays the same: required readings, assessments, outcomes, deadlines, and grading.';
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
    var pc = programWeekCase(w);
    if (pc) {
      var cards = [
        ['FIELD SETTING', pc.profile.setting],
        ['PEOPLE AND RELATIONSHIPS', pc.profile.people],
        ['EVIDENCE IN THE ROOM', pc.profile.evidence],
        ['DECISION UNDER STUDY', pc.profile.decision],
        ['WATCH FOR', pc.profile.tension]
      ].map(function (n) { return '<article><span>' + esc(n[0]) + '</span><p>' + esc(n[1]) + '</p></article>'; }).join('');
      return '<section id="wk-lens" class="node program-lab"><header><div class="mono">PROGRAM ROUTE</div><h2 class="wk-sec">' + esc(pc.profile.program) + '</h2><p>This is not a generic career connection. It relocates the week\'s social-science problem inside a bounded, fictional field situation and changes the concept examples, key-term use, case questions, activity purpose, and reflection prompt.</p></header>'
        + '<div class="program-field-grid">' + cards + '</div>'
        + '<div class="program-week-inquiry"><span>WEEK ' + w + ' INQUIRY</span><h3>' + esc(pc.move.concept) + '</h3><p>' + esc(pc.scenario) + '</p><p><b>Evidence move:</b> ' + esc(pc.evidence) + '</p></div>'
        + '<div class="program-emphasis-bridge"><b>' + esc(pc.label) + ' changes the route</b><p>' + esc(pc.emphasis) + '</p></div>'
        + '<p class="program-boundary"><b>Boundary:</b> ' + esc(pc.profile.boundary) + '</p></section>';
    }
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
    var pc = programWeekCase(w);
    if (pc) {
      var qs = [
        ['Concept question', pc.question],
        ['Learning-emphasis question', pc.emphasis],
        ['Evidence question', 'Which part of ' + pc.profile.evidence + ' can support your claim, and which conclusion would exceed it?'],
        ['Responsibility question', 'Who should be able to challenge the decision, and what would have to be returned, changed, protected, or left under another authority?']
      ];
      return '<section id="wk-case" class="node program-case"><header><div class="mono">IN-DEPTH PROGRAM CASE</div><h2 class="wk-sec">' + esc(pc.title) + '</h2></header>'
        + '<div class="program-case-scene"><span>THE SCENE</span><p>' + esc(pc.scenario) + '</p></div>'
        + '<div class="program-case-evidence"><div><span>AVAILABLE EVIDENCE</span><p>' + esc(pc.evidence) + '</p></div><div><span>THE TENSION</span><p>' + esc(pc.tension) + '</p></div></div>'
        + '<div class="program-case-questions"><h3>Construct the analysis</h3><p>Do not answer by choosing the most compassionate sounding option. Name the concept, identify the evidence, keep the source and context visible, and state the limit.</p><ol>' + qs.map(function (q) { return '<li><b>' + esc(q[0]) + '.</b> ' + esc(q[1]) + '</li>'; }).join('') + '</ol></div>'
        + '<aside><b>Assessment transfer</b><span>This case may help you practise a reasoning move, but it is not assessment evidence. Return to the assigned course sources and build your own supported example.</span></aside></section>';
    }
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
  function assignmentStartLabLaunch() {
    return '<section class="path-close" aria-label="Assignment Start Lab"><div class="mono">PRIVATE PLANNING SUPPORT</div><h2>Not sure how to begin?</h2><p>Add your assignment, progress, exact sticking point, and available time. Fixed course rules create a personal start plan without using AI. Nothing is submitted, and your answers stay in this browser on this device.</p><div class="path-actions"><button type="button" onclick="location.href=\'assignment-start-lab.html\'"><b>Open Assignment Start Lab</b><small>Create a plan you can print or save as PDF.</small></button></div></section>';
  }
  function assignmentsPage() {
    var items = [
      ['Personal Cartography sequence', 'Course spine', 'Use the weekly rooms to build the map slowly instead of trying to invent it at the end.'],
      ['Two-Eyed Seeing Journal', 'Recurring work', 'Keep each entry grounded in the named source and in respectful, attributed language.'],
      ['Knowledge in Two Eyes', 'Reading and evidence practice', 'Compare one Western and one Indigenous-authored source, then interpret one numerical, statistical, sample, or measurement claim and state what it cannot prove.'],
      ['A Question of Reconciliation', 'Later-term application', 'Connect course concepts to responsibility without speaking for a community.'],
      ['Final project integration', 'Week 13 window', 'Bring the whole course map together with Blackboard as the official submission point.']
    ];
    var steps = items.map(function (x, i) { return '<li><span>' + (i + 1) + '</span><div><b>' + esc(x[0]) + '</b><em>' + esc(x[1]) + '</em><p>' + esc(x[2]) + '</p></div></li>'; }).join('');
    return '<div class="rise path-page"><section class="path-hero"><div><div class="mono">ASSIGNMENT PLANNING</div><h1>Understanding Your Assignment</h1><p>This page helps you read the assignment, identify the course ideas and evidence it needs, plan the work, and then submit the final version in Blackboard.</p></div><div class="path-compass"><span>SITE</span><b>practice, notes, evidence</b><i></i><span>BLACKBOARD</span><b>official brief, dropbox, grade</b></div></section><section class="path-summary"><div><b>Blackboard is official</b><span>Due dates, dropboxes, rubrics, feedback, and grades stay in Blackboard.</span></div><div><b>Use weekly notes</b><span>Generate notes from the weeks that feed the assignment before drafting.</span></div><div><b>Keep the course lens visible</b><span>Name the source, the course concept, the limit, and the responsibility question.</span></div></section>' + assignmentIntegrityNotice() + assignmentStartLabLaunch() + '<section class="path-route"><div class="path-route-head"><div class="mono">ASSIGNMENT ROUTE</div><h2>Start from the active SOC122 package</h2><p>Use this as a planning map only. Always check Blackboard for the complete instructions before submitting.</p></div><ol>' + steps + '</ol></section><section class="path-close"><h2>Start with the week that feeds the work</h2><p>Open the relevant weekly room, generate your notes, then come back to this assignment map when you are ready to draft.</p><div class="path-actions"><button type="button" onclick="SOC.station(4)"><b>Week 4</b><small>Cartography start.</small></button><button type="button" onclick="SOC.station(8)"><b>Week 8</b><small>Sociology and evidence.</small></button><button type="button" onclick="SOC.station(12)"><b>Week 12</b><small>Responsibility question.</small></button><button type="button" onclick="SOC.station(13)"><b>Week 13</b><small>Final project integration.</small></button></div></section></div>';
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
  function walkWorld(w) { return (window.SOC122_WALKTHROUGH_WORLDS || {})[w] || null; }
  function experienceResumeFor(w) {
    var r = rlState(), all = r.walkResumeByWeek && typeof r.walkResumeByWeek === 'object' ? r.walkResumeByWeek : {};
    var saved = all[String(w)];
    if (!saved || Number(saved.week) !== Number(w) || !(Number(saved.i) > 0)) return null;
    return saved;
  }
  function experienceActionLabel(w) { return experienceResumeFor(w) ? 'Re-enter the experience' : 'Enter the experience'; }
  function walkSaveResume(w, i) {
    var r = rlState(), record = { week: Number(w), i: Math.max(0, Number(i) || 0) };
    if (!r.walkResumeByWeek || typeof r.walkResumeByWeek !== 'object') r.walkResumeByWeek = {};
    r.walkResumeByWeek[String(w)] = record;
  }
  function refreshExperienceEntryLabels() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-experience-week]'), function (button) {
      button.textContent = experienceActionLabel(Number(button.getAttribute('data-experience-week')));
    });
  }
  function walkReviewData(w, world) {
    return {
      deck: 'SOC122_Week' + walkPad(w),
      overview: (world && world.lead) || 'Pause, review, and decide what needs another look.',
      guiding: ['Which idea is holding, which distinction is still blurring, and which exact room would help you repair it?'],
      concepts: [], terms: [], readings: [],
      youcan: ['You can identify one idea that is holding and one exact distinction to revisit.', 'You can return to a named source or room instead of adding more material.', 'You can keep Week 7 as cumulative review rather than turning it into a hidden new module.'],
      reflectPrompt: 'Choose one idea to keep and one distinction to repair. What exact source or room will you return to, and what will you check there?'
    };
  }
  function walkMediaItem(w) {
    var preferred = { 2:'amarshall', 3:'martin2012', 4:'smylie', 5:'cbcsmartphone2017', 6:'todd2016', 8:'lawrence2003', 9:'palmater', 10:'gone2023', 11:'bombay2014', 12:'anderson2019' };
    var items = scholarMedia().filter(function (v) { return +v.week === +w; });
    var id = preferred[w];
    return items.filter(function (v) { return id && v.key.indexOf(id + '|') === 0; })[0] || items[0] || null;
  }
  function walkSourceSet(w) {
    var all = recordsForWeek(w), out = [];
    function take(test) {
      var found = all.filter(function (r) { return out.indexOf(r) < 0 && test(r); })[0];
      if (found) out.push(found);
    }
    var emphasis = cleanEmphasis(state.learningEmphasis);
    if (emphasis === 'western') {
      take(function (r) { return r.eye === 'western'; });
      take(function (r) { return r.eye === 'indigenous'; });
    } else {
      take(function (r) { return r.eye === 'indigenous'; });
      take(function (r) { return r.eye === 'western'; });
    }
    all.forEach(function (r) { if (out.length < 4 && out.indexOf(r) < 0) out.push(r); });
    return out.slice(0, 4);
  }
  function walkSlides(w) {
    var world = walkWorld(w);
    var d = weekData(w) || (world ? walkReviewData(w, world) : null);
    if (!d) return [];
    var s = [], emphasis = emphasisRecord(w), option = emphasisOption();
    s.push({ kind: 'cover', title: weekTitle(w), question: (emphasis && emphasis.question) || (d.guiding && d.guiding[0]) || journeyQ(w), lead: firstSentence((emphasis && emphasis.frame) || d.overview || ''), hero: heroThemeRecord(w), world: world });
    if (emphasis) s.push({ kind: 'emphasis', record: emphasis, option: option });
    var idea = spotlightRecord(w);
    if (idea) s.push({ kind: 'idea', spotlight: idea });
    if (w === 2) s.push({ kind: 'twoeyes' });
    if (world) s.push({ kind: 'signature', world: world });
    var mediaItem = walkMediaItem(w);
    if (mediaItem) s.push({ kind: 'media', item: mediaItem, emphasis: emphasis });
    try { var _cc = (typeof courseCode === 'function') ? courseCode() : ''; var _HOLO = _cc && (typeof window !== 'undefined') && window[_cc + '_HOLO']; if (_HOLO && _HOLO.supports && typeof visualSpec === 'function') { var _vs = visualSpec(w, d); if (_vs && _HOLO.supports(_vs.kind)) s.push({ kind: 'model', week: w }); } } catch (e) {}
    (d.concepts || []).forEach(function (c, ci, list) {
      s.push({ kind: 'concept', h: c.h, body: emphasisConceptPlain(w, c, ci), cite: c.cite, n: ci + 1, total: list.length });
    });
    if (d.concepts && d.concepts.length > 1) s.push({ kind: 'atlas', items: d.concepts.slice(0, 6) });
    if (w !== 7 && contextIds().length) s.push({ kind: 'context', week: w });
    if (d.terms && d.terms.length) s.push({ kind: 'terms', items: d.terms.slice(0, 4).map(function (t, i) { return { term: t.term, def: emphasisTermPlain(w, t, i), cite: t.cite }; }) });
    if (d.guiding && d.guiding.length > 1) {
      var questions = ((emphasis && emphasis.question) ? [emphasis.question] : []).concat(d.guiding).filter(function (q, i, a) { return a.indexOf(q) === i; }).slice(0, 4);
      s.push({ kind: 'questions', items: questions });
    }
    var sources = walkSourceSet(w);
    if (sources.length) s.push({ kind: 'sources', items: sources });
    s.push({ kind: 'close', youcan: (d.youcan || []).slice(0, 3), reflect: (emphasis && emphasis.reflection) || d.reflectPrompt || '' });
    if (world && world.order) {
      var rank = {}, closeRank = world.order.indexOf('close');
      world.order.forEach(function (kind, i) { rank[kind] = i; });
      s = s.map(function (slide, i) {
        if (Object.prototype.hasOwnProperty.call(rank, slide.kind)) slide._walkOrder = rank[slide.kind];
        else if (slide.kind === 'emphasis' && Object.prototype.hasOwnProperty.call(rank, 'cover')) slide._walkOrder = rank.cover + .18;
        else slide._walkOrder = (closeRank >= 0 ? closeRank - .25 : world.order.length) + (i / 1000);
        return slide;
      })
        .sort(function (a, b) { return a._walkOrder - b._walkOrder; });
    }
    return s;
  }
  var _walk = null;
  function walkAppLock(on) {
    var app = document.getElementById('app');
    if (!app) return;
    if (on) {
      app.setAttribute('aria-hidden', 'true');
      if ('inert' in app) app.inert = true;
      document.body.classList.add('walk-open');
    } else {
      app.removeAttribute('aria-hidden');
      if ('inert' in app) app.inert = false;
      document.body.classList.remove('walk-open');
    }
  }
  function walkCoverMedia(hm) {
    var items = heroItems(hm);
    if (!items.length) return '';
    var gallery = items.length > 1;
    var pictures = items.map(function (item) {
      var styles = [];
      if (item.position) styles.push('object-position:' + esc(item.position));
      if (item.fit === 'contain') styles.push('object-fit:contain!important;background:#0D0F12');
      var style = styles.length ? ' style="' + styles.join(';') + '"' : '';
      return '<div class="walk-cover-tile"><img src="' + esc(item.file) + '" alt="' + esc(item.alt || '') + '"' + style + '>'
        + (gallery ? '<div class="walk-cover-tile-cap">' + heroItemCaption(item) + '</div>' : '') + '</div>';
    }).join('');
    return '<figure class="walk-cover-media emphasis-' + esc(cleanEmphasis(state.learningEmphasis)) + (gallery ? ' is-gallery' : '') + '"><div class="walk-cover-pictures">' + pictures + '</div><figcaption>'
      + (hm.lensLabel ? '<em>Visual route | ' + esc(hm.lensLabel) + '</em>' : '')
      + (hm.statement ? '<strong>' + esc(hm.statement) + '</strong>' : '')
      + (hm.caption ? '<b>' + esc(hm.caption) + '</b>' : '')
      + (!gallery && hm.credit ? '<span>' + esc(hm.credit) + '</span>' : '')
      + (!gallery && hm.source ? ' <a href="' + esc(hm.source) + '" target="_blank" rel="noopener">Image source</a>' : '')
      + '</figcaption></figure>';
  }
  function walkSlideHtml(s, w) {
    if (s.kind === 'cover') {
      var media = walkCoverMedia(s.hero || {});
      return '<div class="walk-cover-grid' + (media ? '' : ' no-media') + '">' + media + '<div class="walk-cover-scrim" aria-hidden="true"></div><div class="walk-cover-copy">'
        + '<div class="walk-kicker">WEEK ' + w + ' | ' + esc((s.world && s.world.room) || 'ENTER THE EXPERIENCE') + '</div>'
        + '<h2 class="walk-title">' + esc(s.title) + '</h2>'
        + (s.lead ? '<p class="walk-lead">' + esc(s.lead) + '</p>' : '')
        + '<div class="walk-q"><span>The question guiding this experience</span><b>' + esc(s.question) + '</b></div>'
        + '<button type="button" class="walk-enter" onclick="SOC.walkEnter()">Enter the experience <span aria-hidden="true">&#8594;</span></button>'
        + '<p class="walk-hint">Choose Enter the experience to begin. Horizontal navigation unlocks in the next room.</p>'
        + '</div></div>';
    }
    if (s.kind === 'emphasis') {
      var er = s.record || {}, eo = s.option || emphasisOption();
      return '<div class="walk-emphasis-room"><header><div class="walk-kicker">YOUR SELECTED LEARNING ROUTE</div><h2 class="walk-h">' + esc(eo.label) + '</h2><p>' + esc(er.frame || '') + '</p></header><div class="walk-emphasis-question"><span>THE QUESTION THAT GOVERNS THIS VERSION</span><b>' + esc(er.question || '') + '</b></div><ol>'
        + (er.route || []).map(function (x, i) { return '<li><span>' + (i + 1) + '</span><p>' + esc(x) + '</p></li>'; }).join('')
        + '</ol><aside><b>Do not cross this boundary</b><span>' + esc(er.limit || '') + '</span></aside></div>';
    }
    if (s.kind === 'signature') return walkSignatureHtml(s.world, w);
    if (s.kind === 'media') {
      var v = s.item;
      var mr = s.emphasis;
      return '<div class="walk-media-room"><div class="walk-media-copy"><div class="walk-kicker">A VOICE OR CASE IN THE ROOM</div><h2 class="walk-h">' + esc(v.title) + '</h2><p>' + esc(v.synopsis || 'Use this media item as an on-ramp into the assigned reading.') + (mr ? ' ' + esc('In this route, use the media to pursue this question: ' + mr.question + ' Return to the assigned text and keep this boundary visible: ' + mr.limit) : '') + '</p><div class="walk-media-move"><b>Watch or listen for</b><span>' + esc((v.watchFor && v.watchFor[0]) || 'the central claim and its evidence') + '</span><b>Then return to the text</b><span>' + esc(v.readNext || ('Open the Week ' + w + ' readings and test the claim.')) + '</span></div><a href="' + esc(v.url) + '" target="_blank" rel="noopener">Open the official source and accessibility options <span aria-hidden="true">&#8599;</span></a></div><div class="walk-media-frame">' + videoEmbed(v) + '<p>No autoplay. The experience remains complete without playing the media.</p></div></div>';
    }
    if (s.kind === 'concept') {
      var number = String(s.n || 1).padStart(2, '0');
      var total = String(s.total || 1).padStart(2, '0');
      return '<div class="walk-concept-frame"><aside class="walk-concept-index"><span>' + number + '</span><small>of ' + total + '</small></aside><div class="walk-concept-copy">'
        + '<div class="walk-kicker">KEY IDEA</div><h2 class="walk-h">' + esc(s.h) + '</h2>'
        + '<p class="walk-body">' + esc(s.body) + '</p>'
        + (s.cite ? '<div class="walk-cite">' + esc(s.cite) + '</div>' : '')
        + '<button type="button" class="walk-note-toggle" aria-expanded="false" onclick="SOC.walkToggleNote(this)">Put this idea in your words</button>'
        + '<div class="walk-note-panel" hidden><label><b>Make one connection</b><span>Use a public, fictional, or general example. Nothing is submitted.</span><textarea rows="2" placeholder="This idea helps me notice..."></textarea></label></div>'
        + '</div></div>';
    }
    if (s.kind === 'idea') {
      var sm = s.spotlight || {};
      var sp = sm.program ? '<div class="walk-spotlight-program"><span>IN ' + esc(sm.program.profile.program.toUpperCase()) + '</span><p>' + esc(sm.program.scenario) + '</p><p><b>How this route changes the inquiry.</b> ' + esc(sm.program.emphasis) + '</p><p><b>Evidence boundary.</b> ' + esc(sm.program.evidence) + '</p></div>' : '';
      return '<div class="walk-figwrap">'
        + '<div class="walk-figtext">'
        + '<div class="walk-kicker">' + esc(sm.eyebrow || 'A PERSON OR PLACE IN CONTEXT') + '</div>'
        + '<h2 class="walk-fighead">' + esc(sm.title || 'Idea in view') + '</h2>'
        + '<div class="walk-spotlight-definition"><b>What ' + esc(sm.emphasisLabel || 'this route') + ' means here</b><p>' + esc(sm.definition || '') + '</p><p><strong>This week:</strong> ' + esc(sm.frame || '') + '</p></div>'
        + '<div class="walk-spotlight-block"><b>Why this image belongs</b><p>' + esc(sm.why || '') + '</p></div>'
        + (sm.notice ? '<div class="walk-notice"><span>What it can and cannot show</span><p>' + esc(sm.notice) + '</p></div>' : '')
        + sp
        + (sm.question ? '<div class="walk-q"><span>Question to carry forward</span><b>' + esc(sm.question) + '</b></div>' : '')
        + '<p class="walk-cite">' + esc(sm.credit || '') + (sm.generated ? ' Conceptual image, not documentary evidence.' : '') + (sm.source ? ' <a href="' + esc(sm.source) + '" target="_blank" rel="noopener">Source</a>' : '') + '</p>'
        + '</div>'
        + spotlightWalkMedia(sm)
        + '</div>';
    }
    if (s.kind === 'twoeyes') {
      return '<div class="walk-kicker">ACTIVATE THE FRAME</div><h2 class="walk-h" style="color:#15171C">Open each eye. Keep each one whole.</h2><p class="walk-eye-instruction">Choose both lenses. The point is not to make them identical; it is to keep both present.</p>'
        + '<div class="walk-twoeyes">'
        + '<button type="button" class="walk-eye ind" aria-pressed="false" onclick="SOC.walkEye(this)"><span class="walk-eye-state">Activate this eye</span><h3>Named Indigenous course source</h3><ul><li>Name the scholar or knowledge holder</li><li>Name the Nation, people, or community when supported</li><li>State the source\'s own question and purpose</li><li>Keep its evidence and limits visible</li></ul></button>'
        + '<div class="walk-both" aria-live="polite">Both<br>stay whole</div>'
        + '<button type="button" class="walk-eye" aria-pressed="false" onclick="SOC.walkEye(this)"><span class="walk-eye-state">Activate this eye</span><h3>Named Western course source</h3><ul><li>Name the discipline and author</li><li>State the method or evidence base</li><li>Identify the institution or category in view</li><li>Keep the claim and its limits visible</li></ul></button>'
        + '</div><div class="walk-q"><span>Now hold the difference</span><b>Name one question that each eye would ask differently. Do not blend the answers yet.</b></div>';
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
    if (s.kind === 'atlas') {
      return '<div class="walk-kicker">BUILD THE WEEK\'S IDEA MAP</div><h2 class="walk-h" style="color:#15171C">Choose a thread. Watch the map reorganize around it.</h2><div class="walk-atlas">'
        + '<div class="walk-atlas-nav" role="tablist" aria-label="Key concepts">' + s.items.map(function (c, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" class="' + (i === 0 ? 'on' : '') + '" onclick="SOC.walkAtlas(this,' + i + ')"><span>' + String(i + 1).padStart(2, '0') + '</span>' + esc(c.h) + '</button>'; }).join('') + '</div>'
        + '<div class="walk-atlas-stage">' + s.items.map(function (c, i) { return '<article role="tabpanel" class="walk-atlas-panel' + (i === 0 ? ' on' : '') + '"' + (i === 0 ? '' : ' hidden') + '><div class="walk-atlas-orbit" aria-hidden="true"><i></i><i></i><i></i></div><span>THREAD ' + String(i + 1).padStart(2, '0') + '</span><h3>' + esc(c.h) + '</h3><p>' + esc(firstSentence(c.body || '')) + '</p><small>' + esc(c.cite || '') + '</small></article>'; }).join('') + '</div>'
        + '</div>';
    }
    if (s.kind === 'context') {
      return '<div class="walk-kicker">CURATE THE COMPARISON WALL</div><h2 class="walk-h" style="color:#15171C">Bring up to three named contexts into this room.</h2><p class="walk-context-intro">Your choices rearrange the evidence wall. Compare institutions and claims, not whole cultures or kinds of people.</p>'
        + contextCompareShell(s.week, 'walk')
        + '<span class="walk-context-mobile-cue">Swipe the context cards to inspect A, B, and C. The experience itself still moves with the Previous and Next controls.</span>'
        + '<p class="walk-context-foot">The full Cultural Comparison Lab keeps your evidence trail and connects it to assessment preparation. This room never writes the conclusion.</p>';
    }
    if (s.kind === 'terms') {
      return '<div class="walk-kicker">THE WORDS TO KNOW</div><div class="walk-terms">'
        + s.items.map(function (t) { return '<button type="button" class="walk-term" aria-expanded="false" onclick="SOC.walkTerm(this)"><span class="walk-term-cue">Tap to reveal</span><span class="walk-term-h">' + esc(t.term) + '</span><span class="walk-term-d">' + esc(t.def) + (t.cite ? ' <i>(' + esc(t.cite) + ')</i>' : '') + '</span></button>'; }).join('')
        + '</div>';
    }
    if (s.kind === 'questions') {
      return '<div class="walk-kicker">CHOOSE A QUESTION TO CARRY</div><h2 class="walk-h">The experience does not close the question for you.</h2><ul class="walk-qlist">' + s.items.map(function (q) { return '<li><button type="button" onclick="SOC.walkChooseQuestion(this)">' + esc(q) + '</button></li>'; }).join('') + '</ul>';
    }
    if (s.kind === 'sources') {
      return '<div class="walk-kicker">THE SOURCES UNDER THE EXPERIENCE</div><h2 class="walk-h" style="color:#15171C">Move from the experience back into evidence.</h2><div class="walk-sources">'
        + s.items.map(function (r) { var tag = '<span>' + esc((r.eye || 'course') + ' | ' + (r.type || 'source')) + '</span><b>' + esc(r.title) + '</b><small>' + esc(r.authors + (r.year ? ' (' + r.year + ')' : '')) + '</small>'; return r.url ? '<a class="walk-source" href="' + esc(r.url) + '" target="_blank" rel="noopener">' + tag + '<em>Open source &#8599;</em></a>' : '<article class="walk-source">' + tag + '</article>'; }).join('')
        + '</div><div class="walk-q"><span>Next move</span><b>Open the full week after this experience, then read the assigned sources through the question you chose.</b></div>';
    }
    return '<div class="walk-kicker">YOU CAN NOW</div><ul class="walk-can">' + (s.youcan || []).map(function (y) { return '<li>' + esc(y) + '</li>'; }).join('') + '</ul>'
      + '<div class="walk-chosen"><span>Your question to carry</span><p>' + esc((_walk && _walk.question) || 'Choose one question in the previous chapter, or return to the week\'s opening question.') + '</p></div>'
      + (s.reflect ? '<div class="walk-reflect"><span>Then reflect</span><p>' + esc(s.reflect) + '</p></div>' : '')
      + '<button type="button" class="walk-cta" onclick="SOC.walkGoWeek()">Open Week ' + _walk.week + ' in full</button>';
  }
  function walkSignaturePanel(item, i, on) {
    return '<article id="walk-sig-panel-' + i + '" class="walk-signature-panel' + (on ? ' on' : '') + '" role="tabpanel" aria-label="' + esc((item.label || ('Move ' + (i + 1))) + ': ' + item.title) + '" data-sig-panel="' + i + '"' + (on ? '' : ' hidden') + '><span>' + esc(item.label || ('Move ' + (i + 1))) + '</span><h3>' + esc(item.title) + '</h3><p>' + esc(item.body) + '</p><b>' + esc(item.prompt || '') + '</b></article>';
  }
  function walkSignatureTabs(world, shape) {
    return '<div class="walk-sig-tabs ' + esc(shape || '') + '" role="tablist" aria-label="' + esc(world.room) + '">' + world.items.map(function (x, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" aria-controls="walk-sig-panel-' + i + '" tabindex="' + (i === 0 ? '0' : '-1') + '" class="' + (i === 0 ? 'on' : '') + '" onclick="SOC.walkSigPick(this,' + i + ')" onkeydown="SOC.walkSigKey(event,this)"><span>' + String(i + 1).padStart(2,'0') + '</span>' + esc(x.label) + '</button>'; }).join('') + '</div><div class="walk-sig-stage">' + world.items.map(function (x, i) { return walkSignaturePanel(x, i, i === 0); }).join('') + '</div>';
  }
  function walkSignatureHtml(world, w) {
    if (!world) return '';
    var head = '<div class="walk-kicker">' + esc(world.room.toUpperCase()) + '</div><h2 class="walk-h" style="color:#15171C">' + esc(world.title) + '</h2><p class="walk-signature-lead">' + esc(world.lead) + '</p>';
    var items = world.items || [], body = '';
    if (world.mode === 'archive') {
      body = '<div class="walk-archive">' + items.map(function (x, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary><span>' + String(i + 1).padStart(2,'0') + '</span><b>' + esc(x.label) + '</b><em>Open drawer</em></summary><div><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p><strong>' + esc(x.prompt) + '</strong></div></details>'; }).join('') + '</div>';
    } else if (world.mode === 'notebook') {
      body = '<div class="walk-notebook">' + items.map(function (x, i) { return '<button type="button" aria-pressed="false" onclick="SOC.walkSigToggle(this)"><span>FIELD NOTE ' + String(i + 1).padStart(2,'0') + '</span><b>' + esc(x.title) + '</b><i>Turn the note</i><div><p>' + esc(x.body) + '</p><strong>' + esc(x.prompt) + '</strong></div></button>'; }).join('') + '</div>';
    } else if (world.mode === 'control') {
      body = '<div class="walk-control"><div class="walk-control-board">' + items.map(function (x, i) { return '<label><span>' + esc(x.label) + '</span><b>' + esc(x.title) + '</b><input type="range" min="0" max="100" value="' + (i === 0 ? 28 : i === 1 ? 45 : 62) + '" oninput="SOC.walkControl(this)" aria-label="' + esc(x.label) + '"><small>' + esc(x.prompt) + '</small></label>'; }).join('') + '</div><output class="walk-control-output"><span>MODEL OUTPUT</span><b>Norms are visible, but access is not yet fully tied to approval.</b><p>This model is a thinking tool, not a prediction about a person or culture.</p></output></div>';
    } else if (world.mode === 'hearing') {
      body = '<div class="walk-hearing">' + items.map(function (x, i) { return '<article><span>' + esc(x.label) + '</span><h3>' + esc(x.title) + '</h3><p>' + esc(x.body) + '</p><div role="group" aria-label="Choose a provisional evidence verdict"><button type="button" onclick="SOC.walkVerdict(this,\'Supported\')">Supported</button><button type="button" onclick="SOC.walkVerdict(this,\'Qualified\')">Qualified</button><button type="button" onclick="SOC.walkVerdict(this,\'Disputed\')">Disputed</button><button type="button" onclick="SOC.walkVerdict(this,\'Not established\')">Not established</button></div><output>' + esc(x.prompt) + '</output></article>'; }).join('') + '</div>';
    } else if (world.mode === 'house') {
      body = '<div class="walk-house"><div class="walk-house-front" role="tablist" aria-label="Rooms in the kinship house">' + items.map(function (x, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" aria-controls="walk-sig-panel-' + i + '" tabindex="' + (i === 0 ? '0' : '-1') + '" class="' + (i === 0 ? 'on' : '') + '" onclick="SOC.walkSigPick(this,' + i + ')" onkeydown="SOC.walkSigKey(event,this)"><span>' + esc(x.label) + '</span><i aria-hidden="true"></i></button>'; }).join('') + '</div><div class="walk-house-room">' + items.map(function (x, i) { return walkSignaturePanel(x, i, i === 0); }).join('') + '</div></div>';
    } else if (world.mode === 'reconstruct' || world.mode === 'studio') {
      body = '<div class="walk-collect" data-collect-total="' + items.length + '"><div class="walk-collect-trays">' + items.map(function (x, i) { return '<button type="button" aria-pressed="false" onclick="SOC.walkCollect(this)"><span>' + esc(x.label) + '</span><b>' + esc(x.title) + '</b><p>' + esc(x.body) + '</p><em>' + esc(x.prompt) + '</em></button>'; }).join('') + '</div><output><b>0 of ' + items.length + ' fragments selected</b><span>' + (world.mode === 'studio' ? 'The route changes; the writing remains yours.' : 'Choose only what would make your review more precise.') + '</span></output></div>';
    } else if (world.mode === 'globe') {
      body = '<div class="walk-globe-room"><div class="walk-globe" role="img" aria-label="Interactive abstract globe showing that one world contains many distinct contexts"><div class="walk-globe-sphere"><i></i><i></i><i></i><i></i></div><span>GLOBAL DOES NOT MEAN UNIFORM</span></div><div class="walk-globe-routes" role="tablist" aria-label="Choose a route around the synthesis globe">' + items.map(function (x, i) { return '<button type="button" role="tab" aria-selected="' + (i === 0 ? 'true' : 'false') + '" aria-controls="walk-sig-panel-' + i + '" tabindex="' + (i === 0 ? '0' : '-1') + '" class="' + (i === 0 ? 'on' : '') + '" onclick="SOC.walkGlobe(this,' + i + ')" onkeydown="SOC.walkSigKey(event,this)"><span>' + String(i + 1).padStart(2,'0') + '</span>' + esc(x.label) + '</button>'; }).join('') + '<div class="walk-globe-panels">' + items.map(function (x, i) { return walkSignaturePanel(x, i, i === 0); }).join('') + '</div></div></div>';
    } else {
      var shape = world.mode === 'observatory' ? 'scope' : world.mode === 'map' ? 'nodes' : world.mode === 'city' ? 'buildings' : world.mode === 'lab' ? 'bench' : world.mode === 'threshold' ? 'doors' : world.mode === 'clinic' ? 'trays' : '';
      body = '<div class="walk-signature-' + esc(world.mode) + '">' + walkSignatureTabs(world, shape) + '</div>';
    }
    return '<div class="walk-signature walk-world-' + esc(world.slug) + '" data-signature-mode="' + esc(world.mode) + '" data-week="' + w + '">' + head + body + '</div>';
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
  function walkFit() {
    if (!_walk) return;
    var ov = document.getElementById('walk-overlay');
    var slides = document.querySelectorAll('#walk-overlay .walk-slide');
    var slide = slides[_walk.i], fit = slide && slide.querySelector('.walk-fit');
    if (!ov || !slide || !fit) return;
    var textLevel = +rlState().walkText || 100;
    if ([100, 125, 150, 175, 200].indexOf(textLevel) < 0) textLevel = 100;
    var textFactor = textLevel / 100;
    ov.setAttribute('data-walk-text', String(textLevel));
    ov.setAttribute('data-walk-large', textLevel >= 150 ? 'true' : 'false');
    ov.style.setProperty('--walk-text-factor', String(textFactor));
    var textOut = ov.querySelector('.walk-text-value');
    if (textOut) textOut.textContent = textLevel + '%';
    fit.style.width = '';
    fit.style.zoom = '1';
    slide.style.overflowY = 'hidden';
    slide.style.placeItems = 'center';
    slide.removeAttribute('data-scrollable');
    var cs = getComputedStyle(slide);
    var ah = slide.clientHeight - (parseFloat(cs.paddingTop) || 0) - (parseFloat(cs.paddingBottom) || 0);
    var aw = slide.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
    var h = Math.max(fit.scrollHeight, fit.getBoundingClientRect().height);
    var w = Math.max(fit.scrollWidth, fit.getBoundingClientRect().width);
    var scale = textFactor;
    var logicalWidth = Math.min(w, aw / Math.max(.01, scale));
    if (!slide.classList.contains('wkslide-cover')) fit.style.width = Math.floor(logicalWidth) + 'px';
    else scale = 1;
    fit.style.zoom = String(scale);
    var renderedHeight = Math.max(fit.scrollHeight, fit.getBoundingClientRect().height / Math.max(.01, scale)) * scale;
    var needsScroll = renderedHeight > ah + 3;
    slide.style.overflowY = needsScroll ? 'auto' : 'hidden';
    slide.style.placeItems = needsScroll ? 'start center' : 'center';
    if (needsScroll) slide.setAttribute('data-scrollable', 'true');
    fit.setAttribute('data-fit', Math.round(scale * 100) + '%');
    fit.setAttribute('data-text-size', textLevel + '%');
  }
  function walkSync(focusSlide) {
    var ov = document.getElementById('walk-overlay');
    if (!ov || !_walk) return;
    var total = _walk.slides.length;
    _walk.i = Math.max(0, Math.min(total - 1, _walk.i));
    var track = ov.querySelector('.walk-track');
    if (track) track.style.setProperty('--walk-index', _walk.i);
    var chapters = ov.querySelectorAll('.walk-slide');
    Array.prototype.forEach.call(chapters, function (chapter, k) {
      var active = k === _walk.i;
      chapter.setAttribute('aria-hidden', active ? 'false' : 'true');
      if ('inert' in chapter) chapter.inert = !active;
    });
    var progress = ov.querySelector('.walk-progress');
    if (progress) { progress.style.setProperty('--walk-progress', (((_walk.i + 1) / total) * 100) + '%'); progress.setAttribute('aria-valuemin', '1'); progress.setAttribute('aria-valuemax', String(total)); progress.setAttribute('aria-valuenow', String(_walk.i + 1)); }
    Array.prototype.forEach.call(ov.querySelectorAll('.walk-dot'), function (dot, k) {
      dot.classList.toggle('on', k === _walk.i);
      dot.setAttribute('aria-current', k === _walk.i ? 'step' : 'false');
      dot.disabled = _walk.i === 0 && k !== 0;
      dot.setAttribute('aria-disabled', dot.disabled ? 'true' : 'false');
    });
    var count = ov.querySelector('.walk-count');
    if (count) count.textContent = (_walk.i + 1) + ' / ' + total;
    var status = ov.querySelector('.walk-status');
    if (status) {
      var activeHeading = chapters[_walk.i] && chapters[_walk.i].querySelector('h2');
      status.textContent = 'Chapter ' + (_walk.i + 1) + ' of ' + total + (activeHeading ? ': ' + activeHeading.textContent.trim() : '');
    }
    var prev = ov.querySelector('.walk-prev'), next = ov.querySelector('.walk-next');
    if (prev) prev.disabled = _walk.i === 0;
    if (next) next.disabled = _walk.i === 0 || _walk.i === total - 1;
    explorationMark('walkRooms', _walk.week + '|' + _walk.i);
    requestAnimationFrame(function () {
      walkFit();
      if (focusSlide && chapters[_walk.i]) { try { chapters[_walk.i].focus({ preventScroll: true }); } catch (e) {} }
    });
    walkSaveResume(_walk.week, _walk.i); persist();
    try { sessionStorage.setItem(WKKEY, JSON.stringify({ w: _walk.week, i: _walk.i })); } catch (e) {}
  }
  function walkWire(ov) {
    var viewport = ov.querySelector('.walk-viewport');
    var start = null, wheelLock = false;
    viewport.addEventListener('pointerdown', function (e) { if (e.target.closest && e.target.closest('.context-card-grid')) { start = null; return; } start = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
    viewport.addEventListener('pointerup', function (e) {
      if (!start) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.15) SOC.walkNav(dx < 0 ? 1 : -1);
    });
    viewport.addEventListener('pointercancel', function () { start = null; });
    viewport.addEventListener('wheel', function (e) {
      if ((e.target.closest && e.target.closest('.context-card-grid')) || wheelLock || Math.abs(e.deltaX) < 28 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      wheelLock = true;
      SOC.walkNav(e.deltaX > 0 ? 1 : -1);
      setTimeout(function () { wheelLock = false; }, 480);
    }, { passive: false });
    Array.prototype.forEach.call(ov.querySelectorAll('img'), function (img) { img.addEventListener('load', walkFit); });
    _walk.resize = function () { requestAnimationFrame(walkFit); };
    window.addEventListener('resize', _walk.resize);
  }
  function walkMount(focusSlide) {
    var ov = document.getElementById('walk-overlay');
    if (!ov || !_walk) return;
    var slides = _walk.slides, i = Math.max(0, Math.min(slides.length - 1, _walk.i));
    if (!ov.querySelector('.walk-track')) {
      var dots = slides.map(function (_, k) { return '<button type="button" class="walk-dot' + (k === i ? ' on' : '') + '" onclick="SOC.walkGoto(' + k + ')" aria-label="Chapter ' + (k + 1) + ' of ' + slides.length + '"></button>'; }).join('');
      var chapters = slides.map(function (s, k) {
        return '<section class="walk-slide wkslide-' + s.kind + '" tabindex="-1" aria-label="Chapter ' + (k + 1) + ' of ' + slides.length + '" aria-hidden="' + (k === i ? 'false' : 'true') + '"><div class="walk-fit">' + walkSlideHtml(s, _walk.week) + '</div></section>';
      }).join('');
      ov.innerHTML = '<header class="walk-head"><div class="walk-brand"><b>SOC122</b> | WEEK ' + _walk.week + ' | IMMERSIVE EXPERIENCE</div><div class="walk-progress" role="progressbar" aria-label="Experience progress"><i></i></div><div class="walk-text-tools" role="group" aria-label="Experience controls"><span>Text size</span><button type="button" onclick="SOC.walkText(-1)" aria-label="Make experience text smaller">A&#8722;</button><output class="walk-text-value" aria-live="polite">100%</output><button type="button" onclick="SOC.walkText(1)" aria-label="Magnify experience text">A+</button><button type="button" class="walk-text-reset" onclick="SOC.walkText(0)" aria-label="Reset experience text size">Reset</button><button type="button" class="walk-start-again" onclick="SOC.walkRestart()" aria-label="Start this experience again" title="Start again">&#8634;</button></div><button type="button" class="walk-close" onclick="SOC.walkClose()" aria-label="Close the experience">' + ic('x', 20) + '</button></header><div class="walk-status skip" role="status" aria-live="polite" aria-atomic="true"></div>'
        + '<div class="walk-viewport"><div class="walk-track" style="--walk-index:' + i + '">' + chapters + '</div></div>'
        + '<nav class="walk-bar" aria-label="Experience chapters"><button type="button" class="walk-prev" onclick="SOC.walkNav(-1)" aria-label="Previous chapter">' + ic('chevron', 19, 2.4) + '<span>Previous</span></button><div class="walk-navmeta"><div class="walk-dots">' + dots + '</div><div class="walk-count">' + (i + 1) + ' / ' + slides.length + '</div></div><button type="button" class="walk-next" onclick="SOC.walkNav(1)" aria-label="Next chapter"><span>Next</span>' + ic('chevron', 19, 2.4) + '</button></nav>';
      walkWire(ov);
      try { initTopicModels(); } catch (e) {}
    }
    walkSync(!!focusSlide);
  }
  function walkKey(e) {
    if (!_walk) return;
    if (e.key === 'Escape') { e.preventDefault(); SOC.walkClose(); }
    else if (e.key === 'Tab') {
      var ov = document.getElementById('walk-overlay');
      if (!ov) return;
      var focusable = Array.prototype.filter.call(ov.querySelectorAll('button:not(:disabled),a[href],select:not(:disabled),textarea:not(:disabled),input:not(:disabled),[tabindex]:not([tabindex="-1"])'), function (el) {
        return el.offsetParent !== null && !el.closest('[aria-hidden="true"]');
      });
      if (!focusable.length) { e.preventDefault(); ov.focus(); return; }
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === ov)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
      var target = e.target;
      if (target && ((target.closest && target.closest('[role="tablist"]')) || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      e.preventDefault(); SOC.walkNav(e.key === 'ArrowRight' || e.key === 'PageDown' ? 1 : -1);
    }
  }
  function walkOpen(w) {
    walkCloseDom();
    var slides = walkSlides(w);
    if (!slides.length) return;
    explorationMark('screens', 'walkthroughs');
    var resume = experienceResumeFor(w) || {};
    _walk = { week: w, i: Math.max(0, Math.min(slides.length - 1, Number(resume.i) || 0)), slides: slides, fig: null, question: (slides[0] && slides[0].question) || '', returnFocus: document.activeElement };
    var ov = document.createElement('div');
    ov.id = 'walk-overlay'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Week ' + w + ' immersive experience'); ov.tabIndex = -1;
    ov.setAttribute('data-week', String(w));
    var world = walkWorld(w); if (world && world.slug) ov.setAttribute('data-world', world.slug);
    document.body.appendChild(ov);
    walkAppLock(true);
    walkMount();
    ov.focus();
    document.addEventListener('keydown', walkKey, true);
  }
  function walkCloseDom() {
    var ov = document.getElementById('walk-overlay');
    if (ov) ov.remove();
    if (_walk && _walk.resize) window.removeEventListener('resize', _walk.resize);
    document.removeEventListener('keydown', walkKey, true);
    try { sessionStorage.removeItem(WKKEY); } catch (e) {}
    walkAppLock(false);
    var target = _walk && _walk.returnFocus;
    if (!target || !target.isConnected) target = _walk ? document.querySelector('button[onclick*="playWalk(' + _walk.week + ')"]') : null;
    if (target && target.focus) setTimeout(function () { try { target.focus({ preventScroll: true }); } catch (e) { target.focus(); } }, 0);
  }
  function walkthroughsPage() {
    var ws = [];
    for (var w = 1; w <= 14; w++) { var d = weekData(w), world = walkWorld(w); if (world) ws.push({ w: w, deck: d && d.deck, world: world }); }
    var cards = ws.map(function (it) {
      return '<article class="vid-card experience-card" style="padding:0"><div style="padding:18px 20px">'
        + '<div class="mono" style="font-size:.7rem;letter-spacing:.06em;color:var(--red);font-weight:700;margin-bottom:6px">WEEK ' + it.w + '</div>'
        + '<h2 style="font-size:1.0625rem;margin:0 0 4px;color:#15171C">' + esc(weekTitle(it.w)) + '</h2>'
        + '<p style="font-size:.875rem;color:#474C57;margin:0 0 14px"><b>' + esc(it.world.room) + '.</b> ' + esc(it.world.lead) + '</p>'
        + '<div style="display:flex;gap:9px;flex-wrap:wrap">'
        + '<button type="button" class="wk-cta" style="margin:0" data-experience-week="' + it.w + '" onclick="SOC.enterExperience(' + it.w + ')">' + esc(experienceActionLabel(it.w)) + '</button>'
        + '<button type="button" onclick="SOC.station(' + it.w + ')" style="border:1px solid #DEE3EA;background:#fff;color:#15171C;border-radius:9px;font-size:.85rem;font-weight:600;padding:8px 14px;cursor:pointer">Go to Week ' + it.w + '</button>'
        + '</div></div></article>';
    }).join('');
    return '<div class="rise vid-page">'
      + '<section class="vid-hero"><div class="mono">FOURTEEN DISTINCT EXPERIENCES</div><h1>Weekly Experiences</h1><p>Every week opens a different interactive world. The navigation stays learnable; the encounter does not repeat. Enter to observe, map, audit, reconstruct, test, or assemble meaning, then return to the assigned sources. The experiences support the readings and never replace their evidence.</p></section>'
      + (cards ? '<section class="vid-grid" aria-label="Weekly experiences">' + cards + '</section>' : '<p class="vid-empty">Weekly experiences are being prepared.</p>')
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
    if (state.screen === 'contexts') return homeBar() + contextLabPage();
    if (state.screen === 'synthesis') return homeBar() + synthesisPage();
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
    var impact = '<section id="career-choices" class="career-impact" aria-label="What the program lens changes"><div><b>Primary weekly writing</b><span>Concepts, terms, cases, activities, and reflections move inside your selected program.</span></div><div><b>Forty-two connected routes</b><span>Each of 14 weeks changes again under Western social science, Two-Eyed Seeing, or Indigenous scholarship.</span></div><div><b>Same grading standard</b><span>Required sources, outcomes, assessments, deadlines, and grading remain common.</span></div></section>';
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
    var pp = programProfile();
    var pnote = pp ? ((f.lens ? f.lens + ' ' : '') + 'Your SOC122 field inquiry is located in ' + pp.setting + '. Keep these people visible: ' + pp.people + '. Start with this evidence: ' + pp.evidence + '.') : (program && (C.byProgram || {})[program]);
    var out = '<section id="career-main" class="career-field"><div class="mono">YOUR SELECTED FIELD</div><h2>' + esc(program || area) + '</h2>';
    out += card('SECTION 1', 'Program context', '<p style="margin:0 0 10px;font-size:1rem;line-height:1.65;color:var(--ink)">' + esc(pnote || ('You are looking at ' + (program || area) + ' through the larger ' + area + ' area. Use this page to connect course ideas to the people, communities, institutions, evidence, and relationships that shape everyday work in this field.')) + '</p>'
      + '<div class="career-mini-grid">'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Where to look</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.place) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">Social questions</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.decision) + '</span></div>'
      + '<div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px"><b style="display:block;font-size:.82rem;color:var(--ink);margin-bottom:4px">People in the picture</b><span style="font-size:.84rem;line-height:1.45;color:var(--ink-dim)">' + esc(ctx.people) + '</span></div></div>', '#F7F8FA');
    if (pp) {
      var evidenceMap = '<div class="career-mini-grid"><div><b>Field setting</b><span>' + esc(pp.setting) + '</span></div><div><b>People and relationships</b><span>' + esc(pp.people) + '</span></div><div><b>Evidence</b><span>' + esc(pp.evidence) + '</span></div><div><b>Decision</b><span>' + esc(pp.decision) + '</span></div><div><b>Recurring caution</b><span>' + esc(pp.tension) + '</span></div></div>';
      out += card('PROGRAM EVIDENCE MAP', 'The stable field world across all 14 weeks', evidenceMap + '<p class="program-boundary"><b>Boundary:</b> ' + esc(pp.boundary) + '</p>', '#F7F8FA');
      var route42 = [];
      for (var rw = 1; rw <= 14; rw++) {
        var rm = programWeekMove(rw);
        route42.push('<button type="button" onclick="SOC.station(' + rw + ')"><span>WEEK ' + rw + '</span><b>' + esc(rm.concept) + '</b><small>' + esc(rm.caseMove) + '</small></button>');
      }
      out += card('FOURTEEN-WEEK ROUTE', 'How SOC122 keeps changing inside ' + pp.program, '<p style="margin:0 0 12px;font-size:.95rem;line-height:1.6;color:var(--ink)">Open any week below. Inside that week, the selected learning emphasis changes the source entry point and reasoning demand again, producing 42 distinct routes for this program.</p><div class="program-route-14">' + route42.join('') + '</div>');
    }
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
    var toast = state.toast ? '<div role="status" style="position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:80;background:#15171C;color:#fff;font-size:.9375rem;font-weight:500;padding:12px 20px;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.24);display:flex;align-items:center;gap:10px"><span style="display:flex;color:#6B7280">' + ic('check', 16, 2.2) + '</span>' + esc(state.toast) + '</div>' : '';
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
    saveView();
    wkEnhanceSections();
    setTimeout(showUpcomingReminder, 80);
    navHistorySync();
    maybeSpotInvite();
    if (_walk) walkAppLock(true);
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
    contextPick: function (slot, id, w, mode) {
      slot = Math.max(0, Math.min(2, Number(slot) || 0));
      var valid = contextData().contexts || {}, slots = contextSlots();
      id = (id && valid[id]) ? id : '';
      if (id) for (var i = 0; i < 3; i++) if (i !== slot && slots[i] === id) slots[i] = '';
      slots[slot] = id;
      state.contextCompare = slots;
      state.contextWeek = cleanWeek(w) || state.contextWeek || 5;
      if (id) explorationMark('contexts', id);
      persist();
      if (mode === 'walk') {
        var shell = document.querySelector('#walk-overlay .context-compare-shell');
        if (shell) { shell.innerHTML = contextCompareInner(state.contextWeek, 'walk'); requestAnimationFrame(walkFit); }
      } else renderKeepScroll();
      announce(id ? 'Context ' + String.fromCharCode(65 + slot) + ' selected. The comparison wall has changed.' : 'Context ' + String.fromCharCode(65 + slot) + ' cleared.');
    },
    contextAdd: function (id) {
      var valid = contextData().contexts || {}, slots = contextSlots();
      if (!valid[id]) return;
      if (slots.indexOf(id) >= 0) { announce(valid[id].label + ' is already on the comparison wall.'); return; }
      var slot = slots.indexOf(''), replaced = '';
      if (slot < 0) { slot = 2; replaced = slots[slot]; }
      slots[slot] = id; state.contextCompare = slots; explorationMark('contexts', id); persist(); renderKeepScroll();
      announce(valid[id].label + ' added as Context ' + String.fromCharCode(65 + slot) + (replaced ? ', replacing the previous Context C.' : '.'));
    },
    contextSetWeek: function (w) { state.contextWeek = cleanWeek(w) || 5; persist(); renderKeepScroll(); announce('The Cultural Comparison Lab now uses Week ' + state.contextWeek + '.'); },
    contextNote: function (w, key, value) {
      var wk = 'w' + (cleanWeek(w) || 5);
      state.contextNotes = state.contextNotes || {};
      state.contextNotes[wk] = state.contextNotes[wk] || {};
      state.contextNotes[wk][key] = String(value || '').slice(0, 4000);
      persist();
    },
    contextClear: function () { state.contextCompare = ['', '', '']; persist(); renderKeepScroll(); announce('The comparison wall is clear.'); },
    synthesisPick: function (btn, idx) {
      var root = btn && btn.closest('.synthesis-world'); if (!root) return;
      idx = Number(idx) || 0;
      root.querySelectorAll('.synthesis-routes>button').forEach(function (b, i) { var on = i === idx; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
      root.querySelectorAll('[data-synthesis-panel]').forEach(function (p, i) { var on = i === idx; p.classList.toggle('on', on); p.hidden = !on; });
      var globe = root.querySelector('.synthesis-mini-globe'); if (globe) globe.style.setProperty('--synthesis-turn', (idx * -72) + 'deg');
      announce('Synthesis route changed to ' + (btn.textContent || '').replace(/^\s*\d+\s*/, '').trim() + '.');
    },
    synthesisNote: function (key, value) {
      if (['question','source','difference','responsibility'].indexOf(key) < 0) return;
      state.synthesisNotes = state.synthesisNotes || {};
      state.synthesisNotes[key] = String(value || '').slice(0, 5000);
      persist();
    },
    spotDismiss: function (threshold) {
      threshold = Number(threshold) || 0;
      state.spotState.thresholdPrompted = state.spotState.thresholdPrompted || {};
      if (threshold) state.spotState.thresholdPrompted[threshold] = { choice: 'skipped', date: new Date().toISOString() };
      var box = document.getElementById('spot-invite'); if (box) box.remove();
      persist();
      var f = spotFocus; spotFocus = null; if (f && f.focus) setTimeout(function () { try { f.focus(); } catch (e) {} }, 0);
      announce('This benchmark was skipped. It will not interrupt you again.');
    },
    spotStart: function (formId) {
      var form = spotForm(formId), questions = form && spotQuestionSet(form);
      if (!form || !questions || questions.length < form.count) { announce('This reflection room could not assemble a complete question set. Continue with the course pathway and try again later.'); return; }
      var invite = document.getElementById('spot-invite'); if (invite) invite.remove();
      state.spotState.thresholdPrompted = state.spotState.thresholdPrompted || {};
      state.spotState.thresholdPrompted[form.threshold] = { choice: 'entered', formId: form.id, date: new Date().toISOString() };
      persist();
      _spot = { form: form, questions: questions, i: 0, answers: [], confidence: [], report: null };
      var box = document.createElement('div'); box.id = 'spot-check'; box.className = 'spot-overlay'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-labelledby', 'spot-check-title');
      document.body.appendChild(box); spotRender();
      setTimeout(function () { var h = box.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus(); } }, 0);
    },
    spotAnswer: function (index) {
      if (!_spot || _spot.report) return;
      index = Number(index); var q = _spot.questions[_spot.i]; if (!q || index < 0 || index >= q.options.length) return;
      _spot.answers[_spot.i] = index; spotRender();
      setTimeout(function () { var b = document.querySelector('#spot-check .spot-option.on'); if (b) b.focus(); }, 0);
    },
    spotConfidence: function (value) {
      if (!_spot || _spot.report || ['sure','mid','guess'].indexOf(value) < 0) return;
      _spot.confidence[_spot.i] = value; spotRender();
      setTimeout(function () { var b = document.querySelector('#spot-check .spot-confidence button.on'); if (b) b.focus(); }, 0);
    },
    spotNav: function (dir) {
      if (!_spot || _spot.report) return;
      dir = Number(dir) || 0;
      if (dir < 0) _spot.i = Math.max(0, _spot.i - 1);
      else {
        if (_spot.answers[_spot.i] == null) { announce('Choose an answer before moving on.'); return; }
        if (_spot.i < _spot.questions.length - 1) _spot.i++;
        else {
          _spot.report = spotBuildReport();
          state.spotReports[_spot.form.id] = _spot.report;
          state.spotState.completedForms[_spot.form.id] = { date: _spot.report.date, pct: _spot.report.pct, threshold: _spot.form.threshold };
          _spot.questions.forEach(function (q) { state.spotState.questionSeen[q.id] = (state.spotState.questionSeen[q.id] || 0) + 1; });
          persist(); spotRender(); announce('Your private feedback report is ready.'); return;
        }
      }
      spotRender(); setTimeout(function () { var h = document.getElementById('spot-check-title'); if (h) { h.tabIndex = -1; h.focus(); } }, 0);
    },
    spotClose: function () {
      var box = document.getElementById('spot-check'); if (box) box.remove();
      _spot = null; var f = spotFocus; spotFocus = null; if (f && f.focus) setTimeout(function () { try { f.focus(); } catch (e) {} }, 0);
      announce('Returned to the classroom.'); maybeSpotInvite();
    },
    spotSaveReport: function () {
      var report = _spot && _spot.report; if (!report) { announce('Complete a reflection room before saving its report.'); return; }
      var skills = Object.keys(report.skillProfile || {});
      var skillRows = [['Practice area', 'Result', 'What this skill means', 'Rubric connection']].concat(skills.map(function (s) { var p = report.skillProfile[s], info = spotSkillInfo(s); return [s, p.right + ' of ' + p.total, info.plain, info.rubric]; }));
      var review = (report.review || []).map(function (m, i) { return (i + 1) + '. ' + m.q + '\nYour answer: ' + m.chosen + '\nBest-supported answer: ' + m.strongest + '\nResult: ' + (m.correct ? 'matched the evidence' : 'needs another look') + '\nWhy this answer is better supported: ' + m.why + '\nYour confidence: ' + m.confidence + '\nReturn to: ' + m.revisit; });
      var priorityInfo = report.priority ? spotSkillInfo(report.priority) : null;
      var sections = [
        { h: 'Evaluated practice result', t: report.correct + ' of ' + report.total + ' answers matched the best-supported response (' + report.pct + '%).\n\n' + report.band + '.\n\nThis result is worth no course marks and does not predict an assessment grade.' },
        { h: 'What this result suggests', t: report.pattern + '\n\n' + report.feedback },
        { h: 'What is beginning to hold', type: 'list', items: report.strengths.length ? report.strengths.map(function (s) { var info = spotSkillInfo(s); return s + ': ' + info.plain; }) : ['This short form did not show a stable strength yet. That does not mean you know nothing; it means there was not a reliable pattern to name.'] },
        { h: 'First priority', t: priorityInfo ? report.priority + ': ' + priorityInfo.plain + '\n\nRubric connection: ' + priorityInfo.rubric : 'No urgent repair appeared in this form. The next task is to explain the ideas without answer choices.' },
        { h: 'Your next 15 minutes', type: 'list', items: report.nextSteps || [] },
        { h: 'Move forward when', t: report.readyWhen },
        { h: 'Check your confidence', t: report.confidenceNote },
        { h: 'Your skill-by-skill picture', type: 'table', rows: skillRows },
        { h: 'Question-by-question feedback', type: 'list', items: review },
        { h: 'What this practice cannot assess', t: 'This check cannot assess ownership, positioning, specificity from your own life, growth across time, your recorded voice, or whether you genuinely build the connection among sources. Those must appear in your submitted work. The official instructions and grading remain on Blackboard.' }
      ];
      var sub = ['Private, automatically evaluated practice | Worth no course marks', 'Reflection Wing ' + report.tier + ' | ' + report.title, 'Course pathway explored at completion: ' + report.explorationProgress + '%'];
      if (state.studentName) sub.unshift('Prepared for ' + state.studentName);
      senecaDoc('SOC122', 'Reflection Wing ' + report.tier + ' Feedback Report', sub, sections, 'SOC122_Reflection_Wing_' + report.tier + '_feedback');
    },
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
      var target = cleanScreen(s); if (target !== state.screen) rememberPrevious(); markSessionExploration(); state.navOpen = false; if (target === 'library') { state.savedView = false; } if (target === 'reading') { state.rcReading = null; state.lens = 'thematic'; } if (target === 'readings') { state.galWeek = null; state.galTopic = null; } state.screen = target; explorationMark('screens', target); focusTarget = 'soc-main'; render(); topScroll(); },
    careerField: function (v) { state.careerField = v; persist(); render(); topScroll(); announce(v ? 'Program route changed.' : 'General stream selected.'); },
    learningEmphasis: function (v) { state.learningEmphasis = cleanEmphasis(v); persist(); renderKeepScroll(); announce('Learning emphasis changed to ' + emphasisOption().label + '.'); },
    lensOff: function () { state.careerField = ''; persist(); render(); },
    careerReflect: function (k, v) { state.careerReflect = state.careerReflect || {}; state.careerReflect[k] = v; persist(); },
    mediaNote: function (k, v) { state.mediaNotes = state.mediaNotes || {}; state.mediaNotes[k] = v; persist(); },
    videoWeek: function (w) { state.videoWeek = w || 'all'; render(); topScroll(); },
    mediaKind: function (k) { state.mediaKind = k || 'all'; render(); topScroll(); },
    careerLens: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-sel'); },
    careerChoices: function () { if (state.screen !== 'career') rememberPrevious(); state.screen = 'career'; focusTarget = 'soc-main'; render(); scrollToId('career-choices'); },
    station: function (w) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); markSessionExploration(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; trackVisit(w); persist(); focusTarget = 'soc-main'; render(); topScroll(); },
    jumpWeek: function (w, part) { w = cleanWeek(w) || w; if (state.screen !== 'station' || state.stationWeek !== w) rememberPrevious(); markSessionExploration(); state.navOpen = false; state.stationWeek = w; state.journeyWeek = w; state.activityReturn = null; state.screen = 'station'; trackVisit(w); persist(); focusTarget = 'soc-main'; render(); scrollWeekPart(part); },
    startActivity: function (s, w) { rememberPrevious(); state.activityReturn = cleanWeek(w) || w; state.screen = cleanScreen(s || 'activity'); explorationMark('screens', state.screen); focusTarget = 'soc-main'; render(); topScroll(); },
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
      var er = emphasisRecord(w), eo = emphasisOption();
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
        { h: 'Your learning emphasis: ' + eo.label, t: er ? er.frame + '\n\nQuestion foregrounded: ' + er.question + '\n\nBoundary: ' + er.limit : 'The common course route was used.' },
        { h: 'Before and after, your check answers', t: scoreLine + '\n\n' + checkLines },
        { h: 'The activity: ' + d.activity.title, t: (er ? 'Selected-route purpose: ' + er.activity + '\n\n' : '') + auditText },
        { h: 'Your reflection', t: (er ? 'Selected-route question: ' + er.reflection + '\n\n' : '') + ((state.wkReflect[w] || '').trim() || '(not written yet)') }
      ];
      senecaDoc((D.course && D.course.code) || '', weekTitle(w) + ' (Week ' + w + ')', ['Seneca ' + ((D.course && D.course.code) || ''), 'Your week record'], sections, ((D.course && D.course.code) || '') + '_Week' + w + '_my_work');
    },
    goWeek: function (s, w) { if (state.screen !== cleanScreen(s) || state.cardWeek !== w) rememberPrevious(); markSessionExploration(); state.cardWeek = w; state.screen = cleanScreen(s); focusTarget = 'soc-main'; render(); topScroll(); },
    galWeek: function (w) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galWeek = (state.galWeek === w) ? null : w; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galTopic: function (t) { var m = document.getElementById('soc-main'); var y = m ? m.scrollTop : 0; state.galTopic = (state.galTopic === t) ? null : t; render(); var m2 = document.getElementById('soc-main'); if (m2) m2.scrollTop = y; },
    galClear: function () { state.galWeek = null; state.galTopic = null; render(); },
    playVideo: function (el, id, title) { var box = el.closest ? el.closest('.rgvideo, .vid-frame, .wk-rec-frame, .walk-media-frame') : el.parentNode; var frameTitle = title || (el && el.getAttribute && el.getAttribute('aria-label')) || 'Scholar media'; if (box && /^[A-Za-z0-9_-]{6,20}$/.test(String(id || ''))) { box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en" referrerpolicy="strict-origin-when-cross-origin" title="' + esc(frameTitle) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>'; } },
    back: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; focusTarget = 'soc-main'; render(); var m = document.getElementById('soc-main'); if (m) m.scrollTop = state.libScroll || 0; },
    open: function (id) { rememberPrevious(); var m = document.getElementById('soc-main'); if (m) state.libScroll = m.scrollTop; state.screen = 'detail'; state.detailId = id; explorationMark('sources', id); focusTarget = 'soc-main'; render(); topScroll(); },
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
    enterExperience: function (w) { markSessionExploration(); walkOpen(cleanWeek(w) || w); },
    playWalk: function (w) { markSessionExploration(); walkOpen(cleanWeek(w) || w); },
    walkEnter: function () { if (!_walk || _walk.i !== 0 || _walk.slides.length < 2) return; _walk.i = 1; walkMount(true); },
    walkRestart: function () { if (!_walk) return; _walk.i = 0; walkSaveResume(_walk.week, 0); persist(); walkMount(true); announce('Week ' + _walk.week + ' experience restarted. Select Enter the experience to begin.'); },
    walkNav: function (dir) { if (!_walk || (_walk.i === 0 && dir > 0)) return; var n = Math.max(0, Math.min(_walk.slides.length - 1, _walk.i + dir)); if (n === _walk.i) return; _walk.i = n; walkMount(true); },
    walkGoto: function (k) { if (!_walk || (_walk.i === 0 && k !== 0)) return; _walk.i = Math.max(0, Math.min(_walk.slides.length - 1, k)); walkMount(true); },
    walkText: function (direction) {
      var levels = [100, 125, 150, 175, 200], r = rlState(), current = +r.walkText || 100;
      var index = levels.indexOf(current); if (index < 0) index = 0;
      if (direction === 0) index = 0;
      else index = Math.max(0, Math.min(levels.length - 1, index + (direction > 0 ? 1 : -1)));
      r.walkText = levels[index]; persist();
      requestAnimationFrame(function () { walkFit(); announce('Experience text size ' + r.walkText + ' percent.'); });
    },
    walkSigPick: function (btn, idx) {
      var root = btn && btn.closest('.walk-signature'); if (!root) return;
      Array.prototype.forEach.call(root.querySelectorAll('[role="tab"]'), function (tab) { var on = tab === btn; tab.classList.toggle('on', on); tab.setAttribute('aria-selected', on ? 'true' : 'false'); tab.tabIndex = on ? 0 : -1; });
      Array.prototype.forEach.call(root.querySelectorAll('[data-sig-panel]'), function (panel) { var on = +panel.getAttribute('data-sig-panel') === +idx; panel.hidden = !on; panel.classList.toggle('on', on); });
      requestAnimationFrame(walkFit);
    },
    walkSigKey: function (e, btn) {
      if (!e || !btn || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
      var list = btn.closest('[role="tablist"]'); if (!list) return;
      var tabs = Array.prototype.filter.call(list.children, function (x) { return x.getAttribute && x.getAttribute('role') === 'tab'; });
      var i = tabs.indexOf(btn), n = i;
      if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      else n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      e.preventDefault(); tabs[n].focus(); tabs[n].click();
    },
    walkSigToggle: function (btn) { if (!btn) return; var on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', on ? 'true' : 'false'); btn.classList.toggle('on', on); requestAnimationFrame(walkFit); },
    walkCollect: function (btn) {
      if (!btn) return; var root = btn.closest('.walk-collect'); if (!root) return;
      var on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', on ? 'true' : 'false'); btn.classList.toggle('on', on);
      var total = +root.getAttribute('data-collect-total') || root.querySelectorAll('.walk-collect-trays>button').length;
      var count = root.querySelectorAll('.walk-collect-trays>button[aria-pressed="true"]').length;
      var out = root.querySelector('output b'); if (out) out.textContent = count + ' of ' + total + ' fragments selected';
      requestAnimationFrame(walkFit);
    },
    walkControl: function (input) {
      var root = input && input.closest('.walk-control'); if (!root) return;
      var vals = Array.prototype.map.call(root.querySelectorAll('input[type="range"]'), function (x) { return +x.value || 0; });
      var avg = vals.reduce(function (a,b) { return a+b; }, 0) / Math.max(1, vals.length), out = root.querySelector('.walk-control-output b');
      if (out) out.textContent = avg < 34 ? 'Difference remains visible, and approval has limited material force.' : avg < 67 ? 'People begin monitoring themselves because approval now affects opportunity.' : 'The preferred norm now governs visibility and access; exclusion can look voluntary or deserved.';
    },
    walkVerdict: function (btn, verdict) {
      var card = btn && btn.closest('article'); if (!card) return;
      Array.prototype.forEach.call(card.querySelectorAll('[role="group"] button'), function (b) { b.classList.toggle('on', b === btn); b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      var out = card.querySelector('output'); if (!out) return;
      if (!out.getAttribute('data-guide')) out.setAttribute('data-guide', out.textContent || '');
      out.innerHTML = '<b>Provisional verdict: ' + esc(verdict) + '</b><span>' + esc(out.getAttribute('data-guide')) + '</span>';
      requestAnimationFrame(walkFit);
    },
    walkGlobe: function (btn, idx) { var root = btn && btn.closest('.walk-signature'); if (!root) return; SOC.walkSigPick(btn, idx); var globe = root.querySelector('.walk-globe-sphere'); if (globe) globe.style.setProperty('--globe-turn', (idx * -68) + 'deg'); },
    walkChooseQuestion: function (el) {
      var list = el && el.closest && el.closest('.walk-qlist');
      if (!list || !_walk) return;
      Array.prototype.forEach.call(list.querySelectorAll('button'), function (x) { var on = x === el; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      _walk.question = String(el.textContent || '').trim();
      Array.prototype.forEach.call(document.querySelectorAll('#walk-overlay .walk-chosen p'), function (p) { p.textContent = _walk.question; });
      announce('Question selected. It will be waiting in the final chapter.');
    },
    walkToggleNote: function (el) {
      var panel = el && el.nextElementSibling;
      if (!panel) return;
      var open = panel.hasAttribute('hidden');
      if (open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
      el.setAttribute('aria-expanded', open ? 'true' : 'false');
      el.textContent = open ? 'Close the writing space' : 'Put this idea in your words';
      requestAnimationFrame(function () { walkFit(); if (open) { var ta = panel.querySelector('textarea'); if (ta) ta.focus({ preventScroll: true }); } });
    },
    walkEye: function (el) {
      if (!el) return;
      var on = el.getAttribute('aria-pressed') !== 'true';
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.classList.toggle('on', on);
      var frame = el.closest('.walk-twoeyes');
      if (!frame) return;
      var complete = frame.querySelectorAll('.walk-eye.on').length === frame.querySelectorAll('.walk-eye').length;
      frame.classList.toggle('both-on', complete);
      var both = frame.querySelector('.walk-both');
      if (both) both.innerHTML = complete ? 'Both eyes<br>open' : 'Both<br>stay whole';
      requestAnimationFrame(walkFit);
    },
    walkAtlas: function (el, i) {
      var atlas = el && el.closest('.walk-atlas');
      if (!atlas) return;
      Array.prototype.forEach.call(atlas.querySelectorAll('.walk-atlas-nav button'), function (b, k) { var on = k === i; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
      Array.prototype.forEach.call(atlas.querySelectorAll('.walk-atlas-panel'), function (p, k) { var on = k === i; p.classList.toggle('on', on); if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', ''); });
      requestAnimationFrame(walkFit);
    },
    walkTerm: function (el) {
      if (!el) return;
      var on = el.getAttribute('aria-expanded') !== 'true';
      el.setAttribute('aria-expanded', on ? 'true' : 'false');
      el.classList.toggle('on', on);
      var cue = el.querySelector('.walk-term-cue'); if (cue) cue.textContent = on ? 'Revealed' : 'Tap to reveal';
      requestAnimationFrame(walkFit);
    },
    walkClose: function () { walkCloseDom(); _walk = null; refreshExperienceEntryLabels(); maybeSpotInvite(); },
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
      senecaDoc(cc, 'Build Your Source Comprehension', ['Source: ' + r.title + ' by ' + r.authors, 'Lens: ' + L], sections, cc + '_reading_comprehension');
    },
    saveStudio: function () {
      var cc = courseCode(), w = focusWeek(state.cardWeek), recs = recordsForWeek(w), sections = [], sub = [], sel = state.mcSel[cc + '|studio|' + w], checkQ = '';
      if (cc === 'SOC122') {
        var west = firstWhere(recs, function (r) { return r.eye === 'western'; }), ind = firstWhere(recs, function (r) { return r.eye === 'indigenous'; });
        if (!ind) { flash('Open a week first.'); return; }
        sub = ['Self-Check Studio: Two attributed eyes', 'Week ' + w];
        if (west) sections.push({ h: 'Western eye', t: west.authors + ', ' + west.title + ' (' + west.year + ')\n' + west.coreIdea });
        sections.push({ h: 'Named Indigenous source', t: ind.authors + ', ' + ind.title + ' (' + ind.year + ')\n' + ind.coreIdea });
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
      state.mapRegion = id;
      persist();
      focusTarget = 'map-detail';
      render();
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
    read: function (id) { var r = rec(id); var u = r && readUrl(r); markSessionExploration(); explorationMark('sources', id); if (u) { window.open(u, '_blank', 'noopener'); maybeSpotInvite(); } else { rememberPrevious(); state.screen = 'detail'; state.detailId = id; focusTarget = 'soc-main'; render(); topScroll(); } },
    source: function (id) { var r = rec(id); var u = r && sourceUrl(r); explorationMark('sources', id); if (u) window.open(u, '_blank', 'noopener'); },
    openSaved: function () { if (state.screen !== 'library') rememberPrevious(); state.screen = 'library'; state.activeTypes = []; state.activeWeek = null; state.search = ''; state.savedView = state.saved.length > 0; flash(state.saved.length ? 'Your saved shelf.' : 'Nothing saved yet. Tap the bookmark on any reading.'); topScroll(); },
    cardWeek: function (v) { state.cardWeek = (v === '' ? null : parseInt(v, 10)); render(); },
    glossWeek: function (v) { state.glossWeek = v; var o = document.getElementById('soc-gout'); if (o) o.innerHTML = glossaryByWeek(v); },
    glossSearch: function (v) { state.glossSearch = v; var o = document.getElementById('soc-gsearchout'); if (o) o.innerHTML = glossarySearchHTML(v); },
    glossWeekGo: function (w) { state.glossWeek = String(w); var sel = document.getElementById('soc-gweek'); if (sel) sel.value = String(w); var o = document.getElementById('soc-gout'); if (o) { o.innerHTML = glossaryByWeek(String(w)); o.scrollIntoView({ behavior: 'smooth', block: 'start' }); } },
    flip: function (el) { var c = el && (el.classList && el.classList.contains('flip') ? el : (el.closest ? el.closest('.flip') : null)); if (c) c.classList.toggle('flipped'); },
  };

  state.wkOpen = {};
  render();
  if (route0 && route0.walk) walkOpen(route0.walk);
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
  if (!(route0 && route0.walk)) try { var __wk = JSON.parse(sessionStorage.getItem(WKKEY) || 'null'); if (__wk && __wk.w) { walkOpen(cleanWeek(__wk.w) || __wk.w); if (_walk && __wk.i) { _walk.i = Math.max(0, Math.min(_walk.slides.length - 1, __wk.i)); walkMount(); } } } catch (e) {}

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
