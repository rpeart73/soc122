/* SOC122 journal bridge data: connects each week's saved reflection to the
   Two-Eyed Seeing Observation Journal assessment (20 percent, four dated entries in two sets).
   Grounding:
   - Week reflectPrompt + guiding questions: SOC122/_app/app.js, WEEKPAGE (weeks 2-6, 8-12)
     and walkReviewData() for the Week 7 cumulative review (no WEEKPAGE entry exists for Week 7).
   - All quoted assessment language: SOC122/Assessments/Briefs/SOC122_Brief_1_Two_Eyed_Seeing_Journal.docx
     ("hold that week's topic in both eyes"; "where the two see differently, where they meet, and
     where they do not resolve, without collapsing one into the other"; "Hold both; do not collapse
     one into the other, and do not speak for anyone"; Weeks 2, 3, and 4 "assign Indigenous-authored
     readings only", so "pair the assigned source with a source from the other eye"; "in the Week 7
     review, connect two sources you have used so far"; "Post eleven entries across the term, then
     flag two in Week 12 for grading"; criteria Consistency, Both eyes held, Sees the difference,
     Respectful engagement, Growth).
   No criteria, weights, or quotes are invented; every quotation below appears in the brief. */
window.SOC122_JOURNAL = {
  byWeek: {
    /* Grounding: WEEKPAGE week 2 reflectPrompt + guiding (Marshall, 2017; Little Bear, 2000); brief rules for one-eye weeks. */
    "2": {
      bridge: "This reflection is your first Journal entry in miniature. The Journal asks you, every week from Week 2 to Week 12, to \"hold that week's topic in both eyes\" and write \"where the two see differently, where they meet, and where they do not resolve, without collapsing one into the other.\" Week 2 assigns Indigenous-authored readings only, so the brief asks you to \"pair the assigned source with a source from the other eye\", either one you have already met in the course or one you find and cite yourself.",
      moves: [
        "Open with Marshall's own framing: in one sentence, say what it means to see with one eye the strengths of Indigenous ways of knowing and with the other the strengths of Western ways of knowing (Marshall, 2017). Then name the Western source you are pairing with him and write where the two meet and where they do not resolve.",
        "Take one root difference Little Bear (2000) names between Indigenous and Eurocentric worldviews, put it in your own words, and write what your paired Western source sees on the same ground that Little Bear does not, and the reverse."
      ]
    },
    /* Grounding: WEEKPAGE week 3 reflectPrompt + guiding (Martin, 2012; Brunette-Debassige et al., 2022); brief criteria table. */
    "3": {
      bridge: "Your reflection on who decides what counts as knowledge is already Journal material. The brief asks that each entry \"names one Indigenous-authored source and one Western source, both cited and genuinely engaged\", and Week 3, like Weeks 2 and 4, centres one eye, so you \"pair the assigned source with a source from the other eye\". Martin's pairing rather than ranking is also the Journal's own standard: strong work \"notes where the two ways of knowing differ, where they meet, and where they do not resolve, without forcing agreement.\"",
      moves: [
        "Start from Martin's (2012) distinction between pairing and ranking: name your two sources, then write one sentence on what a respectful pairing of them can ask for and one sentence on what it cannot.",
        "Take Brunette-Debassige and colleagues' (2022) point that the knowledge a classroom treats as legitimate was decided, not given. Write who decided in a setting you know, and what each of your two cited sources shows about remaking that decision."
      ]
    },
    /* Grounding: WEEKPAGE week 4 reflectPrompt + guiding (TRC; Smylie and Anderson; First Nations Health Authority); brief Respectful engagement criterion. */
    "4": {
      bridge: "This week's careful boundary is also the Journal's. The Respectful engagement criterion says strong work \"cites Indigenous-authored sources on their own terms and does not speak for others\", which matches this week's instruction to keep every claim at the level the source can support. Week 4 assigns Indigenous-authored readings only, so the brief asks you to \"pair the assigned source with a source from the other eye\".",
      moves: [
        "Name one responsibility this week's sources place on an institution, cite the source that supports it, and state one limit or unanswered question, without speaking for Survivors or a community.",
        "Take the guiding question on data governance: why do Smylie and Anderson treat it as more than a technical question? Write what each of your two cited sources shows about who should hold and control information about a community."
      ]
    },
    /* Grounding: WEEKPAGE week 5 reflectPrompt + guiding (CBC Marketplace investigation); brief entry format and both-eyes rule. */
    "5": {
      bridge: "Your three-sentence verdict on the video already has the shape of a Journal entry, which can be \"a few sentences, or a two to three minute voice note\". The brief asks you to name \"one Indigenous-authored source and one Western source on it, both cited\", so set the Marketplace investigation, a Western media source, beside an Indigenous-authored source on evidence and authority, and write \"where the two see differently, where they meet, and where they do not resolve.\"",
      moves: [
        "Sort one claim from the Marketplace investigation into observation, association, plausible mechanism, or causal claim, then write whether the design supports that move and what each of your two cited sources would ask next.",
        "Carry the week's last guiding question into your entry: how would the research question, relationships, and responsibility change if the people being studied held co-equal authority over the investigation? Note where your two sources part ways on that."
      ]
    },
    /* Grounding: WEEKPAGE week 6 reflectPrompt + guiding (OpenStax, 2022; Todd, 2016); brief Respectful engagement and Both eyes held criteria. */
    "6": {
      bridge: "Todd's insistence on credit is the Journal's Respectful engagement criterion in action: strong work \"cites Indigenous-authored sources on their own terms and does not speak for others.\" This week hands you two assigned sources directly, OpenStax (2022) and Todd (2016), so your entry can hold them \"both cited and genuinely engaged\" and write where they meet and where they do not resolve.",
      moves: [
        "Begin with the OpenStax (2022) claim that culture is learned and shared, not inborn, and write what follows for how each of your two sources treats a culture that is not its own, where they meet and where they stay apart.",
        "Apply Todd (2016) to your own entry: name the thinkers behind the ideas you are using, then write what crediting and staying accountable to them changes about how you compare your two sources."
      ]
    },
    /* Grounding: app.js walkReviewData() Week 7 reflectPrompt + guiding (cumulative review, no new reading); brief Week 7 rule and Consistency criterion. */
    "7": {
      bridge: "There is no new reading this week, and the Journal adjusts with you: the brief says that \"in the Week 7 review, connect two sources you have used so far.\" The review's own prompt, choosing one idea to keep and one distinction to repair, gives your entry its shape, and posting it now serves the Consistency criterion: \"entries appear across the weeks, not assembled at the end.\"",
      moves: [
        "Choose one idea to keep and one distinction to repair, then name the two sources from earlier weeks, one from each eye, that you will return to, and write what each one lets you check.",
        "Answer the review's guiding question in writing: which idea is holding, which distinction is still blurring, and where do your two chosen sources still see differently without resolving?"
      ]
    },
    /* Grounding: WEEKPAGE week 8 reflectPrompt + guiding (OpenStax on socialization; Lawrence on the state and identity categories). */
    "8": {
      bridge: "Your reflection on who wrote the boxes already sets this week's two assigned sources side by side: OpenStax on identity learned in relationship and Lawrence on the state deciding who counts. The Journal asks you to write \"where the two see differently, where they meet, and where they do not resolve, without collapsing one into the other\", and Lawrence's question of what is gained and what is lost when a law rather than a community draws the line is exactly a place where they do not resolve.",
      moves: [
        "Start from a form or category that has asked you to name your identity: write who wrote the boxes, then set OpenStax's account of identity learned in relationship beside Lawrence's account of the state drawing the line, and note where they part.",
        "Take Lawrence's question of what is gained and what is lost when a law, rather than a community, draws that line. Write one gain and one loss, citing both of your sources, and let the tension stand."
      ]
    },
    /* Grounding: WEEKPAGE week 9 reflectPrompt + guiding (OpenStax, 2021; Palmater, 2011); brief core instruction and Sees the difference criterion. */
    "9": {
      bridge: "Week 9's guiding questions end where the Journal begins: why keep OpenStax (2021) and Palmater (2011) side by side rather than collapsing them into one? That is the Journal's core instruction, \"hold both; do not collapse one into the other,\" and the Sees the difference criterion rewards exactly this: noting \"where the two ways of knowing differ, where they meet, and where they do not resolve, without forcing agreement.\"",
      moves: [
        "Pick one mechanism you assembled this week and write how it produces an outcome that looks personal but is actually built, citing OpenStax (2021) for the general machinery of stratification and Palmater (2011) for the specific engineered case.",
        "Answer the week's own side-by-side question in your entry: what does each analysis show that the other cannot, and why is it worth keeping them next to each other rather than merging them?"
      ]
    },
    /* Grounding: WEEKPAGE week 10 reflectPrompt + guiding (OpenStax, 2020; Gone, 2023); brief hold-both and Respectful engagement language. */
    "10": {
      bridge: "This week's last guiding question, keeping OpenStax (2020) and Gone (2023) side by side rather than collapsing one into the other, is the Journal's core move: \"hold both; do not collapse one into the other, and do not speak for anyone.\" Keep the reflection's boundary in your entry too: write about the ideas rather than about yourself or anyone you know, which is how strong work \"cites Indigenous-authored sources on their own terms and does not speak for others.\"",
      moves: [
        "Pick one contextual or structural factor and show how Gone (2023) uses it to locate the cause of a pattern in history and structure rather than inside individuals, writing about the ideas, not about yourself or anyone you know.",
        "Set the biopsychosocial model (OpenStax, 2020) beside Gone's (2023) structural and historical account and write what each level explains that the other does not, without merging them."
      ]
    },
    /* Grounding: WEEKPAGE week 11 reflectPrompt + guiding (OpenStax on social psychology; Bombay, Matheson and Anisman); brief Consistency and Respectful engagement criteria. */
    "11": {
      bridge: "There is no live class this week, but the Journal continues: entries run every week from Week 2 to Week 12, and the Consistency criterion means \"entries appear across the weeks, not assembled at the end.\" This week's care in presentation is also the Journal's: an entry on Bombay, Matheson and Anisman should stay a structural and historical account attributed to the researchers, because strong work \"cites Indigenous-authored sources on their own terms and does not speak for others.\"",
      moves: [
        "Start from the idea that we are shaped between people, not in isolation, and write how that changes the way you read an outcome that seems to belong to one individual, citing both of your sources.",
        "Take Bombay, Matheson and Anisman's account of effects that accumulate when residential school attendance spans several generations. Write what it means for a harm to accumulate rather than simply repeat, keeping the claim attributed and at the level of structure and history."
      ]
    },
    /* Grounding: WEEKPAGE week 12 reflectPrompt + guiding (OpenStax on family; Anderson on kinship as work); brief submission and Growth language. */
    "12": {
      bridge: "This is the Journal's final week and the flag week: the brief says to \"post eleven entries across the term, then flag two in Week 12 for grading.\" The week's double look at one household, structure and relationships in the OpenStax sense and daily work and responsibility in Anderson's sense, is a ready-made last entry on \"where the two see differently, where they meet, and where they do not resolve.\" As you choose which two entries to flag, remember the Growth criterion: \"the practice deepens across the term.\"",
      moves: [
        "Do the week's double look in writing: describe one family or household twice, first as a structure of forms and relationships in the OpenStax sense, then as the daily work and responsibility that keeps it going in Anderson's sense, and write what each way of seeing shows that the other does not.",
        "Then reread your earlier entries, choose the two that best hold both eyes, flag them in the Blackboard journal tool, and add one closing note on where your practice deepened across the term."
      ]
    }
  },
  compiler: {
    /* Grounding: brief submission rules (eleven entries, journal tool on Blackboard, flag two in Week 12);
       browser-only note grounded in the site's own LIMITS text in app.js (saved notes live only in this browser). */
    intro: "This page gathers your saved weekly reflections in one place so you can see your Two-Eyed Seeing practice as a running record. The graded Journal requires four dated entries in two private Blackboard sets: two entries due October 23 and two new entries due December 4. Each entry begins with a specific class artefact, public issue, or low-risk observation, then holds one social science lens beside a named Indigenous or Two-Eyed Seeing course source. Notes saved here live only in this browser on this device, so treat this page as working space and submit the required entries in Blackboard."
  }
};
