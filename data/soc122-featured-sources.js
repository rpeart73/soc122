/* SOC122 featured public sources.
   Each source enters the complete reading, media, comprehension, and
   comparison system. Official media is loaded only after the student acts. */
(function () {
  'use strict';
  var D = window.SOC122;
  if (!D || !Array.isArray(D.records)) return;
  var sources = [
    {
      id: 'cbcsmartphone2017', assigned: 'Required lesson source for Week 5', eye: 'western', type: 'Investigative video', access: 'open',
      title: 'Why you\'re addicted to your smartphone', authors: 'CBC News, Marketplace', publisher: 'CBC News', year: 2017, week: 5, primaryLabel: 'Open the captioned video',
      themes: ['methods','media','technology','research ethics'], origin: 'Canada', len: 'Video investigation', diff: 1,
      abstract: 'CBC Marketplace investigates design features intended to keep people using smartphones and follows a family that tracks its phone use. This video anchors the Week 5 lesson. Students treat it as a research-methods case rather than a diagnosis by identifying its claims, measures, sample, evidence types, causal language, ethical questions, and limits before deciding what the investigation supports.',
      coreIdea: 'A persuasive story about smartphone use becomes a defensible social-science claim only when its concepts, sample, measures, evidence, causal language, ethics, and limits are made visible.',
      url: 'https://www.youtube.com/watch?v=ZFJUYS6wY7U', fulltext: true,
      related: ['soc-research','reid2021'],
      video: {
        kind: 'Video', platform: 'youtube', source: 'CBC News', channel: 'CBC News', scholar: 'CBC Marketplace',
        title: 'Why you\'re addicted to your smartphone', yt: 'ZFJUYS6wY7U', embed: true,
        url: 'https://www.youtube.com/watch?v=ZFJUYS6wY7U',
        synopsis: 'Use this CBC Marketplace investigation as a methods lab. Do not assume that the word addicted is a clinical diagnosis. Examine how the story defines the problem, gathers evidence, and moves from observation to explanation.',
        watchFor: ['What is measured and what remains an interpretation', 'Who is included in the family experiment and what that sample cannot represent', 'Where the story uses causal language and whether the design supports it', 'What ethical and commercial interests shape the behaviour being studied'],
        readNext: 'Compare the investigation with OpenStax on reliability, validity, research design, and ethics. Then use Reid and colleagues to ask whose knowledge, responsibility, and action are centred.'
      }
    }
  ];
  var seen = {};
  D.records.forEach(function (r) { seen[r.id] = true; });
  sources.forEach(function (r) { if (!seen[r.id]) D.records.push(r); });
  window.SOC122_FEATURED_SOURCES = sources;
  window.SOC122_FEATURED_SOURCES_BY_WEEK = { 5: ['cbcsmartphone2017'] };

  var MC = window.SOC122_MC = window.SOC122_MC || {};
  MC.cbcsmartphone2017 = [
    { q: 'Why is the video treated as a methods case rather than proof that every smartphone user is addicted?', options: ['Because video cannot contain evidence', 'Because the strength of the claim depends on how addiction is defined, who is studied, what is measured, and what the design can support', 'Because family observations are always false', 'Because social scientists cannot study technology'], answer: 1, why: 'A strong conclusion must match the operational definition, sample, measures, research design, and limits of the evidence.', skill: 'methods', diff: 1 },
    { q: 'What is the clearest sampling question to ask about the family experiment?', options: ['Whether the phones were the same colour', 'Whether one family can represent the range of ages, cultures, incomes, needs, and patterns of smartphone use in a wider population', 'Whether the video has background music', 'Whether every participant used the same app'], answer: 1, why: 'A small, selected case can reveal useful detail, but it cannot automatically represent a larger population.', skill: 'evidence', diff: 1 },
    { q: 'Which statement uses the most careful causal language?', options: ['Notifications cause addiction in everyone', 'The investigation suggests that persuasive design may contribute to repeated checking, but the evidence shown does not isolate one cause for every user', 'Phone use has no causes', 'Tracking time proves a clinical diagnosis'], answer: 1, why: 'Careful causal language distinguishes an observed association or plausible mechanism from a universal causal claim.', skill: 'evaluation', diff: 2 }
  ];

  D.syntheses = D.syntheses || {};
  var curated = {
    'cbcsmartphone2017|soc-research': 'CBC Marketplace builds a persuasive investigation from interviews, demonstrations, expert explanation, and a family tracking its smartphone use. OpenStax explains the standards used to judge that investigation: operational definitions, sampling, research design, reliability, validity, causal inference, and ethics. The video supplies a concrete case; the chapter supplies the method audit. Read together, they ask students to separate what was observed from what was inferred, decide whether the word addiction was measured or used rhetorically, and match each conclusion to the evidence that can actually support it.',
    'cbcsmartphone2017|reid2021': 'CBC Marketplace asks how persuasive technology shapes behaviour and follows people through a structured investigation. Reid and colleagues argue that research also depends on whose knowledge counts, how knowledge systems meet, and what responsibility follows from knowing. The video largely uses a Western investigative frame that measures use and consults experts. Two-Eyed Seeing does not simply add another opinion; it asks whether the research question, relationships, responsibilities, and proposed action would change if communities held co-equal authority. The pairing therefore moves from how evidence was gathered to who defines the problem and what ethical action the knowledge requires.'
  };
  Object.keys(curated).forEach(function (key) { D.syntheses[key] = curated[key]; });

  function isFeatured(r) { return !!r && sources.some(function (s) { return s.id === r.id; }); }
  function claim(r) { return String(r.coreIdea || r.abstract || '').replace(/\s+/g, ' ').replace(/[.;:]?\s*$/, '.'); }
  function role(r) {
    if (isFeatured(r)) return 'a public investigative video';
    if (/report/i.test(r.type || '')) return 'a research or policy report';
    if (/book|chapter/i.test(r.type || '')) return 'a scholarly book or chapter';
    return 'a scholarly ' + String(r.type || 'reading').toLowerCase();
  }
  D.records.forEach(function (a) {
    D.records.forEach(function (b) {
      if (a.id >= b.id || (!isFeatured(a) && !isFeatured(b))) return;
      var key = [a.id, b.id].sort().join('|');
      if (D.syntheses[key]) return;
      var featured = isFeatured(a) ? a : b;
      var other = featured === a ? b : a;
      D.syntheses[key] = 'This pairing places ' + featured.title + ', ' + role(featured) + ', beside ' + other.title + ', ' + role(other) + '. The video asks students to work with this claim: ' + claim(featured) + ' The course reading asks them to work with this claim: ' + claim(other) + ' They do not offer the same kind of evidence. Use the video to identify a claim, method, example, and public frame. Use the reading to test the claim through a social-science concept, research standard, or knowledge framework. Then ask what each source can support, whose perspective and authority are present, what remains uncertain, and what further evidence would be needed.';
    });
  });
})();
