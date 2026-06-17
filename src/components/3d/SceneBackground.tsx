"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Sparkles } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function Particles() {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  return (
    <group ref={ref}>
      <Sparkles count={500} scale={15} size={3} speed={0.3} opacity={0.4} color="#ff99cc" />
    </group>
  )
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <Particles />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  )
}
