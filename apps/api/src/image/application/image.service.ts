import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IAddImage, IGetImage } from './image.interface';
import { Image } from '../domain/image';
import {
  ImageRepositoryProviderKey,
  ImageRepository,
} from '../domain/image.repository';

@Injectable()
export default class ImageService {
  constructor(
    @Inject(ImageRepositoryProviderKey)
    private readonly imageRepo: ImageRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async addImage(props: IAddImage) {
    const { createImageProps, author } = props;
    const image = this.publisher.mergeObjectContext(
      new Image({ ...createImageProps, author }),
    );
    image.create();
    this.imageRepo.save({ image });
  }

  async getImage(props: IGetImage) {
    const { imageId } = props;
    return this.publisher.mergeObjectContext(
      await this.imageRepo.findBy({ imageId }),
    );
  }
}
