/*
  Three substantive routes through the same required SOC122 curriculum.
  No route removes a required source, outcome, activity, or assessment. “Indigenous
  scholarship” always means the named scholars and contexts assigned that week;
  it is never presented as one pan-Indigenous worldview.
*/
(function () {
  'use strict';
  var weeks = {};
  function add(w, western, two, indigenous) { weeks[w] = { western: western, two: two, indigenous: indigenous }; }

  add(1,
    {
      frame: 'Begin inside Western social science: everyday life becomes an object of disciplined inquiry, and Mills’ sociological imagination connects biography to history and structure. Then test the limits of that starting point by reading Ermine and Battiste as theorists with distinct accounts of engagement and learning, not as examples added to a finished discipline.',
      route: ['OpenStax: identify the social-science claim and the evidence ideal behind it.', 'Ermine: examine what a dominant claim to universal authority leaves unnamed.', 'Battiste: compare schooling with learning understood across spirit, family, community, land, and a lifetime.'],
      question: 'What does Western social science make newly visible, and which assumptions about knowledge or learning become visible only when Ermine and Battiste enter as theorists?',
      conceptMove: 'Use sociological imagination and empirical evidence first; then ask whether their rules are sufficient for an encounter between knowledge systems.',
      termMove: 'Apply “empirical evidence” precisely. Do not use it to imply that ethical space or learning spirit must be converted into Western measures before they count.',
      activity: 'Take one ordinary choice, map its social structures, and then name one assumption in that map that Ermine or Battiste would require you to examine.',
      reflection: 'Which strength of the Western inquiry route do you want to retain, and where did a named Indigenous scholar expose a boundary around it?',
      limit: 'This route centres Western disciplinary formation; it does not make Western criteria the judge of the other assigned scholarship.'
    },
    {
      frame: 'Enter through the meeting place. OpenStax offers the sociological imagination and empirical inquiry; Ermine names ethical space when worldviews meet; Battiste describes learning as a lifelong journey of the whole person. Keep the three sources attributed and let their different purposes remain visible before you decide what they can do together.',
      route: ['Name the claim and evidence rules in the OpenStax account.', 'Name Ermine’s conditions for honest engagement across worldviews.', 'Name Battiste’s account of learning in its own terms, then compare without merging.'],
      question: 'What can each source see about everyday life, knowledge, and learning that the others do not make central?',
      conceptMove: 'Hold sociological imagination, ethical space, and learning spirit as distinct tools; the comparison is the relationship among them, not a blended definition.',
      termMove: 'For each key term, name its author or disciplinary source before using it in a shared case.',
      activity: 'Read one ordinary moment three times, record what each source reveals, and leave one tension unresolved rather than forcing agreement.',
      reflection: 'Where did keeping the sources distinct produce a stronger question than choosing one source as the answer?',
      limit: 'Two-Eyed Seeing is the default course emphasis, but it cannot turn three unlike texts into equivalent knowledge systems.'
    },
    {
      frame: 'Begin with Willie Ermine’s account of ethical space and Marie Battiste’s account of the learning spirit. Treat each as specific scholarship with its own author, intellectual context, and responsibility. Bring the Western sociological imagination into relation afterwards, asking what it contributes without making it the standard against which the first two must be validated.',
      route: ['Ermine: identify the assumptions and rules needed when worldviews meet.', 'Battiste: trace learning through relationship, purpose, family, community, land, and time.', 'OpenStax: use sociological imagination as a later analytic tool and test where it fits or does not.'],
      question: 'How do Ermine and Battiste change the purpose of inquiry before the Western social-science method even begins?',
      conceptMove: 'Lead with ethical relationship and holistic learning; use sociological imagination as a contributing concept rather than the frame that contains them.',
      termMove: 'Keep “ethical space” and “learning spirit” tied to Ermine and Battiste. Do not generalize either term to every Indigenous people or knowledge tradition.',
      activity: 'Before analysing an ordinary choice, write who is in relationship, whose rules govern the encounter, and what learning or responsibility extends beyond the immediate event.',
      reflection: 'What changed when the first question concerned relationship and responsibility rather than observation and explanation?',
      limit: 'This is an Indigenous-scholarship emphasis, not a single Indigenous lens. Ermine is Cree; Battiste is Mi’kmaw; their work remains distinct.'
    });

  add(2,
    {
      frame: 'Begin by making the Western knowledge system visible rather than leaving it as the unmarked default. Little Bear identifies Eurocentric assumptions about linearity, objectivity, singularity, and stability. Marshall’s Two-Eyed Seeing then becomes a challenge to Western social science: use its strengths without letting its rules absorb the other eye.',
      route: ['Little Bear: identify the Western assumptions that often pass as neutral.', 'Marshall: read Two-Eyed Seeing in the words of the Elder who named the English phrase.', 'Return to Western method and state one strength it contributes and one condition it cannot set for the other eye.'],
      question: 'What would Western social science have to make explicit about itself before it could participate responsibly in Two-Eyed Seeing?',
      conceptMove: 'Use worldview to analyse Western social science as culturally and historically situated, not as knowledge without a location.',
      termMove: 'Do not redefine Two-Eyed Seeing as interdisciplinarity or “multiple perspectives.” Retain Marshall’s attribution, co-learning, difference, and benefit-for-all conditions.',
      activity: 'Audit one Western course concept: identify its strength, hidden assumption, evidence rule, and the point where it must stop speaking for the other eye.',
      reflection: 'Which Western strength remains useful after its assumptions are made visible, and what responsibility follows?',
      limit: 'Beginning with Western social science does not authorize it to translate, certify, or contain Indigenous knowledge.'
    },
    {
      frame: 'Enter through Elder Albert Marshall’s Two-Eyed Seeing: one eye uses the strengths of Indigenous ways of knowing, the other uses the strengths of Western ways of knowing, and both are used together for the benefit of all. Little Bear explains why this is difficult: the worldviews differ at their philosophical roots and cannot be made identical without loss.',
      route: ['Marshall: establish attribution, co-learning, two whole eyes, and responsibility.', 'Little Bear: identify root differences in time, reality, relationship, and change.', 'Practise using both without ranking, blending, or turning the phrase into a slogan.'],
      question: 'How can two knowledge systems work in relation when neither is reduced to the categories of the other?',
      conceptMove: 'Treat difference as part of the method. “Together” describes a relationship between whole eyes, not a fused answer.',
      termMove: 'Use Etuaptmumk and Two-Eyed Seeing with attribution to Marshall; use worldview and jagged worldview with attribution to Little Bear.',
      activity: 'Open each eye separately on one public question, then write the different question each eye asks before naming a possible shared responsibility.',
      reflection: 'Where were you tempted to blend, rank, or simplify, and what helped you keep both eyes whole?',
      limit: 'Two-Eyed Seeing must not be trivialized, romanticized, or claimed as a generic technique detached from Marshall and Mi’kmaw context.'
    },
    {
      frame: 'Begin with Mi’kmaw Elder Albert Marshall’s own account of Two-Eyed Seeing and with Leroy Little Bear’s Blackfoot philosophical analysis. Read each speaker as situated and specific. The course does not offer a “broader Indigenous worldview”; it asks what these named scholars teach and where their teachings cannot be generalized.',
      route: ['Marshall: identify the gift, journey, benefit-for-all purpose, and warning against co-option.', 'Little Bear: study the worldview differences he names without turning them into a universal Indigenous checklist.', 'Bring Western social science in as the second eye and specify the contribution it can make without setting the terms.'],
      question: 'What responsibilities arise when an Indigenous intellectual framework enters an institution that is accustomed to treating Western knowledge as universal?',
      conceptMove: 'Lead with attribution, relational accountability, and root difference; add Western method only after those conditions are established.',
      termMove: 'Use Nation-specific attribution and preserve the difference between Marshall’s guiding principle and Little Bear’s philosophical comparison.',
      activity: 'Write an “entry protocol” for a research or classroom encounter: who must be named, which authority is recognized, what cannot be absorbed, and who benefits.',
      reflection: 'What did the named Indigenous scholarship require before comparison could begin?',
      limit: 'Marshall and Little Bear do not speak for all First Nations, Inuit, Métis, or other Indigenous peoples; their distinct work cannot be collapsed into one holistic lens.'
    });

  add(3,
    {
      frame: 'Begin with a Western institutional question: how do universities, health systems, curricula, and states decide what counts as knowledge and who has authority? Then use Debbie Martin and Brunette-Debassige and colleagues to expose the difference between adding Indigenous content and changing the structure that governs knowledge.',
      route: ['Map the Western institution: committees, credentials, evidence rules, and decision rights.', 'Martin: examine equal consideration and the limits of positivist dismissal in health research.', 'Brunette-Debassige and colleagues: distinguish representation from Indigenous leadership and structural change.'],
      question: 'When does institutional inclusion alter authority, and when does it leave the original structure intact?',
      conceptMove: 'Use institution, authority, and sovereignty to move beyond a simple diversity count.',
      termMove: 'Do not use “Indigenizing” as a synonym for adding content. Define the structural change and identify who holds decision-making power.',
      activity: 'Audit a fictional curriculum committee: track who proposes, approves, frames, teaches, evaluates, and can refuse.',
      reflection: 'Which institutional change would redistribute authority rather than only improve representation?',
      limit: 'A Western institutional analysis can map power but cannot decide on Indigenous communities’ behalf what sovereignty or appropriate participation requires.'
    },
    {
      frame: 'Hold two questions together: what makes respectful knowledge pairing possible, and what structural authority must change for the pairing to be real? Martin addresses Two-Eyed Seeing in health research; Brunette-Debassige and colleagues address curriculum change. Their settings and claims differ even when both challenge Western monopoly over knowledge.',
      route: ['Read Martin for respectful pairing and equal consideration in a specific research context.', 'Read Brunette-Debassige and colleagues for governance, leadership, and structural curriculum change.', 'Compare the authority problem across the two settings without treating health research and curriculum as equivalent.'],
      question: 'What has to change in both relationship and structure before “including another perspective” becomes shared authority?',
      conceptMove: 'Pair respectful knowledge relation with institutional power analysis; neither one substitutes for the other.',
      termMove: 'Distinguish Two-Eyed Seeing, respectful pairing, Indigenizing, and sovereignty rather than using them as interchangeable approval words.',
      activity: 'Build a two-column authority map: conditions for respectful relation on one side, decision rights and structural changes on the other.',
      reflection: 'Where did the two readings reinforce one another, and where did their different institutional purposes have to remain separate?',
      limit: 'The shared question does not erase differences in authorship, field, method, or the people affected.'
    },
    {
      frame: 'Begin with the assigned Indigenous scholarship on research and curriculum authority. Martin asks how Two-Eyed Seeing can reshape Indigenous health research; Brunette-Debassige and colleagues distinguish adding content from redistributing curriculum authority. Read the specificity of each intervention before bringing Western institutional language into relation.',
      route: ['Martin: identify what changes when Indigenous and Western knowledge receive equal consideration in research.', 'Brunette-Debassige and colleagues: trace Indigenous leadership, governance, and structural revision.', 'Use Western institutional analysis afterwards to locate where authority currently sits and where it must move.'],
      question: 'How do named Indigenous scholars define the difference between being represented inside an institution and holding authority over its work?',
      conceptMove: 'Lead with sovereignty and Indigenous leadership; use institutional analysis to identify obstacles, not to translate those concepts into generic diversity management.',
      termMove: 'Keep each term tied to its source and context. Do not speak of one Indigenous position across health, education, Nations, and communities.',
      activity: 'Identify one institutional decision that cannot be changed by content alone, then name whose authority and consent would be required.',
      reflection: 'What did starting with Indigenous authority make visible before the institution’s own language appeared?',
      limit: 'This emphasis does not authorize the learner to design sovereignty for others or to treat all Indigenous institutions and communities as alike.'
    });

  add(4,
    {
      frame: 'Begin with Western documentary and social-science tools: testimony, administrative records, historical evidence, population measures, and institutional analysis can establish what systems did and how harms were organized. Then confront the ethical limit: those tools must not displace Survivor testimony, Indigenous authority, or community control over data and repair.',
      route: ['TRC public record: identify the residential-school system, responsible institutions, documented harms, and Calls to Action.', 'Smylie and Anderson: examine coverage, quality, jurisdiction, governance, relevance, and capacity in Indigenous health data.', 'First Nations Health Authority: distinguish cultural safety as an outcome from cultural humility as a continuing practice.'],
      question: 'How can documentary and population evidence establish institutional responsibility without turning survivors or communities into objects of study?',
      conceptMove: 'Use structure, intergenerational impact, and institutional responsibility while rejecting deterministic claims about individuals.',
      termMove: 'Keep each term with its source: reconciliation with the TRC, data governance with Smylie and Anderson, and cultural safety and humility with the First Nations Health Authority.',
      activity: 'Place one claim beside the evidence that can support it, then write the stronger claim that the evidence cannot responsibly establish.',
      reflection: 'Where did the evidence make institutional responsibility clearer, and where did responsibility require more than evidence alone?',
      limit: 'A Western evidence audit cannot determine what reconciliation means for a specific survivor, family, Nation, or community.'
    },
    {
      frame: 'Hold the TRC public record, Survivor testimony carried in that record, Smylie and Anderson’s data-governance analysis, and the First Nations Health Authority’s cultural-safety framework in accountable relation. Each source has a different author, purpose, authority, and evidence base; none can stand in for the others.',
      route: ['Read the TRC record and Calls to Action without treating testimony as illustration.', 'Map the institutions and records that established and maintained the residential-school system.', 'Read health-data governance and cultural safety through their named sources, with scope and limits visible.'],
      question: 'What does each evidence form contribute to truth, and what responsibility becomes visible only when the forms are held together?',
      conceptMove: 'Keep public record, institutional action, data governance, and cultural safety distinct before connecting them.',
      termMove: 'Use “intergenerational impact” to describe patterned pathways, not inherited deficiency or a prediction about a person.',
      activity: 'Build an evidence wall with four labels (testimony, institution, pattern, responsibility) and place each claim only where its evidence belongs.',
      reflection: 'Which evidence form changed the meaning of another without replacing it?',
      limit: 'Comparison must never equate unlike harms or turn one public account into the story of every residential-school survivor or Indigenous people.'
    },
    {
      frame: 'Begin with Survivor knowledge as carried in the TRC record, then move to named Indigenous-led or Indigenous-authored work on health information and cultural safety. The purpose is not to create a generalized Indigenous account of harm. It is to keep specific speakers, institutions, peoples, purposes, and evidence relationships present before Western categories are applied.',
      route: ['TRC record: identify the source of testimony and the responsibility of listening without speaking for Survivors.', 'Smylie and Anderson: examine coverage, identification, jurisdiction, governance, relevance, and capacity in health data.', 'First Nations Health Authority: examine power, racism, discrimination, safety as an outcome, and humility as a practice in a First Nations health context.'],
      question: 'How do survivor testimony and Indigenous scholarship change who holds authority over the public record and the work of repair?',
      conceptMove: 'Lead with truth, relationship, and authority; use institutional and population concepts later to document structures and patterns.',
      termMove: 'Keep cultural safety attached to the First Nations Health Authority framework, the person receiving care, and power in the encounter; do not turn it into a trait of every Indigenous culture.',
      activity: 'For one present institutional practice, name the historical relationship, whose evidence must guide change, and how accountability would be visible.',
      reflection: 'What responsibility emerged from beginning with speaker and relationship instead of a general category?',
      limit: 'No scholar, survivor, or community represented here speaks for all First Nations, Inuit, Métis peoples, or experiences.'
    });

  add(5,
    {
      frame: 'Enter the methods lab through Western research design. Define the claim, operationalize the idea, inspect the sample, separate qualitative and quantitative evidence, test reliability and validity, examine causal language, and place ethics inside the design. Reid and colleagues then extend the audit to knowledge authority and action.',
      route: ['CBC case: identify the headline, observed behaviour, experts, and inference.', 'OpenStax: audit definition, design, sample, reliability, validity, causation, and ethics.', 'Reid and colleagues: ask whose knowledge governs the question and what responsibility follows.'],
      question: 'What can the investigation support under Western methods standards, and what remains missing when authority and responsibility are treated only as research-ethics add-ons?',
      conceptMove: 'Lead with method and inference; then widen method to include power over the question, data, interpretation, and action.',
      termMove: 'Apply operational definition, sample, generalization, and causal inference to exact moments in the video rather than repeating definitions.',
      activity: 'Write three claims (shows, suggests, does not establish) and attach the design reason to each.',
      reflection: 'Which methods rule most improved the claim, and which authority question remained after the rule was applied?',
      limit: 'A rigorous Western design can still be governed by unequal research relationships.'
    },
    {
      frame: 'Use the CBC investigation as a shared case. The Western methods eye audits definition, sample, measurement, inference, reliability, validity, and ethics. Reid and colleagues use Two-Eyed Seeing to ask who defines the problem, how knowledge systems coexist, who governs the work, and what action knowledge requires.',
      route: ['Observe the public case without accepting its headline as a finding.', 'Run the Western methods audit and state the evidence boundary.', 'Run the Two-Eyed Seeing authority and action audit without merging it into the methods checklist.'],
      question: 'How do evidence quality and knowledge authority change different parts of the same research claim?',
      conceptMove: 'Keep methodological validity and relational accountability as distinct tests that can both alter the conclusion.',
      termMove: 'Use Reid’s “action imperative” with attribution; it is not a synonym for adding a recommendations paragraph.',
      activity: 'Build a claim with two inspection reports: one for method and one for authority, relationship, and responsibility.',
      reflection: 'What did one audit reveal that the other was not designed to answer?',
      limit: 'The CBC family case, OpenStax chapter, and fisheries research cases have different populations, purposes, and evidence.'
    },
    {
      frame: 'Begin with Andrea Reid (Nisga’a) and colleagues’ account of Two-Eyed Seeing in fisheries research and management. Their concern is not adding Indigenous knowledge to a Western project; it is coexistence between knowledge systems, transformed research relationships, and an action imperative. Then use the Western methods audit as a contributing quality check.',
      route: ['Reid and colleagues: identify knowledge coexistence, complementarity, authority, and action.', 'CBC case: ask who defined harmful phone use, controlled the evidence, and benefited from the story.', 'OpenStax: test definitions, sample, measures, and inference without letting that checklist settle authority.'],
      question: 'How would the research question and governance change if the people being studied held co-equal authority from the beginning?',
      conceptMove: 'Lead with relationship and governance; bring reliability, validity, and causal inference in as necessary but not sufficient tests.',
      termMove: 'Keep Reid’s fisheries cases and Nisga’a authorship visible; do not generalize the action imperative into a universal Indigenous research formula.',
      activity: 'Redesign one stage of the investigation (question, recruitment, data control, interpretation, or action) so authority changes rather than only participation.',
      reflection: 'Which design choice changed when the first concern was who governs knowledge?',
      limit: 'Students are not asked to invent what an Indigenous community would want; the redesign must state where community authority and consent are required.'
    });

  add(6,
    {
      frame: 'Begin with Western anthropology’s culture concept, cultural relativism, ethnocentrism, holism, and ethnographic attention. Use these as disciplined ways to describe learned and shared meaning. Todd then turns the anthropological lens on the academy and exposes how a field can study difference while appropriating Indigenous thought and erasing its sources.',
      route: ['OpenStax: define culture and the descriptive discipline of cultural relativism.', 'Test an everyday interpretation for ethnocentric assumptions.', 'Todd: audit citation, extraction, academic authority, and the erasure of Indigenous thinkers.'],
      question: 'How can anthropology’s strength in describing cultural difference coexist with a history of taking ideas without accountable relation?',
      conceptMove: 'Use culture and relativism first, then apply them reflexively to anthropology as an institution.',
      termMove: 'Cultural relativism means understand in context before evaluating; it does not mean every practice is beyond ethical analysis.',
      activity: 'Turn one judgment into an observation and evidence question, then audit whose concepts and citations the question relies on.',
      reflection: 'What did anthropology help you describe, and what did Todd require anthropology to admit about itself?',
      limit: 'The Western culture concept cannot turn a named people, Nation, religion, region, or race into a uniform cultural type.'
    },
    {
      frame: 'Hold the OpenStax culture concept beside Zoe Todd’s Red River Métis critique of academic appropriation. One teaches a disciplined effort to understand human difference without ranking it; the other asks whether the discipline credits and remains accountable to the people whose ideas it uses.',
      route: ['Describe the practice or claim in context before judging it.', 'Identify internal variation, history, power, and the evidence boundary.', 'Audit citation and accountability: who is named, who is erased, and who has authority over the knowledge?'],
      question: 'What makes cross-cultural understanding respectful when observation, interpretation, and academic credit all carry power?',
      conceptMove: 'Pair cultural relativism with citational accountability without reducing either one to politeness.',
      termMove: 'Distinguish culture from race, religion, region, Nation, and country; distinguish citation from mere name-dropping.',
      activity: 'Work one case twice: first as an ethnographic description, then as an accountability audit of sources and relationships.',
      reflection: 'Where did the accountability audit change what appeared to be a neutral description?',
      limit: 'Comparison can identify patterned difference but cannot infer a whole culture from one source, event, or person.'
    },
    {
      frame: 'Begin with Zoe Todd’s Red River Métis critique: academic fields can celebrate concepts that echo Indigenous thought while leaving Indigenous people, legal orders, and scholars outside the citation and the room. Then bring the Western culture concept and cultural relativism into relation as tools that may support careful description when used accountably.',
      route: ['Todd: trace the movement of an idea and the people erased from its academic retelling.', 'Name the specific thinker, people, concept, and relationship the source actually documents.', 'Use cultural relativism to understand context without treating Western anthropology as the owner of the insight.'],
      question: 'How does accountable attribution change not only the bibliography but the meaning, authority, and use of an idea?',
      conceptMove: 'Lead with citation as relationship and responsibility; use culture and relativism to deepen, not contain, that analysis.',
      termMove: 'Keep Todd’s example of Inuit concepts such as Sila specific; do not turn it into a generic statement about all Indigenous land knowledge.',
      activity: 'Create a provenance trail for one idea: who carried it, where it was learned, how it was repackaged, and what accountable use would require.',
      reflection: 'What became visible when the people behind the concept stayed present throughout the analysis?',
      limit: 'This emphasis does not grant permission to use a cultural concept; it helps the learner recognize when authority, consent, collaboration, or stepping back is required.'
    });

  add(7,
    {
      frame: 'Use the Week 7 cumulative review before Study Week to audit the Western social-science tools from Weeks 1 to 6: sociological imagination, evidence, method, culture, and institutional analysis. No new content is introduced. The purpose is to identify which definition or inference rule is secure and which still needs the source.',
      route: ['Choose one Western concept you can define without notes.', 'Choose one evidence or inference move you still confuse.', 'Return only to the exact source room that repairs the distinction.'],
      question: 'Which Western analytic move is genuinely usable, and which is only familiar-sounding?',
      conceptMove: 'Practise retrieval and application, not rereading everything.',
      termMove: 'Test whether you can distinguish pairs such as reliability/validity and relativism/ethnocentrism.',
      activity: 'Build a three-stop review route: concept, evidence move, boundary.',
      reflection: 'What exact distinction improved after one targeted return?',
      limit: 'Week 7 remains a live cumulative-review class, not a hidden new module. No new reading or graded deadline is added.'
    },
    {
      frame: 'Reconstruct the first half by pairing one Western course concept with one named Indigenous scholar’s contribution, then naming the difference that must remain. Nothing new is assigned; the work is to see whether you can hold relation and distinction without the app doing it for you.',
      route: ['Retrieve one source accurately from each side of a prior week.', 'State what each contributed to the shared question.', 'Name the non-equivalence and one responsibility that follows.'],
      question: 'Can you reconstruct a comparison without turning two sources into the same argument?',
      conceptMove: 'Use the comparison contract: claim, evidence, source, limit, relationship.',
      termMove: 'Attribute every source-specific term before using it in a pair.',
      activity: 'Select one prior pairing and rebuild its evidence trail from memory, then verify against the sources.',
      reflection: 'Which part of the pairing did memory flatten, and how did the source restore it?',
      limit: 'Review does not create permission to generalize from one scholar to an entire knowledge tradition.'
    },
    {
      frame: 'Return to the named Indigenous scholars from Weeks 1 to 6 and check whether each remains distinct in your memory: Ermine, Battiste, Marshall, Little Bear, Martin, Brunette-Debassige and colleagues, the Week 4 sources, Reid and colleagues, and Todd. No one is a generic Indigenous voice.',
      route: ['Choose one scholar and state the exact problem their source addresses.', 'Name their specific concept or intervention and its context.', 'Then identify what the Western course source adds without making it the validating authority.'],
      question: 'Which named contribution have you been tempted to flatten into a general “Indigenous perspective”?',
      conceptMove: 'Review by author, context, claim, evidence, and responsibility.',
      termMove: 'Remove any nationless or authorless use of a source-specific concept from your notes.',
      activity: 'Build an attribution repair list: scholar, specific contribution, context, and one claim you must not make.',
      reflection: 'What changed when you restored the author and context to an idea you had remembered too generally?',
      limit: 'This review route is about accurate scholarship, not mastering or speaking for Indigenous knowledge.'
    });

  add(8,
    {
      frame: 'Begin with Western sociology’s history and its account of socialization, social structure, institutions, and the sociological imagination. Then use Bonita Lawrence’s analysis of settler identity regulation to examine a place where a general sociological account of categories becomes materially tied to colonial law, land, and belonging.',
      route: ['OpenStax: trace sociology’s formation and define socialization and social structure.', 'Apply the sociological imagination to a category that appears personal or natural.', 'Lawrence: examine how the Indian Act regulated Native identity and why the state’s category cannot be treated as neutral.'],
      question: 'How do institutions make categories feel natural, and what becomes visible when a colonial legal order controls the category?',
      conceptMove: 'Move from learned roles and structures to the specific power to define legal identity.',
      termMove: 'Distinguish social status from Indian Act status; the shared word does not make the concepts equivalent.',
      activity: 'Trace a category from everyday interaction to institutional record to material consequence.',
      reflection: 'Where did the general sociology explain the mechanism, and where did Lawrence’s specific history change the meaning?',
      limit: 'A general theory of socialization cannot substitute for Lawrence’s historical and political analysis.'
    },
    {
      frame: 'Hold Western sociology’s account of socialization and structure beside Bonita Lawrence’s Mi’kmaw analysis of Native identity regulation. The sociology source explains how selves and norms are formed through relationships and institutions; Lawrence shows a specific colonial institution exercising the power to define identity, land relation, and belonging.',
      route: ['Name the general socialization mechanism and the structures that carry it.', 'Read Lawrence’s historical account on its own terms and identify the legal power involved.', 'Compare what each source reveals about categories without treating a general mechanism and a colonial history as interchangeable.'],
      question: 'What happens when the institution socializing people also holds legal power to define who they are?',
      conceptMove: 'Use socialization to see formation and Lawrence to see imposed classification and colonial authority.',
      termMove: 'Attribute “regulation of Native identity” to Lawrence’s analysis and keep “socialization” within its sociological definition.',
      activity: 'Build a category pathway: lesson, form, law, institution, consequence, and resistance.',
      reflection: 'Which part of the pathway did one source make visible that the other did not centre?',
      limit: 'The comparison cannot turn Native identity into merely another example of socialization.'
    },
    {
      frame: 'Begin with Bonita Lawrence’s Mi’kmaw scholarship on the regulation of Native identity. Her analysis concerns settler law’s power over belonging, land, and identity; it is not a generic claim about all categories. Bring Western sociology’s socialization and structure concepts in afterwards to trace how legal classifications become normalized in institutions and everyday life.',
      route: ['Lawrence: identify who defines, through which law, with what material consequences.', 'Name community belonging and self-understanding that exceed the state’s category.', 'Use socialization and structure to trace how the imposed classification travels and appears normal.'],
      question: 'How does starting with colonial legal authority change a sociological account that might otherwise describe categories too abstractly?',
      conceptMove: 'Lead with regulation, land, belonging, and settler authority; use sociological mechanisms as supporting explanation.',
      termMove: 'Do not generalize Lawrence’s account to every First Nation, Inuit, or Métis identity regime without evidence.',
      activity: 'Audit one official category: origin, authority, affected people, material consequence, and route for community refusal or self-definition.',
      reflection: 'What did the legal and land relationship make impossible to treat as a neutral social label?',
      limit: 'The learner cannot decide who belongs to an Indigenous Nation or community; the analysis identifies settler power and its limits.'
    });

  add(9,
    {
      frame: 'Begin with Western sociology’s account of social stratification, ascribed status, class, ideology, normalization, and institutional power. Use Althusser and the fictional media cases to see how standards become desirable and self-policed. Then read Pamela Palmater’s legal and political account of First Nations poverty as a specific structure produced by colonial policy.',
      route: ['OpenStax and Althusser: map rank, institutions, ideology, and reproduction.', 'Number Twelve Looks Just Like You and Nosedive: inspect conformity, rating, and access as fictional cases.', 'Palmater: identify the laws, fiscal relationships, and political choices producing First Nations poverty.'],
      question: 'How do institutions make inequality appear normal or deserved, and what changes when the causal structure is colonial law and policy?',
      conceptMove: 'Use stratification and ideology to see the mechanism; use Palmater to specify the legal-political production of inequality.',
      termMove: 'Do not use “engineered poverty” as a metaphor for every inequality; keep it tied to Palmater’s First Nations analysis.',
      activity: 'Trace a status signal from norm to rating to institutional decision to material access.',
      reflection: 'Where did a general theory explain reproduction, and where did the specific legal history prevent an abstract answer?',
      limit: 'Fictional rating systems and First Nations poverty are not equivalent cases.'
    },
    {
      frame: 'Compare four different evidence purposes: OpenStax maps stratification, Althusser theorizes ideological institutions, two fictional worlds dramatize normalization, and Pamela Palmater gives a specific Mi’kmaw legal-political analysis of First Nations poverty. The comparison concerns power; the cases must not collapse.',
      route: ['Identify the general theory of rank and institutional reproduction.', 'Use fiction to test how approval, self-monitoring, and access can become linked.', 'Read Palmater for the laws, responsibilities, and political choices that produce a specific inequality.'],
      question: 'What does each source allow you to claim about power, and where does its evidence purpose set a boundary?',
      conceptMove: 'Hold theory, fiction, textbook pattern, and legal-political scholarship as different evidence forms.',
      termMove: 'Distinguish ideology, normalization, social stratification, engineered poverty, and colonial legal order.',
      activity: 'Assign each claim to the source capable of carrying it, then mark one tempting but invalid cross-case inference.',
      reflection: 'Which source relationship sharpened the analysis without making the cases equivalent?',
      limit: 'Palmater’s First Nations account must not be reduced to an illustration of a Western theory or a fictional rating story.'
    },
    {
      frame: 'Begin with Pamela Palmater’s Mi’kmaw analysis of First Nations poverty as produced through colonial law, policy, fiscal failure, and continuing political choices. This is not evidence of cultural deficiency and not a general statement about every Indigenous people. Bring Western stratification and ideology concepts in later to explain how structured advantage is reproduced and normalized.',
      route: ['Palmater: identify the responsible laws, institutions, fiscal relationships, and consequences.', 'Reject deficit explanations and distinguish First Nations from Inuit and Métis contexts not studied here.', 'Use stratification and ideology to map how the structure persists and appears ordinary.'],
      question: 'What becomes visible when inequality is first explained through colonial legal responsibility rather than through individual merit or cultural traits?',
      conceptMove: 'Lead with engineered conditions and political responsibility; use Western theory to trace reproduction, not to absorb the account.',
      termMove: 'Keep First Nations, Indigenous, race, class, and culture analytically distinct.',
      activity: 'Rewrite one deficit claim as a causal institutional map with named decision-makers and evidence limits.',
      reflection: 'Which institution or responsibility disappeared when the problem was framed as a trait?',
      limit: 'The assigned source does not authorize claims about every First Nation or about Inuit and Métis peoples.'
    });

  add(10,
    {
      frame: 'Begin with the Western history of psychology and its changing objects of study: consciousness, unconscious processes, behaviour, cognition, biology, growth, and social context. Use the media and CAMH history to examine stigma, credibility, institutional care, and patient voice. Then read Joseph Gone’s Aaniiih account as a distinct challenge to individual-deficit explanations.',
      route: ['OpenStax: trace how Western psychology changed its questions and evidence.', 'Nightmare at 20,000 Feet, CAMH, and PHAC: map stigma, credibility, institutional history, and social determinants.', 'Gone: read Indigenous historical trauma and alternatives on their own terms.'],
      question: 'What does Western psychology explain well, and what changes when colonial history, community, relationship, and Indigenous explanatory authority enter the frame?',
      conceptMove: 'Use discipline history to make categories visible; add stigma and social determinants before reading Gone as a separate account.',
      termMove: 'Distinguish mental health, diagnosis, stigma, discrimination, social determinant, and historical trauma.',
      activity: 'Match a public case to the evidence frame that can responsibly analyse it, then name what that frame cannot diagnose or prove.',
      reflection: 'Which historical shift in psychology expanded explanation, and what boundary remained until Gone’s account was read?',
      limit: 'The week does not ask students to diagnose themselves, another person, or a community.'
    },
    {
      frame: 'Hold Western discipline history, a fictional credibility case, Canadian institutional history, current inequality evidence, and Joseph Gone’s Aaniiih scholarship in distinct frames. Together they show that mental health is real while the categories, explanations, institutions, and social responses around it have histories.',
      route: ['Western psychology: identify what each school made measurable and what it excluded.', 'Canadian and media cases: examine stigma, patient voice, institutions, and social determinants.', 'Gone: identify the historical and Indigenous explanatory challenge without converting it into a clinical variable.'],
      question: 'How does the explanation change when mind, institution, social condition, colonial history, and community authority are all present but not merged?',
      conceptMove: 'Treat each source as answering a different question; build relation through limits and contribution.',
      termMove: 'Use historical trauma with attribution and context; it is not a label for an individual or a universal Indigenous condition.',
      activity: 'Create a five-frame case file and place each claim only in the frame whose evidence can carry it.',
      reflection: 'Which frame changed the credibility or meaning of another without replacing it?',
      limit: 'A television episode is a cultural text, CAMH is an institutional history, PHAC is population evidence, and Gone is a distinct scholarly account.'
    },
    {
      frame: 'Begin with Joseph Gone’s Aaniiih scholarship on Indigenous historical trauma and alternatives to conventional mental-health explanation. Read the postcolonial history, community context, and question of what services are for before bringing Western psychology, Canadian institutional history, and population evidence into relation.',
      route: ['Gone: identify the historical critique, explanatory purpose, and alternatives he advances.', 'PHAC and CAMH: locate Canadian structural conditions and institutional histories without treating them as the same evidence.', 'OpenStax and the media case: use Western psychology and stigma analysis as contributing tools.'],
      question: 'How does starting with Indigenous historical and community authority change what counts as a mental-health problem and an appropriate response?',
      conceptMove: 'Lead with history, relationship, community, and redress; use psychological perspectives later and state their limits.',
      termMove: 'Keep Gone’s Aaniiih identity and specific argument present; do not turn “Indigenous historical trauma” into a diagnosis or pan-Indigenous essence.',
      activity: 'Compare two response pathways (individual treatment alone, and a historically informed structural or community response), then state what evidence each requires.',
      reflection: 'What changed when the question moved from “what is wrong inside the person?” to history, relationship, service purpose, and responsibility?',
      limit: 'This emphasis cannot prescribe for a community; it identifies why community authority and locally grounded alternatives matter.'
    });

  add(11,
    {
      frame: 'Begin with Western social psychology’s claims about situations, roles, authority, attribution, and group influence. Put the Stanford Prison Experiment under a methods and archive audit: researcher instructions, demand characteristics, role conflict, ethics, selective reporting, and Le Texier’s critique. Keep Bombay and colleagues in a separate historical evidence frame.',
      route: ['OpenStax and Stanford archive: reconstruct the standard claim and design.', 'Le Texier: test the public story against archival evidence and researcher influence.', 'Bombay, Matheson, and Anisman: read residential-school history and intergenerational effects separately.'],
      question: 'What can Western social psychology responsibly claim when the research institution is itself part of the situation?',
      conceptMove: 'Use demand characteristics, researcher influence, ethics, and selective reporting to qualify famous claims.',
      termMove: 'Do not use “situation” as a magic word that erases instructions, institutions, history, or researcher power.',
      activity: 'Issue supported, qualified, disputed, or not-established verdicts for Stanford claims and cite the design reason.',
      reflection: 'Which part of the archive most changed the strength of the claim?',
      limit: 'The Stanford simulation and residential-school history are not comparable experiences.'
    },
    {
      frame: 'Use Two-Eyed Seeing here as evidence discipline, not as a reason to equate cases. The Western social-psychology materials and Le Texier audit a famous simulated experiment. Bombay, Matheson, and Anisman examine residential-school history, intergenerational effects, and community context for a different population, purpose, method, and responsibility.',
      route: ['Audit Stanford: separate the public legend from the design and archive.', 'Read Bombay and colleagues on their own historical and methodological terms.', 'Hold the shared responsibility question (how institutions shape people and knowledge) while preserving non-equivalence.'],
      question: 'How can unlike evidence frames illuminate institutional power without becoming a comparison of unlike harms?',
      conceptMove: 'Pair institutional power and evidence responsibility; keep population, method, history, and purpose distinct.',
      termMove: 'Historical trauma and intergenerational effect cannot be imported into the Stanford case; demand characteristics cannot explain residential-school history.',
      activity: 'Build two evidence files and one boundary statement before writing any shared question.',
      reflection: 'What did the boundary prevent you from claiming, and why did that make the comparison more responsible?',
      limit: 'Non-equivalence is the central safeguard of the week.'
    },
    {
      frame: 'Begin with Bombay, Matheson, and Anisman’s research on residential-school history and intergenerational effects. Keep its population, community relationships, measures, historical context, and cautions visible. The Stanford archive and Le Texier then enter as a separate Western evidence audit, not as an analogy for residential schools.',
      route: ['Bombay and colleagues: identify the historical pathways and evidence limits in their own study.', 'Name what the study does not say about every person, family, community, or Indigenous people.', 'Audit Stanford separately to examine how researcher authority can shape evidence and public stories.'],
      question: 'What does starting with specific historical and community evidence teach about responsibility before a famous Western experiment enters the room?',
      conceptMove: 'Lead with historical specificity and intergenerational pathways; use the Stanford audit to reinforce evidence caution, not comparison of experiences.',
      termMove: 'Use “intergenerational effects” as a research claim with measures and limits, never as an inherited trait or deterministic identity.',
      activity: 'Write the boundary paragraph first: different history, population, purpose, method, and responsibility. Then audit each source inside its own frame.',
      reflection: 'Which source-specific detail would have disappeared in a generic comparison about “powerful situations”?',
      limit: 'The assigned research must not be used to diagnose or characterize a person, family, Nation, or Indigenous peoples generally.'
    });

  add(12,
    {
      frame: 'Begin with Western sociology’s treatment of family as social institution, household structure, relationship, and first agent of socialization. Examine variation across time and culture rather than assuming one natural form. Then read Kim Anderson’s account of kinship, care, responsibility, and family from within Indigenous women’s scholarship.',
      route: ['OpenStax: distinguish family, household, socialization, and changing family forms.', 'Test how law, economy, migration, gender, sexuality, and generation shape arrangements.', 'Anderson: examine kinship as lived work, responsibility, teaching, and relationship.'],
      question: 'What does an institutional definition reveal about family, and what care or kinship work can it fail to see?',
      conceptMove: 'Use structure and socialization first; then expand the object from formal arrangement to relationship and responsibility.',
      termMove: 'Distinguish household from family and legal status from lived kinship.',
      activity: 'Map a fictional care network, then compare what a census household measure and a relationship-centred account each capture.',
      reflection: 'Which person or form of care disappeared when the family was defined only as a household?',
      limit: 'Western typologies cannot establish one universal or “traditional” family form.'
    },
    {
      frame: 'Hold OpenStax’s institutional and comparative account of family beside Kim Anderson’s scholarship on kinship, care, relationship, and responsibility. One helps map household forms and socialization; the other makes visible work and obligations that a structural definition may miss.',
      route: ['Define family and household precisely and identify the evidence each definition produces.', 'Read Anderson for kinship as lived relationship and responsibility.', 'Compare on a shared care-network case without making one account validate the other.'],
      question: 'How do structure and relationship produce different maps of who belongs, who cares, and what obligations endure?',
      conceptMove: 'Keep family-as-institution and kinship-as-lived-work distinct, then analyse where they intersect.',
      termMove: 'Use “kinship as work” with attribution and context rather than as a romantic contrast to Western family.',
      activity: 'Build two maps of the same fictional network (household and legal, care and relationship), then name one insight and one limit from each.',
      reflection: 'Where did holding both maps change who became visible?',
      limit: 'No single family or kinship pattern represents Western, Indigenous, racial, religious, regional, or national groups.'
    },
    {
      frame: 'Begin with Kim Anderson’s scholarship on family, kinship, Indigenous women, care, teaching, and relational responsibility. Keep the source specific; it does not supply a universal Indigenous family model. Bring Western sociology’s household, institution, and socialization concepts in afterwards to identify what formal systems count and regulate.',
      route: ['Anderson: identify kinship as lived responsibility and the people whose work sustains relation.', 'Name the history, gender, generation, and community context the source makes relevant.', 'Use OpenStax to map households, socialization, and institutional definitions, and what they leave out.'],
      question: 'What becomes visible when family is first approached as lived relationship and responsibility rather than a formal structure?',
      conceptMove: 'Lead with care, relation, and obligation; use institutional categories to show what systems record, support, or exclude.',
      termMove: 'Do not equate extended family, Indigenous kinship, collectivism, or one household pattern; each requires evidence and context.',
      activity: 'Trace one act of care across people, places, generations, and institutions, then mark where a formal record would lose the relationship.',
      reflection: 'Which responsibility became visible only after the relation, rather than the address, organized the map?',
      limit: 'Anderson’s work must not be generalized into a pan-Indigenous “holistic family” model.'
    });

  add(13,
    {
      frame: 'Use the Western social-science emphasis to review how disciplines built questions, evidence, concepts, and limits across sociology, anthropology, psychology, and research methods. Then identify where the assigned Indigenous scholarship challenged the discipline’s authority, categories, omissions, or responsibilities.',
      route: ['Choose one Western disciplinary tool and demonstrate accurate use.', 'Choose one point where its history or evidence boundary matters.', 'Return to a named Indigenous scholar who altered the question rather than merely adding an example.'],
      question: 'Which Western tool is now genuinely yours to use, and which challenge prevents you from using it as a universal answer?',
      conceptMove: 'Review by disciplinary purpose, evidence object, strength, and limit.',
      termMove: 'Replace broad phrases such as “Western lens” with the exact discipline, concept, source, and method.',
      activity: 'Build a discipline card: question, evidence, concept, application, limit, and source that complicates it.',
      reflection: 'What can you now do with the tool that you could not do at the start, and what caution travels with it?',
      limit: 'Review must not erase the Indigenous scholarship that established the tool’s boundary.'
    },
    {
      frame: 'Use the default emphasis to reconstruct a course-wide braid without having the site write it. Choose a Western source, a named Indigenous source, and a shared question; state each contribution, preserve the non-equivalence, and identify the responsibility created by holding both.',
      route: ['Retrieve and verify each source’s claim and evidence.', 'State the relationship: support, complication, tension, different question, or different purpose.', 'Name what cannot be merged and what responsibility follows.'],
      question: 'Can you make a course-wide comparison that is coherent because its differences are explicit, not because every source agrees?',
      conceptMove: 'Use contribution, relation, limit, and responsibility as the synthesis architecture.',
      termMove: 'Attribute every source-specific concept and remove phrases that make one tradition the default.',
      activity: 'Select one concept, one evidence source, and one responsibility; the studio creates only a route back to your sources.',
      reflection: 'Which tension now belongs in your synthesis instead of being edited out?',
      limit: 'The site may organize the return path but cannot construct the student’s argument or personal braid.'
    },
    {
      frame: 'Review the course through its named Indigenous scholars and the specific problems each addressed: engagement, learning, worldview, research authority, curriculum structure, truth and cultural safety, research governance, citation, identity regulation, engineered poverty, mental-health explanation, intergenerational effects, and kinship. Preserve their differences.',
      route: ['Choose one scholar and verify the exact contribution, context, and attribution.', 'Choose a second scholar only if a defensible relationship exists between their questions.', 'Bring a Western disciplinary source in afterwards and state what it contributes without containing the first two.'],
      question: 'What course-wide pattern appears across named Indigenous scholarship without turning distinct scholars and Nations into one voice?',
      conceptMove: 'Synthesize recurring authority and responsibility questions while keeping source differences visible.',
      termMove: 'Every broad pattern must be supported by more than one named source and followed by a boundary statement.',
      activity: 'Create an attribution matrix: scholar, specific question, contribution, evidence, Nation or context when supported, and non-generalization rule.',
      reflection: 'Which apparent course-wide theme became more precise after you restored each scholar’s distinct problem?',
      limit: 'A recurring pattern across assigned texts is not a universal Indigenous worldview.'
    });

  add(14,
    {
      frame: 'Close by articulating what Western social science now lets you do: connect biography and structure, examine culture, audit research claims, analyse institutions and inequality, trace socialization, study mind and behaviour, and compare family forms. Then state the limits and responsibilities that prevent those tools from becoming universal claims.',
      route: ['Name one disciplinary strength with an accurate example and evidence.', 'Name one historical, methodological, cultural, or authority limit.', 'Name the Indigenous scholarship that made the limit visible and the responsibility it creates.'],
      question: 'What is the strongest defensible account of Western social science you can now give, neither dismissive nor universalizing?',
      conceptMove: 'Synthesize by discipline and evidence, not by listing weeks.',
      termMove: 'Use exact disciplinary terms and source attribution; avoid treating “Western” as a single timeless worldview.',
      activity: 'Build a final tool card with strength, use, evidence, limit, and responsibility.',
      reflection: 'Which Western tool will you carry forward, and what boundary will you carry with it?',
      limit: 'This route cannot reduce the course’s Indigenous scholarship to a list of criticisms of Western knowledge.'
    },
    {
      frame: 'Return to Elder Albert Marshall’s Two-Eyed Seeing as an ongoing co-learning journey. Revisit the Western disciplines and the named Indigenous scholarship as whole sources with distinct strengths, histories, and authorities. The final synthesis belongs to the learner: the app provides routes and evidence, not a completed braid.',
      route: ['Name each eye’s specific source, contribution, and limit in one course problem.', 'State where the eyes relate and where root difference remains.', 'Write the responsibility or action that follows from holding both.'],
      question: 'What can you now see by holding both eyes that neither eye, used alone, made central?',
      conceptMove: 'Synthesize through accurate difference, relationship, and responsibility rather than agreement.',
      termMove: 'Return to Marshall and Little Bear before using Two-Eyed Seeing, co-learning, worldview, or both eyes whole in the final account.',
      activity: 'Use the global atlas and cultural evidence trail to select a defensible comparison, then write the meaning yourself.',
      reflection: 'Where did one eye change the question asked by the other, and what will you do differently because of it?',
      limit: 'The app cannot write the student’s synthesis, identity statement, positionality, or responsibility; those must be constructed and owned by the learner.'
    },
    {
      frame: 'Close by returning to the named Indigenous scholars as distinct intellectual authorities, not a single holistic lens. Identify what each source taught about relationship, learning, worldview, authority, truth, data, citation, law, inequality, history, community, and kinship. Then bring Western disciplinary tools into relation where they genuinely contribute.',
      route: ['Choose one named Indigenous source and reconstruct its exact question, context, and contribution.', 'Choose a second only if the relationship can be defended without conflation.', 'Add a Western source or method and state its useful contribution and stopping point.'],
      question: 'How can you name a course-wide responsibility emerging from Indigenous scholarship without claiming a universal Indigenous account?',
      conceptMove: 'Synthesize through attribution, specificity, relationship, and the right of difference to remain unresolved.',
      termMove: 'Replace every generic “Indigenous perspective” phrase with author, Nation or context when supported, source, claim, and limit.',
      activity: 'Build a final source constellation whose lines show defensible relationships; leave unearned connections unmade.',
      reflection: 'What responsibility can you honestly claim as your own after learning from these sources, without speaking for their communities?',
      limit: 'Indigenous scholarship emphasis is not an Indigenous identity, experience, or worldview simulator; it is a route for reading assigned scholars more accurately and responsibly.'
    });

  window.SOC122_LEARNING_EMPHASES = {
    defaultId: 'two',
    options: [
      { id: 'western', label: 'Western social science', short: 'Western social science', description: 'Begin with the discipline’s questions, methods, concepts, evidence, strengths, and limits.' },
      { id: 'two', label: 'Two-Eyed Seeing', short: 'Two-Eyed Seeing', description: 'Hold Western and named Indigenous sources in relation while keeping each whole and attributed.' },
      { id: 'indigenous', label: 'Indigenous scholarship', short: 'Indigenous scholarship', description: 'Begin with the week’s named Indigenous scholars and specific contexts; never a pan-Indigenous lens.' }
    ],
    weeks: weeks,
    invariants: [
      'All required sources, outcomes, activities, assessments, and deadlines remain available in every emphasis.',
      'No Indigenous scholar is presented as speaking for all Indigenous peoples or knowledge traditions.',
      'Western social science is treated as historically and culturally situated, not as an unmarked universal.',
      'The emphasis changes the route and instructional material; it never changes the grading standard.'
    ]
  };
})();
