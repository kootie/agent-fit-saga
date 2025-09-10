# Auto-Test Hook

## Trigger
When a user saves a code file in the backend/ directory

## Action
Automatically run relevant tests and update test coverage

## Implementation
```javascript
// Hook configuration for automatic testing
{
  "name": "auto-test",
  "trigger": "file-save",
  "pattern": "backend/**/*.js",
  "action": "run-tests",
  "commands": [
    "cd backend && npm test",
    "npm run test:coverage"
  ]
}
```

## Benefits
- Immediate feedback on code changes
- Prevents regression bugs
- Maintains code quality standards
- Reduces manual testing overhead