import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource } from './schemas/resource.schema';
import * as dayjs from 'dayjs';
import { ApiResponse } from 'src/payrolls/types/types';
import { GetResourceDto } from './dto/get-resource.dto';
import { ResourceDto } from './dto/resource.dto';

@Injectable()
export class ResourcesService {
  private logger = new Logger(ResourcesService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
  ) {}

  async fetchResourceFromBoondManager() {
    const getResourceDto: GetResourceDto = {
      isDetailedMode: false,
      maxResults: 30,
      month: dayjs().format('YYYY-MM'),
      page: 1,
      order: 'asc',
      saveSearch: true,
      excludeManager: false,
      perimeterAgencies: [],
      perimeterDynamic: [],
      resourceStates: [],
      resourceTypes: [],
      returnMoreData: undefined,
      viewMode: 'list',
    };

    let allResources: ResourceDto[] = [];
    let currentPage = 1;
    const maxResults = getResourceDto.maxResults;

    try {
      const initialResponse = await this.httpService
        .get<ApiResponse<ResourceDto[]>>('/resources', {
          params: { ...getResourceDto, page: currentPage },
        })
        .toPromise();

      const totalRows = initialResponse.data.meta.totals.rows;
      const totalPages = Math.ceil(totalRows / maxResults);

      allResources = [...allResources, ...initialResponse.data.data];

      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const resourcesResponse = await this.httpService
          .get<ApiResponse<ResourceDto[]>>('/resources', {
            params: { ...getResourceDto, page: currentPage },
          })
          .toPromise();

        allResources = [...allResources, ...resourcesResponse.data.data];
      }
      return allResources;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async saveAllResources(resources: Resource[]) {
    this.logger.debug(`Attempting to save ${resources.length} resources`);
    const bulkOps = resources.map((resource) => ({
      updateOne: {
        filter: { id: resource.id },
        update: {
          $set: {
            id: resource.id,
            type: resource.type,
            contracts: resource.contracts,
            deliveries: resource.deliveries,
            deliveriesIncluded: resource.deliveriesIncluded,
            canShowTechnicalData: resource.canShowTechnicalData,
            canShowActions: resource.canShowActions,
            civility: resource.civility,
            firstName: resource.firstName,
            lastName: resource.lastName,
            creationDate: resource.creationDate,
            updateDate: resource.updateDate,
            reference: resource.reference,
            typeOf: resource.typeOf,
            state: resource.state,
            isVisible: resource.isVisible,
            thumbnail: resource.thumbnail,
            skills: resource.skills,
            mobilityAreas: resource.mobilityAreas,
            title: resource.title,
            availability: resource.availability,
            realAvailability: resource.realAvailability,
            averageDailyPriceExcludingTax: resource.averageDailyPriceExcludingTax,
            email1: resource.email1,
            email2: resource.email2,
            email3: resource.email3,
            phone1: resource.phone1,
            phone2: resource.phone2,
            currency: resource.currency,
            exchangeRate: resource.exchangeRate,
            currencyAgency: resource.currencyAgency,
            exchangeRateAgency: resource.exchangeRateAgency,
            numberOfResumes: resource.numberOfResumes,
            numberOfActivePositionings: resource.numberOfActivePositionings,
            tools: resource.tools,
            expertiseAreas: resource.expertiseAreas,
            activityAreas: resource.activityAreas,
            diplomas: resource.diplomas,
            experience: resource.experience,
            references: resource.references,
            languages: resource.languages,
          },
        },
        upsert: true,
      },
    }));

    this.logger.debug(`Created ${bulkOps.length} bulk operations`);

    try {
      this.logger.debug('Executing bulk write operation...');
      const result = await this.resourceModel.bulkWrite(bulkOps);
      this.logger.debug(`Bulk write result: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error('Error in bulk write:', error);
    }
  }
}
