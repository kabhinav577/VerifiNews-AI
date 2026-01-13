# VerifiNews-AI Frontend

Frontend application for VerifiNews-AI - Fake News Detection System (MCA Final Year Project)

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS 3**
- **Axios** (for API calls)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running at `http://127.0.0.1:8000`

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── NewsForm.jsx       # Main form component
│   │   ├── ResultCard.jsx     # Results display component
│   │   └── ConfidenceBar.jsx  # Confidence visualization
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── layout.js              # Root layout
│   ├── page.js                # Main page
│   └── globals.css            # Global styles
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Features

- ✅ Large textarea for full article input
- ✅ Model selection (DistilBERT, MobileBERT, TF-IDF + Gradient Boosting)
- ✅ Input validation (minimum 50 characters)
- ✅ Loading states with spinner
- ✅ Confidence bar visualization
- ✅ Color-coded results (Green: Real, Red: Fake)
- ✅ Responsive design
- ✅ Clean academic UI

## API Configuration

The backend API URL is configured in `app/services/api.js`. To change it, modify the `API_BASE_URL` constant.

## Build for Production

```bash
npm run build
npm start
```

## Notes

- Ensure the backend server is running before using the frontend
- The frontend expects the backend to be available at `http://127.0.0.1:8000`
- All styling is done with Tailwind CSS (no external UI libraries)
