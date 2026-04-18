# ✍️ The Blog Hub

**The Blog Hub** is a premium, high-performance blogging ecosystem built on the **MERN Stack** (MongoDB, Express, React, Node.js) with a **Vite** frontend. It provides a sophisticated reading experience for visitors, a robust AI-powered workspace for authors, and a comprehensive command center for administrators.

---

## 🚀 Live Demo
*(Deployment in progress... Stay tuned!)*
> [!NOTE]  
> To view the project locally, follow the **Installation** steps and open `http://localhost:5173/` in your browser.

---

## ✨ Features & Ecosystem

### 🧑‍💻 Normal User & Visitor Portal (Reading Excellence)
- **Fluid UI**: Custom-styled with Glassmorphism, smooth micro-animations, and a premium SaaS aesthetic.
- **Dynamic Content**: Explore featured articles, podcasts, and resource libraries in a rich media environment.
- **Interactive Engagement**: Authenticated users can engage with content by liking and commenting on blogs.
- **User Dashboard**: Personalized dashboard tracking user interactions (liked articles, commented posts, and profile management).
- **Premium Gatekeeping**: Important actions, like downloading premium resources and books, are securely gated for authenticated users.
- **Contact & Inquiries**: Integrated contact forms allowing users to reach out directly.

### ✍️ Author Workspace (Creator Hub)
- **AI-Powered Generation**: Built-in Groq & Google Gemini hybrid architecture for high-performance AI content generation, idea brainstorming, and writing assistance.
- **Post Management**: Full CRUD capabilities for writing, formatting, and editing informative articles and media-rich blogs.
- **Author Dashboard**: Centralized control for managing published content, analyzing audience engagement, and tracking article lifecycle.
- **Profile Customization**: Professional author profiles with editable details and bios.

### 👑 Admin Command Center (Moderation & Control)
- **Full Scope Management**: Granular control over the platform's visual identity, including dynamic management for updating Home & Hero sections (About page data, Resources, Explore content metadata).
- **Global Media Library**: Full CRUD and oversight for **Podcasts**, **Books**, and **Resources**. 
- **User Moderation & Access Control**: Monitor registered users, handle inquiries, and manage roles globally.
- **Site Analytics (Coming Soon)**: Statistics and platform growth at a glance.

### 🔐 Security & Architecture
- **Robust Authentication**: JWT and Session-based login with a highly secure, email-verified OTP flow (via Nodemailer) for forgotten passwords.
- **Role-Based Access Control**: Four-tier differentiated logic separating logic efficiently for Visitors, Normal Users, Authors, and Admins.
- **Secure Image Management**: Cloudinary integration for scalable, resilient media storage.
- **Scalable REST API**: Express Backend tightly integrated with MongoDB and Mongoose ORM.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Tailwind principles, Custom Design System & Variables, Glassmorphism)
- **Icons & Typography**: [Lucide React](https://lucide.dev/), Merriweather & Outfit (Google Fonts)

### Backend
- **Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ORM)
- **Authentication**: JWT (JSON Web Tokens), Nodemailer (OTP emails)
- **Media Storage**: Cloudinary & Multer (Image capturing and URL transformation)
- **AI Integration**: Groq API & Google Gemini API

---

## 📂 Project Structure

```text
The_Blog_Hub/
├── Backend/                 # Node.js, Express & MongoDB API
│   ├── config/              # DB Context & Cloudinary setup
│   ├── controllers/         # Request handling logic (Admin, Auth, Blog, Podcast, etc.)
│   ├── middlewares/         # Role Verifier, Auth, Multer, Error handlers
│   ├── models/              # Mongoose database schemas
│   ├── routes/              # API REST endpoints
│   ├── utils/               # AI configs, Email Transports
│   └── server.js            # Node Application entry point
├── Frontend/                # React Web Application
│   ├── src/
│   │   ├── Admin/           # Admin Dashboard & System Settings
│   │   ├── Author/          # Author Workspace & AI Writer Interface
│   │   ├── NormalUser/      # Authenticated Subscriber Dashboard
│   │   ├── Visitor/         # Public pages, Articles & Auth Flows
│   │   ├── assets/          # Global styles, Images, Icons
│   │   ├── App.jsx          # Multi-portal Core Routing Router
│   │   └── main.jsx         # Application setup
│   └── package.json         # React dependencies
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
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_smtp_email
   EMAIL_PASS=your_smtp_password
   GROQ_API_KEY=your_groq_api_key
   GEMINI_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
   *Start the server (Hot reload enabled):*
   ```bash
   npm run dev
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
*(Screenshots coming soon...)*
<!-- ![Hero Section](https://raw.githubusercontent.com/Saurav-Pandit2005/The_Blog_Hub/main/Frontend/src/assets/Images/Visitor/HomePage/hero.jpg) -->

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
