"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
export default function WalkieTalkieModel(props) {
  const { scene } = useGLTF("/walkietalkie/walkietalkie.glb");
  useEffect(() => {
    scene.traverse((o) => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap"].forEach((k) => {
          const t = m?.[k];
          if (t?.image) console.log(o.name, k, t.image.width, t.image.height);
        });
      });
    });
  }, [scene]);
  return <primitive object={scene} {...props} />;
}
useGLTF.preload("/walkietalkie/walkietalkie.glb");
