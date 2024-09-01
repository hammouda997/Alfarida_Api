import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuards } from 'src/guards/auth.guard';
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Post('init-payment')
  async initPayment(@Body() paymentDetails: any) {
    return this.ordersService.initPayment(paymentDetails);
  }
  @UseGuards(AuthGuards)
  @Get('myorders')
  async getUserOrders(@Session() session: any) {
    console.log('User ID:', session.user._id); 
    const userId = session.user._id ; 
    return this.ordersService.findUserOrders(userId);
  }
  @Post()
  async createOrder(@Body() body: any, @Session() session: any) {
    return this.ordersService.create(body, session.user._id);
  }

  @UseGuards(AdminGuard)
  @Get()
  async getOrders() {
    return this.ordersService.findAll();
  }

 
  
  @UseGuards(AuthGuards)
  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @UseGuards(AuthGuards)
  @Put(':id/pay')
  async updateOrderPayment(
    @Param('id') id: string,
    @Body() { paymentResult }: any
  ) {
    return this.ordersService.updatePaid(id, paymentResult);
  }
  
  @UseGuards(AdminGuard)
  @Put(':id/deliver')
  async updateOrderDelivery(@Param('id') id: string) {
    return this.ordersService.updateDelivered(id);
  }
}
