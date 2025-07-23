# 🚀 SkillBridge - AI-Powered Career Roadmap Platform

<div align="center">

![SkillBridge Logo](public/logo2.webp)

**Unlock Your Tech Career Potential with AI-Driven Learning Paths**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.3-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## 📖 Overview

SkillBridge is a modern, AI-powered career development platform that helps users accelerate their tech career journey. Built with React and integrated with Google's Gemini AI, it creates personalized learning roadmaps tailored to individual goals, experience levels, and time commitments.

### 🎯 What Makes SkillBridge Special?

- **🤖 AI-Powered Personalization**: Generate custom learning paths using Google's Gemini AI
- **📊 Interactive Progress Tracking**: Visual dashboard with real-time progress monitoring
- **🎨 Modern UI/UX**: Beautiful, responsive design with smooth animations
- **📚 Curated Resources**: Hand-picked learning materials for each career path
- **🔐 Secure Authentication**: User-friendly login system with session management
- **📱 Mobile-First Design**: Optimized for all devices and screen sizes

---

## ✨ Features

### 🎯 Core Features

- **AI Roadmap Generator**
  - Personalized week-by-week learning plans
  - Customizable duration (4-52 weeks)
  - Adaptive to user's knowledge level and goals
  - Real-time AI-powered recommendations

- **Interactive Dashboard**
  - Progress tracking with visual indicators
  - Skill completion management
  - Career path recommendations
  - Learning resource curation

- **User Management**
  - Secure authentication system
  - Profile customization
  - Session persistence
  - Theme switching (light/dark mode)

### 🛠 Technical Features

- **Modern React Architecture**
  - React 19.1.0 with latest features
  - Component-based modular design
  - Custom hooks for reusable logic
  - Context API for state management

- **Performance Optimized**
  - Vite for fast development and builds
  - Lazy loading and code splitting
  - Optimized re-renders
  - Efficient state updates

- **Developer Experience**
  - Hot module replacement
  - ESLint configuration
  - TypeScript support ready
  - Comprehensive error handling

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key (for AI features)



# SkillBridge Project

A full-stack MERN application with JWT authentication, MongoDB, and a React frontend.

---

## Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. **Start the Backend**

