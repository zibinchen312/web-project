import axios from "axios";

const API_URL = process.env.NODE_ENV === "production"
? "https://web-project-backend-psi.vercel.app"
: "http://localhost:3001";

const API = axios.create({
    baseURL: API_URL,
});

export type SendMessageResponse = {
    success: boolean;
    message?: string;
    error?: string;
};

export const sendMessage = async (
    name: string,
    email: string,
    message: string
): Promise<SendMessageResponse> => {
    try {
        const response = await API.post(`/api/messages/send`, { name, email, message });
        console.log('Send message response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        } else {
            return { success: false, error: "Failed to send message due to an unknown error" };
        }
    }  
};

export type LoginResponse = {
    success: boolean;
    message?: string;
    error?: string;
    token?: string; 
};

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await API.post('/api/users/login', { username, password });
        console.log('Login response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        } else {
            return { success: false, error: "Failed to log in due to an unknown error" };
        }
    }
};

export type Article = {
    id: number;
    title: string;
    author: string;
    content: string;
    image_url?: string;
};

export const getArticles = async (): Promise<Article[]> => {
    try {
        const response = await API.get('/api/articles');
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};

export const createArticle = async (title: string, author: string, content: string, image_url?: string): Promise<Article> => {
    try {
        const response = await API.post('/api/articles', { title, author, content, image_url });
        return response.data;
    } catch (error) {
        console.error("Error creating article:", error);
        throw error;
    }
};

export const updateArticle = async (id: number, title: string, author: string, content: string, image_url?: string): Promise<Article> => {
    try {
        const response = await API.put(`/api/articles/${id}`, { title, author, content, image_url });
        return response.data;
    } catch (error) {
        console.error('Error updating article:', error);
        throw error;
    }
};

export const deleteArticle = async (id: number): Promise<void> => {
    try {
        await API.delete(`/api/articles/${id}`);
    } catch (error) {
        console.error("Error deleting article:", error);
    }
};

// Add the uploadImage function
export const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await API.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.url;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};