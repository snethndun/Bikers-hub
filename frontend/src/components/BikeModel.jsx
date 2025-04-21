import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload } from "@react-three/drei";

// Component to auto-rotate the bike model
const RotatingModel = () => {
  const ref = useRef();
  const { scene } = useGLTF("/bike.glb");

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // Adjust speed here
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={0.8} position={[0, -1, 0]} />
  );
};

const BikeModel = () => {
  const [loading, setLoading] = useState(true);
  const { scene } = useGLTF("/bike.glb");

  useEffect(() => {
    if (scene) setLoading(false);
  }, [scene]);

  if (loading) return <div>Loading...</div>;

  return (
    <Canvas
      camera={{
        position: [3, 2, 4],
        fov: 50,
        near: 0.1,
        far: 10000,
      }}
      style={{
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    >
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <pointLight position={[0, 1, 3]} intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} intensity={0.8} />
      <hemisphereLight
        skyColor={0x87ceeb}
        groundColor={0x8b4513}
        intensity={0.5}
      />

      {/* Rotating Model */}
      <RotatingModel />

      {/* Optional OrbitControls for manual override */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
      />

      <Preload all />
    </Canvas>
  );
};

export default BikeModel;
