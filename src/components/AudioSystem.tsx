"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AudioSystem() {
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // We load audio from the public folder. Users can drop their own ambient.mp3 here.
    audioRef.current = new Audio("/audio/ambient.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true)
        setIsMuted(false)
      }
    }

    // A simple global interaction listener to start audio automatically if they click anywhere,
    // which creates a seamless experience.
    window.addEventListener('click', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [hasInteracted])

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else if (hasInteracted) {
        audioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e))
      }
    }
  }, [isMuted, hasInteracted])

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setIsMuted(!isMuted)
        if (!hasInteracted) setHasInteracted(true)
      }}
      className="fixed bottom-6 right-6 z-[100] p-4 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white/80 hover:text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer group"
      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
      ) : (
        <Volume2 className="w-5 h-5 opacity-100" />
      )}
    </button>
  )
}
