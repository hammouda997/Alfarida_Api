import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    default: null,
  })
  user: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  category: string[]; 
  @Prop({ required: true })
  tags: string[]; 

  @Prop({ require: true })
  image: string;
  
  @Prop({ required: false  })
  imagesSlides: string[];
  

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  reviews: Review[];

  @Prop({ required: true, default: 0 })
  rating: number;

  @Prop({ required: true, default: 0 })
  numReviews: number;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  oldPrice: number;

  @Prop({ required: true, default: 0 })
  countInStock: number;
  @Prop({ required: true, default:false  })
  isTopRelated : boolean ; 
  
  @Prop({ required: true, default: () => generateSKU() })
  sku: string;


}


const generatedSKUs = new Set<string>();

function generateSKU(): string {
  let newSKU: string;

  do {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
        const randomDigit = Math.floor(Math.random() * 10);
    newSKU = `${randomNumber}-${randomDigit}`;
  } while (generatedSKUs.has(newSKU));

  generatedSKUs.add(newSKU);

  return newSKU;
}


export const ProductSchema = SchemaFactory.createForClass(Product);
