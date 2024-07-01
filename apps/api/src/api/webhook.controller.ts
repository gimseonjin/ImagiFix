import {
  Controller,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserJSON, WebhookEvent, clerkClient } from '@clerk/clerk-sdk-node';
import { Webhook } from './decorator/webhook.decorator';
import { SvixWebhookGuard } from './guard/svix-webhook.guard';
import UserService from 'src/user/application/user.service';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly userService: UserService) {}

  @Post('clerk')
  @UseGuards(SvixWebhookGuard)
  async handleWebhook(@Webhook() webhook: WebhookEvent) {
    const eventType = webhook.type;

    const handlers = {
      'user.created': this.handleUserCreated.bind(this),
      'user.updated': this.handleUserUpdated.bind(this),
      'user.deleted': this.handleUserDeleted.bind(this),
    };

    const handler = handlers[eventType];

    if (!handler) {
      return { status: 'Unhandled event type' };
    }

    try {
      return await handler(webhook);
    } catch (error) {
      console.error('Error processing event:', error);
      throw new HttpException(
        'Error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async handleUserCreated(webhook: WebhookEvent) {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      webhook.data as UserJSON;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await this.userService.create(user);

    return { message: 'OK', user: newUser };
  }

  private async handleUserUpdated(webhook: WebhookEvent) {
    const { id, image_url, first_name, last_name, username } =
      webhook.data as UserJSON;

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    };

    const updatedUser = await this.userService.update({
      userId: id,
      ...user,
    });

    return { message: 'OK', user: updatedUser };
  }

  private async handleUserDeleted(webhook: WebhookEvent) {
    const { id } = webhook.data;

    const deletedUser = await this.userService.delete({ userId: id });

    return { message: 'OK', user: deletedUser };
  }
}
