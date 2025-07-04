import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req: Request, res: Response):Promise<any> => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `images/${fileName}`;

    console.log('Uploaded file:', req.file);

    const { error } = await supabase.storage.from('images').upload(filePath, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype,
    });

    if (error) {
        console.error('Supabase upload error:', error);
        console.log('Detected MIME type:', file.mimetype);
        return res.status(500).json({ error: error.message });
    }

    try {
        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    
        if (!data || !data.publicUrl) {
            console.error('Public URL is undefined or data is missing.');
            return res.status(500).json({ error: 'Public URL is undefined' });
        }
    
        const publicUrl = data.publicUrl;
    
        console.log('Generated public URL:', publicUrl);
    
        res.json({ url: publicUrl });
    } catch (error) {
        console.error('Error generating public URL:', error);
        res.status(500).json({ error: 'Error generating public URL' });
    }
});

export default router;