/* ============================================================================
   SAT Toolkit — Renderizador do manual
   ----------------------------------------------------------------------------
   Transforma os blocos de manual-content.js em HTML. Nenhum texto visível é
   escrito aqui: vem todo de MANUAL[idioma] ou de i18n.js.
   ============================================================================ */

const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

function el(tag, attrs, children) {
  const n = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((k) => {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else if (k.startsWith('on')) n.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    });
  }
  (children || []).forEach((c) => {
    if (c === null || c === undefined || c === false) return;
    n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return n;
}

/* Qual caso resolvido está escolhido: 'intel' ou 'biz'. Persiste. */
let activeCase = 'intel';
try {
  const saved = localStorage.getItem('sat.manualCase');
  if (saved === 'intel' || saved === 'biz') activeCase = saved;
} catch (e) { /* modo privado */ }

/* --------------------------------------------------------------------------
   Um bloco -> um elemento
   -------------------------------------------------------------------------- */
function renderBlock(b) {
  switch (b.t) {
    case 'h3':
      return el('h3', { class: 'm-h3', text: b.x });

    case 'p':
      return el('p', { class: 'm-p', text: b.x });

    case 'key':
      return el('div', { class: 'm-key' }, [
        el('span', { class: 'm-key-mark', 'aria-hidden': 'true' }, ['◆']),
        el('p', { text: b.x }),
      ]);

    case 'warn':
      return el('div', { class: 'm-note m-warn' }, [el('p', { text: b.x })]);

    case 'tip':
      return el('div', { class: 'm-note m-tip' }, [el('p', { text: b.x })]);

    case 'quote':
      return el('blockquote', { class: 'm-quote' }, [el('p', { text: b.x })]);

    case 'code':
      return el('pre', { class: 'm-code' }, [el('code', { text: b.x })]);

    case 'ul':
      return el('ul', { class: 'm-ul' }, (b.items || []).map((i) => el('li', { text: i })));

    case 'case':
      return el('div', { class: 'm-case' }, [el('p', { text: b.x })]);

    case 'table': {
      const head = el('thead', {}, [
        el('tr', {}, (b.head || []).map((h) => el('th', { text: h }))),
      ]);
      const body = el('tbody', {}, (b.rows || []).map((r) =>
        el('tr', {}, r.map((cell, i) => {
          // Primeira coluna curta (H1, E3, 1.º…) fica com destaque monoespaçado
          const short = i === 0 && cell.length <= 5 && cell.length > 0;
          return el('td', { class: short ? 'm-tag-cell' : '', text: cell });
        }))
      ));
      return el('div', { class: 'm-table-wrap' }, [el('table', { class: 'm-table' }, [head, body])]);
    }

    default:
      return el('p', { class: 'm-p', text: b.x || '' });
  }
}

function renderBlocks(list) {
  return (list || []).map(renderBlock);
}

/* --------------------------------------------------------------------------
   A secção do caso resolvido, com o seletor de caso
   -------------------------------------------------------------------------- */
function renderWalkthrough(M) {
  const wrap = el('div');

  // Seletor Inteligência / Negócios
  const mk = (key, label) => el('button', {
    type: 'button',
    class: 'case-btn' + (activeCase === key ? ' is-on' : ''),
    'aria-pressed': activeCase === key ? 'true' : 'false',
    onClick: () => {
      activeCase = key;
      try { localStorage.setItem('sat.manualCase', key); } catch (e) { /* ignora */ }
      renderSections();
    },
  }, [label]);

  wrap.appendChild(el('div', { class: 'case-switch' }, [
    el('span', { class: 'case-switch-label', text: M.caseToggleLabel }),
    el('div', { class: 'case-switch-btns' }, [
      mk('intel', M.caseIntel),
      mk('biz', M.caseBiz),
    ]),
  ]));

  const C = M[activeCase];

  wrap.appendChild(el('div', { class: 'm-note m-tip' }, [
    el('p', { text: activeCase === 'intel' ? M.caseNoteIntel : M.caseNoteBiz }),
  ]));

  // Enunciado do caso
  wrap.appendChild(el('div', { class: 'm-case' }, [el('p', { text: C.statement })]));

  // Os passos
  C.steps.forEach((st) => {
    wrap.appendChild(el('section', { class: 'm-step' }, [
      el('header', { class: 'm-step-head' }, [
        el('span', { class: 'm-step-num', text: String(st.n) }),
        el('h3', { class: 'm-step-title', text: st.title }),
      ]),
      el('div', { class: 'm-step-body' }, renderBlocks(st.blocks)),
    ]));
  });

  return wrap;
}

/* --------------------------------------------------------------------------
   Página inteira
   -------------------------------------------------------------------------- */
function renderSections() {
  const M = MANUAL[Lang.current] || MANUAL.en;

  $('#manualTitle').textContent    = M.title;
  $('#manualSubtitle').textContent = M.subtitle;
  $('#manualIntro').textContent    = M.intro;
  $('#tocTitle').textContent       = M.contents;
  $('#backLink').textContent       = M.backToTool;

  document.title = t('app.title') + ' — ' + M.title;

  // Índice
  const toc = $('#tocList');
  toc.innerHTML = '';
  M.sections.forEach((s) => {
    toc.appendChild(el('li', {}, [
      el('a', {
        href: '#' + s.id, text: s.title,
        onClick: (e) => {
          e.preventDefault();
          const target = document.getElementById(s.id);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#' + s.id);
        },
      }),
    ]));
  });

  // Corpo
  const body = $('#manualSections');
  body.innerHTML = '';
  M.sections.forEach((s) => {
    body.appendChild(el('section', { class: 'm-section', id: s.id }, [
      el('h2', { class: 'm-h2', text: s.title }),
      s.hasCases ? renderWalkthrough(M) : el('div', {}, renderBlocks(s.blocks)),
    ]));
  });

  markActiveSection();
}

/* Realça no índice a secção que está no ecrã */
function markActiveSection() {
  const links = $$('#tocList a');
  const secs  = $$('.m-section');
  if (!links.length) return;

  const onScroll = () => {
    let current = secs[0];
    secs.forEach((s) => { if (s.getBoundingClientRect().top <= 140) current = s; });
    links.forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + current.id);
    });
  };

  window.removeEventListener('scroll', window.__satTocScroll);
  window.__satTocScroll = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   Arranque
   -------------------------------------------------------------------------- */
function boot() {
  Lang.restore();

  $$('[data-i18n]').forEach((n) => { n.textContent = t(n.getAttribute('data-i18n')); });

  const sel = $('#langSelect');
  Lang.available().forEach((l) => {
    sel.appendChild(el('option', { value: l.code, selected: l.code === Lang.current }, [l.name]));
  });
  sel.addEventListener('change', (e) => {
    Lang.set(e.target.value);
    $$('[data-i18n]').forEach((n) => { n.textContent = t(n.getAttribute('data-i18n')); });
    renderSections();
  });

  $('#btnPrint').addEventListener('click', () => window.print());

  renderSections();

  // Se o endereço trouxer #secção, salta para lá
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => target.scrollIntoView({ block: 'start' }), 60);
  }
}

document.addEventListener('DOMContentLoaded', boot);
