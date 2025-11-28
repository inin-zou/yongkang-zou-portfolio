"use client"

import type React from "react"

import { useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import FloatingNav from "@/components/floating-nav"
import ProjectChatbot from "@/components/project-chatbot"
import { useSound } from "@/components/sound-provider"
import SpotlightCard from "@/components/SpotlightCard"
import DescriptionCarousel from "@/components/DescriptionCarousel"
import Spline from '@splinetool/react-spline'

interface Project {
  id: number
  title: string
  description: string
  descriptionPages?: string[] // Optional: multiple pages for long descriptions
  tags: string[]
  category: "hackathon" | "industry" | "academic" | "side"
  codeUrl: string
  demoUrl: string
  hasCode: boolean
  hasDemo: boolean
  date: string // Format: YYYY-MM
  isFavorite?: boolean // Mark as favorite/featured project
}

export default function ProjectsPage() {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFavoriteOnly, setShowFavoriteOnly] = useState(false)
  const { playSound } = useSound()

  const projects: Project[] = [
        {
          id: 1,
          title: "🥈 OnTrack – Multi-Agent Study Planner",
          description:
            "Hackathon-winning agentic AI system for personalized university admission guidance using LangChain and OpenSearch.",
          descriptionPages: [
            "🏆 Hackathon-winning agentic AI system that secured 2nd place with innovative multi-agent architecture.",
            "🎯 Provides personalized university admission guidance by analyzing student profiles, academic performance, and career aspirations.",
            "🤖 Built with LangChain for orchestrating AI agents, OpenSearch for semantic search, and Claude 3.7 for natural language understanding.",
            "☁️ Deployed on AWS infrastructure with scalable backend services and efficient data processing pipelines."
          ],
          tags: ["LangChain", "OpenSearch", "Claude 3.7", "Python", "AWS"],
          category: "hackathon",
          codeUrl: "https://github.com/inin-zou/ON-TRACKS-AI-Agents-Hackathon-",
          demoUrl: "https://devpost.com/software/on-tracks",
          hasCode: true,
          hasDemo: true,
          date: "2025-04",
        },
        {
          id: 2,
          title: "Make Debates Great Again",
          description: "Unity3D-based political debate game with AI candidates and emotion-driven dialogue systems.",
          tags: ["Unity", "Mistral", "ElevenLabs", "C#", "Hugging Face"],
          category: "hackathon",
          codeUrl: "#",
          demoUrl: "https://huggingface.co/spaces/Mistral-AI-Game-Jam/Team15",
          hasCode: false,
          hasDemo: true,
          date: "2025-01",
        },
        {
          id: 3,
          title: "🏆 ZenQ – Quantum ML Framework",
          description: "Winner at 1st phrase of Perceval Challenge, Quantum CNN using Perceval to enhance photonic computation via HW-preserving architecture.",
          tags: ["Quantum ML", "QCNN", "Perceval", "PyTorch", "Python"],
          category: "hackathon",
          codeUrl: "https://github.com/inin-zou/ZenQ",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2024-01",
        },
        {
          id: 4,
          title: "Cyberpunk Portfolio Interface",
          description: "Retro cyberpunk pixel-art portfolio website with authentic 90s arcade game aesthetics.",
          tags: ["React", "Next.js", "CSS3", "TypeScript", "Web Audio"],
          category: "side",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
          date: "2025-11",
        },
        {
          id: 5,
          title: "Agentic Deployment System",
          description: "CI/CD automation with LLM agents using LangChain and enterprise LLMaaS integration.",
          tags: ["DevOps", "LangChain", "RAG", "GitHub Actions", "Docker"],
          category: "industry",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
          date: "2024-09",
        },
        {
          id: 6,
          title: "MealMate – AI Edge Hackathon Project",
          description:
            "Transform leftover food in a refrigerator into intelligent recipe recommendations using YOLOv5 and a dual-mode RAG system. Includes online and offline modes for personalized meal planning and food waste reduction.",
          descriptionPages: [
            "🍽️ AI-powered system that transforms leftover ingredients into delicious recipe recommendations, reducing food waste.",
            "📸 Uses YOLOv5 for real-time food detection and identification from refrigerator images.",
            "🧠 Dual-mode RAG system: online mode with cloud-based Meta Llama for rich recommendations, offline mode for privacy-focused users.",
            "💾 PostgreSQL vector database stores recipe embeddings for fast semantic search and personalized meal planning."
          ],
          tags: ["YOLOv5", "Meta Llama", "PostgreSQL", "RAG"],
          category: "hackathon",
          codeUrl: "https://github.com/Lucine1998/Recipe-Recommandation",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2024-10",
        },
        {
          id: 7,
          title: "Flappy Bird – Reinforcement Learning Project",
          description:
            "Trained an AI agent to play Flappy Bird using NEAT algorithm and Pygame mechanics. Visualized evolution of performance and fitness during training.",
          tags: ["NEAT", "Pygame", "Evolutionary Algorithms"],
          category: "academic",
          codeUrl: "https://github.com/inin-zou/FlappyBird-ReinforcementLearning",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2024-09",
        },
        {
          id: 8,
          title: "Movie Recommendation System – Deep Learning Project",
          description:
            "Developed an advanced recommender system using MF, SVD++, FM, and MLP. Achieved RMSE of 0.758 via ensemble learning over collaborative filtering models.",
          tags: ["PyTorch", "TensorFlow", "Surprise", "Ensemble"],
          category: "academic",
          codeUrl: "https://github.com/inin-zou/MovieRecommendSystem",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2024-12",
        },
        {
          id: 9,
          title: "Real-Time Data Pipeline – Big Data Project",
          description:
            "Built a real-time data processing pipeline from ingestion to queryable storage. Used Kafka, NiFi, and Hive with Avro + HDFS for big data analytics.",
          descriptionPages: [
            "⚡ Enterprise-grade real-time data processing pipeline handling massive data streams from ingestion to queryable storage.",
            "📊 Apache Kafka manages high-throughput message queues, NiFi orchestrates data flow with visual pipeline design.",
            "🗄️ Avro serialization ensures efficient data compression and schema evolution in HDFS distributed storage.",
            "🔍 Apache Hive provides SQL-like querying capabilities for big data analytics on petabyte-scale datasets."
          ],
          tags: ["Kafka", "NiFi", "Hadoop", "Hive"],
          category: "academic",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
          date: "2023-12",
        },
        {
          id: 10,
          title: "Wiggly – AI-Powered 3D Interactive Animation Design Platform",
          description:
            "Big Berlin Hackathon project, transforms user-uploaded images into 3D models",
          descriptionPages: [
            "🎨 AI-powered platform transforming 2D images into seamless 3D textures and auto-generated T-shirt models.",
            "⚡ Modal serverless execution achieves ~30-60s texture generation and ~10-20s model building with scalable performance.",
            "🔧 FastAPI backend orchestrates Blender rendering pipeline with Weaviate vector search for design recommendations.",
            "🌐 Three.js WebGL renderer provides interactive 3D preview with real-time texture mapping and material controls."
          ],
          tags: ["Next.js", "TypeScript", "Three.js", "FastAPI", "Blender", "Modal", "Weaviate"],
          category: "hackathon",
          codeUrl: "https://github.com/Konsequanzheng/wiggle",
          demoUrl: "https://www.youtube.com/watch?v=dTwpdjv4w4k",
          hasCode: true,
          hasDemo: true,
          date: "2025-10",
        },
        {
          id: 11,
          title: "🥇 Eyed Search Omni Mode – Deep Research Platform",
          description:
            "1st place winner at EF x Anthropic Build Retreat, an optimized Deep Research Platform.",
          descriptionPages: [
            "🏆 1st place winner at EF x Anthropic Build Retreat - optimized deep research platform with self-developed Language Diffusion Model.",
            "⚡ Reduced end-to-end research latency from 15-45 minutes to 3-5 minutes through query generation acceleration.",
            "🔍 Intelligent crawling and scraping system with advanced parsing for multi-source knowledge aggregation.",
            "🤖 Anthropic Claude integration enables fast synthesis and comprehensive answer generation from research data."
          ],
          tags: ["TypeScript", "Anthropic Claude", "Search Engine", "LDM", "Deep Search API"],
          category: "hackathon",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
          date: "2025-11",
        },
        {
          id: 12,
          title: "🥉 Le Scribe Royal – Personalized Guide at Versailles",
          description:
            "3rd prize winner at Versailles Hackathon, multimodal agentic AI for personal guide tour in Versailles.",
          descriptionPages: [
            "🥉 3rd prize winner at Versailles Hackathon - voice-first conversational guide with persistent session memory.",
            "📚 Faceted RAG system grounded in Château's official knowledge base with intelligent query routing (>90% accuracy).",
            "🌐 Real-time API fusion: Google Maps/Places for navigation, Weather for conditions, live schedule and crowd data.",
            "⚡ Ultra-fast response times: 1-2 seconds for simple queries, 3-5 seconds for complex multi-source answers."
          ],
          tags: ["RAG", "Voice UI", "Query Planner", "Real-time APIs", "Accessibility"],
          category: "hackathon",
          codeUrl: "https://github.com/dorianlagadec/hackathoh-versailles",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2025-10",
        },
        {
          id: 13,
          title: "🏆 GitBeat – Community Vote Winner",
          description:
            "Community Vote Winner at {Tech:Europe} Paris Hackathon: a web app for GitRepo-To-Music Service.",
          descriptionPages: [
            "🏆 Community Vote Winner at Tech:Europe Paris Hackathon - transforms GitHub repos into unique AI-generated music.",
            "🎵 Suno AI generates beats from repository structure, contributor patterns, and development activity analysis.",
            "🤖 Multi-AI orchestration: Dust.tt for analysis, OpenAI Agent via GitHub MCP for code understanding.",
            "📊 Interactive leaderboard with real-time upvotes, rankings, inline playback, persisted in Supabase PostgreSQL."
          ],
          tags: ["AI Music", "GitHub API", "Suno AI", "Next.js 15", "Supabase", "Leaderboard"],
          category: "hackathon",
          codeUrl: "https://github.com/imbjdd/gitbeat",
          demoUrl: "https://gitbeat.vercel.app/",
          hasCode: true,
          hasDemo: true,
          date: "2025-09",
        },
        {
          id: 14,
          title: "Musixtral – AI-Powered Music Production Suite",
          description:
            "Mistral AI MCP Hackathon project, built two MCP servers to enable Le Chat (Mistral AI) to call professional music tools via MCP for end-to-end AI-assisted production.",
          descriptionPages: [
            "🎼 AI-powered music production suite with dual MCP servers for Mistral AI Le Chat integration.",
            "🎵 MusicToolkit: audio-to-score transcription, humming-to-track generation, SVG score rendering via Verovio.",
            "🎚️ OpenDAW: professional DAW features including multi-track audio/MIDI, real-time streaming, project management.",
            "☁️ End-to-end AI-assisted production workflow with WAV/MIDI/MusicXML support, deployed on Vercel with AWS S3."
          ],
          tags: ["MCP", "Mistral AI", "Music Production", "DAW", "AI Tools", "Vercel"],
          category: "hackathon",
          codeUrl: "https://github.com/inin-zou/Musixtral",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2025-09",
          isFavorite: true,
        },
        {
          id: 15,
          title: "BuzzLab – AI-Powered Brand Creation Platform",
          description:
            "Hack-Nation Hackathon project. Built a multi-agent content pipeline for an end-to-end video ads workflow",
          descriptionPages: [
            "🎬 Multi-agent content pipeline (CAMEL-AI) with intelligent Orchestrator routing for automated brand video creation.",
            "🔄 End-to-end workflow: product research → script generation → multi-modal assets → Remotion editing → publish.",
            "🤖 Advanced processing: Playwright scraping, PDF/image OCR, LLM-grounded analysis with Gemini for content intelligence.",
            "🎨 Integrated AI services: FAL for media generation, ElevenLabs TTS, Perplexity/xAI Grok for deep research."
          ],
          tags: ["Multi-Agent", "CAMEL-AI", "Video Generation", "Next.js 15", "FastAPI", "AI Content"],
          category: "hackathon",
          codeUrl: "https://github.com/inin-zou/BuzzLab",
          demoUrl: "#",
          hasCode: true,
          hasDemo: false,
          date: "2025-09",
          isFavorite: true,
        },
        {
          id: 16,
          title: "🥉 Serve the Vibe – 3rd Place Winner",
          description:
            "3rd place winner among 900+ participants (solo) at Raise Summit Hackathon. Built a Vibe-Coding Solution for Strudel.",
          descriptionPages: [
            "🥉 3rd place winner among 900+ participants (solo) at Raise Summit Hackathon - Vibe-Coding solution for Strudel.",
            "🎵 Intelligent mapping engine converts vibe descriptors (chill, upbeat, dark, dreamy) into playable musical code.",
            "🎹 Multi-track generation system: drums, bass, chords, lead with reusable patterns for rapid live-coding vibe switches.",
            "⚡ Enhanced live performance workflow by standardizing vibe parameters and reducing manual pattern crafting."
          ],
          tags: ["Live Coding", "Music Generation", "Strudel", "Creative Coding", "Performance"],
          category: "hackathon",
          codeUrl: "#",
          demoUrl: "https://serve-the-vibe.vercel.app/",
          hasCode: false,
          hasDemo: true,
          date: "2025-08",
          isFavorite: true,
        },
        {
          id: 17,
          title: "HealthOdyssey",
          description: "Built a real-time dashboard that tracks French meat-product recalls and environmental indicators.",
          tags: ["AI", "ML", "Web Dashboard", "AutoML", "Flask", "Hackathon"],
          category: "hackathon",
          codeUrl: "https://github.com/inin-zou/HealthOdyssey",
          demoUrl: "",
          hasCode: true,
          hasDemo: false,
          date: "2025-04",
        },
        {
          id: 18,
          title: "🥇 EmoHunter – 1st Place Winner ($50K Prize)",
          description:
            "1st place winner among 90+ projects at Pond Hackathon, securing $50K funding and the Future Startup Prize. Developed an iOS Apple Watch app with a proactive AI voice agent for mental health support.",
          descriptionPages: [
            "🥇 1st place winner among 90+ projects at Pond Hackathon - secured $50K funding and Future Startup Prize.",
            "⌚ iOS Apple Watch app with proactive AI voice agent for real-time emotional well-being support.",
            "📊 Analyzes biometric data and applies psychological-expert knowledge to address emotional needs.",
            "🤖 Multi-agent system enables sophisticated emotional context with humanized, empathetic voice conversations."
          ],
          tags: ["iOS", "Apple Watch", "AI Voice Agent", "Biometric Data", "Multi-Agent", "Mental Health"],
          category: "hackathon",
          codeUrl: "#",
          demoUrl: "https://cryptopond.xyz/arena/gallery/detail/fed26206-e11f-4c6b-86d4-c37896520e88",
          hasCode: false,
          hasDemo: true,
          date: "2025-08",
          isFavorite: true,
        },
        {
          id: 19,
          title: "LyricMind – Fine-tuned Qwen2.5-7B Lyric Generation System",
          description:
            "AI lyric-writing model via QLoRA and RLAIF-DPO, fine-tuned from Qwen2.5-7B to generate high-quality lyrics.",
          descriptionPages: [
            "🎵 Developed an AI lyric-writing model via QLoRA and RLAIF-DPO, fine-tuned from Qwen2.5-7B to generate high-quality lyrics with natural rhyme, emotion alignment, and theme consistency.",
            "📊 Collected and processed 30K+ songs (~10-12M tokens) for SFT training; leveraged Nebius A100 40GB GPU (~12h total, ~$36) for efficient single-card training.",
            "🎯 Designed a hybrid Reward Function combining AI feedback, Rhyme Scorer, and Emotion Analyzer for automated preference scoring; integrated into DPO fine-tuning to bias the model toward musically pleasing outputs.",
            "🔄 Implemented a self-improving post-training stage with Self-Consistency and Self-Reward mechanisms—model auto-generates, evaluates, and re-trains on its best samples without new datasets.",
            // "📈 Achieved +24% rhyme naturalness and +19% emotion coherence compared to the SFT baseline; lyrics show improved flow, sentiment stability, and stylistic diversity (pop, rap, classical).",
            "🚀 Delivered full training pipeline on LLaMA Factory, including SFT, DPO, and self-evolution scripts, compatible with both API and local fine-tuning workflows."
          ],
          tags: ["Qwen2.5-7B", "QLoRA", "RLAIF-DPO", "LLaMA Factory", "Nebius", "Python"],
          category: "side",
          codeUrl: "#",
          demoUrl: "#",
          hasCode: false,
          hasDemo: false,
          date: "2025-10",
          isFavorite: true,
        }
  ]

  const handleCategoryClick = (category: string | null) => {
    playSound("click")
    setSelectedCategory(category)
    // Reset favorite filter when clicking ALL or changing category
    if (category === null || category !== selectedCategory) {
      setShowFavoriteOnly(false)
    }
  }

  const handleFavoriteClick = () => {
    playSound("click")
    setShowFavoriteOnly(!showFavoriteOnly)
  }

  const handleButtonClick = (e: React.MouseEvent, hasLink: boolean) => {
    if (!hasLink) {
      e.preventDefault()
      playSound("click")
    } else {
      playSound("click")
    }
  }

  const filteredProjects = projects
    .filter((p) => {
      // Filter by category if selected
      const categoryMatch = selectedCategory ? p.category === selectedCategory : true
      // Filter by favorite if enabled
      const favoriteMatch = showFavoriteOnly ? p.isFavorite === true : true
      return categoryMatch && favoriteMatch
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <div className="monitor-scroll-area">
        <div className="page-container projects-page-with-chatbot">
          <h1 className="page-title blinking-cursor">PROJECT DATABASE</h1>
          <p className="page-subtitle">Access granted to classified archives.</p>

          <div className="category-tabs">
          <button
            className={`category-tab ${selectedCategory === null && !showFavoriteOnly ? "active" : ""}`}
            onClick={() => handleCategoryClick(null)}
          >
            ALL
          </button>
          <button
            className={`category-tab ${showFavoriteOnly ? "active" : ""}`}
            onClick={handleFavoriteClick}
          >
            ⭐ FAVORITE
          </button>
          <button
            className={`category-tab ${selectedCategory === "hackathon" ? "active" : ""}`}
            onClick={() => handleCategoryClick("hackathon")}
          >
            HACKATHON
          </button>
          <button
            className={`category-tab ${selectedCategory === "industry" ? "active" : ""}`}
            onClick={() => handleCategoryClick("industry")}
          >
            INDUSTRY
          </button>
          <button
            className={`category-tab ${selectedCategory === "academic" ? "active" : ""}`}
            onClick={() => handleCategoryClick("academic")}
          >
            ACADEMIC
          </button>
          <button
            className={`category-tab ${selectedCategory === "side" ? "active" : ""}`}
            onClick={() => handleCategoryClick("side")}
          >
            SIDE
          </button>
        </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => {
              const pages = [
                // Page 1: Title + Tech Stack + Short Description
                <div key="page-1" className="carousel-page">
                  <h2 className="project-title">
                    {project.isFavorite && <span className="favorite-icon">⭐</span>}
                    {project.title}
                  </h2>
                  <div className="project-date">{project.date}</div>
                  <div className="project-tags">
                    {project.isFavorite && (
                      <span className="project-tag favorite-tag">
                        FAVORITE
                      </span>
                    )}
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>,
                // Page 2+: Features (if descriptionPages exists, split into pages of 2 features each)
                ...(project.descriptionPages && project.descriptionPages.length > 0
                  ? (() => {
                      const featuresPerPage = 2;
                      const totalPages = Math.ceil(project.descriptionPages.length / featuresPerPage);
                      const featurePages = [];
                      
                      for (let i = 0; i < totalPages; i++) {
                        const startIdx = i * featuresPerPage;
                        const endIdx = Math.min(startIdx + featuresPerPage, project.descriptionPages.length);
                        const featuresForThisPage = project.descriptionPages.slice(startIdx, endIdx);
                        
                        featurePages.push(
                          <div key={`page-features-${i}`} className="carousel-page">
                            <div className="project-title">
                              {project.isFavorite && <span className="favorite-icon">⭐</span>}
                              {project.title}
                            </div>
                            <div className="project-date">{project.date}</div>
                            <div className="project-tags">
                              {project.isFavorite && (
                                <span className="project-tag favorite-tag">
                                  FAVORITE
                                </span>
                              )}
                              {project.tags.map((tag, index) => (
                                <span key={index} className="project-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="features-title">✨ Key Features ({i + 1}/{totalPages}):</div>
                            <ul className="features-list">
                              {featuresForThisPage.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      }
                      
                      return featurePages;
                    })()
                  : []),
                // Page 3: Links
                <div key="page-3" className="carousel-page links-page">
                  <div className="project-title">
                    {project.isFavorite && <span className="favorite-icon">⭐</span>}
                    {project.title}
                  </div>
                  <div className="project-date">{project.date}</div>
                  <div className="project-tags">
                    {project.isFavorite && (
                      <span className="project-tag favorite-tag">
                        FAVORITE
                      </span>
                    )}
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="links-title">🔗 Project Links</div>
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
              ];

              return (
                <SpotlightCard 
                  key={project.id} 
                  className={`project-card ${project.category}`}
                  spotlightColor="rgba(0, 229, 255, 0.2)"
                >
                  <DescriptionCarousel 
                    pages={pages}
                    autoplay={true}
                    autoplayDelay={5000}
                  />
                </SpotlightCard>
              );
            })}
          </div>
      </div>
      </div>

      <ProjectChatbot />

       <div 
         className="spline-container"
         style={{
           position: 'fixed',
           bottom: '50vh',
           left: '65vw', /* Robot is at bottom-left of spline scene, so we start scene at 50% width */
           right: '0',
           width: '100vw',
           height: '90vh',
           zIndex: 1,
           overflow: 'visible',
           pointerEvents: 'auto',
         }}
       >
         <div 
           className="spline-wrapper"
           style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             opacity: 0.9,
             filter: 'drop-shadow(0 0 40px #00ffff80)',
             pointerEvents: 'auto'
           }}>
           <Spline 
             scene="/cute_computer.splinecode"
             onLoad={() => console.log('Spline model loaded!')}
           />
         </div>
       </div>

      <FloatingNav />
    </>
  )
}
