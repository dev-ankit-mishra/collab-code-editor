import { Router } from "express";
import { sendContactMessage } from "../models/Contact.controller.js";

const router = Router();

router.post("/", sendContactMessage);

export default router;
