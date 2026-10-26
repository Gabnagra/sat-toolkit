/* ============================================================================
   SAT Toolkit — Camada de interface
   ----------------------------------------------------------------------------
   Liga o motor (ach.js) ao HTML. Nenhum texto visível é escrito aqui:
   tudo passa por t('chave') de i18n.js.
   ============================================================================ */

/* --- Atalhos ------------------------------------------------------------- */
const $  = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

function el(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((k) => {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else if (k === 'html') node.innerHTML = attrs[k];
      else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) {
        node.setAttribute(k, attrs[k]);
      }
    });
  }
  (children || []).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return node;
}

/* --- Estado da interface -------------------------------------------------- */
const UI = {
  activeNote: null,     // { evId, hypId } — célula com editor de suposto aberto
  matrixSort: 'entry',  // entry | diag | type
  pitfallOpen: true,    // caixa de armadilha aberta? Persiste entre sessões
};

// Quem já domina a técnica fecha a caixa uma vez e ela fica fechada.
try {
  const saved = localStorage.getItem('sat.pitfallOpen');
  if (saved !== null) UI.pitfallOpen = saved === '1';
} catch (e) { /* modo privado */ }

const STEP_COUNT = 8;

/* ========================================================================== */
/*  RENDERIZAÇÃO GERAL                                                        */
/* ========================================================================== */

function renderAll() {
  applyStaticText();
  renderStepRail();
  renderStepHead();
  renderStepBody();
  renderScores();
  renderAlerts();
  renderPrintArea();
}

/* Preenche tudo que tem data-i18n e os rótulos fixos da barra superior. */
function applyStaticText() {
  $$('[data-i18n]').forEach((node) => { node.textContent = t(node.getAttribute('data-i18n')); });

  document.title = t('app.title') + ' — ' + t('app.techniqueAbbr');

  $('#manualLink').textContent = t('nav.manual');

  const modeBtn = $('#modeToggle');
  $('#modeLabel').textContent = ACH.state.advanced ? t('nav.advancedMode') : t('nav.simpleMode');
  modeBtn.classList.toggle('is-on', ACH.state.advanced);
  modeBtn.title = t('nav.modeHint');
}

/* --- Trilha de passos ----------------------------------------------------- */
function renderStepRail() {
  const rail = $('#stepRail');
  rail.innerHTML = '';
  for (let i = 1; i <= STEP_COUNT; i++) {
    const cur = ACH.state.step;
    rail.appendChild(el('button', {
      type: 'button',
      class: 'step-btn' + (i === cur ? ' is-active' : '') + (i < cur ? ' is-done' : ''),
      onClick: () => { goStep(i); },
    }, [
      el('span', { class: 'step-num', text: String(i) }),
      el('span', { text: t('steps.s' + i + '.name') }),
    ]));
  }
}

function renderStepHead() {
  const s = ACH.state.step;
  $('#stepCounter').textContent = t('steps.label') + ' ' + s + ' ' + t('steps.of') + ' ' + STEP_COUNT;
  $('#stepTitle').textContent   = t('steps.s' + s + '.full');
  $('#stepGuide').textContent   = t('guide.s' + s);
  $('#btnPrev').disabled = (s === 1);
  $('#btnNext').disabled = (s === STEP_COUNT);

  // Ajuda embutida — a armadilha deste passo.
  $('#pitfallHeading').textContent = t('pitfall.heading');
  $('#pitfallText').textContent    = t('pitfall.s' + s);
  $('#stepPitfall').open = UI.pitfallOpen;
}

