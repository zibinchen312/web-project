import 'dotenv/config';
import express from 'express';
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

const app = express();
require("dotenv").config();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://web-project-kappa-sepia.vercel.app',
        'https://web-project-frontend-zibin-chens-projects.vercel.app',
        'https://web-project-frontend-zibinchen312-zibin-chens-projects.vercel.app'
    ],
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'], // Allow the HTTP verbs the frontend will be using
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow the headers the frontend will be sending
    credentials: true,
}));

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'req.headers.origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

// Middleware for parsing requests
app.use(bodyParser.json({ limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Mount API routes
//app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

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
            'https://web-project-kappa-sepia.vercel.app/',
            'https://web-project-frontend-zibin-chens-projects.vercel.app/',
            'https://web-project-frontend-zibinchen312-zibin-chens-projects.vercel.app/'
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