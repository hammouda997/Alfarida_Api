// src/featured/controllers/featured.controller.ts

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { FeaturedService } from '../services/featured.service';
  import { CreateFeaturedDto, UpdateFeaturedDto } from '../dto/create-featured.dto';
  import { Featured } from '../schemas/featured.schema';
  
  @Controller('featured')
  @UsePipes(new ValidationPipe()) // Automatically validate request bodies
  export class FeaturedController {
    constructor(private featuredService: FeaturedService) {}
  
    @Post()
    async createFeatured(@Body() body: CreateFeaturedDto) {
      return this.featuredService.create(body);
    }
  
    @Get()
    async getFeatured() {
      return this.featuredService.findAll();
    }
  
    @Get(':id')
    async getFeaturedById(@Param('id') id: string) {
      return this.featuredService.findById(id);
    }
  
    @Put(':id')
    async updateFeatured(@Param('id') id: string, @Body() body: UpdateFeaturedDto) {
      return this.featuredService.update(id, body);
    }
  
    @Delete(':id')
    async deleteFeatured(@Param('id') id: string) {
      return this.featuredService.delete(id);
    }
  }
  