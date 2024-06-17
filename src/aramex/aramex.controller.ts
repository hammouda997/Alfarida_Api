import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateShipmentDto } from './create-shipment.dto';
import * as aramex from 'aramex-api'; // Import the aramex-api module

@Controller('aramex')
@ApiTags('Aramex')
export class AramexController {
  constructor() {}

  @Post('create-shipment')
  async createShipment(@Body() createShipmentDto: CreateShipmentDto) {
    try {
      const clientInfo = new aramex.ClientInfo();
      aramex.Aramex.setClientInfo(clientInfo);

      // Setting consignee, shipper, third party, shipment details, dimensions, and weight
      aramex.Aramex.setConsignee(new aramex.Consignee());
      aramex.Aramex.setShipper(new aramex.Shipper());
      aramex.Aramex.setThirdParty(new aramex.ThirdParty());
      aramex.Aramex.setDetails(1);
      aramex.Aramex.setDimension();
      aramex.Aramex.setWeight();

      // Creating shipment
      const result = await aramex.Aramex.createShipment([{
        PackageType: 'Box',
        Quantity: 2,
        Weight: { Value: 0.5, Unit: 'Kg' },
        Comments: 'Docs',
        Reference: ''
      }]);
      
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('track-shipments')
  async trackShipments(@Body() trackingNumbers: string[]) {
    try {
      // Tracking shipment
      const result = await aramex.Aramex.track(trackingNumbers);
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
