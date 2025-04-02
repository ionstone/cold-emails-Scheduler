import { asyncHandler } from "../utils/asyncHandler.js";
import { sequenceService } from "../services/sequence.service.js";
import { ResponseHandler } from "../utils/responseHandler.js";

const startProcess = asyncHandler(async (req, res) => {
  const { nodes, edges } = req.body;
  
  const sequence = await sequenceService.createSequence(nodes, edges);
  await sequenceService.startEmailProcess(sequence._id);
  
  ResponseHandler.success(res, sequence, "Sequence saved and emails scheduled");
});

export { startProcess };
