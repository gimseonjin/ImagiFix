import { Controller, Delete, Get, Param } from '@nestjs/common';
import ImageService from 'src/image/application/image.service';

@Controller('images')
export default class ImageController {
  constructor(private readonly imageSvc: ImageService) {}

  @Get(':id')
  async getImageById(@Param('id') imageId: string) {
    const image = await this.imageSvc.getImage({ imageId });
    return { image };
  }

  @Delete(':id')
  async deleteImage(@Param('id') imageId: string) {
    await this.imageSvc.deleteImage({ imageId });
    return { message: 'Image deleted successfully' };
  }
}
