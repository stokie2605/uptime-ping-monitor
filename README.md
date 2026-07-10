# Uptime Ping Monitor — Infrastructure SRE Dashboard
> **The 1-Line Mission:** Browser-based SRE uptime monitoring dashboard simulating ICMP ping health checks and SIEM log streaming for IT infrastructure fleets.

### ⚡ Engineering Breakdown
* **The Problem:** SRE and MSP environments need a lightweight, real-time visual interface for network asset status monitoring — without expensive SaaS monitoring platforms or complex backend infrastructure for portfolio and proof-of-concept deployments.
* **The Solution:** A React SPA with cleanly separated business logic (`monitorLogic.js`) driving a 4-second polling simulation loop, manual reboot workflows with state transitions (ONLINE → REBOOTING → ONLINE), and a live SIEM-style syslog stream — all tested with Node.js built-in test runner on pure functions using dependency-injected randomness.
* **The Tech Stack:** `React 19` `Vite 8` `JavaScript` `Node.js test runner`

---

## 🎥 Visual Preview
![Uptime Monitor Dashboard](screenshots/uptime-preview.png)

---

## ⚙️ System Architecture

```
App.jsx (React state layer)
    │
    ├── useState: servers[]  ← 5 infrastructure assets (ONLINE/OFFLINE/REBOOTING)
    ├── useState: logs[]     ← SIEM syslog stream entries
    │
    ├── useEffect: setInterval (4s polling loop)
    │     └── applyPollingLatencyUpdate(servers, random)
    │           └── Only updates ONLINE servers (OFFLINE/REBOOTING are skipped)
    │
    └── handleRebootServer(id, name)
          ├── startRebootTransition() → status: REBOOTING, latency: POLLING...
          ├── Append ADMIN ACTION log entry
          ├── setTimeout(3000ms)
          └── completeRebootTransition() → status: ONLINE, latency: 5ms, uptime: 94.24%
                └── Append RESOLVED log entry

monitorLogic.js (pure functions — fully testable)
    ├── initialServers  (5 assets: 4 ONLINE, 1 OFFLINE)
    ├── initialLogs     (2 pre-seeded syslog entries)
    ├── applyPollingLatencyUpdate(servers, random) ← random is injectable
    ├── startRebootTransition(servers, id)
    ├── completeRebootTransition(servers, id)
    ├── createAdminActionLog(time, name)
    └── createResolvedLog(time, name)
```

---

## 🔬 Test Suite

Tests run against pure logic functions in `monitorLogic.js` using the **Node.js built-in test runner** — zero external test dependencies:

```bash
npm run test
```

| Test | What it verifies |
|---|---|
| `keeps offline server unchanged during polling` | OFFLINE servers are never mutated during automated poll cycles |
| `keeps rebooting servers unchanged during polling` | REBOOTING servers are skipped during polling |
| `updates latency for ONLINE servers when RNG triggers` | Deterministic output verified using injected controlled random values |
| `starts a manual reboot transition for a target server only` | Only target server transitions to REBOOTING; others are untouched |
| `completes a reboot transition with recovered network state` | Server returns to ONLINE with `5ms` latency and `94.24%` uptime |
| `creates operational logs for admin actions and recovery` | Log objects contain correct `time` and `message` fields |

**Key design pattern:** The `random` parameter in `applyPollingLatencyUpdate` is injectable (defaults to `Math.random`), enabling fully deterministic testing without mocking globals.

---

## 🛠️ Local Setup

```bash
npm install
npm run dev
```
Navigate to `http://localhost:5173`.

### Run Tests
```bash
npm run test
```
