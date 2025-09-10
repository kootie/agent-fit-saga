---
inclusion: fileMatch
fileMatchPattern: 'backend/routes/*.js'
---

# API Development Standards

## Endpoint Structure
- Use RESTful conventions for all endpoints
- Implement consistent error response format
- Include proper HTTP status codes
- Add request/response validation

## Error Handling
```javascript
// Standard error response format
{
  "error": "Human readable message",
  "code": "ERROR_CODE",
  "details": {...},
  "timestamp": "ISO string"
}
```

## Security Requirements
- Validate all inputs using express-validator
- Implement rate limiting per endpoint
- Log all API requests for audit
- Use helmet for security headers

## Database Operations
- Use parameterized queries to prevent SQL injection
- Implement proper transaction handling
- Add database connection pooling
- Include proper error handling for DB operations

## Response Standards
- Always return JSON responses
- Include pagination for list endpoints
- Add metadata for complex responses
- Implement consistent naming conventions