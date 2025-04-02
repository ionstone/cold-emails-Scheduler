import Sequence from "../models/sequence.model.js";
import { AppError } from "../utils/AppError.js";
import { scheduleEmails } from "../utils/emailScheduler.js";

class SequenceService {
  async createSequence(nodes, edges) {
    try {
      const newSequence = new Sequence({ nodes, edges });
      await newSequence.save();
      return newSequence;
    } catch (error) {
      throw new AppError('Failed to create sequence', 500);
    }
  }

  async startEmailProcess(sequenceId) {
    try {
      await scheduleEmails();
      return true;
    } catch (error) {
      throw new AppError('Failed to schedule emails', 500);
    }
  }
}

export const sequenceService = new SequenceService(); 