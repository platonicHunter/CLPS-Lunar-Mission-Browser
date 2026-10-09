"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { TrajectoryType } from "@/types/mission";

export const TrajectoryPath: React.FC<{
  trajectoryType: TrajectoryType;
  progress: number;
}> = ({ trajectoryType, progress }) => {
  const spacecraftRef = useRef<THREE.Group>(null);

  const curve = useMemo(() => {
    const start = new THREE.Vector3(-8, 0, 0);
    const end = new THREE.Vector3(8, 0, 0);
    let control1 = new THREE.Vector3(-3, 1.5, 0);
    let control2 = new THREE.Vector3(3, -1.5, 0);

    if (trajectoryType === "hohmann") {
      control1 = new THREE.Vector3(-2, 4.5, 1);
      control2 = new THREE.Vector3(4, 3.5, -1);
    } else if (trajectoryType === "wsb") {
      control1 = new THREE.Vector3(-4, 7, 3);
      control2 = new THREE.Vector3(6, -6, -3);
    }
    return new THREE.CubicBezierCurve3(start, control1, control2, end);
  }, [trajectoryType]);

  const points = useMemo(() => curve.getPoints(100), [curve]);

  useFrame(() => {
    if (spacecraftRef.current) {
      const point = curve.getPointAt(Math.min(Math.max(progress, 0), 1));
      spacecraftRef.current.position.copy(point);
    }
  });

  return (
    <group>
      <Line
        points={points}
        color="#38bdf8"
        lineWidth={2}
        dashed
        dashScale={2}
      />
      <group ref={spacecraftRef}>
        <mesh>
          <octahedronGeometry args={[0.25, 0]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>

        {/* 3D Native Text Billboard replacing problematic Drei <Html> */}
        <Billboard position={[0, 0.6, 0]}>
          <Text
            fontSize={0.25}
            color="#fbbf24"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#020617"
          >
            🛰️ CLPS Lander
          </Text>
        </Billboard>
      </group>
    </group>
  );
};
