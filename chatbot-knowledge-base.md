# Chatbot Knowledge Base

> 本文件用于存储 chatbot 的知识库内容，将通过 prompting 方式传入每次对话。

---

# **Yongkang ZOU**

+33 07 64 22 81 33 • [yongkang.zou1999@gmail.com](mailto:yongkang.zou1999@gmail.com)  
[linkedin.com/in/yongkang-zou](https://linkedin.com/in/yongkang-zou) • [github.com/inin-zou](https://github.com/inin-zou)  
Portfolio: https://yongkang-zou-portfolio.vercel.app

AI Engineer, 8× Hackathon Winner, Actively seeking a position as AI Engineer.

---

## Experience

### **Mozart AI (Paris) | AI Engineer**  
**Oct 2025 – Present**
- Built an end-to-end agentic workflow for AI music video creation, from prompt intake to rendered output.
- Implemented front-end audio interaction design to enable seamless, responsive user experiences.
- Contributed to Music AI development, improving model tooling and production integration.

### **Misogi Labs (Paris) | AI Engineer**  
**May 2025 – Sept 2025**
- Developed an intelligent multi-agent system to automate and accelerate candidate molecule screening, integrating PaperQA, LangGraph, and generative models tailored for computational chemistry.
- Integrated a scientific research agent (PaperQA) capable of leveraging biomedical corpora to provide relevant experimental evidence on molecular targets and active structures.
- Coordinated end-to-end workflows and validated use cases to prepare future integration into an AI-driven industrial drug discovery pipeline.

### **Alenia Consulting, Société Générale (Paris) | Data Scientist / AI Consultant Intern**  
**Apr 2024 – Oct 2024**
- Developed a scalable LLM-based chatbot using Retrieval-Augmented Generation (RAG) with LangChain, integrating 400+ documents to enhance inter-departmental knowledge sharing.
- Implemented seamless document ingestion from internal SG websites and GitHub into an ElasticSearch database via web scraping and managed through a Streamlit admin panel.
- Designed an advanced retriever agent and hybrid search strategy to improve retrieval accuracy and efficiency.

### **Smart Gadget Home (Paris) | Data Scientist Intern**  
**Jul 2023 – Sept 2023**
- Analyzed summer sales and optimized inventory using XGBoost and deep learning, managing a database of 10,000+ products.
- Conducted inventory analysis and developed pricing strategies based on competitor data, resulting in a 150% increase in the value of items sold vs. previous year.

### **CITIC Securities (Beijing, China) | Assistant Financial Analyst Intern**  
**Jul 2022 – Sept 2022**
- Conducted in-depth financial analysis and modeling for 15+ companies, applying DCF to estimate enterprise value from market data and fundamentals.
- Delivered 20+ financial performance visualizations with Excel VBA and Power BI to support senior analysts’ decisions.

---

## Project Experience

### **LyricMind | Fine-tuned Qwen2.5-7B Lyric Generation System**
**Oct 2025**
- Built an AI lyric-writing system fine-tuned from Qwen2.5-7B using QLoRA + RLAIF-DPO, producing high-quality lyrics with natural rhyme, emotional alignment, and consistent themes.
- Collected & processed 30K+ songs (~10–12M tokens) for SFT; trained efficiently on Nebius A100 40GB (~12h, ~$36) with a single-GPU pipeline.
- Designed a hybrid Reward Function combining AI feedback, a custom Rhyme Scorer, and Emotion Analyzer to drive DPO preference optimization toward musically pleasing outputs.
- Implemented a self-improving post-training loop with Self-Consistency + Self-Reward sampling, enabling the model to auto-generate, evaluate, and refine its own best outputs without external data.
- Achieved +24% rhyme naturalness and +19% emotion coherence over the SFT baseline; generated lyrics show stronger flow, sentiment stability, and stylistic diversity (pop, rap, classical).
- Delivered a complete LLaMA Factory training pipeline (SFT, DPO, self-evolution) with scripts compatible with both API-based and local fine-tuning workflows.

### **Wiggly | AI-Powered 3D Interactive Animation Design Platform, Big Berlin Hackathon**  
**Oct 2025**
- Built a platform that turns user-uploaded front/back images into **seamless textures** and auto-generated **3D T-shirt models**, rendered interactively in the browser.
- Architected a cloud-native pipeline on **Modal** with **FastAPI** services, **Blender** for 3D modeling/texture application, and **Weaviate** for vector storage; supports direct API and **n8n** workflow integration.
- Delivered a Next.js 14 + TypeScript + Tailwind + **Three.js** frontend for real-time previews; responsive UI for desktop and mobile.
- Exposed production endpoints: `POST /api/texture/generate`, `GET /api/model/download/{id}`, `GET /api/texture/download/{id}`, `/health`; provided n8n automation (`n8n_workflow.json`).
- Achieved fast throughput on Modal (~30–60s texture generation; ~10–20s model build); scalable concurrency via serverless execution.
- Shipped DX tooling and docs (env setup, CLI deploy, local dev), plus end-to-end tests and example cURL flows.
- Video Demo: https://www.youtube.com/watch?v=dTwpdjv4w4k • Project: https://github.com/Konsequanzheng/wiggle

### **Eyed Search Omni Mode | 1st Place Winner – EF x Anthropic Build Retreat**  
**Oct 2025**
- Won **1st place** at the **EF x Anthropic Build Retreat**.
- Built an optimized in-house search engine (`search.eyed.to`) and a self-developed **Language Diffusion Model** to overhaul the deep-research stack.
- Cut research latency from **15–45 min** to **3–5 min** via faster query generation, smarter crawling/scraping, and rapid synthesis.
- Shipped a production **Deep Search API** with job-based polling: `POST /v1/api/deepsearch` → `GET /v1/api/deepsearch/status/:id`; live at `https://eyed-search.vercel.app`.
- Implemented clear status orchestration (`not_started` → `queries_generation` → `searching` → `scraping` → `final_touch` → `done`) with real-time UI hooks.
- Delivered a minimal TypeScript frontend SDK and UI patterns; documented typical 35s demo timeline.
- Exposed health/utility endpoints (`/health`, `/v1/api/render-pdf`) and validated core routes in production.

### **Le Scribe Royal | 3rd Prize at Versailles Hackathon**  
**Oct 2025**
- Won 3rd prize at the Versailles Hackathon.
- Designed a voice-first conversational UI with persistent session memory; hands-free navigation and Q&A for families and accessibility.
- Built a faceted RAG grounded in the Château’s official knowledge base, fused with real-time APIs (Google Maps/Places, Weather, live schedule/crowd) using authority-weighted scoring and conflict resolution.
- Implemented a rule-based Query Planner with pattern routing (regex + LLM entities) and Dual RAG (PDF + JSON).
- Generated dynamic, accessibility-first itineraries with route segmentation; auto-adjusts plans to weather/affluence and profiles.
- Achieved fast responses (1–2s simple; 3–5s complex), >90% routing accuracy, and an 8.5/10 internal score; multilingual keywords (EN/FR/ZH).  
- Project: https://github.com/dorianlagadec/hackathoh-versailles

### **GitBeat | Community Vote Winner, Tech:Europe Paris Hackathon**  
**Sept 2025**
- Built a web app that analyzes GitHub repos (contributors, languages, project health) and uses **Suno AI** to generate beats from repo structure & dev patterns.
- Implemented an interactive **leaderboard** with real-time upvotes/rankings and inline playback; added AI-generated contributor personality insights.
- Orchestrated AI services: Dust.tt for repo analysis, an **OpenAI Agent** via GitHub MCP, and Suno AI for music.
- Delivered a Next.js 15 (React 19, TypeScript) frontend with Tailwind + shadcn/ui; persisted songs/votes/analysis in **Supabase (PostgreSQL)**.
- Mobile-friendly UI with responsive design and animated ranking changes.
- Live Demo: https://gitbeat.vercel.app/ • Repo: https://github.com/imbjdd/gitbeat

### **Musixtral | Mistral AI MCP Hackathon — AI-Powered Music Production Suite**  
**Sept 2025**
- Built two complementary MCP servers — **MusicToolkit** (audio → score, humming → full track, SVG score via Verovio) and **OpenDAW** (DAW features, multi-track audio/MIDI, streaming, project management).
- Enabled **Le Chat (Mistral AI)** to call pro music tools via MCP (`initialize`, `tools/list`, `tools/call`, `resources/list`, `prompts/list`) for end-to-end AI-assisted production.
- Cloud deployments on Vercel with AWS S3 persistence; provided local & Docker setups.
- Integrated **Mistral**, **MusicGen**, **basic-pitch**, **music21**, **Verovio** for WAV/MIDI/MusicXML workflows and SVG score visualization.  
- Project: https://github.com/inin-zou/Musixtral

### **BuzzLab | AI-Powered Brand Creation Platform**  
**Sept 2025**
- Built a **multi-agent** content pipeline (CAMEL-AI) with an Orchestrator routing to WebScraperAgent, FileProcessingAgent, and GuidedQuestionAgent; supports URLs, file uploads, and guided setup.
- Delivered an **end-to-end video ads workflow**: product research → script → multimodal assets (images/video/audio/voiceover) → Remotion editing → publish.
- Implemented intelligent processing: Playwright scraping, PDF/image OCR, and LLM-grounded analysis (Gemini); integrated FAL for media generation, ElevenLabs for TTS, and Perplexity/xAI Grok for research.
- Exposed a clean FastAPI surface with agentic endpoints (`/api/agentic/website`, `/files`, `/guided`, `/generate-content`, `/research`); added health checks and interactive docs.
- Frontend: Next.js 15 (TypeScript, Tailwind, Framer Motion); Backend: Python (FastAPI), async orchestration, Docker-optional reproducible dev.
- Hardened ops: env-based config, retries/rate-limit handling, temp cleanup, and agentic unit/integration tests.  
- Project: https://github.com/inin-zou/BuzzLab

### **Serve the Vibe | 3rd Place Winner, Raise Summit Hackathon**  
**Aug 2025**
- Won 3rd place among 900+ participants (solo).
- Built a Vibe-Coding solution for Strudel, mapping vibe descriptors (e.g., _chill, upbeat, dark, dreamy_) into playable code: tempo, scale/mode, chord loops, drum density/swing, and FX chains.
- Implemented multi-track generation (drums/bass/chords/lead) with reusable patterns for rapid live-coding switches.
- Project: https://serve-the-vibe.vercel.app/

### **EmoHunter | 1st Place Winner, Pond Hackathon – $50K Prize**  
**Aug 2025**
- Developed an iOS Apple Watch app with a proactive AI voice agent that analyzes biometric data and applies expert knowledge for real-time emotional well-being.
- Leveraged a multi-agent system to enable empathetic voice conversations.
- Won 1st place among 90+ projects; secured $50K funding and the Future Startup Prize.  
- Project: https://cryptopond.xyz/arena/gallery/detail/fed26206-e11f-4c6b-86d4-c37896520e88

### **Serve the Vibe | AI Music Jamming Buddy – Gradio MCP + Hugging Face Spaces**  
**Jun 2025 – Present**
- Built a multimodal music ideation pipeline: hum + text prompt → demo audio, with automatic audio→MIDI conversion and engraved score generation.
- Orchestrated a tool-driven, agentic workflow (melody extraction, MIDI synthesis, score rendering, cover/title suggester).
- Delivered a clean web MVP in Gradio MCP, packaged for Hugging Face Spaces; one-click export bundles audio, MIDI, score, and cover.
- Added style controls (tempo/energy/mood tags) for consistent, human-in-the-loop arrangement refinement.
- Tech: Python, Gradio MCP, signal processing, MIDI engraving toolchain, lightweight recommender heuristics.

### **OnTrack | 2nd Place Winner, From LLM to Agentic AI Hackathon (AWS, LangChain, OpenSearch)**  
**Apr 2025**
- Designed an app to help high-school students plan academic paths with personalized guidance and tracking.
- Built a multi-agent system with LangChain, integrating Claude 3.7 Sonnet (via AWS Bedrock), real-time retrieval via DuckDuckGo, and RAG using AWS OpenSearch Serverless.
- Project: https://github.com/inin-zou/ON-TRACKS-AI-Agents-Hackathon-

### **HealthOdyssey | Food Safety–Driven Public Health Forecasting, AI Action Hackathon**  
**Apr 2025**
- Built a dashboard tracking French meat-product recalls & environmental indicators, surfacing a **National Meat Safety Index** and recall records.
- Implemented a **One Health** pipeline (animal/food recalls, environment: UHII, CO₂; human outcomes) to forecast regional health impact (e.g., `total_CS`).
- Trained a **TPOT AutoML** regressor (RepeatedKFold CV) to predict `total_CS` from `region`, `year`, `count_risk`, `UHII`, `CO2`; exported artifacts for live inference.
- Shipped an interactive **Predictive Model (beta)** UI with on-the-fly forecasts and constraint checks.
- Automated ingestion from `rappel.conso.gouv.fr` via `getNews.py`; structured CSVs feed training & dashboard.
- Reproducible stack (Flask/FastAPI, TPOT/xgboost, notebooks) with clear env and run scripts.  
- Project: https://github.com/inin-zou/HealthOdyssey

### **Make Debates Great Again | Mistral AI Game Jam (Unity3D, C#, ElevenLabs, HF Spaces)**  
**Jan 2025**
- Built an interactive/humorous political debate game in Unity3D; players provoke AI candidates while balancing chaos/control.
- Agent-based system with LangChain + Mistral 7B for credible responses and anger-level scoring; ElevenLabs TTS for talk-show ambiance.
- Hosted on Scaleway and integrated with Hugging Face Spaces.  
- Game: https://huggingface.co/spaces/Mistral-AI-Game-Jam/Team15

### **ZenQ | Winner of Phase 1, Perceval Challenge 2024 (PyTorch, Perceval)**  
**Dec 2024 – Feb 2025**
- Integrated the Hamming Weight Preserving approach into a QCNN to enhance efficiency and robustness within the Perceval photonic framework.
- Tech: PyTorch for modeling/prototyping; Perceval for photonic gates (RBS), preserving Hamming Weight for resource-efficient quantum processing.
- Project: https://github.com/inin-zou/ZenQ

### **Agentic Deployment Automation System | GitHub Actions, Jenkins, Ansible, Terraform, Docker**  
**Apr 2024 – Oct 2024**
- Automated infra provisioning and deployment script generation by integrating LLM agents into Société Générale’s CI/CD.
- Implemented a full-stack deployment pipeline triggered by PRs on GitHub Enterprise, orchestrated via GitHub Actions and Jenkins.
- Built a custom RAG agent (LangChain + internal LLMaaS) to analyze historical deployment logs from private GitHub repos.
- Agent classifies context (Terraform/Ansible/Docker), retrieves or generates scripts, and executes via Jenkins.
- Added a feedback loop to log deployments and update the vector store, improving retrieval over time.

### **Movie Recommendation System | Deep Learning Project (PyTorch, TensorFlow, Surprise)**  
**Dec 2023**
- Objective: Recommend the top 5 movies most likely to be enjoyed by a user.
- Implemented advanced collaborative filtering: MF, SVD, SVD++, FM, and MLP.
- Achieved final RMSE of **0.758** using ensemble techniques.
- Project: https://github.com/inin-zou/MovieRecommendSystem

### **Real-Time Data Processing Pipeline | Big Data (Kafka, NiFi, Hadoop)**  
**Jan 2023**
- Designed a Big Data pipeline to ingest, process, and store real-time data using Kafka for streaming, NiFi for ingestion/transform, and Hadoop for storage/analysis.
- Kafka: topics for streaming reception; distributed producers/consumers.
- NiFi: automated flows for CSV ingestion, Avro conversion, and HDFS transmission.
- Hadoop & Hive: stored data in HDFS; created partitioned Hive tables for efficient SQL queries.
- Project: https://github.com/inin-zou/MovieRecommendSystem

---

## Education

- **Université Paris Dauphine – PSL | M.S. in Computer Science (2nd Year of Master)**  
  **Sept 2023 – Oct 2024**  
  _Core courses:_ Data Mining/Machine Learning, Optimization Tools ...

- **Université Paris-Saclay | M.S. in Computer Science (1st Year of Master)**  
  **Sept 2022 – Aug 2023**  
  _Ranked top 10%_, GPA: 14.41/20 • _Core courses:_ Advanced Databases...

- **Université Toulouse 1 Capitole | M.S. in Computer Science**  
  **Sept 2019 – Aug 2022**  
  _Ranked top 3%_ • _Core courses:_ Machine Learning, Optimization Theory, Macro-Economics...

- **National Chemistry Olympiad of China | National Second Prize (Top ~1%)**  
  **Nov 2017**  
  31st China Chemistry Olympiad (CChO), a prestigious nationwide STEM competition.

---

## Skills

- **Languages:** Chinese (Native), English (IELTS 7.0), French (DALF C2)  
- **Programming Languages:** Python, Java, R, SQL, Scala, PySpark, VBA, C#, JavaScript, HTML, bash  
- **Certifications:** Machine Learning in Production (Coursera), Certificate of Excellence in AI Agents (Hugging Face), AWS Certified Cloud Practitioner

**Technical Skills**
- LLM Fine-Tuning: LoRA, Prefix Tuning, SFT (Supervised Fine-Tuning)
- Model Optimization: Pruning, Quantization, Knowledge Distillation
- Generative AI: Transformer, GANs
- Data Visualization: Tableau, Power BI, Matplotlib, Seaborn
- Big Data & ETL: Hadoop, NiFi, Kafka, Spark, Airflow, Talend, Redis
- LLM Frameworks: LangChain/LangGraph, LlamaIndex, Smol Agent, AutoGen, gradio[mcp]
- ML Frameworks: PyTorch, TensorFlow
- Databases & Storage: ElasticSearch, PostgreSQL, MongoDB
- DevOps: GitHub Actions, Docker, Kubernetes, Jenkins
- Cloud Platforms & Services: AWS (EC2, S3, Lambda), GCP (Vertex AI)
- Back-End: FastAPI, Flask, .NET
- Front-End: Streamlit, Gradio, React.js, AngularJS

**Hobby:** [Independent singer-songwriter with over 150,000 followers](https://v.douyin.com/SqW93aN/)
