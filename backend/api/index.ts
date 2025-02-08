import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import sendMessageHandler from './send-message';

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Endpoint to handle form submissions
app.post('/api/send-message', (req: Request, res: Response) => {
    sendMessageHandler(req as any, res as any);
});

// Catch-all route to serve the frontend index.html
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});