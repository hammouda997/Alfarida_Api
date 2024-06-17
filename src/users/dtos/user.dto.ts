import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class UserDto {
  @Expose()
  email: string;

  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: ObjectId;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;//pleasework

  @Expose()
  gender: string; // Gender of the user

  @Expose()
  dateOfBirth: Date; // Date of birth of the user

  @Expose()
  address: string; // Current address of the user

  @Expose()
  city: string; // City of residence

  @Expose()
  country: string; // Country of residence

  @Expose()
  postalCode: string;
  @Expose()
  isAdmin: boolean;

  @Expose()
  avatar: string;

  @Expose()
  phone: string;

  @Expose()
  facebook: string;

  @Expose()
  instagram: string;

  @Expose()
  orderHistory: string[]; // Assuming you want to expose order IDs

  @Expose()
  lastLogin: Date;

  @Expose()
  preferredDeliveryTime?: string;

  @Expose()
  isVerified?: boolean;

  @Expose()
  totalReviews?: number;

  @Expose()
  addressBook: any[]; // Assuming you want to expose address book as is

  @Expose()
  savedPaymentMethods: string[];

  @Expose()
  averageRating?: number;

  @Expose()
  newsletterSubscription: boolean;

  @Expose()
  accountStatus: string;

  @Expose()
  viewedProducts: string[];

  @Expose()
  accessToken?: string;
}
