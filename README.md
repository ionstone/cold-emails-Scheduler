# Cold Emails Scheduler

A full-stack application for scheduling and automating cold email sequences. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User authentication and authorization
- Email sequence creation and management
- Drag-and-drop email sequence builder
- Automated email scheduling
- Email template management
- Real-time sequence visualization

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Agenda.js for job scheduling
- Nodemailer for email handling

### Frontend
- React.js with Vite
- TailwindCSS for styling
- React Flow for sequence visualization
- React Router for navigation
- Axios for API communication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- SMTP server credentials for sending emails

## Project Structure

```
cold-emails-Scheduler/
├── frontend/          # React frontend application
├── backend/          # Node.js backend server
└── README.md         # This file
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd cold-emails-Scheduler
```

2. Set up the backend:
```bash
cd backend
npm install
cp .env.example .env  # Create and configure your environment variables
```

3. Set up the frontend:
```bash
cd frontend
npm install
cp .env.example .env  # Create and configure your environment variables
```

4. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
