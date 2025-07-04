import express, { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

// Create a new article
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, author, content, image, uuid } = req.body;

        console.log('Received request to create article:', {
            title,
            author,
            content,
            image,
            uuid,
        }); // Log the request body

        const { data, error } = await supabase.from('articles').insert([
            { title, author, content, image, uuid },
        ]);

        if (error) {
            console.error('Supabase insert error:', error);
            res.status(400).json({ error: error.message });
        } else {
            console.log('Article created successfully:', data);
            res.status(201).json(data);
        }
    } catch (error: any) {
        console.error('Error in article creation route:', error);
        res.status(500).json({ error: 'Internal server error' });
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
    try {
        const id = req.params.id;
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            res.status(400).json({ error: "Invalid article ID" });
            return; // Exit early
        }

        console.log(`Fetching article with ID: ${parsedId}`);

        const { data, error } = await supabase
            .from('articles')
            .select()
            .eq('id', parsedId)
            .single();

        if (error) {
            console.error('Error fetching article:', error);
            res.status(500).json({ error: "Internal server error" });
            return; // Exit early
        }

        if (!data) {
            console.log(`Article with ID ${parsedId} not found.`);
            res.status(404).json({ error: `Article with ID ${parsedId} not found` });
            return; // Exit early
        }

        console.log('Article fetched successfully:', data);
        res.json(data);
    } catch (error) {
        console.error("Server error", error);
        res.status(500).json({error: "Internal server error"});
    }
});

// Update article
router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, content, image } = req.body;
    const { error } = await supabase.from('articles').update({ title, author, content, image }).eq('id', id);
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