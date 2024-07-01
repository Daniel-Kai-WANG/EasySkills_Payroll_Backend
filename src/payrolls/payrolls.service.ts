import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GetPayrollDto } from './dto/get-payroll.dto';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, IncludedAdvantage, IncludedItem, IncludedTimesreport } from './types/types';
import { ResourceDto } from '../resources/dto/resource.dto';
import { Contract, Payslip } from './types/payroll';
import { DeliveryDto } from '../deliveries/dto/delivery.dto';
import { Project } from './types/project';
import { Expenses } from './types/expenses';
import { SettingApiResponse, SettingsData } from './types/setting';
import { Timesheet } from './types/timesheet';
import { TimesReport } from './types/times-report';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrative as AdministrativeModel } from './entities/administrative.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dayjs from 'dayjs';

@Injectable()
export class PayrollsService {
  private logger = new Logger(PayrollsService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(AdministrativeModel.name) private administrativeModel: Model<AdministrativeModel>,
  ) {}

  // @Cron(CronExpression.EVERY_5_MINUTES)
  // async handleCron() {
  //   const getPayrollDto: GetPayrollDto = {
  //     isDetailedMode: false,
  //     maxResults: 30,
  //     month: dayjs().format('YYYY-MM'),
  //     page: 1,
  //     order: 'asc',
  //     saveSearch: true,
  //     excludeManager: false,
  //     perimeterAgencies: [],
  //     perimeterDynamic: [],
  //     resourceStates: [],
  //     resourceTypes: [],
  //     returnMoreData: undefined,
  //     viewMode: 'list',
  //   };

  //   try {
  //     const { payslips } = await this.findAll(getPayrollDto);
  //     const contractsIncluded = payslips.flatMap((payslip) => payslip.contractsIncluded);
  //     this.logger.debug(`Inserting ${contractsIncluded.length} contracts into MongoDB...`);
  //     await this.createContracts(contractsIncluded);
  //     this.logger.debug('Data inserted successfully');
  //   } catch (error) {
  //     this.logger.error('Error in handleCron:', error.message);
  //   }
  // }

  // async createContracts(contractsIncluded: IncludedItem[]) {
  //   for (const contractIncluded of contractsIncluded) {
  //     await this.administrativeModel
  //       .updateOne({ id: contractIncluded.id }, { $set: contractIncluded }, { upsert: true })
  //       .exec();
  //   }
  // }

  // async findAll(getPayrollDto: GetPayrollDto) {
  //   try {
  //     const resourcesRequest = this.httpService
  //       .get<ApiResponse<ResourceDto[]>>('/resources', {
  //         params: getPayrollDto,
  //       })
  //       .toPromise();

  //     const contractsRequest = this.httpService
  //       .get<ApiResponse<Contract[]>>('/apps/extract-payroll/contracts', {
  //         params: { ...getPayrollDto, maxResults: 500, page: 1 },
  //       })
  //       .toPromise();

  //     const [resourcesResponse, contractsResponse] = await Promise.all([resourcesRequest, contractsRequest]);

  //     const totalItems = resourcesResponse.data.meta.totals;

  //     const resourcesRelated = await Promise.all(
  //       resourcesResponse.data.data.map(async (resource) => {
  //         const [{ deliveries, included: deliveriesIncluded }, { projects, included: projectsIncluded }, { expenses }] =
  //           await Promise.all([
  //             this.findDeliveries(resource.id),
  //             this.findProjects(resource.id),
  //             this.findExpenses(resource.id),
  //           ]);

  //         return {
  //           id: resource.id,
  //           deliveries,
  //           deliveriesIncluded,
  //           projects,
  //           projectsIncluded,
  //           expenses,
  //         };
  //       }),
  //     );

  //     const payslips = resourcesResponse.data.data.map<Payslip>((resource) => {
  //       const payslipContracts = contractsResponse.data.data.filter(
  //         (contract) => contract.relationships.dependsOn.data.id === resource.id,
  //       );
  //       const advantagePayList = payslipContracts.map<IncludedAdvantage | undefined>((contract) => {
  //         const advantageIds = contract.relationships.advantagesToPay.data.map((item) => item.id);

