import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, IncludedContract } from 'src/payrolls/types/types';
import { AdministrativeDto } from './dto/administrative.dto';

@Injectable()
export class AdministrativeService {
  constructor(private httpService: HttpService) {}

  async findPersonalContracts(id: string) {
    try {
      const administrativeResponse = await this.httpService
        .get<ApiResponse<AdministrativeDto>>(`/resources/${id}/administrative`)
        .toPromise();
      const administrative = administrativeResponse?.data.data;
      const personalContracts = administrative.relationships.contracts.data.map((contract) =>
        administrativeResponse.data.included.find(
          (included) => included.type === 'contract' && included.id === contract.id,
        ),
      ) as IncludedContract[];
      return personalContracts;
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Access denied for expenses of resource ${id}`);
        return [];
      }
      console.error('Error fetching expenses:', error);
      throw new Error(`Failed to fetch expenses for resource ${id}: ${error.message}`);
    }
  }
}