function goStep(n) {
  ACH.state.step = Math.min(STEP_COUNT, Math.max(1, n));
  UI.activeNote = null;
  renderAll();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================================================== */
/*  CORPO DE CADA PASSO                                                       */
/* ========================================================================== */

function renderStepBody() {
  const box = $('#stepBody');
  box.innerHTML = '';
  const map = {
    1: viewHypotheses, 2: viewEvidence, 3: viewMatrix, 4: viewRefine,
    5: viewConclusions, 6: viewSensitivity, 7: viewReport, 8: viewIndicators,
  };
  box.appendChild(map[ACH.state.step]());
}

/* --- PASSO 1: Hipóteses --------------------------------------------------- */
function viewHypotheses() {
  const wrap = el('div');
  const hyps = ACH.state.hypotheses;

  wrap.appendChild(el('div', { class: 'list-head' }, [
    el('span', { class: 'list-count', text: hyps.length + ' ' + t('hyp.countLabel') }),
    el('div', { class: 'list-actions' }, [
      el('button', {
        class: 'btn btn-ghost', type: 'button', text: t('hyp.addDeception'),
        onClick: () => { ACH.addHypothesis(t('hyp.deceptionText'), t('hyp.deceptionStory'), true); renderAll(); },
      }),
      el('button', {
        class: 'btn btn-solid', type: 'button', text: t('hyp.add'),
        onClick: () => { ACH.addHypothesis('', ''); renderAll(); focusLast('.hyp-text'); },
      }),
    ]),
  ]));

  if (!hyps.length) {
    wrap.appendChild(el('div', { class: 'empty-state', text: t('hyp.empty') }));
  } else {
    hyps.forEach((h, i) => {
      wrap.appendChild(el('div', { class: 'item-card' }, [
        el('div', { class: 'item-tag', text: t('hyp.labelPrefix') + (i + 1) }),
        el('div', { class: 'item-body' }, [
          el('textarea', {
            class: 'textarea hyp-text', rows: 2, placeholder: t('hyp.placeholder'),
            onInput: (ev) => { h.text = ev.target.value; renderScores(); renderAlerts(); },
          }, [h.text]),
          el('label', { class: 'field', style: 'margin:9px 0 0' }, [
            el('span', { class: 'field-label', text: t('hyp.storyLabel') }),
            el('textarea', {
              class: 'textarea', rows: 2, placeholder: t('hyp.storyPlaceholder'),
              onInput: (ev) => { h.story = ev.target.value; },
            }, [h.story]),
          ]),
        ]),
        el('button', {
          class: 'item-remove', type: 'button', title: t('hyp.remove'), text: '×',
          onClick: () => {
            if (confirm(t('confirm.removeHyp'))) { ACH.removeHypothesis(h.id); renderAll(); }
          },
        }),
      ]));
    });
  }

  // Critérios de boa hipótese (Pherson & Pherson, cap. 13)
  wrap.appendChild(el('div', { class: 'criteria' }, [
    el('h4', { text: t('hyp.quality.heading') }),
    el('ul', {}, ['c1', 'c2', 'c3', 'c4', 'c5'].map((k) =>
      el('li', { text: t('hyp.quality.' + k) }))),
    el('p', { class: 'src', text: t('hyp.quality.source') }),
  ]));

  return wrap;
}

/* --- PASSO 2: Evidências -------------------------------------------------- */
function viewEvidence() {
  const wrap = el('div');
  const list = ACH.state.evidence;
  const adv  = ACH.state.advanced;

  wrap.appendChild(el('div', { class: 'list-head' }, [
    el('span', { class: 'list-count', text: list.length + ' ' + t('ev.countLabel') }),
    el('div', { class: 'list-actions' }, [
      el('button', {
        class: 'btn btn-solid', type: 'button', text: t('ev.add'),
        onClick: () => { ACH.addEvidence({}); renderAll(); focusLast('.ev-text'); },
      }),
    ]),
  ]));

  if (!list.length) {
    wrap.appendChild(el('div', { class: 'empty-state', text: t('ev.empty') }));
  } else {
    list.forEach((e, i) => {
      const meta = el('div', { class: 'item-meta' }, [
        // Tipo (relato / argumento / suposto / ausência)
        selectField(t('ev.typeLabel'), e.type,
          ['evidence', 'argument', 'assumption', 'absence'].map((v) => ({ v, label: t('ev.types.' + v) })),
          (v) => { e.type = v; renderAll(); }),

        el('input', {
          class: 'mini-input', type: 'text', value: e.source,
          placeholder: t('ev.sourcePlaceholder'), 'aria-label': t('ev.sourceLabel'),
          onInput: (ev) => { e.source = ev.target.value; },
        }),

        el('input', {
          class: 'mini-input', type: 'date', value: e.date, 'aria-label': t('ev.dateLabel'),
          onInput: (ev) => { e.date = ev.target.value; },
        }),
      ]);

      // Credibilidade e relevância só existem no modo avançado.
      if (adv) {
        const scale = [
          { v: 'high',   label: t('ev.scale.high') },
          { v: 'medium', label: t('ev.scale.medium') },
          { v: 'low',    label: t('ev.scale.low') },
        ];
        meta.appendChild(selectField(t('ev.credLabel'), e.credibility, scale,
          (v) => { e.credibility = v; renderAll(); }));
        meta.appendChild(selectField(t('ev.relLabel'), e.relevance, scale,
          (v) => { e.relevance = v; renderAll(); }));
      }

      wrap.appendChild(el('div', { class: 'item-card' }, [
        el('div', { class: 'item-tag tag-ev', text: t('ev.labelPrefix') + (i + 1) }),
        el('div', { class: 'item-body' }, [
          el('textarea', {
            class: 'textarea ev-text', rows: 2, placeholder: t('ev.placeholder'),
            onInput: (ev) => { e.text = ev.target.value; },
          }, [e.text]),
          meta,
        ]),
        el('button', {
          class: 'item-remove', type: 'button', title: t('ev.remove'), text: '×',
          onClick: () => {
            if (confirm(t('confirm.removeEv'))) { ACH.removeEvidence(e.id); renderAll(); }
          },
        }),
      ]));
    });
  }

  wrap.appendChild(el('p', { class: 'hint', text: t('ev.typeHint') }));
  return wrap;
}

function selectField(label, value, options, onChange) {
  const sel = el('select', {
    class: 'mini-select', 'aria-label': label,
    onChange: (ev) => onChange(ev.target.value),
  }, options.map((o) => el('option', { value: o.v, selected: o.v === value }, [o.label])));
  return sel;
}

/* --- PASSO 3: Matriz ------------------------------------------------------ */
function viewMatrix() {
  const wrap = el('div');
  const { hypotheses: H, evidence: E } = ACH.state;

  if (!H.length || !E.length) {
    wrap.appendChild(el('div', { class: 'empty-state', text: t('matrix.needBoth') }));
    return wrap;
  }

  const pct = ACH.completion();

  wrap.appendChild(el('div', { class: 'matrix-toolbar' }, [
    el('div', { class: 'matrix-progress' }, [
      el('span', { text: t('matrix.progress') }),
      el('div', { class: 'progress-track' }, [
        el('div', { class: 'progress-fill', style: 'width:' + pct + '%' }),
      ]),
      el('span', { style: 'font-family:var(--mono)', text: pct + '%' }),
    ]),
    el('label', { class: 'field-inline' }, [
      el('span', { class: 'field-label', style: 'margin:0', text: t('matrix.sortBy') }),
      el('select', {
        class: 'mini-select',
        onChange: (ev) => { UI.matrixSort = ev.target.value; renderStepBody(); },
      }, [
        el('option', { value: 'entry', selected: UI.matrixSort === 'entry' }, [t('matrix.sortEntry')]),
        el('option', { value: 'diag',  selected: UI.matrixSort === 'diag'  }, [t('matrix.sortDiag')]),
        el('option', { value: 'type',  selected: UI.matrixSort === 'type'  }, [t('matrix.sortType')]),
      ]),
    ]),
  ]));

  wrap.appendChild(el('p', { class: 'hint', style: 'margin:0 0 11px', text: t('matrix.instruction') }));
  wrap.appendChild(buildMatrixTable(sortedEvidence()));
  wrap.appendChild(buildLegend());

  if (UI.activeNote) wrap.appendChild(buildNoteEditor());

  return wrap;
}

function sortedEvidence() {
  const list = ACH.state.evidence.slice();
  if (UI.matrixSort === 'diag') {
    return list.sort((a, b) => ACH.diagnosticity(b.id) - ACH.diagnosticity(a.id));
  }
  if (UI.matrixSort === 'type') {
    const order = { assumption: 0, absence: 1, argument: 2, evidence: 3 };
    return list.sort((a, b) => order[a.type] - order[b.type]);
  }
  return list;
}

function buildMatrixTable(evList) {
  const H = ACH.state.hypotheses;

  const head = el('tr', {}, [
    el('th', { class: 'corner' }, [t('matrix.rowsAre') + ' · ' + t('matrix.colsAre')]),
  ].concat(H.map((h, i) => el('th', { class: 'hyp-col', title: h.text }, [
    el('span', { class: 'hyp-head-tag', text: t('hyp.labelPrefix') + (i + 1) }),
    el('span', { class: 'hyp-head-text', text: h.text || '—' }),
  ]))));

  const rows = evList.map((e) => {
    const idx  = ACH.state.evidence.indexOf(e) + 1;
    const diag = ACH.diagnosticity(e.id);

    const evCell = el('td', { class: 'ev-cell' }, [
      el('div', {}, [
        el('span', { class: 'ev-cell-tag', text: t('ev.labelPrefix') + idx }),
        el('span', { class: 'ev-cell-text', text: e.text || '—' }),
      ]),
      el('div', { class: 'ev-cell-meta' }, [
        el('span', { class: 'type-badge type-' + e.type, text: t('ev.types.' + e.type) }),
        el('span', {
          class: 'diag-badge' + (diag >= 3 ? ' is-strong' : (diag === 0 ? ' is-zero' : '')),
          title: t('scores.diagCol'),
          text: diag === 0 ? t('scores.noDiag') : t('scores.diagCol') + ' ' + diag,
        }),
      ]),
    ]);

    const cells = H.map((h) => {
      const r    = ACH.getRating(e.id, h.id);
      const note = ACH.getNote(e.id, h.id);
      const btn  = el('button', {
        type: 'button',
        class: 'rate-btn rate-' + r,
        title: t('rating.' + r + '.name') + ' — ' + t('rating.' + r + '.hint'),
        'aria-label': t('ev.labelPrefix') + idx + ' / ' + t('hyp.labelPrefix') +
                      (ACH.state.hypotheses.indexOf(h) + 1) + ': ' + t('rating.' + r + '.name'),
        onClick: () => {
          ACH.cycleRating(e.id, h.id);
          UI.activeNote = { evId: e.id, hypId: h.id };
          renderStepBody(); renderScores(); renderAlerts(); renderPrintArea();
        },
      }, [t('rating.' + r + '.code')]);
      if (note) btn.appendChild(el('span', { class: 'note-flag', title: t('matrix.noteBadge') }));
      return el('td', { class: 'rate-cell' }, [btn]);
    });

    return el('tr', {}, [evCell].concat(cells));
  });

  return el('div', { class: 'matrix-scroll' }, [
    el('table', { class: 'matrix' }, [
      el('thead', {}, [head]),
      el('tbody', {}, rows),
    ]),
  ]);
}

function buildLegend() {
  return el('div', { class: 'legend' }, [
    el('span', { class: 'legend-title', text: t('matrix.legend') }),
  ].concat(['na', 'c', 'cc', 'i', 'ii'].map((r) => el('span', { class: 'legend-item' }, [
    el('span', { class: 'legend-swatch rate-' + r, text: t('rating.' + r + '.code') }),
    el('span', { text: t('rating.' + r + '.name') }),
  ]))));
}

/* Editor do suposto do qual a notação depende — passo 3 do método. */
function buildNoteEditor() {
  const { evId, hypId } = UI.activeNote;
  const e = ACH.state.evidence.find((x) => x.id === evId);
  const h = ACH.state.hypotheses.find((x) => x.id === hypId);
  if (!e || !h) { UI.activeNote = null; return el('div'); }

  const ctx = t('ev.labelPrefix') + (ACH.state.evidence.indexOf(e) + 1) + ' × ' +
              t('hyp.labelPrefix') + (ACH.state.hypotheses.indexOf(h) + 1);

  return el('div', { class: 'note-editor' }, [
    el('h4', { text: t('matrix.cellNote') }),
    el('p', { class: 'ctx', text: ctx }),
    el('textarea', {
      class: 'textarea', rows: 2, placeholder: t('matrix.cellNotePlaceholder'),
      onInput: (ev) => { ACH.setNote(evId, hypId, ev.target.value); renderAlerts(); },
      onBlur: () => { renderStepBody(); },
    }, [ACH.getNote(evId, hypId)]),
  ]);
}

/* --- PASSO 4: Depurar ----------------------------------------------------- */
function viewRefine() {
  const wrap = el('div');
  const rows = ACH.evidenceByDiagnosticity();

  if (!rows.length) { wrap.appendChild(el('div', { class: 'empty-state', text: t('matrix.needBoth') })); return wrap; }

  wrap.appendChild(el('p', { class: 'panel-sub', style: 'font-size:12.5px', text: t('scores.diagExplain') }));

  const table = el('table', { class: 'data-table' }, [
    el('thead', {}, [el('tr', {}, [
      el('th', { text: '#' }),
      el('th', { text: t('ev.heading') }),
      el('th', { text: t('ev.typeLabel') }),
      el('th', { class: 'num', text: t('scores.diagCol') }),
    ])]),
    el('tbody', {}, rows.map((row) => el('tr', {}, [
      el('td', { class: 'num', text: t('ev.labelPrefix') + (ACH.state.evidence.indexOf(row.ev) + 1) }),
      el('td', { text: row.ev.text || '—' }),
      el('td', {}, [el('span', { class: 'type-badge type-' + row.ev.type, text: t('ev.types.' + row.ev.type) })]),
      el('td', { class: 'num' }, [
        row.diag === 0
          ? el('span', { class: 'flag flag-ok', text: t('scores.noDiag') })
          : el('span', { text: String(row.diag) }),
      ]),
    ]))),
  ]);
  wrap.appendChild(table);
  return wrap;
}

/* --- PASSO 5: Conclusões -------------------------------------------------- */
function viewConclusions() {
  const wrap = el('div');
  const ranked = ACH.ranked();

  if (!ranked.length) { wrap.appendChild(el('div', { class: 'empty-state', text: t('scores.noData') })); return wrap; }

  const adv = ACH.state.advanced;

  wrap.appendChild(el('table', { class: 'data-table' }, [
    el('thead', {}, [el('tr', {}, [
      el('th', { text: t('scores.rank') }),
      el('th', { text: t('hyp.heading') }),
      el('th', { class: 'num', text: t('scores.inconsistency') }),
      adv ? el('th', { class: 'num', text: t('scores.weighted') }) : null,
    ].filter(Boolean))]),
    el('tbody', {}, ranked.map((s, i) => el('tr', {}, [
      el('td', { class: 'num' }, [
        el('strong', { text: String(i + 1) }),
        i === 0 ? el('span', { class: 'flag flag-ok', style: 'margin-left:7px', text: t('scores.leading') }) : null,
      ].filter(Boolean)),
      el('td', {}, [
        el('span', { style: 'font-family:var(--mono);color:var(--ink-3);margin-right:7px',
                     text: t('hyp.labelPrefix') + (ACH.state.hypotheses.findIndex((h) => h.id === s.id) + 1) }),
        el('span', { text: s.text || '—' }),
      ]),
      el('td', { class: 'num', text: String(s.raw) }),
      adv ? el('td', { class: 'num', text: s.weighted.toFixed(2) }) : null,
    ].filter(Boolean)))),
  ]));

  wrap.appendChild(el('div', { class: 'callout' }, [
    el('h4', { text: t('scores.formulaHeading') }),
    el('p',  { text: t('scores.formulaBody') }),
  ]));

  wrap.appendChild(el('div', { class: 'callout is-caveat' }, [
    el('p', { text: t('scores.formulaCaveat') }),
  ]));

  return wrap;
}

/* --- PASSO 6: Sensibilidade ----------------------------------------------- */
function viewSensitivity() {
  const wrap = el('div');
  const rows = ACH.sensitivity();

  if (!rows.length) { wrap.appendChild(el('div', { class: 'empty-state', text: t('sens.noneYet') })); return wrap; }

  wrap.appendChild(el('p', { class: 'panel-sub', style: 'font-size:12.5px', text: t('sens.explain') }));

  wrap.appendChild(el('table', { class: 'data-table' }, [
    el('thead', {}, [el('tr', {}, [
      el('th', { text: '#' }),
      el('th', { text: t('ev.heading') }),
      el('th', { class: 'num', text: t('scores.diagCol') }),
      el('th', { text: '' }),
    ])]),
    el('tbody', {}, rows.map((row) => el('tr', {}, [
      el('td', { class: 'num', text: t('ev.labelPrefix') + (ACH.state.evidence.indexOf(row.ev) + 1) }),
      el('td', { text: row.ev.text || '—' }),
      el('td', { class: 'num', text: String(row.diag) }),
      el('td', {}, [
        row.flips
          ? el('span', { class: 'flag flag-danger', text: t('sens.changed') })
          : el('span', { class: 'flag flag-ok', text: t('sens.stable') }),
      ]),
    ]))),
  ]));

  return wrap;
}

/* --- PASSO 7: Informe ----------------------------------------------------- */
function viewReport() {
  const wrap = el('div');
  const s = ACH.state;

  wrap.appendChild(el('label', { class: 'field' }, [
    el('span', { class: 'field-label', text: t('report.question') }),
    el('input', {
      class: 'input', type: 'text', value: s.question, placeholder: t('report.questionPlaceholder'),
      onInput: (ev) => { s.question = ev.target.value; renderPrintArea(); },
    }),
  ]));

  wrap.appendChild(el('div', { class: 'field-row' }, [
    el('label', { class: 'field' }, [
      el('span', { class: 'field-label', text: t('report.analyst') }),
      el('input', {
        class: 'input', type: 'text', value: s.analyst, placeholder: t('report.analystPlaceholder'),
        onInput: (ev) => { s.analyst = ev.target.value; renderPrintArea(); },
      }),
    ]),
    el('label', { class: 'field' }, [
      el('span', { class: 'field-label', text: t('report.date') }),
      el('input', {
        class: 'input', type: 'date', value: s.date,
        onInput: (ev) => { s.date = ev.target.value; renderPrintArea(); },
      }),
    ]),
  ]));

  wrap.appendChild(el('label', { class: 'field' }, [
    el('span', { class: 'field-label', text: t('report.summary') }),
    el('textarea', {
      class: 'textarea', rows: 6, placeholder: t('report.summaryPlaceholder'),
      onInput: (ev) => { s.summary = ev.target.value; renderPrintArea(); },
    }, [s.summary]),
  ]));

  // Supostos anotados durante o passo 3 — o livro pede que sejam revistos aqui.
  const notes = ACH.recordedAssumptions();
  wrap.appendChild(el('div', { class: 'callout' }, [
    el('h4', { text: t('report.recordedAssumptions') }),
    notes.length
      ? el('ul', { style: 'margin:0;padding-left:18px' }, notes.map((n) =>
          el('li', { style: 'font-size:12.2px;color:var(--ink-2);margin-bottom:5px',
                     text: t('ev.labelPrefix') + n.evIndex + ' × ' + t('hyp.labelPrefix') + n.hypIndex + ' — ' + n.note })))
      : el('p', { text: t('report.noAssumptionsRecorded') }),
  ]));

  return wrap;
}

/* --- PASSO 8: Indicadores ------------------------------------------------- */
function viewIndicators() {
  const wrap = el('div');
  wrap.appendChild(el('p', { class: 'panel-sub', style: 'font-size:12.5px', text: t('ind.explain') }));

  const col = (kind, cls, headKey) => {
    const list = ACH.state.indicators[kind];
    return el('div', { class: 'ind-col ' + cls }, [
      el('h4', { text: t(headKey) }),
      list.length
        ? el('div', {}, list.map((item) => el('div', { class: 'ind-item' }, [
            el('input', {
              class: 'mini-input', type: 'text', value: item.text, placeholder: t('ind.placeholder'),
              onInput: (ev) => { item.text = ev.target.value; renderPrintArea(); },
            }),
            el('button', {
              class: 'item-remove', type: 'button', title: t('ind.remove'), text: '×',
              onClick: () => { ACH.removeIndicator(kind, item.id); renderStepBody(); renderPrintArea(); },
            }),
          ])))
        : el('p', { class: 'hint', text: t('ind.empty') }),
      el('button', {
        class: 'btn btn-ghost', type: 'button', style: 'margin-top:10px', text: t('ind.add'),
        onClick: () => { ACH.addIndicator(kind, ''); renderStepBody(); },
      }),
    ]);
  };

  wrap.appendChild(el('div', { class: 'ind-grid' }, [
    col('confirm', 'confirm', 'ind.confirmHeading'),
    col('refute',  'refute',  'ind.refuteHeading'),
  ]));

  return wrap;
}

/* ========================================================================== */
/*  PAINEL LATERAL                                                            */
/* ========================================================================== */

function renderScores() {
  const box = $('#scoreList');
  box.innerHTML = '';
  const ranked = ACH.ranked();

  if (!ranked.length || !ACH.state.evidence.length) {
    box.appendChild(el('p', { class: 'score-empty', text: t('scores.noData') }));
    return;
  }

  const adv = ACH.state.advanced;

  ranked.forEach((s, i) => {
    const hypIdx = ACH.state.hypotheses.findIndex((h) => h.id === s.id) + 1;
    box.appendChild(el('div', {
      class: 'score-row' + (i === 0 ? ' is-lead' : '') + (i === ranked.length - 1 && ranked.length > 2 ? ' is-last' : ''),
    }, [
      el('span', { class: 'score-rank', text: String(i + 1) }),
      el('span', { class: 'score-label' }, [
        el('span', { class: 'score-tag', text: t('hyp.labelPrefix') + hypIdx }),
        el('span', { class: 'score-text', text: s.text || '—' }),
      ]),
      el('span', { class: 'score-nums' }, [
        el('span', { class: 'score-main', text: adv ? s.weighted.toFixed(2) : String(s.raw) }),
        el('span', { class: 'score-sub', text: adv ? t('scores.weighted') : t('scores.inconsistency') }),
      ]),
    ]));
  });
}

function renderAlerts() {
  const box = $('#alertList');
  box.innerHTML = '';
  const list = ACH.alerts();

  if (!list.length) {
    box.appendChild(el('p', { class: 'panel-empty', text: t('alerts.none') }));
    return;
  }

  list.forEach((a) => {
    box.appendChild(el('div', { class: 'alert alert-' + a.level }, [
      el('span', { class: 'alert-mark' }),
      el('span', { text: t(a.msg, a.vars) }),
    ]));
  });
}

/* ========================================================================== */
/*  ÁREA DE IMPRESSÃO / PDF                                                   */
/* ========================================================================== */

function renderPrintArea() {
  const box = $('#printArea');
  box.innerHTML = '';
  const s = ACH.state;
  const adv = s.advanced;

  box.appendChild(el('h1', { text: t('app.techniqueName') + ' (' + t('app.techniqueAbbr') + ')' }));

  box.appendChild(el('p', { class: 'print-meta' }, [
    s.question ? el('span', {}, [el('strong', { text: t('report.question') + ': ' }), s.question]) : null,
    s.question ? el('br') : null,
    s.analyst ? el('span', {}, [el('strong', { text: t('report.analyst') + ': ' }), s.analyst + '  ']) : null,
    el('span', {}, [el('strong', { text: t('report.date') + ': ' }), s.date || '—']),
  ].filter(Boolean)));

  if (s.summary) {
    box.appendChild(el('h2', { text: t('report.summary') }));
    box.appendChild(el('p', { text: s.summary }));
  }

  // Ordenação
  const ranked = ACH.ranked();
  if (ranked.length) {
    box.appendChild(el('h2', { text: t('report.ranking') }));
    box.appendChild(el('table', {}, [
      el('thead', {}, [el('tr', {}, [
        el('th', { text: t('scores.rank') }),
        el('th', { text: t('hyp.heading') }),
        el('th', { text: t('scores.inconsistency') }),
        adv ? el('th', { text: t('scores.weighted') }) : null,
      ].filter(Boolean))]),
      el('tbody', {}, ranked.map((r, i) => el('tr', { class: i === 0 ? 'rank-lead' : '' }, [
        el('td', { class: 'c', text: String(i + 1) }),
        el('td', { text: (t('hyp.labelPrefix') + (s.hypotheses.findIndex((h) => h.id === r.id) + 1)) + ' — ' + (r.text || '—') }),
        el('td', { class: 'c', text: String(r.raw) }),
        adv ? el('td', { class: 'c', text: r.weighted.toFixed(2) }) : null,
      ].filter(Boolean)))),
    ]));
  }

  // Matriz completa
  if (s.hypotheses.length && s.evidence.length) {
    box.appendChild(el('h2', { text: t('matrix.heading') }));
    box.appendChild(el('table', {}, [
      el('thead', {}, [el('tr', {}, [el('th', { text: t('ev.heading') })]
        .concat(s.hypotheses.map((h, i) => el('th', { text: t('hyp.labelPrefix') + (i + 1) }))))]),
      el('tbody', {}, s.evidence.map((e, i) => el('tr', {}, [
        el('td', { text: t('ev.labelPrefix') + (i + 1) + ' — ' + (e.text || '—') }),
      ].concat(s.hypotheses.map((h) =>
        el('td', { class: 'c', text: t('rating.' + ACH.getRating(e.id, h.id) + '.code') })))))),
    ]));
  }

  // Itens mais diagnósticos
  const topDiag = ACH.evidenceByDiagnosticity().filter((r) => r.diag > 0).slice(0, 5);
  if (topDiag.length) {
    box.appendChild(el('h2', { text: t('report.keyDrivers') }));
    box.appendChild(el('table', {}, [
      el('thead', {}, [el('tr', {}, [
        el('th', { text: '#' }), el('th', { text: t('ev.heading') }), el('th', { text: t('scores.diagCol') }),
      ])]),
      el('tbody', {}, topDiag.map((r) => el('tr', {}, [
        el('td', { class: 'c', text: t('ev.labelPrefix') + (s.evidence.indexOf(r.ev) + 1) }),
        el('td', { text: r.ev.text || '—' }),
        el('td', { class: 'c', text: String(r.diag) }),
      ]))),
    ]));
  }

  // Supostos anotados
  const notes = ACH.recordedAssumptions();
  if (notes.length) {
    box.appendChild(el('h2', { text: t('report.recordedAssumptions') }));
    notes.forEach((n) => box.appendChild(el('p', {
      text: '• ' + t('ev.labelPrefix') + n.evIndex + ' × ' + t('hyp.labelPrefix') + n.hypIndex + ' — ' + n.note,
    })));
  }

  // Indicadores
  const ic = s.indicators.confirm.filter((i) => i.text.trim());
  const ir = s.indicators.refute.filter((i) => i.text.trim());
  if (ic.length || ir.length) {
    box.appendChild(el('h2', { text: t('ind.heading') }));
    if (ic.length) {
      box.appendChild(el('h3', { text: t('ind.confirmHeading') }));
      ic.forEach((i) => box.appendChild(el('p', { text: '• ' + i.text })));
    }
    if (ir.length) {
      box.appendChild(el('h3', { text: t('ind.refuteHeading') }));
      ir.forEach((i) => box.appendChild(el('p', { text: '• ' + i.text })));
    }
  }

  // Fontes — regra 4 do CLAUDE.md: citar sempre a origem da técnica.
  box.appendChild(el('div', { class: 'print-src' }, [
    el('p', { text: t('about.sourcesHeading') + ':' }),
    el('p', { text: t('about.src1') }),
    el('p', { text: t('about.src2') }),
    el('p', { text: t('about.src3') }),
    el('p', { text: t('scores.formulaCaveat') }),
    el('p', { text: t('report.generated') + ' ' + t('app.title') }),
  ]));
}

/* ========================================================================== */
/*  EXPORTAÇÃO DE IMAGEM (sem bibliotecas externas)                           */
/* ========================================================================== */

function exportImage() {
  const S = ACH.state;
  if (!S.hypotheses.length || !S.evidence.length) { toast(t('matrix.needBoth')); return; }

  const colW = 108, rowH = 46, headH = 92, evW = 430, pad = 28, titleH = 86;
  const W = pad * 2 + evW + S.hypotheses.length * colW;
  const H = pad * 2 + titleH + headH + S.evidence.length * rowH + 92;

  const ratio  = window.devicePixelRatio || 2;
  const canvas = el('canvas', { width: W * ratio, height: H * ratio });
  const c = canvas.getContext('2d');
  c.scale(ratio, ratio);

  const FILL = { na: '#202c3a', c: '#2f7f74', cc: '#3fa899', i: '#a8583f', ii: '#c94f45' };
  // Apenas as FAMÍLIAS. O tamanho é concatenado em cada uso; se o tamanho
  // vier embutido aqui, o valor final fica inválido e o canvas ignora a fonte.
  const sans = '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  const mono = 'ui-monospace, Menlo, Consolas, monospace';

  // Fundo
  c.fillStyle = '#0b1017'; c.fillRect(0, 0, W, H);

  // Cabeçalho
  c.fillStyle = '#4dd4c4'; c.font = '700 11px ' + sans;
  c.fillText(t('app.techniqueAbbr').toUpperCase() + ' · ' + t('app.title').toUpperCase(), pad, pad + 14);
  c.fillStyle = '#e6edf5'; c.font = '600 19px ' + sans;
  c.fillText(t('app.techniqueName'), pad, pad + 40);
  if (S.question) {
    c.fillStyle = '#a9b8ca'; c.font = '13px ' + sans;
    c.fillText(clip(c, S.question, W - pad * 2), pad, pad + 64);
  }

  const top = pad + titleH;

  // Cabeçalhos das hipóteses
  S.hypotheses.forEach((h, i) => {
    const x = pad + evW + i * colW;
    c.fillStyle = '#18232f'; c.fillRect(x, top, colW - 3, headH - 6);
    c.fillStyle = '#4dd4c4'; c.font = '700 13px ' + mono;
    c.fillText(t('hyp.labelPrefix') + (i + 1), x + 9, top + 20);
    c.fillStyle = '#a9b8ca'; c.font = '11px ' + sans;
    wrapText(c, h.text || '—', x + 9, top + 38, colW - 20, 13, 4);
  });

  c.fillStyle = '#6f8095'; c.font = '10px ' + sans;
  c.fillText(t('matrix.rowsAre').toUpperCase(), pad, top + headH - 14);

  // Linhas
  S.evidence.forEach((e, r) => {
    const y = top + headH + r * rowH;
    c.fillStyle = r % 2 ? '#0f1621' : '#131c29';
    c.fillRect(pad, y, evW - 6, rowH - 3);

    c.fillStyle = '#5b9dd9'; c.font = '700 13px ' + mono;
    c.fillText(t('ev.labelPrefix') + (r + 1), pad + 9, y + 26);
    c.fillStyle = '#e6edf5'; c.font = '12px ' + sans;
    c.fillText(clip(c, e.text || '—', evW - 66), pad + 42, y + 26);

    S.hypotheses.forEach((h, i) => {
      const x  = pad + evW + i * colW;
      const rt = ACH.getRating(e.id, h.id);
      c.fillStyle = FILL[rt]; c.fillRect(x, y, colW - 3, rowH - 3);
      c.fillStyle = rt === 'na' ? '#6f8095' : '#ffffff';
      c.font = '700 14px ' + mono;
      c.textAlign = 'center';
      c.fillText(t('rating.' + rt + '.code'), x + (colW - 3) / 2, y + 27);
      c.textAlign = 'left';
    });
  });

  // Rodapé: pontuações e crédito
  const fy = top + headH + S.evidence.length * rowH + 26;
  c.fillStyle = '#6f8095'; c.font = '10px ' + sans;
  c.fillText(t('scores.heading').toUpperCase() + '  ' +
    ACH.ranked().map((s, i) => {
      const hi = S.hypotheses.findIndex((h) => h.id === s.id) + 1;
      return (i + 1) + '. ' + t('hyp.labelPrefix') + hi + ' = ' + (S.advanced ? s.weighted.toFixed(2) : s.raw);
    }).join('    '), pad, fy);

  c.fillStyle = '#4a5b70';
  c.fillText(t('about.src1'), pad, fy + 20);
  c.fillText(t('about.src2'), pad, fy + 35);

  const a = el('a', {
    download: 'ACH-' + (S.date || 'matrix') + '.png',
    href: canvas.toDataURL('image/png'),
  });
  document.body.appendChild(a); a.click(); a.remove();
  toast(t('toast.exported'));
}

function clip(ctx, str, maxW) {
  if (ctx.measureText(str).width <= maxW) return str;
  let s = str;
  while (s.length > 1 && ctx.measureText(s + '…').width > maxW) s = s.slice(0, -1);
  return s + '…';
}

function wrapText(ctx, str, x, y, maxW, lh, maxLines) {
  const words = String(str).split(/\s+/);
  let line = '', lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y + lines * lh);
      lines++; line = words[i];
      if (lines >= maxLines - 1) {
        ctx.fillText(clip(ctx, words.slice(i).join(' '), maxW), x, y + lines * lh);
        return;
      }
    } else { line = test; }
  }
  if (line) ctx.fillText(clip(ctx, line, maxW), x, y + lines * lh);
}

