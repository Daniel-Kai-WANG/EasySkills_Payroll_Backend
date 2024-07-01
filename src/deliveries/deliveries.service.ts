import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponse, IncludedDelivery } from 'src/payrolls/types/types';
import { DeliveryDto } from './dto/delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(private httpService: HttpService) {}

  async findDeliveries(id: string) {
    const deliveriesResponse = await this.httpService
      .get<ApiResponse<DeliveryDto[]>>(`/resources/${id}/deliveries-inactivities`)
      .toPromise();

    return {
      deliveries: deliveriesResponse?.data.data ?? [],
      included: deliveriesResponse?.data.included as IncludedDelivery[],
    };
  }
}
