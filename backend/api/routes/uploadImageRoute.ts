import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';
import multer from 'multer';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req: Request, res: Response):Promise<any> => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = `images/${fileName}`;

    const { error } = await supabase.storage.from('images').upload(filePath, file.buffer, {
        cacheControl: '3600',
        upsert: false,
    });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    const publicUrl = data.publicUrl;
    res.json({ url: publicUrl });
});

export default router;