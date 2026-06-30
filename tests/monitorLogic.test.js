import test from 'node:test';
import assert from 'node:assert/strict';
import {
  applyPollingLatencyUpdate,
  completeRebootTransition,
  createAdminActionLog,
  createResolvedLog,
  initialServers,
  startRebootTransition,
} from '../src/monitorLogic.js';

test('keeps offline switch unchanged during automated polling', () => {
  const updated = applyPollingLatencyUpdate(initialServers, () => 0.99);
  const offlineSwitch = updated.find((server) => server.id === 4);

  assert.equal(offlineSwitch.status, 'OFFLINE');
  assert.equal(offlineSwitch.latency, 'TIMEOUT');
});

test('updates latency for online servers when polling variance is triggered', () => {
  const randomValues = [0.99, 0.5, 0.1, 0.1, 0.1, 0.1];
  const updated = applyPollingLatencyUpdate([initialServers[0]], () => randomValues.shift() ?? 0);

  assert.equal(updated[0].latency, '22ms');
  assert.equal(updated[0].status, 'ONLINE');
});

test('starts a manual reboot transition for a target server only', () => {
  const updated = startRebootTransition(initialServers, 4);

  assert.equal(updated.find((server) => server.id === 4).status, 'REBOOTING');
  assert.equal(updated.find((server) => server.id === 4).latency, 'POLLING...');
  assert.equal(updated.find((server) => server.id === 1).status, 'ONLINE');
});

test('completes a reboot transition with recovered network state', () => {
  const rebooting = startRebootTransition(initialServers, 4);
  const updated = completeRebootTransition(rebooting, 4);
  const recovered = updated.find((server) => server.id === 4);

  assert.equal(recovered.status, 'ONLINE');
  assert.equal(recovered.latency, '5ms');
  assert.equal(recovered.uptime, '94.24%');
});

test('creates operational logs for admin action and recovery', () => {
  assert.deepEqual(createAdminActionLog('10:00:00', 'Switch'), {
    time: '10:00:00',
    message: 'ADMIN ACTION: Initialized remote system reboot sequence on asset: Switch.',
  });
  assert.deepEqual(createResolvedLog('10:01:00', 'Switch'), {
    time: '10:01:00',
    message: 'RESOLVED: Asset Switch back online. ICMP handshake verification success.',
  });
});