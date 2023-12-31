import { EmailService } from '../domain/emailService';

export class EmailApplicationService {
  constructor(private emailService: EmailService) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    
    await this.emailService.sendEmail(to, subject, text);

  }
}