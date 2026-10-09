"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Earth3D, Moon3D } from "./CelestialBodies";
import { TrajectoryPath } from "./TrajectoryPath";
import { LocationPoint, TrajectoryType } from "@/types/mission";

export const MissionCanvas: React.FC<{
  earthSite: LocationPoint;
  lunarSite: LocationPoint;
  trajectoryType: TrajectoryType;
  progress: number;
}> = ({ earthSite, lunarSite, trajectoryType, progress }) => {
  return (
    <div className="w-full h-full relative bg-slate-950">
      <Canvas camera={{ position: [0, 2, 16], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color="#ffffff"
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Earth3D site={earthSite} />
        <Moon3D site={lunarSite} />
        <TrajectoryPath trajectoryType={trajectoryType} progress={progress} />
        <OrbitControls enablePan enableZoom minDistance={5} maxDistance={30} />
      </Canvas>
    </div>
  );
};
