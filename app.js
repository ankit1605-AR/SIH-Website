
// ===============================
// NODE DATA
// ===============================
const nodes = [
  ['N-01', 23, 21, 'normal'],
  ['N-02', 31, 30, 'normal'],
  ['N-03', 39, 30, 'normal'],
  ['N-04', 55, 19, 'normal'],
  ['N-05', 70, 27, 'normal'],
  ['N-06', 84, 17, 'normal'],
  ['N-07', 17, 48, 'normal'],
  ['N-08', 31, 43, 'normal'],
  ['N-09', 45, 52, 'normal'],
  ['N-10', 61, 43, 'normal'],
  ['N-11', 76, 52, 'normal'],
  ['N-12', 89, 45, 'warning'],
  ['N-13', 14, 73, 'normal'],
  ['N-14', 28, 68, 'normal'],
  ['N-15', 42, 77, 'normal'],
  ['N-16', 56, 67, 'normal'],
  ['N-17', 62, 55, 'danger'],
  ['N-18', 79, 75, 'warning'],
  ['N-19', 90, 68, 'normal'],
  ['N-20', 22, 87, 'normal'],
  ['N-21', 38, 91, 'normal'],
  ['N-22', 54, 85, 'normal'],
  ['N-23', 69, 93, 'normal'],
  ['N-24', 85, 88, 'normal']
];


// ===============================
// MAP NODES + MESH LINES
// ===============================
const layer = document.querySelector('.nodes-layer');
const svg = document.querySelector('.mesh-lines');

if (layer && svg) {
  nodes.forEach((n, i) => {

    // Create node
    const d = document.createElement('div');

    d.className = `node ${n[3]}`;
    d.dataset.id = n[0];

    d.style.left = n[1] + '%';
    d.style.top = n[2] + '%';

    layer.appendChild(d);


    // Connect current node with previous node
    if (i) {
      const prev = nodes[i - 1];

      svg.innerHTML += `
        <line
          x1="${prev[1] * 8}"
          y1="${prev[2] * 4.3}"
          x2="${n[1] * 8}"
          y2="${n[2] * 4.3}"
          stroke="#4f9380"
          stroke-width="1"
          stroke-dasharray="3 4"
          opacity=".7"
        />
      `;
    }


    // Additional mesh connections
    if (i > 6 && i % 3 === 0) {
      const p = nodes[i - 5];

      svg.innerHTML += `
        <line
          x1="${p[1] * 8}"
          y1="${p[2] * 4.3}"
          x2="${n[1] * 8}"
          y2="${n[2] * 4.3}"
          stroke="#4f9380"
          stroke-width="1"
          opacity=".55"
        />
      `;
    }
  });
}


// ===============================
// SENSOR TABLE DATA
// ===============================
const rows = [
  ['N-17', 'Zone A · Grid D4', '0.84°', '0.18 g', 78, '92%', 'watch'],
  ['N-12', 'Zone A · Grid F3', '0.42°', '0.36 g', 91, '98%', 'normal'],
  ['N-08', 'Sector 2 · Grid B3', '0.12°', '0.05 g', 18, '89%', 'normal'],
  ['N-21', 'Sector 3 · Grid C7', '0.08°', '0.04 g', 82, '96%', 'normal']
];

const sensorRows = document.querySelector('#sensorRows');

if (sensorRows) {
  sensorRows.innerHTML = rows.map(r => `
    <div class="sensor-row">

      <div class="node-name">
        <i class="node-dot"></i>
        ${r[0]}
      </div>

      <small>${r[1]}</small>

      <b>${r[2]}</b>

      <b>${r[3]}</b>

      <span>
        <i class="battery ${r[4] < 25 ? 'low' : ''}">
          <i style="width:${r[4]}%"></i>
        </i>
        ${r[4]}%
      </span>

      <span class="link">
        ⌁ ${r[5]}
      </span>

      <span class="status ${r[6]}">
        ${r[6] === 'watch' ? 'WATCH' : 'ONLINE'}
      </span>

    </div>
  `).join('');
}


// ===============================
// TREND CHART
// ===============================
const chart = document.querySelector('#trendChart');

