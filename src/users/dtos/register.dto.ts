import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: 'First name is too short.' })
  @MaxLength(20, { message: 'First name is too long.' })  
  firstname: string;

  @IsString()
  @MinLength(2, { message: 'Last name is too short.' })
  @MaxLength(20, { message: 'Last name is too long.' })
  lastname: string;

  @IsEmail({}, { message: 'Email address is not valid.' })
  email: string;

  @IsString()
  @MinLength(5, { message: 'Password is too short.' })
  @MaxLength(20, { message: 'Password is too long.' })
  password: string;

  @IsOptional()
  shippingDetails: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @IsOptional()
  gender: string;

  @IsOptional()
  dateOfBirth: Date;
}
