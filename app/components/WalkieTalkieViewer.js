"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import WalkieTalkieModel from "./WalkieTalkieModel";
import PixelWindow from "./PixelWindow";


function ControlsLock() {
  const controls = useRef();

  useEffect(() => {
    if (!controls.current) return;
    controls.current.update();
    const p = controls.current.getPolarAngle();
    controls.current.minPolarAngle = p;
    controls.current.maxPolarAngle = p;
    controls.current.enableZoom = false;
    controls.current.enablePan = false;
  }, []);

  return (
    <OrbitControls
      ref={controls}
      enableZoom={false}
      enablePan={false}
      autoRotate
      autoRotateSpeed={0.8}
      enableDamping
      dampingFactor={0.06}
    />
  );
}

export default function WalkieTalkieViewer() {
  return (
    <div className="labsModelWrap" style={{ position: "relative" }}>
      <PixelWindow />


      <Canvas camera={{ position: [0, 1.3, 3], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 2]} intensity={1.2} />

        <Suspense fallback={null}>
          <Center>
            <WalkieTalkieModel scale={3.90} />
          </Center>

          <Environment preset="city" />
        </Suspense>

        <ControlsLock />
      </Canvas>
    </div>
    
  );
}
