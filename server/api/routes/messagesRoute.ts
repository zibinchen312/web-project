import { Router } from 'express';
import { addMessage } from '../controllers/messageController';

const router = Router();

// Log incoming requests and pass to controller
router.post('/send', (req, res, next) => {
    console.log('Incoming request:', req.body);
    next();
}, addMessage);

export default router;