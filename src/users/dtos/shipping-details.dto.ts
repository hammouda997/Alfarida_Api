import { IsString, IsOptional } from 'class-validator';

export class ShippingDetailsDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  postalCode: string;

  @IsString()
  country: string;
}
