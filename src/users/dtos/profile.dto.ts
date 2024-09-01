import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  ValidateNested,
  IsObject,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ShippingDetailsDto } from './shipping-details.dto'; 
import { Type } from 'class-transformer';

export class ProfileDto {
  @IsString()
  @MinLength(4, { message: 'Firstname is too short.' })
  @MaxLength(20, { message: 'Firstname is too long.' })
  @IsOptional()
  firstname?: string;

  @IsString()
  @MinLength(4, { message: 'Lastname is too short.' })
  @MaxLength(20, { message: 'Lastname is too long.' })
  @IsOptional()
  lastname?: string;

  @IsEmail({}, { message: 'Email address is not valid.' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Password is too long.' })
  @IsOptional()
  password?: string;

  @IsString()
  @MinLength(8, { message: 'Phone number is too short.' })
  @MaxLength(20, { message: 'Phone number is too long.' })
  @IsOptional()
  phone?: string;
  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be one of the following: male, female' })
  @IsOptional()
  gender?: 'male' | 'female' ;  @IsArray()


  @ValidateNested({ each: true })
  @Type(() => ShippingDetailsDto)
  @IsOptional()
  addressBook?: ShippingDetailsDto[];
  @IsOptional()
  dateOfBirth: Date;
}
