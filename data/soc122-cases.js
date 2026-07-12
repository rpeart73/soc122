/* SOC122 discipline-history and case-source layer.
   These records extend the course corpus so new cases work in Readings and Media,
   Compare Sources, Source Practice, and the weekly idea-in-view component. */
(function () {
  var D = window.SOC122;
  if (!D || !Array.isArray(D.records)) return;

  var records = [
    {
      id: 'soc-history', eye: 'western', type: 'Open textbook section', access: 'openstax',
      title: 'The History of Sociology', authors: 'OpenStax (Introduction to Sociology 3e)', year: 2021,
      themes: ['sociology'], origin: 'United States', len: 'Section', diff: 2, week: 8,
      abstract: 'OpenStax traces sociology to the social upheavals that accompanied industrialization, urbanization, political revolution, and new forms of inequality. It introduces the Western thinkers who became part of the classical canon and the different questions they asked about order, conflict, meaning, and social change.',
      coreIdea: 'Sociology emerged because rapid social change made institutions, inequality, and collective life newly visible as objects of systematic study.',
      related: ['soc-socialization', 'lawrence2003'],
      url: 'https://openstax.org/books/introduction-sociology-3e/pages/1-2-the-history-of-sociology', fulltext: true
    },
    {
      id: 'althusser1970', eye: 'western', type: 'Theory essay', access: 'open',
      title: 'Ideology and Ideological State Apparatuses', authors: 'Louis Althusser', year: 1970,
      themes: ['sociology'], origin: 'France', len: 'Essay', diff: 3, week: 9,
      abstract: 'Althusser argues that power is reproduced not only through direct force but through ordinary institutions such as schools, families, law, politics, religion, media, and culture. These institutions help people recognize themselves within social roles that can make an unequal order feel natural.',
      coreIdea: 'Ideology becomes durable when institutions call people into recognizable social roles and those roles begin to feel like common sense.',
      related: ['soc-stratification', 'tz-number12', 'blackmirror-nosedive', 'palmater'],
      url: 'https://www.marxists.org/reference/archive/althusser/1970/ideology.htm', fulltext: true
    },
    {
      id: 'tz-number12', eye: 'western', type: 'Television case', access: 'streaming',
      title: 'Number Twelve Looks Just Like You', authors: 'The Twilight Zone; teleplay by John Tomerlin; based on a story by Charles Beaumont', year: 1964,
      themes: ['sociology'], origin: 'United States', len: 'Episode', diff: 1, week: 9,
      abstract: 'In a future society, young adults are expected to undergo a procedure that makes their appearance conform to a small set of approved models. The episode turns beauty, health, happiness, and choice into social questions about normalization and institutional power.',
      coreIdea: 'Conformity can be enforced by making one approved form of identity appear healthy, happy, voluntary, and normal.',
      related: ['althusser1970', 'blackmirror-nosedive', 'soc-stratification'],
      url: 'https://tubitv.com/fr-ca/tv-shows/200261735/s05-e16-number-twelve-looks-just-like-you', fulltext: false
    },
    {
      id: 'blackmirror-nosedive', eye: 'western', type: 'Television case', access: 'streaming',
      title: 'Nosedive', authors: 'Black Mirror, story by Charlie Brooker; teleplay by Rashida Jones and Michael Schur', year: 2016,
      themes: ['sociology'], origin: 'United Kingdom and United States', len: 'Episode', diff: 1, week: 9,
      abstract: 'A woman lives in a social order where every interaction can change a public rating that affects housing, travel, service, and status. The episode turns self-presentation and peer approval into a system of stratification and discipline.',
      coreIdea: 'When social approval becomes a score tied to material opportunities, everyday interaction can reproduce hierarchy and make people police themselves.',
      related: ['althusser1970', 'tz-number12', 'soc-stratification'],
      url: 'https://www.netflix.com/title/70264888', fulltext: false
    },
    {
      id: 'psych-history', eye: 'western', type: 'Open textbook section', access: 'openstax',
      title: 'History of Psychology', authors: 'OpenStax (Psychology 2e)', year: 2020,
      themes: ['psychology'], origin: 'United States', len: 'Section', diff: 2, week: 10,
      abstract: 'OpenStax traces psychology from philosophy and physiology into laboratory study, then through major schools including structuralism, functionalism, psychoanalysis, behaviorism, humanism, cognitive psychology, and sociocultural approaches. The history shows that the discipline has repeatedly changed what it studies and what it accepts as evidence.',
      coreIdea: 'Psychology has a history: its definitions of mind, behaviour, evidence, normality, and mental health changed as its institutions and methods changed.',
      related: ['psy-intro', 'tz-nightmare20000', 'camh-queen-history', 'phac-mental-health-inequalities', 'gone2023', 'psy-social'],
      url: 'https://openstax.org/books/psychology-2e/pages/1-2-history-of-psychology', fulltext: true
    },
    {
      id: 'tz-nightmare20000', eye: 'western', type: 'Television case', access: 'streaming',
      title: 'Nightmare at 20,000 Feet', authors: 'The Twilight Zone, written by Richard Matheson', year: 1963,
      themes: ['psychology', 'mental health', 'stigma', 'media'], origin: 'United States', len: 'Episode', diff: 1, week: 10,
      abstract: 'Bob Wilson travels home after receiving institutional care following a mental-health crisis on an earlier flight. When he reports a danger that nobody else can see, his history becomes part of how other people judge his credibility. The episode can be studied as a media text about distress, belief, stigma, masculinity, care, and institutional authority, not as a clinical account of mental illness.',
      coreIdea: 'A mental-health label can change how other people interpret a person\'s words, emotions, and credibility, even when the immediate question is whether a reported danger is real.',
      related: ['psych-history', 'camh-queen-history', 'phac-mental-health-inequalities', 'gone2023'],
      url: 'https://tubitv.com/tv-shows/200261706/s05-e05-nightmare-at-20-000-feet', fulltext: false
    },
    {
      id: 'camh-queen-history', eye: 'western', type: 'Canadian institutional history', access: 'open',
      title: 'History of Queen Street Site', authors: 'Centre for Addiction and Mental Health', year: 'n.d.',
      themes: ['psychology', 'mental health', 'stigma', 'institutions', 'Canada'], origin: 'Canada', len: 'Web history', diff: 2, week: 10,
      abstract: 'CAMH traces its Queen Street site from the Provincial Lunatic Asylum, opened in 1850, through changing institutional names, treatment models, and redevelopment. The surviving heritage wall was built in part through unpaid patient labour and preserves inscriptions left by patients. The site offers a concrete Canadian history of confinement, medical authority, changing language, stigma, and patient voice.',
      coreIdea: 'Changes in names, buildings, labour, treatment, and whose testimony is preserved show that mental-health care is also a social and institutional history.',
      related: ['psych-history', 'tz-nightmare20000', 'phac-mental-health-inequalities'],
      url: 'https://www.camh.ca/en/no-one-left-behind/why-camh/building-the-mental-health-facility-of-the-future/history-of-queen-street-site', fulltext: true
    },
    {
      id: 'phac-mental-health-inequalities', eye: 'western', type: 'Canadian public-health report', access: 'open',
      title: 'Inequalities in mental health, well-being and wellness in Canada', authors: 'Public Health Agency of Canada', year: 2024,
      themes: ['psychology', 'mental health', 'stigma', 'inequality', 'intersectionality', 'Canada'], origin: 'Canada', len: 'Report highlights', diff: 2, week: 10,
      abstract: 'This national report combines quantitative trends with Canadian qualitative research. It treats mental health as shaped by socioeconomic conditions, racism and discrimination, colonialism, community belonging, support networks, and access to care. It uses intersectionality to show how these conditions overlap rather than reducing mental health to an isolated individual trait.',
      coreIdea: 'Mental health is shaped by social and structural conditions as well as individual experience, and Canadian inequalities persist where stigma, discrimination, colonialism, material insecurity, and barriers to care overlap.',
      related: ['psych-history', 'tz-nightmare20000', 'camh-queen-history', 'gone2023'],
      url: 'https://health-infobase.canada.ca/mental-health/inequalities/', fulltext: true
    },
    {
      id: 'stanford-prison-archive', eye: 'western', type: 'Research archive', access: 'open',
      title: 'Stanford Prison Experiment archive', authors: 'Stanford Prison Experiment project', year: 1971,
      themes: ['psychology'], origin: 'United States', len: 'Archive', diff: 2, week: 11,
      abstract: 'The archive presents the design, setting, roles, records, and public account of the simulated-prison study. It is useful as primary material, but its famous interpretation must be tested against the research design, researcher involvement, ethics, and later archival criticism.',
      coreIdea: 'The experiment is evidence to audit, not a settled demonstration that roles automatically overpower personality.',
      related: ['letexier2019', 'psy-social', 'bombay2014'],
      url: 'https://www.prisonexp.org/home', fulltext: false
    },
    {
      id: 'letexier2019', eye: 'western', type: 'Scholarly article', access: 'library',
      title: 'Debunking the Stanford Prison Experiment', authors: 'Thibault Le Texier', year: 2019,
      themes: ['psychology'], origin: 'France', len: 'Article', diff: 3, week: 11,
      abstract: 'Le Texier re-examines archival evidence and argues that the Stanford Prison Experiment has serious problems of scientific validity, including researcher instructions, participant role performance, selective reporting, and a public story stronger than the surviving evidence can support.',
      coreIdea: 'A famous study can become cultural common sense even when its design, conduct, and interpretation do not support the certainty with which the story is repeated.',
      related: ['stanford-prison-archive', 'psy-social'],
      url: 'https://doi.org/10.1037/amp0000401', fulltext: false
    }
  ];

  var seen = {};
  D.records.forEach(function (r) { seen[r.id] = true; });
  records.forEach(function (r) { if (!seen[r.id]) D.records.push(r); });
  var gone = D.records.filter(function (r) { return r.id === 'gone2023'; })[0];
  if (gone) gone.url = 'https://direct.mit.edu/daed/article/152/4/130/118231/Indigenous-Historical-Trauma-Alter-Native';
  function connect(id, ids) {
    var r = D.records.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    r.related = Array.isArray(r.related) ? r.related.slice() : [];
    ids.forEach(function (x) { if (r.related.indexOf(x) < 0) r.related.push(x); });
  }
  connect('soc-socialization', ['soc-history', 'lawrence2003']);
  connect('lawrence2003', ['soc-history', 'soc-socialization']);
  connect('soc-stratification', ['althusser1970', 'tz-number12', 'blackmirror-nosedive', 'palmater']);
  connect('palmater', ['soc-stratification', 'althusser1970', 'tz-number12', 'blackmirror-nosedive']);
  connect('gone2023', ['psych-history', 'tz-nightmare20000', 'camh-queen-history', 'phac-mental-health-inequalities']);
  connect('psy-social', ['stanford-prison-archive', 'letexier2019', 'bombay2014']);
  connect('bombay2014', ['psy-social', 'stanford-prison-archive', 'letexier2019']);

  window.SOC122_CASES = {
    2: {
      eyebrow: 'KNOWLEDGE HOLDER',
      title: 'Two-Eyed Seeing begins with Elder Albert Marshall',
      image: 'images/people/w02_albert_marshall_indspire.jpg', imageKind: 'real', ready: true,
      alt: 'Elder Albert Marshall sits for a formal portrait wearing a dark hat, a fur vest, and a beaded medallion.',
      credit: 'Indspire; photographer not stated on source page',
      source: 'https://indspire.ca/laureate/albert-marshall/',
      why: 'This image belongs because the central framework for the week comes from Elder Albert Marshall\'s teaching. Naming him prevents Two-Eyed Seeing from becoming a detached slogan with no knowledge holder.',
      notice: 'Notice that the course identifies who offered the framework before asking you to use it.',
      question: 'How does your responsibility change when an idea is understood as a teaching from a named knowledge holder rather than as a free-floating academic term?',
      sourceIds: ['amarshall', 'soc-intro', 'littlebear']
    },
    4: {
      eyebrow: 'INSTITUTION IN VIEW',
      title: 'A school building is not a neutral backdrop',
      image: 'images/concepts/w04_residential_school_classroom_1950.jpg', imageKind: 'archive', ready: true,
      alt: 'A black-and-white archival photograph of the classroom building at the Kamloops Indian Residential School around 1950.',
      credit: 'Library and Archives Canada, PA-207641; creator unknown; CC BY 2.0',
      source: 'https://commons.wikimedia.org/wiki/File:Kamloops_Indian_Residential_School_classroom_1950.jpg',
      why: 'The week studies reconciliation as a response to institutions, policies, records, and ongoing effects. The building makes the institutional system visible without using a person\'s pain as illustration.',
      notice: 'Look at the ordinary institutional form. Harmful systems often present themselves through familiar buildings, routines, paperwork, and professional authority.',
      question: 'What becomes visible when reconciliation is treated as structural change rather than as a feeling or ceremony?',
      sourceIds: ['smylie']
    },
    5: {
      eyebrow: 'CASE SOURCE',
      title: 'A familiar device becomes a research problem',
      image: 'images/concepts/w05_research_methods.jpg', imageKind: 'generated', ready: true,
      alt: 'A research table holds a phone, headphones, a timer, a tally sheet, blank response cards, counters, an archive photograph, a magnifier, and a small scale.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'The CBC Marketplace investigation is the lesson source. The visual keeps the research design in view: claim, sample, measure, evidence, inference, ethics, authority, and limits.',
      notice: 'Do not ask only whether the headline feels true. Ask how the claim was produced and what the evidence can support.',
      question: 'Which part of the research process most changes how much confidence you place in the conclusion?',
      sourceIds: ['cbcsmartphone2017', 'soc-research', 'reid2021']
    },
    6: {
      eyebrow: 'ANTHROPOLOGY IN VIEW',
      title: 'Culture is relationship, not a display case',
      image: 'images/concepts/w06_anthropology.jpg', imageKind: 'generated', ready: true,
      alt: 'A shared wooden table holds food, work gloves, an iron, maps, notebooks, a phone, and a jar of water beside an open doorway to the surrounding neighbourhood.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'Anthropology asks how people make meaning through learned practices and relationships. The week also asks who gets to interpret those practices and what is erased when knowledge is collected without accountability.',
      notice: 'Look for relationships among objects, place, language, work, memory, and environment rather than treating culture as a list of traits.',
      question: 'What would an outsider misread if they studied the objects but ignored the relationships that give them meaning?',
      sourceIds: ['anth-culture', 'todd2016']
    },
    8: {
      eyebrow: 'DISCIPLINE HISTORY',
      title: 'Why sociology emerged',
      image: 'images/concepts/w08_sociology_history.jpg', imageKind: 'generated', ready: true,
      alt: 'An industrial-era city scene brings factories, railways, crowded housing, civic buildings, public gathering places, and unequal streets into one view.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'Sociology emerged as industrialization, urbanization, political change, and inequality made the structure of collective life difficult to ignore. The image represents the social conditions, not a gallery of founders.',
      notice: 'Trace how work, housing, education, transportation, law, and public life shape one another.',
      question: 'Which social change in the scene would most force a new question about how society holds together or comes apart?',
      sourceIds: ['soc-history', 'soc-socialization', 'lawrence2003']
    },
    9: {
      eyebrow: 'PAST TO DIGITAL PRESENT',
      title: 'When society makes sameness feel voluntary',
      image: 'images/concepts/w09_sociology_power.jpg', imageKind: 'generated', ready: true,
      alt: 'People wait at separate service counters beneath repeated official portraits and columns of rating lights in a polished institutional lobby.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'The Twilight Zone and Black Mirror turn conformity into visible systems. Althusser helps explain how institutions, media, family, law, and culture can make a social role feel natural, while stratification shows how status is tied to material advantage.',
      notice: 'Look for who sets the standard, how people learn to monitor themselves, and what happens to anyone who refuses the approved form.',
      question: 'Where does coercion end and self-policing begin when acceptance, beauty, housing, service, and opportunity depend on conformity?',
      sourceIds: ['tz-number12', 'blackmirror-nosedive', 'althusser1970', 'soc-stratification', 'palmater']
    },
    10: {
      eyebrow: 'DISCIPLINE HISTORY + MENTAL HEALTH',
      title: 'Who is believed, and what counts as normal?',
      image: 'images/concepts/w10_psychology_history.jpg', imageKind: 'generated', ready: true,
      alt: 'A psychology observation room combines historical instruments, an empty clinical chair behind glass, an exposed institutional brick wall, modern records, and a map of Canada.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'The week links psychology\'s changing methods to the social history of mental health. Nightmare at 20,000 Feet makes credibility and stigma visible; the CAMH heritage wall makes Canadian institutional history visible; current Canadian evidence and Gone keep social, cultural, historical, and structural conditions inside the frame.',
      notice: 'No single layer explains the whole scene. Notice what is lost when the person is isolated from the label, institution, history, community, and conditions around them.',
      question: 'Who gets believed, who gets defined, and how does the explanation change when the surrounding system becomes part of the evidence?',
      sourceIds: ['psych-history', 'tz-nightmare20000', 'camh-queen-history', 'phac-mental-health-inequalities', 'gone2023']
    },
    11: {
      eyebrow: 'EVIDENCE UNDER PRESSURE',
      title: 'The experiment is also an institution',
      image: 'images/concepts/w11_stanford_prison.jpg', imageKind: 'generated', ready: true,
      alt: 'An empty institutional corridor is viewed through observation glass; numbered doors, a surveillance camera, a clock, white and black coats, controls, folders, response cards, and a clipboard frame the scene.',
      credit: 'Instructor-created conceptual image', source: '',
      why: 'The Stanford Prison Experiment is taught here as a research claim to audit. Roles, setting, authority, researcher instructions, ethics, selective reporting, and cultural retelling all shaped what the study became.',
      notice: 'The researcher, camera, rules, architecture, and public story are part of the situation, not neutral observers outside it.',
      question: 'What can the study support once researcher influence, role performance, ethics, and later archival criticism are kept visible?',
      sourceIds: ['stanford-prison-archive', 'letexier2019', 'psy-social', 'bombay2014']
    },
    12: {
      eyebrow: 'KINSHIP AS WORK',
      title: 'A home is designed through relationships and responsibilities',
      image: 'images/people/w12_alt_nokoms_house_design_workshop_guelph.jpg', imageKind: 'real', ready: true,
      alt: 'Participants gather around a circular table covered with plans, maps, photographs, and notes during a design workshop for Nokom\'s House.',
      credit: 'Photo by Wesley Chu, University of Guelph',
      source: 'https://csahs.uoguelph.ca/our-funding-priorities/nokoms-house',
      why: 'The scene represents family and kinship as structures people actively build through care, planning, labor, memory, land, and responsibility.',
      notice: 'The plans on the table are also plans for relationships. Space, care, authority, and belonging are being organized together.',
      question: 'What does this scene reveal about family that a household chart or legal definition would miss?',
      sourceIds: ['soc-family', 'anderson2019']
    },
    13: {
      eyebrow: 'CARTOGRAPHY IN PRACTICE',
      title: 'A map changes when knowledge holders can correct it',
      image: 'images/people/w13_inuit_elders_mapping_sanikiluaq.jpg', imageKind: 'real', ready: true,
      alt: 'Two Inuit Elders point to locations on a digital map during a community mapping session in Sanikiluaq, Nunavut.',
      credit: 'Google Earth Outreach; photographer not stated on source page',
      source: 'https://blog.google/intl/en-au/products/explore-get-answers/using-maps-to-preserve-indigenous/',
      why: 'The final cartography work asks who draws a map, whose categories organize it, and who has the authority to correct it. This real community session makes that authority visible.',
      notice: 'The technology is not the knowledge holder. The map becomes more accountable when community knowledge can revise it.',
      question: 'What would change in your own cartography if the people represented by a category could redraw it?',
      sourceIds: ['amarshall', 'littlebear']
    }
  };

  window.SOC122_CASE_CURRICULUM = {
    8: {
      overview: 'Before using sociology, this week locates the discipline historically. Sociology developed in Western institutions during periods of industrialization, urbanization, political revolution, and visible class conflict. Its classical canon offered powerful accounts of order, conflict, meaning, and social change, but a canon is also a selection: it reflects whose questions, institutions, and authority were recognized.',
      purpose: 'Part 1 asks how sociology learned to see society before applying socialization and identity regulation. The goal is to connect the discipline\'s history to the kinds of questions it asks, then use Bonita Lawrence to examine what a Western sociological frame can miss when settler law defines Indigenous identity.',
      outcomes: ['Explain why industrialization, urbanization, political revolution, and inequality shaped the emergence of Western sociology.', 'Distinguish the history of a discipline from a neutral list of timeless ideas, including how a canon is selected.'],
      guiding: ['What social changes made society itself seem like a problem that required systematic study?', 'Whose questions became sociology\'s classical questions, and which relationships or knowledge systems remained outside that canon?'],
      checks: [{ t: 'Why sociology emerged and how its classical Western canon was shaped', look: 'the OpenStax history section' }],
      concepts: [{ h: 'A discipline has a social history', body: 'Sociology did not appear outside society. Industrialization reorganized work, urbanization brought unfamiliar populations into dense contact, political revolutions challenged inherited authority, and widening inequality sharpened questions about order and conflict. These conditions shaped the Western discipline and the canon through which many students first meet it.', cite: 'OpenStax, 2021' }],
      readings: [{ apa: 'OpenStax. (2021). The history of sociology. In Introduction to sociology 3e. OpenStax, Rice University.', scope: 'Read the discipline-history section', id: 'soc-history' }],
      youcanMode: 'replace',
      youcan: ['You can explain why major social changes helped create Western sociology and why a canon is a selection rather than a neutral list.', 'You can connect socialization and social structure to an ordinary identity category.', 'You can explain, through Lawrence, why it matters whether a community names its own belonging or an outside authority imposes a legal category.'],
      reflectPrompt: 'Choose one familiar identity category from a public form or institution. Who wrote the category, what relationship does it assume, and what would Lawrence ask you to notice about the authority behind it?',
      activity: {
        screen: 'activity', archetype: 'assemble', title: 'Build the sociological lens',
        what: 'You assemble the historical conditions, concepts, and authority questions that make the Week 8 sociological lens work.',
        why: 'so sociology appears as a discipline with a history and a method, and so the activity can move from social change to socialization, structure, and Lawrence\'s question about who defines belonging.',
        data: {
          goal: 'Build a lens that can move from the history of sociology to one identity category without losing the institution or authority that produced it.',
          components: [
            { label: 'Industrialization, urbanization, political revolution, and inequality', role: 'The social changes that made collective life, institutions, conflict, and order newly visible as systematic problems.', cite: 'OpenStax, 2021' },
            { label: 'A selected Western canon', role: 'The recognized thinkers and questions through which the discipline was institutionalized, including the voices and relationships the canon left outside.', cite: 'OpenStax, 2021' },
            { label: 'Socialization', role: 'The lifelong process through which people learn norms, roles, categories, and a sense of self through relationships.', cite: 'OpenStax, 2021' },
            { label: 'Social structure', role: 'The patterned institutions and laws that shape options and identities before any single person makes a choice.', cite: 'OpenStax, 2021' },
            { label: 'Authority to define belonging', role: 'Lawrence shows that settler law turned Indigenous identity into a bureaucratic category controlled by the state, not by the community whose belonging was being defined.', cite: 'Lawrence, 2003' }
          ]
        }
      }
    },
    9: {
      overview: 'Part 2 moves from the history of sociology to ideology, conformity, stratification, social influence, and power. The Twilight Zone imagines a society where one approved body is called health and happiness. Black Mirror updates the problem through public ratings that turn approval into housing, service, mobility, and status. Althusser provides a theory of how institutions make social roles feel natural, while OpenStax and Palmater keep the material structure of inequality visible.',
      purpose: 'The goal is to compare a mid-century vision of enforced sameness with a digital system of self-presentation and ranking. Students ask who creates the standard, how institutions teach it, how people monitor themselves and one another, who benefits, who is excluded, and how symbolic approval becomes material power.',
      outcomes: ['Use ideology and interpellation to explain how institutions can make a social role or hierarchy feel natural.', 'Compare a 1964 conformity case with a 2016 digital-rating case and identify what changed and what remained structurally similar.'],
      guiding: ['How does each fictional society make conformity appear voluntary, healthy, attractive, or deserved?', 'How do institutions and everyday interactions turn approval into material access and exclusion?'],
      checks: [{ t: 'Ideology, ideological institutions, and interpellation as a theory of social reproduction', look: 'Althusser, 1970' }, { t: 'How Number Twelve Looks Just Like You and Nosedive connect conformity to status and power', look: 'the two media cases' }],
      concepts: [
        { h: 'Ideology works through ordinary institutions', body: 'Althusser distinguishes direct state repression from the ideological work performed across schools, families, law, politics, media, religion, and culture. These institutions help people recognize themselves within roles that can reproduce an unequal social order while appearing normal and freely chosen.', cite: 'Althusser, 1970' },
        { h: 'From standard body to public rating', body: 'Number Twelve Looks Just Like You makes conformity visible through an approved physical model. Nosedive relocates the same pressure into continuous social evaluation: people perform an acceptable self because ratings affect material opportunity. Read together, the cases show how power can move from an obvious institution into everyday interaction and self-monitoring.', cite: 'The Twilight Zone, 1964; Black Mirror, 2016' }
      ],
      readings: [
        { apa: 'Althusser, L. (1970). Ideology and ideological state apparatuses: Notes towards an investigation.', scope: 'Read the sections on institutions and interpellation', id: 'althusser1970' },
        { apa: 'The Twilight Zone. (1964). Number Twelve Looks Just Like You [Television episode]. CBS.', scope: 'View as the historical conformity case', id: 'tz-number12' },
        { apa: 'Black Mirror. (2016). Nosedive (Season 3, Episode 1) [Television episode]. Netflix.', scope: 'View as the digital-status case', id: 'blackmirror-nosedive' }
      ],
      youcanMode: 'replace',
      youcan: ['You can explain ideology, ideological institutions, and interpellation in plain language.', 'You can compare Number Twelve Looks Just Like You with Nosedive and identify how normalization, self-policing, status, and material access connect.', 'You can keep Palmater\'s Canadian legal and policy account distinct while using it to challenge explanations that blame inequality on individuals or culture.'],
      reflectPrompt: 'Choose one scene from Number Twelve Looks Just Like You or Nosedive. Who sets the standard, how do people learn to monitor themselves, what material opportunity is affected, and what would Palmater warn against blaming on the people living inside the structure?',
      activity: {
        screen: 'activity', archetype: 'match', title: 'Trace how power becomes normal',
        what: 'You match scenes and social arrangements to the sociological mechanism each one shows.',
        why: 'so conformity, ideology, interpellation, self-policing, stratification, and colonial legal structure become mechanisms you can recognize rather than abstract vocabulary.',
        data: {
          prompt: 'Match each case to the mechanism that best explains how power is working.',
          pairs: [
            { item: 'A young person is told that one of a few approved bodies will make them healthy, attractive, and happy.', match: 'Normalization', why: 'the institution presents one approved form as healthy and natural, so difference appears as a problem to be corrected', cite: 'The Twilight Zone, 1964' },
            { item: 'A public rating changes which apartment, flight, service, and social circle a person can access.', match: 'Stratification', why: 'symbolic approval becomes a hierarchy tied to unequal material opportunities', cite: 'Black Mirror, 2016; OpenStax, 2021' },
            { item: 'Schools, families, law, media, and culture repeatedly teach people the roles through which the existing order makes sense.', match: 'Ideological institutions', why: 'Althusser argues that ordinary institutions reproduce social relations by making roles and assumptions feel like common sense', cite: 'Althusser, 1970' },
            { item: 'A system calls to a person as a good citizen, good student, desirable neighbour, or acceptable user, and the person recognizes themself in the role.', match: 'Interpellation', why: 'the person is hailed into a social identity that appears personal while carrying an institutional script', cite: 'Althusser, 1970' },
            { item: 'People rehearse smiles, rate one another, and avoid honest disagreement even when no official is watching.', match: 'Self-policing', why: 'continuous peer judgment moves discipline into everyday interaction and the performance of the self', cite: 'Black Mirror, 2016' },
            { item: 'A legal and policy order produces First Nations poverty, then public discussion treats the result as an individual or cultural failure.', match: 'Colonial legal structure', why: 'Palmater locates the inequality in the laws and policies that produced it, not in the people living with the outcome', cite: 'Palmater, 2011' }
          ]
        }
      }
    },
    10: {
      overview: 'Psychology Part 1 begins with the history of the discipline and its changing definitions of mind, behaviour, evidence, normality, and mental health. The week then follows those definitions into public life. Nightmare at 20,000 Feet asks what happens to a person\'s credibility after a mental-health crisis. The history of CAMH\'s Queen Street site shows how language, buildings, labour, confinement, care, and patient voice changed in Canada. Current Canadian evidence then moves the frame beyond the isolated individual to income, racism, colonialism, belonging, discrimination, and access to care. Joseph Gone offers a distinct Indigenous account that must be read on its own terms rather than absorbed into a Western clinical model.',
      purpose: 'The goal is to understand that mental health is real, but the categories, explanations, institutions, and social responses around it have histories. Students learn what stigma is, how it differs from discrimination, how a label can alter credibility, and why social conditions belong inside a mental-health explanation. The week never asks students to diagnose themselves, diagnose another person, or disclose a personal experience.',
      careNote: 'This week discusses mental health, stigma, institutional care, colonialism, and credibility. You are not required to disclose a personal experience. Use a fictional, historical, institutional, or public-policy example. You may pause, use the written source instead of a video scene, or contact the instructor through Blackboard if you need another way to engage with the material.',
      outcomesMode: 'replace',
      outcomes: ['Trace major changes in what Western psychology studied and accepted as evidence.', 'Explain stigma as a social process and distinguish it from discriminatory treatment.', 'Analyse how a mental-health history changes Bob Wilson\'s credibility in Nightmare at 20,000 Feet without treating the episode as clinical evidence.', 'Discuss mental health through biological, psychological, social, cultural, historical, and structural contexts without diagnosing yourself, another person, or a community.'],
      guidingMode: 'replace',
      guiding: ['What did the laboratory make newly measurable, and what could not fit inside that setting?', 'In Nightmare at 20,000 Feet, when does concern for Bob become a reason not to believe him?', 'What do the CAMH heritage wall, changing institutional names, and patient inscriptions reveal about authority and patient voice in Canadian mental-health history?', 'How does a mental-health explanation change when income, racism, colonialism, community, land, and access to care are treated as causes rather than background?'],
      checksMode: 'replace',
      checks: [{ t: 'How psychology\'s major Western schools changed the discipline\'s object and methods', look: 'the OpenStax history section' }, { t: 'How stigma changes interpretation and credibility in Nightmare at 20,000 Feet', look: 'the television case' }, { t: 'How the Queen Street site records changing Canadian institutions, language, labour, care, and patient voice', look: 'the CAMH history' }, { t: 'Why current Canadian mental-health inequalities cannot be explained only at the individual level', look: 'the Public Health Agency of Canada report and the Gone reading' }],
      conceptsMode: 'replace',
      concepts: [
        { h: 'Psychology changed its object of study', body: 'Across its history, Western psychology moved among conscious experience, unconscious processes, observable behaviour, cognition, biological systems, human growth, and social context. This is not a simple march toward one final truth. Each approach created evidence by deciding what counted as a psychological question and how it could be observed.', cite: 'OpenStax, 2020' },
        { h: 'Stigma changes how a person is read', body: 'Stigma attaches a negative social meaning to a label or condition. It can make ordinary emotion look dangerous, make distress look like weakness, and make testimony seem less credible. Discrimination is the unfair treatment that can follow. In Nightmare at 20,000 Feet, Bob\'s recent crisis becomes part of how every claim he makes is interpreted, which lets the class study stigma without pretending the episode is a diagnosis.', cite: 'The Twilight Zone, 1963' },
        { h: 'Mental-health institutions have a social history', body: 'CAMH\'s Queen Street site changed from a walled asylum into a modern care and research institution. Its names, buildings, unpaid patient labour, surviving inscriptions, treatment models, and redevelopment show that care is shaped by social values and institutional power. Preserving patient testimony changes the history because people who were once spoken for can remain present in the record.', cite: 'CAMH, n.d.' },
        { h: 'Mental health is also structural and relational', body: 'Canadian public-health evidence connects mental health to material conditions, racism and discrimination, colonialism, belonging, support networks, and access to care. Gone\'s Indigenous account also resists reducing collective and postcolonial conditions to a deficit inside an individual. The two sources are not interchangeable, but both make the limits of an isolated-individual explanation visible.', cite: 'Public Health Agency of Canada, 2024; Gone, 2023' }
      ],
      termsMode: 'replace',
      terms: [
        { term: 'Mental health', def: 'a person\'s emotional, psychological, social, and relational well-being as it changes across life and conditions; it is not a synonym for a diagnosis, constant happiness, or individual strength.', cite: 'Public Health Agency of Canada, 2024' },
        { term: 'Stigma', def: 'a negative social meaning or stereotype attached to a condition, label, identity, or experience that can change how a person is judged, believed, included, or treated.', cite: 'Public Health Agency of Canada, 2024' },
        { term: 'Discrimination', def: 'unfair treatment that follows from stigma or other systems of power; unlike a private attitude, it appears in decisions, access, policies, services, housing, work, and institutions.', cite: 'Public Health Agency of Canada, 2024' },
        { term: 'Social determinants of mental health', def: 'the material, social, political, cultural, historical, and environmental conditions that support or harm mental health, including income, housing, racism, colonialism, belonging, support, and access to care.', cite: 'Public Health Agency of Canada, 2024' },
        { term: 'Patient voice', def: 'the knowledge and testimony of people who receive or survive mental-health services, treated as evidence about institutions and care rather than as a story other people may replace.', cite: 'CAMH, n.d.' }
      ],
      readingsMode: 'replace',
      readings: [
        { apa: 'OpenStax. (2020). History of psychology. In Psychology 2e. OpenStax, Rice University.', scope: 'Read the discipline-history section', id: 'psych-history' },
        { apa: 'The Twilight Zone. (1963). Nightmare at 20,000 Feet [Television episode]. CBS.', scope: 'View as a media case about credibility and stigma', id: 'tz-nightmare20000' },
        { apa: 'Centre for Addiction and Mental Health. (n.d.). History of Queen Street Site.', scope: 'Read the timeline and heritage-wall sections', id: 'camh-queen-history' },
        { apa: 'Public Health Agency of Canada. (2024). Inequalities in mental health, well-being and wellness in Canada.', scope: 'Read the highlights and social-determinants sections', id: 'phac-mental-health-inequalities' },
        { apa: 'Gone, J. P. (2023). Indigenous historical trauma: Alter-Native explanations for mental health inequities. Daedalus, 152(4).', scope: 'Read as a distinct Indigenous account', id: 'gone2023' }
      ],
      youcanMode: 'replace',
      youcan: ['You can trace how Western psychology changed what it studied and what it accepted as evidence.', 'You can distinguish mental health, stigma, and discrimination without diagnosing yourself or another person.', 'You can compare a media portrayal, a Canadian institutional history, current Canadian inequalities evidence, and a distinct Indigenous account while keeping their purposes and limits clear.'],
      reflectPrompt: 'Choose one source from this week. What does it teach you about who gets defined, who gets believed, or which conditions count as part of mental health? Name one insight and one limit of the source. You do not need to disclose a personal mental-health experience.',
      activity: {
        screen: 'activity', archetype: 'match', title: 'Read mental health in context',
        what: 'You match public examples to the source lens that makes the most important part of the case visible.',
        why: 'so psychology history, stigma, institutional history, social determinants, and an Indigenous historical account remain distinct tools rather than one blended explanation.',
        data: {
          prompt: 'Match each public example to the source lens that best helps you analyse it.',
          pairs: [
            { item: 'A laboratory studies only what can be observed or measured under controlled conditions, leaving community and history outside the room.', match: 'Discipline history', why: 'the history of psychology shows that methods shape what becomes visible as psychological evidence', cite: 'OpenStax, 2020' },
            { item: 'After a recent mental-health crisis, every urgent claim a passenger makes is interpreted through the possibility that he is unwell.', match: 'Stigma and credibility', why: 'the label changes how other people read his emotion, testimony, and reliability; the episode is a media case, not a diagnosis', cite: 'The Twilight Zone, 1963' },
            { item: 'A wall built through unpaid patient labour preserves inscriptions from people who were historically spoken for by an institution.', match: 'Institutional history and patient voice', why: 'the Queen Street site shows how buildings, labour, treatment, language, and whose testimony survives are part of mental-health history', cite: 'CAMH, n.d.' },
            { item: 'Housing insecurity, racism, discrimination, isolation, and barriers to care overlap in a national account of mental-health inequality.', match: 'Social determinants of mental health', why: 'the Canadian report treats mental health as shaped by social and structural conditions rather than only by an isolated individual', cite: 'Public Health Agency of Canada, 2024' },
            { item: 'A community explains mental-health inequities through colonization, historical violence, and disrupted relationships rather than through a deficit inside a person.', match: 'Indigenous historical account', why: 'Gone keeps postcolonial history and Indigenous explanatory authority visible on their own terms', cite: 'Gone, 2023' }
          ]
        }
      }
    },
    11: {
      overview: 'Psychology Part 2 asks how situations, roles, authority, and research institutions shape behaviour and knowledge. The Stanford Prison Experiment is a famous story about the power of the situation, but fame is not validity. Students examine the archive, the simulated prison, researcher involvement, participant role performance, ethics, selective reporting, and Thibault Le Texier\'s archival critique before deciding what the study can support.',
      purpose: 'The goal is to practise critical social psychology. Students separate the public legend from the surviving evidence and examine how an experiment can produce the behaviour it claims merely to observe. The week then keeps the wider historical and relational context visible through Bombay, Matheson, and Anisman, without treating unlike cases as equivalent.',
      careNote: 'This week includes a simulated-prison study and a reading about the intergenerational effects of Indian Residential Schools. The cases are not equivalent and are kept in separate source frames. You may work from the written archive descriptions, avoid graphic or distressing material, and use a public evidence example. No personal disclosure is required.',
      outcomesMode: 'replace',
      outcomes: ['Audit the Stanford Prison Experiment as a research design and distinguish its public story from what the evidence can support.', 'Explain how authority, roles, researcher expectations, ethics, and institutional context can shape both participant behaviour and scientific knowledge.'],
      guidingMode: 'replace',
      guiding: ['Was the mock prison a neutral situation, or did the researchers help script the roles participants performed?', 'Why did the strongest version of the Stanford story become more memorable than its methodological limits?'],
      checksMode: 'replace',
      checks: [{ t: 'The design, researcher role, ethics, and public account of the Stanford Prison Experiment', look: 'the experiment archive' }, { t: 'The main archival challenges to the experiment\'s scientific validity', look: 'Le Texier, 2019' }],
      conceptsMode: 'replace',
      concepts: [
        { h: 'A research setting can produce its own evidence', body: 'The Stanford case cannot be understood by looking only at guards and prisoners. The role instructions, architecture, surveillance, researcher authority, demand characteristics, stopping decisions, and later storytelling were also part of the situation. A study of power therefore has to examine the power held by the researchers themselves.', cite: 'Stanford Prison Experiment archive; Le Texier, 2019' },
        { h: 'A famous result is still a claim', body: 'Le Texier argues that archival records do not support the certainty with which the Stanford story has often been taught. The critical lesson is larger than one disputed study: psychology must make its methods, researcher influence, uncertainty, and ethical limits visible before a dramatic demonstration becomes a rule about human nature.', cite: 'Le Texier, 2019' }
      ],
      termsMode: 'replace',
      terms: [
        { term: 'Demand characteristics', def: 'cues in a research setting that help participants infer what behaviour is expected, which can make the study partly measure a performance of the research script rather than an automatic response to the situation.', cite: 'Le Texier, 2019' },
        { term: 'Researcher influence', def: 'the effect of researcher instructions, expectations, authority, intervention, and stopping decisions on what participants do and on what the study later presents as evidence.', cite: 'Stanford Prison Experiment archive; Le Texier, 2019' },
        { term: 'Role conflict', def: 'a conflict between responsibilities held by the same person, such as serving as both principal investigator and prison superintendent, that can weaken independent judgment and participant protection.', cite: 'Stanford Prison Experiment archive' },
        { term: 'Selective reporting', def: 'building a public account around the most dramatic records while contradictory or limiting evidence receives less attention, which can make a finding appear more certain than the archive supports.', cite: 'Le Texier, 2019' }
      ],
      readingsMode: 'replace',
      readings: [
        { apa: 'OpenStax. (2020). Social psychology. In Psychology 2e, Chapter 12. OpenStax, Rice University.', scope: 'Read the standard social-psychology account', id: 'psy-social' },
        { apa: 'Stanford Prison Experiment project. (1971). Stanford Prison Experiment archive.', scope: 'Examine as primary research material', id: 'stanford-prison-archive' },
        { apa: 'Le Texier, T. (2019). Debunking the Stanford Prison Experiment. American Psychologist, 74(7), 823-839. https://doi.org/10.1037/amp0000401', scope: 'Read the archival critique', id: 'letexier2019' },
        { apa: 'Bombay, A., Matheson, K., & Anisman, H. (2014). The intergenerational effects of Indian Residential Schools: Implications for the concept of historical trauma. Transcultural Psychiatry, 51(3), 320-338. https://doi.org/10.1177/1363461513503380', scope: 'Read in its own historical and community-specific frame', id: 'bombay2014' }
      ],
      youcanMode: 'replace',
      youcan: ['You can separate the public Stanford story from what the surviving archive can support.', 'You can explain how researcher instructions, role performance, authority, ethics, and selective reporting became part of the situation.', 'You can keep Bombay and colleagues\' historical and community-specific account separate rather than equating it with a simulated laboratory case.'],
      reflectPrompt: 'What is one careful claim the Stanford evidence can support and one stronger claim it cannot? Name the piece of the design or archive that sets the limit. Keep the Bombay reading in its own historical and evidentiary frame.',
      activity: {
        screen: 'activity', archetype: 'match', title: 'Audit the famous experiment',
        what: 'You match pieces of the Stanford case to the research problem each one creates.',
        why: 'so the study becomes an evidence claim you can audit rather than a dramatic story you are expected to repeat.',
        data: {
          prompt: 'Match each part of the case to the research issue it raises.',
          pairs: [
            { item: 'Participants receive instructions and cues about how guards and prisoners are expected to behave.', match: 'Researcher influence', why: 'the research team may help produce the behaviour the study later presents as a spontaneous effect of the situation', cite: 'Stanford Prison Experiment archive; Le Texier, 2019' },
            { item: 'Participants draw on familiar prison stereotypes and perform recognizable roles for the study.', match: 'Demand characteristics and role performance', why: 'behaviour can reflect what participants think the experiment expects, not an automatic transformation caused by the role alone', cite: 'Le Texier, 2019' },
            { item: 'The principal investigator also acts as prison superintendent inside the simulated institution.', match: 'Researcher authority and role conflict', why: 'the investigator is not outside the situation; institutional authority and research judgment become entangled', cite: 'Stanford Prison Experiment archive' },
            { item: 'Distress develops while stopping decisions remain in the hands of people invested in the demonstration.', match: 'Research ethics', why: 'participant welfare, informed consent, withdrawal, and the duty to stop are central evidence-quality and ethics questions', cite: 'Stanford Prison Experiment archive' },
            { item: 'A clean public lesson about roles overpowering personality becomes more famous than contradictory archival details.', match: 'Selective reporting and cultural retelling', why: 'a memorable story can exceed what the surviving evidence and design justify', cite: 'Le Texier, 2019' },
            { item: 'Bombay and colleagues examine residential-school history and intergenerational effects with a different population, purpose, method, and responsibility.', match: 'A separate historical evidence frame', why: 'the reading must remain historically specific and cannot be turned into a comparison with a simulated prison', cite: 'Bombay et al., 2014' }
          ]
        }
      }
    }
  };

  /* Keep the program lens aligned with the repaired discipline sequence. The
     program examples remain, but no field is allowed to skip the discipline's
     history, the power/media cases, the mental-health context, or the Stanford
     evidence audit. */
  if (window.SOC122_LENS && window.SOC122_LENS.byArea) {
    Object.keys(window.SOC122_LENS.byArea).forEach(function (area) {
      var lens = window.SOC122_LENS.byArea[area];
      lens['8'] = 'Sociology emerged to explain industrialization, urbanization, institutions, and inequality. In ' + area + ', use that history to ask how organizations, roles, and unequal access shape what now feels ordinary.';
      lens['9'] = 'Power can become normal through institutions, culture, ratings, and self-monitoring. In ' + area + ', compare Althusser, Number Twelve Looks Just Like You, and Nosedive before asking who sets the standard and who gains or loses access.';
      lens['10'] = 'Psychology\'s history shows that definitions of mind, evidence, and normality are social as well as scientific. In ' + area + ', ask who is believed, how stigma changes access, and which cultural, historical, and structural conditions sit around individual distress.';
      lens['11'] = 'The Stanford Prison Experiment is a study to audit, not a fact about human nature to memorize. In ' + area + ', examine how roles, authority, researcher influence, evidence, and ethics shape what an institution appears to prove.';
    });
  }
})();
