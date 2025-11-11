"use client"

import { useState } from "react"
import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"

export default function AboutPage() {
  const { playSound } = useSound()
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({})
  const [cardOrder, setCardOrder] = useState<string[]>([
    "education",
    "work",
    "languages",
    "programming",
    "certifications",
    "skills"
  ])
  const [draggedCard, setDraggedCard] = useState<string | null>(null)

  const toggleSection = (sectionId: string) => {
    playSound('click')
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const handleDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault()
    if (!draggedCard || draggedCard === targetCardId) return

    const newOrder = [...cardOrder]
    const draggedIndex = newOrder.indexOf(draggedCard)
    const targetIndex = newOrder.indexOf(targetCardId)

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedCard)

    setCardOrder(newOrder)
    setDraggedCard(null)
    playSound('click')
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const languages = [
    { name: "Chinese", level: "Native", stars: 5 },
    { name: "English", level: "IELTS 7.0", stars: 4 },
    { name: "French", level: "DALF C2", stars: 5 },
  ]

  const programmingLanguages = [
    "Python",
    "Java",
    "R",
    "SQL",
    "Scala",
    "PySpark",
    "VBA",
    "Go",
    "TypeScript",
    "JavaScript",
    "C#",
    "bash",
  ]

  const certifications = [
    "Machine Learning in Production (Coursera)",
    "Certificate of Excellence in AI Agents (Hugging Face)",
  ]

  const skillCategories = [
    {
      title: "🤖 LLM & AI",
      subcategories: [
        {
          name: "Fine-Tuning",
          skills: ["LoRA/QLORA", "DPO"],
        },
        {
          name: "Model Optimization",
          skills: ["Pruning", "Quantization", "Knowledge Distillation"],
        },
        {
          name: "Generative AI",
          skills: ["Transformers", "Diffusion Models"],
        },
      ],
    },
    {
      title: "⚡ LLM Frameworks",
      skills: ["LangChain", "LangGraph", "LlamaIndex", "SmolAgent", "AutoGen"],
    },
    {
      title: "📊 Data & Visualization",
      subcategories: [
        {
          name: "Visualization",
          skills: ["Tableau", "Power BI", "Matplotlib", "Seaborn"],
        },
        {
          name: "Big Data & ETL",
          skills: ["Hadoop", "NiFi", "Kafka", "Spark", "Airflow", "Talend", "Redis"],
        },
      ],
    },
    {
      title: "🧠 ML Frameworks",
      skills: ["PyTorch", "TensorFlow"],
    },
    {
      title: "🗄️ Databases & Storage",
      skills: ["Qdrant","Weviate","Supabase","ElasticSearch", "PostgreSQL", "MongoDB"],
    },
    {
      title: "☁️ Cloud Platforms",
      subcategories: [
        {
          name: "AWS",
          skills: ["EC2", "S3", "Lambda"],
        },
        {
          name: "GCP",
          skills: ["Vertex AI"],
        },
      ],
    },
    {
      title: "🔧 DevOps",
      skills: ["GitHub Actions", "Docker", "Kubernetes"],
    },
    {
      title: "⚙️ Back-End",
      skills: ["Python", "JavaScript", "TypeScript", "Go"],
    },
    {
      title: "🎨 Front-End",
      skills: ["Next.js", "React.js", "TailwindCSS", "Vue.js", "Three.js"],
    },
  ]

  const renderCard = (cardId: string) => {
    switch (cardId) {
      case "education":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">🎓</span>
                  Education
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('education')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['education'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['education'] && <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">M.S. in Computer Science (2nd Year)</h3>
                    <p className="item-company">Université Paris Dauphine - PSL</p>
                    <p className="item-date">Sept 2023 - Oct 2024</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">M.S. in Computer Science (1st Year)</h3>
                    <p className="item-company">Université Paris-Saclay</p>
                    <p className="item-date">Sept 2022 - Aug 2023</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">B.S. in Computer Science</h3>
                    <p className="item-company">Université Toulouse 1 Capitole</p>
                    <p className="item-date">Sept 2019 - Aug 2022</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">National Chemistry Olympiad of China</h3>
                    <p className="item-company">National Second Prize (Top 5%)</p>
                    <p className="item-date">Nov 2017</p>
                    <ul className="bullet-list">
                      <li>
                        31st China Chemistry Olympiad (CChO), recognized as a prestigious STEM competition nationwide
                      </li>
                    </ul>
                  </div>
                </div>
              </div>}
            </section>
          )
      case "work":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">💼</span>
                  Work Experience
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('work')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['work'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['work'] && <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">AI Engineer</h3>
                    <p className="item-company">Mozart AI, Paris</p>
                    <p className="item-date">Oct 2025 - Present</p>
                    <ul className="bullet-list">
                      <li>Developing an end-to-end agentic workflow for AI music video creation</li>
                      <li>Implementing front-end audio interaction design</li>
                      <li>Contributing to Music AI development</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">AI Engineer</h3>
                    <p className="item-company">Misogi Labs, Paris</p>
                    <p className="item-date">May 2025 - Sept 2025</p>
                    <ul className="bullet-list">
                      <li>Developed multi-agent molecule screening system using PaperQA and LangGraph</li>
                      <li>Integrated biomedical document retrieval with experimental evidence support</li>
                      <li>Coordinated end-to-end AI workflows for drug discovery automation</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">Data Scientist / AI Consultant Intern</h3>
                    <p className="item-company">Société Générale (via Alenia Consulting), Paris</p>
                    <p className="item-date">Apr 2024 - Oct 2024</p>
                    <ul className="bullet-list">
                      <li>Built scalable RAG chatbot with LangChain and ElasticSearch</li>
                      <li>Created custom admin interface with Streamlit for document ingestion</li>
                      <li>Improved retrieval accuracy with hybrid search and retriever agent</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">Data Scientist Intern</h3>
                    <p className="item-company">Smart Gadget Home, Paris</p>
                    <p className="item-date">Jul 2023 - Sept 2023</p>
                    <ul className="bullet-list">
                      <li>Implemented XGBoost and deep learning for inventory optimization</li>
                      <li>Enhanced pricing algorithms resulting in 150% increase in item value sold</li>
                      <li>Developed automated stock accuracy monitoring systems</li>
                    </ul>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-content">
                    <h3 className="item-title">Assistant Financial Analyst Intern</h3>
                    <p className="item-company">CITIC Securities, Beijing</p>
                    <p className="item-date">Jul 2022 - Sept 2022</p>
                    <ul className="bullet-list">
                      <li>Conducted in-depth financial analysis and modeling for over 15 companies</li>
                      <li>
                        Applied Discounted Cash Flow (DCF) model to estimate enterprise value based on stock market data
                        and company fundamentals
                      </li>
                      <li>
                        Delivered over 20 data visualizations of company financial performance using Excel VBA and Power
                        BI
                      </li>
                      <li>
                        Enhanced decision-making processes for senior analysts and supported key investment strategies
                      </li>
                    </ul>
                  </div>
                </div>
              </div>}
            </section>
          )
      case "languages":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">🌍</span>
                  Languages
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('languages')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['languages'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['languages'] && <div className="languages-grid">
                {languages.map((lang, index) => (
                  <div key={index} className="language-item">
                    <div className="language-info">
                      <span className="language-name">{lang.name}</span>
                      <span className="language-level">({lang.level})</span>
                    </div>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < lang.stars ? "filled" : ""}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>}
            </section>
          )
      case "programming":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">💻</span>
                  Programming Languages
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('programming')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['programming'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['programming'] && <div className="skill-tags-container">
                {programmingLanguages.map((lang, index) => (
                  <span key={index} className="skill-tag programming">
                    {lang}
                  </span>
                ))}
              </div>}
            </section>
          )
      case "certifications":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">📜</span>
                  Certifications
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('certifications')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['certifications'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['certifications'] && <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <span className="cert-check">✓</span>
                    <span className="cert-text">{cert}</span>
                  </div>
                ))}
              </div>}
            </section>
          )
      case "skills":
        return (
          <section 
            className="modern-section"
            draggable
            onDragStart={(e) => handleDragStart(e, cardId)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, cardId)}
            onDragEnd={handleDragEnd}
            style={{ cursor: draggedCard === cardId ? 'grabbing' : 'grab' }}
          >
              <div className="section-header">
                <h2 className="section-title">
                  <span className="title-icon">🛠️</span>
                  Technical Skills
                </h2>
                <button 
                  className="minimize-button"
                  onClick={() => toggleSection('skills')}
                  aria-label="Toggle section"
                >
                  {collapsedSections['skills'] ? '▼' : '▲'}
                </button>
              </div>

              {!collapsedSections['skills'] && <div className="skills-grid">
                {skillCategories.map((category, index) => (
                  <div key={index} className="skill-category-card">
                    <h3 className="category-title">{category.title}</h3>

                    {category.subcategories ? (
                      <div className="subcategories">
                        {category.subcategories.map((sub, subIndex) => (
                          <div key={subIndex} className="subcategory">
                            <h4 className="subcategory-title">{sub.name}:</h4>
                            <div className="skill-tags-container">
                              {sub.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="skill-tags-container">
                        {category.skills?.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>}
            </section>
          )
      default:
        return null
    }
  }

  return (
    <>
      <div className="page-container">
        {/* Header */}
        <div className="modern-header">
          <h1 className="modern-title">ABOUT_ME.txt</h1>
          <p className="modern-subtitle">AI Engineer</p>
        </div>

        {/* Drag Hint */}
        <p className="text-cyan-400/60 text-xs mb-6 text-center animate-pulse">💡 Try dragging the cards below to rearrange them</p>

        {/* Main Content Grid */}
        <div className="modern-content-grid">
          {cardOrder.map(cardId => (
            <div key={cardId}>{renderCard(cardId)}</div>
          ))}
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
