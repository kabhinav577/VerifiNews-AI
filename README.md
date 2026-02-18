# VerifiNews-AI

VerifiNews-AI is a full-stack web application designed to combat misinformation by providing real-time AI-powered analysis of news articles. It distinguishes between real and fake news using advanced NLP models including DistilBERT and MobileBERT.

## 🚀 Key Features

-   **AI-Powered Analysis:** Instantly check if a news article is likely real or fake.
-   **Multiple Models:** Choose between speed-optimized and accuracy-focused models.
-   **Analysis History:** Log in to save and review your past analyses.
-   **Modern UI:** A clean, responsive interface built with Next.js and Tailwind CSS.

## 🛠 Tech Stack

-   **Frontend:** Next.js 14, React, Tailwind CSS
-   **Backend:** Python, FastAPI, Uvicorn
-   **AI/ML:** PyTorch, Transformers (Hugging Face), Scikit-learn
-   **Database & Auth:** Supabase

## 📖 Documentation

-   [Product Requirements Document (PRD)](./PRD.md): Detailed project vision, user stories, and requirements.
-   [Knowledge Base](./KNOWLEDGE_BASE.md): Technical architecture, setup guides, and troubleshooting.

## 🏁 Getting Started

### Prerequisites
-   Node.js 18+
-   Python 3.9+
-   Supabase Project

### Quick Start

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/VerifiNews-AI.git
    cd VerifiNews-AI
    ```

2.  **Start the Backend**
    ```bash
    cd backend
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

3.  **Start the Frontend** (in a new terminal)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Open the App**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

For detailed setup instructions, including environment configurations, see the [Knowledge Base](./KNOWLEDGE_BASE.md).

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