  //         return contractsResponse.data.included.find(
  //           (includedItem) => includedItem.type === 'advantage' && advantageIds.includes(includedItem.id),
  //         ) as IncludedAdvantage;
  //       });

  //       const currentTimesreports = payslipContracts.flatMap((contract) => {
  //         const timesReportIds = contract.relationships.timesReports.data.map((item) => item.id);

  //         return contractsResponse.data.included.filter(
  //           (includedItem) => includedItem.type === 'timesreport' && timesReportIds.includes(includedItem.id),
  //         ) as IncludedTimesreport[];
  //       });

  //       const targetResourceRelated = resourcesRelated.find((resourceRelated) => resourceRelated.id === resource.id);

  //       const { deliveries, deliveriesIncluded, projects, projectsIncluded, expenses } = targetResourceRelated;

  //       return {
  //         id: resource.id,
  //         firstName: resource.attributes.firstName,
  //         lastName: resource.attributes.lastName,
  //         isSelected: false,
  //         contracts: payslipContracts,
  //         advantagePayList,
  //         currentTimesreports,
  //         deliveries,
  //         deliveriesIncluded,
  //         projects,
  //         projectsIncluded,
  //         expenses,
  //       };
  //     });

  //     return { payslips, totalItems };
  //   } catch (error) {
  //     console.error('Error fetching payroll data:', error);
  //     throw new HttpException('Failed to fetch payroll data', error.response?.status || 500);
  //   }
  // }

  // async findProjects(id: string) {
  //   const projectsResponse = await this.httpService
  //     .get<ApiResponse<Project[]>>(`/resources/${id}/projects`, {
  //       params: {
  //         maxResults: 300,
  //         order: 'desc',
  //         page: 1,
  //         sort: 'updateDate',
  //       },
  //     })
  //     .toPromise();

  //   return { projects: projectsResponse?.data.data ?? [], included: projectsResponse?.data.included };
  // }

  // async findExpenses(id: string) {
  //   try {
  //     const expensesResponse = await this.httpService
  //       .get<ApiResponse<Expenses[]>>(`/resources/${id}/expensesreports`, {
  //         params: {
  //           maxResults: 300,
  //           order: 'desc',
  //           page: 1,
  //           sort: 'updateDate',
  //         },
  //       })
  //       .toPromise();

  //     return { expenses: expensesResponse?.data.data ?? [] };
  //   } catch (error) {
  //     if (error.response?.status === 403) {
  //       console.warn(`Access denied for expenses of resource ${id}`);
  //       return { expenses: [] };
  //     }
  //     console.error('Error fetching expenses:', error);
  //     throw new Error(`Failed to fetch expenses for resource ${id}: ${error.message}`);
  //   }
  // }

  // async findSettings() {
  //   const settingsResponse = await this.httpService
  //     .get<SettingApiResponse<SettingsData>>('/application/settings', {
  //       params: {
  //         ignoreStateSort: true,
  //       },
  //     })
  //     .toPromise();

  //   const contractTypes = settingsResponse.data?.data.setting.typeOf.contract ?? [];
  //   const currencyTypes = settingsResponse.data?.data.setting.currency ?? [];
  //   const projectTypes = settingsResponse.data?.data.setting.typeOf.project ?? [];

  //   return {
  //     contractTypes,
  //     currencyTypes,
  //     projectTypes,
  //   };
  // }

  // async findTimesheets(id: string) {
  //   const timesheetsResponse = await this.httpService
  //     .get<ApiResponse<Timesheet[]>>(`/resources/${id}/timesreports`, {
  //       params: {
  //         maxResults: 30,
  //         order: 'desc',
  //         page: 1,
  //         sort: 'updateDate',
  //       },
  //     })
  //     .toPromise();

  //   return { timesheets: timesheetsResponse?.data.data ?? [] };
  // }

  // async findTimeReports(ids: string[]) {
  //   const timeReports = await Promise.all(
  //     ids.map(async (id) => {
  //       const timeReportResponse = await this.httpService
  //         .get<ApiResponse<TimesReport>>(`/timesreports/${id}`)
  //         .toPromise();

  //       return timeReportResponse.data.data;
  //     }),
  //   );

  //   return timeReports;
  // }
}
