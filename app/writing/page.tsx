"use client"

import { Calendar, ArrowRight } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"

export default function WritingPage() {
  const { playSound } = useSound()

  const posts = [
    {
      title: "Building Multi-Agent Systems with LangGraph",
      date: "2025-01-15",
      excerpt:
        "A deep dive into creating collaborative AI agents that work together to solve complex problems using LangGraph framework.",
      tags: ["LangGraph", "AI Agents", "LLM", "Multi-Agent"],
      readTime: "8 min read",
    },
    {
      title: "RAG Systems at Scale: Lessons from Production",
      date: "2024-12-20",
      excerpt:
        "Real-world insights from deploying retrieval-augmented generation systems in enterprise environments at Société Générale.",
      tags: ["RAG", "ElasticSearch", "Production", "Enterprise"],
      readTime: "12 min read",
    },
    {
      title: "Quantum Machine Learning with Perceval",
      date: "2024-11-10",
      excerpt:
        "Exploring quantum computing applications in machine learning using photonic quantum computers and the Perceval framework.",
      tags: ["Quantum ML", "Perceval", "Research", "QCNN"],
      readTime: "15 min read",
    },
    {
      title: "From Finance to AI: A Career Transition Story",
      date: "2024-10-05",
      excerpt:
        "How I transitioned from financial analysis at CITIC Securities to AI engineering, and the lessons learned along the way.",
      tags: ["Career", "AI", "Finance", "Personal"],
      readTime: "6 min read",
    },
    {
      title: "The Art of Prompt Engineering for Enterprise LLMs",
      date: "2024-09-18",
      excerpt:
        "Best practices for designing effective prompts in enterprise environments, with real examples from production systems.",
      tags: ["Prompt Engineering", "LLM", "Enterprise", "Best Practices"],
      readTime: "10 min read",
    },
  ]

  return (
    <>
      <div className="page-container">
        <h1 className="page-title blinking-cursor">KNOWLEDGE BASE</h1>
        <p className="page-subtitle">Accessing archived technical documentation...</p>

        <div className="projects-grid">
          {posts.map((post, index) => (
            <div key={index} className="project-card ai">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <Calendar size={12} className="text-electric-blue" />
                <span className="timeline-date">{post.date}</span>
                <span className="timeline-date">•</span>
                <span className="timeline-date">{post.readTime}</span>
              </div>

              <h2 className="project-title">{post.title}</h2>

              <div className="project-tags">
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="project-description">{post.excerpt}</p>

              <div className="project-buttons">
                <button className="project-button" onClick={() => playSound("click")}>
                  <ArrowRight size={12} />
                  READ POST
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="timeline-section" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">UPCOMING ARTICLES</h2>

          <div className="timeline-item">
            <h3 className="timeline-title">Advanced RAG Techniques for Domain-Specific Applications</h3>
            <p className="timeline-description">
              Exploring advanced retrieval-augmented generation techniques for specialized domains like biomedical
              research and legal documents.
            </p>
          </div>

          <div className="timeline-item">
            <h3 className="timeline-title">Building Agentic Workflows with LangChain</h3>
            <p className="timeline-description">
              A comprehensive guide to creating intelligent agent workflows that can handle complex, multi-step tasks
              autonomously.
            </p>
          </div>

          <div className="timeline-item">
            <h3 className="timeline-title">The Future of Human-AI Collaboration in Creative Industries</h3>
            <p className="timeline-description">
              Examining how AI is transforming creative fields like music production, with insights from my experience
              as an independent artist.
            </p>
          </div>
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
