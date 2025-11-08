"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Github, Linkedin, Send, Heart } from "lucide-react"
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
      }, 3000)
    }, 1500)
  }

  return (
    <>
      <div className="page-container">
        <h1 className="page-title blinking-cursor">COMMUNICATION TERMINAL</h1>
        <p className="page-subtitle">Establishing secure connection...</p>

        <div className="about-layout">
          {/* Contact Information */}
          <div className="timeline-section">
            <h2 className="section-title">DIRECT CHANNELS</h2>

            <div className="timeline-item">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Mail size={16} className="text-electric-blue" />
                <div>
                  <h3 className="timeline-title">EMAIL</h3>
                  <p className="timeline-description">yongkang.zou1999@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Github size={16} className="text-electric-blue" />
                <div>
                  <h3 className="timeline-title">GITHUB</h3>
                  <p className="timeline-description">github.com/inin-zou</p>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Linkedin size={16} className="text-electric-blue" />
                <div>
                  <h3 className="timeline-title">LINKEDIN</h3>
                  <p className="timeline-description">linkedin.com/in/yongkang-zou</p>
                </div>
              </div>
            </div>

            <div className="timeline-item" style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Heart size={16} className="text-hot-magenta" />
                <div>
                  <h3 className="timeline-title">COLLABORATION</h3>
                  <p className="timeline-description">
                    Feel free to reach out if you want to build something together. Always open to discussing AI
                    projects, music collaborations, or innovative ideas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Interface */}
          <div className="timeline-section">
            <h2 className="section-title">MESSAGE INTERFACE</h2>

            {isSubmitted ? (
              <div className="timeline-item">
                <h3 className="timeline-title text-terminal-green">MESSAGE TRANSMITTED SUCCESSFULLY</h3>
                <p className="timeline-description">
                  <span className="terminal-prompt">RESPONSE EXPECTED WITHIN 24 HOURS</span>
                  <br />
                  <span className="terminal-prompt">CONNECTION TERMINATED</span>
                  <br />
                  <span className="terminal-prompt">THANK YOU FOR YOUR MESSAGE</span>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label className="timeline-title" style={{ display: "block", marginBottom: "0.5rem" }}>
                    NAME:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "2px solid var(--electric-blue)",
                      color: "white",
                      padding: "0.8rem",
                      fontFamily: "Press Start 2P",
                      fontSize: "0.7rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label className="timeline-title" style={{ display: "block", marginBottom: "0.5rem" }}>
                    EMAIL:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "2px solid var(--electric-blue)",
                      color: "white",
                      padding: "0.8rem",
                      fontFamily: "Press Start 2P",
                      fontSize: "0.7rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label className="timeline-title" style={{ display: "block", marginBottom: "0.5rem" }}>
                    MESSAGE:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "2px solid var(--electric-blue)",
                      color: "white",
                      padding: "0.8rem",
                      fontFamily: "Press Start 2P",
                      fontSize: "0.7rem",
                      resize: "vertical",
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="project-button"
                  style={{ alignSelf: "flex-start" }}
                >
                  {isSubmitting ? (
                    "TRANSMITTING..."
                  ) : (
                    <>
                      <Send size={12} />
                      SEND MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