/* ========================================================================== */
/*  MODAL "SOBRE A TÉCNICA"                                                   */
/* ========================================================================== */

function renderAbout() {
  const b = $('#aboutBody');
  b.innerHTML = '';
  [
    ['about.whatHeading',   'about.whatBody'],
    ['about.whenHeading',   'about.whenBody'],
    ['about.limitsHeading', 'about.limitsBody'],
  ].forEach(([h, p]) => {
    b.appendChild(el('h3', { text: t(h) }));
    b.appendChild(el('p',  { text: t(p) }));
  });

  b.appendChild(el('h3', { text: t('about.sourcesHeading') }));
  b.appendChild(el('ul', {}, ['about.src1', 'about.src2', 'about.src3'].map((k) => el('li', { text: t(k) }))));
  b.appendChild(el('p', { class: 'fine', text: t('about.paraphraseNote') }));
  b.appendChild(el('p', { class: 'fine', text: t('scores.formulaCaveat') }));
}

/* ========================================================================== */
/*  AVISOS                                                                    */
/* ========================================================================== */

let toastTimer = null;
function toast(msg) {
  const el_ = $('#toast');
  el_.textContent = msg;
  el_.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el_.hidden = true; }, 2600);
}

function focusLast(sel) {
  const nodes = $$(sel);
  if (nodes.length) nodes[nodes.length - 1].focus();
}

