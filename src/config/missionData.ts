import { LocationPoint, TrajectoryProfile } from "@/types/mission";

export const DEFAULT_EARTH_SITES: LocationPoint[] = [
  {
    id: "cape-canaveral",
    name: "Cape Canaveral (KSC), USA",
    lat: 28.5721,
    lng: -80.648,
  },
  {
    id: "vandenberg",
    name: "Vandenberg Space Force Base, USA",
    lat: 34.742,
    lng: -120.5724,
  },
  {
    id: "kourou",
    name: "Guiana Space Centre, Kourou",
    lat: 5.236,
    lng: -52.768,
  },
];

export const DEFAULT_LUNAR_SITES: LocationPoint[] = [
  {
    id: "shackleton",
    name: "Shackleton Crater (South Pole)",
    lat: -89.9,
    lng: 0.0,
  },
  {
    id: "malapert",
    name: "Malapert Mountain (South Pole)",
    lat: -84.9,
    lng: 12.9,
  },
  {
    id: "oceanus-procellarum",
    name: "Oceanus Procellarum (IM-1 Site)",
    lat: 24.0,
    lng: -43.0,
  },
  {
    id: "reiner-gamma",
    name: "Reiner Gamma (Magnetic Anomaly)",
    lat: 7.5,
    lng: -59.0,
  },
];

export const TRAJECTORY_PROFILES: Record<string, TrajectoryProfile> = {
  direct: {
    id: "direct",
    name: "Direct Fast Transfer",
    description: "Shortest duration path requiring high propellant Delta-V.",
    metrics: {
      durationDays: 3.2,
      maxVelocityKmS: 10.8,
      totalDistanceKm: 384400,
      deltaV: 3200,
      fuelRequiredKg: 14200,
    },
  },
  hohmann: {
    id: "hohmann",
    name: "Hohmann Transfer Orbit",
    description:
      "Standard efficient elliptical transfer orbit for commercial payloads.",
    metrics: {
      durationDays: 4.8,
      maxVelocityKmS: 8.5,
      totalDistanceKm: 405000,
      deltaV: 2400,
      fuelRequiredKg: 9800,
    },
  },
  wsb: {
    id: "wsb",
    name: "Low Energy (WSB) Transfer",
    description:
      "Gravitational assistance route. Takes longer but saves maximum fuel.",
    metrics: {
      durationDays: 110,
      maxVelocityKmS: 4.2,
      totalDistanceKm: 1200000,
      deltaV: 850,
      fuelRequiredKg: 3200,
    },
  },
};
