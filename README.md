# AI Resume Analyzer (ATS Evaluation System)

An AI-powered Applicant Tracking System (ATS) Resume Analyzer that evaluates a resume against a Job Description, returns a structured compatibility analysis, and maintains a secure history of evaluations for each user.

This project simulates how modern ATS systems screen candidates by matching resume content with job requirements and generating a quantified evaluation using persistent user data.

---

## 🚀 Features

- 🔐 **Secure User Authentication** (Signup/Login)
- 📜 **User History Dashboard** (Track and view past scores)
- 📄 **Upload Resume (PDF)**
- 📝 **Provide Job Description**
- 📊 **AI-generated Match Score (0–100)**
- 🔎 **Missing Skills Detection**
- 💡 **Recommended Keywords**
- ✅ **Strengths & Weaknesses Analysis**
- 🛠 **Actionable Improvement Suggestions**
- 🔒 **Strict JSON Validation** (Ensures clean, malformed-free responses)

---

## 🧠 System Architecture

### 1️⃣ User Authentication & Security
- Secure password hashing using **Bcrypt**.
- Session management via **JSON Web Tokens (JWT)**.
- Protected API routes ensuring users only access their own private analysis history.

### 2️⃣ Resume Processing
- PDF uploaded via frontend and handled by **Multer**.
- Backend extracts readable text using `pdf-parse`.
- Prevents AI hallucination by sending only the extracted text to the model.

### 3️⃣ AI Evaluation Engine
- Integrated with the **OpenAI API**.
- Deterministic output (`temperature: 0`) for consistent, objective scoring.
- Strict JSON-only structured response format.
- No skill guessing — only explicit resume content is considered during evaluation.

### 4️⃣ Data Persistence & Validation
- Saves every analysis result (score, skills, feedback) to **MongoDB** linked to the specific User ID.
- Cleans AI output (automatically removes Markdown code fences).
- Validates JSON integrity before storing or delivering to the frontend.

---

## 🛠 Tech Stack

### Frontend
- **React**
- **React Router** (for Protected Routes)
- **Fetch API**
- **FormData** (file upload handling)

### Backend
- **Node.js**
- **Express.js**
- **JWT & Bcrypt** (Auth & Security)
- **Multer** (File handling middleware)
- **pdf-parse** (PDF text extraction)
- **OpenAI API**

### Database
- **MongoDB** (User profiles & history storage)
- **Mongoose** (Object Data Modeling)

---

## 🚦 Getting Started

1.  **Clone the repo:** `git clone <your-repo-url>`
2.  **Install dependencies:** `npm install` in both the client and server directories.
3.  **Environment Variables:** Add your `OPENAI_API_KEY`, `MONGO_URI`, and `JWT_SECRET` to a `.env` file in the server folder.
4.  **Run the app:** `npm start`