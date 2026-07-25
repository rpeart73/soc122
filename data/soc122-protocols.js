/* SOC122 live-class interaction protocols, one entry per SYNCHRONOUS week.
   Synchronous weeks per deliveryMode() in SOC122/_app/app.js: 1, 2, 3, 5, 6, 7, 8, 9, 10, 12
   (weeks 4 and 11 are asynchronous independent learning; 13 and 14 are office hours, no lecture;
   Week 7 is the live cumulative review with no new reading; Week 12 is the final substantive live class).
   Grounding:
   - arrive items and pairShare questions are built from that week's WEEKPAGE reflectPrompt and
     guiding questions in app.js (Week 7 from walkReviewData()).
   - norm lines follow the course's Two-Eyed Seeing framing, attributed throughout the site to
     Mi'kmaw Elder Albert Marshall: seeing with one eye the strengths of Indigenous ways of knowing
     and with the other the strengths of Western ways of knowing, holding both side by side without
     blending or ranking, never trivialized, and never speaking for anyone (app.js Week 2 content;
     Journal brief: "do not speak for anyone").
   Each entry: arrive (come prepared), pairShare (think-pair-share), norm (respectful discussion). */
window.SOC122_PROTOCOLS = {
  byWeek: {
    /* Grounding: WEEKPAGE week 1 reflectPrompt + guiding (sociological imagination; Ermine; Battiste). */
    "1": {
      arrive: "Bring one moment from your own week and be ready to look at it twice: once as private experience, once as something tied to history and social structure.",
      pairShare: "Think of one choice that feels entirely private. With a partner, work out how it is also shaped by history and social structure, then share one example with the room.",
      norm: "Name your own assumptions before speaking across a gap between worldviews, and speak only from your own seat. This prepares the stance you will meet next week: Two-Eyed Seeing, the gift of Mi'kmaw Elder Albert Marshall."
    },
    /* Grounding: WEEKPAGE week 2 reflectPrompt + guiding (Marshall, 2017; Little Bear, 2000). */
    "2": {
      arrive: "Read Marshall (2017) and Little Bear (2000) before class. Bring one sentence, in your own words, on what Two-Eyed Seeing asks of you, and one root difference Little Bear names between Indigenous and Eurocentric worldviews.",
      pairShare: "With a partner, work out the difference between holding two ways of knowing side by side and blending them into one. Why does Marshall (2017) ask you to do the first, not the second?",
      norm: "Two-Eyed Seeing is the gift of Mi'kmaw Elder Albert Marshall. In discussion, hold the strengths of Indigenous and Western ways of knowing side by side: do not rank them, do not blend them into one answer, and do not speak for anyone."
    },
    /* Grounding: WEEKPAGE week 3 reflectPrompt + guiding (Martin, 2012; Brunette-Debassige et al., 2022). */
    "3": {
      arrive: "Bring one course or setting you have been in, with a note on who decided what counted as real knowledge there.",
      pairShare: "Martin (2012) describes pairing rather than ranking. With a partner, work out the difference, and why she treats pairing as something that has to be practised rather than copied.",
      norm: "Credit each scholar by name when you use their idea, and treat Elder Albert Marshall's Two-Eyed Seeing as a serious stance, not a slogan: he asks that it never be trivialized or co-opted into jargon."
    },
    /* Grounding: WEEKPAGE week 5 reflectPrompt + guiding (CBC Marketplace smartphone investigation as methods lab). */
    "5": {
      arrive: "Watch the CBC Marketplace smartphone investigation before class. Bring one moment where the video shows an observation, an association, a plausible mechanism, or a causal claim, and a first judgment on whether the design supports it.",
      pairShare: "Pick one claim from the video together and decide: is it an observation, an association, a plausible mechanism, or a causal claim, and does the design support the move? Then ask how the study would change if the people being studied held co-equal authority over it.",
      norm: "Critique the evidence, not the people in it. Consistent with Elder Albert Marshall's Two-Eyed Seeing, name what the Western research design does well and what it misses, without turning either point into a verdict on the people being studied."
    },
    /* Grounding: WEEKPAGE week 6 reflectPrompt + guiding (OpenStax, 2022; Todd, 2016). */
    "6": {
      arrive: "Bring one idea, practice, or story you have borrowed from a culture that is not your own, and a first thought on what crediting its source would look like.",
      pairShare: "Cultural relativism asks you to understand a practice on its own terms. With a partner, work out how that is different from simply agreeing with it (OpenStax, 2022).",
      norm: "Credit ideas to the people who carry them. Consistent with Elder Albert Marshall's Two-Eyed Seeing, name the thinker behind an idea before you use it, and do not speak for a community that is not your own."
    },
    /* Grounding: walkReviewData() in app.js (Week 7 cumulative review, no new reading; deliveryMode and calendar confirm the live review class). */
    "7": {
      arrive: "No new reading this week. Bring one idea that is holding, one distinction that is still blurring, and the exact source or room you would revisit to repair it.",
      pairShare: "Trade answers with a partner: which idea is holding for you, which distinction is still blurring, and which exact room or source would help you repair it? Agree on one thing each of you will recheck.",
      norm: "Review with both eyes, as Elder Albert Marshall asks: when you revisit an idea, say which eye it came from, keep the two side by side rather than merging them, and keep this class a review, not a hidden new module."
    },
    /* Grounding: WEEKPAGE week 8 reflectPrompt + guiding (OpenStax on socialization; Lawrence on state categories and Foucault). */
    "8": {
      arrive: "Bring one form or category that has asked you to name your identity, with a note on who wrote the boxes and who is left without a box to check.",
      pairShare: "Lawrence shows the state deciding who counts as Indigenous. With a partner, work out what is gained and what is lost when a law, rather than a community, draws that line.",
      norm: "Discuss categories and laws, not classmates. Consistent with Elder Albert Marshall's Two-Eyed Seeing, let each way of knowing speak in its own terms, and never ask anyone to disclose an identity or to speak for a community."
    },
    /* Grounding: WEEKPAGE week 9 reflectPrompt + guiding (OpenStax, 2021; Palmater, 2011). */
    "9": {
      arrive: "Bring one mechanism of stratification you can name from OpenStax (2021) or Palmater (2011), with one sentence on the outcome it produces.",
      pairShare: "Palmater (2011) calls First Nations poverty engineered. With a partner, work out what work the word engineered is doing, and what it rules out.",
      norm: "Keep the two analyses side by side, as Elder Albert Marshall's Two-Eyed Seeing asks: do not collapse Palmater's specific account into the general machinery in OpenStax, do not rank one above the other, and locate causes in structures, not in the people living within them."
    },
    /* Grounding: WEEKPAGE week 10 reflectPrompt + guiding (OpenStax, 2020; Gone, 2023). */
    "10": {
      arrive: "Bring one contextual or structural factor from this week's readings and a note on how Gone (2023) uses it to locate a cause in history and structure rather than inside individuals. Prepare to talk about the ideas, not about yourself or anyone you know.",
      pairShare: "Gone (2023) locates the cause of mental-health inequities in the legacies of colonization rather than inside the individual. With a partner, work out what that move changes about who or what is being explained.",
      norm: "Hold the individual account and the structural account together without merging them, consistent with Elder Albert Marshall's Two-Eyed Seeing, and never diagnose a person or a culture in discussion."
    },
    /* Grounding: WEEKPAGE week 12 reflectPrompt + guiding (OpenStax on family; Anderson on kinship as work); deliveryMode: final substantive live class, bring the Week 11 connection. */
    "12": {
      arrive: "This is the final substantive live class. Bring the connection you prepared in Week 11, plus one family or household you know well, ready to describe it twice: as structure and relationships, and as the daily work that keeps it going.",
      pairShare: "With a partner, work out where the family-as-structure view (OpenStax) and the kinship-as-work view (Anderson) meet, and where they stay distinct. Then test your Week 11 connection on each other.",
      norm: "Practise Elder Albert Marshall's Two-Eyed Seeing out loud: when you offer a synthesis, mark which eye each part comes from, let unresolved differences stay unresolved, and keep the weaving your own rather than speaking for anyone else."
    }
  }
};
