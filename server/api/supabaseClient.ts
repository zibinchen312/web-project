import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Missing Supabase URL or Key');
};

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const createBucket = async (bucketName: string, isPublic: boolean): Promise<void> => {
    try {
        // Check if the bucket exists
        const { data: bucketList, error: listError } = await supabase.storage.listBuckets();
        if (listError) {
            throw listError;
        }

        const bucketExists = bucketList?.some((bucket) => bucket.name === bucketName);

        if (bucketExists) {
            console.log(`Bucket "${bucketName}" already exists`);
        } else {
            // Create the bucket if it doesn't exist
            const { error: createError } = await supabase.storage.createBucket(bucketName, {
                public: isPublic
            });

            if (createError) {
                console.error('Error creating bucket:', createError);
            } else {
                console.log(`Bucket "${bucketName}" created successfully`);
            }
        }
    } catch (error) {
        console.error('Error creating or checking bucket:', error);
    }
};

export default supabase;