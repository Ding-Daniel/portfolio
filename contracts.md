# API Contracts (Frontend ↔ Backend)

Status: draft for MVP integration. Frontend currently uses mock.js for hero, projects (6), blogs (3), skills. Backend integration in this phase focuses on persisting contact submissions.

Base URL usage
- Frontend must use process.env.REACT_APP_BACKEND_URL and prefix all endpoints with /api
- Backend binds to 0.0.0.0:8001 (supervisor) and uses Mongo via MONGO_URL from backend/.env

Resources
1) Contact Submissions
- POST /api/contacts
  Request (application/json):
  {
    "name": string (1..120),
    "email": string (valid email),
    "message": string (1..4000)
  }
  Response 201:
  {
    "id": string(uuid),
    "name": string,
    "email": string,
    "message": string,
    "created_at": string(ISO-8601)
  }

- GET /api/contacts?limit=100
  Response 200: [ContactSubmission]
  Notes: Sorted by created_at desc. Only used for testing/admin in this MVP.

Validation & Errors
- 422 validation error on invalid fields
- 500 for unexpected server errors (logged)

CORS
- allow_origins: * (MVP)

What stays mocked (for now)
- GET /projects, /blogs: not implemented yet. Frontend continues to read from src/mock.js
- Hero/skills/socials: from src/mock.js

Integration Plan
- Replace localStorage in Contact form submit with axios POST to `${process.env.REACT_APP_BACKEND_URL}/api/contacts`
- On success: show toast and clear form
- Keep a minimal fallback: if request fails, show toast with error

Future (Phase-2)
- Optional read-only endpoints: GET /api/projects, GET /api/blogs
- Admin-protected create/update for projects/blogs