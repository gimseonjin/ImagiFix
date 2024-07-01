import { WebhookEvent } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Webhook } from 'svix';

@Injectable()
export class SvixWebhookGuard implements CanActivate {
  private webhookSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.webhookSecret = this.configService.get<string>('WEBHOOK_SECRET');
    if (!this.webhookSecret) {
      throw new HttpException(
        'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const svix_id = request.headers['svix-id'] as string;
    const svix_timestamp = request.headers['svix-timestamp'] as string;
    const svix_signature = request.headers['svix-signature'] as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new HttpException(
        'Error occurred -- no svix headers',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = request.body;
    const body = JSON.stringify(payload);

    const wh = new Webhook(this.webhookSecret);

    try {
      const evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
      request['webhookEvent'] = evt;
      return true;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      throw new HttpException('Error occurred', HttpStatus.BAD_REQUEST);
    }
  }
}
