export class ImageNotFoundError extends Error {
  constructor(userId: string) {
    super(`Image with ID ${userId} not found`);
    this.name = 'ImageNotFoundError';
  }
}
