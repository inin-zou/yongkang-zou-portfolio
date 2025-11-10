"use client"

import FloatingNav from "@/components/floating-nav"
import { useSound } from "@/components/sound-provider"

export default function AboutPage() {
  const { playSound } = useSound()

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

  return (
    <>
      <div className="modern-page-container">
        {/* Header */}
        <div className="modern-header">
          <h1 className="modern-title">ABOUT_ME.txt</h1>
          <p className="modern-subtitle">AI Engineer</p>
        </div>

        {/* Main Content Grid */}
        <div className="modern-content-grid">
          {/* Left Column - Experience */}
          <div className="modern-column">
            {/* Education Section */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">🎓</span>
                Education
              </h2>

              <div className="timeline">
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
              </div>
            </section>

            {/* Work Experience Section */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">💼</span>
                Work Experience
              </h2>

              <div className="timeline">
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
              </div>
            </section>
          </div>

          {/* Right Column - Skills */}
          <div className="modern-column">
            {/* Languages Section */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">🌍</span>
                Languages
              </h2>

              <div className="languages-grid">
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
              </div>
            </section>

            {/* Programming Languages */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">💻</span>
                Programming Languages
              </h2>

              <div className="skill-tags-container">
                {programmingLanguages.map((lang, index) => (
                  <span key={index} className="skill-tag programming">
                    {lang}
                  </span>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">📜</span>
                Certifications
              </h2>

              <div className="certifications-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <span className="cert-check">✓</span>
                    <span className="cert-text">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Skills Grid */}
            <section className="modern-section">
              <h2 className="section-title">
                <span className="title-icon">🛠️</span>
                Technical Skills
              </h2>

              <div className="skills-grid">
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
              </div>
            </section>
          </div>
        </div>
      </div>

      <FloatingNav />
    </>
  )
}
