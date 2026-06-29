# Real Health Check Integration Path

The current dashboard simulates infrastructure checks so the UI can be reviewed without network agents or backend services.

## Current State Model

| State | Meaning |
| --- | --- |
| `ONLINE` | Healthy simulated response |
| `OFFLINE` | Timeout / outage state |
| `REBOOTING` | Manual recovery action in progress |

## Production Path

A production version could replace the simulation loop with a backend poller:

```text
Backend Scheduler
  -> HTTP / ICMP / TCP Probe
  -> Status Store
  -> Dashboard API
  -> Alert / Ticket Integration
```

## Useful Extensions

- Persist event logs for incident review.
- Add alert thresholds for latency and packet loss.
- Add user roles for service desk and infrastructure operators.
- Connect recovery actions to approved automation rather than browser-only state.
