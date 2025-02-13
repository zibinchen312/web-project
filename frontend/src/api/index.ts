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