# IT Infrastructure Uptime & Ping Monitor

[🚀 Live Demo](https://uptime-ping-monitor.vercel.app)

Built by Dean Wilshaw.

IT Infrastructure Uptime & Ping Monitor is a React-based network monitoring dashboard that simulates ICMP-style health checks, latency drift, offline asset detection, remote reboot triage, and SIEM-style operational logging for distributed infrastructure assets.

The project demonstrates how a service desk or infrastructure team can visualize host health, capture outage events, and model manual recovery workflows in a browser-based operations console.

### Visual Output / Preview

![Uptime Ping Monitor dashboard](screenshots/uptime-preview.png)

```text
┌────────────────────────────────┬───────────┬──────────────┬─────────────────────┐
│ Asset                          │ Status    │ Latency      │ Operator Action      │
├────────────────────────────────┼───────────┼──────────────┼─────────────────────┤
│ Primary Domain Controller      │ ONLINE    │ 4ms          │ Monitor             │
│ Corporate Email Gateway        │ ONLINE    │ 12ms         │ Monitor             │
│ Supabase Cloud Production DB   │ ONLINE    │ 28ms         │ Monitor             │
│ Local Warehouse Network Switch │ OFFLINE   │ TIMEOUT      │ Force Remote Reboot │
│ Main Office VoIP Phone Server  │ ONLINE    │ 7ms          │ Monitor             │
└────────────────────────────────┴───────────┴──────────────┴─────────────────────┘
```

### Monitoring Architecture & State Logic

- **Asset inventory state:** The dashboard initializes five monitored infrastructure assets with name, IP address, status, uptime, and latency fields.
- **Polling simulation:** A `setInterval` loop runs every 4 seconds to simulate recurring ICMP monitoring and intermittent latency changes.
- **Offline guardrail:** The known offline switch is intentionally left unchanged by the polling loop until a technician triggers manual triage.
- **Manual reboot workflow:** Selecting `Force Remote Reboot` moves an offline asset into `REBOOTING`, logs the admin action, then restores it to `ONLINE` after a simulated handshake delay.
- **SIEM-style event stream:** Critical alerts, admin actions, and recovery events are pushed into a timestamped log feed for operational visibility.
- **Race-condition prevention:** The polling loop avoids overwriting assets under manual recovery, keeping the state machine predictable during reboot simulation.

## The Business Problem

Infrastructure teams need fast visibility when a server, gateway, switch, or cloud service stops responding. In smaller environments, health checks may be performed manually or spread across multiple tools, making it difficult to see current status, latency symptoms, and recovery activity in one place.

Common operational problems include:

- Network outages are difficult to triage without a live status board.
- Manual ping checks do not create consistent evidence.
- Latency drift can be missed until users report performance issues.
- Offline devices need a clear escalation and recovery workflow.
- Support teams need event logs that show what happened and when.
- Automated polling can conflict with manual recovery state if not guarded properly.

## The Solution & Architecture

The app models a lightweight infrastructure monitoring console:

```text
React Asset Inventory
        |
        +--> 4-second polling loop
        |       |
        |       +--> latency variance simulation
        |       +--> offline asset guard
        |
        +--> Manual reboot action
        |       |
        |       +--> REBOOTING state
        |       +--> delayed recovery
        |       +--> ONLINE state
        |
        v
Timestamped Syslog Stream
```

## Technical Toolkit

- React
- Vite
- JavaScript
- React hooks
- Simulated ICMP polling
- Browser-based operational dashboard UI
- Local state-driven event logging

## Local Execution Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Simulated Asset Model

Each monitored asset follows this structure:

```json
{
  "id": 4,
  "name": "Local Warehouse Network Switch",
  "ip": "192.168.1.254",
  "status": "OFFLINE",
  "uptime": "94.23%",
  "latency": "TIMEOUT"
}
```

Supported status values:

```text
ONLINE      Healthy polling state
OFFLINE     Failed ICMP response / timeout state
REBOOTING   Manual recovery action in progress
```

## Production Readiness Notes

- Replace simulated polling with real API-backed health checks.
- Add persistent event storage for audit and post-incident review.
- Add alert thresholds for latency, packet loss, and uptime degradation.
- Add user roles for service desk, infrastructure, and admin operators.
- Add integrations for ticket creation, SIEM forwarding, or chat alerts.
- Add tests around polling state transitions and reboot recovery behavior.
