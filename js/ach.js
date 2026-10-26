/* ============================================================================
   SAT Toolkit — Motor de cálculo do ACH
   ----------------------------------------------------------------------------
   Este arquivo contém APENAS a lógica da técnica: estado, pontuações, valor
   diagnóstico, teste de sensibilidade e alertas. Nada de interface, nada de
   texto visível (todo texto vem de i18n.js).

   FIDELIDADE — de onde vem cada regra:
   - Os 8 passos, a notação C/CC/I/II/vazio e a regra "menor inconsistência =
     hipótese mais forte" vêm de Heuer & Pherson, "Structured Analytic
     Techniques for Intelligence Analysis", § 7.3.
   - O procedimento original de 8 passos vem de Heuer, "Psychology of
     Intelligence Analysis", cap. 8 (domínio público).
   - Os critérios de boa hipótese vêm de Pherson & Pherson, "Critical Thinking
     for Strategic Intelligence", cap. 13.

   PRECISA VERIFICAÇÃO: o livro diz que o software original produz uma
   "inconsistency score" e uma "weighted inconsistency score", mas NÃO publica
   a aritmética exata. As fórmulas abaixo são implementação própria e
   transparente da lógica descrita. Estão isoladas em SCORING para poderem ser
   trocadas sem tocar no resto do código, caso a fórmula oficial apareça.
   ============================================================================ */

/* --- Valores das notações ------------------------------------------------ */
// Só a inconsistência pontua. Evidência a favor vale 0 — é o núcleo do método:
// não se prova uma hipótese, refuta-se.
const RATINGS = ['na', 'c', 'cc', 'i', 'ii'];

const SCORING = {
  penalty:   { na: 0, c: 0, cc: 0, i: 1, ii: 2 },   // pontos de inconsistência
  direction: { na: 0, c: 1, cc: 2, i: -1, ii: -2 }, // escala com sinal, p/ diagnosticidade
  weight:    { high: 1.0, medium: 0.7, low: 0.4 },  // credibilidade e relevância
};

