import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeaturedController } from './controllers/featured.controller';
import { FeaturedService } from './services/featured.service';
import { Featured, FeaturedSchema } from './schemas/featured.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Featured.name, schema: FeaturedSchema }]),
  ],
  controllers: [FeaturedController],
  providers: [FeaturedService],
})
export class FeaturedModule {}
