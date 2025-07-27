import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { type CustomizationState } from "@/app/customize/[id]/page";
import { CarModel } from "./CarModel";
import { OrbitControls as OrbitControlsType } from "three-stdlib"; // Import type for the ref

export function CarPreview({
  customization,
}: {
  customization: CustomizationState;
}) {
  // 1. Create a ref to hold the OrbitControls instance
  const controlsRef = useRef<OrbitControlsType>(null);

  // 2. Create handler functions for zooming
  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.2); // Zooms in
      controlsRef.current.update(); // Applies the change
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2); // Zooms out
      controlsRef.current.update(); // Applies the change
    }
  };

  return (
    // 3. Add 'relative' positioning to the container div
    <div className="relative w-full h-[550px] rounded-lg shadow-lg overflow-hidden border">
      <Canvas shadows camera={{ position: [5, 2, 5.5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6} castShadow={false}>
            <CarModel customization={customization} />
          </Stage>
        </Suspense>
        {/* 4. Assign the ref to the OrbitControls component */}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          maxPolarAngle={Math.PI / 2}
          minDistance={2.5}
          maxDistance={10}
        />
      </Canvas>
      {/* 5. Add the UI buttons, positioned over the canvas */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-gray-800 text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-gray-700 transition-colors"
          aria-label="Zoom In"
        >
          +
        </button>
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-gray-800 text-white rounded-full text-lg font-bold flex items-center justify-center hover:bg-gray-700 transition-colors"
          aria-label="Zoom Out"
        >
          -
        </button>
      </div>
    </div>
  );
}
