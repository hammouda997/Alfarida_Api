import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Featured, FeaturedDocument } from '../schemas/featured.schema';

@Injectable()
export class FeaturedService {
  constructor(
    @InjectModel(Featured.name) private featuredModel: Model<FeaturedDocument>
  ) {}

  async create(featuredAttrs: Partial<Featured>): Promise<FeaturedDocument> {
    const createdFeatured = await this.featuredModel.create(featuredAttrs);
    return createdFeatured;
  }

  async findAll(): Promise<FeaturedDocument[]> {
    return this.featuredModel.find();
  }

  async findById(id: string): Promise<FeaturedDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid featured ID.');
    }

    const featured = await this.featuredModel.findById(id);
    if (!featured) throw new NotFoundException('No featured item with given ID.');

    return featured;
  }

  async update(id: string, featuredAttrs: Partial<Featured>): Promise<FeaturedDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid featured ID.');
    }

    const updatedFeatured = await this.featuredModel.findByIdAndUpdate(id, featuredAttrs, { new: true });
    if (!updatedFeatured) throw new NotFoundException('No featured item with given ID.');

    return updatedFeatured;
  }

  async delete(id: string): Promise<FeaturedDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid featured ID.');
    }

    const deletedFeatured = await this.featuredModel.findByIdAndRemove(id);
    if (!deletedFeatured) throw new NotFoundException('No featured item with given ID.');

    return deletedFeatured;
  }
}
