import { Router } from "express";
import { startProcess } from "../controllers/sequence.controller.js";
import { validateSequence } from "../middlewares/validate.js";

const router = Router();

router.route("/start-process").post(validateSequence, startProcess);

export default router;
