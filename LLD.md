# Low-Level Design (LLD)

## 1. Modules

### 1.1 Express Server
File: `src/index.js`

Responsibilities:
- load environment variables
- initialize Express app
- enable CORS and JSON parsing
- attach middleware
- register routes
- start MongoDB connection
- listen on configured port

### 1.2 Route Layer
Files:
- `src/routes/index.js`
- `src/routes/posts.routes.js`
- `src/routes/user.routes.js`

Responsibilities:
- map HTTP paths to controller functions
- validate request payloads
- expose REST endpoints

### 1.3 Controller Layer
Files:
- `src/controllers/postController.js`
- `src/controllers/user.controller.js`

Responsibilities:
- handle request and response flow
- call service methods
- return proper status codes
- handle validation and not-found errors

### 1.4 Service Layer
File: `src/services/aiService.js`

Responsibilities:
- create OpenAI client
- send structured prompt to LLM
- parse JSON response
- throw errors when model response is invalid

### 1.5 Model Layer
File: `src/models/Post.js`

Schema fields:
- title: String, required
- content: String, required
- author: String, default: guest
- summary: String, default empty
- keywords: Array of Strings
- tone: String
- createdAt, updatedAt: timestamps

### 1.6 Middleware
Files:
- `src/middleware/requestlogger.js`
- `src/middleware/errorhandler.js`

Responsibilities:
- log requests with method and URL
- centralize error response logic
- return JSON error structures with correct HTTP status

### 1.7 Configuration
Files:
- `.env.example`
- `src/config/db.js`

Responsibilities:
- provide environment variables
- connect to MongoDB safely

## 2. Request Flow Example: Create Post

1. Client sends `POST /api/v1/posts`
2. `posts.routes.js` validates title and content
3. `postController.createPost` receives request
4. `generateBlogInsights()` calls OpenAI
5. AI returns JSON with `summary`, `keywords`, and `tone`
6. `Post.create()` saves document in MongoDB
7. Controller returns `201 Created` with the saved post

## 3. Error Flow

- Validation error => `400 Bad Request`
- Post missing => `404 Not Found`
- Unexpected exception => `500 Internal Server Error`

## 4. Data Contracts

### POST /api/v1/posts
Request body:
```json
{
  "title": "AI in Blogging",
  "content": "This blog explains how AI can help people write faster and better content.",
  "author": "jane"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "AI in Blogging",
    "content": "...",
    "summary": "...",
    "keywords": ["AI", "writing"],
    "tone": "informative",
    "author": "jane"
  }
}
```

### POST /api/v1/ai/generate
Request body:
```json
{
  "title": "AI in Blogging",
  "content": "This blog explains how AI can help people write faster and better content."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "summary": "AI improves productivity in writing.",
    "keywords": ["AI", "writing", "content"],
    "tone": "informative"
  }
}
```

## 5. Dependencies

- `express`
- `mongoose`
- `dotenv`
- `cors`
- `express-validator`
- `openai`

## 6. Implementation Notes

- All secrets must be kept in the `.env` file, never committed to Git
- The route layer should stay thin; business logic belongs in controllers/services
- Centralized error handling ensures consistent API responses
- Response formats must remain JSON so frontend clients can consume them reliably
