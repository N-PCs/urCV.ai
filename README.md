# 🚀 urCV.ai – Intelligent Resume Builder

![urCV.ai Hero](docs/images/1.png)

<p align="center">
  <b>Build ATS-friendly resumes in minutes using AI.</b><br/>
  Powered by <b>Groq (Llama 3)</b> ⚡ + <b>Google Gemini 2.5</b> 🧠
</p>

<p align="center">
  <a href="#features"><strong>Explore Features</strong></a> •
  <a href="#getting-started"><strong>Quick Start</strong></a> •
  <a href="#templates"><strong>View Templates</strong></a> •
  <a href="#deployment"><strong>Deploy</strong></a>
</p>

---

## ✨ Overview

**urCV.ai** is a cutting-edge, AI-powered resume builder that revolutionizes how job seekers create **professional, ATS-optimized resumes**. Built with modern web technologies and powered by advanced AI models, it offers an unparalleled resume-building experience.

### 🧠 Dual-Engine AI Architecture

- ⚡ **Groq (Llama 3)** → Lightning-fast resume analysis, scoring, and keyword optimization
- � **Google Gemini 2.5** → Intelligent content rewriting, career guidance, and personalized suggestions

### 🎯 What Makes urCV.ai Different

- **Smart AI Assistant**: Context-aware chatbot that helps you craft perfect resumes
- **Real-time Analysis**: Instant ATS scoring and improvement recommendations
- **Professional Templates**: 5 stunning, industry-tested resume designs
- **Multi-format Export**: PDF, DOCX, and ATS-friendly outputs
- **Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **Comprehensive Guide**: Built-in resume writing tips and best practices

---

## 🚀 Features

### 🤖 AI-Powered Resume Intelligence
- **Instant Resume Scoring**: Get your resume scored against ATS standards in real-time
- **Keyword Analysis**: Identify missing keywords and optimize for job descriptions
- **Smart Content Rewriting**: AI-powered bullet point enhancement and phrasing
- **Career Guidance**: Personalized advice for your career path and industry
- **Contextual Chatbot**: Ask questions and get instant resume-building help

### 🎨 Professional Resume Templates
- **Modern**: Clean, contemporary design perfect for tech and creative roles
- **Professional**: Traditional format ideal for corporate and business positions
- **Creative**: Eye-catching layout for designers, artists, and creative professionals
- **Executive**: Sophisticated design for senior-level and C-suite positions
- **Minimalist**: Simple, elegant format that focuses purely on content
- **Bold**: Confident design that makes a strong first impression

### �️ Advanced Builder Features
- **Live Preview**: Real-time resume preview as you type
- **Split-screen Editing**: Edit and preview simultaneously
- **Form-based Input**: Structured forms for education, experience, skills, and more
- **Coding Profiles**: Dedicated section for GitHub, LinkedIn, and portfolio links
- **Hobbies & Interests**: Add personality with customizable hobby sections
- **Full Preview Modal**: Detailed full-screen preview before export

### 📱 Modern User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Smooth Animations**: Beautiful transitions and micro-interactions
- **Loading States**: Professional loading screens and animations
- **Toast Notifications**: Non-intrusive feedback for user actions

### ⬇️ Export & Sharing
- **High-Quality PDF**: Crystal-clear PDF export with perfect formatting
- **Editable DOCX**: Microsoft Word compatible documents
- **ATS-Friendly**: Optimized for Applicant Tracking Systems
- **Print-Ready**: Professional print quality output

---

## 📸 Screenshots

### 🌟 Landing Page

![Landing Page](docs/images/1.png)

### 🛠️ Resume Guides

![Builder Interface](docs/images/2.png)

### 🎨 Tech Stack

![Template Gallery](docs/images/3.png)

### 👔 Bold Template Preview

![Executive Template](docs/images/4.png)

### 🎯 Template Selection

![Template Selection](docs/images/5.png)

---

## 🛠️ Tech Stack

### 🎨 Frontend Framework
- ⚛️ **React 18** with **Vite** for lightning-fast development
- 🟦 **TypeScript** for type-safe development
- 💨 **Tailwind CSS** for utility-first styling
- 🧱 **Shadcn/UI** for beautiful, accessible components
- 🎯 **Lucide React** for consistent iconography
- 🌊 **Framer Motion** for smooth animations

### 🧠 AI & Machine Learning
- ⚡ **Groq SDK** (Llama 3) for ultra-fast AI processing
- 🤖 **Google Generative AI SDK** (Gemini 2.5) for intelligent content generation
- 🧠 Advanced prompt engineering for optimal resume analysis

### 📄 Document Processing
- 📂 **mammoth** for Word document parsing
- 📄 **jsPDF** for PDF generation
- 📝 **docx** for Word document export
- 🖼️ **html2canvas** for high-quality image capture

### 🎭 UI/UX Enhancements
- 🌓 **next-themes** for dark/light mode switching
- 🎨 **Radix UI** components for accessibility
- 📊 **React Query** for efficient state management
- 🔔 **Sonner** for elegant toast notifications
- 📱 **React Router** for seamless navigation

