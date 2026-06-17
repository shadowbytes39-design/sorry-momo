"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Pause } from "lucide-react"
import * as THREE from "three"

function CrystalOrb({ isPlaying }: { isPlaying: boolean }) {
  const materialRef = useRef<any>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.distort = isPlaying 
        ? THREE.MathUtils.lerp(materialRef.current.distort, 0.6, 0.05)
        : THREE.MathUtils.lerp(materialRef.current.distort, 0.3, 0.05)
        
      materialRef.current.speed = isPlaying ? 4 : 1.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Sphere args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color={isPlaying ? "#ff66a3" : "#ffb3d9"}
          roughness={0.1}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          thickness={1}
        />
      </Sphere>
      <Environment preset="city" />
    </Float>
  )
}

export default function VoiceFromTheHeart() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])

  useEffect(() => {
    audioRef.current = new Audio("/audio/voice-note.mp3")
    
    // Automatically reset when audio finishes
    audioRef.current.onended = () => {
      setIsPlaying(false)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.log("Audio play error", e))
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] flex items-center justify-center bg-transparent z-20">
      <motion.div 
        style={{ opacity, y }}
        className="w-full flex flex-col items-center justify-center"
      >
        <p className="text-xl md:text-2xl font-light text-white/70 mb-10 tracking-widest uppercase">
          A Voice From The Heart
        </p>

        <div className="relative w-64 h-64 md:w-96 md:h-96 cursor-pointer group" onClick={togglePlay}>
          {/* We use pointer-events-none on Canvas so clicks pass through to the container */}
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <CrystalOrb isPlaying={isPlaying} />
            </Canvas>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white transition-all duration-500 ${isPlaying ? 'opacity-0 scale-50' : 'opacity-100 group-hover:scale-110'}`}>
              <Play className="w-8 h-8 ml-1" />
            </div>
            
            <div className={`absolute p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white transition-all duration-500 ${isPlaying ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-150'}`}>
              <Pause className="w-8 h-8" />
            </div>
          </div>
        </div>

        <p className="text-white/50 text-sm mt-8 mt-10 animate-pulse">
          Click the orb to listen
        </p>
      </motion.div>
    </section>
  )
}
