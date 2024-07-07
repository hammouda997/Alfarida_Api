// create-shipment.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiProperty()
  packageType: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  weightValue: number;

  @ApiProperty()
  weightUnit: string;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  reference: string;
}
