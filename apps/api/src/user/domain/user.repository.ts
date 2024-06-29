import { User } from './user';

export const UserRepositoryProviderKey = 'UserRepository';

export interface ISaveUser {
  user: User;
}

export default interface UserRepository {
  save(props: ISaveUser): Promise<User>;
  findBy(props: { userId: string }): Promise<User>;
}
