# High-Level Design (HLD)

## 1. Objective

Blogify AI is a blog management and AI enhancement platform that allows users to create blog posts, store them in MongoDB, and enrich them with AI-generated summaries, keywords, and tone analysis using OpenAI.

## 2. System Overview

The system consists of three major layers:

- Frontend client: User interface for creating and viewing blog posts
- Backend API: Express.js service handling HTTP requests, validation, middleware, business logic, and AI orchestration
- Data layer: MongoDB for persistence and model storage
- External system: OpenAI API for AI-powered content analysis

## 3. Components

### Frontend
The frontend provides:
- blog listing screen
- create post form
- post details view
- navigation between pages

### Backend
The backend provides:
- REST endpoints for posts and AI generation
- validation for incoming request payloads
- middleware for logging and centralized error handling
- integration with MongoDB and OpenAI

### Database
MongoDB stores:
- post title
- content
- author
- summary
- keywords
- tone
- timestamps

### AI service
The AI service sends user content to OpenAI and expects structured JSON with:
- summary
- keywords
- tone

## 4. Use Cases

### Create blog post
1. User enters title and content in frontend
2. Frontend sends POST request to backend
3. Backend validates payload
4. Backend calls OpenAI
5. AI returns structured fields
6. Backend stores the post in MongoDB
7. Response is returned to frontend

### Get all posts
1. Frontend requests all posts
2. Backend queries MongoDB
3. Response is returned as JSON

### Handle error
1. Invalid payload triggers validation error
2. Backend responds with 400
3. Unexpected failure triggers centralized error middleware and returns 500

## 5. Non-Functional Requirements

- Secure secret management with `.env`
- API should return JSON responses consistently
- Validation should reject malformed input
- System should log requests for debugging
- Backend should degrade gracefully when AI service fails

## 6. Scalability and Extensibility

- Add more AI features such as rewriting, SEO suggestions, or image generation
- Introduce authentication and authorization later
- Split services into dedicated microservices if traffic increases
- Add caching for high-frequency read endpoints

## 7. High-Level Architecture

```text
Client (Vue/React) --> Express API --> MongoDB
                              |
                              --> OpenAI API
```

## 8. Risks and Considerations

- OpenAI API rate limits and latency
- Missing `.env` values can break startup
- MongoDB availability must be checked on boot
- Invalid AI response parsing can fail if the model returns an unexpected format

## 9. Summary

The application is designed to show how AI integration fits into a standard web system: frontend requests, backend validation, AI enrichment, database persistence, and structured API responses.
