import express from "express";
import { welcomeMessage } from "../Controllers/Practice.Controllers.js";

const router = express.Router();

router.get("/welcomeMessage", welcomeMessage);

export default router;
