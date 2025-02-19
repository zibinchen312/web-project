import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Create a new article
router.post('/', async (req: Request, res: Response) => {
    const { title, author, content, image_url } = req.body;
    const { data, error } = await supabase.from('articles').insert([
        { title, author, content, image_url }
    ]);
    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(201).json(data);
    }
});

// Get all articles
router.get('/', async (req: Request, res: Response) => {
    const { data, error } = await supabase.from('articles').select();
    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.json(data);
    }
});

// Get article by ID
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('articles').select().eq('id', id).single();
    if (error) {
        res.status(404).json({ error: error.message });
    } else {
        res.json(data);
    }
});

// Update article
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, content, image_url } = req.body;
    const { error } = await supabase.from('articles').update({ title, author, content, image_url }).eq('id', id);
    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(200).send('Article updated successfully');
    }
});

// Delete article
router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
        res.status(400).json({ error: error.message });
    } else {
        res.status(200).send('Article deleted successfully');
    }
});

export default router;