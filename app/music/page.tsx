"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Music, Radio, Disc, Zap, Activity, Wifi } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { useSound } from "@/components/sound-provider"
import NetEaseMusicPlayer from "@/components/netease-music-player"
import CyberLoader from "@/components/cyber-loader"

export default function MusicPage() {
  const { playSound } = useSound()
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [eqBars, setEqBars] = useState<number[]>([])

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsPlaying(true)
      playSound("success")
    }, 2000)

    // Randomize EQ bars occasionally
    const eqInterval = setInterval(() => {
      setEqBars(Array.from({ length: 20 }, () => Math.random() * 100))
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(eqInterval)
    }
  }, [playSound])

  const handleLinkClick = () => {
    playSound("click")
  }

  return (
    <>
      <div className="monitor-scroll-area">
        {isLoading ? (
          <CyberLoader />
        ) : (
          <div className="page-container">
            <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
              <div>
                <h1 className="cyber-glitch-header page-title" data-text="SONIC_INTERFACE">SONIC_INTERFACE</h1>
                <p className="text-terminal-green text-xs tracking-widest mt-2">
                  <span className="blinking-cursor">&gt;&gt; CONNECTION_ESTABLISHED_V2.0</span>
                </p>
              </div>
              <div className="hidden md:flex gap-4 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-2">
                  <Wifi size={14} className={isPlaying ? "text-terminal-green" : "text-gray-600"} />
                  <span>NET: {isPlaying ? "ONLINE" : "OFFLINE"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-electric-blue animate-pulse" />
                  <span>CPU: 12%</span>
                </div>
              </div>
            </div>

            <div className="music-dashboard">
              {/* Left Column: Control Center */}
              <div className="flex flex-col gap-6">
                {/* Vinyl Player Module */}
                <div className="music-card">
                  <div className="music-card-header">
                    <div className="music-card-title">
                      <Disc size={14} className="text-hot-magenta" />
                      <span>TURNTABLE_MODULE</span>
                    </div>
                    <div className={`status-indicator ${isPlaying ? 'active' : ''}`}></div>
                  </div>
                  <div className="music-card-body text-center">
                    <div className="vinyl-container">
                      <div className={`vinyl-disc ${isPlaying ? 'playing' : ''}`}></div>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mb-2">NOW_SPINNING</p>
                    <h3 className="text-neon-cyan font-bold font-pixel text-sm mb-4">INHIBITOR_EP_DEMO</h3>
                    
                    <div className="cyber-controls justify-center">
                      <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => playSound("click")}>
                        <div className="cyber-knob group-hover:rotate-90 group-hover:border-neon-cyan"></div>
                        <span className="text-[0.6rem] text-gray-500 group-hover:text-neon-cyan">GAIN</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => playSound("click")}>
                        <div className="cyber-knob group-hover:rotate-180 group-hover:border-hot-magenta"></div>
                        <span className="text-[0.6rem] text-gray-500 group-hover:text-hot-magenta">BASS</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 group cursor-pointer" onClick={() => playSound("click")}>
                        <div className="cyber-knob group-hover:-rotate-90 group-hover:border-electric-blue"></div>
                        <span className="text-[0.6rem] text-gray-500 group-hover:text-electric-blue">TREBLE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Connection Grid */}
                <div className="music-card">
                  <div className="music-card-header">
                    <div className="music-card-title">
                      <Zap size={14} className="text-bright-yellow" />
                      <span>DATA_UPLINKS</span>
                    </div>
                    <span className="text-[0.6rem] text-gray-500">3_NODES_ACTIVE</span>
                  </div>
                  <div className="music-card-body">
                    <div className="platform-grid">
                      <a
                        href="https://open.spotify.com/search/inhibitor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-btn spotify"
                        onClick={handleLinkClick}
                      >
                        <ExternalLink size={16} />
                        <span>SPOTIFY</span>
                      </a>
                      <a
                        href="https://www.douyin.com/user/MS4wLjABAAAA2h40NMhjS5rGc09h9kFMxb0_2DP7H5vpCZza_OP_ymbrLM6j2_2HQa-_Lbju4VER"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-btn douyin"
                        onClick={handleLinkClick}
                      >
                        <ExternalLink size={16} />
                        <span>DOUYIN</span>
                      </a>
                      <a
                        href="https://music.163.com/#/artist?id=31338333"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="platform-btn netease"
                        onClick={handleLinkClick}
                      >
                        <ExternalLink size={16} />
                        <span>NETEASE</span>
                      </a>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-800">
                       <div className="eq-display">
                         {eqBars.map((height, i) => (
                           <div 
                             key={i} 
                             className="eq-bar" 
                             style={{ 
                               height: `${isPlaying ? height : 5}%`,
                               backgroundColor: i % 2 === 0 ? 'var(--electric-blue)' : 'var(--neon-cyan)' 
                             }}
                           />
                         ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Main Interface */}
              <div className="flex flex-col gap-6">
                {/* Main Player */}
                <div className="music-card h-full">
                  <div className="music-card-header">
                    <div className="music-card-title">
                      <Radio size={14} className="text-terminal-green" />
                      <span>FREQUENCY_TUNER</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-[0.6rem] text-terminal-green animate-pulse">REC</span>
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="music-card-body flex flex-col h-full">
                    <div className="p-1 bg-black border border-gray-800 rounded mb-6 relative group">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none z-10"></div>
                      <NetEaseMusicPlayer songId="1878896648" />
                      <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[0.6rem] bg-black/80 text-white px-2 py-1 rounded border border-gray-700">
                          HD_AUDIO
                        </span>
                      </div>
                    </div>

                    <div className="bg-black/40 p-4 rounded border border-gray-800 mb-6 flex-grow">
                      <h4 className="text-xs text-gray-400 mb-2 font-mono">// ARTIST_BIO_DATA</h4>
                      <p className="music-text font-mono text-sm leading-relaxed text-gray-300">
                        <span className="text-hot-magenta font-bold">inhibitor</span> is an indie RnB singer-songwriter crafting emotional soundscapes. 
                        <br/><br/>
                        <span className="text-terminal-green">&gt; GENRE:</span> ALTERNATIVE_RNB / LO-FI
                        <br/>
                        <span className="text-terminal-green">&gt; STATUS:</span> RECORDING_IN_PROGRESS
                        <br/>
                        <span className="text-terminal-green">&gt; LOCATION:</span> PARIS_FR
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[0.6rem] text-gray-500 font-mono">VISUAL_OUTPUT</span>
                        <span className="text-[0.6rem] text-electric-blue font-mono">60_HZ</span>
                      </div>
                      <div className="border border-gray-800 bg-black/50 p-2 rounded h-32">
                        <AudioVisualizer isPlaying={isPlaying} barCount={48} height={110} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FloatingNav />
    </>
  )
}