### 🛠️ Development Tools
- 📏 **ESLint** for code quality
- 🎯 **PostCSS** for CSS processing
- 📦 **Vite** for optimized bundling
- 🔧 **React Hook Form** for form management

---

## 🏁 Getting Started

### 🔧 Prerequisites

- **Node.js** v18+ and npm/yarn
- **Git** for version control

### � Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/urCV.ai.git
cd urCV.ai
```

#### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
# Required: Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Groq API Key (for enhanced features)
VITE_GROQ_API_KEY=your_groq_api_key_here
```

#### 4️⃣ Start Development Server

```bash
npm run dev
# or
yarn dev
```

🌐 **Open [http://localhost:5173](http://localhost:5173) in your browser**

### 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint      # Run ESLint
```

---

## 🌐 Deployment

### 🚀 Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com/new)
   - Import your GitHub repository
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Environment Variables**:
     - `VITE_GEMINI_API_KEY`: Your Gemini API key
     - `VITE_GROQ_API_KEY`: Your Groq API key (optional)
   - Click **Deploy** 🚀

### 🐳 Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### 📂 Project Structure

```text
urCV.ai/
├── 📁 public/                     # Static assets & images
│   ├── 1.png - 5.png            # Website screenshots
│   ├── Resume*.jpg              # Resume sample images
│   └── favicon*                 # Favicon files
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 layout/           # Header, Footer components
│   │   ├── 📁 resume/           # Resume builder logic
│   │   │   ├── 📁 forms/        # Education, Experience, Skills forms
│   │   │   ├── 📁 templates/    # 6 Resume templates
│   │   │   ├── ChatBot.tsx      # Gemini AI assistant
│   │   │   ├── ResumeAnalysis.tsx
│   │   │   ├── ResumeGenerator.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   └── ResumeTipsSection.tsx
│   │   ├── 📁 ui/               # Shadcn UI components
│   │   ├── GridScan.tsx         # Animated background
│   │   ├── LogoLoop.tsx         # Logo animation
│   │   └── ThemeToggle.tsx      # Dark/Light mode
│   ├── 📁 pages/                # App routes
│   │   ├── Index.tsx            # Landing page
│   │   ├── Builder.tsx          # Main resume builder
│   │   ├── Templates.tsx        # Template gallery
│   │   └── ResumeGuide.tsx      # Resume writing guide
│   ├── 📁 services/             # AI & document services
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 lib/                  # Utility functions
│   ├── 📁 context/              # React context providers
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── 📄 package.json              # Dependencies & scripts
├── 📄 tailwind.config.ts        # Tailwind configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 vite.config.ts            # Vite build configuration
└── 📄 README.md                 # This file
```

## 🤝 Contributing

✨ **Contributions are highly welcome and appreciated!**

We believe in the power of community collaboration. Whether you're fixing bugs, improving the UI, optimizing AI prompts, enhancing documentation, or suggesting new features — every contribution matters 🚀

### 🎯 How You Can Contribute

- 🐛 **Bug Reports**: Found an issue? Please open an issue with detailed description
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 📝 **Documentation**: Help us improve the README and code comments
- 🎨 **UI/UX**: Design improvements and accessibility enhancements
- 🧠 **AI Prompts**: Optimize our AI prompts for better results
- 🧪 **Testing**: Add tests and improve code coverage

---

## 🛠️ Contributing Guidelines

### 1️⃣ Fork the Repository

Click the "Fork" button at the top right of this page.

### 2️⃣ Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/urCV.ai.git
cd urCV.ai
```

### 3️⃣ Create a Feature Branch

```bash
git checkout -b feature/your-amazing-feature
# or
git checkout -b fix/your-bug-fix
```

### 4️⃣ Make Your Changes
- Follow the existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly

### 5️⃣ Commit Your Changes

```bash
git commit -m "feat: add your amazing feature"
# or
git commit -m "fix: resolve the issue"
```

### 6️⃣ Push to Your Fork

```bash
git push origin feature/your-amazing-feature
```

### 7️⃣ Open a Pull Request 🚀

- Provide a clear description of your changes
- Link any relevant issues
- Include screenshots if applicable

---

## 📄 License & Credits

```text
MIT License

📜 This project is developed under the AcWoc 2026 Initiative.
© 2026 N-PCs — All rights reserved.
```

### 🙏 Acknowledgments

- **Groq** for providing ultra-fast AI inference
- **Google** for the powerful Gemini AI models
- **Vercel** for excellent hosting platform
- **Shadcn/UI** for beautiful component library
- The open-source community for amazing tools and libraries

---

<div align="center">
  <p>🧠 <strong>Maintained with ❤️ by <a href="https://github.com/N-PCs">Neel Pandey</a></strong></p>
  <p>
    <a href="#top">⬆️ Back to Top</a> •
    <a href="https://github.com/N-PCs/urCV.ai">📂 View on GitHub</a> •
    <a href="https://urcvai.vercel.app/">🌐 Live Demo</a>
  </p>
</div>
