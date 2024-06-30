import { Pageable } from '../../core/domain/pageable';
import { Image } from '../domain/image';

export const ImageRepositoryProviderKey = 'ImageRepository';

export interface ImageRepository {
  save({ image }: { image: Image }): Promise<Image>;
  findBy({ imageId }: { imageId: string }): Promise<Image>;
  findAll({ page, pageSize }: Pageable): Promise<{
    images: Image[];
    total: number;
    page: number;
    pageSize: number;
  }>;
}
