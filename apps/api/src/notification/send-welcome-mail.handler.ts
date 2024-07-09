import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../user/domain/user-created.event';
import { EmailOptions, MailSender } from '../core/infrastructure/mail.sender';
import Logger from '../core/logger';

@EventsHandler(UserCreatedEvent)
export class SendWelcomeEmailHandler
  implements IEventHandler<UserCreatedEvent>
{
  constructor(
    private readonly mailSender: MailSender,
  ) {}

  async handle(event: UserCreatedEvent) {
    const { email, username, createdAt } = event.payload;
    const welcomeEmail = this.buildWelcomeEmail(email, username, createdAt);
    await this.mailSender.send({ mailOption: welcomeEmail });
  }

  private buildWelcomeEmail(
    email: string,
    username: string,
    createdAt: Date,
  ): EmailOptions {
    return {
      to: email,
      subject: 'Welcome to ImageFix!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #dddddd; border-radius: 10px; background-color: #f9f9f9;">
          <h1 style="color: #333333;">Welcome, ${username}!</h1>
          <p style="font-size: 16px; color: #666666;">
            We are thrilled to have you join <strong>ImageFix</strong>, the leading SaaS platform for fixing images with AI.
          </p>
          <p style="font-size: 16px; color: #666666;">
            Your account was successfully created on <strong>${createdAt.toISOString()}</strong>.
          </p>
          <p style="font-size: 16px; color: #666666;">
            Start exploring the amazing features we offer to enhance and fix your images effortlessly.
          </p>
          <p style="font-size: 14px; color: #999999;">
            Best regards,<br>
            The ImageFix Team
          </p>
        </div>
      `,
    };
  }
}
