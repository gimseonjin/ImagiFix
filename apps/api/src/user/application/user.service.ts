import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { EventPublisher } from '@nestjs/cqrs';
import { ICreateUser, IDecreasCreditBalance, IGetUser, IUpdateUser } from './user.interface';
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
    const user = this.publisher.mergeObjectContext(new User(props));
    user.create();
    this.userRepo.save({ user });
  }

  async getUser(props: IGetUser) {
    const { userId } = props;
    const user = await this.userRepo.findBy({ userId });
    return user ? this.publisher.mergeObjectContext(user) : null;
  }

  async update(props: IUpdateUser) {
    const { userId } = props;
    const user = await this.getUser({ userId });

    if (!user) throw new UserNotFoundError(userId);

    user.update(props);
    return this.userRepo.save({ user });
  }

  async delete(props: IGetUser) {
    const { userId } = props;
    const user = await this.getUser({ userId });

    if (!user) return;

    user.delete();
    this.userRepo.delete({ user });
  }

  async decreaseCreditBalance(props: IDecreasCreditBalance) {
    const { userId, amount } = props;
    const user = await this.getUser({ userId });

    if (!user) throw new UserNotFoundError(userId);

    user.decreaseCreditBalance(amount);
    return this.userRepo.save({ user });
  }
}