1. **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file** in the `backend` folder with the following content:
    ```env
    MONGO_URI=mongodb://localhost:27017/yourdbname
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. **Start MongoDB**  
   Make sure MongoDB is running locally.  
   If you have MongoDB installed, you can start it with:
    ```bash
    mongod
    ```

5. **Start the backend server:**
    ```bash
    npm start
    ```
    Or, for development with auto-reload (if you have nodemon installed):
    ```bash
    npm run dev
    ```

---

### 3. **Start the Frontend**

1. **Open a new terminal and return to the project root:**
    ```bash
    cd ..
    ```

2. **Install frontend dependencies:**
    ```bash
    npm install
    ```

3. **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    Or, if using Create React App:
    ```bash
    npm start
    ```

---

### 4. **Access the App**

- **Frontend:** [http://localhost:5173](http://localhost:5173) (or [http://localhost:3000](http://localhost:3000) for Create React App)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 📝 Notes

- Make sure you have **Node.js** and **MongoDB** installed on your machine.
- The backend must be running for authentication and protected routes to work.
- Update the `.env` file with your own secrets and database name.

---


### 🎯 Getting Started

1. **Visit the Landing Page**
   - Explore the features and how it works
   - Click "Start Your Journey" to begin

2. **Create Your Account**
   - Sign up with your email and password
   - Or use demo credentials:
     - Email: `demo@skillbridge.ai`
     - Password: `password123`

3. **Access Your Dashboard**
   - Navigate through different sections
   - Customize your profile and preferences

### 🤖 Generating AI Roadmaps

1. **Navigate to Roadmap Section**
   - Click on "Roadmap" in the dashboard

2. **Fill Out the Form**
   - **Duration**: Choose your learning timeline (4-52 weeks)
   - **Dream Goal**: Describe your career objective
   - **Knowledge Level**: Select your current expertise
   - **Daily Time**: Specify available study hours
   - **Topics**: List technologies you want to learn

3. **Generate Your Roadmap**
   - Click "Generate Roadmap"
   - Enter your Gemini API key when prompted
   - Wait for AI to create your personalized plan

4. **Follow Your Path**
   - Mark steps as complete as you progress
   - Access recommended resources
   - Track your advancement

### 📊 Dashboard Features

- **Progress Tracking**: Visual indicators of completed skills
- **Learning Resources**: Curated materials for your career path
- **Project Management**: Track hands-on projects and milestones
- **Interview Prep**: Practice questions and answers
- **Settings**: Customize your experience and preferences

---

## 🏗 Project Structure

```
skillbridge/
├── public/                 # Static assets
│   ├── logo2.webp         # Application logo
│   └── vite.svg           # Vite logo
├── src/
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   │   ├── LoginModal.jsx
│   │   │   └── SignupModal.jsx
│   │   ├── common/       # Shared components
│   │   │   ├── CustomCursor.jsx
│   │   │   └── Navbar.jsx
│   │   ├── dashboard/    # Dashboard components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Roadmap.jsx
│   │   │   ├── Progress.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── LearningResources.jsx
│   │   │   ├── InterviewPrep.jsx
│   │   │   └── Settings.jsx
│   │   └── Pages/        # Page components
│   │       ├── LandingPage.jsx
│   │       └── ContactPage.jsx
│   ├── contexts/         # React contexts
│   │   └── AuthContext.jsx
│   ├── hooks/           # Custom hooks
│   │   ├── useAuth.js
│   │   └── useTheme.js
│   ├── assets/          # Images and static files
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles
│   └── App.css          # App-specific styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

---

## 🛠 Technology Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **React Router DOM 7.6.3** - Client-side routing
- **Vite 7.0.3** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework

### AI Integration
- **Google Gemini API** - AI-powered roadmap generation
- **Custom prompt engineering** - Structured AI interactions
- **JSON parsing** - Reliable response handling

### Development Tools
- **ESLint** - Code linting and formatting
- **React Hooks** - State management and side effects
- **Context API** - Global state management

---

## 🔧 Configuration

### API Keys

To use the AI roadmap generation feature, you'll need a Google Gemini API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Use the key when prompted in the application

### Customization

#### Styling
- Modify `src/index.css` for global styles
- Update component-specific styles in individual files
- Customize theme variables for consistent theming

#### Features
- Add new dashboard sections in `src/components/dashboard/`
- Extend AI prompts in `src/components/dashboard/Roadmap.jsx`
- Modify authentication logic in `src/contexts/AuthContext.jsx`

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy Options

1. **Vercel** (Recommended)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **GitHub Pages**
   ```bash
   npm run build
   # Deploy dist/ folder to GitHub Pages
   ```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow React best practices
- Use meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting
- Update documentation as needed

---

## 🐛 Troubleshooting

### Common Issues

**1. AI Roadmap Generation Fails**
- Ensure you have a valid Gemini API key
- Check your internet connection
- Verify the API key has proper permissions

**2. Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update dependencies: `npm update`
- Check for version conflicts

**3. Styling Issues**
- Clear browser cache
- Check CSS class names
- Verify Tailwind CSS is properly configured

**4. Authentication Problems**
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify AuthContext is properly wrapped

### Getting Help

- Check the [Issues](../../issues) page for known problems
- Create a new issue with detailed information
- Include browser console errors and steps to reproduce

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI capabilities
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Tailwind CSS** for the utility-first styling
- **Font Awesome** for the beautiful icons

---

<div align="center">

**Made with ❤️ by the SkillBridge Team**

[⬆ Back to Top](#-skillbridge---ai-powered-career-roadmap-platform)

</div>
