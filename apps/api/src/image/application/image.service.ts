import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { IAddImage, IGetImage, IGetUserImages } from './image.interface';
import { Image } from '../domain/image';
import {
  ImageRepositoryProviderKey,
  ImageRepository,
} from '../domain/image.repository';
import { Pageable } from '../../core/domain/pageable';

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

  async getAllImages({ page, pageSize }: Pageable) {
    return this.imageRepo.findAllBy({ page, pageSize });
  }

  async getUserImages({ author, page, pageSize }: IGetUserImages) {
    return this.imageRepo.findAllBy({ author, page, pageSize });
  }
}
