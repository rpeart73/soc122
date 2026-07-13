/* Fourteen distinct walkthrough worlds. The interaction changes by week; the course evidence does not. */
window.SOC122_WALKTHROUGH_WORLDS = {
  1: {
    slug: 'observatory', room: 'The Social Observatory', mode: 'observatory',
    title: 'Look at an ordinary moment twice.',
    lead: 'Choose a scene. The first view describes what happened; the second reveals the history, institutions, and relationships around it.',
    items: [
      { label: 'A program choice', title: '“I chose this on my own.”', body: 'Now widen the view: family expectations, school pathways, tuition, labour markets, migration histories, and who was encouraged into which field all shape the options that felt possible.', prompt: 'Which influence is easiest to miss because it feels normal?' },
      { label: 'A late bus', title: '“One person had a bad morning.”', body: 'Widen the view again: route design, shift work, disability access, neighbourhood investment, weather, and service policy connect a private delay to a public pattern.', prompt: 'What evidence would show whether this is one event or a patterned issue?' },
      { label: 'A classroom answer', title: '“One student knew; another did not.”', body: 'Look beyond ability: language, prior schooling, confidence, belonging, technology, and whose knowledge the question rewards all enter the room.', prompt: 'What would change if the question treated more than one form of knowledge as legitimate?' }
    ],
    order: ['cover','signature','concept','context','terms','questions','sources','close']
  },
  2: {
    slug: 'threshold', room: 'The Two-Eyed Threshold', mode: 'threshold',
    title: 'Difference is the doorway, not a problem to erase.',
    lead: 'Open the three thresholds in order. Each one protects a condition of Two-Eyed Seeing before you carry the frame into the course.',
    items: [
      { label: 'Name the gift', title: 'Begin with attribution', body: 'Two-Eyed Seeing is the English phrase named and gifted by Mi\'kmaw Elder Albert Marshall. Entering responsibly begins by naming him and the Mi\'kmaw context.', prompt: 'Attribution keeps an idea connected to the person and relationships from which it comes.' },
      { label: 'Keep each eye whole', title: 'Do not turn difference into a blend', body: 'Western and Indigenous knowledge systems are not two decorative viewpoints on one default picture. Each has its own assumptions, strengths, authorities, and responsibilities.', prompt: 'The work is to hold both without making one validate or absorb the other.' },
      { label: 'Carry responsibility', title: 'Knowing changes what you owe', body: 'Marshall describes an ongoing co-learning journey, not a technique completed in one week. The frame matters when it changes how questions are asked, who has authority, and what action follows.', prompt: 'A slogan labels the work; a practice changes it.' }
    ],
    order: ['cover','idea','twoeyes','context','signature','concept','atlas','terms','questions','sources','close']
  },
  3: {
    slug: 'authority-map', room: 'The Authority Map', mode: 'map',
    title: 'Trace who can define, decide, and refuse.',
    lead: 'This is not a map of one “Indigenous Canada.” Open each node to see a different relationship of authority. First Nations, Inuit, and Métis peoples are distinct, and specific Nations and communities must be named when the evidence names them.',
    items: [
      { label: 'Knowledge', title: 'Who decides what counts as knowledge?', body: 'A curriculum can add Indigenous content while leaving the old authority structure untouched. The structural question is who chooses, frames, teaches, and evaluates the knowledge.', prompt: 'Content and authority are not the same change.' },
      { label: 'Identity', title: 'Who has the power to define belonging?', body: 'Colonial institutions have repeatedly imposed categories on Indigenous peoples. A respectful analysis distinguishes legal classification from community belonging and self-determination.', prompt: 'Never treat a state category as the whole of a person or Nation.' },
      { label: 'Sovereignty', title: 'Who can consent, govern, or refuse?', body: 'Sovereignty concerns political authority and relationship. It cannot be reduced to consultation language or a generic claim about culture.', prompt: 'Ask which people, Nation, institution, law, and decision the source actually addresses.' },
      { label: 'Structure', title: 'What changes beyond representation?', body: 'Structural change moves decision-making, accountability, resources, and the terms of participation. Representation without authority can leave the institution almost exactly as it was.', prompt: 'Look for who can alter the rule, not only who appears in the room.' }
    ],
    order: ['cover','signature','idea','media','concept','context','terms','questions','sources','close']
  },
  4: {
    slug: 'testimony-archive', room: 'The Testimony Archive', mode: 'archive',
    title: 'Truth comes before the language of repair.',
    lead: 'Open the archive drawers in any order. Each holds a different kind of evidence; none is interchangeable with the others.',
    items: [
      { label: 'Testimony', title: 'Survivor and family testimony', body: 'Testimony records lived harm, endurance, and responsibility in voices institutions once tried to silence. It is evidence with a speaker and a history, not an illustrative quotation.', prompt: 'Who is speaking, and what responsibility follows from listening?' },
      { label: 'Institution', title: 'Policy, church, school, and state records', body: 'Institutional records show how the residential-school system was authorized, funded, administered, and normalized. They document structure; they do not replace survivor knowledge.', prompt: 'Which decision-maker becomes visible in the record?' },
      { label: 'Pattern', title: 'Intergenerational and population evidence', body: 'Research can document patterned effects across generations while still refusing deterministic claims about every person, family, or community.', prompt: 'What does the pattern support, and what individual conclusion would exceed it?' },
      { label: 'Responsibility', title: 'Calls to Action and present institutions', body: 'Reconciliation is not a feeling of completion. The Calls to Action direct institutions and publics toward specific, continuing responsibilities.', prompt: 'Which present practice, rule, resource, or relationship would have to change?' }
    ],
    order: ['cover','idea','signature','concept','context','media','terms','questions','sources','close']
  },
  5: {
    slug: 'methods-lab', room: 'The Methods Lab', mode: 'lab',
    title: 'Build a claim that can survive inspection.',
    lead: 'Move through the bench. A vivid story becomes a defensible social-science claim only when its definition, sample, evidence, inference, ethics, and limits stay visible.',
    items: [
      { label: 'Define', title: 'What exactly is being measured?', body: 'Turn a broad word such as “addicted” into an operational definition. Name the observable rule rather than letting the headline do the measuring.', prompt: 'Could another researcher apply the same rule?' },
      { label: 'Sample', title: 'Who is actually in the evidence?', body: 'A detailed family experiment can reveal a great deal about that family. It cannot automatically represent every age, culture, income, disability, occupation, or reason for using a phone.', prompt: 'Match the size of the conclusion to the people studied.' },
      { label: 'Infer', title: 'Does the design support the causal language?', body: 'Observation, association, plausible mechanism, and causation are different claims. Mark the exact point where the story moves from what happened to why it happened.', prompt: 'What alternative explanation remains?' },
      { label: 'Answer', title: 'Who holds authority and who carries risk?', body: 'A method audit also asks who defines the problem, controls the data, benefits from the finding, can refuse, and has responsibility to act after knowing.', prompt: 'Good method makes power and ethics inspectable.' }
    ],
    order: ['cover','media','signature','concept','atlas','context','terms','questions','sources','close']
  },
  6: {
    slug: 'field-notebook', room: 'The Field Notebook', mode: 'notebook',
    title: 'Separate what you noticed from what you assumed.',
    lead: 'Flip each field note. The front records a quick interpretation; the reverse turns it into an evidence question that could be investigated without ranking a culture.',
    items: [
      { label: 'Meal', title: '“That way of eating is improper.”', body: 'Observation: people use different utensils, hands, seating arrangements, and sharing practices. Evidence question: what does the practice mean in this setting, and how is it learned?', prompt: 'Cultural relativism begins by describing before judging.' },
      { label: 'Silence', title: '“Nobody is participating.”', body: 'Observation: speaking time, pause, eye contact, turn-taking, and authority differ across settings. Evidence question: which participation practices are valued here, by whom, and under what conditions?', prompt: 'Do not confuse one classroom norm with human nature.' },
      { label: 'Citation', title: '“The idea belongs to everyone now.”', body: 'Observation: an Indigenous concept appears in academic writing without the people, Nation, legal order, or scholar who carried it. Evidence question: who is named, who is erased, and what accountability should citation create?', prompt: 'Todd makes attribution a relationship, not a decoration.' },
      { label: 'Boundary', title: '“A culture always does this.”', body: 'Observation: a source documents a practice in a particular place, time, group, or institution. Evidence question: what are the source boundary and the internal differences it cannot settle?', prompt: 'Culture is shared and learned, but also contested and changing.' }
    ],
    order: ['cover','signature','concept','idea','media','context','atlas','terms','questions','sources','close']
  },
  7: {
    slug: 'reconstruction-table', room: 'The Reconstruction Table', mode: 'reconstruct',
    title: 'No new material. Rebuild the first half from fragments.',
    lead: 'Choose one fragment from each tray. Your selections create a private review route; they do not generate an answer or add required work beyond the Week 7 cumulative review.',
    items: [
      { label: 'A way of seeing', title: 'Sociological imagination, ethical space, or Two-Eyed Seeing', body: 'Choose the frame whose meaning you most need to recover.', prompt: 'Return to the named source before relying on memory.' },
      { label: 'A power question', title: 'Who defines, who decides, who is represented?', body: 'Choose the authority question that still feels unsettled.', prompt: 'A good review identifies the blur instead of hiding it.' },
      { label: 'An evidence move', title: 'Define, sample, compare, limit, or attribute', body: 'Choose the move you want to practise once more.', prompt: 'Then revisit only the room that teaches that move.' },
      { label: 'A boundary', title: 'Name one comparison you must not collapse', body: 'Choose a place where two sources, peoples, methods, or purposes must stay distinct.', prompt: 'Difference is part of the evidence.' }
    ],
    order: ['cover','signature','questions','close']
  },
  8: {
    slug: 'sociology-city', room: 'The Sociology City', mode: 'city',
    title: 'Move between street level and social structure.',
    lead: 'Enter a building at street level, then pull back. Sociology begins with people but asks how institutions, categories, history, and unequal power organize what happens to them.',
    items: [
      { label: 'Family', title: 'The first lessons of belonging', body: 'Street level: people learn language, roles, identity, and expectation in relationships. Structural view: law, economy, migration, colonial categories, and public policy shape which family arrangements are supported or regulated.', prompt: 'Where does socialization become state classification?' },
      { label: 'School', title: 'Knowledge, credentials, and sorting', body: 'Street level: students meet teachers, peers, rules, and curricula. Structural view: institutions decide what counts as knowledge, whose histories enter the canon, and how credentials distribute opportunity.', prompt: 'Which rule looks neutral until its patterned effects are mapped?' },
      { label: 'Workplace', title: 'Roles, status, and organizational life', body: 'Street level: people cooperate, compete, perform roles, and read status. Structural view: labour markets, professional norms, ownership, and inequality organize the options available.', prompt: 'What seems like personality but may be a role or institutional pressure?' },
      { label: 'Registry', title: 'Categories with material consequences', body: 'Street level: a form asks a person to fit a box. Structural view: Bonita Lawrence shows how settler law used identity regulation to reshape belonging, land, and community.', prompt: 'Who created the category, and who can challenge it?' }
    ],
    order: ['cover','signature','idea','concept','context','media','atlas','terms','sources','questions','close']
  },
  9: {
    slug: 'normalization-room', room: 'The Normalization Control Room', mode: 'control',
    title: 'Adjust the system. Watch approval become access.',
    lead: 'Move the three controls. The output is a model, not a prediction: it makes visible how norms, surveillance, status, and institutions can turn symbolic approval into material advantage.',
    items: [
      { label: 'Approval pressure', title: 'How strongly must people display the preferred norm?', body: 'Low pressure leaves room for difference. High pressure turns conformity into a condition of being seen as acceptable.', prompt: 'Who defines the preferred look, behaviour, accent, or life?' },
      { label: 'Visibility', title: 'How continuously are people watched and rated?', body: 'Visibility can move discipline inside the person, so people monitor themselves and one another even when no official is present.', prompt: 'What does the rating system make people perform?' },
      { label: 'Access link', title: 'How tightly is approval tied to jobs, housing, mobility, or care?', body: 'When symbolic status controls material access, inequality becomes self-reinforcing and difficult to treat as merely personal taste.', prompt: 'Who pays the cost of falling below the threshold?' }
    ],
    order: ['cover','idea','signature','concept','context','media','terms','atlas','questions','sources','close']
  },
  10: {
    slug: 'credibility-clinic', room: 'The Credibility Clinic', mode: 'clinic',
    title: 'Watch an explanation change when context enters.',
    lead: 'Open the evidence trays one at a time. No tray diagnoses a person. Together they show why mental health cannot be understood through an isolated individual alone.',
    items: [
      { label: 'Discipline history', title: 'What did psychology make measurable?', body: 'Different Western schools made consciousness, unconscious processes, behaviour, cognition, biology, growth, and social context visible in different ways.', prompt: 'Every method reveals something and leaves something outside the room.' },
      { label: 'Stigma', title: 'When does a label alter credibility?', body: 'A mental-health history can change how urgency, emotion, testimony, and risk are interpreted before the claim itself is examined.', prompt: 'Stigma is social meaning; discrimination is the treatment that can follow.' },
      { label: 'Institution', title: 'What does the history of care preserve?', body: 'Buildings, names, unpaid patient labour, treatment models, surviving inscriptions, and redevelopment record changing authority and patient voice.', prompt: 'Whose testimony survives in the institutional record?' },
      { label: 'Structure and history', title: 'Which conditions sit around individual distress?', body: 'Income, housing, racism, colonialism, belonging, support, discrimination, and access to care belong inside the explanation, while Gone\'s account remains a specific Indigenous historical analysis on its own terms.', prompt: 'Context expands explanation; it is not a diagnosis.' }
    ],
    order: ['cover','signature','idea','concept','media','context','terms','questions','sources','close']
  },
  11: {
    slug: 'evidence-hearing', room: 'The Evidence Hearing', mode: 'hearing',
    title: 'Put the famous claim under examination.',
    lead: 'Issue a provisional evidence verdict for each claim. The point is not to replace uncertainty with a new slogan; it is to make design, researcher influence, ethics, and archive limits visible.',
    items: [
      { label: 'Claim 1', title: '“The situation alone transformed ordinary people.”', body: 'Examine role instructions, demand characteristics, participant performance, researcher authority, and selective reporting before deciding what “alone” could mean.', prompt: 'A stronger claim needs cleaner separation between situation and research script.' },
      { label: 'Claim 2', title: '“The study proves a universal truth about human nature.”', body: 'A small, selected sample in one simulated setting cannot establish a universal rule, especially when the design and public retelling are contested.', prompt: 'The reach of a claim cannot exceed the evidence that carries it.' },
      { label: 'Claim 3', title: '“Research institutions are part of the situation.”', body: 'The investigator also acted as prison superintendent; instructions, surveillance, stopping decisions, and later storytelling shaped both conduct and knowledge.', prompt: 'Here the research setting is not a neutral container.' },
      { label: 'Separate frame', title: 'Bombay and colleagues address a different history and evidence base.', body: 'Residential-school history, intergenerational effects, community context, and responsibility cannot be equated with a simulated prison study.', prompt: 'Keeping cases separate is an evidence skill, not a refusal to compare.' }
    ],
    order: ['cover','signature','idea','media','concept','context','terms','sources','questions','close']
  },
  12: {
    slug: 'kinship-house', room: 'The Kinship House', mode: 'house',
    title: 'Open rooms, not one definition of family.',
    lead: 'Each room shows a different social relation. A house is only a visual organizer: family, household, kinship, care, obligation, and belonging do not always share one address or legal form.',
    items: [
      { label: 'Household', title: 'Who shares space or resources?', body: 'A household describes living arrangements and resource sharing. It can overlap with family without being identical to it.', prompt: 'What would a household measure reveal, and miss?' },
      { label: 'Socialization', title: 'Where are roles and meanings learned?', body: 'Families are powerful agents of socialization, but they are not the only ones. School, peers, media, work, law, and community also shape the self.', prompt: 'Which lesson feels private but was socially learned?' },
      { label: 'Care network', title: 'Who does the work of relationship?', body: 'Kim Anderson centres kinship as lived responsibility, care, teaching, and relationship rather than only a fixed household structure.', prompt: 'Who does the work that a legal definition cannot see?' },
      { label: 'Change', title: 'How do family forms shift?', body: 'Definitions and arrangements vary across culture, place, law, economy, migration, gender, sexuality, generation, and time.', prompt: 'Variation is evidence against treating one form as natural or universal.' }
    ],
    order: ['cover','signature','idea','context','concept','media','terms','questions','sources','close']
  },
  13: {
    slug: 'synthesis-studio', room: 'The Synthesis Studio', mode: 'studio',
    title: 'Build a route back through the course.',
    lead: 'Choose one concept, one source responsibility, and one unresolved question. The studio creates a route, not a paragraph. Your final meaning remains yours to construct.',
    items: [
      { label: 'Concept shelf', title: 'Choose the idea doing the analytic work', body: 'Select a concept because it changes what you can see, not because it sounds important.', prompt: 'Can you define it accurately without the app?' },
      { label: 'Evidence shelf', title: 'Choose the source that can carry the claim', body: 'Name the author, purpose, evidence, and limit. Do not use one source as a generic stand-in for an entire knowledge tradition.', prompt: 'What exact claim can this source support?' },
      { label: 'Responsibility shelf', title: 'Choose the boundary you must protect', body: 'Attribute, preserve difference, state uncertainty, avoid speaking for a community, and name what remains unresolved.', prompt: 'Which responsibility changes the way you will write?' }
    ],
    order: ['cover','signature','context','terms','questions','sources','close']
  },
  14: {
    slug: 'global-atlas', room: 'The Living World Atlas', mode: 'globe',
    title: 'One world does not mean one culture or one social science.',
    lead: 'Turn the globe by choosing a route. Each route changes the question and the evidence you would need. The atlas never treats a continent, religion, race, country, Nation, or diaspora as internally uniform.',
    items: [
      { label: 'Institutions', title: 'How do rules travel?', body: 'Colonial law, markets, education, media, migration systems, health systems, and professional standards move across borders but take different forms in different places.', prompt: 'Which institution, place, time, and population does the evidence actually describe?' },
      { label: 'Culture', title: 'How is meaning learned and contested?', body: 'Culture is shared and learned, but people debate, change, refuse, and reinterpret it. Region, race, religion, language, nationality, caste, class, gender, and generation intersect without becoming synonyms.', prompt: 'What internal differences would a broad label hide?' },
      { label: 'Knowledge', title: 'Who is authorized to explain?', body: 'Western social sciences, Indigenous scholarship, and other intellectual traditions ask powerful questions from different histories and positions. Plurality requires attribution and evidence, not a catalogue of exotic differences.', prompt: 'Who speaks, from where, for what purpose, and with what accountability?' },
      { label: 'Responsibility', title: 'What follows from comparison?', body: 'A strong synthesis names what travels, what changes, what cannot be equated, and what responsibility the comparison creates for the person making it.', prompt: 'The final bridge is an argument you construct, not one the atlas supplies.' }
    ],
    order: ['cover','signature','context','concept','atlas','terms','sources','questions','close']
  }
};
