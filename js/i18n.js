/* ============================================================================
   SAT Toolkit — Sistema de traduções
   ----------------------------------------------------------------------------
   TODO texto visível na interface vive aqui, nunca embutido no HTML ou no JS.
   Para adicionar um idioma: copiar o bloco inteiro de "en" e traduzir os valores.
   As CHAVES (lado esquerdo) nunca mudam — só os valores.

   Idiomas ativos: en (inglês), es (espanhol).
   Português deliberadamente ausente por decisão de projeto.
   ============================================================================ */

const I18N = {

  /* ========================= INGLÊS ========================= */
  en: {
    meta: { langName: 'English', dir: 'ltr' },

    app: {
      title: 'SAT Toolkit',
      subtitle: 'Structured Analytic Techniques',
      techniqueName: 'Analysis of Competing Hypotheses',
      techniqueAbbr: 'ACH',
      tagline: 'Test explanations by trying to refute them, not confirm them.',
    },

    nav: {
      language: 'Language',
      simpleMode: 'Standard mode',
      advancedMode: 'Advanced mode',
      modeHint: 'Advanced mode adds source credibility, relevance weighting and weighted scores.',
      save: 'Save',
      load: 'Load',
      exportPdf: 'Export PDF',
      exportImage: 'Export image',
      reset: 'New analysis',
      sample: 'Load example',
      help: 'About this technique',
      manual: 'Manual',
    },

    steps: {
      label: 'Step',
      of: 'of',
      s1: { name: 'Hypotheses',   full: 'Identify the hypotheses' },
      s2: { name: 'Evidence',     full: 'List the relevant information' },
      s3: { name: 'Matrix',       full: 'Rate diagnosticity' },
      s4: { name: 'Refine',       full: 'Refine the matrix' },
      s5: { name: 'Conclusions',  full: 'Draw tentative conclusions' },
      s6: { name: 'Sensitivity',  full: 'Test sensitivity' },
      s7: { name: 'Report',       full: 'Report the conclusions' },
      s8: { name: 'Indicators',   full: 'Set indicators to monitor' },
      next: 'Next step',
      prev: 'Previous step',
    },

    guide: {
      s1: 'Build the full set of possible explanations before you start judging them. Hypotheses should be mutually exclusive — if one is true, the others must be false. Include every reasonable possibility, even the ones you doubt. If your opponent could be misleading you, add a deception hypothesis: it cannot be ruled out simply because you see no sign of it.',
      s2: '"Evidence" here means everything that shapes your thinking: reporting and facts, but also your own arguments and assumptions, and things you would expect to see but do not. Absent evidence counts. An assumption you never write down is an assumption you can never challenge.',
      s3: 'Work across one row at a time, not down the columns. For each item ask: if this hypothesis were true, would I expect to see this? Rate it consistent, inconsistent or not relevant. If your answer starts with "it depends on...", you have just uncovered an assumption — record it in the cell note.',
      s4: 'Now reconsider the shape of the problem. Two hypotheses that no evidence can tell apart should probably merge. A gap you did not anticipate may need a new hypothesis. Items that fit every hypothesis equally carry no diagnostic value: set them aside, but keep the record that you considered them.',
      s5: 'Read the scores as a ranking, not a verdict. The strongest hypothesis is the one with the least evidence against it — not the one with the most evidence for it. A long list of supporting evidence proves little, because the same evidence usually supports several hypotheses at once.',
      s6: 'Your conclusion probably rests on very few items. Find them, then attack them. What if that source were wrong, planted or open to another reading? If a single reinterpretation flips your ranking, that item deserves far more scrutiny before you publish anything.',
      s7: 'Report the relative likelihood of every hypothesis, not only the leading one. Say which items were most diagnostic and how strongly they discriminate. Explaining why you rejected the alternatives is part of the argument, not an appendix to it.',
      s8: 'Conclusions are provisional. Write two watchlists now, while your reasoning is fresh: signs that would strengthen your judgment, and signs that would undermine it. Deciding in advance what would change your mind makes it much harder to explain those signs away later.',
    },

    /* Ajuda embutida: a armadilha específica de cada passo.
       Complementa `guide` (o que fazer) em vez de a repetir. */
    pitfall: {
      heading: 'Watch out',
      s1: 'The trap here is hypotheses that overlap. Test them in pairs — could both be true at once? If so, rewrite. And do not drop the deception hypothesis for lack of evidence: that is exactly what it would look like.',
      s2: 'The trap here is listing only facts. If no assumption and no absent evidence appear in your list, the matrix does not reflect how you actually think — and nothing you took for granted can be challenged.',
      s3: 'The trap here is working down the columns. That is how you slide back into collecting support. Go across, one row at a time. And when you catch yourself thinking "it depends on…", write that assumption in the cell note.',
      s4: 'The trap here is deleting the items that discriminate nothing. Set them aside, but keep them — they are the record that you considered them.',
      s5: 'The trap here is reading a zero as strength. A hypothesis with nothing against it may simply be one you never tried to refute. And if the ranking feels wrong, something in your head never made it into the matrix.',
      s6: 'The trap here is skipping this step because the conclusion feels solid. It usually rests on one or two items. Ask of each: could it be wrong, planted, or open to another reading?',
      s7: 'The trap here is writing only about the winner. A judgment without the rejected alternatives is incomplete — your reader needs them to plan for you being wrong.',
      s8: 'The trap here is leaving this for later. Decide now what would change your mind, or in three months you will explain the signs away instead of acting on them.',
    },

    hyp: {
      heading: 'Hypotheses',
      countLabel: 'hypotheses',
      add: 'Add hypothesis',
      addDeception: 'Add deception hypothesis',
      placeholder: 'A hypothesis is a statement that can be tested and disproved — not a question.',
      labelPrefix: 'H',
      storyLabel: 'Story: how could this be true?',
      storyPlaceholder: 'Briefly sketch the chain of events that would make this hypothesis true.',
      remove: 'Remove hypothesis',
      empty: 'No hypotheses yet. Start by writing every explanation you consider possible.',
      deceptionText: 'We are the target of a deliberate deception operation.',
      deceptionStory: 'An adversary is shaping what we see in order to lead us to a false conclusion. Absence of evidence for this is expected, not reassuring.',
      quality: {
        heading: 'What makes a good hypothesis',
        c1: 'It can be tested and proved wrong',
        c2: 'It is a statement, not a question',
        c3: 'It rests on observation and knowledge',
        c4: 'It states clearly what should follow',
        c5: 'It links a what to a why',
        source: 'Criteria: Pherson & Pherson, Critical Thinking for Strategic Intelligence, ch. 13',
      },
    },

    ev: {
      heading: 'Evidence, arguments and assumptions',
      countLabel: 'items',
      add: 'Add item',
      placeholder: 'Reporting, an argument, an assumption, or something you would expect to see and do not.',
      labelPrefix: 'E',
      remove: 'Remove item',
      empty: 'Nothing listed yet. Include facts, but also your own arguments and assumptions.',
      typeLabel: 'Type',
      types: {
        evidence:   'Reporting / fact',
        argument:   'Argument',
        assumption: 'Assumption',
        absence:    'Absent evidence',
      },
      typeHint: 'Absent evidence is what you would expect to see if a hypothesis were true, but do not.',
      sourceLabel: 'Source',
      sourcePlaceholder: 'Where it came from',
      dateLabel: 'Date',
      credLabel: 'Source credibility',
      relLabel: 'Relevance',
      scale: { high: 'High', medium: 'Medium', low: 'Low' },
    },

    matrix: {
      heading: 'Diagnosticity matrix',
      rowsAre: 'Rows: evidence',
      colsAre: 'Columns: hypotheses',
      instruction: 'Click a cell to cycle through the ratings. Work across one row at a time.',
      needBoth: 'Add at least one hypothesis and one item of evidence to build the matrix.',
      progress: 'Matrix completed',
      cellNote: 'Assumption this rating depends on',
      cellNotePlaceholder: 'If your rating began with "it depends on...", write that assumption here.',
      noteBadge: 'Has a recorded assumption',
      sortBy: 'Sort evidence',
      sortEntry: 'Order entered',
      sortDiag: 'Most diagnostic first',
      sortType: 'By type',
      legend: 'Ratings',
    },

    rating: {
      na:  { code: '·',  name: 'Not relevant',           hint: 'This item says nothing about this hypothesis.' },
      c:   { code: 'C',  name: 'Consistent',             hint: 'You would expect to see this if the hypothesis were true.' },
      cc:  { code: 'CC', name: 'Strongly consistent',    hint: 'Particularly compelling support.' },
      i:   { code: 'I',  name: 'Inconsistent',           hint: 'This does not fit the hypothesis.' },
      ii:  { code: 'II', name: 'Strongly inconsistent',  hint: 'This severely undercuts the hypothesis.' },
    },

    scores: {
      heading: 'Inconsistency scores',
      explain: 'Lower is stronger. The leading hypothesis is the one with the least evidence against it.',
      inconsistency: 'Inconsistency',
      weighted: 'Weighted',
      rank: 'Rank',
      leading: 'Leading hypothesis',
      weakest: 'Weakest hypothesis',
      noData: 'Rate some cells to see the scores.',
      formulaHeading: 'How these numbers are calculated',
      formulaBody: 'Inconsistency score: each I counts 1, each II counts 2. Consistent and not-relevant ratings count 0, because evidence in favour of a hypothesis carries far less weight than evidence against it. Weighted score multiplies each penalty by the credibility and relevance you assigned to that item (High 1.0, Medium 0.7, Low 0.4).',
      formulaCaveat: 'Note on fidelity: the source book states that the original ACH software produces an inconsistency score and a weighted inconsistency score, but does not publish the exact arithmetic. The formula above is our own transparent implementation of the described logic. Treat the weighted figure as an aid, not as an authoritative reproduction.',
      diagHeading: 'Evidence by diagnostic value',
      diagExplain: 'An item that fits every hypothesis equally tells you nothing. The items that split the hypotheses apart are the ones driving your conclusion.',
      diagCol: 'Diagnostic value',
      noDiag: 'No diagnostic value',
    },

    sens: {
      heading: 'Sensitivity test',
      explain: 'Switch off the most diagnostic items one at a time. If the ranking changes, your conclusion rests on that single item.',
      disable: 'Ignore this item',
      enabled: 'Active',
      disabled: 'Ignored',
      changed: 'Ranking changes without this item',
      stable: 'Ranking holds',
      noneYet: 'Rate the matrix first.',
      topDriver: 'Drives the conclusion',
    },

    alerts: {
      heading: 'Analytic health check',
      none: 'No warnings. This does not mean the analysis is right — only that these particular traps were avoided.',
      tooFew: 'Only {n} hypotheses. Working from two options is where satisficing starts. Generate every possibility before you narrow down.',
      tooMany: '{n} hypotheses is more than most people can hold at once. Consider grouping the closest ones for a first pass.',
      noDeception: 'No deception hypothesis. Absence of evidence for deception is not evidence of its absence — a well-run operation is meant to leave no trace.',
      noAssumptions: 'No assumptions listed. Conclusions are usually driven by assumptions rather than by reporting. If none are written down, none can be challenged.',
      noAbsence: 'No absent evidence listed. What you would expect to see and do not is often more telling than what was reported.',
      zeroDiag: '{n} item(s) are consistent with every hypothesis and therefore discriminate nothing. Set them aside, but keep the record that you considered them.',
      hypNoInconsistency: '{name} has nothing against it at all. That may mean it is strong — or that you have not yet looked for evidence that would refute it.',
      closeCall: 'The top two hypotheses are nearly tied. The evidence does not yet separate them; say so plainly rather than forcing a choice.',
      assumptionDriven: '{n} of the most diagnostic ratings rest on a recorded assumption. Lower your confidence in the scores accordingly.',
      manyItems: 'With {n} items, each new one barely moves the scores. If you are tracking change over time, consider analysing older and newer evidence separately.',
      incomplete: 'The matrix is {n}% rated. Scores are provisional until every cell is filled.',
      confirmationWarning: 'A reminder: this technique only protects you if you come in with an open mind. If you already know the answer you want, you will find a way to read the evidence as consistent with it.',
    },

    ind: {
      heading: 'Indicators to monitor',
      explain: 'Two watchlists, written now, while your reasoning is fresh.',
      confirmHeading: 'Would strengthen the judgment',
      refuteHeading: 'Would undermine the judgment',
      add: 'Add indicator',
      placeholder: 'An observable development you could actually detect.',
      remove: 'Remove indicator',
      empty: 'Nothing listed yet.',
    },

    report: {
      heading: 'Report',
      question: 'Analytic question',
      questionPlaceholder: 'What exactly are you trying to answer?',
      analyst: 'Analyst',
      analystPlaceholder: 'Name or team',
      date: 'Date',
      summary: 'Assessment',
      summaryPlaceholder: 'State the relative likelihood of every hypothesis, not just the leading one, and say which items were most diagnostic.',
      ranking: 'Ranking',
      keyDrivers: 'Most diagnostic items',
      recordedAssumptions: 'Recorded assumptions',
      noAssumptionsRecorded: 'No assumptions were recorded against individual ratings.',
      generated: 'Produced with',
    },

    about: {
      heading: 'About this technique',
      whatHeading: 'What it does',
      whatBody: 'ACH lays competing explanations side by side and forces each item of information to be judged against all of them at once. The logic is borrowed from the philosophy of science: you cannot prove a hypothesis true, because the same evidence usually fits several hypotheses. You can, however, disprove one. So the strongest surviving explanation is the one with the least against it.',
      whenHeading: 'When to use it',
      whenBody: 'Use it when being wrong would be costly, when intuition is not enough, when the issue is contested and you need an audit trail of what was considered, or when deliberate deception is a live possibility — the technique was originally built for exactly that problem.',
      limitsHeading: 'What it will not do',
      limitsBody: 'The scores are not a verdict. The technique organises your judgment; it does not replace it. It also tends to raise your sense of uncertainty rather than lower it, which is usually an honest reflection of the situation rather than a defect.',
      sourcesHeading: 'Sources',
      src1: 'Heuer, R. J. Jr. — Psychology of Intelligence Analysis, ch. 8. CIA Center for the Study of Intelligence, 1999. (Public domain)',
      src2: 'Heuer, R. J. Jr. & Pherson, R. H. — Structured Analytic Techniques for Intelligence Analysis, § 7.3.',
      src3: 'Pherson, K. H. & Pherson, R. H. — Critical Thinking for Strategic Intelligence, ch. 13.',
      paraphraseNote: 'All explanatory text in this tool is written in our own words. No passage is reproduced from the source books.',
      close: 'Close',
    },

    confirm: {
      resetTitle: 'Start a new analysis?',
      resetBody: 'This clears the hypotheses, the evidence and the matrix. This cannot be undone.',
      resetOk: 'Clear everything',
      cancel: 'Cancel',
      removeHyp: 'Remove this hypothesis and all of its ratings?',
      removeEv: 'Remove this item and all of its ratings?',
    },

    toast: {
      saved: 'Analysis saved to this browser',
      loaded: 'Analysis loaded',
      noSave: 'No saved analysis found',
      exported: 'Image exported',
      sampleLoaded: 'Example loaded',
      cleared: 'Cleared',
    },

    sample: {
      question: 'Will the government of Country X carry out a nuclear test in the next six months?',
      // As quatro hipóteses são mutuamente exclusivas: se uma for verdadeira,
      // as outras três têm de ser falsas. H2 e H3 distinguem-se pela intenção
      // (rotina vs. encenação); H4 é sobre a informação, não sobre a atividade.
      h1: 'X is preparing a test and is concealing the preparations.',
      h1s: 'The programme is at the point where a test is technically necessary, and the leadership is hiding it to avoid sanctions before the fact.',
      h2: 'X is not preparing a test; the observed activity is routine.',
      h2s: 'What we are seeing is ordinary maintenance and rotation at the site, and it was never intended to be noticed.',
      h3: 'X is not preparing a test, but is deliberately staging visible activity to gain leverage.',
      h3s: 'The activity is genuine but theatrical: it is meant to be detected, in order to extract concessions in the current negotiations.',
      h4: 'The reporting reaching us is being fabricated or planted.',
      h4s: 'The activity may be unremarkable; what is being manipulated is our picture of it. Absence of proof of this is expected, not reassuring.',
      e1: 'Increased vehicle movement at the test site over the last eight weeks.',
      e2: 'The head of state publicly denied any intention to test.',
      e3: 'No evacuation or safety preparations observed in nearby settlements.',
      e4: 'A single source with indirect access reports a test order was issued.',
      e5: 'Assumption: a state at this stage of a weapons programme needs a test to validate the design.',
      e6: 'Diplomatic delegation quietly cancelled scheduled travel for next month.',
    },

    footer: {
      builtWith: 'Local prototype — nothing leaves your browser.',
      technique: 'Technique',
      status: 'Prototype for validation',
    },
  },

  /* ========================= ESPANHOL ========================= */
  es: {
    meta: { langName: 'Español', dir: 'ltr' },

    app: {
      title: 'SAT Toolkit',
      subtitle: 'Técnicas Analíticas Estructuradas',
      techniqueName: 'Análisis de Hipótesis en Competencia',
      techniqueAbbr: 'ACH',
      tagline: 'Pon a prueba las explicaciones intentando refutarlas, no confirmarlas.',
    },

    nav: {
      language: 'Idioma',
      simpleMode: 'Modo estándar',
      advancedMode: 'Modo avanzado',
      modeHint: 'El modo avanzado añade credibilidad de la fuente, ponderación por relevancia y puntuaciones ponderadas.',
      save: 'Guardar',
      load: 'Cargar',
      exportPdf: 'Exportar PDF',
      exportImage: 'Exportar imagen',
      reset: 'Nuevo análisis',
      sample: 'Cargar ejemplo',
      help: 'Sobre esta técnica',
      manual: 'Manual',
    },

    steps: {
      label: 'Paso',
      of: 'de',
      s1: { name: 'Hipótesis',     full: 'Identificar las hipótesis' },
      s2: { name: 'Información',   full: 'Listar la información relevante' },
      s3: { name: 'Matriz',        full: 'Valorar el valor diagnóstico' },
      s4: { name: 'Depurar',       full: 'Depurar la matriz' },
      s5: { name: 'Conclusiones',  full: 'Extraer conclusiones provisionales' },
      s6: { name: 'Sensibilidad',  full: 'Probar la sensibilidad' },
      s7: { name: 'Informe',       full: 'Comunicar las conclusiones' },
      s8: { name: 'Indicadores',   full: 'Fijar indicadores de seguimiento' },
      next: 'Paso siguiente',
      prev: 'Paso anterior',
    },

    guide: {
      s1: 'Construye el conjunto completo de explicaciones posibles antes de empezar a juzgarlas. Las hipótesis deben ser mutuamente excluyentes: si una es cierta, las demás han de ser falsas. Incluye toda posibilidad razonable, incluso las que te parezcan poco probables. Si tu adversario pudiera estar engañándote, añade una hipótesis de engaño: no puede descartarse por el mero hecho de no ver indicios de ella.',
      s2: 'Aquí «información» significa todo lo que orienta tu razonamiento: informes y hechos, pero también tus propios argumentos y supuestos, y aquello que esperarías observar y no observas. La ausencia cuenta. Un supuesto que nunca escribes es un supuesto que nunca podrás cuestionar.',
      s3: 'Trabaja una fila cada vez, no por columnas. Para cada elemento pregúntate: si esta hipótesis fuera cierta, ¿esperaría ver esto? Valóralo como consistente, inconsistente o no pertinente. Si tu respuesta empieza por «depende de…», acabas de descubrir un supuesto: anótalo en la nota de la celda.',
      s4: 'Ahora replantea la forma del problema. Dos hipótesis que ninguna información logra separar probablemente deban fusionarse. Un hueco que no habías previsto puede exigir una hipótesis nueva. Los elementos que encajan igual con todas las hipótesis no tienen valor diagnóstico: apártalos, pero deja constancia de que los consideraste.',
      s5: 'Lee las puntuaciones como una ordenación, no como un veredicto. La hipótesis más sólida es la que tiene menos en contra, no la que tiene más a favor. Una larga lista de información favorable demuestra poco, porque esa misma información suele encajar con varias hipótesis a la vez.',
      s6: 'Tu conclusión probablemente se apoya en muy pocos elementos. Localízalos y atácalos. ¿Y si esa fuente estuviera equivocada, hubiera sido manipulada o admitiera otra lectura? Si una sola reinterpretación altera la ordenación, ese elemento merece mucho más escrutinio antes de publicar nada.',
      s7: 'Comunica la probabilidad relativa de todas las hipótesis, no solo de la principal. Indica qué elementos fueron más diagnósticos y con qué fuerza discriminan. Explicar por qué descartaste las alternativas forma parte del argumento, no es un apéndice.',
      s8: 'Las conclusiones son provisionales. Redacta ahora dos listas de vigilancia, mientras el razonamiento está fresco: señales que reforzarían tu juicio y señales que lo debilitarían. Decidir de antemano qué te haría cambiar de opinión hace mucho más difícil explicar después esas señales para descartarlas.',
    },

    /* Ayuda integrada: la trampa concreta de cada paso.
       Complementa `guide` (qué hacer) en vez de repetirla. */
    pitfall: {
      heading: 'Ojo aquí',
      s1: 'La trampa aquí son las hipótesis que se solapan. Pruébalas por pares: ¿podrían ser ciertas a la vez? Si es así, reescríbelas. Y no descartes la hipótesis de engaño por falta de indicios: es exactamente el aspecto que tendría.',
      s2: 'La trampa aquí es listar solo hechos. Si no aparece ningún supuesto ni ninguna ausencia, la matriz no refleja cómo piensas realmente — y nada de lo que diste por sentado podrá ser cuestionado.',
      s3: 'La trampa aquí es trabajar por columnas. Así se recae en reunir apoyos. Ve fila a fila. Y cuando te sorprendas pensando «depende de…», escribe ese supuesto en la nota de la celda.',
      s4: 'La trampa aquí es borrar los elementos que no discriminan nada. Apártalos, pero consérvalos: son la constancia de que los consideraste.',
      s5: 'La trampa aquí es leer un cero como solidez. Una hipótesis sin nada en contra puede ser sencillamente una que nunca intentaste refutar. Y si la ordenación te chirría, algo de tu cabeza no llegó a la matriz.',
      s6: 'La trampa aquí es saltarse este paso porque la conclusión parece sólida. Casi siempre se apoya en uno o dos elementos. Pregunta de cada uno: ¿podría estar equivocado, plantado o admitir otra lectura?',
      s7: 'La trampa aquí es escribir solo sobre la ganadora. Un juicio sin las alternativas descartadas está incompleto: quien te lee las necesita para prever que te equivoques.',
      s8: 'La trampa aquí es dejarlo para después. Decide ahora qué te haría cambiar de opinión, o dentro de tres meses explicarás las señales para descartarlas en vez de actuar.',
    },

    hyp: {
      heading: 'Hipótesis',
      countLabel: 'hipótesis',
      add: 'Añadir hipótesis',
      addDeception: 'Añadir hipótesis de engaño',
      placeholder: 'Una hipótesis es un enunciado que puede ponerse a prueba y refutarse, no una pregunta.',
      labelPrefix: 'H',
      storyLabel: 'Relato: ¿cómo podría ser cierta?',
      storyPlaceholder: 'Esboza brevemente la cadena de hechos que haría cierta esta hipótesis.',
      remove: 'Eliminar hipótesis',
      empty: 'Todavía no hay hipótesis. Empieza escribiendo cada explicación que consideres posible.',
      deceptionText: 'Somos el objetivo de una operación de engaño deliberada.',
      deceptionStory: 'Un adversario está moldeando lo que vemos para llevarnos a una conclusión falsa. La falta de indicios es lo esperable, no un motivo de tranquilidad.',
      quality: {
        heading: 'Qué hace buena a una hipótesis',
        c1: 'Puede ponerse a prueba y demostrarse falsa',
        c2: 'Es un enunciado, no una pregunta',
        c3: 'Se apoya en observación y conocimiento',
        c4: 'Enuncia con claridad qué debería seguirse',
        c5: 'Vincula un qué con un porqué',
        source: 'Criterios: Pherson & Pherson, Critical Thinking for Strategic Intelligence, cap. 13',
      },
    },

    ev: {
      heading: 'Información, argumentos y supuestos',
      countLabel: 'elementos',
      add: 'Añadir elemento',
      placeholder: 'Un informe, un argumento, un supuesto, o algo que esperarías observar y no observas.',
      labelPrefix: 'E',
      remove: 'Eliminar elemento',
      empty: 'Nada listado todavía. Incluye hechos, pero también tus propios argumentos y supuestos.',
      typeLabel: 'Tipo',
      types: {
        evidence:   'Informe / hecho',
        argument:   'Argumento',
        assumption: 'Supuesto',
        absence:    'Ausencia significativa',
      },
      typeHint: 'La ausencia significativa es lo que esperarías ver si una hipótesis fuera cierta, y no ves.',
      sourceLabel: 'Fuente',
      sourcePlaceholder: 'De dónde procede',
      dateLabel: 'Fecha',
      credLabel: 'Credibilidad de la fuente',
      relLabel: 'Relevancia',
      scale: { high: 'Alta', medium: 'Media', low: 'Baja' },
    },

    matrix: {
      heading: 'Matriz de valor diagnóstico',
      rowsAre: 'Filas: información',
      colsAre: 'Columnas: hipótesis',
      instruction: 'Pulsa una celda para recorrer las valoraciones. Trabaja una fila cada vez.',
      needBoth: 'Añade al menos una hipótesis y un elemento de información para construir la matriz.',
      progress: 'Matriz completada',
      cellNote: 'Supuesto del que depende esta valoración',
      cellNotePlaceholder: 'Si tu valoración empezó por «depende de…», escribe aquí ese supuesto.',
      noteBadge: 'Tiene un supuesto anotado',
      sortBy: 'Ordenar información',
      sortEntry: 'Orden de entrada',
      sortDiag: 'Mayor valor diagnóstico primero',
      sortType: 'Por tipo',
      legend: 'Valoraciones',
    },

    rating: {
      na:  { code: '·',  name: 'No pertinente',            hint: 'Este elemento no dice nada sobre esta hipótesis.' },
      c:   { code: 'C',  name: 'Consistente',              hint: 'Esperarías ver esto si la hipótesis fuera cierta.' },
      cc:  { code: 'CC', name: 'Muy consistente',          hint: 'Apoyo especialmente convincente.' },
      i:   { code: 'I',  name: 'Inconsistente',            hint: 'Esto no encaja con la hipótesis.' },
      ii:  { code: 'II', name: 'Muy inconsistente',        hint: 'Esto socava gravemente la hipótesis.' },
    },

    scores: {
      heading: 'Puntuaciones de inconsistencia',
      explain: 'Cuanto más baja, más sólida. La hipótesis principal es la que tiene menos en contra.',
      inconsistency: 'Inconsistencia',
      weighted: 'Ponderada',
      rank: 'Puesto',
      leading: 'Hipótesis principal',
      weakest: 'Hipótesis más débil',
      noData: 'Valora algunas celdas para ver las puntuaciones.',
      formulaHeading: 'Cómo se calculan estas cifras',
      formulaBody: 'Puntuación de inconsistencia: cada I suma 1 y cada II suma 2. Las valoraciones consistentes y no pertinentes suman 0, porque la información a favor de una hipótesis pesa mucho menos que la información en contra. La puntuación ponderada multiplica cada penalización por la credibilidad y la relevancia asignadas al elemento (Alta 1,0; Media 0,7; Baja 0,4).',
      formulaCaveat: 'Nota de fidelidad: el libro de referencia indica que el software original de ACH genera una puntuación de inconsistencia y una puntuación ponderada, pero no publica la aritmética exacta. La fórmula anterior es nuestra implementación transparente de la lógica descrita. Trata la cifra ponderada como una ayuda, no como una reproducción autorizada.',
      diagHeading: 'Información por valor diagnóstico',
      diagExplain: 'Un elemento que encaja igual con todas las hipótesis no te dice nada. Los que separan las hipótesis son los que sostienen tu conclusión.',
      diagCol: 'Valor diagnóstico',
      noDiag: 'Sin valor diagnóstico',
    },

    sens: {
      heading: 'Prueba de sensibilidad',
      explain: 'Desactiva de uno en uno los elementos más diagnósticos. Si la ordenación cambia, tu conclusión depende de ese único elemento.',
      disable: 'Ignorar este elemento',
      enabled: 'Activo',
      disabled: 'Ignorado',
      changed: 'La ordenación cambia sin este elemento',
      stable: 'La ordenación se mantiene',
      noneYet: 'Valora antes la matriz.',
      topDriver: 'Sostiene la conclusión',
    },

    alerts: {
      heading: 'Revisión de salud analítica',
      none: 'Sin avisos. Esto no significa que el análisis sea correcto, solo que se han evitado estas trampas concretas.',
      tooFew: 'Solo {n} hipótesis. Trabajar con dos opciones es donde empieza el «satisficing». Genera todas las posibilidades antes de reducir.',
      tooMany: '{n} hipótesis superan lo que la mayoría puede sostener a la vez. Considera agrupar las más próximas para una primera pasada.',
      noDeception: 'No hay hipótesis de engaño. La falta de indicios de engaño no prueba su ausencia: una operación bien ejecutada está diseñada para no dejar rastro.',
      noAssumptions: 'No hay supuestos listados. Las conclusiones suelen estar guiadas por supuestos más que por informes. Si ninguno se escribe, ninguno puede cuestionarse.',
      noAbsence: 'No hay ausencias significativas listadas. Lo que esperarías ver y no ves suele ser más revelador que lo que sí se ha informado.',
      zeroDiag: '{n} elemento(s) son consistentes con todas las hipótesis y por tanto no discriminan nada. Apártalos, pero deja constancia de que los consideraste.',
      hypNoInconsistency: '{name} no tiene nada en contra. Puede ser señal de solidez, o de que aún no has buscado información que la refute.',
      closeCall: 'Las dos primeras hipótesis están casi empatadas. La información todavía no las separa; dilo con claridad en vez de forzar una elección.',
      assumptionDriven: '{n} de las valoraciones más diagnósticas se apoyan en un supuesto anotado. Rebaja en consecuencia tu confianza en las puntuaciones.',
      manyItems: 'Con {n} elementos, cada nuevo aporte apenas mueve las puntuaciones. Si sigues un cambio a lo largo del tiempo, analiza por separado la información antigua y la reciente.',
      incomplete: 'La matriz está valorada al {n}%. Las puntuaciones son provisionales hasta completar todas las celdas.',
      confirmationWarning: 'Un recordatorio: esta técnica solo te protege si llegas con la mente abierta. Si ya sabes qué respuesta quieres, encontrarás el modo de leer la información como consistente con ella.',
    },

    ind: {
      heading: 'Indicadores de seguimiento',
      explain: 'Dos listas de vigilancia, redactadas ahora, con el razonamiento fresco.',
      confirmHeading: 'Reforzarían el juicio',
      refuteHeading: 'Debilitarían el juicio',
      add: 'Añadir indicador',
      placeholder: 'Un hecho observable que realmente pudieras detectar.',
      remove: 'Eliminar indicador',
      empty: 'Nada listado todavía.',
    },

    report: {
      heading: 'Informe',
      question: 'Pregunta analítica',
      questionPlaceholder: '¿Qué es exactamente lo que intentas responder?',
      analyst: 'Analista',
      analystPlaceholder: 'Nombre o equipo',
      date: 'Fecha',
      summary: 'Valoración',
      summaryPlaceholder: 'Indica la probabilidad relativa de todas las hipótesis, no solo la principal, y señala qué elementos fueron más diagnósticos.',
      ranking: 'Ordenación',
      keyDrivers: 'Elementos más diagnósticos',
      recordedAssumptions: 'Supuestos anotados',
      noAssumptionsRecorded: 'No se anotaron supuestos en ninguna valoración.',
      generated: 'Elaborado con',
    },

    about: {
      heading: 'Sobre esta técnica',
      whatHeading: 'Qué hace',
      whatBody: 'El ACH coloca las explicaciones rivales una junto a otra y obliga a juzgar cada elemento de información frente a todas ellas a la vez. La lógica procede de la filosofía de la ciencia: no puedes demostrar que una hipótesis es cierta, porque la misma información suele encajar con varias. Sí puedes, en cambio, refutar una. Por eso la explicación más sólida es la que menos tiene en contra.',
      whenHeading: 'Cuándo usarla',
      whenBody: 'Úsala cuando equivocarse salga caro, cuando la intuición no baste, cuando el asunto sea controvertido y necesites dejar constancia de qué se consideró, o cuando el engaño deliberado sea una posibilidad real: la técnica se creó precisamente para ese problema.',
      limitsHeading: 'Qué no hace',
      limitsBody: 'Las puntuaciones no son un veredicto. La técnica organiza tu juicio, no lo sustituye. Además suele aumentar la sensación de incertidumbre en vez de reducirla, lo que normalmente refleja con honestidad la situación real y no es un defecto.',
      sourcesHeading: 'Fuentes',
      src1: 'Heuer, R. J. Jr. — Psychology of Intelligence Analysis, cap. 8. CIA Center for the Study of Intelligence, 1999. (Dominio público)',
      src2: 'Heuer, R. J. Jr. & Pherson, R. H. — Structured Analytic Techniques for Intelligence Analysis, § 7.3.',
      src3: 'Pherson, K. H. & Pherson, R. H. — Critical Thinking for Strategic Intelligence, cap. 13.',
      paraphraseNote: 'Todo el texto explicativo de esta herramienta está redactado con palabras propias. No se reproduce ningún pasaje de los libros de referencia.',
      close: 'Cerrar',
    },

    confirm: {
      resetTitle: '¿Empezar un análisis nuevo?',
      resetBody: 'Esto borra las hipótesis, la información y la matriz. No se puede deshacer.',
      resetOk: 'Borrar todo',
      cancel: 'Cancelar',
      removeHyp: '¿Eliminar esta hipótesis y todas sus valoraciones?',
      removeEv: '¿Eliminar este elemento y todas sus valoraciones?',
    },

    toast: {
      saved: 'Análisis guardado en este navegador',
      loaded: 'Análisis cargado',
      noSave: 'No se ha encontrado ningún análisis guardado',
      exported: 'Imagen exportada',
      sampleLoaded: 'Ejemplo cargado',
      cleared: 'Borrado',
    },

    sample: {
      question: '¿Realizará el gobierno del País X un ensayo nuclear en los próximos seis meses?',
      // Las cuatro hipótesis son mutuamente excluyentes: si una es cierta, las
      // otras tres han de ser falsas. H2 y H3 se distinguen por la intención
      // (rutina vs. escenificación); H4 versa sobre la información, no sobre
      // la actividad.
      h1: 'X prepara un ensayo y oculta los preparativos.',
      h1s: 'El programa ha llegado al punto en que el ensayo es técnicamente necesario, y la cúpula lo oculta para evitar sanciones anticipadas.',
      h2: 'X no prepara ningún ensayo; la actividad observada es rutinaria.',
      h2s: 'Lo que vemos es mantenimiento y rotación ordinarios en las instalaciones, y nunca se pretendió que fuera advertido.',
      h3: 'X no prepara ningún ensayo, pero escenifica actividad visible de forma deliberada para ganar poder negociador.',
      h3s: 'La actividad es real pero teatral: está pensada para ser detectada, con el fin de arrancar concesiones en la negociación en curso.',
      h4: 'La información que nos llega está siendo fabricada o plantada.',
      h4s: 'La actividad puede ser anodina; lo que se manipula es nuestra imagen de ella. La falta de pruebas de esto es lo esperable, no un motivo de tranquilidad.',
      e1: 'Aumento del movimiento de vehículos en el polígono de ensayos durante las últimas ocho semanas.',
      e2: 'El jefe del Estado ha negado públicamente cualquier intención de ensayar.',
      e3: 'No se observan evacuaciones ni preparativos de seguridad en los núcleos cercanos.',
      e4: 'Una única fuente con acceso indirecto informa de que se ha cursado una orden de ensayo.',
      e5: 'Supuesto: un Estado en esta fase de un programa armamentístico necesita un ensayo para validar el diseño.',
      e6: 'Una delegación diplomática ha cancelado discretamente un viaje previsto para el mes próximo.',
    },

    footer: {
      builtWith: 'Prototipo local: nada sale de tu navegador.',
      technique: 'Técnica',
      status: 'Prototipo para validación',
    },
  },
};

