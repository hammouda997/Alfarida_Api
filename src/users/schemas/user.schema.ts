import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingDetails } from 'src/interfaces';
import { Order } from 'src/orders/schemas/order.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: false })
  lastname: string;
  @Prop ({required : false  , unique : false })
  firstname: string;


  @Prop({ required: true, unique: true })
  email: string;
  @Prop({
    required: false,
    type: {
      address: { required: true, type: String },
      city: { required: true, type: String },
      postalCode: { required: true, type: String },
      country: { required: true, type: String },
    },
  })
  shippingDetails: ShippingDetails;
  @Prop({ required: false })
  gender: string;

  @Prop({ required: false })
  dateOfBirth: Date;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true, default: true })
  isAdmin: boolean;
  @Prop ({required : false })
  avatar : string ;
  @Prop ({required : false  , unique : true })
  phone : string ;
  @Prop ({required : false  , unique : true })
  facebook : string ;
  @Prop ({required : false  , unique : true })
  instagram : string ;

  @Prop({ default: null }) // Last login timestamp
  lastLogin: Date;
  @Prop({ required: false }) // Preferred delivery time
  preferredDeliveryTime?: string;
  @Prop({ required: false }) // Account verification status
  isVerified?: boolean;
  @Prop({ type: Number, default: 0 }) // Total number of reviews
  totalReviews?: number;
  @Prop({ type: [Object], default: [] }) // Array of shipping addresses for address book
  addressBook?: ShippingDetails[];

  @Prop({ type: [String], default: [] }) // Array of saved payment methods
  savedPaymentMethods?: string[];

  @Prop({ type: Number, default: 0 }) // Average rating
  averageRating?: number;
  @Prop({ default: true }) // Newsletter subscription status
  newsletterSubscription: boolean;

  @Prop({ default: 'active' }) // Account status: active, inactive, banned, etc.
  accountStatus: string;
  @Prop({ type: [String], default: [] }) // Array of product IDs for viewed products
  viewedProducts: string[];

}

export const UserSchema = SchemaFactory.createForClass(User);
