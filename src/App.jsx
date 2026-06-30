import { useState, useEffect } from 'react';
import {
  applyPollingLatencyUpdate,
  completeRebootTransition,
  createAdminActionLog,
  createResolvedLog,
  initialLogs,
  initialServers,
  startRebootTransition,
} from './monitorLogic';

function App() {
  // Initialize standard network assets with individual status and IP configurations
  const [servers, setServers] = useState(initialServers);


  const [logs, setLogs] = useState(initialLogs);

  // Simulate automated recurring network polling loops
  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prevServers => applyPollingLatencyUpdate(prevServers));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Simulate an administrator manual ICMP Ping / System Reboot triage cycle
  function handleRebootServer(id, name) {
    // Instantly flash the UI into a pending state
    setServers(prev => startRebootTransition(prev, id));
    
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [createAdminActionLog(timestamp, name), ...prev]);

    // Simulate network delay for operating system initialization and port listening
    setTimeout(() => {
      setServers(prev => completeRebootTransition(prev, id));
      setLogs(prev => [createResolvedLog(new Date().toLocaleTimeString(), name), ...prev]);
    }, 3000);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '900px' }}>
      <header style={{ borderBottom: '2px solid #334155', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', color: '#38bdf8', lineHeight: '1.05', fontSize: '44px' }}>IT Infrastructure Uptime & Ping Monitor</h1>
            <p style={{ margin: '0', color: '#94a3b8', fontSize: '14px' }}>Real-time local ICMP polling simulation and system diagnostic array for distributed network assets.</p>
          </div>
          <div style={{ textAlign: 'right', backgroundColor: '#1e293b', padding: '10px 15px', borderRadius: '6px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', display: 'block' }}>MONITORING AGENT</span>
            <strong style={{ color: '#4ade80', fontSize: '14px' }}>ACTIVE (4s Loop)</strong>
          </div>
        </div>
      </header>

      {/* INFRASTRUCTURE GRID */}
      <h3 style={{ color: '#94a3b8', marginBottom: '15px' }}>Monitored Network Hardware & Hosts</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
        {servers.map(server => (
          <div key={server.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '16px', color: '#f1f5f9' }}>{server.name}</strong>
              <div style={{ display: 'flex', gap: '15px', marginTop: '5px', fontSize: '13px', color: '#94a3b8' }}>
                <span>IP Address: <strong style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{server.ip}</strong></span>
                <span>Lifetime Uptime: <strong style={{ color: '#cbd5e1' }}>{server.uptime}</strong></span>
                <span>ICMP Latency: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{server.latency}</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* RENDERS DYNAMIC BADGES ACCORDING TO SYSTEM STATE */}
              <span style={{ 
                padding: '6px 12px', 
                borderRadius: '4px', 
                fontSize: '12px', 
                fontWeight: 'bold',
                backgroundColor: server.status === 'ONLINE' ? '#064e3b' : server.status === 'OFFLINE' ? '#7f1d1d' : '#78350f',
                color: server.status === 'ONLINE' ? '#4ade80' : server.status === 'OFFLINE' ? '#f87171' : '#fbbf24',
                minWidth: '80px',
                textAlign: 'center'
              }}>
                {server.status}
              </span>

              {server.status === 'OFFLINE' && (
                <button 
                  onClick={() => handleRebootServer(server.id, server.name)}
                  style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
                >
                  Force Remote Reboot
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CORE SYSLOG ENGINE */}
      <div style={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', padding: '20px' }}>
        <h3 style={{ marginTop: '0', color: '#f1f5f9', borderBottom: '1px solid #1e293b', paddingBottom: '10px' }}>Network Syslog Stream (SIEM Core)</h3>
        <div style={{ fontFamily: 'monospace', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
          {logs.map((log, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', color: log.message.includes('CRITICAL') ? '#f87171' : log.message.includes('RESOLVED') ? '#4ade80' : log.message.includes('ADMIN') ? '#fbbf24' : '#94a3b8' }}>
              <span style={{ color: '#64748b' }}>[{log.time}]</span>
              <span>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
