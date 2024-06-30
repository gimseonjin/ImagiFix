import { User } from '../../user/domain/user';

export interface IAddImage {
  createImageProps: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  author: User;
}

export interface IGetImage {
  imageId: string;
}

export interface IGetUserImages {
  author: User;
  page: number;
  pageSize: number;
}

export interface IUpdateImage {
  updateImageProps: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  imageId: string;
}
