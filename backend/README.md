# Backend Documentation

This is the backend server for the Cold Emails Scheduler application. It handles user authentication, email sequence management, and automated email scheduling.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile

### Email Sequences
- `GET /api/sequences` - Get all sequences for the current user
- `POST /api/sequences` - Create a new sequence
- `GET /api/sequences/:id` - Get a specific sequence
- `PUT /api/sequences/:id` - Update a sequence
- `DELETE /api/sequences/:id` - Delete a sequence

### Email Templates
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create a new template
- `GET /api/templates/:id` - Get a specific template
- `PUT /api/templates/:id` - Update a template
- `DELETE /api/templates/:id` - Delete a template

## Database Schema

### User
```javascript
{
  email: String,
  password: String,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Sequence
```javascript
{
  name: String,
  description: String,
  nodes: [Node],
  edges: [Edge],
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

### Template
```javascript
{
  name: String,
  subject: String,
  body: String,
  userId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## Job Scheduling

The application uses Agenda.js for scheduling email sequences. Jobs are stored in MongoDB and processed based on their scheduled time.

## Email Configuration

The application uses Nodemailer for sending emails. Configure your SMTP settings in the `.env` file:

```
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start development server:
```bash
npm run dev
```

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Error Handling

The application uses a centralized error handling middleware that:
- Logs errors to the console
- Sends appropriate error responses to the client
- Handles different types of errors (validation, authentication, etc.)

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- CORS is enabled for frontend communication
- Input validation is performed on all requests

## Testing

Run tests using:
```bash
npm test
```

## Dependencies

- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- nodemailer: Email sending
- agenda: Job scheduling
- cors: Cross-origin resource sharing
- dotenv: Environment variable management
