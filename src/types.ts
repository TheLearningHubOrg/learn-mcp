export interface SystemMetrics {
  cpuUsagePercent: number;
  memoryUsageMb: number;
  totalMemoryMb: number;
  uptimeSeconds: number;
  activeSessions: number;
}

export interface RoadmapStage {
  stage: number;
  title: string;
  focus: string;
  concepts: string[];
}