/* --- Estado -------------------------------------------------------------- */
const ACH = {

  state: null,

  blank() {
    return {
      version: 1,
      question: '',
      analyst: '',
      date: new Date().toISOString().slice(0, 10),
      summary: '',
      hypotheses: [],   // { id, text, story }
      evidence: [],     // { id, text, type, source, date, credibility, relevance, muted }
      ratings: {},      // "evId|hypId" -> 'na'|'c'|'cc'|'i'|'ii'
      notes: {},        // "evId|hypId" -> texto do supuesto do qual a nota depende
      indicators: { confirm: [], refute: [] },
      advanced: false,
      step: 1,
    };
  },

  init() {
    this.state = this.blank();
    return this.state;
  },

  /* --- Identificadores ---------------------------------------------------- */
  uid(prefix) {
    return prefix + '_' + Math.random().toString(36).slice(2, 9);
  },

  key(evId, hypId) { return evId + '|' + hypId; },

  /* --- Hipóteses ----------------------------------------------------------
     `deception` marca explicitamente a hipótese de engano. Guardar a marca é
     mais fiável do que procurar palavras no texto, porque o analista pode
     redigir a hipótese de engano de mil maneiras — e frequentemente sem usar
     a palavra "engano".                                                      */
  addHypothesis(text, story, deception) {
    const h = { id: this.uid('h'), text: text || '', story: story || '', deception: !!deception };
    this.state.hypotheses.push(h);
    return h;
  },

  removeHypothesis(id) {
    this.state.hypotheses = this.state.hypotheses.filter((h) => h.id !== id);
    Object.keys(this.state.ratings).forEach((k) => {
      if (k.split('|')[1] === id) delete this.state.ratings[k];
    });
    Object.keys(this.state.notes).forEach((k) => {
      if (k.split('|')[1] === id) delete this.state.notes[k];
    });
  },

  /* --- Evidências --------------------------------------------------------- */
  addEvidence(data) {
    const e = Object.assign({
      id: this.uid('e'),
      text: '',
      type: 'evidence',
      source: '',
      date: '',
      credibility: 'medium',
      relevance: 'medium',
      muted: false,          // usado apenas no teste de sensibilidade
    }, data || {});
    this.state.evidence.push(e);
    return e;
  },

  removeEvidence(id) {
    this.state.evidence = this.state.evidence.filter((e) => e.id !== id);
    Object.keys(this.state.ratings).forEach((k) => {
      if (k.split('|')[0] === id) delete this.state.ratings[k];
    });
    Object.keys(this.state.notes).forEach((k) => {
      if (k.split('|')[0] === id) delete this.state.notes[k];
    });
  },

  /* --- Notações ----------------------------------------------------------- */
  getRating(evId, hypId) {
    return this.state.ratings[this.key(evId, hypId)] || 'na';
  },

  setRating(evId, hypId, rating) {
    if (rating === 'na') delete this.state.ratings[this.key(evId, hypId)];
    else this.state.ratings[this.key(evId, hypId)] = rating;
  },

  cycleRating(evId, hypId) {
    const cur = this.getRating(evId, hypId);
    const next = RATINGS[(RATINGS.indexOf(cur) + 1) % RATINGS.length];
    this.setRating(evId, hypId, next);
    return next;
  },

  getNote(evId, hypId) { return this.state.notes[this.key(evId, hypId)] || ''; },

  setNote(evId, hypId, txt) {
    const k = this.key(evId, hypId);
    if (txt && txt.trim()) this.state.notes[k] = txt.trim();
    else delete this.state.notes[k];
  },

  /* --- Peso de um item ----------------------------------------------------
     No modo estándar todo item pesa 1 — é o ACH "de papel e caneta".
     No modo avançado entram credibilidade e relevância.                      */
  itemWeight(ev) {
    if (!this.state.advanced) return 1;
    return SCORING.weight[ev.credibility] * SCORING.weight[ev.relevance];
  },

  /* --- Pontuações por hipótese --------------------------------------------
     Regra do livro: conta-se o que está CONTRA a hipótese, não o que está a
     favor. Menor pontuação = hipótese mais forte.                            */
  scores(opts) {
    const skipId = (opts && opts.skip) || null;
    const active = this.state.evidence.filter((e) => !e.muted && e.id !== skipId);

    return this.state.hypotheses.map((h) => {
      let raw = 0, weighted = 0, against = 0, favour = 0;

      active.forEach((e) => {
        const r = this.getRating(e.id, h.id);
        const p = SCORING.penalty[r];
        if (p > 0) { raw += p; weighted += p * this.itemWeight(e); against += 1; }
        if (r === 'c' || r === 'cc') favour += 1;
      });

      return {
        id: h.id,
        text: h.text,
        raw,
        weighted: Math.round(weighted * 100) / 100,
        against,
        favour,
      };
    });
  },

  /* --- Ordenação: menor inconsistência primeiro ---------------------------- */
  ranked(opts) {
    const key = this.state.advanced ? 'weighted' : 'raw';
    return this.scores(opts)
      .slice()
      .sort((a, b) => a[key] - b[key] || b.favour - a.favour);
  },

  /* --- Valor diagnóstico de um item ---------------------------------------
     Um item que recebe a MESMA notação em todas as hipóteses não separa nada
     e portanto não tem valor diagnóstico. Medimos a amplitude (maior menos
     menor) na escala com sinal. Amplitude 0 = item inútil para discriminar.

     PRECISA VERIFICAÇÃO: medida própria. O livro descreve o conceito de
     diagnosticidade e manda ordenar por ele, mas não publica a fórmula.      */
  diagnosticity(evId) {
    const hyps = this.state.hypotheses;
    if (hyps.length < 2) return 0;

    const vals = hyps.map((h) => SCORING.direction[this.getRating(evId, h.id)]);
    const spread = Math.max.apply(null, vals) - Math.min.apply(null, vals);
    const ev = this.state.evidence.find((e) => e.id === evId);
    const w = ev ? this.itemWeight(ev) : 1;
    return Math.round(spread * w * 100) / 100;
  },

  evidenceByDiagnosticity() {
    return this.state.evidence
      .map((e) => ({ ev: e, diag: this.diagnosticity(e.id) }))
      .sort((a, b) => b.diag - a.diag);
  },

  /* --- Progresso de preenchimento ----------------------------------------- */
  completion() {
    const total = this.state.evidence.length * this.state.hypotheses.length;
    if (!total) return 0;
    let filled = 0;
    this.state.evidence.forEach((e) => {
      this.state.hypotheses.forEach((h) => {
        if (this.getRating(e.id, h.id) !== 'na') filled += 1;
      });
    });
    return Math.round((filled / total) * 100);
  },

  /* --- Teste de sensibilidade ---------------------------------------------
     Passo 6 do método: se retirar UM item muda a ordenação, a conclusão
     depende desse item e ele precisa ser reexaminado antes de publicar.      */
  sensitivity() {
    const baseline = this.ranked().map((s) => s.id).join('>');
    return this.evidenceByDiagnosticity()
      .filter((row) => row.diag > 0)
      .map((row) => {
        const without = this.ranked({ skip: row.ev.id }).map((s) => s.id).join('>');
        return { ev: row.ev, diag: row.diag, flips: without !== baseline };
      });
  },

  /* --- Alertas de qualidade analítica -------------------------------------
     Cada alerta corresponde a uma armadilha nomeada nos livros. A chave `msg`
     aponta para i18n; nenhum texto é montado aqui.                           */
  alerts() {
    const s = this.state;
    const out = [];
    const nH = s.hypotheses.length;
    const nE = s.evidence.length;

    if (nH === 0 || nE === 0) return out;

    // Heuer cap. 8: começar com o conjunto completo evita "satisficing".
    if (nH < 3) out.push({ level: 'warn', msg: 'alerts.tooFew', vars: { n: nH } });

    // Heuer cap. 8: mais de sete hipóteses é ingerível; agrupar.
    if (nH > 7) out.push({ level: 'info', msg: 'alerts.tooMany', vars: { n: nH } });

    // § 7.3: incluir hipótese de engano quando cabível. Aceita a marca
    // explícita ou, para hipóteses escritas à mão, um vocabulário alargado.
    const hasDeception = s.hypotheses.some((h) =>
      h.deception === true ||
      /decep|engañ|engan|deceit|mislead|fabricat|planted|plantad|disinformation|desinformaci/i.test(h.text));
    if (!hasDeception) out.push({ level: 'info', msg: 'alerts.noDeception' });

    // § 7.3: a matriz deve refletir supostos, não só relatos.
    if (!s.evidence.some((e) => e.type === 'assumption')) {
      out.push({ level: 'warn', msg: 'alerts.noAssumptions' });
    }

    // Heuer cap. 8: o cão que não latiu — ausência conta como evidência.
    if (!s.evidence.some((e) => e.type === 'absence')) {
      out.push({ level: 'info', msg: 'alerts.noAbsence' });
    }

    // Passo 4: itens sem valor diagnóstico devem sair da matriz.
    if (nH >= 2) {
      const zero = s.evidence.filter((e) => this.diagnosticity(e.id) === 0).length;
      if (zero > 0) out.push({ level: 'info', msg: 'alerts.zeroDiag', vars: { n: zero } });
    }

    // Armadilha "insufficient attention to less likely hypotheses" (§ 7.3).
    this.scores().forEach((sc) => {
      if (sc.raw === 0 && nE >= 3) {
        out.push({ level: 'warn', msg: 'alerts.hypNoInconsistency', vars: { name: sc.text || '—' } });
      }
    });

    // Duas hipóteses empatadas: dizer isso é mais honesto que forçar escolha.
    const r = this.ranked();
    if (r.length >= 2) {
      const key = s.advanced ? 'weighted' : 'raw';
      const gap = r[1][key] - r[0][key];
      if (gap === 0 || (r[0][key] > 0 && gap / Math.max(r[0][key], 1) < 0.25)) {
        out.push({ level: 'warn', msg: 'alerts.closeCall' });
      }
    }

    // § 7.3: quantas notações diagnósticas dependem de um suposto anotado.
    const topDiag = this.evidenceByDiagnosticity().filter((x) => x.diag > 0).slice(0, 5);
    let assumptionBacked = 0;
    topDiag.forEach((row) => {
      s.hypotheses.forEach((h) => { if (this.getNote(row.ev.id, h.id)) assumptionBacked += 1; });
    });
    if (assumptionBacked > 0) {
      out.push({ level: 'warn', msg: 'alerts.assumptionDriven', vars: { n: assumptionBacked } });
    }

    // Armadilha "diminishing returns" (§ 7.3).
    if (nE > 30) out.push({ level: 'info', msg: 'alerts.manyItems', vars: { n: nE } });

    // Pontuações provisórias enquanto a matriz não estiver completa.
    const pct = this.completion();
    if (pct < 100) out.push({ level: 'info', msg: 'alerts.incomplete', vars: { n: pct } });

    // Advertência permanente do § 7.3 (a analogia da vacina contra a gripe).
    out.push({ level: 'note', msg: 'alerts.confirmationWarning' });

    return out;
  },

  /* --- Supostos anotados, para o informe ---------------------------------- */
  recordedAssumptions() {
    const out = [];
    Object.keys(this.state.notes).forEach((k) => {
      const [evId, hypId] = k.split('|');
      const ev = this.state.evidence.find((e) => e.id === evId);
      const hy = this.state.hypotheses.find((h) => h.id === hypId);
      if (ev && hy) {
        out.push({
          evIndex: this.state.evidence.indexOf(ev) + 1,
          hypIndex: this.state.hypotheses.indexOf(hy) + 1,
          note: this.state.notes[k],
        });
      }
    });
    return out;
  },

  /* --- Indicadores -------------------------------------------------------- */
  addIndicator(kind, text) {
    this.state.indicators[kind].push({ id: this.uid('i'), text: text || '' });
  },

  removeIndicator(kind, id) {
    this.state.indicators[kind] = this.state.indicators[kind].filter((i) => i.id !== id);
  },

  /* --- Persistência ------------------------------------------------------- */
  save() {
    try {
      localStorage.setItem('sat.ach', JSON.stringify(this.state));
      return true;
    } catch (e) { return false; }
  },

  load() {
    try {
      const raw = localStorage.getItem('sat.ach');
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      this.state = Object.assign(this.blank(), parsed);
      return true;
    } catch (e) { return false; }
  },

  hasSave() {
    try { return !!localStorage.getItem('sat.ach'); } catch (e) { return false; }
  },

  /* --- Exemplo para demonstração ------------------------------------------ */
  loadSample() {
    this.state = this.blank();
    this.state.question = t('sample.question');

    const h1 = this.addHypothesis(t('sample.h1'), t('sample.h1s'));
    const h2 = this.addHypothesis(t('sample.h2'), t('sample.h2s'));
    const h3 = this.addHypothesis(t('sample.h3'), t('sample.h3s'));
    const h4 = this.addHypothesis(t('sample.h4'), t('sample.h4s'), true);

    const e1 = this.addEvidence({ text: t('sample.e1'), type: 'evidence',   credibility: 'high',   relevance: 'high' });
    const e2 = this.addEvidence({ text: t('sample.e2'), type: 'evidence',   credibility: 'low',    relevance: 'medium' });
    const e3 = this.addEvidence({ text: t('sample.e3'), type: 'absence',    credibility: 'high',   relevance: 'high' });
    const e4 = this.addEvidence({ text: t('sample.e4'), type: 'evidence',   credibility: 'low',    relevance: 'high' });
    const e5 = this.addEvidence({ text: t('sample.e5'), type: 'assumption', credibility: 'medium', relevance: 'high' });
    const e6 = this.addEvidence({ text: t('sample.e6'), type: 'evidence',   credibility: 'medium', relevance: 'medium' });

    // Notações refeitas para as hipóteses corrigidas.
    // E2 é deliberadamente consistente com as quatro: serve para demonstrar
    // o que é informação sem valor diagnóstico.
    const R = [
      [e1, h1, 'cc'], [e1, h2, 'i'],  [e1, h3, 'cc'], [e1, h4, 'c'],
      [e2, h1, 'c'],  [e2, h2, 'c'],  [e2, h3, 'c'],  [e2, h4, 'c'],
      [e3, h1, 'ii'], [e3, h2, 'c'],  [e3, h3, 'cc'], [e3, h4, 'c'],
      [e4, h1, 'cc'], [e4, h2, 'i'],  [e4, h3, 'c'],  [e4, h4, 'cc'],
      [e5, h1, 'c'],  [e5, h2, 'i'],  [e5, h3, 'i'],  [e5, h4, 'na'],
      [e6, h1, 'c'],  [e6, h2, 'i'],  [e6, h3, 'c'],  [e6, h4, 'na'],
    ];
    R.forEach(([e, h, r]) => this.setRating(e.id, h.id, r));

    // Exemplo de suposto anotado, para mostrar o mecanismo do passo 3.
    this.setNote(e3.id, h1.id,
      Lang.current === 'es'
        ? 'Depende de que este Estado siga el mismo protocolo de seguridad que otros con programas comparables.'
        : 'Depends on this state following the same safety protocol as others with comparable programmes.');

    this.state.advanced = true;
    return this.state;
  },
};
