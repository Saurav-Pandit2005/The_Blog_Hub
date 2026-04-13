# ✍️ The Blog Hub

**The Blog Hub** is a premium, high-performance blogging ecosystem built on the **MERN Stack** (MongoDB, Express, React, Node.js) with a **Vite** frontend. It provides a sophisticated reading experience for visitors, a robust AI-powered workspace for authors, and a powerful command center for administrators.

---

## 🚀 Live Demo
*(Deployment in progress... Stay tuned!)*
> [!NOTE]  
> To view the project locally, follow the **Installation** steps and open `http://localhost:5173/` in your browser.

---

## ✨ Features

### 🧑‍💻 Normal User & Visitor Portal (Reading Excellence)
- **Fluid UI**: Custom-styled with Glassmorphism, smooth animations, and a premium SaaS aesthetic.
- **Dynamic Content**: Explore featured articles, podcasts, and resource libraries.
- **Interactive Engagement**: Authenticated users can engage with content by liking and commenting on blogs.
- **User Dashboard**: Personalized dashboard tracking user interactions (likes, comments, and profile data).
- **Premium Gatekeeping**: Important actions, like downloading resources, are securely gated for authenticated users.

### ✍️ Author Workspace (Creator Hub)
- **AI-Powered Generation**: Built-in Groq / Gemini hybrid architecture for high-performance AI content generation and writing assistance.
- **Post Management**: Full CRUD capabilities for writing, formatting, and editing articles.
- **Author Dashboard**: Centralized control for managing published content, analyzing audience engagement, and tracking article performance.
- **Profile Customization**: Professional author profiles with editable details and bio.

### 👑 Admin Command Center (Moderation & Control)
- **Full Scope Management**: Detailed dynamic management for updating Home & Hero sections (About, Resources, Podcasts, Explore content).
- **User Moderation**: Monitor and manage registered users, their roles, and permissions.
- **Content Operations**: Oversight for Blogs, Podcasts, Books, and Resources with full preview and approval capabilities.
- **Site Analytics**: Real-time statistics and growth trends at a glance.

### 🔐 Security & Architecture
- **Robust Authentication**: JWT and Session-based login with a secure, email-verified OTP flow for forgot password requests.
- **Role-Based Access Control**: Differentiated logic and environments for Visitors, Normal Users, Authors, and Admins.
- **Secure Backend**: Express REST API integrated with MongoDB for reliable data persistence.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Tailwind principles, Custom Design System & Variables)
- **Icons & Typography**: [Lucide React](https://lucide.dev/), Merriweather & Outfit (Google Fonts)

### Backend
- **Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens), Nodemailer (OTP emails)
- **AI Integration**: Groq API & Google Gemini API

---

## 📂 Project Structure

```text
The_Blog_Hub/
├── Backend/                 # Node.js, Express & MongoDB API
│   ├── controllers/         # Request handling logic
│   ├── middlewares/         # Auth, Session, Error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── utils/               # Helpers, AI config, Mail transports
│   └── server.js            # Application entry point
├── Frontend/                # React Web Application
│   ├── src/
│   │   ├── Admin/           # Admin Dashboard & Command Center
│   │   ├── Author/          # Author Workspace & AI Writer
│   │   ├── NormalUser/      # Authenticated Dashboard
│   │   ├── Visitor/         # Public pages & Auth Flows
│   │   ├── assets/          # Global styles, Images, Icons
│   │   ├── App.jsx          # Multi-portal routing logic
│   │   └── main.jsx         # Application entry point
│   └── package.json         # Dependencies & Scripts
└── README.md
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saurav-Pandit2005/The_Blog_Hub.git
   cd The_Blog_Hub
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```
   *Create a `.env` file in the Backend directory with the following variables:*
   ```env
   PORT=...
   MONGODB_URI=...
   JWT_SECRET=...
   EMAIL_USER=...
   EMAIL_PASS=...
   GROQ_API_KEY=...
   GEMINI_API_KEY=...
   ```
   *Start the server:*
   ```bash
   npm run server
   ```

3. **Frontend Setup:**
   ```bash
   cd ../Frontend
   npm install
   ```
   *Start the frontend development server:*
   ```bash
   npm run dev
   ```

---

## 📸 Screenshots

### 🖥️ Discover the Hub
![Hero Section](https://raw.githubusercontent.com/Saurav-Pandit2005/The_Blog_Hub/main/Frontend/src/assets/Images/Visitor/HomePage/hero.jpg)

*(More screenshots coming soon...)*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

**Developed & Maintained by:**
- 👤 **[Saurav Pandit](https://github.com/Saurav-Pandit2005)**
- 👤 **[Surja Bist](https://github.com/Surja-009-collab)**
- 👤 **[Rima Sah](https://github.com/srima45678)**
