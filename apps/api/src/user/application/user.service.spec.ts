import { TestBed } from '@automock/jest';
import UserService from './user.service';
import UserRepository, {
  UserRepositoryProviderKey,
} from '../domain/user.repository';
import { UserNotFoundError } from './user.error';

describe('UserService', () => {
  let svc: UserService;
  let userRepo: jest.Mocked<UserRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(UserService).compile();

    svc = unit;
    userRepo = unitRef.get(UserRepositoryProviderKey);
  });

  describe('update', () => {
    it('should throw UserNotFoundError if user does not exist', async () => {
      const updateProps = {
        userId: 'id',
        username: 'kerry',
        firstName: 'kim',
        lastName: 'kerry',
        photo: 'new photo',
      };

      userRepo.findBy.mockResolvedValue(null);

      await expect(svc.update(updateProps)).rejects.toThrow(UserNotFoundError);
    });
  });
});
