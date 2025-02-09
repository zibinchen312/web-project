// src/routes/messagesRoute.ts
import { Router, Request, Response } from 'express';
import { addMessage } from '../controllers/messageController';

const router = Router();

router.post('/send', addMessage);

export default router;