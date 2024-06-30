import { BaseAggregateRoot } from '../../core/domain/base-aggregate-root';
import { ImageCreatedEvent } from './image-created.event';

type CreateImageProps = {
  id?: string;
  author: Author;
  title: string;
  publicId: string;
  transformationType: string;
  width?: number;
  height?: number;
  config?: object;
  secureURL: string;
  transformationUrl?: string;
  aspectRatio?: string;
  prompt?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type UpdateImageProps = {
  title: string;
  publicId: string;
  transformationType: string;
  width?: number;
  height?: number;
  config?: object;
  secureURL: string;
  transformationUrl?: string;
  aspectRatio?: string;
  prompt?: string;
  color?: string;
};

export type Author = {
  id: string;
  firstName?: string;
  lastName?: string;
  clerkId: string;
};

export class Image extends BaseAggregateRoot {
  public readonly author: Author;
  public readonly transformationUrl?: string;
  public readonly aspectRatio?: string;
  public readonly color?: string;
  public readonly prompt?: string;
  public readonly createdAt: Date;
  public title: string;
  public publicId: string;
  public transformationType: string;
  public secureURL: string;
  public width?: number;
  public height?: number;
  public config?: object;
  public updatedAt: Date;

  constructor(props: CreateImageProps) {
    super(props.id);
    this.author = props.author;
    this.title = props.title;
    this.transformationType = props.transformationType;
    this.publicId = props.publicId;
    this.secureURL = props.secureURL;
    this.width = props.width;
    this.height = props.height;
    this.config = props.config;
    this.transformationUrl = props.transformationUrl;
    this.aspectRatio = props.aspectRatio;
    this.color = props.color;
    this.prompt = props.prompt;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  create() {
    this.apply(new ImageCreatedEvent({ image: this }));
  }

  update(props: UpdateImageProps) {
    this.title = props.title;
    this.publicId = props.publicId;
    this.transformationType = props.transformationType;
    this.secureURL = props.secureURL;
    this.width = props.width;
    this.height = props.height;
    this.config = props.config;
    this.updatedAt = new Date();
  }
}