/* ---------------------------------------------------------------------------
   Utilitário de leitura: t('hyp.add') devolve a string no idioma ativo.
   Aceita substituição de variáveis: t('alerts.tooFew', { n: 2 })
   --------------------------------------------------------------------------- */
const Lang = {
  current: 'en',

  available() {
    return Object.keys(I18N).map((code) => ({ code, name: I18N[code].meta.langName }));
  },

  set(code) {
    if (!I18N[code]) return false;
    this.current = code;
    try { localStorage.setItem('sat.lang', code); } catch (e) { /* modo privado */ }
    document.documentElement.lang = code;
    return true;
  },

  restore() {
    let saved = null;
    try { saved = localStorage.getItem('sat.lang'); } catch (e) { /* ignora */ }
    if (saved && I18N[saved]) { this.current = saved; }
    else {
      const nav = (navigator.language || 'en').slice(0, 2);
      if (I18N[nav]) this.current = nav;
    }
    document.documentElement.lang = this.current;
  },

  t(path, vars) {
    const walk = (obj) => path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
    let out = walk(I18N[this.current]);
    if (out === undefined) out = walk(I18N.en);      // recai no inglês
    if (out === undefined) return path;              // chave inexistente: mostra a chave
    if (typeof out === 'string' && vars) {
      Object.keys(vars).forEach((k) => { out = out.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]); });
    }
    return out;
  },
};

const t = (path, vars) => Lang.t(path, vars);
