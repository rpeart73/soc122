/* SOC122 Cultural Comparison Lab.
   Broad regional labels are navigation headings only. Every selectable item is
   a named place, institution, community, scholar, or evidence base. The lab
   compares contexts and claims; it never treats people as cultural types. */
(function () {
  'use strict';

  var groups = [
    {
      id: 'indigenous',
      label: 'Named Indigenous course sources - specific, not interchangeable',
      note: 'First Nations, Métis, Inuit, and other Indigenous peoples are not one culture. Each option stays attached to the named knowledge holder, Nation or people, place, and course source.'
    },
    {
      id: 'south_asia',
      label: 'South Asian contexts - choose a named case',
      note: 'South Asia is a region, not a culture. These cases address different countries, institutions, languages, status systems, and forms of work.'
    },
    {
      id: 'east_southeast_asia',
      label: 'East and Southeast Asian contexts - choose a named case',
      note: 'East and Southeast Asia contain many societies, languages, religions, political systems, and histories. The regional heading is not a comparison category.'
    },
    {
      id: 'latin_america',
      label: 'Latin American contexts - choose a named case',
      note: 'Latin America is internally diverse. These options keep country, institution, population, language, and evidence visible.'
    },
    {
      id: 'muslim_contexts',
      label: 'Muslim-majority and diasporic contexts - choose a named case',
      note: 'Muslim is a religious identification, not an ethnicity or a single culture. These cases are located in different societies and address different institutions.'
    },
    {
      id: 'black_diasporas',
      label: 'Black diasporic contexts - choose a named population and evidence base',
      note: 'Black is a racialized category, not one culture. These cases keep birthplace, ancestry, language, religion, history, country, and institution visible.'
    },
    {
      id: 'racialization',
      label: 'Whiteness and racial classification - institutional cases, not cultures',
      note: 'White and Black are not cultural opposites. These options examine how states and data systems construct, revise, and attach consequences to racial categories.'
    }
  ];

  var contexts = {
    marshall_mikmaq: {
      group: 'indigenous',
      label: 'Eskasoni First Nation - Elder Albert Marshall and Etuaptmumk',
      place: 'Mi\'kma\'ki; Eskasoni First Nation, Nova Scotia',
      tags: ['Mi\'kmaw', 'knowledge systems', 'responsibility'],
      unit: 'A specifically Mi\'kmaw guiding principle taught by Elder Albert Marshall, not a generic model of multiculturalism.',
      evidence: 'Elder Marshall\'s teaching and the attributed Week 2 course sources on Etuaptmumk, or Two-Eyed Seeing.',
      guardrail: 'Keep Etuaptmumk Mi\'kmaw, named, and attributed. Other societies are not additional "eyes" inside this teaching.',
      question: 'What changes when two knowledge systems remain whole and the learner becomes responsible for how each is used?',
      weeks: [2, 5],
      sourceId: 'amarshall',
      bio: 'https://indspire.ca/laureate/albert-marshall/'
    },
    webstad_stswecemc: {
      group: 'indigenous',
      label: 'Stswecem\'c Xgat\'tem First Nation - Phyllis Webstad\'s account',
      place: 'Stswecem\'c Xgat\'tem First Nation; British Columbia',
      tags: ['Survivor testimony', 'residential schools', 'public memory'],
      unit: 'A named Survivor\'s account and the Canadian residential-school system connected to Orange Shirt Day.',
      evidence: 'Phyllis Webstad\'s public account, read with the Week 4 institutional and health sources.',
      guardrail: 'One Survivor\'s account does not stand for every Survivor, school, Nation, or family. Do not use residential schools as a loose metaphor for another institution.',
      question: 'What responsibility follows when a public symbol is returned to the person, institution, and history that gave it meaning?',
      weeks: [4],
      source: 'https://www.jibc.ca/people/phyllis-webstad',
      sourceLabel: 'Justice Institute of British Columbia - Phyllis Webstad',
      bio: 'https://www.jibc.ca/people/phyllis-webstad'
    },
    todd_metis: {
      group: 'indigenous',
      label: 'Métis scholarship - Zoe Todd on citation and anthropology',
      place: 'Métis scholarship in the Canadian academy',
      tags: ['Métis', 'anthropology', 'citation'],
      unit: 'Anthropology\'s authority to decide who is recognized as a theorist and whose concepts are extracted without credit.',
      evidence: 'Zoe Todd\'s Week 6 critique of the discipline\'s citation and knowledge practices.',
      guardrail: 'Todd\'s argument is a specific critique of disciplinary practice, not a summary of all Métis thought or all Indigenous anthropology.',
      question: 'Who becomes a theorist, who becomes data, and what would accountable citation change?',
      weeks: [6, 8],
      sourceId: 'todd2016',
      bio: 'https://doi.org/10.1111/johs.12124'
    },
    lawrence_mikmaq: {
      group: 'indigenous',
      label: 'Mi\'kmaw scholarship - Bonita Lawrence on state identity regulation',
      place: 'Canada; settler law and Indigenous nationhood',
      tags: ['Mi\'kmaw', 'Indian Act', 'identity regulation'],
      unit: 'The state\'s legal power to classify Indigenous identity, belonging, land, and status.',
      evidence: 'Bonita Lawrence\'s Week 8 analysis of gendered and racialized identity regulation under settler law.',
      guardrail: 'This is a legal and political account of colonial classification, not a general illustration of socialization or a description of every First Nation.',
      question: 'What becomes visible when identity is studied as something a state can impose and regulate?',
      weeks: [8, 9, 12],
      sourceId: 'lawrence2003',
      bio: 'https://www.yorku.ca/laps/newsroom/2020/07/10/indigenous-studies-program-connects-students-with-unique-learning-experiences/'
    },
    palmater_ugpiganjig: {
      group: 'indigenous',
      label: 'Ugpi\'ganjig First Nation - Pamela Palmater on engineered inequality',
      place: 'Ugpi\'ganjig First Nation and Canadian federal law and policy',
      tags: ['Mi\'kmaw', 'First Nations', 'law and policy'],
      unit: 'The legal, fiscal, and policy structures that produce material inequality for First Nations.',
      evidence: 'Pamela Palmater\'s Week 9 structural account, kept distinct from fictional conformity and rating-system cases.',
      guardrail: 'Do not treat First Nations poverty as a cultural trait or Palmater\'s account as a generic example for all Indigenous peoples.',
      question: 'How does an explanation change when inequality is traced to the rules that produced it?',
      weeks: [8, 9],
      sourceId: 'palmater',
      bio: 'https://www.torontomu.ca/news-events/news/2025/01/why-we-need-substantive-action-reconciliation/'
    },
    gone_aaniiih: {
      group: 'indigenous',
      label: 'Aaniiih-Gros Ventre Nation - Joseph Gone on Indigenous psychology',
      place: 'Aaniiih-Gros Ventre Nation; Indigenous psychology in the United States',
      tags: ['Aaniiih', 'psychology', 'historical context'],
      unit: 'Whether mainstream mental-health frameworks fit Indigenous histories, explanatory traditions, and community priorities.',
      evidence: 'Joseph P. Gone\'s Week 10 scholarly account of historical trauma and Indigenous alternatives.',
      guardrail: 'This is not a diagnosis of a person or a culture. Do not transfer Gone\'s Nation-specific and field-specific account to unrelated communities.',
      question: 'Who should define the problem and the response when a discipline enters a community?',
      weeks: [10],
      sourceId: 'gone2023',
      bio: 'https://ictnews.org/news/professor-honored-for-research-on-indigenous-psychology/'
    },
    bombay_anishinaabe: {
      group: 'indigenous',
      label: 'Rainy River First Nations - Amy Bombay on intergenerational effects',
      place: 'Anishinaabe; Rainy River First Nations, Ontario',
      tags: ['Anishinaabe', 'residential schools', 'community context'],
      unit: 'Residential-school history, intergenerational effects, resilience, and community context.',
      evidence: 'Amy Bombay, Kim Matheson, and Hymie Anisman\'s Week 11 research article.',
      guardrail: 'Keep this historical and community-specific source separate from the simulated Stanford prison and from universal claims about Indigenous communities.',
      question: 'How do history, community context, and research purpose set the limits of a claim?',
      weeks: [10, 11],
      sourceId: 'bombay2014',
      bio: 'https://www.dal.ca/news/2019/06/21/building-capacity-in-indigenous-health-research-and-beyond.html'
    },
    anderson_metis: {
      group: 'indigenous',
      label: 'Métis scholarship - Kim Anderson on kinship and relationality',
      place: 'Métis scholarship; Canada',
      tags: ['Métis', 'kinship', 'care and story'],
      unit: 'Kinship, story, care, memory, land, and responsibility as living relational practices.',
      evidence: 'Kim Anderson\'s Week 12 scholarship and the Nokom\'s House community design context.',
      guardrail: 'Do not reduce kinship to household structure or treat one Métis scholar as speaking for all Métis families or all Indigenous peoples.',
      question: 'What becomes visible when family is understood as ongoing relationship and responsibility?',
      weeks: [12],
      sourceId: 'anderson2019',
      bio: 'https://www.uoguelph.ca/profile/kim-anderson'
    },

    bangladesh_garment: {
      group: 'south_asia',
      label: 'Bangladesh - garment work, supply chains, and labour governance',
      place: 'Bangladesh\'s ready-made garment sector',
      tags: ['work', 'global supply chains', 'labour institutions'],
      unit: 'Factories, buyers, labour standards, worker voice, gendered work, and global supply-chain accountability.',
      evidence: 'International Labour Organization evaluation of Better Work Bangladesh and garment-sector working conditions.',
      guardrail: 'This is an industry and labour-governance case, not a description of Bangladeshi culture or of all workers\' experiences.',
      question: 'Which institutions distribute risk, voice, profit, and responsibility across the supply chain?',
      weeks: [5, 9],
      source: 'https://researchrepository.ilo.org/esploro/outputs/report/The-impact-of-Better-Work-Bangladesh/995652000702676',
      sourceLabel: 'International Labour Organization - Better Work Bangladesh evaluation'
    },
    india_caste_jati: {
      group: 'south_asia',
      label: 'India, three-state study - caste, jati, gender, and survey categories',
      place: 'Three Indian states; evidence on caste, jati, gender, education, and occupation',
      tags: ['stratification', 'measurement', 'social mobility'],
      unit: 'How broad survey categories reveal patterns in a three-state study while also hiding variation among jatis, genders, regions, and occupations.',
      evidence: 'World Bank policy research on the relationship between caste categories, gender, and jati in three Indian states.',
      guardrail: 'The study covers three states, not all of India. India contains extensive regional, linguistic, religious, class, caste, and jati variation. Do not turn a statistical pattern into a trait of an individual or an unchanging culture.',
      question: 'What does the category make measurable, and what important differences does it compress?',
      weeks: [5, 9],
      source: 'https://documents.worldbank.org/en/publication/documents-reports/documentdetail/411391498158851891',
      sourceLabel: 'World Bank - caste, gender, and jati evidence in India'
    },
    india_multilingual: {
      group: 'south_asia',
      label: 'India - multilingual education and language-of-instruction policy',
      place: 'India\'s multilingual education systems',
      tags: ['language', 'education', 'institutional inclusion'],
      unit: 'How schools choose languages of instruction within a country containing many languages and education systems.',
      evidence: 'UNESCO\'s 2025 State of the Education Report for India on mother tongue and multilingual education.',
      guardrail: 'There is no single Indian language or educational experience. Keep state, language, school system, and policy level visible.',
      question: 'Whose language is treated as the normal route to learning, and what does that decision make easier or harder?',
      weeks: [3, 6, 8],
      source: 'https://www.unesco.org/en/publication/bhasha-matters-mother-tongue-and-multilingual-education',
      sourceLabel: 'UNESCO - Bhasha Matters, India 2025'
    },
    colombo_labour_migration: {
      group: 'south_asia',
      label: 'Colombo Process countries - labour migration systems and worker protection',
      place: 'Labour migration from Colombo Process member states in South and Southeast Asia',
      tags: ['migration', 'work', 'transnational institutions'],
      unit: 'Recruitment systems, destination-country rules, worker protection, remittances, and family responsibilities across borders.',
      evidence: 'International Organization for Migration issue brief on labour migration from Colombo Process countries.',
      guardrail: 'This is a multi-country policy comparison. Name the origin and destination country before making a claim; do not treat migrant workers as one population.',
      question: 'Which institution controls each stage of migration, and where do protection and responsibility fall through the gaps?',
      weeks: [5, 9, 12],
      source: 'https://publications.iom.int/books/iom-mpi-issue-brief-no-1-labour-migration-colombo-process-countries-good-practices-challenges',
      sourceLabel: 'International Organization for Migration - Colombo Process labour migration'
    },

    china_hukou: {
      group: 'east_southeast_asia',
      label: 'China - hukou, internal migration, and access to services',
      place: 'People\'s Republic of China; household registration and internal migration',
      tags: ['hukou', 'internal migration', 'institutional access'],
      unit: 'How household registration can shape internal migrants\' access to education, employment, housing, and social services.',
      evidence: 'World Bank Systematic Country Diagnostic for China and its analysis of hukou-linked inequality.',
      guardrail: 'This is an institutional policy case, not a statement about Chinese culture or every city, province, migrant, or household.',
      question: 'How can an administrative category organize opportunity long after a person moves?',
      weeks: [8, 9, 12],
      source: 'https://documents1.worldbank.org/curated/en/147231519162198351/pdf/China-SCD-publishing-version-final-for-submission-02142018.pdf',
      sourceLabel: 'World Bank - China Systematic Country Diagnostic'
    },
    philippines_migration: {
      group: 'east_southeast_asia',
      label: 'Philippines - overseas labour migration, remittances, and family care',
      place: 'Philippines and transnational destination countries',
      tags: ['migration', 'family', 'care and remittances'],
      unit: 'How overseas employment, state migration systems, remittances, communication, and care obligations reorganize households across borders.',
      evidence: 'International Organization for Migration\'s country migration report for the Philippines.',
      guardrail: 'Do not reduce Filipino families to migration or assume the same arrangement, benefit, or cost in every household.',
      question: 'When work crosses borders, how are income, care, absence, authority, and obligation redistributed?',
      weeks: [8, 9, 12],
      source: 'https://publications.iom.int/books/country-migration-report-philippines-2013',
      sourceLabel: 'International Organization for Migration - Philippines country migration report'
    },
    southeast_asia_languages: {
      group: 'east_southeast_asia',
      label: 'Cambodia, Philippines, Thailand, Timor-Leste, and Viet Nam - home-language education',
      place: 'Five named Southeast Asian education-policy contexts',
      tags: ['multilingual education', 'schooling', 'policy comparison'],
      unit: 'Differences in policy support for learners\' home languages across multiple national education systems.',
      evidence: 'UNESCO background research on language-of-instruction policy in Southeast Asia.',
      guardrail: 'This is a comparative policy case across named countries, not one Southeast Asian culture. Keep each country\'s policy and language ecology distinct.',
      question: 'How does the language chosen by a school shape whose knowledge and participation become visible?',
      weeks: [3, 5, 6, 8],
      source: 'https://unesdoc.unesco.org/ark:/48223/pf0000259576',
      sourceLabel: 'UNESCO Digital Library - Language of instruction in Southeast Asia'
    },
    japan_ageing_care: {
      group: 'east_southeast_asia',
      label: 'Japan - population ageing, care, work, and social protection',
      place: 'Japan; households, workplaces, and long-term care institutions',
      tags: ['ageing', 'care work', 'social policy'],
      unit: 'How population ageing interacts with family care, labour, long-term care, retirement rules, and social protection.',
      evidence: 'OECD Economic Survey of Japan 2024 using Japanese government and comparative social-policy data.',
      guardrail: 'Ageing is a demographic and institutional process, not a cultural personality. Distinguish policy, household, gender, work, and regional variation.',
      question: 'Which care responsibilities are assigned to families, employers, markets, and the state?',
      weeks: [9, 12],
      source: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/01/oecd-economic-surveys-japan-2024_9289b572/41e807f9-en.pdf',
      sourceLabel: 'OECD - Economic Surveys: Japan 2024 (PDF)'
    },

    peru_intercultural_education: {
      group: 'latin_america',
      label: 'Peru - bilingual and intercultural education policy',
      place: 'Peru; education policy since the 1972 reform and later intercultural initiatives',
      tags: ['education', 'language', 'intercultural policy'],
      unit: 'How public education recognizes language, Indigenous peoples, Afro-descendant communities, migration, and structural racism in policy design.',
      evidence: 'UNESCO IIEP history and analysis of intercultural education policy, beginning with Peru and locating it in wider Latin American debates.',
      guardrail: 'Peru contains many Indigenous peoples, languages, regions, and education systems. Do not use one policy to stand for all Peruvian or Latin American experience.',
      question: 'Is this policy designed for, with, or by the people whose language and knowledge it addresses?',
      weeks: [3, 5, 6, 8],
      source: 'https://www.iiep.unesco.org/en/articles/road-intercultural-education-systems-latin-america',
      sourceLabel: 'UNESCO IIEP - Intercultural education systems in Latin America'
    },
    lac_inequality: {
      group: 'latin_america',
      label: 'Latin America and the Caribbean - structural inequality and social mobility',
      place: 'Regional institutions and data across Latin America and the Caribbean',
      tags: ['inequality', 'mobility', 'social cohesion'],
      unit: 'Income and multidimensional inequality, education, labour markets, care systems, gender, migration, disability, and institutional capacity.',
      evidence: 'United Nations ECLAC Social Panorama of Latin America and the Caribbean 2025.',
      guardrail: 'A regional statistical pattern is not a culture. Move from the regional finding to a named country, institution, and population before explaining an individual case.',
      question: 'Which institutions reproduce the pattern, and which level of evidence can support the claim?',
      weeks: [5, 8, 9],
      source: 'https://www.cepal.org/en/publications/90009-social-panorama-latin-america-and-caribbean-2025-how-escape-trap-high-inequality',
      sourceLabel: 'United Nations ECLAC - Social Panorama 2025'
    },
    latin_america_migration: {
      group: 'latin_america',
      label: 'Latin American destination countries - migration and institutional inclusion',
      place: 'Named destination-country systems in Latin America',
      tags: ['migration', 'inclusion', 'household evidence'],
      unit: 'How labour markets, education, social protection, documentation, and household conditions shape inclusion after migration.',
      evidence: 'United Nations ECLAC comparative analysis using household surveys in destination countries.',
      guardrail: 'Name the origin country, destination country, legal status, and institution. "Latin American migrant" is not one experience or identity.',
      question: 'Which rules and institutions shape inclusion after a border is crossed?',
      weeks: [5, 9, 12],
      source: 'https://www.cepal.org/es/publicaciones/43947-migracion-internacional-inclusion-america-latina-analisis-paises-destino',
      sourceLabel: 'United Nations ECLAC - International migration and inclusion'
    },

    canada_muslim_diversity: {
      group: 'muslim_contexts',
      label: 'Canada - internally diverse Muslim communities in Census evidence',
      place: 'Muslim communities across Canada',
      tags: ['religion', 'diaspora', 'Census categories'],
      unit: 'How a religious-affiliation category intersects with many racialized groups, birthplaces, languages, generations, provinces, and Muslim traditions.',
      evidence: 'Statistics Canada\'s 2021 Census portrait of people reporting Muslim religious affiliation.',
      guardrail: 'Muslim is not an ethnicity, nationality, language, or single culture. Do not assume religiosity, practice, politics, or family form from the Census label.',
      question: 'What does the category reveal, and what diversity disappears if it is treated as a complete identity?',
      weeks: [3, 5, 8, 9, 12],
      source: 'https://www.statcan.gc.ca/o1/en/plus/7639-snapshot-muslim-population-canada',
      sourceLabel: 'Statistics Canada - A snapshot of the Muslim population in Canada'
    },
    indonesia_religious_pluralism: {
      group: 'muslim_contexts',
      label: 'Indonesia - everyday religious pluralism in a Muslim-majority society',
      place: 'Indonesia; local communities and national pluralism',
      tags: ['religion', 'social cohesion', 'everyday institutions'],
      unit: 'How religious difference, neighbourhood life, civic practices, local leadership, and peacebuilding interact in a Muslim-majority country.',
      evidence: 'A United Nations Development Programme Indonesia commentary describing local religious-cooperation examples and UNDP peacebuilding work.',
      guardrail: 'Indonesia is not one religious culture, and Muslim-majority does not mean religious uniformity. Keep island, locality, tradition, minority community, and institution visible.',
      question: 'Which everyday practices and institutions allow difference to coexist without requiring sameness?',
      weeks: [3, 6, 8, 9],
      source: 'https://www.undp.org/indonesia/blog/how-indonesia-embraces-diversity-and-religion-cultivate-peace-everyday-life',
      sourceLabel: 'UNDP Indonesia commentary - diversity, religion, and everyday peace'
    },
    egypt_family_law_reform: {
      group: 'muslim_contexts',
      label: 'Egypt - Muslim family-law reform, courts, and contested interpretation',
      place: 'Egypt; khul\' divorce law reform and wider Middle East and North Africa debates',
      tags: ['family law', 'gender norms', 'legal interpretation'],
      unit: 'How activists, scholars, religious knowledge production, legal reform, and courts negotiate gender norms and family law.',
      evidence: 'UN Women discussion paper drawing on Egyptian khul\' reform and local activist practice.',
      guardrail: 'Distinguish divine sharia, human jurisprudence, state law, court practice, activist interpretation, and lived experience. Do not speak of one Muslim family law or one Muslim family.',
      question: 'Who gains authority to interpret religion in law, and how can that authority be contested or reformed?',
      weeks: [8, 9, 12],
      source: 'https://knowledge.unwomen.org/en/digital-library/publications/2026/02/discussion-paper-social-norms-religion-and-muslim-family-laws-in-the-middle-east-and-north-africa-region',
      sourceLabel: 'UN Women - social norms, religion, and Muslim family laws'
    },

    canada_black_populations: {
      group: 'black_diasporas',
      label: 'Canada - many Black populations, histories, origins, and languages',
      place: 'Black populations across Canada with Canadian, African, Caribbean, and other histories',
      tags: ['Black diasporas', 'Census evidence', 'internal diversity'],
      unit: 'How birthplace, generation, historic Black communities, migration, language, religion, and hundreds of reported origins vary within a racialized Census category.',
      evidence: 'Statistics Canada\'s 2021 sociodemographic portrait of the diversity of Black populations in Canada.',
      guardrail: 'There is no single Black culture or Black experience. A racialized Census category does not replace a person\'s community, ancestry, language, religion, class, gender, or history.',
      question: 'What does the racialized category reveal about institutions and inequality, and what differences disappear when it is treated as a culture?',
      weeks: [3, 5, 8, 9, 12],
      source: 'https://www150.statcan.gc.ca/n1/pub/89-657-x/89-657-x2024005-eng.htm',
      sourceLabel: 'Statistics Canada - Diversity of the Black Populations in Canada, 2021'
    },
    brazil_race_colour: {
      group: 'black_diasporas',
      label: 'Brazil - colour or race categories and socioeconomic inequality',
      place: 'Brazil; national colour-or-race statistics and social indicators',
      tags: ['Brazil', 'racialization', 'inequality'],
      unit: 'How official colour-or-race categories are used to measure patterned differences in work, income, education, housing, and opportunity.',
      evidence: 'Brazilian Institute of Geography and Statistics reporting on social inequality by colour or race.',
      guardrail: 'Brazilian categories and histories cannot be imported unchanged into Canada or the United States. Race is socially classified within a particular national history; it is not a culture or a biological fact.',
      question: 'How do a country\'s categories make racial inequality measurable while also reflecting that country\'s history of classification?',
      weeks: [5, 8, 9],
      source: 'https://agenciadenoticias.ibge.gov.br/en/agencia-news/2184-news-agency/news/21226-ibge-presents-the-color-of-inequality',
      sourceLabel: 'Brazilian Institute of Geography and Statistics - The colors of inequality'
    },
    canada_white_category: {
      group: 'racialization',
      label: 'Canada - "White" as a population-group category, not a culture',
      place: 'Canada; Census population-group and ethnic-or-cultural-origin questions',
      tags: ['whiteness', 'Census categories', 'ethnocultural origins'],
      unit: 'The difference between a broad racialized population-group category and the many ethnic, cultural, linguistic, religious, national, and ancestral origins people report.',
      evidence: 'Statistics Canada\'s 2021 Census analysis showing that people counted in the White population group reported hundreds of ethnic or cultural origins.',
      guardrail: 'White is not a single culture, ethnicity, nationality, religion, or neutral default. Do not contrast "White culture" with another named people or society.',
      question: 'What social power is hidden when a broad racial category is mistaken for a culture or treated as having no history?',
      weeks: [3, 5, 8, 9],
      source: 'https://www150.statcan.gc.ca/n1/daily-quotidien/221026/dq221026b-eng.htm',
      sourceLabel: 'Statistics Canada - The Canadian census: a rich portrait of religious and ethnocultural diversity'
    },
    us_census_race_categories: {
      group: 'racialization',
      label: 'United States - changing Census race categories, 1790 to 2020',
      place: 'United States; federal Census classification over time',
      tags: ['race-making', 'state categories', 'historical change'],
      unit: 'How official race and ethnicity questions, labels, instructions, and tabulation rules changed with law, politics, social usage, and data needs.',
      evidence: 'United States Census Bureau historical documentation of race and ethnicity measurement across decennial censuses.',
      guardrail: 'Changing categories show that race is historically and institutionally produced rather than a fixed biological taxonomy. United States categories do not map automatically onto Canada, Brazil, or another country.',
      question: 'What can the changing form itself reveal about who had authority to name, count, separate, or combine populations?',
      weeks: [5, 8, 9],
      source: 'https://www.census.gov/library/visualizations/interactive/decennial-census-measurement-of-race-and-ethnicity-across-the-decades-1790-2020.html',
      sourceLabel: 'United States Census Bureau - Measuring race and ethnicity across the decades, 1790 to 2020'
    }
  };

  window.SOC122_CONTEXT_LAB = {
    groups: groups,
    contexts: contexts,
    principles: [
      'Compare named contexts and evidence, not whole cultures or kinds of people.',
      'A regional heading organizes the menu; it is never itself a selectable culture.',
      'Indigenous sources remain Nation-specific, people-specific, scholar-specific, and attributed.',
      'Race, religion, nationality, language, and culture are different dimensions. The lab never uses one as a shortcut for another.',
      'One context may overlap several regions, religions, languages, and identities. The menu is a route, not a box.',
      'No personal identity or private experience is required.'
    ]
  };
})();