if (chart) {
  chart.innerHTML = `
    <defs>
      <linearGradient
        id="fill"
        x1="0"
        x2="0"
        y1="0"
        y2="1"
      >
        <stop
          stop-color="#169079"
          stop-opacity=".22"
        />

        <stop
          offset="1"
          stop-color="#169079"
          stop-opacity="0"
        />
      </linearGradient>
    </defs>

    <path
      d="
        M0 163
        L45 159
        L90 154
        L135 157
        L180 143
        L225 148
        L270 133
        L315 140
        L360 122
        L405 126
        L450 109
        L495 97
        L540 87
        L585 73
        L630 55
        L675 35
        L700 18
        L700 177
        L0 177
        Z
      "
      fill="url(#fill)"
    />

    <path
      d="
        M0 163
        L45 159
        L90 154
        L135 157
        L180 143
        L225 148
        L270 133
        L315 140
        L360 122
        L405 126
        L450 109
      "
      fill="none"
      stroke="#118b75"
      stroke-width="3"
    />

    <path
      d="
        M450 109
        L495 97
        L540 87
        L585 73
        L630 55
        L675 35
        L700 18
      "
      fill="none"
      stroke="#d7694e"
      stroke-width="3"
      stroke-dasharray="6 5"
    />

    <line
      x1="555"
      y1="0"
      x2="555"
      y2="177"
      stroke="#d7a281"
      stroke-dasharray="3 4"
    />

    <circle
      cx="450"
      cy="109"
      r="4"
      fill="#118b75"
      stroke="white"
      stroke-width="2"
    />
  `;
}


// ===============================
// TOAST MESSAGE
// ===============================
function toast(msg) {
  const t = document.querySelector('#toast');

  if (!t) return;

  t.textContent = msg;

  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 2800);
}


// ===============================
// ACKNOWLEDGE ALERTS
// ===============================
document.querySelectorAll('.ack').forEach(b => {

  b.onclick = () => {

    const alert = b.closest('.alert');

    if (alert) {
      alert.style.opacity = '.35';
    }

    b.textContent = 'Acknowledged';

    toast('Alert acknowledged and logged');
  };

});


// ===============================
// EXPORT TELEMETRY
// ===============================
const exportBtn = document.querySelector('#exportBtn');

if (exportBtn) {

  exportBtn.onclick = () => {

    const csv =
      'node,tilt,vibration,status\n' +
      rows
        .map(r => [
          r[0],
          r[2],
          r[3],
          r[6]
        ].join(','))
        .join('\n');

    const blob = new Blob(
      [csv],
      { type: 'text/csv' }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = 'bhumi-net-telemetry.csv';

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

    toast('Telemetry export prepared');
  };

}


// ===============================
// VIEW ALERTS
// ===============================
const viewAlerts = document.querySelector('#viewAlerts');

if (viewAlerts) {

  viewAlerts.onclick = () => {

    toast(
      'Alert history opened — 18 resolved events this week'
    );

  };

}


// ===============================
// EXPAND / FOCUS MAP
// ===============================
const expandMap = document.querySelector('#expandMap');

if (expandMap) {

  expandMap.onclick = () => {

    const mapPanel = document.querySelector('.map-panel');

    if (mapPanel) {
      mapPanel.scrollIntoView({
        behavior: 'smooth'
      });
    }

    toast('Map is focused in the live panel');
  };

}


// ===============================
// SIMULATION
// ===============================
let event = false;

const simulateBtn = document.querySelector('#simulateBtn');

if (simulateBtn) {

  simulateBtn.onclick = () => {

    event = !event;

    const riskValue = document.querySelector('#riskValue');
    const riskBar = document.querySelector('#riskBar');
    const maxTilt = document.querySelector('#maxTilt');
    const movement = document.querySelector('#movement');
    const aiConf = document.querySelector('#aiConf');


    // Simulation ON
    if (event) {

      if (riskValue) {
        riskValue.textContent = '78';
      }

      if (riskBar) {
        riskBar.style.width = '78%';
      }

      if (maxTilt) {
        maxTilt.textContent = '1.16';
      }

      if (movement) {
        movement.textContent = '5.8';
      }

      if (aiConf) {
        aiConf.textContent = '96';
      }

      toast(
        'Critical deformation event simulated — Zone A escalated'
      );

    }

    // Simulation OFF
    else {

      if (riskValue) {
        riskValue.textContent = '62';
      }

      if (riskBar) {
        riskBar.style.width = '62%';
      }

      if (maxTilt) {
        maxTilt.textContent = '0.84';
      }

      if (movement) {
        movement.textContent = '3.2';
      }

      if (aiConf) {
        aiConf.textContent = '91';
      }

      toast(
        'Simulation reset to live baseline'
      );

    }

  };

}


// ===============================
// LIVE CLOCK
// ===============================
function updateClock() {

  const n = new Date();

  const clock = document.querySelector('#clock');

  if (clock) {

    clock.textContent =
      n.toLocaleTimeString('en-GB', {
        hour12: false
      });

  }

}


// Show time immediately
updateClock();


// Update clock every second
setInterval(updateClock, 1000);

