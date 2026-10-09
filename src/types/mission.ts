export interface LocationPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  isCustom?: boolean;
}

export type TrajectoryType = "direct" | "hohmann" | "wsb";

export interface MissionMetrics {
  durationDays: number;
  maxVelocityKmS: number;
  totalDistanceKm: number;
  deltaV: number;
  fuelRequiredKg: number;
}

export interface TrajectoryProfile {
  id: TrajectoryType;
  name: string;
  description: string;
  metrics: MissionMetrics;
}
