import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { EventPublisher } from '@nestjs/cqrs';
import { ICreateUser, IGetUser, IUpdateUser } from './user.interface';
import UserRepository, {
  UserRepositoryProviderKey,
} from '../domain/user.repository';
import { UserNotFoundError } from './user.error';

@Injectable()
export default class UserService {
  constructor(
    @Inject(UserRepositoryProviderKey)
    private readonly userRepo: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async create(props: ICreateUser) {
    const userModel = this.publisher.mergeClassContext(User);
    const user = new userModel(props);
    this.userRepo.save({ user });
  }

  async getUser(props: IGetUser) {
    const { userId } = props;
    return this.publisher.mergeObjectContext(
      await this.userRepo.findBy({ userId }),
    );
  }

  async update(props: IUpdateUser) {
    const { userId } = props;
    const user = this.publisher.mergeObjectContext(
      await this.userRepo.findBy({ userId }),
    );

    if (!user) throw new UserNotFoundError(userId);

    user.update(props);
    return user;
  }
}