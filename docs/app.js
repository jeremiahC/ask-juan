// ===== LANDING PAGE INTERACTIONS =====

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger?.addEventListener('click', () => navLinks?.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.skill-card, .step, .section-header, .cta-card, .juan-card')
  .forEach(el => { el.classList.add('fade-up'); fadeObserver.observe(el); });

window.addEventListener('scroll', () => {
  document.querySelector('.nav')?.style.setProperty(
    'box-shadow', window.scrollY > 20 ? '0 4px 32px rgba(0,0,0,0.5)' : 'none'
  );
});

// ===== DOMAIN TABS + TEAM GRID =====

let activeDomain = DOMAINS[0].id;

function renderDomainTabs() {
  const tabsEl = document.getElementById('domain-tabs');
  if (!tabsEl) return;
  tabsEl.innerHTML = DOMAINS.map(d => `
    <button class="domain-tab${d.id === activeDomain ? ' active' : ''}" data-domain="${d.id}">
      <span class="domain-tab-icon">${d.icon}</span>
      <span class="domain-tab-label">${d.label}</span>
      <span class="domain-tab-count">${TEAM.filter(t => t.bizDomain === d.id).length}</span>
    </button>`).join('');

  tabsEl.querySelectorAll('.domain-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeDomain = btn.dataset.domain;
      tabsEl.querySelectorAll('.domain-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTeamGrid();
    });
  });
}

function renderTeamGrid() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;
  const visible = TEAM.filter(t => t.bizDomain === activeDomain);
  grid.innerHTML = visible.map(t => {
    const agent = AGENTS[t.id];
    return `
      <a href="#agent/${t.id}" class="team-card">
        <div class="team-card-avatar" style="--agent-color:${t.color}">${agent.icon}</div>
        <div class="team-card-name">${agent.name}</div>
        <div class="team-card-role">${agent.role}</div>
        <div class="team-card-domain" style="color:${t.color}">${t.domain}</div>
        <div class="team-card-cta">Explore →</div>
      </a>`;
  }).join('');
  grid.querySelectorAll('.team-card').forEach(el => {
    el.classList.add('fade-up'); fadeObserver.observe(el);
  });
}

renderDomainTabs();
renderTeamGrid();

// ===== HASH ROUTER =====

const landing = document.getElementById('landing');
const agentPage = document.getElementById('agent-page');

