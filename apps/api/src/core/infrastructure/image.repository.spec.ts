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

  afterEach(async () => {
    await prismaProvider.image.deleteMany();
    await prismaProvider.user.deleteMany();
  });

  it('should save an image correctly', async () => {
    const user = createUser();
    await userRepo.save({ user });

    const image = createImage('test-image-id', 'author-id');
    await imageRepo.save({ image });

    const savedImage = await prismaProvider.image.findFirst({
      where: { id: 'test-image-id' },
    });
    expect(savedImage).not.toBeNull();
  });

  it('should find all images with pagination', async () => {
    const user = createUser();
    await userRepo.save({ user });

    const images = [
      createImage('test-image-id-1', 'author-id'),
      createImage('test-image-id-2', 'author-id'),
    ];

    for (const image of images) {
      await imageRepo.save({ image });
    }

    const page = 1;
    const pageSize = 1;
    const result = await imageRepo.findAllBy({ page, pageSize, author: user });

    expect(result.images.length).toBe(pageSize);
    expect(result.total).toBe(images.length);
    expect(result.page).toBe(page);
    expect(result.pageSize).toBe(pageSize);
    expect(result.images[0].author.id).toBe('author-id');
  });

  it('should find all images by author', async () => {
    const user1 = createUser(
      'author-id-1',
      'clerk-id-1',
      'author1@naver.com',
      'author1',
    );
    await userRepo.save({ user: user1 });

    const user2 = createUser(
      'author-id-2',
      'clerk-id-2',
      'author2@naver.com',
      'author2',
    );
    await userRepo.save({ user: user2 });

    const images = [
      createImage('test-image-id-1', 'author-id-1'),
      createImage('test-image-id-2', 'author-id-2'),
    ];

    for (const image of images) {
      await imageRepo.save({ image });
    }

    const result = await imageRepo.findAllBy({
      page: 1,
      pageSize: 10,
      author: user1,
    });

    expect(result.images.length).toBe(1);
    expect(result.total).toBe(1);
    expect(result.images[0].author.id).toBe('author-id-1');
  });

  function createUser(
    id = 'author-id',
    clerkId = 'clerk-id',
    email = 'kim@naver.com',
    username = 'kim',
  ): User {
    return new User({
      id,
      clerkId,
      email,
      username,
      firstName: 'kim',
      lastName: 'kerry',
      photo: 'new photo',
    });
  }

  function createImage(id: string, authorId: string): Image {
    return new Image({
      id,
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
        id: authorId,
        clerkId: 'clerk-id',
      },
    });
  }
});
