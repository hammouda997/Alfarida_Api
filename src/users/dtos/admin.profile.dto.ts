import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
    IsNumber,
} from 'class-validator';

export class AdminProfileDto {
  @IsString()
  @MinLength(4, { message: 'Username is too short.' })
  @MaxLength(20, { message: 'Username is too long.' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'Email address is not valid.' })
  @IsOptional()
  email?: string;
  @IsOptional()
  @IsNumber()
phone?:number ;
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
