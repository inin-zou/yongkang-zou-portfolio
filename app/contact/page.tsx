"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Github, Linkedin, Send, Heart, Activity, Shield, Terminal } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { playSound } = useSound()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    playSound("click")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      playSound("success")
      setFormData({ name: "", email: "", message: "" })

      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      <div className="monitor-scroll-area">
        <div className="page-container">
          <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
            <div>
              <h1 className="cyber-glitch-header page-title" data-text="COMM_TERMINAL">COMM_TERMINAL</h1>
              <p className="text-terminal-green text-xs tracking-widest mt-2">
                <span className="blinking-cursor">&gt;&gt; ESTABLISHING_SECURE_CONNECTION...</span>
              </p>
            </div>
            <div className="hidden md:flex gap-4 text-xs font-mono text-gray-500">
               <div className="flex items-center gap-2">
                 <Shield size={14} className="text-terminal-green" />
                 <span>SSL: ENCRYPTED</span>
               </div>
            </div>
          </div>

          <div className="contact-dashboard">
            {/* Left Column: Direct Channels */}
            <div className="flex flex-col gap-6">
              <div className="contact-card h-full">
                <div className="contact-header">
                  <div className="contact-title">
                    <Activity size={14} className="text-terminal-green animate-pulse" />
                    <span>SIGNAL_CHANNELS</span>
                  </div>
                  <span className="text-[0.6rem] text-terminal-green">STATUS: ACTIVE</span>
                </div>

                <a href="mailto:yongkang.zou1999@gmail.com" className="contact-info-item" onClick={() => playSound("click")}>
                  <div className="contact-icon-box">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-label">EMAIL_PROTOCOL</div>
                    <div className="contact-value">yongkang.zou1999@gmail.com</div>
                  </div>
                </a>

                <a href="https://github.com/inin-zou" target="_blank" rel="noopener noreferrer" className="contact-info-item" onClick={() => playSound("click")}>
                  <div className="contact-icon-box">
                    <Github size={20} />
                  </div>
                  <div>
                    <div className="contact-label">CODE_REPOSITORY</div>
                    <div className="contact-value">github.com/inin-zou</div>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/yongkang-zou" target="_blank" rel="noopener noreferrer" className="contact-info-item" onClick={() => playSound("click")}>
                  <div className="contact-icon-box">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <div className="contact-label">PROFESSIONAL_NET</div>
                    <div className="contact-value">linkedin.com/in/yongkang-zou</div>
                  </div>
                </a>

                <div className="mt-6 p-4 border border-dashed border-gray-700 bg-black/30 rounded">
                   <div className="flex items-center gap-2 mb-2 text-hot-magenta">
                     <Heart size={14} />
                     <span className="text-xs font-bold font-mono">COLLABORATION_MODE</span>
                   </div>
                   <p className="text-xs text-gray-400 leading-relaxed font-mono">
                     Open to discussing AI projects, music production, or innovative tech solutions. Transmission lines are always open.
                   </p>
                </div>
              </div>
            </div>

            {/* Right Column: Message Interface */}
            <div className="flex flex-col gap-6">
              <div className="contact-card h-full">
                <div className="contact-header">
                  <div className="contact-title">
                    <Terminal size={14} className="text-terminal-green" />
                    <span>SECURE_UPLINK</span>
                  </div>
                  <span className="text-[0.6rem] text-gray-500">LATENCY: 12ms</span>
                </div>

                {isSubmitted ? (
                  <div className="success-message">
                    <div className="flex justify-center mb-4">
                      <Shield size={48} className="text-terminal-green" />
                    </div>
                    <h3 className="text-terminal-green font-bold font-pixel mb-4">TRANSMISSION_COMPLETE</h3>
                    <p className="text-xs text-gray-400 font-mono mb-2">DATA_PACKET_RECEIVED_SUCCESSFULLY</p>
                    <p className="text-xs text-gray-500 font-mono">RESPONSE_ESTIMATED: &lt; 24_HOURS</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="cyber-form-group">
                      <label className="cyber-label">IDENTITY_STRING (NAME)</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="cyber-input"
                        placeholder="ENTER_NAME..."
                        autoComplete="off"
                      />
                    </div>

                    <div className="cyber-form-group">
                      <label className="cyber-label">RETURN_ADDRESS (EMAIL)</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="cyber-input"
                        placeholder="ENTER_EMAIL..."
                        autoComplete="off"
                      />
                    </div>

                    <div className="cyber-form-group">
                      <label className="cyber-label">DATA_PAYLOAD (MESSAGE)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="cyber-textarea"
                        placeholder="ENTER_MESSAGE_CONTENT..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cyber-submit-btn"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">UPLOADING_DATA...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>INITIATE_TRANSFER</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
