import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HttpService } from '@nestjs/axios'; // Correct import for HttpService
import { AxiosResponse } from 'axios'; // Correct import for AxiosResponse
import { PaymentResult } from 'src/interfaces';
import { Order, OrderDocument } from '../schemas/order.schema';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly httpService: HttpService 
  ) {}

  async create(
    orderAttrs: Partial<OrderDocument>,
    userId: string
  ): Promise<OrderDocument> {
    const {
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = orderAttrs;

    if (orderItems && orderItems.length < 1)
      throw new BadRequestException('No order items received.');

    const createdOrder = await this.orderModel.create({
      user: userId,
      orderItems,
      shippingDetails,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    return createdOrder;
  }

  async findAll(): Promise<OrderDocument[]> {
    const orders = await this.orderModel.find().populate('user', 'name email');
    ;

    return orders;
  }

  async findById(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel
      .findById(id)
      .populate('user', 'name email');

    if (!order) throw new NotFoundException('No order with given ID.');

    return order;
  }

  async updatePaid(
    id: string,
    paymentResult: PaymentResult
  ): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isPaid = true;
    order.paidAt = Date();
    order.paymentResult = paymentResult;

    const updatedOrder = await order.save();

    return updatedOrder;
  }

  async updateDelivered(id: string): Promise<OrderDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid order ID.');

    const order = await this.orderModel.findById(id);

    if (!order) throw new NotFoundException('No order with given ID.');

    order.isDelivered = true;
    order.deliveredAt = Date();

    const updatedOrder = await order.save();

    return updatedOrder;
  }

  async findUserOrders(userId: string) {
    if (!userId ) {
      throw new BadRequestException('Invalid user ID.');
    }
  
    const orders = await this.orderModel.find({ user: userId });
    return orders;
  }
  
  private isValidId(id: string): boolean {
    // Add logic to validate ID format (e.g., check if it’s a valid MongoDB ObjectId)
    return true; // Replace with actual validation logic
  }
  
  async initPayment(paymentDetails: any): Promise<any> {
    const url = 'https://api.preprod.konnect.network/api/v2/payments/init-payment';
    const headers = {
      'x-api-key': '66cf36312a3dbe14750b218f:AvpU6fxVaNVBWUqiA0',
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<any> = await this.httpService.post(url, paymentDetails, { headers }).toPromise();
      return response.data;
    } catch (error) {
      throw new BadRequestException(`Error initializing payment: ${error.message}`);
    }
  }
}