/* ========================================================================== */
/*  ARRANQUE                                                                  */
/* ========================================================================== */

function boot() {
  Lang.restore();
  ACH.init();

  // Seletor de idioma
  const sel = $('#langSelect');
  Lang.available().forEach((l) => {
    sel.appendChild(el('option', { value: l.code, selected: l.code === Lang.current }, [l.name]));
  });
  sel.addEventListener('change', (e) => { Lang.set(e.target.value); renderAll(); renderAbout(); });

  // Modo estándar / avançado
  $('#modeToggle').addEventListener('click', () => {
    ACH.state.advanced = !ACH.state.advanced;
    renderAll();
  });

  // Navegação entre passos
  $('#btnPrev').addEventListener('click', () => goStep(ACH.state.step - 1));
  $('#btnNext').addEventListener('click', () => goStep(ACH.state.step + 1));

  // Memoriza se o analista quer a caixa de armadilha aberta ou fechada
  $('#stepPitfall').addEventListener('toggle', (e) => {
    UI.pitfallOpen = e.target.open;
    try { localStorage.setItem('sat.pitfallOpen', UI.pitfallOpen ? '1' : '0'); } catch (err) { /* ignora */ }
  });

  // Ações
  $('#btnSave').addEventListener('click',  () => { toast(ACH.save() ? t('toast.saved') : t('toast.noSave')); });
  $('#btnLoad').addEventListener('click',  () => {
    if (ACH.load()) { UI.activeNote = null; renderAll(); toast(t('toast.loaded')); }
    else toast(t('toast.noSave'));
  });
  $('#btnSample').addEventListener('click', () => {
    ACH.loadSample(); UI.activeNote = null; goStep(3); toast(t('toast.sampleLoaded'));
  });
  $('#btnReset').addEventListener('click', () => {
    if (confirm(t('confirm.resetTitle') + '\n\n' + t('confirm.resetBody'))) {
      ACH.init(); UI.activeNote = null; renderAll(); toast(t('toast.cleared'));
    }
  });
  $('#btnPdf').addEventListener('click',   () => { renderPrintArea(); window.print(); });
  $('#btnImage').addEventListener('click', exportImage);

  // Modal
  $('#btnAbout').addEventListener('click',   () => { renderAbout(); $('#aboutModal').hidden = false; });
  $('#aboutClose').addEventListener('click', () => { $('#aboutModal').hidden = true; });
  $('#aboutModal').addEventListener('click', (e) => {
    if (e.target === $('#aboutModal')) $('#aboutModal').hidden = true;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $('#aboutModal').hidden = true;
  });

  renderAll();
}

document.addEventListener('DOMContentLoaded', boot);
