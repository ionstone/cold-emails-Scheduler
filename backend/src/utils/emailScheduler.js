import Sequence from "../models/sequence.model.js";
import { AppError } from "./AppError.js";
import { sequenceParserService } from "../services/sequenceParser.service.js";
import { jobSchedulerService } from "../services/jobScheduler.service.js";

// Function to schedule emails based on the sequence
export const scheduleEmails = async () => {
  try {
    const sequence = await Sequence.findOne();
    if (!sequence) {
      throw new AppError("No sequence found", 404);
    }

    const leadSourceNode = sequenceParserService.findLeadSourceNode(sequence.nodes);
    const recipientEmail = sequenceParserService.extractRecipientEmail(leadSourceNode);

    let totalDelay = 0;

    for (const node of sequence.nodes) {
      const emailData = sequenceParserService.parseEmailNode(node);
      if (emailData) {
        await jobSchedulerService.scheduleEmail(
          recipientEmail,
          emailData.subject,
          emailData.text,
          totalDelay
        );
        totalDelay += 5000; // 5 seconds between emails
      }

      const delay = sequenceParserService.parseDelayNode(node);
      if (delay) {
        totalDelay += delay;
      }
    }

    // Clean up the sequence after scheduling
    await Sequence.findByIdAndDelete(sequence._id);
  } catch (error) {
    console.error("Failed to schedule emails:", error);
    throw error;
  }
};
