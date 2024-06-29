import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { EventPublisher } from '@nestjs/cqrs';
import { ICreateUser } from './user.interface';
import UserRepository, {
  UserRepositoryProviderKey,
} from '../domain/user.repository';

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
}
