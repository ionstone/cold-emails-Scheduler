import { AppError } from "../utils/AppError.js";

class SequenceParserService {
  findLeadSourceNode(nodes) {
    const leadSourceNode = nodes.find((n) =>
      n.data.label.startsWith("Lead-Source")
    );

    if (!leadSourceNode) {
      throw new AppError("No Lead-Source node found in sequence", 400);
    }

    return leadSourceNode;
  }

  extractRecipientEmail(leadSourceNode) {
    const emailMatch = leadSourceNode?.data?.label?.match(/\(([^)]+)\)/);
    if (!emailMatch) {
      throw new AppError("Invalid email format in Lead-Source node", 400);
    }
    return emailMatch[1];
  }

  parseEmailNode(node) {
    if (!node.data.label.startsWith("Cold-Email")) {
      return null;
    }

    const subjectMatch = node.data.label.match(/\(([^)]+)\)/);
    const text = node.data.label.split(") ")[1] || "";

    if (!subjectMatch) {
      throw new AppError("Invalid subject format in Cold-Email node", 400);
    }

    return {
      subject: subjectMatch[1],
      text
    };
  }

  parseDelayNode(node) {
    if (!node.data.label.startsWith("Wait/Delay")) {
      return null;
    }

    const delayMatch = node.data.label.match(/\((\d+)\s*min\)/);
    if (!delayMatch) {
      throw new AppError("Invalid delay format in Wait/Delay node", 400);
    }

    return parseInt(delayMatch[1], 10) * 60 * 1000; // Convert minutes to milliseconds
  }
}

export const sequenceParserService = new SequenceParserService(); 