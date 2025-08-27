export interface IEmailService{
    sendOtp(to: string, subject: string, text: string, html?: string): Promise<void>;
};