function handleRoute() {
  const hash = location.hash;
  const match = hash.match(/^#agent\/(.+)$/);
  if (match && AGENTS[match[1]]) {
    landing.classList.add('hidden');
    agentPage.classList.remove('hidden');
    renderAgentPage(match[1]);
    window.scrollTo(0, 0);
  } else {
    landing.classList.remove('hidden');
    agentPage.classList.add('hidden');
    agentPage.innerHTML = '';
  }
}

window.addEventListener('hashchange', handleRoute);
handleRoute();

// ===== RENDER: AGENT DETAIL PAGE =====

function renderAgentPage(id) {
  const agent = AGENTS[id];
  agentPage.innerHTML = `
    <div class="adp">
      ${renderAdpHero(agent)}
      ${renderAdpTabBar()}
      <div class="adp-panels container">
        <div class="adp-panel active" id="panel-workflow">${renderWorkflowTab(agent)}</div>
        <div class="adp-panel" id="panel-outputs">${renderOutputsTab(agent)}</div>
        <div class="adp-panel" id="panel-prompt">${renderPromptTab(agent)}</div>
        <div class="adp-panel" id="panel-skills">${renderSkillsTab(agent)}</div>
      </div>
    </div>
  `;
  initTabs();
  initWorkflowAnimation();
  initCopyButtons();
}

function renderAdpHero(agent) {
  return `
    <div class="adp-hero">
      <div class="adp-hero-bg">
        <div class="adp-blob adp-blob-1"></div>
        <div class="adp-blob adp-blob-2"></div>
        <div class="grid-overlay"></div>
      </div>
      <div class="container adp-hero-inner">
        <a href="#" class="adp-back">← All agents</a>
        <div class="adp-hero-content">
          <div class="adp-icon">${agent.icon}</div>
          <div class="adp-hero-text">
            <div class="adp-domain-tag">${agent.domain}</div>
            <h1 class="adp-title">${agent.name}</h1>
            <p class="adp-role">${agent.role}</p>
            <p class="adp-tagline">${agent.tagline}</p>
            <div class="adp-tag-row">
              ${agent.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderAdpTabBar() {
  const tabs = ['workflow', 'outputs', 'prompt', 'skills'];
  const labels = { workflow: '⚡ Workflow', outputs: '📄 Outputs', prompt: '💬 Sample Prompt', skills: '🔧 Skills' };
  return `
    <div class="adp-tabs-wrap">
      <div class="container">
        <div class="adp-tabs" role="tablist">
          ${tabs.map((t, i) => `
            <button class="adp-tab${i === 0 ? ' active' : ''}" data-tab="${t}" role="tab">
              ${labels[t]}
            </button>`).join('')}
        </div>
      </div>
    </div>`;
}

// ===== WORKFLOW TAB (CSS 3D) =====

function renderWorkflowTab(agent) {
  const nodes = agent.workflow.map((step, i) => `
    <div class="wf-node" style="--i:${i}">
      <div class="wf-node-glow"></div>
      <div class="wf-node-icon">${step.icon}</div>
      <div class="wf-node-label">${step.label}</div>
      <div class="wf-node-sub">${step.sub}</div>
    </div>
    ${i < agent.workflow.length - 1 ? '<div class="wf-connector"><div class="wf-conn-line"></div></div>' : ''}
  `).join('');

  return `
    <div class="adp-tab-section">
      <h3 class="adp-section-title">How ${agent.name} works</h3>
      <p class="adp-section-sub">A step-by-step flow — from your first message to a finished deliverable.</p>
      <div class="wf-scene">
        <div class="wf-stage">
          <div class="wf-track">${nodes}</div>
        </div>
      </div>
      <div class="wf-legend">
        ${agent.workflow.map((s, i) => `
          <div class="wf-legend-item">
            <span class="wf-legend-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="wf-legend-icon">${s.icon}</span>
            <span class="wf-legend-label">${s.label}</span>
            <span class="wf-legend-sub">— ${s.sub}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// ===== OUTPUTS TAB =====

function renderOutputsTab(agent) {
  const cards = agent.outputs.map((o, i) => `
    <div class="out-card${i === 0 ? ' active' : ''}" data-out="${i}">
      <div class="out-card-header">
        <span class="out-icon">${o.icon}</span>
        <div>
          <div class="out-title">${o.title}</div>
          <div class="out-desc">${o.desc}</div>
        </div>
      </div>
      <div class="out-preview">
        <div class="out-preview-bar">
          <span class="out-preview-dot"></span><span class="out-preview-dot"></span><span class="out-preview-dot"></span>
          <span class="out-preview-label">${o.title}</span>
        </div>
        <pre class="out-preview-body">${escHtml(o.preview)}</pre>
      </div>
    </div>`).join('');

  return `
    <div class="adp-tab-section">
      <h3 class="adp-section-title">What ${agent.name} delivers</h3>
      <p class="adp-section-sub">Real documents and drafts — ready to send to your client.</p>
      <div class="out-grid">${cards}</div>
    </div>`;
}

// ===== SAMPLE PROMPT TAB =====

function renderPromptTab(agent) {
  return `
    <div class="adp-tab-section">
      <h3 class="adp-section-title">Try it yourself</h3>
      <p class="adp-section-sub">Copy this prompt into Claude Code and ${agent.name} takes it from there.</p>
      <div class="prompt-demo">
        <div class="prompt-block">
          <div class="prompt-block-header">
            <span class="prompt-trigger">${agent.promptTrigger}</span>
            <button class="prompt-copy-btn" data-copy="${escHtml(agent.promptTrigger + '\n\n' + agent.samplePrompt)}">
              Copy prompt
            </button>
          </div>
          <div class="prompt-bubble user">
            <div class="prompt-bubble-label">You</div>
            <pre class="prompt-text">${escHtml(agent.samplePrompt)}</pre>
          </div>
          <div class="prompt-bubble agent">
            <div class="prompt-bubble-label">${agent.name}</div>
            <pre class="prompt-text">${escHtml(agent.sampleResponse)}</pre>
          </div>
        </div>
        <div class="prompt-hint">
          <span class="prompt-hint-icon">💡</span>
          Works in Tagalog, Taglish, or English — Juan mirrors your language automatically.
        </div>
      </div>
    </div>`;
}

// ===== SKILLS TAB =====

function renderSkillsTab(agent) {
  const cards = agent.skills.map(s => `
    <div class="adp-skill-card">
      <div class="adp-skill-icon">${s.icon}</div>
      <div class="adp-skill-name">${s.name}</div>
      <div class="adp-skill-desc">${s.desc}</div>
    </div>`).join('');

  return `
    <div class="adp-tab-section">
      <h3 class="adp-section-title">Skills powering ${agent.name}</h3>
      <p class="adp-section-sub">Modular skills that ${agent.name} activates during your session — and can also run standalone.</p>
      <div class="adp-skills-grid">${cards}</div>
    </div>`;
}

// ===== TAB SWITCHING =====

function initTabs() {
  agentPage.querySelectorAll('.adp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      agentPage.querySelectorAll('.adp-tab').forEach(t => t.classList.remove('active'));
      agentPage.querySelectorAll('.adp-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      agentPage.querySelector(`#panel-${tab.dataset.tab}`)?.classList.add('active');
    });
  });
}

// ===== WORKFLOW ANIMATION =====

function initWorkflowAnimation() {
  const nodes = agentPage.querySelectorAll('.wf-node');
  if (!nodes.length) return;
  let active = 0;
  nodes[0].classList.add('active');
  setInterval(() => {
    nodes[active].classList.remove('active');
    active = (active + 1) % nodes.length;
    nodes[active].classList.add('active');
  }, 1600);
}

// ===== COPY BUTTONS =====

function initCopyButtons() {
  agentPage.querySelectorAll('.prompt-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

// ===== UTILS =====

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
