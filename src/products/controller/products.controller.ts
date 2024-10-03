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

  @Post(':productId/view')
  async incrementViewCount(@Param('productId') productId: string) {
    return this.productsService.incrementViewCount(productId);
  }

  @Get(':productId')
  async getProductById(@Param('productId') productId: string) {
    return this.productsService.getProductById(productId);
  }
  @Get('session')
  getCurrentSession(
    @Session() session: any
  ) {
    console.log('Session:', session.user); // Log the session object
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
    console.log('Session:', session); // Log the session object
    console.log('Received rating:', rating); // Log the received rating
    console.log('Received comment:', comment); // Log the received comment
  
    return this.productsService.createReview(id, session.user, rating, comment);
  }

}
