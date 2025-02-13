import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
//import userRoutes from './routes/userRouts';
import messagesRoutes from './routes/messagesRoute';
const socket = require('socket.io');

declare global {
    var onlineUsers: any;
    var chatSocket: any;
}

const allowedOrigins = [
    'http://localhost:3000',
    'https://web-project-kappa-sepia.vercel.app',
    'https://web-project-frontend-zibin-chens-projects.vercel.app',
    'https://web-project-frontend-zibinchen312-zibin-chens-projects.vercel.app'
];

const app = express();

// Middleware
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], 
    allowedHeaders: [
        'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 
        'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'
    ],
    credentials: true,
}));

// Middleware for parsing requests
app.use(bodyParser.json({ limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

// Mount API routes
//app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Connect to Supabase
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        console.log('Authenticated via Supabase');
    } else {
        console.log("Not authenticated via Supabase");
    }
});

// Set up Socket.io
const server = app.listen(process.env.PORT, () => { 
    console.log(`Server running on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://web-project-kappa-sepia.vercel.app',
            'https://web-project-frontend-zibin-chens-projects.vercel.app',
            'https://web-project-frontend-zibinchen312-zibin-chens-projects.vercel.app'
        ],
        credentials: true,
    },
});

global.onlineUsers = new Map<string, string>();

io.on('connection', (socket: any) => {
    global.chatSocket = socket;
    socket.on('add-user', (userId: string) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on('send-msg', (data: { to: string; message: string}) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('receive-msg', data.message);
        }
    });
});