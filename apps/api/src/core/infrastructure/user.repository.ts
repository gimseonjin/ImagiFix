import UserRepository, { ISaveUser } from './../../user/domain/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';
import { User } from './../..//user/domain/user';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaProvider: PrismaProvider) {}

  async save(props: ISaveUser) {
    const { user } = props;

    await this.prismaProvider.user.upsert({
      where: { id: user.id },
      update: {
        clerkId: user.clerkId,
        email: user.email,
        username: user.username,
        photo: user.photo,
        firstName: user.firstName,
        lastName: user.lastName,
        planId: user.planId,
        creditBalance: user.creditBalance,
      },
      create: {
        id: user.id,
        clerkId: user.clerkId,
        email: user.email,
        username: user.username,
        photo: user.photo,
        firstName: user.firstName,
        lastName: user.lastName,
        planId: user.planId,
        creditBalance: user.creditBalance,
      },
    });

    return user;
  }

  async findBy(props: { userId: string }): Promise<User> {
    const { userId } = props;
    const userEntity = await this.prismaProvider.user.findFirst({
      where: { clerkId: userId },
    });
    return new User(userEntity);
  }

  async delete(props: { user: User }) {
    const { user } = props;
    await this.prismaProvider.user.delete({
      where: { id: user.id },
    });
  }
}
