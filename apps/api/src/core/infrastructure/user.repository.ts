import UserRepository, { ISaveUser } from './../../user/domain/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaProvider: PrismaProvider) {}

  async save(props: ISaveUser) {
    const { user } = props;

    await this.prismaProvider.user.upsert({
      where: { id: user.id },
      update: {
        clerkId: user.props.clerkId,
        email: user.props.email,
        username: user.props.username,
        photo: user.props.photo,
        firstName: user.props.firstName,
        lastName: user.props.lastName,
        planId: user.props.planId,
        creditBalance: user.props.creditBalance,
        // 이 부분은 나중에 image & transaction 생기면 추가 구현
        // images: {
        //   create: user.props.images.map(image => ({
        //     url: image.url,
        //   })),
        // },
        // transactions: {
        //   create: user.props.transactions.map(transaction => ({
        //     amount: transaction.amount,
        //     date: transaction.date,
        //   })),
        // },
      },
      create: {
        id: user.id,
        clerkId: user.props.clerkId,
        email: user.props.email,
        username: user.props.username,
        photo: user.props.photo,
        firstName: user.props.firstName,
        lastName: user.props.lastName,
        planId: user.props.planId,
        creditBalance: user.props.creditBalance,
      },
    });

    return user;
  }
}
