"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { LocationPoint } from "@/types/mission";

export const Earth3D: React.FC<{ site: LocationPoint }> = ({ site }) => {
  const earthRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={earthRef} position={[-8, 0, 0]}>
      <Sphere args={[2.5, 64, 64]}>
        <meshStandardMaterial color="#1d4ed8" roughness={0.4} metalness={0.1} />
      </Sphere>
      <Sphere args={[2.6, 32, 32]}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* 3D Native Text Billboard replacing problematic Drei <Html> */}
      <Billboard position={[0, 3.1, 0]}>
        <Text
          fontSize={0.35}
          color="#93c5fd"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#020617"
        >
          {`🚀 ${site.name}`}
        </Text>
      </Billboard>
    </group>
  );
};

export const Moon3D: React.FC<{ site: LocationPoint }> = ({ site }) => {
  const moonRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={moonRef} position={[8, 0, 0]}>
      <Sphere args={[1.2, 64, 64]}>
        <meshStandardMaterial color="#9ca3af" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* 3D Native Text Billboard replacing problematic Drei <Html> */}
      <Billboard position={[0, 1.8, 0]}>
        <Text
          fontSize={0.3}
          color="#fde047"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="#020617"
        >
          {`🎯 ${site.name} (${site.lat}°, ${site.lng}°)`}
        </Text>
      </Billboard>
    </group>
  );
};
