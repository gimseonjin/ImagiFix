import { Injectable } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';
import { Author, Image } from '../../image/domain/image';
import { ImageRepository } from '../../image/domain/image.repository';
import { Pageable } from '../domain/pageable';

@Injectable()
export class ImageRepositoryImpl implements ImageRepository {
  constructor(private readonly prismaProvider: PrismaProvider) {}

  async save(props: { image: Image }) {
    const { image } = props;

    await this.prismaProvider.image.upsert({
      where: { id: image.id },
      update: {
        title: image.title,
        transformationType: image.transformationType,
        publicId: image.publicId,
        secureURL: image.secureURL,
        width: image.width,
        height: image.height,
        config: image.config,
        transformationUrl: image.transformationUrl,
        aspectRatio: image.aspectRatio,
        color: image.color,
        prompt: image.prompt,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      },
      create: {
        id: image.id,
        title: image.title,
        transformationType: image.transformationType,
        publicId: image.publicId,
        secureURL: image.secureURL,
        width: image.width,
        height: image.height,
        config: image.config,
        transformationUrl: image.transformationUrl,
        aspectRatio: image.aspectRatio,
        color: image.color,
        prompt: image.prompt,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
        authorId: image.author.id,
      },
    });

    return image;
  }

  async findBy({ imageId }: { imageId: string }) {
    const image = await this.prismaProvider.image.findFirst({
      where: { id: imageId },
      include: {
        author: true,
      },
    });

    return new Image({
      ...image,
      config: image.config as object,
    });
  }

  async findAllBy({ author, page, pageSize }: { author?: Author } & Pageable) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where = author ? { authorId: author.id } : {};

    const [images, totalImages] = await Promise.all([
      this.prismaProvider.image.findMany({
        skip,
        take,
        where,
        include: {
          author: true,
        },
      }),
      this.prismaProvider.image.count({ where }),
    ]);

    return {
      images: images.map(
        (image) =>
          new Image({
            ...image,
            config: image.config as object,
          }),
      ),
      total: totalImages,
      page,
      pageSize,
    };
  }
}
