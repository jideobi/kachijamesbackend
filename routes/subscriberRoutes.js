import express from "express";
import { subscribeUser, getAllSubscribers } from "../controllers/subscriberController.js";

const router = express.Router();

// POST /api/subscribe
router.post("/subscribe", subscribeUser);

// GET /api/subscribers
router.get("/subscribers", getAllSubscribers);


export default router;