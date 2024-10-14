import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuards } from 'src/guards/auth.guard';
import { ProductDto } from '../dtos/product.dto';
import { ReviewDto } from '../dtos/review.dto';
import { ProductsService } from '../services/products.service';
import { ProductDocument } from '../schemas/product.schema';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('session')
  getCurrentSession(
    @Session() session: any
  ) {
    return session;
  }

  @Get()
  getProducts(
    @Query('keyword') keyword: string,
    @Query('pageId') pageId: string,
    @Query('cat') category: string 
  ) {
    return this.productsService.findMany(keyword, pageId , category);
  }
  
  @Get('new')
  getNewProducts() {
    return this.productsService.finNewest();
  }
  @Get('categories')
  async getCategories() {
    const categories = await this.productsService.findAllCategories();
    return categories;
  }
  @Get('topRated')
  getTopRatedProducts() {
    return this.productsService.findTopRated();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteOne(id);
  }

  @UseGuards(AdminGuard)
@Post()
createProduct(@Body() productData: Partial<ProductDocument>) {
  return this.productsService.createProduct(productData);
}
@UseGuards(AdminGuard)
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productsService.update(id, product);
  }


  @UseGuards(AuthGuards)
  @Patch(':id/review')
  createReview(
    @Param('id') id: string,
    @Body() { rating, comment }: ReviewDto,
    @Session() session: any
  ) {
  
    return this.productsService.createReview(id, session.user, rating, comment);
  }

}
