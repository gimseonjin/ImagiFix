import { Image } from '../domain/image';

export const ImageRepositoryProviderKey = 'ImageRepository';

export interface ImageRepository {
  save({ image }: { image: Image }): Promise<Image>;
}
