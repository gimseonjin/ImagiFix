import { Injectable } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';
import { Image } from '../../image/domain/image';
import { ImageRepository } from '../../image/domain/image.repository';

@Injectable()
export class ImageRepositoryImpl implements ImageRepository {
  constructor(private readonly prismaProvier: PrismaProvider) {}

  async save(props: { image: Image }) {
    const { image } = props;

    await this.prismaProvier.image.upsert({
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
    const image = await this.prismaProvier.image.findFirst({
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
}
