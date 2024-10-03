import { IsString, IsNumber, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';



export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;
  @IsArray()
  @IsString({ each: true })
  category: string[];
  @IsString()
  image: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  countInStock: number;
  @IsBoolean()
  isTopRelated: boolean;
  @IsArray()  // Add this line for tags
  @IsString({ each: true })  // Validate each tag as a string
  tags: string[];
}
