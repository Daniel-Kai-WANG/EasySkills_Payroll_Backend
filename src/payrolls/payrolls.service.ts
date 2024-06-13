import { HttpException, Injectable } from '@nestjs/common';
import { GetPayrollDto } from './dto/get-payroll.dto';
import { HttpService } from '@nestjs/axios';
import { ApiResponse, IncludedAdvantage, IncludedTimesreport } from './types/types';
import { Resource } from './types/resource';
import { Contract, Payslip } from './types/payroll';
import { Delivery } from './types/delivery';
import { Project } from './types/project';
import { Expenses } from './types/expenses';
import { SettingApiResponse, SettingsData } from './types/setting';
import { Timesheet } from './types/timesheet';
import { TimesReport } from './types/times-report';
import { Administrative } from './types/administrative';

@Injectable()
export class PayrollsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(getPayrollDto: GetPayrollDto) {
    try {
      const resourcesRequest = this.httpService
        .get<ApiResponse<Resource[]>>('/resources', {
          params: getPayrollDto,
        })
        .toPromise();

      const contractsRequest = this.httpService
        .get<ApiResponse<Contract[]>>('/apps/extract-payroll/contracts', {
          params: { ...getPayrollDto, maxResults: 500, page: 1 },
        })
        .toPromise();

      const [resourcesResponse, contractsResponse] = await Promise.all([resourcesRequest, contractsRequest]);

      const totalItems = resourcesResponse.data.meta.totals;

      const resourcesRelated = await Promise.all(
        resourcesResponse.data.data.map(async (resource) => {
          const [
            { included: contractsIncluded },
            { deliveries, included: deliveriesIncluded },
            { projects, included: projectsIncluded },
            { expenses },
          ] = await Promise.all([
            this.findPersonalContracts(resource.id),
            this.findDeliveries(resource.id),
            this.findProjects(resource.id),
            this.findExpenses(resource.id),
          ]);

          return {
            id: resource.id,
            deliveries,
            deliveriesIncluded,
            projects,
            projectsIncluded,
            expenses,
            contractsIncluded,
          };
        }),
      );

      const payslips = resourcesResponse.data.data.map<Payslip>((resource) => {
        const payslipContracts = contractsResponse.data.data.filter(
          (contract) => contract.relationships.dependsOn.data.id === resource.id,
        );
        const advantagePayList = payslipContracts.map<IncludedAdvantage | undefined>((contract) => {
          const advantageIds = contract.relationships.advantagesToPay.data.map((item) => item.id);

          return contractsResponse.data.included.find(
            (includedItem) => includedItem.type === 'advantage' && advantageIds.includes(includedItem.id),
          ) as IncludedAdvantage;
        });

        const currentTimesreports = payslipContracts.flatMap((contract) => {
          const timesReportIds = contract.relationships.timesReports.data.map((item) => item.id);

          return contractsResponse.data.included.filter(
            (includedItem) => includedItem.type === 'timesreport' && timesReportIds.includes(includedItem.id),
          ) as IncludedTimesreport[];
        });

        const targetResourceRelated = resourcesRelated.find((resourceRelated) => resourceRelated.id === resource.id);

        const { contractsIncluded, deliveries, deliveriesIncluded, projects, projectsIncluded, expenses } =
          targetResourceRelated;

        return {
          id: resource.id,
          firstName: resource.attributes.firstName,
          lastName: resource.attributes.lastName,
          isSelected: false,
          contracts: payslipContracts,
          contractsIncluded,
          advantagePayList,
          currentTimesreports,
          deliveries,
          deliveriesIncluded,
          projects,
          projectsIncluded,
          expenses,
        };
      });

      return { payslips, totalItems };
    } catch (error) {
      console.error('Error fetching payroll data:', error);
      throw new HttpException('Failed to fetch payroll data', error.response?.status || 500);
    }
  }

  async findPersonalContracts(id: string) {
    try {
      const administrativeResponse = await this.httpService
        .get<ApiResponse<Administrative>>(`/resources/${id}/administrative`)
        .toPromise();

      return { included: administrativeResponse?.data.included };
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Access denied for expenses of resource ${id}`);
        return { included: [] };
      }
      console.error('Error fetching expenses:', error);
      throw new Error(`Failed to fetch expenses for resource ${id}: ${error.message}`);
    }
  }

  async findDeliveries(id: string) {
    const deliveriesResponse = await this.httpService
      .get<ApiResponse<Delivery[]>>(`/resources/${id}/deliveries-inactivities`, {
        params: {
          maxResults: 300,
          page: 1,
        },
      })
      .toPromise();

    return { deliveries: deliveriesResponse?.data.data ?? [], included: deliveriesResponse?.data.included };
  }

  async findProjects(id: string) {
    const projectsResponse = await this.httpService
      .get<ApiResponse<Project[]>>(`/resources/${id}/projects`, {
        params: {
          maxResults: 300,
          order: 'desc',
          page: 1,
          sort: 'updateDate',
        },
      })
      .toPromise();

    return { projects: projectsResponse?.data.data ?? [], included: projectsResponse?.data.included };
  }

  async findExpenses(id: string) {
    try {
      const expensesResponse = await this.httpService
        .get<ApiResponse<Expenses[]>>(`/resources/${id}/expensesreports`, {
          params: {
            maxResults: 300,
            order: 'desc',
            page: 1,
            sort: 'updateDate',
          },
        })
        .toPromise();

      return { expenses: expensesResponse?.data.data ?? [] };
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Access denied for expenses of resource ${id}`);
        return { expenses: [] };
      }
      console.error('Error fetching expenses:', error);
      throw new Error(`Failed to fetch expenses for resource ${id}: ${error.message}`);
    }
  }

  async findSettings() {
    const settingsResponse = await this.httpService
      .get<SettingApiResponse<SettingsData>>('/application/settings', {
        params: {
          ignoreStateSort: true,
        },
      })
      .toPromise();

    const contractTypes = settingsResponse.data?.data.setting.typeOf.contract ?? [];
    const currencyTypes = settingsResponse.data?.data.setting.currency ?? [];
    const projectTypes = settingsResponse.data?.data.setting.typeOf.project ?? [];

    return {
      contractTypes,
      currencyTypes,
      projectTypes,
    };
  }

  async findTimesheets(id: string) {
    const timesheetsResponse = await this.httpService
      .get<ApiResponse<Timesheet[]>>(`/resources/${id}/timesreports`, {
        params: {
          maxResults: 30,
          order: 'desc',
          page: 1,
          sort: 'updateDate',
        },
      })
      .toPromise();

    return { timesheets: timesheetsResponse?.data.data ?? [] };
  }

  async findTimeReports(ids: string[]) {
    const timeReports = await Promise.all(
      ids.map(async (id) => {
        const timeReportResponse = await this.httpService
          .get<ApiResponse<TimesReport>>(`/timesreports/${id}`)
          .toPromise();

        return timeReportResponse.data.data;
      }),
    );

    return timeReports;
  }
}
