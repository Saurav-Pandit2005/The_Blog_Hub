# The Blog Hub - Backend

Express 5 + MongoDB (Mongoose) + Cloudinary + Groq/Gemini.

## Setup
```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # or: npm start
```

## API (all under /api/v1)
| Prefix | Endpoints |
|---|---|
| `/auth` | `POST register`, `POST login`, `GET me`, `PUT updatedetails`, `PUT updatepassword`, `PUT updateavatar`, `POST forgotpassword`, `POST verifyotp`, `PUT resetpassword` |
| `/blogs` | `GET /`, `GET /:slug`, `GET /id/:id`, `GET /:id/comments`, `PUT /:id/like`, `POST /:id/comment`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `/podcasts` | `GET /`, `GET /my-podcasts`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `/resources` | `GET /`, `GET /my-resources`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`, `PUT /:id/view`, `PUT /:id/download` |
| `/inquiries` | `POST /`, `GET /` (Admin), `DELETE /:id` (Admin), `PUT /:id/reply` (Admin) |
| `/author` | `GET stats`, `GET blogs` |
| `/admin` | `GET stats`, `GET blogs`, `GET podcasts`, `GET resources`, `GET/POST users`, `PUT/DELETE users/:id` |
| `/ai` | `POST generate` |
