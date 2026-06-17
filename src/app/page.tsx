import SceneBackground from "@/components/3d/SceneBackground";
import CinematicIntro from "@/components/CinematicIntro";
import MomoGallery from "@/components/MomoGallery";
import WhatHappened from "@/components/WhatHappened";
import WhyMomoMatters from "@/components/WhyMomoMatters";
import MemoryUniverse from "@/components/MemoryUniverse";
import FinalForgiveness from "@/components/FinalForgiveness";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* The 3D global background covering the viewport */}
      <SceneBackground />
      
      {/* Scrollable cinematic sections */}
      <CinematicIntro />
      <MomoGallery />
      <WhatHappened />
      <WhyMomoMatters />
      <MemoryUniverse />
      <FinalForgiveness />
    </main>
  );
}
