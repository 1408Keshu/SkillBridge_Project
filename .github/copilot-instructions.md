# Copilot Instructions for SkillBridge React App

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a React application converted from HTML/CSS/JS for SkillBridge - an AI-powered career roadmap platform. The application includes:

- Landing page with hero section, features, and "How it Works" sections
- Login/signup modals with authentication
- Theme toggle (dark/light mode)
- Contact page
- Dashboard redirection after login
- Custom cursor animations
- Responsive design

## Key Components Structure
- `App.jsx` - Main app component with routing
- `components/LandingPage.jsx` - Main landing page
- `components/ContactPage.jsx` - Contact form page
- `components/LoginModal.jsx` - Login modal
- `components/SignupModal.jsx` - Signup modal
- `components/Header.jsx` - Navigation 

- `hooks/useTheme.js` - Theme management
- `hooks/useAuth.js` - Authentication logic

## Development Guidelines
- Use functional components with hooks
- Maintain the existing CSS custom properties for theming
- Keep the same visual design and animations
- Preserve all interactive functionality
- Use React Router for navigation
- Implement proper state management for auth and theme
