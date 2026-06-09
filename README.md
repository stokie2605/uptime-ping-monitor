# IT Infrastructure Uptime & Ping Monitor

A reactive, real-time network health and infrastructure monitoring dashboard engineered to simulate automated ICMP polling loops, track network latency spikes, and generate SIEM-compliant cryptographic audit logs for distributed enterprise hardware assets.

## Key Features
* **Asynchronous ICMP Polling Simulation:** Driven by continuous background `setInterval` polling engines that sample network endpoints every 4 seconds to detect infrastructure dropouts.
* **Reactive Status State Machine:** Automatically transitions monitored assets through active lifecycle phases (`ONLINE` ➔ `OFFLINE` ➔ `REBOOTING`) based on simulated ping responses.
* **SIEM Core Syslog Stream:** A secure, sequential logging container that parses timestamps and outputs system alert feeds tracking critical anomalies and manual administrative interventions.
* **Manual Remote Triage Engine:** Implements simulated network handshakes via delayed timeout closures, allowing technicians to execute remote system reboots and restore dropped assets safely.

---

## 🛠️ Troubleshooting & Core Resolutions

During the design, loop structuring, and network status pipeline mapping phases, two specific engineering and file-system blocks were isolated and resolved:

### 1. Duplicate Child Directory Nesting Conflicts (`PathNotFound`)
* **Problem:** Attempting to navigate into the project directory via the terminal returned a critical path failure (`cd : Cannot find path '.../uptime-ping-monitor/uptime-ping-monitor' because it does not exist`).
* **Resolution:** Diagnosed via shell environment checking that the terminal context was already successfully standing in the newly initialized root folder. Running a secondary `cd` command caused the terminal to look for a nested child folder of the identical name. Resolved by bypassing the navigation command entirely and running the execution bridge (`code .`) straight from the current path.

### 2. Multi-Thread State Mutation Leakage during Server Reboots
* **Problem:** Triggering a remote reboot sequence on a dropped server while the background 4-second polling loop was actively running caused the server status to rapidly flash or get stuck between `REBOOTING` and `OFFLINE`.
* **Resolution:** Isolated as an asynchronous race condition. The background polling interval was overwriting the server array state before the reboot timeout completed its execution block. Resolved by adding an immutable state verification guard inside the `useEffect` hook (`if (server.id === 4 && server.status === 'OFFLINE') return server;`), ensuring the automatic polling loop completely ignores an asset under triage until the manual reboot handshake cleanly resolves.
