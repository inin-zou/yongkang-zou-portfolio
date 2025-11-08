"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Github, ExternalLink } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  category: "ai" | "games" | "web" | "security"
  codeUrl: string
  demoUrl: string
  hasCode: boolean
  hasDemo: boolean
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { playSound } = useSound()

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          title: "OnTrack – Multi-Agent Study Planner",
          description:
            "Hackathon-winning agentic AI system for personalized university admission guidance using LangChain and OpenSearch.",
          tags: ["LangChain", "OpenSearch", "Claude 3.7", "Python", "AWS"],
          category: "ai",
          codeUrl: "https://github.com/inin-zou/ON-TRACKS-AI-Agents-Hackathon-",
          demoUrl: "https://devpost.com/software/on-tracks",
          hasCode: true,
          hasDemo: true,
        },
        {
          id: 2,
          title: "Make Debates Great Again",
          description: "Unity3D-based political debate game with AI candidates and emotion-driven dialogue systems.",
          tags: ["Unity", "Mistral", "ElevenLabs", "C#", "Hugging Face"],
          category: "games",
          codeUrl: "#",
          demoUrl: "https://huggingface.co/spaces/Mistral-AI-Game-Jam/Team15",
          hasCode: false,
          hasDemo: true,
        },
        {
          id: 3,
          title: "ZenQ – Quantum ML Framework",
          description: "Quantum CNN using Perceval to enhance photonic computation via HW-preserving architecture.",
          tags: ["Quantum ML", "QCNN", "Perceval", "PyTorch", "Python"],
          category: "ai",
          codeUrl: "https://github.com/inin-zou/ZenQ",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
        },
        {
          id: 4,
          title: "Cyberpunk Portfolio Interface",
          description: "Retro cyberpunk pixel-art portfolio website with authentic 90s arcade game aesthetics.",
          tags: ["React", "Next.js", "CSS3", "TypeScript", "Web Audio"],
          category: "web",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
        },
        {
          id: 5,
          title: "Agentic Deployment System",
          description: "CI/CD automation with LLM agents using LangChain and enterprise LLMaaS integration.",
          tags: ["DevOps", "LangChain", "RAG", "GitHub Actions", "Docker"],
          category: "security",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
        },
        {
          id: 6,
          title: "MealMate – AI Edge Hackathon Project",
          description:
            "Transform leftover food in a refrigerator into intelligent recipe recommendations using YOLOv5 and a dual-mode RAG system. Includes online and offline modes for personalized meal planning and food waste reduction.",
          tags: ["YOLOv5", "Meta Llama", "PostgreSQL", "RAG"],
          category: "ai",
          codeUrl: "https://github.com/Lucine1998/Recipe-Recommandation",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
        },
        {
          id: 7,
          title: "Flappy Bird – Reinforcement Learning Project",
          description:
            "Trained an AI agent to play Flappy Bird using NEAT algorithm and Pygame mechanics. Visualized evolution of performance and fitness during training.",
          tags: ["NEAT", "Pygame", "Evolutionary Algorithms"],
          category: "ai",
          codeUrl: "https://github.com/inin-zou/FlappyBird-ReinforcementLearning",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
        },
        {
          id: 8,
          title: "Movie Recommendation System – Deep Learning Project",
          description:
            "Developed an advanced recommender system using MF, SVD++, FM, and MLP. Achieved RMSE of 0.758 via ensemble learning over collaborative filtering models.",
          tags: ["PyTorch", "TensorFlow", "Surprise", "Ensemble"],
          category: "ai",
          codeUrl: "https://github.com/inin-zou/MovieRecommendSystem",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
        },
        {
          id: 9,
          title: "Real-Time Data Pipeline – Big Data Project",
          description:
            "Built a real-time data processing pipeline from ingestion to queryable storage. Used Kafka, NiFi, and Hive with Avro + HDFS for big data analytics.",
          tags: ["Kafka", "NiFi", "Hadoop", "Hive"],
          category: "security",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
        },
      ])
      setLoading(false)
      playSound("success")
    }, 1000)
  }, [playSound])

  const handleCategoryClick = (category: string | null) => {
    playSound("click")
    setSelectedCategory(category)
  }

  const handleButtonClick = (e: React.MouseEvent, hasLink: boolean) => {
    if (!hasLink) {
      e.preventDefault()
      playSound("click")
    } else {
      playSound("click")
    }
  }

  const filteredProjects = selectedCategory ? projects.filter((p) => p.category === selectedCategory) : projects

  return (
    <>
      <div className="page-container">
        <h1 className="page-title blinking-cursor">PROJECT DATABASE</h1>
        <p className="page-subtitle">Access granted to classified archives.</p>

        <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === null ? "active" : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            ALL
          </button>
          <button
            className={`category-tab ${selectedCategory === "ai" ? "active" : ""}`}
            onClick={() => handleCategoryClick("ai")}
          >
            AI
          </button>
          <button
            className={`category-tab ${selectedCategory === "games" ? "active" : ""}`}
            onClick={() => handleCategoryClick("games")}
          >
            GAMES
          </button>
          <button
            className={`category-tab ${selectedCategory === "web" ? "active" : ""}`}
            onClick={() => handleCategoryClick("web")}
          >
            WEB
          </button>
          <button
            className={`category-tab ${selectedCategory === "security" ? "active" : ""}`}
            onClick={() => handleCategoryClick("security")}
          >
            SECURITY
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <p className="text-terminal-green mb-4">LOADING PROJECT DATA...</p>
            <div className="audio-visualizer">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="visualizer-bar"
                  style={{
                    height: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className={`project-card ${project.category}`}>
                <h2 className="project-title">{project.title}</h2>

                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-buttons">
                  <a
                    href={project.hasCode ? project.codeUrl : "javascript:void(0)"}
                    className={`project-button ${!project.hasCode ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={(e) => handleButtonClick(e, project.hasCode)}
                    {...(project.hasCode ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Github size={12} />
                    CODE
                  </a>
                  <a
                    href={project.hasDemo ? project.demoUrl : "javascript:void(0)"}
                    className={`project-button-demo ${!project.hasDemo ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={(e) => handleButtonClick(e, project.hasDemo)}
                    {...(project.hasDemo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <ExternalLink size={12} />
                    {project.demoUrl === "Hackathon" ? "HACKATHON" : "DEMO"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingNav />
    </>
  )
}
