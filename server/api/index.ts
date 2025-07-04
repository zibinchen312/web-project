import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import userRoutes from './routes/userRoute';
import articleRoutes from "./routes/articlesRoute";
import messagesRoutes from './routes/messagesRoute';
import uploadImageRoutes from './routes/uploadImageRoute';
import { createBucket } from './supabaseClient';

declare global {
    var onlineUsers: Map<string, string>;
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

// Create a new bucket when the app starts
const bucketName = 'images';
const isPublic = false;

createBucket(bucketName, isPublic);

// Set up Socket.io
const httpServer: Server = require('http').createServer(app);
const io = new SocketIOServer(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    }
})

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

// Mount API routes
app.use('/api/messages', messagesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/upload', uploadImageRoutes);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});