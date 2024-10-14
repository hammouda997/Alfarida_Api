import { IsOptional, IsString } from 'class-validator';

export class CreateFeaturedDto {
  @IsString()
  image: string;

  @IsString()
  buttonText: string;

  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  heading?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  discoverLink?: string;
}


export class UpdateFeaturedDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  buttonText?: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsString()
  heading?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  discoverLink?: string;
}
