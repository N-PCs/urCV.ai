# 🚀 urCV.ai – Intelligent Resume Builder

![urCV.ai Hero](docs/images/screenshot1.png)

<p align="center">
  <b>Build ATS-friendly resumes in minutes using AI.</b><br/>
  Powered by <b>Groq (Llama 3)</b> ⚡ + <b>Google Gemini 2.5</b> 🧠
</p>

---

## ✨ Overview

**urCV.ai** is a state-of-the-art, AI-powered resume builder designed to help job seekers create **professional, ATS-optimized resumes** effortlessly.

It leverages a **dual-engine AI architecture**:
- ⚡ **Groq (Llama 3)** → ultra-fast resume analysis & scoring  
- 🧠 **Google Gemini 2.5** → intelligent rewriting & career guidance  

Think of urCV.ai as a **virtual career consultant**, not just a resume builder.

---

## 🚀 Key Features

### 🤖 AI-Powered Resume Intelligence
- Instant resume scoring & keyword analysis
- Actionable improvement suggestions
- Smart bullet-point rewriting

### 🎨 Professional Resume Templates
- 🧩 Modern  
- 🧾 Professional  
- 🎭 Creative  
- 👔 Executive  

### 💬 Intelligent Career Assistant
- Context-aware AI chatbot
- Resume optimization tips
- Career & interview guidance

### 📄 Live Resume Preview
- Split-screen editing
- Real-time updates as you type

### 📱 Fully Responsive Design
- Optimized for desktop, tablet & mobile

### ⬇️ Multiple Export Formats
- 📄 High-quality PDF  
- 📝 Editable DOCX (Word)  
- ✅ ATS-friendly output  

---

## 📸 Screenshots

### 🌟 Application Hero
![Hero View](docs/images/screenshot1.png)

### 🛠️ Intelligent Builder
![Builder Interface](docs/images/screenshot2.png)

### 🧩 Professional Templates
![Templates Page](docs/images/screenshot3.png)

### 👔 Executive Design
![Executive Template](docs/images/screenshot4.png)

### 🎯 Template Selection
![Template Selection](docs/images/screenshot5.png)

---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ **React + Vite**
- 🟦 **TypeScript**
- 💨 **Tailwind CSS**
- 🧱 **Shadcn/UI**
- 🎯 **Lucide Icons**

### 🧠 AI & Services
- ⚡ **Groq SDK** (Llama 3)
- 🤖 **Google Generative AI SDK** (Gemini 2.5)
- 📂 **mammoth** – Resume file parsing
- 📄 **PDF / DOCX Export Services**

---

## 🏁 Getting Started

### 🔧 Prerequisites
- Node.js **v18+**
- npm or yarn

---

### 📦 Installation

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/urCV.ai.git
cd urCV.ai
```

#### 2️⃣ Install dependencies
```bash
npm install
```

#### 3️⃣ Configure environment variables

Create a .env file in the root directory:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
// Optional (production)
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4️⃣ Run the development server

```bash
npm run dev

🌐 Open http://localhost:8080 in your browser.
```

---

### 📂 Project Structure

```text
urCV.ai/
├── docs/
│   └── images/                 # Screenshots
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── resume/             # Resume builder logic
│   │   │   ├── forms/          # Education, Experience, Skills
│   │   │   ├── templates/      # Resume templates
│   │   │   ├── ChatBot.tsx     # Gemini AI assistant
│   │   │   ├── ResumeAnalysis.tsx
│   │   │   ├── ResumeGenerator.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   └── aiprompt.ts
│   │   └── ui/                 # Shadcn UI components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities
│   ├── pages/                  # App routes
│   ├── services/               # AI & document services
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

🤝 Contributing
✨ Contributions are highly welcome and appreciated!

Whether it's fixing bugs, improving UI, optimizing AI prompts, or enhancing documentation — every contribution matters 🚀

---

## 🛠️ How to Contribute

### 1️⃣ Fork the repository

### 2️⃣ Create a new feature branch

```bash
git checkout -b feature/YourFeature
```

### 3️⃣ Commit your changes

```bash
git commit -m "Add YourFeature"
```

### 4️⃣ Push to GitHub

```bash
git push origin feature/YourFeature
```

### 5️⃣ Open a Pull Request 🚀

---

```
📄 License
📜 This project is developed under the AcWoc 2026 Initiative.
© 2026 N-PCs — All rights reserved.
```

<p align="center"> 🧠 Maintained by <b>Neel Pandey</b> </p> 
