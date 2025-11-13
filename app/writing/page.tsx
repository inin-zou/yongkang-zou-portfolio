"use client"

import { Calendar, ArrowRight } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"
import GridMotion from "@/components/GridMotion"
import CountUp from "@/components/CountUp"
import "@/components/GridMotion.css"

export default function WritingPage() {
  const { playSound } = useSound()

  const posts = [
    {
      title: "Hackathon Journey 2024-2025",
      date: "2024.10 - 2025.11",
      excerpt: (
        <>
          From 2024.10 to 2025.11, I've participated in <CountUp from={0} to={15} duration={2} className="text-electric-blue" /> hackathons, winning <CountUp from={0} to={8} duration={2} className="text-electric-blue" /> times:
          <br /><br />
          🏆 Anthropics x Entrepreneurs First - Builder Retreat: 1st Place Winner (2025.10)<br />
          🏆 Tech:Europe x OpenAI Community Winner (2025.09)<br />
          🏆 Pond Speedrun 1st Place - Future StartUp Prize ($50k)  (2025.08)<br />
          🏆 Dify Hackathon 1st Place Winner (2025.07)<br />
          🥈 UK AI Agent Hackathon 2nd Place Winner (2025.08)<br />
          🥈 Kryptosphere x Utopia - From RAG to Agentic AI: 2nd Place Winner (2025.04)<br />
          🥉 Chateau de Versailles Hackathon - Les Clefs du Versailles: 3rd Place Winner (2025.10)<br />
          🥉 Raise Summit Hackathon 3rd Place Winner (2025.08)<br />
          <br />
          I believe that every hackathon sprint and every sleepless night has shown me that there are many brilliant people who, like me, truly love creation and technology — working hard alongside me, and constantly inspiring me to become better!
        </>
      ),
      tags: ["Hackathon", "AI", "Innovation", "Community"],
    },
  ]

  return (
    <>
      <div className="page-container">
        <h1 className="page-title blinking-cursor">KNOWLEDGE BASE</h1>
        <p className="page-subtitle">Accessing archived technical documentation...</p>

        <div style={{ marginBottom: "2rem", width: "100%" }}>
          {posts.map((post, index) => (
            <div 
              key={index} 
              className="project-card ai"
              style={{ 
                opacity: 1,
                display: "block",
                visibility: "visible",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                overflow: "visible"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Calendar size={12} className="text-electric-blue" />
                <span className="timeline-date">{post.date}</span>
              </div>

              <h2 className="project-title">{post.title}</h2>

              <div className="project-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-description">{post.excerpt}</div>

              {/* <div className="project-buttons">
                <button className="project-button" onClick={() => playSound("click")}>
                  <ArrowRight size={12} />
                  READ POST
                </button>
              </div> */}
            </div>
          ))}
        </div>

        {/* Photo Gallery Section */}
        <div className="timeline-section" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">PHOTO GALLERY</h2>
          <GridMotion
            items={[
              "/images/IMG_0034.JPG",
              "/images/IMG_2824.jpg",
              "/images/IMG_5372.JPG",
              "/images/IMG_7777.jpg",
              "/images/IMG_7805.jpg",
              "/images/IMG_9773.jpg",
              "/images/IMG_5617 2.jpg",
              "/images/IMG_5650.jpg",
              "/images/1759328884863 2.jpg",
              "/images/0b23b2f0-0ee0-4583-b012-7de67457a5b0.JPG",
              "/images/a5eeae23-1481-4944-a166-fc0bee3f1842 2.JPG",
              "/images/cb39a926-f0d4-4ea0-8457-c4097ee1ee28.JPG",
              "/images/IMG_5237 2.JPG",
              "/images/IMG_4320 2.jpg",
              "/images/IMG_5348 2.jpg",
              "/images/IMG_5361.jpg",
              "/images/IMG_5232.jpg",
              "/images/IMG_4809.jpg",
              "/images/IMG_5392.jpg",
              "/images/IMG_2183.jpg",
              "/images/IMG_5169.jpg",
              "/images/IMG_7688.jpg",
              "/images/IMG_5175.jpg",
            ]}
          />
        </div>

      </div>

      <FloatingNav />
    </>
  )
}
