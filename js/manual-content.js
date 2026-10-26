/* ============================================================================
   SAT Toolkit — Conteúdo do manual (EN / ES)
   ----------------------------------------------------------------------------
   Ficheiro separado do i18n.js de propósito: o i18n guarda a "moldura" da
   interface (botões, rótulos, alertas), que é curta e muda pouco. O manual é
   texto longo e evolui por si. Misturar os dois tornaria o i18n.js impossível
   de manter.

   Vocabulário de blocos usado abaixo:
     {t:'p',     x:'…'}                          parágrafo
     {t:'h3',    x:'…'}                          subtítulo dentro da secção
     {t:'key',   x:'…'}                          a regra destacada (🔑)
     {t:'warn',  x:'…'}                          aviso
     {t:'tip',   x:'…'}                          dica
     {t:'quote', x:'…'}                          bloco citado / modelo de texto
     {t:'ul',    items:[…]}                      lista
     {t:'table', head:[…], rows:[[…]]}           tabela
     {t:'code',  x:'…'}                          bloco monoespaçado
     {t:'case',  x:'…'}                          enunciado do caso

   Regra de conteúdo: texto próprio. Nenhuma passagem reproduzida dos livros.
   ============================================================================ */

const MANUAL = {

/* ========================================================================== */
/*  INGLÊS                                                                    */
/* ========================================================================== */
en: {
  title: 'How to use Analysis of Competing Hypotheses',
  subtitle: 'Learning to think with ACH, not just to click through it',
  intro: 'This manual teaches the technique, not the buttons. By the end you should be able to take a problem of your own and work it from scratch. Read in order. Part 3 is a complete case, start to finish, telling you exactly what to write in each box.',
  caseToggleLabel: 'Worked example',
  caseIntel: 'Intelligence',
  caseBiz: 'Business',
  caseNoteIntel: 'This is the same case that is built into the tool. You can follow along by typing it yourself, or press Load example at any time to see the finished matrix and compare.',
  caseNoteBiz: 'Same technique, same eight steps, different subject. If you have already read the intelligence case, this one shows that the skeleton does not change.',
  backToTool: 'Back to the tool',
  contents: 'Contents',

  sections: [
    /* ------------------------------------------------------------------ */
    { id: 'idea', title: '1. The core idea', blocks: [
      { t:'h3', x:'The mistake everyone makes' },
      { t:'p',  x:'You get home and the living room light is on. You think: I must have left it on.' },
      { t:'p',  x:'From then on, everything fits. The door was locked — of course, I locked it. Nothing was moved — of course, nobody came in. The car is in the garage. Every observation confirms your first idea, and you feel steadily more certain.' },
      { t:'p',  x:'The problem: all of that would fit equally well if somebody had let themselves in with a key and left without disturbing anything. You tested nothing. You collected things compatible with what you already believed.' },
      { t:'p',  x:'This has a name — confirmation bias — and it is why experienced analysts get things wrong.' },

      { t:'h3', x:'What ACH reverses' },
      { t:'p',  x:'Instead of asking "what supports my idea?", you ask "what counts against each of the possible ideas?" The conclusion then follows a rule that sounds strange at first.' },
      { t:'key', x:'The strongest hypothesis is the one with the least against it — not the one with the most in its favour.' },
      { t:'p',  x:'Why? Because you cannot prove something true. A piece of evidence favouring your idea usually favours three other ideas just as well. But a single solid piece of evidence against a hypothesis is enough to eliminate it. That is how a good detective works: not by confirming the favourite suspect, but by finding the alibi that removes suspects.' },

      { t:'h3', x:'Thirty seconds of it' },
      { t:'p',  x:'Three hypotheses about why your train is late:' },
      { t:'table', head:['', 'H1 Breakdown', 'H2 Strike', 'H3 Accident on the line'], rows:[
        ['The board says "delayed"', 'fits', 'fits', 'fits'],
        ['Other trains are running', '', 'does NOT fit', ''],
      ]},
      { t:'p',  x:'The first item looks important and is worth nothing: it fits all three, so it cannot help you choose. The second is gold — it eliminates the strike on its own.' },
      { t:'key', x:'Information that fits every hypothesis tells you nothing. It is noise.' },
      { t:'p',  x:'The tool calls this diagnostic value. An item with high diagnostic value is one that pulls the hypotheses apart.' },
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'concepts', title: '2. The five concepts', blocks: [
      { t:'h3', x:'1. Hypothesis' },
      { t:'p',  x:'A possible explanation, written as a statement that could be shown to be false.' },
      { t:'table', head:['Not a hypothesis', 'A hypothesis'], rows:[
        ['"Why did they move troops?"', '"They moved troops to prepare an attack."'],
        ['"Something may be going on"', '"The nuclear programme has reached test stage."'],
        ['"The situation is worrying"', '"The adversary will test before the end of the year."'],
      ]},
      { t:'warn', x:'Hypotheses must be mutually exclusive: if one is true, the others must be false. This is the easiest rule to break without noticing. Part 4 shows a real error we made in this very tool.' },

      { t:'h3', x:'2. Evidence — which here means far more than "proof"' },
      { t:'p',  x:'In ACH, evidence is everything that shapes your thinking. The source book lists four kinds, and the tool asks you to tag each item:' },
      { t:'table', head:['Type', 'What it is', 'Example'], rows:[
        ['Reporting / fact', 'Something observed or reported', 'Increased vehicle movement at the test site'],
        ['Argument', 'A piece of your own reasoning', 'A test now would bring sanctions they cannot absorb'],
        ['Assumption', 'Something you are taking for granted', 'I assume they need a test to validate the design'],
        ['Absent evidence', 'What you would expect to see and do not', 'No sign of evacuation in nearby settlements'],
      ]},
      { t:'key', x:'The last two are the ones that make the difference.' },
      { t:'p',  x:'On assumptions: analyses rarely fail because the information was wrong. They fail because of an assumption nobody wrote down and therefore nobody questioned. If you do not write it, you cannot challenge it.' },
      { t:'p',  x:'On absences: in one Sherlock Holmes story the decisive clue is that the dog did not bark — so the intruder was known to it. What did not happen is information. In the worked case below, an absence turns out to be the single most valuable item.' },

      { t:'h3', x:'3. Consistent / Inconsistent' },
      { t:'p',  x:'For every crossing of an item with a hypothesis you ask one question: if this hypothesis were true, would I expect to see this?' },
      { t:'table', head:['Answer', 'Mark'], rows:[
        ['Yes', 'C — Consistent'],
        ['Yes, strongly', 'CC — Strongly consistent'],
        ['No', 'I — Inconsistent'],
        ['No, and this destroys the hypothesis', 'II — Strongly inconsistent'],
        ['This says nothing about this hypothesis', '· — leave empty'],
      ]},

      { t:'h3', x:'4. Diagnostic value' },
      { t:'p',  x:'How far an item pulls the hypotheses apart. The tool works it out and shows a label beside each row. "No diagnostic value" means that row is not helping you. A high number means it is one of the rows carrying your conclusion.' },

      { t:'h3', x:'5. The golden rule' },
      { t:'key', x:'Least against wins. Most in favour does not.' },
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'walkthrough', title: '3. A case, step by step', hasCases: true },

    /* ------------------------------------------------------------------ */
    { id: 'hypotheses', title: '4. Writing good hypotheses', blocks: [
      { t:'table', head:['Weak', 'Problem', 'Better'], rows:[
        ['"Something is going on in Country X"', 'Too vague to be refuted', '"X is preparing a test"'],
        ['"Will they test?"', 'It is a question', '"X will test within six months"'],
        ['"They may be preparing or bluffing"', 'Two hypotheses glued together', 'Split it in two'],
        ['"X will test in March at the northern site with a 20 kt device"', 'So detailed it is almost certain to be false', '"X will test within six months"'],
      ]},

      { t:'h3', x:'The mutual-exclusivity error — a real one, ours' },
      { t:'p',  x:'This tool shipped with a flaw. The example hypotheses were:' },
      { t:'ul', items:[
        'H2 — X has no intention of testing in this period',
        'H3 — X is staging activity to bluff, without intending to test',
      ]},
      { t:'p',  x:'Read them again. If H3 is true, H2 is also true — H3 says "without intending to test" in as many words. One contains the other. That breaks mutual exclusivity, and a matrix built like that distributes the evidence wrongly.' },
      { t:'p',  x:'The fix was to change the axis of the distinction. Instead of separating them by intention to test — which was identical in both — they are now separated by the nature of the activity:' },
      { t:'ul', items:[
        'H2 — the activity is routine, and was never meant to be noticed',
        'H3 — the activity is staged, and was meant to be noticed',
      ]},
      { t:'p',  x:'Now they exclude each other: activity is either routine or theatre. It cannot be both.' },
      { t:'key', x:'This error is easy to make and hard to see. After writing your hypotheses, test them in pairs: could these two be true at the same time? If yes, rewrite.' },

      { t:'h3', x:'A second quick test' },
      { t:'p',  x:'After writing a hypothesis, ask: what information, if I found it, would force me to cross this out? If you cannot answer, the hypothesis is badly written.' },
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'mistakes', title: '5. The most common mistakes', blocks: [
      { t:'table', head:['Mistake', 'How it shows', 'The fix'], rows:[
        ['Only two hypotheses', 'It becomes "either this or that"', 'Push yourself to four. The third and fourth are the ones that teach'],
        ['Overlapping hypotheses', 'One looks like a special case of another', 'Test them in pairs. See Part 4'],
        ['Working down the columns', 'It feels like it is going suspiciously fast', 'Start again and go row by row'],
        ['Only facts, no assumptions', 'The matrix does not match your intuition', 'Write down what you are taking for granted'],
        ['Deleting the rows worth nothing', 'You lose the record', 'Keep them. They are the proof you considered them'],
        ['Treating the score as an answer', 'You accept the result without thinking', 'It is a ranking to think with, not a verdict'],
        ['Reading zero as strength', 'A hypothesis wins with nothing against it and you celebrate', 'It may just be untested. The panel warns you'],
        ['Dismissing deception for lack of signs', '"No evidence of it, so it is not happening"', 'No signs is exactly what a good operation produces'],
        ['Arriving with the answer decided', 'Everything ends up confirming what you already thought', 'The technique does not protect someone who has already decided. This is a real limit'],
      ]},
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'card', title: '6. Quick reference', blocks: [
      { t:'code', x:
'1. HYPOTHESES   > Every explanation. Four or five. Mutually exclusive.\n' +
'                 Test in pairs: "could both be true?"\n' +
'                 Always include a deception hypothesis.\n\n' +
'2. EVIDENCE     > Facts + arguments + ASSUMPTIONS + ABSENCES.\n' +
'                 Ask: "if this were true, what should I be seeing?"\n\n' +
'3. MATRIX       > ACROSS, one row at a time. Never down the columns.\n' +
'                 "It depends on..."? > write it in the cell note.\n\n' +
'4. REFINE       > Merge inseparable hypotheses. Mark the noise. Delete nothing.\n\n' +
'5. CONCLUSIONS  > Least against wins.\n' +
'                 Zero against is not the same as strong.\n' +
'                 Disagree with it? Something never made it into the matrix.\n\n' +
'6. SENSITIVITY  > What is flagged is holding everything up. Attack it.\n\n' +
'7. REPORT       > Cover EVERY hypothesis. Review your assumptions.\n\n' +
'8. INDICATORS   > Two lists. What would strengthen. What would undermine.' },
      { t:'h3', x:'Four sentences to take away' },
      { t:'ul', items:[
        'Least against wins — not most in favour.',
        'Information that fits everything is worth nothing.',
        'If your sentence began with "it depends on…", you have found an assumption. Write it down.',
        'A hypothesis with nothing against it may be untested rather than strong.',
      ]},
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'buttons', title: '7. The tool, button by button', blocks: [
      { t:'table', head:['Button', 'What it does'], rows:[
        ['Load example', 'Loads the worked case already filled in'],
        ['Save / Load', 'Stores the analysis in your own browser. Nothing leaves your computer'],
        ['New analysis', 'Clears everything and starts over'],
        ['Export PDF', 'A formatted report: matrix, ranking, assumptions and sources'],
        ['Export image', 'A PNG of the matrix alone, for a presentation'],
        ['English / Español', 'Changes the interface language. What you wrote is not translated'],
        ['?', 'The technique and its sources'],
      ]},
      { t:'h3', x:'Standard mode vs. Advanced mode' },
      { t:'p',  x:'Standard mode is ACH as it is done on paper. Every item weighs the same. Only C, CC, I, II and empty, and a straight count.' },
      { t:'p',  x:'Advanced mode adds two boxes per item — source credibility and relevance — and the score becomes weighted, so a contradiction from a solid source outweighs one from a rumour. In the worked case this matters: item E4 comes from a weak source, and in advanced mode it stops dragging the conclusion so hard.' },
      { t:'tip', x:'Start in standard mode until you have done two or three analyses. Advanced mode earns its keep when your sources vary a lot in quality.' },
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'fit', title: '8. Which questions suit ACH', blocks: [
      { t:'h3', x:'It works well for' },
      { t:'ul', items:[
        'Why did actor X do Y? — several rival explanations for one fact',
        'Which of these groups is responsible? — the hypotheses are candidates that exclude each other',
        'Is this source genuine, or is it being manipulated?',
        'Is the programme still in development, or already operational?',
        'What is being built with this imported component?',
      ]},
      { t:'p',  x:'The common thread: one question, several possible answers that cannot all be true at once, and enough information to test them.' },
      { t:'h3', x:'It works badly for' },
      { t:'table', head:['Kind of question', 'Why not'], rows:[
        ['"Should we intervene?"', 'A value judgment. ACH describes; it does not decide policy'],
        ['"What will happen in the Sahel?"', 'Far too broad. Break it into smaller questions first'],
        ['"How many missiles do they have?"', 'Not a choice between explanations — it is a quantity estimate'],
        ['Questions already answered', 'With no rival hypotheses there is nothing to test'],
      ]},
      { t:'h3', x:'The same skeleton, other fields' },
      { t:'p',  x:'This is not only a state-intelligence technique. It works in fraud investigation, competitive analysis, information security and investigative journalism — anywhere there are rival explanations and the cost of being wrong is high.' },
    ]},

    /* ------------------------------------------------------------------ */
    { id: 'sources', title: 'Sources', blocks: [
      { t:'p', x:'The technique is not ours. It comes from:' },
      { t:'ul', items:[
        'Heuer, Richards J. Jr. — Psychology of Intelligence Analysis, ch. 8. CIA Center for the Study of Intelligence, 1999. (Public domain.) The text in which ACH was first published.',
        'Heuer, R. J. Jr. & Pherson, R. H. — Structured Analytic Techniques for Intelligence Analysis, § 7.3. The reference version of the procedure, including the C/CC/I/II notation and the four kinds of input that go into the matrix.',
        'Pherson, K. H. & Pherson, R. H. — Critical Thinking for Strategic Intelligence, ch. 13. Criteria for a good hypothesis and how the technique sits in the wider analytic process.',
      ]},
      { t:'p', x:'Every explanatory passage here is written in our own words. Nothing is reproduced from the source books. The cases are invented for teaching.' },
      { t:'warn', x:'Needs verification: two of the tool\'s formulas — the weighted score and the measure of diagnostic value — are our own implementation, because the books describe the concepts but do not publish the arithmetic. Treat those numbers as an aid, not as an authoritative reproduction.' },
    ]},
  ],

  /* ---- Caso resolvido: inteligência ---- */
  intel: {
    statement: 'You follow Country X\'s nuclear programme. Over recent weeks, surveillance has picked up unusual movement at the test site. Your question: will the government of Country X carry out a nuclear test in the next six months?',
    steps: [
      { n:1, title:'Hypotheses', blocks:[
        { t:'p', x:'Before clicking anything: what are all the possible explanations? Do not judge how likely they are yet. Just list them. Do not stop at the first one that looks good — that is where almost everyone fails.' },
        { t:'p', x:'Press Add hypothesis three times and write:' },
        { t:'table', head:['', 'Hypothesis', 'Story'], rows:[
          ['H1', 'X is preparing a test and is concealing the preparations.', 'The programme has reached the point where a test is technically necessary, and the leadership is hiding it to avoid sanctions before the fact.'],
          ['H2', 'X is not preparing a test; the observed activity is routine.', 'What we see is ordinary maintenance and rotation at the site, and it was never meant to be noticed.'],
          ['H3', 'X is not preparing a test, but is deliberately staging visible activity to gain leverage.', 'The activity is genuine but theatrical: it is meant to be detected, in order to extract concessions in the current talks.'],
        ]},
        { t:'p', x:'Now press Add deception hypothesis and replace the text with:' },
        { t:'table', head:['', 'Hypothesis', 'Story'], rows:[
          ['H4', 'The reporting reaching us is being fabricated or planted.', 'The activity may be unremarkable; what is being manipulated is our picture of it. Absence of proof of this is expected, not reassuring.'],
        ]},
        { t:'h3', x:'Look at how these four separate' },
        { t:'table', head:['', 'Real activity?', 'Intention to test?', 'What is manipulated'], rows:[
          ['H1', 'Yes', 'Yes', '—'],
          ['H2', 'Yes, routine', 'No', '—'],
          ['H3', 'Yes, staged', 'No', 'Our perception, through real activity'],
          ['H4', 'Perhaps not even that', '—', 'The information reaching us'],
        ]},
        { t:'key', x:'If one is true, the other three must be false. That is the test.' },
        { t:'warn', x:'Why H4 always exists: if somebody is deliberately deceiving you, you are not supposed to see signs of it. A well-run operation leaves no trace. You cannot rule this out for lack of indications — the lack is exactly what you would expect if the deception were working.' },
        { t:'tip', x:'Fewer than three hypotheses and some are almost certainly missing. More than seven and nobody can hold them at once — merge the closest. Four or five is usually the sweet spot.' },
      ]},

      { n:2, title:'Evidence', blocks:[
        { t:'p', x:'Do not sit staring at the ceiling. For each hypothesis ask: if this were true, what should I be seeing? Then: am I seeing it? If not, why not? That generates facts and absences at the same time.' },
        { t:'p', x:'Press Add item six times:' },
        { t:'table', head:['', 'Text', 'Type'], rows:[
          ['E1', 'Increased vehicle movement at the test site over the last eight weeks', 'Reporting / fact'],
          ['E2', 'The head of state publicly denied any intention to test', 'Reporting / fact'],
          ['E3', 'No evacuation or safety preparations observed in nearby settlements', 'Absent evidence'],
          ['E4', 'A single source with indirect access reports a test order was issued', 'Reporting / fact'],
          ['E5', 'I assume a state at this stage of a weapons programme needs a test to validate the design', 'Assumption'],
          ['E6', 'A diplomatic delegation quietly cancelled scheduled travel for next month', 'Reporting / fact'],
        ]},
        { t:'tip', x:'In advanced mode, set credibility: E1 and E3 are your own verifiable observation — High. E2 is a public statement, where everyone denies everything — Low. E4 is a single source with indirect access, the classic profile of reporting that has misled entire services — Low.' },
        { t:'warn', x:'The most common mistake here is listing only facts. Without at least one assumption and one absence, the matrix does not reflect how you actually think — and the panel on the right will tell you so.' },
      ]},

      { n:3, title:'Matrix', blocks:[
        { t:'key', x:'Work across, one row at a time. Never down the columns.' },
        { t:'p', x:'Take E1 and go through H1, H2, H3, H4. Only then move to E2. Why? Going down a column is the old habit: looking at one hypothesis and gathering things that support it. Going across forces you to ask what that same item means for every explanation.' },
        { t:'p', x:'Clicking a cell cycles it: empty > C > CC > I > II > empty.' },
        { t:'h3', x:'Row E1 — vehicle movement has increased' },
        { t:'table', head:['', 'Reasoning', 'Mark'], rows:[
          ['H1 preparing', 'Exactly what you would expect', 'CC'],
          ['H2 routine', '"Increased" contradicts "routine" by definition', 'I'],
          ['H3 staging', 'Precisely what you would stage to be seen', 'CC'],
          ['H4 planted reporting', 'Compatible', 'C'],
        ]},
        { t:'h3', x:'Row E2 — the head of state denied it' },
        { t:'p', x:'Governments deny, whatever they are doing. It fits all four: C, C, C, C. This row will come back marked "No diagnostic value". It is noise — but do not delete it. It is part of the record that you considered it.' },
        { t:'h3', x:'Row E3 — no evacuation observed (an absence)' },
        { t:'table', head:['', 'Reasoning', 'Mark'], rows:[
          ['H1 preparing', 'A real test brings safety preparations. The absence bites deep', 'II'],
          ['H2 routine', 'Makes perfect sense that there is nothing', 'C'],
          ['H3 staging', 'Staging requires no real safety work — this is the tell', 'CC'],
          ['H4 planted reporting', 'Compatible', 'C'],
        ]},
        { t:'tip', x:'Watch this row. It will turn out to have the highest diagnostic value in the whole case — and it is not a fact, it is an absence. It is the dog that did not bark.' },
        { t:'h3', x:'Row E4 — single source, indirect access' },
        { t:'table', head:['', 'Mark'], rows:[
          ['H1 preparing', 'CC'],
          ['H2 routine', 'I'],
          ['H3 staging', 'C — see below'],
          ['H4 planted reporting', 'CC — a single indirect source is exactly what planted reporting looks like'],
        ]},
        { t:'h3', x:'This cell is arguable — and that is the lesson' },
        { t:'p', x:'E4 against H3 has no obvious answer. Two defensible readings: consistent, because anyone staging a crisis also wants the rumours to circulate; or inconsistent, because an actual test order is real preparation, and H3 says there is none.' },
        { t:'p', x:'There is no right answer here. That is what the amber box is for. Click the cell and write in "Assumption this rating depends on":' },
        { t:'quote', x:'Depends on whether a test order counts as part of the theatre or as real preparation. If it is real preparation, this becomes I and H3 weakens.' },
        { t:'key', x:'A cell you hesitated over is worth more than ten you were sure about. That is where your reasoning is hiding.' },
        { t:'h3', x:'Rows E5 and E6' },
        { t:'table', head:['', 'H1', 'H2', 'H3', 'H4'], rows:[
          ['E5 assumption about needing a test', 'C', 'I', 'I', '·'],
          ['E6 cancelled diplomatic travel', 'C', 'I', 'C', '·'],
        ]},
        { t:'p', x:'Write a note on E5 too:' },
        { t:'quote', x:'Depends on X\'s programme following the same technical doctrine as comparable ones. If they validate the design by simulation, this reasoning collapses.' },
      ]},

      { n:4, title:'Refine', blocks:[
        { t:'p', x:'Press Refine. The tool sorts everything by diagnostic value:' },
        { t:'table', head:['Rank', 'Item', 'Value'], rows:[
          ['1st', 'E3 — the absence of evacuations', '4'],
          ['2nd', 'E1 — the vehicle movement', '3'],
          ['3rd', 'E5 — the assumption', '1.4'],
          ['4th', 'E4 — the single source', '1.2'],
          ['5th', 'E6 — the cancelled travel', '0.98'],
          ['6th', 'E2 — the public denial', '0 — noise'],
        ]},
        { t:'key', x:'The most valuable item in the case is something that did not happen. The head of state\'s public statement — front-page material anywhere else — is worth exactly zero.' },
        { t:'p', x:'Also reconsider the shape of the problem here. Two hypotheses nothing can separate should probably merge. An explanation you did not anticipate may need adding. Rows with no diagnostic value stay where they are.' },
      ]},

      { n:5, title:'Conclusions', blocks:[
        { t:'table', head:['Rank', 'Hypothesis', 'Inconsistency'], rows:[
          ['1st', 'H4 — planted reporting', '0'],
          ['2nd', 'H3 — staging for leverage', '1'],
          ['3rd', 'H1 — test preparation', '2'],
          ['4th', 'H2 — routine', '4'],
        ]},
        { t:'h3', x:'Two things worth noticing' },
        { t:'p', x:'First: the obvious answer came third. Anyone looking at the vehicle movement would say a test is coming. The matrix shows that the absence of safety preparations weighs more against it than the movement weighs for it.' },
        { t:'p', x:'Second: H4 wins with zero — and the panel on the right is warning you about exactly that. A hypothesis with nothing against it may be strong, or it may be one you never went looking to refute. Here it is the second: no collection was aimed at testing manipulation.' },
        { t:'key', x:'ACH does not give you the answer. It tells you where your analysis is weak. Here it is telling you to go and verify your sources before writing anything.' },
        { t:'table', head:['What the number is', 'What it is not'], rows:[
          ['A ranking to think with', 'An answer'],
          ['A record of how you got there', 'A probability'],
          ['A map of what carries the conclusion', 'A guarantee of being right'],
        ]},
        { t:'tip', x:'If you disagree with the result, that is valuable information. It almost always means something weighing on your reasoning never made it into the matrix. Go back and write it in.' },
      ]},

      { n:6, title:'Sensitivity', blocks:[
        { t:'p', x:'The tool tests it for you: if I removed this item, would the ranking change? Anything flagged "Ranking changes without this item" is dangerous — your conclusion is hanging on it.' },
        { t:'p', x:'For each one, ask honestly: what if this source is wrong? What if it was planted? What if it admits a reading that did not occur to me?' },
        { t:'warn', x:'In this case E4 — the single source with indirect access — deserves double scrutiny. It is precisely the kind of reporting that has historically led entire services to the wrong conclusion.' },
      ]},

      { n:7, title:'Report', blocks:[
        { t:'key', x:'Write about every hypothesis, not just the winner.' },
        { t:'p', x:'Your reader needs to know what was set aside and why — that is what lets them plan for you being wrong. A model to adapt:' },
        { t:'quote', x:'No hypothesis can be asserted with confidence on the information available. Test preparation (H1) is weakened by the absence of safety measures in nearby settlements, which would be expected were a test imminent. The routine explanation (H2) is the most contradicted and can be set aside. Deliberate staging (H3) accommodates the observed information best. Manipulation of our reporting (H4) records no contradictions, but this reflects the absence of collection aimed at testing it rather than its strength; source validation is recommended before any firm judgment. The decisive item was the absence of safety preparations; if that observation is incomplete, the ranking changes.' },
        { t:'p', x:'Notice what that text does: it admits what it does not know, it distinguishes "nothing against it" from "strong", it names what carries the conclusion, and it says what would change it.' },
        { t:'tip', x:'Do not skip the assumptions box underneath. Read them in one go. If the same assumption appears three times, you have found the real foundation of your analysis — and probably your largest risk.' },
      ]},

      { n:8, title:'Indicators', blocks:[
        { t:'h3', x:'Would strengthen the judgment' },
        { t:'ul', items:[
          'Evacuations beginning, or medical assets moving in near the site',
          'The test order confirmed by a second, independent source',
          'Airspace closed over the region',
        ]},
        { t:'h3', x:'Would undermine it' },
        { t:'ul', items:[
          'Visible dismantling of the site facilities',
          'The single source behind E4 turning out to be compromised',
          'An agreement signed that makes a test politically impossible',
        ]},
        { t:'warn', x:'Deciding now what would change your mind makes it far harder, three months from now, to explain the signs away. If you do not write this today, when the signal arrives you will say "that does not invalidate my analysis". It will. You just will not want to see it.' },
      ]},
    ],
  },

  /* ---- Caso resolvido: negócios ---- */
  biz: {
    statement: 'You follow competitors. A rival company, always stable, has posted 40 software engineering vacancies in two months. It has never done anything like this. Your question: why are they hiring so many people so suddenly?',
    steps: [
      { n:1, title:'Hypotheses', blocks:[
        { t:'table', head:['', 'Hypothesis'], rows:[
          ['H1', 'The hiring is to build a new product'],
          ['H2', 'The hiring is to replace people who left'],
          ['H3', 'The hiring is to inflate headcount ahead of a sale'],
          ['H4', 'The vacancies are not real; they were posted to mislead competitors'],
        ]},
        { t:'tip', x:'Notice the phrasing. All four are written as "the hiring is to…" on purpose. That way the purpose is one thing or another, and the hypotheses exclude each other. Had they been written as "they are growing" and "they are launching a product", both could be true at once and the matrix would stop working.' },
      ]},
      { n:2, title:'Evidence', blocks:[
        { t:'table', head:['', 'Text', 'Type'], rows:[
          ['E1', '40 engineering vacancies posted in two months', 'Reporting / fact'],
          ['E2', 'The CEO said in an interview that a "big year" is coming', 'Reporting / fact'],
          ['E3', 'No announcement, patent filing or sign of a new product', 'Absent evidence'],
          ['E4', 'Several senior engineers marked themselves "open to work" the month before', 'Reporting / fact'],
          ['E5', 'I assume a company preparing a new product would also hire product managers and designers — and all 40 roles are engineering', 'Assumption'],
          ['E6', 'They leased a larger office in the same district', 'Reporting / fact'],
        ]},
      ]},
      { n:3, title:'Matrix', blocks:[
        { t:'table', head:['', 'H1 product', 'H2 replacement', 'H3 sale', 'H4 fake vacancies'], rows:[
          ['E1 forty vacancies', 'CC', 'C', 'C', 'C'],
          ['E2 CEO interview', 'C', 'C', 'C', 'C'],
          ['E3 no sign of product', 'I', 'C', 'C', 'C'],
          ['E4 seniors leaving', 'I', 'CC', 'I', 'C — arguable'],
          ['E5 missing product roles', 'I', 'CC', 'C', '·'],
          ['E6 larger office', 'C', 'C', 'C', 'C'],
        ]},
        { t:'h3', x:'The arguable cell: E4 against H4' },
        { t:'p', x:'If the vacancies are fake, do departing seniors tell you anything? Two readings. Nothing — departures are independent of whether the postings are real. Or a great deal — the departures give the deception its motive: you fake an expansion precisely to cover an exodus.' },
        { t:'p', x:'The second reading is stronger, which is why it is marked C. But write the note:' },
        { t:'quote', x:'Depends on assuming the company would want to hide the departures. If they are public and already known, the motive disappears and this returns to "not relevant".' },
      ]},
      { n:4, title:'Steps 4 to 8', blocks:[
        { t:'p', x:'Follow the intelligence case from step 4 onwards — the instructions are identical. The reading of this particular matrix:' },
        { t:'ul', items:[
          'E2 and E6 are worth nothing. They fit everything. Noise.',
          'E4 and E5 are what separate the hypotheses, and both point to team replacement.',
          'H2 comes out ahead: it has the least against it.',
          'In the report, cover all four, and say plainly that H3 (the sale) was not refuted — which may mean it is plausible, or only that you never looked for information that would test it.',
        ]},
      ]},
    ],
  },
},

/* ========================================================================== */
/*  ESPANHOL                                                                  */
/* ========================================================================== */
es: {
  title: 'Cómo usar el Análisis de Hipótesis en Competencia',
  subtitle: 'Aprender a pensar con el ACH, no solo a pulsar botones',
  intro: 'Este manual enseña la técnica, no los botones. Al terminarlo deberías poder coger un problema propio y trabajarlo desde cero. Léelo en orden. La Parte 3 es un caso completo, de principio a fin, que indica exactamente qué escribir en cada casilla.',
  caseToggleLabel: 'Caso resuelto',
  caseIntel: 'Inteligencia',
  caseBiz: 'Negocios',
  caseNoteIntel: 'Este es el mismo caso que viene dentro de la herramienta. Puedes seguirlo escribiéndolo tú, o pulsar Cargar ejemplo en cualquier momento para ver la matriz terminada y comparar.',
  caseNoteBiz: 'Misma técnica, mismos ocho pasos, otro asunto. Si ya has leído el caso de inteligencia, este demuestra que el esqueleto no cambia.',
  backToTool: 'Volver a la herramienta',
  contents: 'Contenido',

  sections: [
    { id: 'idea', title: '1. La idea central', blocks: [
      { t:'h3', x:'El error que todos cometemos' },
      { t:'p',  x:'Llegas a casa y la luz del salón está encendida. Piensas: me la habré dejado encendida.' },
      { t:'p',  x:'A partir de ahí todo encaja. La puerta estaba cerrada — claro, la cerré yo. No han tocado nada — claro, no ha entrado nadie. El coche está en el garaje. Cada observación confirma tu primera idea y te sientes cada vez más seguro.' },
      { t:'p',  x:'El problema: todo eso encajaría igual de bien si alguien hubiera entrado con llave y hubiera salido sin tocar nada. No has puesto nada a prueba. Has reunido cosas compatibles con lo que ya creías.' },
      { t:'p',  x:'Esto tiene nombre — sesgo de confirmación — y es la razón por la que se equivocan los analistas con experiencia.' },
      { t:'h3', x:'Lo que el ACH invierte' },
      { t:'p',  x:'En vez de preguntar «¿qué apoya mi idea?», preguntas «¿qué hay en contra de cada una de las ideas posibles?». La conclusión sale entonces de una regla que al principio suena rara.' },
      { t:'key', x:'La hipótesis más sólida es la que menos tiene en contra, no la que más tiene a favor.' },
      { t:'p',  x:'¿Por qué? Porque no se puede demostrar que algo sea cierto. Una prueba a favor de tu idea suele servir igual de bien para otras tres. Pero basta una sola prueba sólida en contra de una hipótesis para eliminarla. Así trabaja un buen detective: no confirmando al sospechoso preferido, sino encontrando la coartada que descarta sospechosos.' },
      { t:'h3', x:'Treinta segundos' },
      { t:'p',  x:'Tres hipótesis sobre por qué tu tren llega tarde:' },
      { t:'table', head:['', 'H1 Avería', 'H2 Huelga', 'H3 Accidente en la vía'], rows:[
        ['El panel dice «retrasado»', 'encaja', 'encaja', 'encaja'],
        ['Hay otros trenes circulando', '', 'NO encaja', ''],
      ]},
      { t:'p',  x:'El primer dato parece importante y no vale nada: encaja con las tres, así que no ayuda a elegir. El segundo vale oro — descarta la huelga él solo.' },
      { t:'key', x:'La información que encaja con todas las hipótesis no te dice nada. Es ruido.' },
      { t:'p',  x:'La herramienta lo llama valor diagnóstico. Un elemento con valor diagnóstico alto es el que separa las hipótesis.' },
    ]},

    { id: 'concepts', title: '2. Los cinco conceptos', blocks: [
      { t:'h3', x:'1. Hipótesis' },
      { t:'p',  x:'Una explicación posible, escrita como enunciado que podría demostrarse falso.' },
      { t:'table', head:['No es hipótesis', 'Sí es hipótesis'], rows:[
        ['«¿Por qué movieron tropas?»', '«Movieron tropas para preparar un ataque.»'],
        ['«Quizá esté pasando algo»', '«El programa nuclear ha llegado a fase de ensayo.»'],
        ['«La situación es preocupante»', '«El adversario ensayará antes de fin de año.»'],
      ]},
      { t:'warn', x:'Las hipótesis han de ser mutuamente excluyentes: si una es cierta, las demás han de ser falsas. Es la regla más fácil de romper sin darse cuenta. La Parte 4 muestra un error real que cometimos en esta misma herramienta.' },
      { t:'h3', x:'2. Información — que aquí significa mucho más que «prueba»' },
      { t:'p',  x:'En el ACH, la información es todo lo que orienta tu razonamiento. El libro de referencia enumera cuatro clases, y la herramienta te pide etiquetar cada elemento:' },
      { t:'table', head:['Tipo', 'Qué es', 'Ejemplo'], rows:[
        ['Informe / hecho', 'Algo observado o reportado', 'Aumento del movimiento de vehículos en el polígono'],
        ['Argumento', 'Un razonamiento propio', 'Un ensayo ahora traería sanciones que no pueden absorber'],
        ['Supuesto', 'Algo que das por sentado', 'Supongo que necesitan un ensayo para validar el diseño'],
        ['Ausencia significativa', 'Lo que esperarías ver y no ves', 'Ningún indicio de evacuación en los núcleos cercanos'],
      ]},
      { t:'key', x:'Los dos últimos son los que marcan la diferencia.' },
      { t:'p',  x:'Sobre los supuestos: los análisis rara vez fallan porque la información fuera errónea. Fallan por un supuesto que nadie escribió y que por eso nadie cuestionó. Si no lo escribes, no puedes desafiarlo.' },
      { t:'p',  x:'Sobre las ausencias: en un relato de Sherlock Holmes la pista decisiva es que el perro no ladró, luego el intruso le era conocido. Lo que no ocurrió es información. En el caso resuelto de más abajo, una ausencia resulta ser el elemento más valioso de todos.' },
      { t:'h3', x:'3. Consistente / Inconsistente' },
      { t:'p',  x:'Para cada cruce de un elemento con una hipótesis haces una sola pregunta: si esta hipótesis fuera cierta, ¿esperaría ver esto?' },
      { t:'table', head:['Respuesta', 'Marca'], rows:[
        ['Sí', 'C — Consistente'],
        ['Sí, mucho', 'CC — Muy consistente'],
        ['No', 'I — Inconsistente'],
        ['No, y esto destruye la hipótesis', 'II — Muy inconsistente'],
        ['Esto no dice nada sobre esta hipótesis', '· — dejar vacío'],
      ]},
      { t:'h3', x:'4. Valor diagnóstico' },
      { t:'p',  x:'Cuánto separa un elemento las hipótesis. La herramienta lo calcula y muestra una etiqueta junto a cada fila. «Sin valor diagnóstico» significa que esa fila no te está ayudando. Un número alto significa que es una de las filas que sostiene tu conclusión.' },
      { t:'h3', x:'5. La regla de oro' },
      { t:'key', x:'Gana lo que menos tiene en contra. Lo que más tiene a favor, no.' },
    ]},

    { id: 'walkthrough', title: '3. Un caso, paso a paso', hasCases: true },

    { id: 'hypotheses', title: '4. Redactar buenas hipótesis', blocks: [
      { t:'table', head:['Floja', 'Problema', 'Mejor'], rows:[
        ['«Algo pasa en el País X»', 'Demasiado vaga para ser refutada', '«X prepara un ensayo»'],
        ['«¿Van a ensayar?»', 'Es una pregunta', '«X ensayará en seis meses»'],
        ['«Puede que preparen o que faroleen»', 'Dos hipótesis pegadas', 'Sepáralas en dos'],
        ['«X ensayará en marzo, en el polígono norte, con un dispositivo de 20 kt»', 'Tan detallada que casi seguro será falsa', '«X ensayará en seis meses»'],
      ]},
      { t:'h3', x:'El error de exclusividad mutua — uno real, nuestro' },
      { t:'p',  x:'Esta herramienta salió con un defecto. Las hipótesis del ejemplo eran:' },
      { t:'ul', items:[
        'H2 — X no tiene intención de ensayar en este periodo',
        'H3 — X escenifica actividad para farolear, sin intención de ensayar',
      ]},
      { t:'p',  x:'Léelas otra vez. Si H3 es cierta, H2 también lo es: H3 dice literalmente «sin intención de ensayar». Una contiene a la otra. Eso rompe la exclusividad mutua, y una matriz así reparte mal la información.' },
      { t:'p',  x:'La corrección fue cambiar el eje de la distinción. En vez de separarlas por la intención de ensayar — idéntica en ambas — ahora se separan por la naturaleza de la actividad:' },
      { t:'ul', items:[
        'H2 — la actividad es rutinaria y nunca se pretendió que fuera advertida',
        'H3 — la actividad es escenificada y se hizo para ser advertida',
      ]},
      { t:'p',  x:'Ahora se excluyen: o la actividad es rutina, o es teatro. No puede ser las dos.' },
      { t:'key', x:'Este error es fácil de cometer y difícil de ver. Tras redactar las hipótesis, pruébalas por pares: ¿podrían ser ciertas a la vez? Si es así, reescríbelas.' },
      { t:'h3', x:'Una segunda prueba rápida' },
      { t:'p',  x:'Tras redactar una hipótesis, pregunta: ¿qué información, si la encontrara, me obligaría a tacharla? Si no sabes responder, está mal redactada.' },
    ]},

    { id: 'mistakes', title: '5. Los errores más comunes', blocks: [
      { t:'table', head:['Error', 'Cómo se manifiesta', 'La corrección'], rows:[
        ['Solo dos hipótesis', 'Queda un «o esto o aquello»', 'Fuérzate a llegar a cuatro. La tercera y la cuarta son las que enseñan'],
        ['Hipótesis que se solapan', 'Una parece un caso particular de otra', 'Pruébalas por pares. Ver Parte 4'],
        ['Trabajar por columnas', 'Notas que avanza sospechosamente rápido', 'Vuelve a empezar y ve fila a fila'],
        ['Solo hechos, ningún supuesto', 'La matriz no cuadra con tu intuición', 'Escribe lo que estás dando por sentado'],
        ['Borrar las filas que no valen', 'Pierdes la constancia', 'Consérvalas. Son la prueba de que las consideraste'],
        ['Tomar la puntuación por respuesta', 'Aceptas el resultado sin pensar', 'Es una ordenación para pensar, no un veredicto'],
        ['Leer un cero como solidez', 'Una hipótesis gana sin nada en contra y lo celebras', 'Puede estar sin probar. El panel te avisa'],
        ['Descartar el engaño por falta de indicios', '«No hay señales, luego no lo hay»', 'La falta de señales es justo lo que produce una buena operación'],
        ['Llegar con la respuesta decidida', 'Todo acaba confirmando lo que ya pensabas', 'La técnica no protege a quien ya ha decidido. Es un límite real'],
      ]},
    ]},

    { id: 'card', title: '6. Consulta rápida', blocks: [
      { t:'code', x:
'1. HIPÓTESIS    > Todas las explicaciones. Cuatro o cinco. Excluyentes.\n' +
'                  Prueba por pares: "¿podrían ser ciertas a la vez?"\n' +
'                  Incluye siempre una hipótesis de engaño.\n\n' +
'2. INFORMACIÓN  > Hechos + argumentos + SUPUESTOS + AUSENCIAS.\n' +
'                  Pregunta: "si fuera cierto, ¿qué debería estar viendo?"\n\n' +
'3. MATRIZ       > EN HORIZONTAL, fila a fila. Nunca por columnas.\n' +
'                  "Depende de..." > escríbelo en la nota de la celda.\n\n' +
'4. DEPURAR      > Fusiona lo inseparable. Marca el ruido. No borres nada.\n\n' +
'5. CONCLUSIONES > Gana lo que menos tiene en contra.\n' +
'                  Cero en contra no es lo mismo que sólido.\n' +
'                  ¿Discrepas? Algo no llegó a la matriz.\n\n' +
'6. SENSIBILIDAD > Lo señalado lo sostiene todo. Atácalo.\n\n' +
'7. INFORME      > Cubre TODAS las hipótesis. Revisa tus supuestos.\n\n' +
'8. INDICADORES  > Dos listas. Qué reforzaría. Qué debilitaría.' },
      { t:'h3', x:'Cuatro frases para llevarse' },
      { t:'ul', items:[
        'Gana lo que menos tiene en contra, no lo que más tiene a favor.',
        'La información que encaja con todo no vale nada.',
        'Si tu frase empezó por «depende de…», has encontrado un supuesto. Escríbelo.',
        'Una hipótesis sin nada en contra puede estar sin probar, no ser sólida.',
      ]},
    ]},

    { id: 'buttons', title: '7. La herramienta, botón a botón', blocks: [
      { t:'table', head:['Botón', 'Qué hace'], rows:[
        ['Cargar ejemplo', 'Carga el caso resuelto ya rellenado'],
        ['Guardar / Cargar', 'Guarda el análisis en tu propio navegador. Nada sale de tu ordenador'],
        ['Nuevo análisis', 'Borra todo y empieza de cero'],
        ['Exportar PDF', 'Un informe formateado: matriz, ordenación, supuestos y fuentes'],
        ['Exportar imagen', 'Un PNG solo de la matriz, para una presentación'],
        ['English / Español', 'Cambia el idioma de la interfaz. Lo que tú has escrito no se traduce'],
        ['?', 'La técnica y sus fuentes'],
      ]},
      { t:'h3', x:'Modo estándar frente a modo avanzado' },
      { t:'p',  x:'El modo estándar es el ACH tal como se hace en papel. Cada elemento pesa lo mismo. Solo C, CC, I, II y vacío, y un recuento simple.' },
      { t:'p',  x:'El modo avanzado añade dos casillas por elemento — credibilidad de la fuente y relevancia — y la puntuación pasa a ser ponderada, de modo que una contradicción procedente de fuente sólida pesa más que una procedente de un rumor. En el caso resuelto esto importa: el elemento E4 viene de fuente débil, y en modo avanzado deja de arrastrar tanto la conclusión.' },
      { t:'tip', x:'Empieza en modo estándar hasta que hayas hecho dos o tres análisis. El avanzado compensa cuando tus fuentes son de calidad muy desigual.' },
    ]},

    { id: 'fit', title: '8. Qué preguntas sirven para el ACH', blocks: [
      { t:'h3', x:'Funciona bien con' },
      { t:'ul', items:[
        '¿Por qué el actor X hizo Y? — varias explicaciones rivales de un mismo hecho',
        '¿Cuál de estos grupos es responsable? — las hipótesis son candidatos que se excluyen',
        '¿Es esta fuente genuina o está siendo manipulada?',
        '¿El programa sigue en desarrollo o ya es operativo?',
        '¿Qué se está construyendo con este componente importado?',
      ]},
      { t:'p',  x:'El denominador común: una pregunta, varias respuestas posibles que no pueden ser ciertas a la vez, e información suficiente para ponerlas a prueba.' },
      { t:'h3', x:'Funciona mal con' },
      { t:'table', head:['Tipo de pregunta', 'Por qué no'], rows:[
        ['«¿Deberíamos intervenir?»', 'Es un juicio de valor. El ACH describe, no decide políticas'],
        ['«¿Qué pasará en el Sahel?»', 'Demasiado amplia. Divídela en preguntas menores primero'],
        ['«¿Cuántos misiles tienen?»', 'No es elegir entre explicaciones, es estimar una cantidad'],
        ['Preguntas ya respondidas', 'Sin hipótesis rivales no hay nada que probar'],
      ]},
      { t:'h3', x:'El mismo esqueleto, otros campos' },
      { t:'p',  x:'No es solo una técnica de inteligencia estatal. Funciona en investigación de fraude, análisis de la competencia, seguridad de la información y periodismo de investigación: allí donde haya explicaciones rivales y equivocarse salga caro.' },
    ]},

    { id: 'sources', title: 'Fuentes', blocks: [
      { t:'p', x:'La técnica no es nuestra. Procede de aquí:' },
      { t:'ul', items:[
        'Heuer, Richards J. Jr. — Psychology of Intelligence Analysis, cap. 8. CIA Center for the Study of Intelligence, 1999. (Dominio público.) El texto en que se publicó el ACH por primera vez.',
        'Heuer, R. J. Jr. y Pherson, R. H. — Structured Analytic Techniques for Intelligence Analysis, § 7.3. La versión de referencia del procedimiento, con la notación C/CC/I/II y las cuatro clases de información que entran en la matriz.',
        'Pherson, K. H. y Pherson, R. H. — Critical Thinking for Strategic Intelligence, cap. 13. Criterios de buena hipótesis y encaje de la técnica en el proceso analítico.',
      ]},
      { t:'p', x:'Todo el texto explicativo está redactado con palabras propias. No se reproduce ningún pasaje de los libros de referencia. Los casos están inventados con fines docentes.' },
      { t:'warn', x:'Necesita verificación: dos fórmulas de la herramienta — la puntuación ponderada y la medida de valor diagnóstico — son implementación propia, porque los libros describen los conceptos pero no publican la aritmética. Trata esas cifras como una ayuda, no como una reproducción autorizada.' },
    ]},
  ],

  intel: {
    statement: 'Sigues el programa nuclear del País X. En las últimas semanas la vigilancia ha detectado movimiento inusual en el polígono de ensayos. Tu pregunta: ¿realizará el gobierno del País X un ensayo nuclear en los próximos seis meses?',
    steps: [
      { n:1, title:'Hipótesis', blocks:[
        { t:'p', x:'Antes de pulsar nada: ¿cuáles son todas las explicaciones posibles? No juzgues todavía si son probables. Solo enuméralas. No te detengas en la primera que parezca buena — ahí falla casi todo el mundo.' },
        { t:'p', x:'Pulsa Añadir hipótesis tres veces y escribe:' },
        { t:'table', head:['', 'Hipótesis', 'Relato'], rows:[
          ['H1', 'X prepara un ensayo y oculta los preparativos.', 'El programa ha llegado al punto en que el ensayo es técnicamente necesario, y la cúpula lo oculta para evitar sanciones anticipadas.'],
          ['H2', 'X no prepara ningún ensayo; la actividad observada es rutinaria.', 'Lo que vemos es mantenimiento y rotación ordinarios, y nunca se pretendió que fuera advertido.'],
          ['H3', 'X no prepara ningún ensayo, pero escenifica actividad visible para ganar poder negociador.', 'La actividad es real pero teatral: está pensada para ser detectada, con el fin de arrancar concesiones en la negociación en curso.'],
        ]},
        { t:'p', x:'Ahora pulsa Añadir hipótesis de engaño y sustituye el texto por:' },
        { t:'table', head:['', 'Hipótesis', 'Relato'], rows:[
          ['H4', 'La información que nos llega está siendo fabricada o plantada.', 'La actividad puede ser anodina; lo que se manipula es nuestra imagen de ella. La falta de pruebas es lo esperable, no un motivo de tranquilidad.'],
        ]},
        { t:'h3', x:'Fíjate en cómo se separan las cuatro' },
        { t:'table', head:['', '¿Actividad real?', '¿Intención de ensayar?', 'Qué se manipula'], rows:[
          ['H1', 'Sí', 'Sí', '—'],
          ['H2', 'Sí, rutinaria', 'No', '—'],
          ['H3', 'Sí, escenificada', 'No', 'Nuestra percepción, mediante actividad real'],
          ['H4', 'Quizá ni eso', '—', 'La información que nos llega'],
        ]},
        { t:'key', x:'Si una es cierta, las otras tres han de ser falsas. Esa es la prueba.' },
        { t:'warn', x:'Por qué H4 existe siempre: si alguien te engaña deliberadamente, se supone que no ves señales. Una operación bien ejecutada no deja rastro. No puedes descartarla por falta de indicios — esa falta es exactamente lo que esperarías si el engaño estuviera funcionando.' },
        { t:'tip', x:'Menos de tres hipótesis y seguro que faltan. Más de siete y nadie puede sostenerlas a la vez: fusiona las más próximas. Cuatro o cinco suele ser el punto óptimo.' },
      ]},
      { n:2, title:'Información', blocks:[
        { t:'p', x:'No te quedes mirando al techo. Para cada hipótesis pregunta: si fuera cierta, ¿qué debería estar viendo? Y después: ¿lo estoy viendo? Si no, ¿por qué? Eso genera hechos y ausencias a la vez.' },
        { t:'p', x:'Pulsa Añadir elemento seis veces:' },
        { t:'table', head:['', 'Texto', 'Tipo'], rows:[
          ['E1', 'Aumento del movimiento de vehículos en el polígono en las últimas ocho semanas', 'Informe / hecho'],
          ['E2', 'El jefe del Estado negó públicamente cualquier intención de ensayar', 'Informe / hecho'],
          ['E3', 'No se observan evacuaciones ni preparativos de seguridad en los núcleos cercanos', 'Ausencia significativa'],
          ['E4', 'Una única fuente con acceso indirecto informa de que se cursó una orden de ensayo', 'Informe / hecho'],
          ['E5', 'Supongo que un Estado en esta fase de un programa necesita un ensayo para validar el diseño', 'Supuesto'],
          ['E6', 'Una delegación diplomática canceló discretamente un viaje previsto para el mes próximo', 'Informe / hecho'],
        ]},
        { t:'tip', x:'En modo avanzado, fija la credibilidad: E1 y E3 son observación propia y verificable — Alta. E2 es una declaración pública, donde todos niegan siempre — Baja. E4 es una fuente única con acceso indirecto, el perfil clásico de un informe que ha desorientado a servicios enteros — Baja.' },
        { t:'warn', x:'El error más común aquí es listar solo hechos. Sin al menos un supuesto y una ausencia, la matriz no refleja cómo piensas realmente, y el panel de la derecha te lo dirá.' },
      ]},
      { n:3, title:'Matriz', blocks:[
        { t:'key', x:'Trabaja en horizontal, una fila cada vez. Nunca por columnas.' },
        { t:'p', x:'Coge E1 y recorre H1, H2, H3, H4. Solo después pasa a E2. ¿Por qué? Ir por columna es el hábito de siempre: mirar una hipótesis y reunir cosas que la apoyen. Ir por fila te obliga a preguntar qué significa ese mismo elemento para cada explicación.' },
        { t:'p', x:'Al pulsar una celda esta rota: vacío > C > CC > I > II > vacío.' },
        { t:'h3', x:'Fila E1 — el movimiento de vehículos ha aumentado' },
        { t:'table', head:['', 'Razonamiento', 'Marca'], rows:[
          ['H1 prepara', 'Justo lo que esperarías', 'CC'],
          ['H2 rutina', '«Aumento» contradice «rutina» por definición', 'I'],
          ['H3 escenificación', 'Precisamente lo que escenificarías para ser visto', 'CC'],
          ['H4 información plantada', 'Compatible', 'C'],
        ]},
        { t:'h3', x:'Fila E2 — el jefe del Estado lo negó' },
        { t:'p', x:'Los gobiernos niegan, hagan lo que hagan. Encaja con las cuatro: C, C, C, C. Esta fila aparecerá marcada «Sin valor diagnóstico». Es ruido, pero no la borres: forma parte de la constancia de que la consideraste.' },
        { t:'h3', x:'Fila E3 — ninguna evacuación observada (una ausencia)' },
        { t:'table', head:['', 'Razonamiento', 'Marca'], rows:[
          ['H1 prepara', 'Un ensayo real trae preparativos de seguridad. La ausencia muerde hondo', 'II'],
          ['H2 rutina', 'Tiene todo el sentido que no haya nada', 'C'],
          ['H3 escenificación', 'Escenificar no exige seguridad real: es la señal que delata el teatro', 'CC'],
          ['H4 información plantada', 'Compatible', 'C'],
        ]},
        { t:'tip', x:'Fíjate en esta fila. Será la de mayor valor diagnóstico de todo el caso, y no es un hecho, es una ausencia. Es el perro que no ladró.' },
        { t:'h3', x:'Fila E4 — fuente única con acceso indirecto' },
        { t:'table', head:['', 'Marca'], rows:[
          ['H1 prepara', 'CC'],
          ['H2 rutina', 'I'],
          ['H3 escenificación', 'C — ver abajo'],
          ['H4 información plantada', 'CC — una fuente única e indirecta es exactamente el aspecto de un informe plantado'],
        ]},
        { t:'h3', x:'Esta celda es discutible, y esa es la lección' },
        { t:'p', x:'E4 frente a H3 no tiene respuesta obvia. Dos lecturas defendibles: consistente, porque quien escenifica una crisis también quiere que circulen los rumores; o inconsistente, porque una orden de ensayo es preparación real, y H3 sostiene que no la hay.' },
        { t:'p', x:'Aquí no hay respuesta correcta. Para eso está la casilla ámbar. Pulsa la celda y escribe en «Supuesto del que depende esta valoración»:' },
        { t:'quote', x:'Depende de considerar que una orden de ensayo forma parte del teatro o es preparación real. Si es preparación real, esto pasa a I y H3 se debilita.' },
        { t:'key', x:'Una celda en la que dudaste vale más que diez en las que tuviste certeza. Ahí es donde se esconde tu razonamiento.' },
        { t:'h3', x:'Filas E5 y E6' },
        { t:'table', head:['', 'H1', 'H2', 'H3', 'H4'], rows:[
          ['E5 supuesto sobre la necesidad de ensayar', 'C', 'I', 'I', '·'],
          ['E6 viaje diplomático cancelado', 'C', 'I', 'C', '·'],
        ]},
        { t:'p', x:'Escribe también una nota en E5:' },
        { t:'quote', x:'Depende de que el programa de X siga la misma doctrina técnica que otros comparables. Si validan el diseño por simulación, este razonamiento se cae entero.' },
      ]},
      { n:4, title:'Depurar', blocks:[
        { t:'p', x:'Pulsa Depurar. La herramienta ordena todo por valor diagnóstico:' },
        { t:'table', head:['Puesto', 'Elemento', 'Valor'], rows:[
          ['1.º', 'E3 — la ausencia de evacuaciones', '4'],
          ['2.º', 'E1 — el movimiento de vehículos', '3'],
          ['3.º', 'E5 — el supuesto', '1,4'],
          ['4.º', 'E4 — la fuente única', '1,2'],
          ['5.º', 'E6 — el viaje cancelado', '0,98'],
          ['6.º', 'E2 — la negación pública', '0 — ruido'],
        ]},
        { t:'key', x:'El elemento más valioso del caso es algo que no ocurrió. Y la declaración pública del jefe del Estado, que en cualquier otro sitio sería portada, vale exactamente cero.' },
        { t:'p', x:'Replantéate aquí también la forma del problema. Dos hipótesis que nada separa probablemente deban fusionarse. Una explicación que no habías previsto puede tener que añadirse. Las filas sin valor diagnóstico se quedan donde están.' },
      ]},
      { n:5, title:'Conclusiones', blocks:[
        { t:'table', head:['Puesto', 'Hipótesis', 'Inconsistencia'], rows:[
          ['1.º', 'H4 — información plantada', '0'],
          ['2.º', 'H3 — escenificación para negociar', '1'],
          ['3.º', 'H1 — preparación de ensayo', '2'],
          ['4.º', 'H2 — rutina', '4'],
        ]},
        { t:'h3', x:'Dos cosas que merecen atención' },
        { t:'p', x:'La primera: la respuesta obvia quedó tercera. Cualquiera que mirase el movimiento de vehículos diría que viene un ensayo. La matriz muestra que la ausencia de preparativos de seguridad pesa más en contra que el movimiento a favor.' },
        { t:'p', x:'La segunda: H4 gana con cero, y el panel de la derecha te está avisando precisamente de eso. Una hipótesis sin nada en contra puede ser sólida, o puede ser una que nunca intentaste refutar. Aquí es lo segundo: no se dirigió ninguna recogida a poner a prueba la manipulación.' },
        { t:'key', x:'El ACH no te da la respuesta. Te dice dónde flojea tu análisis. Aquí te dice que verifiques tus fuentes antes de escribir nada.' },
        { t:'table', head:['Lo que la cifra es', 'Lo que no es'], rows:[
          ['Una ordenación para pensar', 'Una respuesta'],
          ['Una constancia de cómo llegaste ahí', 'Una probabilidad'],
          ['Un mapa de lo que sostiene la conclusión', 'Una garantía de acertar'],
        ]},
        { t:'tip', x:'Si discrepas del resultado, eso es información valiosa. Casi siempre significa que algo que pesa en tu razonamiento nunca llegó a la matriz. Vuelve atrás y escríbelo.' },
      ]},
      { n:6, title:'Sensibilidad', blocks:[
        { t:'p', x:'La herramienta lo prueba por ti: si quitara este elemento, ¿cambiaría la ordenación? Lo marcado con «La ordenación cambia sin este elemento» es peligroso: tu conclusión pende de ello.' },
        { t:'p', x:'Para cada uno pregunta con honestidad: ¿y si esta fuente está equivocada? ¿Y si la plantaron? ¿Y si admite una lectura que no se me ocurrió?' },
        { t:'warn', x:'En este caso, E4 — la fuente única con acceso indirecto — merece doble escrutinio. Es exactamente el tipo de informe que históricamente ha llevado a servicios enteros a la conclusión equivocada.' },
      ]},
      { n:7, title:'Informe', blocks:[
        { t:'key', x:'Escribe sobre todas las hipótesis, no solo sobre la ganadora.' },
        { t:'p', x:'Quien te lee necesita saber qué se descartó y por qué: eso es lo que le permite prever que te equivoques. Un modelo para adaptar:' },
        { t:'quote', x:'Ninguna hipótesis puede afirmarse con confianza a partir de la información disponible. La preparación de un ensayo (H1) se debilita por la ausencia de medidas de seguridad en los núcleos cercanos, que cabría esperar si el ensayo fuera inminente. La explicación rutinaria (H2) es la más contradicha y puede apartarse. La escenificación deliberada (H3) es la que mejor acomoda la información observada. La manipulación de nuestra información (H4) no registra contradicciones, pero ello refleja la ausencia de recogida dirigida a ponerla a prueba y no su solidez; se recomienda validar las fuentes antes de cualquier juicio firme. El elemento decisivo fue la ausencia de preparativos de seguridad; si esa observación está incompleta, la ordenación cambia.' },
        { t:'p', x:'Fíjate en lo que hace ese texto: admite lo que no sabe, distingue «nada en contra» de «sólido», nombra lo que sostiene la conclusión y dice qué la cambiaría.' },
        { t:'tip', x:'No te saltes la casilla de supuestos de más abajo. Léelos de seguida. Si el mismo supuesto aparece tres veces, has encontrado el cimiento real de tu análisis, y probablemente tu mayor riesgo.' },
      ]},
      { n:8, title:'Indicadores', blocks:[
        { t:'h3', x:'Reforzarían el juicio' },
        { t:'ul', items:[
          'Inicio de evacuaciones o llegada de medios médicos junto al polígono',
          'Confirmación de la orden de ensayo por una segunda fuente independiente',
          'Cierre del espacio aéreo sobre la región',
        ]},
        { t:'h3', x:'Lo debilitarían' },
        { t:'ul', items:[
          'Desmantelamiento visible de las instalaciones del polígono',
          'Que la fuente única de E4 resulte estar comprometida',
          'La firma de un acuerdo que haga el ensayo políticamente inviable',
        ]},
        { t:'warn', x:'Decidir ahora qué te haría cambiar de opinión hace mucho más difícil, dentro de tres meses, explicar las señales para descartarlas. Si no lo escribes hoy, cuando llegue la señal dirás «eso no invalida mi análisis». Sí lo hará. Solo que ya no querrás verlo.' },
      ]},
    ],
  },

  biz: {
    statement: 'Sigues a los competidores. Una empresa rival, siempre estable, ha publicado 40 vacantes de ingeniería de software en dos meses. Nunca había hecho nada así. Tu pregunta: ¿por qué contratan a tanta gente de golpe?',
    steps: [
      { n:1, title:'Hipótesis', blocks:[
        { t:'table', head:['', 'Hipótesis'], rows:[
          ['H1', 'La contratación es para construir un producto nuevo'],
          ['H2', 'La contratación es para reponer a quienes se fueron'],
          ['H3', 'La contratación es para inflar la plantilla antes de una venta'],
          ['H4', 'Las vacantes no son reales; se publicaron para desorientar a los competidores'],
        ]},
        { t:'tip', x:'Fíjate en la formulación. Las cuatro están escritas como «la contratación es para…» a propósito. Así el objetivo es uno u otro, y las hipótesis se excluyen. Si se hubieran escrito como «están creciendo» y «van a lanzar un producto», ambas podrían ser ciertas a la vez y la matriz dejaría de funcionar.' },
      ]},
      { n:2, title:'Información', blocks:[
        { t:'table', head:['', 'Texto', 'Tipo'], rows:[
          ['E1', '40 vacantes de ingeniería publicadas en dos meses', 'Informe / hecho'],
          ['E2', 'El CEO dijo en una entrevista que viene «un año grande»', 'Informe / hecho'],
          ['E3', 'Ningún anuncio, patente ni señal de producto nuevo', 'Ausencia significativa'],
          ['E4', 'Varios ingenieros sénior se marcaron «open to work» el mes anterior', 'Informe / hecho'],
          ['E5', 'Supongo que quien prepara un producto nuevo también contrataría gestores de producto y diseñadores, y las 40 vacantes son solo de ingeniería', 'Supuesto'],
          ['E6', 'Alquilaron una oficina mayor en el mismo barrio', 'Informe / hecho'],
        ]},
      ]},
      { n:3, title:'Matriz', blocks:[
        { t:'table', head:['', 'H1 producto', 'H2 reposición', 'H3 venta', 'H4 vacantes falsas'], rows:[
          ['E1 cuarenta vacantes', 'CC', 'C', 'C', 'C'],
          ['E2 entrevista del CEO', 'C', 'C', 'C', 'C'],
          ['E3 ninguna señal de producto', 'I', 'C', 'C', 'C'],
          ['E4 sénior marchándose', 'I', 'CC', 'I', 'C — discutible'],
          ['E5 faltan perfiles de producto', 'I', 'CC', 'C', '·'],
          ['E6 oficina mayor', 'C', 'C', 'C', 'C'],
        ]},
        { t:'h3', x:'La celda discutible: E4 frente a H4' },
        { t:'p', x:'Si las vacantes son falsas, ¿los sénior que se van dicen algo? Dos lecturas. Nada: las salidas son independientes de que las ofertas sean reales. O mucho: las salidas dan motivo al embuste, porque se finge una expansión precisamente para tapar un éxodo.' },
        { t:'p', x:'La segunda lectura es más fuerte, y por eso está marcada C. Pero escribe la nota:' },
        { t:'quote', x:'Depende de suponer que la empresa tendría interés en ocultar las salidas. Si son públicas y ya conocidas, el motivo desaparece y esto vuelve a «no pertinente».' },
      ]},
      { n:4, title:'Pasos 4 a 8', blocks:[
        { t:'p', x:'Sigue el caso de inteligencia a partir del paso 4: las instrucciones son idénticas. La lectura de esta matriz concreta:' },
        { t:'ul', items:[
          'E2 y E6 no valen nada. Encajan con todo. Ruido.',
          'E4 y E5 son los que separan las hipótesis, y ambos apuntan a la reposición de equipo.',
          'H2 sale por delante: es la que menos tiene en contra.',
          'En el informe, cubre las cuatro, y di con claridad que H3 (la venta) no fue refutada, lo que puede significar que es plausible o solo que nunca buscaste información que la pusiera a prueba.',
        ]},
      ]},
    ],
  },
},

};
