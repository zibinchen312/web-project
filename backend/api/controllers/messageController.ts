import { Request, Response } from 'express';
import supabase from '../postgresClient';

export const addMessage = async (req: Request, res: Response): Promise<any> => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { data, error } = await supabase.from('messages').insert([
            {
                name,
                email,
                message,
                created_at: new Date(),
            },
        ]);

        if (error) {
            console.error('Error sending message:', error);
            return res.status(500).json({ error: error.message });
        }
        
        console.log('Message inserted successfully:', data);
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json({ error: 'Failed to send message due to an unknown error' });
        }
    }
};