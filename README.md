# ConnectHub

ConnectHub is a premium, futuristic MERN-stack social media application built with a stunning cinematic, animated dark-mode UI. It focuses on a highly polished, startup-quality aesthetic with advanced glassmorphism and Framer Motion animations.

## Features

- **Futuristic Animated Background:** Deep space navy theme with glowing blurred orbs, rotating neon gradient waves, and floating particles.
- **Advanced Glassmorphism:** Frosted glass cards, heavily rounded corners (24px+), and smooth hover elevations.
- **Cinematic UI/UX:** Built with Material UI (MUI) and `framer-motion` for fluid, Apple-quality interactions and page transitions.
- **Split-Screen Authentication:** Modern, beautifully illustrated login and signup pages with password visibility toggles.
- **Optimistic UI Updates:** Instant like and comment interactions for a snappy, responsive feel.
- **Responsive Design:** A fully centered feed layout (max 800px) that scales perfectly from ultra-wide desktop monitors down to mobile devices.

## Tech Stack

### Frontend
- React.js (Vite)
- Material UI (MUI) v5
- Framer Motion
- Lucide React (Icons)
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Arpit6691/connectHub.git
   cd connectHub
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with your MongoDB credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.
