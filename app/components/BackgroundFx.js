"use client";

import LiquidEther from "./LiquidEther";

export default function BackgroundFx() {
  return (
    <div className="bgFx">
      <LiquidEther
        resolution={0.5}
        mouseForce={20}
        cursorSize={80}
        autoDemo
        autoSpeed={0.5}
        autoIntensity={2.2}
        iterationsPoisson={32}
        isBounce={false}
        isViscous={true}
        viscous={10}
        iterationsViscous={2}
        colors={[
          "#8A2BE2",   
          "#00bfffc9",    
          "#00FFC6",    
          "#ff5edc6e"  
        ]}
      />
    </div>
  );
}
