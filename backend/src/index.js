import dotenv from "dotenv";
import { app } from "./app.js";
import connectToDB from "./db/index.js";
import { jobSchedulerService } from "./services/jobScheduler.service.js";

// Load environment variables
dotenv.config({ path: "./.env" });

console.log('Starting server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);
console.log('Origin:', process.env.ORIGIN);

// Connect to MongoDB
connectToDB()
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Start the server
    const server = app.listen(process.env.PORT, "0.0.0.0", () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
      console.log('Available routes:');
      console.log('- POST /api/auth/register');
      console.log('- POST /api/auth/login');
      console.log('- GET /api/sequence/*');
    });

    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
    });

    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

// Start agenda scheduler
const agenda = jobSchedulerService.getAgenda();
agenda.on("ready", () => {
  console.log('Agenda scheduler is ready');
  jobSchedulerService.start();
});
