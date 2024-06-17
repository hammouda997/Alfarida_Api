// aramex.module.ts

import { Module } from '@nestjs/common';
import { AramexController } from './aramex.controller';
import { AramexService } from './aramex.service';

@Module({
    
  controllers: [AramexController],
  providers:  [AramexService],
})
export class AramexModule {}
