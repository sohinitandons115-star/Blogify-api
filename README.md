# Blogify AI API

Blogify AI is a full-stack AI-powered blog application built with Express.js and a Vue frontend. The backend includes MongoDB integration, OpenAI-powered blog insight generation, validation middleware, and RESTful API routes.

## Features

- AI-generated blog summaries, keywords, and tone using OpenAI
- MongoDB storage for blog posts
- RESTful CRUD endpoints for posts
- Input validation with express-validator
- Middleware for request logging and server-side error handling
- Environment-based configuration using dotenv
- Basic frontend app shell for UI integration

## Project structure

- `src/index.js` — Server bootstrap
- `src/routes/` — Route definitions
- `src/controllers/` — Request handlers
- `src/services/` — Business logic and AI integration
- `src/models/` — MongoDB models
- `src/middleware/` — Request logger and error handler
- `src/config/` — Database connection config

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your environment variables
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

## Environment variables

```env
PORT=1200
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blogify
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=replace_with_a_long_random_secret
```

## API examples

### Register and log in

```bash
POST /api/v1/users/register
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "a-strong-password"
}
```

Both endpoints return a JWT in `data.token`. Send it when creating, updating, or deleting a post:

```http
Authorization: Bearer <token>
```

### Get all posts

```bash
GET /api/v1/posts
```

### Create post with AI analysis

```bash
POST /api/v1/posts
Content-Type: application/json

{
  "title": "AI in Blogging",
  "content": "This blog explains how AI can help people write faster and better content."
}
```

### Generate AI summary only

```bash
POST /api/v1/ai/generate
Content-Type: application/json

{
  "title": "AI in Blogging",
  "content": "This blog explains how AI can help people write faster and better content."
}
```

## Notes

- The frontend app is intentionally lightweight and can be upgraded to React if you want stronger front-end concept coverage.
- Make sure MongoDB is running locally before starting the API.

