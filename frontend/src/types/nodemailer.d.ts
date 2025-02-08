declare module 'nodemailer' {
    import { Transporter, SendMailOptions } from 'nodemailer';

    export function createTransport(options: any): Transporter;

    export interface Transporter {
        sendMail(mailOptions: SendMailOptions, callback?: (err: Error | null, info: any) => void): void;
        sendMail(mailOptions: SendMailOptions): Promise<any>;
    }

    export interface SendMailOptions {
        from?: string;
        to?: string;
        cc?: string;
        bcc?: string;
        subject?: string;
        text?: string;
        html?: string;
        attachments?: any[];
    }
}