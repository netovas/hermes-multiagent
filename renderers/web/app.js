// ZethPhoenix Web Dashboard — vanilla JS + Lottie + WebSocket
const WS_URL = 'ws://localhost:8765/zethphoenix';
const agents = new Map(); // agent_id -> { card, anim }

// Lottie animation paths per state (drop your JSON files in assets/characters/)
const ANIM_PATHS = {
  idle:     'assets/characters/idle.json',
  thinking: 'assets/characters/thinking.json',
  working:  'assets/characters/working.json',
  talking:  'assets/characters/talking.json',
  done:     'assets/characters/done.json',
  blocked:  'assets/characters/blocked.json',
};

const ROLE_LABELS = {
  BA: '👤 Business Analyst', PM: '👔 Project Manager', PO: '🧑‍💼 Product Owner',
  SA: '🧑‍🔬 System Analyst', AR: '🏗️ Architect', UX: '🎨 UX Designer',
  TL: '🧙 Tech Lead', BE: '💻 Backend Dev', FE: '🖼️ Frontend Dev',
  DO: '⚙️ DevOps', QA: '🧪 QA Engineer', TW: '📝 Tech Writer',
  CS: '🎧 Customer Support', LR: '🔬 Lead Researcher', CFO: '💰 CFO', LG: '⚖️ Legal Counsel'
};

// ── WebSocket setup with auto-reconnect ──────────────────
function connect() {
  const ws = new WebSocket(WS_URL);
  const status = document.getElementById('connection-status');

  ws.onopen  = () => status.textContent = '🟢 Connected';
  ws.onclose = () => { status.textContent = '🔴 Disconnected — retrying...'; setTimeout(connect, 2000); };
  ws.onerror = () => status.textContent = '🔴 Error';
  ws.onmessage = (ev) => handleEvent(JSON.parse(ev.data));
}
connect();

// ── Event router ─────────────────────────────────────────
function handleEvent(e) {
  logEvent(e);
  switch (e.event) {
    case 'session_start':       resetOffice(); break;
    case 'division_activated':  setProjectInfo(e); break;
    case 'agent_spawned':       spawnAgent(e); break;
    case 'agent_state_change':  updateAgent(e); break;
    case 'handoff':             flashHandoff(e); break;
    case 'fallback_triggered':  e.stage === 'ashes' ? showPhoenix() : hidePhoenix(); break;
    case 'project_completed':   celebrateProject(e); break;
  }
}

// ── Renderers ────────────────────────────────────────────
function spawnAgent(e) {
  const a = e.agent;
  if (agents.has(a.id)) return;

  const card = document.createElement('div');
  card.className = 'agent-card idle';
  card.id = `agent-${a.id}`;
  card.innerHTML = `
    <div class="lottie-anim" id="anim-${a.id}"></div>
    <div class="role">${ROLE_LABELS[a.role.code] || a.role}</div>
    <div class="activity">Idle...</div>
    <div class="progress-bar"><div class="fill" style="width:0%"></div></div>
  `;
  document.getElementById('office-floor').appendChild(card);

  const anim = lottie.loadAnimation({
    container: card.querySelector('.lottie-anim'),
    renderer: 'svg', loop: true, autoplay: true,
    path: ANIM_PATHS.idle
  });
  agents.set(a.id, { card, anim });
}

function updateAgent(e) {
  const entry = agents.get(e.agent.id);
  if (!entry) return spawnAgent(e);
  const { card, anim } = entry;

  // Update CSS class
  card.className = `agent-card ${e.state}`;

  // Update activity text
  card.querySelector('.activity').textContent = e.activity || e.state;

  // Update progress
  if (typeof e.progress === 'number') {
    card.querySelector('.fill').style.width = `${e.progress * 100}%`;
  }

  // Swap Lottie animation if state changed
  if (ANIM_PATHS[e.state]) {
    anim.destroy();
    entry.anim = lottie.loadAnimation({
      container: card.querySelector('.lottie-anim'),
      renderer: 'svg', loop: true, autoplay: true,
      path: ANIM_PATHS[e.state]
    });
  }
}

function flashHandoff(e) {
  const fromCard = document.getElementById(`agent-${e.handoff.from_agent}`);
  const toCard = document.getElementById(`agent-${e.handoff.to_agent}`);
  [fromCard, toCard].forEach(c => {
    if (!c) return;
    c.style.boxShadow = '0 0 30px #06d6a0';
    setTimeout(() => c.style.boxShadow = '', 1000);
  });
}

function showPhoenix() {
  const overlay = document.getElementById('phoenix-overlay');
  overlay.classList.remove('hidden');
  lottie.loadAnimation({
    container: document.getElementById('phoenix-anim'),
    renderer: 'svg', loop: false, autoplay: true,
    path: 'assets/characters/phoenix_rebirth.json'
  });
}
function hidePhoenix() {
  setTimeout(() => document.getElementById('phoenix-overlay').classList.add('hidden'), 3000);
}

function celebrateProject(e) {
  agents.forEach(({ card }) => card.classList.add('done'));
  // (optional) confetti library
}

function setProjectInfo(e) {
  document.getElementById('project-info').textContent =
    `📂 ${e.project_id} — ${e.division} division`;
}
function resetOffice() {
  document.getElementById('office-floor').innerHTML = '';
  agents.clear();
}
function logEvent(e) {
  const li = document.createElement('li');
  li.textContent = `[${new Date(e.timestamp).toLocaleTimeString()}] ${e.event} ${e.agent ? '— ' + e.agent.role : ''}`;
  document.getElementById('log-list').prepend(li);
}