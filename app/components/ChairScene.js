"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

function Chair() {
  const { scene } = useGLTF("/models/chair.glb");

  const groupRef = useRef(null);
  const targetRotRef = useRef(0);

  const fixed = useMemo(() => {
    const s = scene.clone(true);

    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    s.position.sub(center);

    const height = size.y || 1;
    const targetHeight = 1.2;
    const scale = targetHeight / height;
    s.scale.setScalar(scale);

    const box2 = new THREE.Box3().setFromObject(s);
    s.position.y -= box2.min.y;

    s.position.y -= 0.15;

    return s;
  }, [scene]);

  useEffect(() => {
    const onScroll = () => {
      targetRotRef.current = window.scrollY * 0.002;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const idle = 0.002;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotRef.current,
      0.08
    );

    groupRef.current.rotation.y += idle;
  });

  return (
    <group ref={groupRef}>
      <primitive object={fixed} />
    </group>
  );
}

useGLTF.preload("/models/chair.glb");

export default function ChairScene() {
  return (
    <Canvas
      style={{ background: "transparent" }}
      camera={{ position: [3, 1.15, 3.6], fov: 32, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[6, 8, 6]} intensity={2.0} />
      <directionalLight position={[-6, 4, -6]} intensity={1.0} />

      <Chair />
    </Canvas>
  );
}
