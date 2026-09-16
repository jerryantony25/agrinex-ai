# 🌱 AGRINEX AI

### *Intelligent Farming. Better Decisions.*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![SQLAlchemy](https://img.shields.io/badge/ORM-SQLAlchemy-D71F00.svg?style=flat&logo=sqlalchemy)](https://www.sqlalchemy.org)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL_Ready-336791.svg?style=flat&logo=postgresql)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AGRINEX AI** is a production-grade Smart Agriculture Management System designed to empower farmers and agronomists with grounded, data-informed decisions. It integrates conversational AI, real-time farm command telemetry, scientific soil health diagnostics, weather micro-climate forecasting, disease screening, and wholesale commodity market tracking.

---

## 📸 Platform Highlights

* **🤖 AGRINEX AI Assistant:** Natural language agronomy assistant grounded on live farm specifications, soil records, and verified crop science principles.
* **🚜 Farm Command Dashboard:** Unified operational overview tracking soil moisture, field temperature, growth stages, and critical advisories.
* **🧪 Soil Intelligence Engine:** Scientific evaluation of soil pH, Nitrogen (N), Phosphorus (P), Potassium (K), and moisture with suitability rankings for high-value crops.
* **🌱 Crop Health & Vision Screening:** Lifecycle tracking from germination to harvesting with image upload diagnostics.
* **💧 Smart Irrigation Guidance:** Dynamic water management advisory calculating field capacity to prevent root hypoxia and water stress.
* **🌦 Weather Intelligence:** 7-day micro-climate forecasts with operational farming impact (spraying windows, precipitation risks).
* **📈 Regional Mandi Tracker:** Wholesale commodity benchmark prices and daily arrival volume trends.
* **🛒 Agricultural Store:** Curated bio-inputs catalog with seed hybrids, organic biopesticides, and digital field probes.

---

## 🏛 System Architecture

```
                                AGRINEX AI PLATFORM
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │                                           │
         React 18 Web Client                           Future Mobile App
          (Vite + Tailwind)                             (React Native)
                   │                                           │
                   └─────────────────────┬─────────────────────┘
                                         │  HTTPS / REST API
                                         ↓
                                FastAPI Backend Layer
                         (Async Python, Pydantic v2, CORS)
                                         │
        ┌───────────────────┬────────────┴────────────┬───────────────────┐
        ↓                   ↓                         ↓                   ↓
  Database Layer       AI Reasoning            Agronomic Services     IoT Hardware
  SQLAlchemy ORM        Engine (LLM             - Soil Chemistry      (ESP32 Sensors)
  PostgreSQL /          + Domain Rules          - Weather Impact      (Future Phase)
  SQLite Fallback       & Safety Prompts)       - Mandi Tracker
```

---

## 🛠 Technology Stack

### Frontend
* **Core:** React 18, Vite, JavaScript (ES2024)
* **Styling:** Tailwind CSS, PostCSS, Custom Natural Earth Design Palette
* **Routing:** React Router DOM v6 (SPA with `vercel.json` rewrite compatibility)
* **Icons:** Lucide React
* **HTTP Client:** Axios (Centralized API client with interceptors and proxying)

### Backend
* **Framework:** Python 3.12, FastAPI, Uvicorn
* **Validation & Settings:** Pydantic v2, Pydantic-Settings
* **Database & ORM:** SQLAlchemy 2.0 (PostgreSQL + SQLite Dual-Engine)
* **AI Engine:** Pluggable LLM Client (OpenAI / OpenRouter / Gemini) + Built-in Agronomy Knowledge Engine
* **File Uploads:** Python-Multipart, Pillow-ready image screening

---

## 📂 Project Structure

