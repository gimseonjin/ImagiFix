import { Pageable } from '../../core/domain/pageable';
import { Author, Image } from '../domain/image';

export interface IFindImagesQuery extends Pageable {
  author?: Author;
}

export interface IDeleteImageQuery {
  imageId: string;
}

export const ImageRepositoryProviderKey = 'ImageRepository';

export interface ImageRepository {
  save({ image }: { image: Image }): Promise<Image>;
  findBy({ imageId }: { imageId: string }): Promise<Image>;
  findAllBy(query: IFindImagesQuery): Promise<{
    images: Image[];
    total: number;
    page: number;
    pageSize: number;
  }>;
  delete({ imageId }: IDeleteImageQuery): void;
}
