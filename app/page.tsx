import React from 'react'
import { CosmicBackground } from '@/components/cosmic-background'
import { Hero } from '@/components/hero'
import { LinkButtons } from '@/components/link-buttons'
import { Footer } from '@/components/footer'
import { AudioProvider } from '@/components/audio-provider'
import { SoundToggle } from '@/components/sound-toggle'

export default function Home() {
  return (
    <AudioProvider>
      <main className="relative min-h-screen bg-black">
        <CosmicBackground />

        <div className="relative z-10">
          <Hero />
          <LinkButtons />
          <Footer />
        </div>

        <SoundToggle />
      </main>
    </AudioProvider>
  )
}
