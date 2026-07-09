export const initialServers = [
  { id: 1, name: 'Primary Domain Controller (AD)', ip: '10.0.0.4', status: 'ONLINE', uptime: '99.98%', latency: '4ms' },
  { id: 2, name: 'Corporate Email Gateway (Exchange)', ip: '10.0.0.12', status: 'ONLINE', uptime: '99.91%', latency: '12ms' },
  { id: 3, name: 'Supabase Cloud Production DB', ip: '142.250.178.14', status: 'ONLINE', uptime: '100%', latency: '28ms' },
  { id: 4, name: 'Local Warehouse Network Switch', ip: '192.168.1.254', status: 'OFFLINE', uptime: '94.23%', latency: 'TIMEOUT' },
  { id: 5, name: 'Main Office VoIP Phone Server', ip: '10.0.2.55', status: 'ONLINE', uptime: '99.74%', latency: '7ms' },
];

export const initialLogs = [
  { time: '20:14:02', message: 'CRITICAL ALERT: Local Warehouse Network Switch [192.168.1.254] failed ICMP echo ping response.' },
  { time: '19:45:11', message: 'SYSTEM INFO: Supabase Cloud Production DB baseline latency stabilized at 28ms.' },
];

export function applyPollingLatencyUpdate(servers, random = Math.random) {
  return servers.map((server) => {
    if (server.status === 'OFFLINE' || server.status === 'REBOOTING') return server;

    if (random() > 0.95) {
      const randomLatency = Math.floor(random() * 40) + 2;
      return { ...server, latency: `${randomLatency}ms` };
    }

    return server;
  });
}

export function startRebootTransition(servers, id) {
  return servers.map((server) => (
    server.id === id ? { ...server, status: 'REBOOTING', latency: 'POLLING...' } : server
  ));
}

export function completeRebootTransition(servers, id) {
  return servers.map((server) => (
    server.id === id ? { ...server, status: 'ONLINE', latency: '5ms', uptime: '94.24%' } : server
  ));
}

export function createAdminActionLog(time, name) {
  return { time, message: `ADMIN ACTION: Initialized remote system reboot sequence on asset: ${name}.` };
}

export function createResolvedLog(time, name) {
  return { time, message: `RESOLVED: Asset ${name} back online. ICMP handshake verification success.` };
}