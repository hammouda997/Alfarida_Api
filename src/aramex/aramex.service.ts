import { Injectable } from '@nestjs/common';
import * as aramex from 'aramex-api';

@Injectable()
export class AramexService {
  constructor() {
    // Change ClientInfo properties if you want to use a real account instead of a test account
    const clientInfo = new aramex.ClientInfo();

    // Setting client info
    aramex.Aramex.setClientInfo(clientInfo);

    // Note: You should set consignee, shipper, third party, shipment details, dimensions, and weight
    // outside of the constructor if they are not constant for every shipment
  }

  async createShipment(packageDetails: any[]) {
    try {
      // Creating shipment
      const result = await aramex.Aramex.createShipment(packageDetails);
      console.log('Shipment created:', result);
      return result;
    } catch (error) {
      console.error('Error creating shipment:', error);
      throw error;
    }
  }

  async trackShipments(trackingNumbers: string[]) {
    try {
      // Tracking shipment
      const result = await aramex.Aramex.track(trackingNumbers);
      console.log('Shipment tracking:', result);
      return result;
    } catch (error) {
      console.error('Error tracking shipments:', error);
      throw error;
    }
  }
}
