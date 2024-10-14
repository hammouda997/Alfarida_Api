import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type FeaturedDocument = Featured & mongoose.Document;

@Schema({ timestamps: true })
export class Featured {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  buttonText: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: false })
  heading?: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ required: false })
  discoverLink?: string;
}

export const FeaturedSchema = SchemaFactory.createForClass(Featured);
