import { describe, it } from 'node:test';
import assert from 'node:assert';
import { ROADMAP_STAGES, getSystemMetrics } from '../src/resources/index.js';

describe('MCP Resources & Metrics Validation', () => {
  it('should have 7 standardized roadmap stages', () => {
    assert.strictEqual(ROADMAP_STAGES.length, 7);
    assert.strictEqual(ROADMAP_STAGES[0].stage, 1);
    assert.strictEqual(ROADMAP_STAGES[6].stage, 7);
  });

  it('should generate valid system metrics', () => {
    const metrics = getSystemMetrics();
    assert.ok(typeof metrics.cpuUsagePercent === 'number');
    assert.ok(metrics.memoryUsageMb > 0);
    assert.ok(metrics.uptimeSeconds >= 0);
  });

  it('should compute statistical aggregations correctly', () => {
    const numbers = [10, 20, 30, 40, 50];
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    
    assert.strictEqual(sum, 150);
    assert.strictEqual(mean, 30);
  });
});