```
agrinex-ai/
│
├── frontend/
│   ├── public/                      # Static assets & SVG icons
│   ├── src/
│   │   ├── assets/                  # Brand assets
│   │   ├── components/
│   │   │   ├── layout/              # Navbar, Sidebar, TopHeader, BottomNav, Footer
│   │   │   ├── ui/                  # Button, Card, Badge, Modal, Input, Toast, Skeleton
│   │   │   ├── chatbot/             # ChatWindow, MessageItem, SuggestionPills, InsightCards
│   │   │   ├── dashboard/           # StatCard, FarmOverviewCard, QuickActionCard, AlertBanner
│   │   │   └── agriculture/         # SoilAnalysisCard, CropCard, AddCropModal, CropImageUpload
│   │   ├── pages/                   # LandingPage, Dashboard, Chat, Farm, Soil, Crops, Weather, Market, Store
│   │   ├── services/                # Axios API services (chat, farm, soil, crops, weather, market, store)
│   │   ├── utils/                   # cn utility, formatters, constants
│   │   ├── data/                    # Grounded fallback demo datasets
│   │   ├── App.jsx                  # React Router root
│   │   ├── main.jsx                 # Vite application entry
│   │   └── index.css                # Tailwind directives & custom CSS
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json                  # Single-page application rewrites
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                  # FastAPI entry point & CORS
│   │   ├── config.py                # Environment configuration
│   │   ├── database.py              # SQLAlchemy engine & session maker
│   │   ├── models/                  # Farmer, Farm, Crop, SoilData, ChatMessage, Product
│   │   ├── schemas/                 # Pydantic request/response schemas
│   │   ├── routes/                  # API routers (/health, /chat, /farm, /soil, /crops, /weather, /market, /products)
│   │   ├── services/                # Soil, Weather, Market, Farm, Crop business logic
│   │   ├── ai/                      # System prompts, AgronomyEngine, LLM client
│   │   └── utils/                   # Database seeder & error handlers
│   ├── requirements.txt
│   ├── .env.example
│   └── run.py                       # Uvicorn launcher script
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18 or higher) & **npm**
* **Python** (v3.10 or higher)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\activate
# On Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env from example (defaults to local zero-config SQLite)
cp .env.example .env

# Run FastAPI server with auto-reload
uvicorn app.main:app --reload --port 8000
# Alternatively: python run.py
```

Backend API will be accessible at: `http://localhost:8000`  
Interactive Swagger Docs at: `http://localhost:8000/docs`

---

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Frontend will be accessible at: `http://localhost:5173`

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `sqlite:///./agrinex.db` | PostgreSQL connection string or SQLite path |
| `HOST` | `0.0.0.0` | API bind address |
| `PORT` | `8000` | API port |
| `ENVIRONMENT` | `development` | Environment mode |
| `ALLOWED_ORIGINS` | `http://localhost:5173,...` | Comma-separated CORS origins |
| `AI_PROVIDER` | `default` | `default` (built-in knowledge engine), `openai`, `openrouter` |
| `AI_API_KEY` | `""` | LLM API key (optional for default engine) |
| `AI_MODEL` | `gpt-4o-mini` | AI model identifier |
| `SECRET_KEY` | `agrinex-secret-key` | Application cryptographic secret |

### Frontend (`frontend/.env`)

| Variable | Description |
| :--- | :--- |
| `VITE_API_URL` | Optional backend URL for production (Leave empty in local dev to use Vite proxy) |

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status & engine version |
| `POST` | `/api/chat` | Send question to AGRINEX AI assistant |
| `GET` | `/api/chat/history/{farmer_id}` | Retrieve past advisory threads |
| `GET` | `/api/farm/{farmer_id}` | Fetch farmer's farm specifications |
| `POST` | `/api/farm` | Update or register farm details |
| `POST` | `/api/soil/analyze` | Perform chemical NPK & pH soil analysis |
| `GET` | `/api/crops/{farmer_id}` | Retrieve standing crops list |
| `POST` | `/api/crops` | Register a new crop or parcel rotation |
| `POST` | `/api/crops/upload-image` | Upload crop leaf photo for screening |
| `GET` | `/api/weather/{farmer_id}` | 7-day micro-forecast and farming impacts |
| `GET` | `/api/market` | Regional wholesale mandi commodity prices |
| `GET` | `/api/products` | Query agricultural store catalog |
| `POST` | `/api/products/orders` | Place a demo agricultural supply order |

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Push repository to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Set **Root Directory** to `frontend`.
4. Add Environment Variable:
   * `VITE_API_URL`: `https://your-backend-api.onrender.com`
5. Deploy. (The included `vercel.json` ensures client-side routing works seamlessly).

### Backend (Render / Railway / AWS EC2)
1. Set Root Directory to `backend`.
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set `DATABASE_URL` to your PostgreSQL database URL.

---

## 🗺 Future Roadmap

- [ ] **Phase 2:** Advanced Vector RAG with local state agricultural university extension documents.
- [ ] **Phase 3:** Embedded ONNX / TensorFlow Lite Computer Vision model for on-device foliar disease diagnosis.
- [ ] **Phase 4:** ESP32 hardware node firmware (capacitive soil moisture sensor + DHT22 via MQTT).
- [ ] **Phase 5:** Multi-lingual voice support in Tamil (தமிழ்), Hindi (हिंदी), and Telugu (తెలుగు).
- [ ] **Phase 6:** Automated solar drip irrigation pump relay control with safety interlocks.

---

## 📜 License & Portfolio Notice

This project is open-source under the [MIT License](LICENSE). Built for academic showcase, student portfolio presentation, and real-world agricultural innovation.
