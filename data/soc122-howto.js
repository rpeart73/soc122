/* SOC122 per-page how-to registry (2026-07-25). Every screen carries its own
   "How to use this page" panel so students can teach themselves each surface.
   Pages with a current tour name their own captioned video.
   Collapsed screen aliases (matching the howtoKey pattern):
     library  -> journey   (the library route renders the home journey page)
     detail   -> readings  (Reading Details is the library's detail sub-view)
     reading  -> readings  (Source Practice is covered inside the readings entry)
     activity -> station   (activities are launched from, and return to, a week page)
   explore and map keep their own entries: each renders its own standalone page.
   Plain language, no dashes. */
window.SOC122_HOWTO = {
 "tour": {
  "note": "Silent screen tour with on-screen captions."
 },
 "byScreen": {
  "journey": {
   "title": "How to use your home page",
   "intro": "This page is your course map. Every week is a station on one journey, and everything else on the site hangs off this page.",
   "steps": [
    {
     "do": "Find the current week.",
     "detail": "The highlighted station is where the course is right now. Click any station to open that week's page. Each station's badge tells you how the week runs: live class, asynchronous, or a marker for Study Week."
    },
    {
     "do": "Choose your learning emphasis if you want a different route.",
     "detail": "The Personalize your route bar offers three routes through the course: Two-Eyed Seeing, the default, which comes from Mi'kmaw Elder Albert Marshall, plus Western social science first and Indigenous scholarship first. The route changes the entry point, order, and framing only. Every route carries the same required sources, outcomes, activities, and assessments, and the Indigenous readings are required on every route, never an optional extra."
    },
    {
     "do": "Pick your program lens if you want one.",
     "detail": "The same bar lets you choose your Seneca program or area of study. It personalizes examples and cases to your field. The required curriculum stays the same for everyone, and you can turn it off any time."
    },
    {
     "do": "Use your Study Compass.",
     "detail": "The compass suggests what to do next based on what you have already done on this device. A few fixed rules run in your browser; there is no AI or application backend. Adding your first name is optional and removable."
    },
    {
     "do": "Read your course map.",
     "detail": "The progress panel is a personal orientation mirror showing which weeks you have opened and where browser-saved work sits. The site does not submit or report this activity."
    },
    {
     "do": "Watch the Coming up banner.",
     "detail": "It scrolls the next dates in the course. Pause it any time, or click it to open the full calendar."
    }
   ],
   "saves": "When browser storage is available, your name, emphasis choice, program lens, visited weeks, and saved work may remain in this browser on this device. The site does not submit them to the instructor or Seneca.",
   "graded": "Nothing on this page is graded or reported to your professor. Blackboard is the only official gradebook.",
   "next": "Open the current week's station and start with its Before you begin section."
  },
  "station": {
   "title": "How to use a week page",
   "intro": "Each week page is a complete module: what to read, what the ideas mean, and ways to check yourself. Weeks open folded so you can see the whole shape first.",
   "steps": [
    {
     "do": "Start with the hero card.",
     "detail": "It names the week's question, how the week runs, and a Start button that drops you at the right first section. Live weeks also carry a class recording and updates section."
    },
    {
     "do": "Open sections one at a time.",
     "detail": "Up to two sections stay open at once, and Collapse all folds the page back up. The In this week rail jumps straight to any section."
    },
    {
     "do": "Rate the ideas in Before you begin.",
     "detail": "Mark each idea New to me, Getting it, or I can. You rate the same ideas again at the end of the week to see how far your understanding moved. There is no grade, just your own read."
    },
    {
     "do": "Read the week through your selected route.",
     "detail": "The Learning emphasis section rewrites the week's concepts, terms, and reading order through your route. The required source set never changes: on every route you work the Western reading and the named Indigenous scholar together, each kept whole and attributed."
    },
    {
     "do": "Do the activity and enter the weekly experience.",
     "detail": "The activity turns the week's ideas into decisions you make yourself, and the experience opens the week's interactive world. Both support the readings; neither replaces them."
    },
    {
     "do": "Rehearse with the Study Guide, then take the Knowledge Check.",
     "detail": "The guide flips terms from earlier weeks, asks you to explain ideas back, and climbs a question ladder. The check has three sets: A and B are multiple choice with an honest confidence rating, and Set C brings scenarios, matching, and short written answers you rate yourself. The report names your confident misses; review those first."
    },
    {
     "do": "Close with the reflection and Generate Your Weekly Notes.",
     "detail": "Type your reflection, then generate the Word file. It gathers your check answers, activity summary, and reflection into one record on Seneca letterhead."
    }
   ],
   "saves": "When browser storage is available, your ratings, study guide notes, check history, activity work, and reflections may remain in this browser on this device until site data is cleared.",
   "graded": "Every check on this page is practice and may show a practice score. Nothing is graded, submitted, worth course marks, or reported to your professor; browser-stored practice may remain visible on a shared device until cleared. Blackboard is the official channel for graded work.",
   "next": "When the week feels solid, return Home and open the next station."
  },
  "site": {
   "title": "How to use this page",
   "intro": "This page explains how the whole site works, what belongs on Blackboard, and where the boundaries are.",
   "steps": [
    {
     "do": "Skim the cards in order.",
     "detail": "They cover what stays on Blackboard, what this site never collects or sends, how readings and media are handled, and the site's known limits."
    },
    {
     "do": "Try the Reading Lens.",
     "detail": "The Reading Lens button at the top of every page offers text size, spacing, a high-legibility font, page tints, a reading ruler, a magnifier, and read-aloud."
    },
    {
     "do": "Translate the site if you want another language.",
     "detail": "Right click the page and choose Translate. It happens in your browser, in more than one hundred languages. Machine translation can miss nuance, so check important passages against the original."
    },
    {
     "do": "Know where the guide lives.",
     "detail": "Course Website Instructions in the menu opens the online guide or downloads the PDF copy."
    },
    {
     "do": "Use Report a problem when something breaks.",
     "detail": "It is in the menu on every page. Blackboard remains the reliable path to the instructor."
    },
    {
     "do": "Clear My Work only when you mean it.",
     "detail": "The button at the bottom wipes everything this site has saved in this browser. There is no undo."
    },
    {
     "do": "Back up your saved work.",
     "detail": "When browser storage is available, the Take your saved work with you box downloads the records this site has stored as one file. You can restore that file in another compatible browser or device. The accessibility statement lives here too."
    }
   ],
   "saves": "When browser storage is available, what you type or rate may remain in this browser on this device until you use Clear My Work or clear site data. Browser settings can also prevent or remove it.",
   "graded": "Nothing on this site is graded. Blackboard is the only official gradebook.",
   "next": "Head back Home and open the current week."
  },
  "pathways": {
   "title": "How to use Course Pathways",
   "intro": "This page shows the rhythm of the whole term at once, so no week ever surprises you.",
   "steps": [
    {
     "do": "Read the rhythm first.",
     "detail": "Most weeks meet live. The delivery label on every week page names that week's mode, so you always know how a week works before you plan it."
    },
    {
     "do": "Note the asynchronous weeks and their purpose.",
     "detail": "Week 6 applies the anthropology survey independently, Week 11 is a synthesis point before the final live class, and Weeks 13 and 14 protect focused completion and closure."
    },
    {
     "do": "Follow the five moves each week.",
     "detail": "Prepare, meet or work independently, return for the activity and reflection, save your notes, and carry the strongest work forward."
    },
    {
     "do": "Build the cartography as you go.",
     "detail": "Dated weekly notes and assessment artefacts feed Personal Cartography: Society and Me. Build the five-point route using your dated course work and planning notes."
    },
    {
     "do": "Start with the current week.",
     "detail": "The button at the bottom opens the weekly journey. Blackboard holds all graded submissions."
    }
   ],
   "saves": "This page does not collect or submit student work.",
   "graded": "Nothing here is graded.",
   "next": "Open Calendar and Due Dates to put exact dates against this rhythm."
  },
  "contexts": {
   "title": "How to use the Cultural Comparison Lab",
   "intro": "This lab holds up to three named cultural contexts side by side, with one week's concepts as the lens. It keeps differences visible and makes you name the limits.",
   "steps": [
    {
     "do": "Read the comparison contract first.",
     "detail": "Its rules protect intellectual honesty and keep Indigenous, regional, racial, religious, and national differences from collapsing into one another."
    },
    {
     "do": "Choose a week for the lens.",
     "detail": "The Use the concepts from selector changes which questions the lab asks. Change the week and watch the questions change."
    },
    {
     "do": "Select up to three named contexts.",
     "detail": "Pick contexts that let you test the week's concepts against real, distinct cases."
    },
    {
     "do": "Work the comparison and write your notes.",
     "detail": "Culture can shape meaning and practice, but it never operates alone: law, language, migration, institutions, history, and power also matter. The lab makes you name the limit; it will not write the conclusion for you."
    },
    {
     "do": "Reset when you want a fresh comparison.",
     "detail": "Reset comparison clears your selected contexts so you can start again."
    },
    {
     "do": "Follow the assessment bridge at the end.",
     "detail": "It connects lab thinking to the course assessments. The official instructions stay on Blackboard."
    }
   ],
   "saves": "When browser storage is available, your selected contexts, week choice, and lab notes may remain in this browser on this device until site data is cleared.",
   "graded": "Nothing in the lab is scored. It exists to sharpen your written work.",
   "next": "Carry one difference that must remain into the Course Synthesis page."
  },
  "synthesis": {
   "title": "How to use Course Synthesis",
   "intro": "This page is where the whole course comes together without flattening it. One world does not mean one answer.",
   "steps": [
    {
     "do": "Work the Living World Atlas tabs.",
     "detail": "Each numbered tab is one move in the synthesis. Read the panel and answer its prompt in your own head before moving on."
    },
    {
     "do": "Check your current route panel.",
     "detail": "It shows your program lens and learning emphasis working together on the course's final questions. Change either from the home page; the required curriculum stays identical on every route."
    },
    {
     "do": "Look at the contexts in your orbit.",
     "detail": "Contexts you selected in the Cultural Comparison Lab appear here, still distinct. The globe never merges them into one story."
    },
    {
     "do": "Write your synthesis trail.",
     "detail": "Four personal prompts: one question worth carrying, one source and its job, one difference that must remain, and what follows for you. Each asks for a decision that the site cannot make for you."
    },
    {
     "do": "Treat this as preparation, not assessment prose.",
     "detail": "The official assessment instructions and grading stay on Blackboard. Use these notes to remember your reasoning, then build your own submission from the assigned sources."
    }
   ],
   "saves": "When browser storage is available, your four trail notes may remain in this browser on this device until site data is cleared.",
   "graded": "Nothing here is scored or submitted. Blackboard is the only official channel.",
   "next": "Open Week 14 and carry your trail into the final week's work."
  },
  "readings": {
   "title": "How to use Readings and Media",
   "intro": "This is the course library: every assigned source in one place, each one openable online.",
   "steps": [
    {
     "do": "Filter by week or by topic.",
     "detail": "The two filter rails narrow the collection. Clear the filters to see everything again."
    },
    {
     "do": "Read the perspective pills before you open.",
     "detail": "Cards carry a WESTERN pill for disciplinary sources and an INDIGENOUS pill for named Indigenous scholars. Both are required course material; the pills keep the two eyes visible, never optional."
    },
    {
     "do": "Open a reading's detail page.",
     "detail": "Click a card for the full picture: week, format, perspective, length, level, access, origin, and related sources."
    },
    {
     "do": "Open the full text.",
     "detail": "Open the reading takes you to the source itself in a new tab. The site links to readings; it never rehosts them."
    },
    {
     "do": "Add up to three sources to Compare.",
     "detail": "The columns button on any card sends it to Compare Sources."
    },
    {
     "do": "Practise a source you have read.",
     "detail": "Source Practice in the menu takes one source at a time: guided questions through a lens you choose, a strong response to compare against, quick multiple choice with explanations, and a Word file of your notes."
    }
   ],
   "saves": "When browser storage is available, your Source Practice notes and answers may remain in this browser on this device until site data is cleared. Filters last only for this visit.",
   "graded": "Source Practice may show which responses match the source evidence, but it is not graded, submitted, or worth course marks.",
   "next": "Take a week's Western and Indigenous reading into Compare Sources and hold them together."
  },
  "compare": {
   "title": "How to use Compare Sources",
   "intro": "Comparison is where the course's two-eyed thinking gets real. This page holds up to three sources next to each other, each one kept whole and attributed.",
   "steps": [
    {
     "do": "Pick up to three sources from the list on the right.",
     "detail": "Pairing a week's Western and Indigenous reading shows both eyes on the same topic."
    },
    {
     "do": "Read the columns.",
     "detail": "Each column keeps the source's week, year, perspective, origin, length, and core idea visible, side by side."
    },
    {
     "do": "Ask for the worked weaving when you have two or more.",
     "detail": "Show a worked weaving builds one example of holding the sources together. It is the app's example of the practice, not the answer, and it hands the real question back to you."
    },
    {
     "do": "Keep what helps.",
     "detail": "Copy or print the weaving, or save it to your notes on this device."
    },
    {
     "do": "Do your own weaving.",
     "detail": "Two-Eyed Seeing asks what each reading lets you see that the other cannot. Write that in your own words; that is the thinking your assessments ask for."
    }
   ],
   "saves": "When browser storage is available, a saved weaving may remain in this browser on this device until site data is cleared. Your comparison picks last only for this visit.",
   "graded": "Comparisons are never graded.",
   "next": "Carry the comparison into this week's reflection or your Two-Eyed Seeing Observation Journal work."
  },
  "walkthroughs": {
   "title": "How to use Weekly Experiences",
   "intro": "Each teaching week opens a different interactive world. The navigation stays the same; the encounter does not repeat.",
   "steps": [
    {
     "do": "Pick a week and enter.",
     "detail": "The experience opens over the page, and nothing behind it is lost. If you have been in before, the button reads Re-enter and you resume where you left off."
    },
    {
     "do": "Press Enter the experience, then move chapter by chapter.",
     "detail": "Use Previous and Next, the chapter dots, the arrow keys, or a swipe on a touch screen. The bar at the top shows your progress."
    },
    {
     "do": "Do what the world asks.",
     "detail": "Chapters invite you to choose, sort, open, and weigh things, including opening both eyes on a Two-Eyed Seeing frame. Take the invitations; they are the teaching."
    },
    {
     "do": "Adjust the text if you need to.",
     "detail": "The A minus and A plus controls resize the experience text, and Reset restores it."
    },
    {
     "do": "Leave any time; return any time.",
     "detail": "The X button or the Escape key closes the experience and returns you to the page you came from. Start again restarts the week from the top."
    }
   ],
   "saves": "When browser storage is available, your place in each experience may remain in this browser on this device until site data is cleared.",
   "graded": "Experiences are teaching, not testing. Nothing is scored.",
   "next": "After an experience, open the same week's Study Guide to lock the idea in."
  },
  "videos": {
   "title": "How to use Videos and Podcasts",
   "intro": "This gallery collects scholar media for the course: the researchers and knowledge holders you are reading, speaking for themselves.",
   "steps": [
    {
     "do": "Filter by week or by type.",
     "detail": "The tabs narrow the gallery to one week, or to videos or podcasts only."
    },
    {
     "do": "Read the card before you press play.",
     "detail": "Each card names the scholar, what to watch or listen for, and which reading to open next. Media is an on-ramp into a source, not a replacement for reading it."
    },
    {
     "do": "Load the player only when you are ready.",
     "detail": "No third-party content loads automatically. YouTube plays in privacy-enhanced mode after you press Load official player; other items contact the official source site only when you choose to open them."
    },
    {
     "do": "Write your Reading Rescue note.",
     "detail": "After the media, write one sentence you can prove from the reading. That sentence keeps the media tied to evidence."
    },
    {
     "do": "Use the field prompt if your lens is on.",
     "detail": "With a program lens chosen, each card adds a prompt that turns the media into a concrete question about your future work."
    }
   ],
   "saves": "When browser storage is available, your Reading Rescue notes and program lens choice may remain in this browser on this device until site data is cleared.",
   "graded": "The companion site does not record or grade which media you play. Loading external media contacts its provider under that provider's privacy practices.",
   "next": "Open the reading the card points to in Readings and Media."
  },
  "glossary": {
   "title": "How to use the Glossary",
   "intro": "Every course concept in plain words, week by week, together with the scholars behind the readings.",
   "steps": [
    {
     "do": "Search every concept.",
     "detail": "Type any term and matching definitions appear, each carrying the citation it comes from."
    },
    {
     "do": "Or browse by week.",
     "detail": "Each week lists its concepts and the scholars assigned that week, so you can revisit the fuller context."
    },
    {
     "do": "Note the perspective pills.",
     "detail": "Scholars carry WESTERN or INDIGENOUS pills so you always know whose knowledge you are using and can attribute it properly."
    },
    {
     "do": "Follow a scholar to their reading.",
     "detail": "Click a scholar's name to open the details of the source they wrote."
    }
   ],
   "saves": "Your current search and week choice may remain for this browser session. The page does not submit graded work.",
   "graded": "Nothing here is graded.",
   "next": "Turn concepts into memory with Concept Flashcards."
  },
  "cards": {
   "title": "How to use Concept Flashcards",
   "intro": "One flip card per course concept: the concept in front, the definition behind.",
   "steps": [
    {
     "do": "Try to answer before you flip.",
     "detail": "Recalling before revealing is what makes flashcards work. Guessing first, even wrongly, strengthens the memory."
    },
    {
     "do": "Filter by week.",
     "detail": "Before a Knowledge Check, run the cards for that week plus one earlier week."
    },
    {
     "do": "Work the Self-Check Studio.",
     "detail": "With a week selected, the studio pairs that week's Western and Indigenous readings as two attributed eyes, gives you a quick check, and can save a Word record of your work."
    },
    {
     "do": "Say the definition out loud in your own words.",
     "detail": "If you can only repeat the card's wording, flip it again tomorrow."
    }
   ],
   "saves": "When browser storage is available, your studio answers may remain in this browser on this device until site data is cleared. The cards themselves store nothing.",
   "graded": "Cards and the studio are self-study. The studio may show which response is best supported, but it is not graded, submitted, or worth course marks.",
   "next": "Take the week's Knowledge Check and see what stuck."
  },
  "assignments": {
   "title": "How to use Understanding Your Assignment",
   "intro": "This page helps you read each assessment, see the course ideas it needs, and plan your start so the blank page never wins.",
   "steps": [
    {
     "do": "Walk the five assessments in order.",
     "detail": "The five assessments move from social location and observation to research choices, community responsibility, and Personal Cartography: Society and Me. Each item names its purpose and timing."
    },
    {
     "do": "Keep the journal grounded.",
     "detail": "Two-Eyed Seeing Observation Journal entries always work from the named source, in respectful, attributed language. That standard holds on every route."
    },
    {
     "do": "Read the dates and the integrity notes.",
     "detail": "Due dates cluster; see them early. And if an academic-integrity concern ever arises, the instructor contacts you first and you get the chance to explain your process."
    },
    {
     "do": "Open the Assignment Start Lab when you are stuck.",
     "detail": "Add your assignment, progress, exact sticking point, and available time. Fixed course rules build a personal start plan, without AI. You can print it or save it as a PDF."
    },
    {
     "do": "Submit on Blackboard, always.",
     "detail": "This site helps you plan. The official instructions, rubric, submission, and grade all live on Blackboard."
    }
   ],
   "saves": "When browser storage is available, your Assignment Start Lab answers may remain in this browser on this device until site data is cleared. The site does not submit them.",
   "graded": "Nothing here is graded. Blackboard is the only submission channel.",
   "next": "Choose a realistic work block, open the lab, and leave with a plan."
  },
  "career": {
   "title": "How to use Career Choices",
   "intro": "This page connects SOC122 to your own field of study, whatever you are here to become.",
   "steps": [
    {
     "do": "Choose your program lens.",
     "detail": "Pick your area of study or your exact Seneca program. General stream and Still exploring are real options with their own write-ups."
    },
    {
     "do": "Read the field write-up.",
     "detail": "It shows the course's ideas operating in your field's world and gives you a question to carry through the term."
    },
    {
     "do": "Remember what the lens never changes.",
     "detail": "The required sources, outcomes, activities, assessments, and grading are identical for every student. The lens changes examples and framing only."
    },
    {
     "do": "Write the reflection.",
     "detail": "One honest sentence about where this course already shows up in your field is a seed for assignments later."
    },
    {
     "do": "Watch the lens follow you.",
     "detail": "Once chosen, week pages, activities, media cards, and the synthesis page all speak to your field. Turn it off any time by choosing General stream."
    }
   ],
   "saves": "When browser storage is available, your field choice and reflections may remain in this browser on this device until site data is cleared.",
   "graded": "The graded curriculum is identical for every student. Nothing on this page is scored.",
   "next": "Open the current week and watch the field translation appear inside its concepts."
  },
  "explore": {
   "title": "How to use Ways to go deeper",
   "intro": "This small hub gathers the site's practice rooms in one place. Pick the door that matches what you need today.",
   "steps": [
    {
     "do": "Open Personal Cartography.",
     "detail": "Place each week on a map of scholars, Nations, and ideas, and keep your own notes."
    },
    {
     "do": "Open the Self-Check Studio.",
     "detail": "Practise with a week's readings and save your work."
    },
    {
     "do": "Open Compare readings.",
     "detail": "Hold any two readings side by side and see where they meet."
    },
    {
     "do": "Open Build reading comprehension.",
     "detail": "Read one source closely with guided questions, then check yourself."
    }
   ],
   "saves": "This hub does not collect student work. When browser storage is available, work from its linked rooms may remain in this browser on this device until site data is cleared.",
   "graded": "Nothing behind these doors is graded.",
   "next": "Start with the room the current week's page pointed you toward."
  },
  "map": {
   "title": "How to use Personal Cartography",
   "intro": "Each pin marks where an Indigenous scholar assigned this term locates their own Nation. The map turns the course's scholars into places, and your notes into a record you keep.",
   "steps": [
    {
     "do": "Read the caveat first.",
     "detail": "This is a self-contained teaching map with approximate reading anchors, not a legal or definitive boundary map."
    },
    {
     "do": "Tap a pin.",
     "detail": "Meet the scholar, the Nation and place they name, the concept they carry, and the readings they anchor."
    },
    {
     "do": "Switch layers.",
     "detail": "Toggle between the administrative view and the Indigenous scholar anchors to feel how differently the same land can be described."
    },
    {
     "do": "Write what each place makes visible.",
     "detail": "The note box asks for your own words, one anchor at a time. A named place beats a general impression."
    },
    {
     "do": "Save your map notes.",
     "detail": "The save button makes a Word file of your selected anchor and your notes."
    },
    {
     "do": "Bring the map to Weeks 13 and 14.",
     "detail": "The final weeks return to your cartography. The more you note now, the more you have to work with then."
    }
   ],
   "saves": "When browser storage is available, your map notes may remain in this browser on this device until site data is cleared. The pin and layer you pick last only for this visit.",
   "graded": "This work is not submitted or scored by the site. On a shared device, browser-stored notes may remain visible until you clear them; graded cartography work is submitted on Blackboard.",
   "next": "Add the current week's scholar to your notes while the reading is fresh."
  },
  "calendar": {
   "title": "How to use Calendar and Due Dates",
   "intro": "Every date and delivery mode that matters, in one place.",
   "steps": [
    {
     "do": "Learn the colours first.",
     "detail": "Seneca red marks due dates. Black marks live classes. Grey marks asynchronous weeks with no lecture, and a light outline marks Study Week."
    },
    {
     "do": "Scan the month grids.",
     "detail": "September through December sit side by side, so you can see where deadlines cluster before they are close."
    },
    {
     "do": "Check the assessment date lists.",
     "detail": "Below the grids, every assessment date and the full class and asynchronous schedule appear as plain rows."
    },
    {
     "do": "Subscribe on your phone.",
     "detail": "The subscription is a live calendar feed, not a downloaded copy, so your calendar app can refresh when the course schedule changes."
    },
    {
     "do": "Treat Blackboard as the official source.",
     "detail": "If anything ever differs, Blackboard and your professor's announcements win."
    }
   ],
   "saves": "This page does not collect or submit student work.",
   "graded": "Nothing here is graded.",
   "next": "Put the due date clusters into your own planner now, before they are close."
  },
  "review": {
   "title": "How to use Term Review",
   "intro": "This page mixes practice questions from every week so far into one set, so ideas stay alive instead of fading after their week ends.",
   "steps": [
    {
     "do": "Answer, then mark how sure you were.",
     "detail": "Pick an answer, choose Guessing, Think so, or Sure, then press See how I did. The reveal explains the right answer and what each wrong option gets wrong."
    },
    {
     "do": "Trust the ordering.",
     "detail": "Questions you have missed before come first. That is deliberate: reviewing what almost stuck is worth more than repeating what already has."
    },
    {
     "do": "Read the calibration report at the end.",
     "detail": "It sorts the set into mastered, fragile, confident misses, and growing edges. Confident misses are gold: ideas that feel settled but are not."
    },
    {
     "do": "Follow the revisit buttons.",
     "detail": "Every item links back to its home week. Reread the concept, then run another set."
    },
    {
     "do": "Come back weekly.",
     "detail": "Two short mixed sets a week beat one long cram. The pool grows as the course does."
    }
   ],
   "saves": "When browser storage is available, your practice history may remain in this browser and feed the missed-first ordering here and in the weekly Knowledge Checks until site data is cleared.",
   "graded": "Term Review may show a scored practice result for calibration. It is not graded, submitted, worth course marks, or sent to your professor.",
   "next": "Run one set now, then revisit the week your confident misses point at."
  },
  "outcomes": {
   "title": "How to use What This Course Builds",
   "intro": "This page shows the official course learning outcomes and the Ontario employability skills behind every week, so you can always see why the work exists.",
   "steps": [
    {
     "do": "Read the outcomes as promises.",
     "detail": "Each one names something you will be able to do by the end. They are the same for every student on every route through the course."
    },
    {
     "do": "Use the week buttons.",
     "detail": "Each outcome lists the weeks that build it. If an outcome feels shaky, those weeks are where to go."
    },
    {
     "do": "Check the assessment lines.",
     "detail": "Each outcome names the assessments that measure it, so no graded task ever comes out of nowhere."
    },
    {
     "do": "Notice the skills employers name.",
     "detail": "The Essential Employability Skills list is what Ontario colleges promise every graduate. This course practises the ones shown."
    }
   ],
   "saves": "This page does not collect or submit student work.",
   "graded": "Nothing here is graded. Blackboard carries the official documents.",
   "next": "Open a week one of your shakier outcomes points at."
  }
 }
};
