# VerifiNews-AI

VerifiNews-AI is a full-stack web application designed to combat misinformation by providing real-time AI-powered analysis of news articles. It distinguishes between real and fake news using advanced NLP models and provides users with a comprehensive, modern news reading experience.

## 🚀 Key Features

- **AI-Powered Verification:** Instantly checks if a news article is likely real or fake using NLP models like DistilBERT and MobileBERT.
- **Sentiment Analysis:** Integrated VADER Sentiment Analysis to evaluate the emotional tone of articles.
- **Real-Time News Feed:** Explore categorized news articles (9 distinct categories) sourced dynamically from the **GNews.io API** with seamless pagination ("Load More Stories" functionality).
- **Live Cricket Scores:** Real-time cricket updates integrated via the Cricbuzz API, featuring graceful fallbacks and retry logic for robust connectivity.
- **Modern SaaS-Oriented UI:** A completely redesigned, minimalist interface built with Next.js and Tailwind CSS for a premium user experience.
- **User Authentication & History:** Powered by Supabase, allowing users to securely log in, sign up, and track their past article analyses.

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS, Lucide React
- **Backend:** Python, FastAPI, Uvicorn
- **AI/ML:** PyTorch, Transformers (Hugging Face), Scikit-learn, VADER Sentiment Analysis
- **Database & Auth:** Supabase
- **External APIs:** GNews.io API (News Aggregation), Cricbuzz API (Live Cricket)

## 📖 Documentation

- [Product Requirements Document (PRD)](./PRD.md): Detailed project vision, user stories, and requirements.
- [Knowledge Base](./KNOWLEDGE_BASE.md): Technical architecture, setup guides, and troubleshooting.

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- Supabase Project

### Quick Start

1.  **Clone the repository**

    ```bash
    git clone https://github.com/kabhinav577/VerifiNews-AI.git
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
