import { Injectable } from '@nestjs/common';
import { PrismaProvider } from './prisma.provider';
import { Image } from '../../image/domain/image';

@Injectable()
export class ImageRepositoryImpl {
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
}
