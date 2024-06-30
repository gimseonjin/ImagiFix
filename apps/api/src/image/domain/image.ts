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

type Author = {
  id: string;
  firstName?: string;
  lastName?: string;
  clerkId: string;
};

export class Image extends BaseAggregateRoot {
  public readonly title: string;
  public readonly author: Author;
  public readonly transformationType: string;
  public readonly publicId: string;
  public readonly secureURL: string;
  public readonly width?: number;
  public readonly height?: number;
  public readonly config?: object;
  public readonly transformationUrl?: string;
  public readonly aspectRatio?: string;
  public readonly color?: string;
  public readonly prompt?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

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
}
