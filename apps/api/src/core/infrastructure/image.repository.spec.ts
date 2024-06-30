import { Test, TestingModule } from '@nestjs/testing';
import { ImageRepositoryImpl } from './image.repository';
import { PrismaProvider } from './prisma.provider';
import { Image } from '../../image/domain/image';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryImpl } from './user.repository';
import { User } from '../../user/domain/user';

describe('ImageRepository', () => {
  let imageRepo: ImageRepositoryImpl;
  let userRepo: UserRepositoryImpl;
  let prismaProvider: PrismaProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
      ],
      providers: [ImageRepositoryImpl, PrismaProvider, UserRepositoryImpl],
    }).compile();

    imageRepo = module.get<ImageRepositoryImpl>(ImageRepositoryImpl);
    userRepo = module.get<UserRepositoryImpl>(UserRepositoryImpl);
    prismaProvider = module.get<PrismaProvider>(PrismaProvider);
  });

  it('should save an image correctly', async () => {
    const user = new User({
      id: 'author-id',
      clerkId: 'clerk-id',
      email: 'kim@naver.com',
      username: 'kim',
      firstName: 'kim',
      lastName: 'kerry',
      photo: 'new photo',
    });
    await userRepo.save({ user });

    const image = new Image({
      id: 'test-image-id',
      title: 'Test Image',
      transformationType: 'crop',
      publicId: 'public-id',
      secureURL: 'https://example.com/image.jpg',
      width: 800,
      height: 600,
      config: {},
      transformationUrl: 'https://example.com/transformation.jpg',
      aspectRatio: '4:3',
      color: 'red',
      prompt: 'test prompt',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        id: 'author-id',
        clerkId: 'clerk-id',
      },
    });

    await imageRepo.save({ image });

    const savedImage = await prismaProvider.image.findFirst({
      where: { id: 'test-image-id' },
    });
    expect(savedImage).not.toBeNull();
  });
});
