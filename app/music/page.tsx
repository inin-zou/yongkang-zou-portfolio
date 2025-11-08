"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Music, Play } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import AudioVisualizer from "@/components/audio-visualizer"
import { useSound } from "@/components/sound-provider"
import NetEaseMusicPlayer from "@/components/netease-music-player"

export default function MusicPage() {
  const { playSound } = useSound()
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
      playSound("success")
    }, 1500)

    return () => clearTimeout(timer)
  }, [playSound])

  const handleLinkClick = () => {
    playSound("click")
  }

  return (
    <>
      <div className="page-container">
        <h1 className="page-title blinking-cursor">AUDIO ARCHIVES</h1>
        <p className="page-subtitle">Accessing musical interface protocols...</p>

        <div className="music-grid">
          {/* Artist Profile Section */}
          <div className="music-panel">
            <div className="music-panel-header">
              <Music size={16} className="music-icon" />
              <h2 className="music-panel-title">♪ ARTIST PROFILE</h2>
            </div>

            <div className="music-panel-content">
              <p className="music-text">
                <span className="artist-name">inhibitor</span> is an indie RnB singer-songwriter crafting emotional
                soundscapes through introspective lyrics and ambient production.
              </p>

              <p className="music-text">
                Currently working on an independent EP project that blends vulnerable storytelling with dreamy
                electronic elements and lo-fi textures.
              </p>

              <div className="music-platform-links">
                <a
                  href="https://open.spotify.com/search/inhibitor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-button music-platform-button"
                  onClick={handleLinkClick}
                >
                  <ExternalLink size={12} />
                  SPOTIFY
                </a>

                <a
                  href="https://www.douyin.com/user/MS4wLjABAAAA2h40NMhjS5rGc09h9kFMxb0_2DP7H5vpCZza_OP_ymbrLM6j2_2HQa-_Lbju4VER"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-button music-platform-button"
                  onClick={handleLinkClick}
                >
                  <ExternalLink size={12} />
                  DOUYIN
                </a>

                <a
                  href="https://music.163.com/#/artist?id=31338333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-button music-platform-button"
                  onClick={handleLinkClick}
                >
                  <ExternalLink size={12} />
                  NETEASE
                </a>
              </div>
            </div>
          </div>

          {/* Featured Track Section */}
          <div className="music-panel">
            <div className="music-panel-header">
              <Play size={16} className="music-icon" />
              <h2 className="music-panel-title">♪ FEATURED TRACK</h2>
            </div>

            <div className="music-panel-content">
              {isLoading ? (
                <div className="music-player-loading">
                  <div className="loading-text">LOADING MUSIC PLAYER...</div>
                  <div className="loading-bar">
                    <div className="loading-progress"></div>
                  </div>
                </div>
              ) : (
                <NetEaseMusicPlayer songId="1878896648" />
              )}

              <a
                href="https://music.163.com/#/song?id=1878896648"
                target="_blank"
                rel="noopener noreferrer"
                className="netease-link"
                onClick={handleLinkClick}
              >
                Listen on NetEase Cloud Music
              </a>
            </div>
          </div>
        </div>

        {/* Audio Visualizer Section - Moved below the grid */}
        <div className="music-panel full-width" style={{ marginTop: "2rem" }}>
          <div className="music-panel-header">
            <Music size={16} className="music-icon" />
            <h2 className="music-panel-title">♪ AUDIO SPECTRUM ANALYZER</h2>
          </div>
          <div className="music-panel-content">
            <AudioVisualizer isPlaying={isPlaying} barCount={64} height={150} />
            <p className="music-text" style={{ marginTop: "1rem", textAlign: "center" }}>
              Real-time frequency analysis • 64-channel spectrum • Neural audio processing active
            </p>
          </div>
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
