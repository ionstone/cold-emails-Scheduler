export const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000','https://coldemailschedulerbackend.netlify.app','https://coldemailschedule.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}; 