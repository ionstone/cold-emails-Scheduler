import Agenda from "agenda";
import { AppError } from "../utils/AppError.js";
import { emailService } from "./email.service.js";

class JobSchedulerService {
  constructor() {
    this.agenda = new Agenda({
      db: { address: process.env.MONGODB_URI }
    });

    this.initializeJobs();
  }

  initializeJobs() {
    this.agenda.define("send email", async (job) => {
      try {
        const { to, subject, text } = job.attrs.data;
        await emailService.sendEmail({ to, subject, text });
      } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
      }
    });
  }

  async scheduleEmail(to, subject, text, delay) {
    try {
      await this.agenda.schedule(new Date(Date.now() + delay), "send email", {
        to,
        subject,
        text
      });
    } catch (error) {
      throw new AppError('Failed to schedule email', 500);
    }
  }

  async start() {
    try {
      await this.agenda.start();
    } catch (error) {
      throw new AppError('Failed to start job scheduler', 500);
    }
  }

  getAgenda() {
    return this.agenda;
  }
}

export const jobSchedulerService = new JobSchedulerService(); 