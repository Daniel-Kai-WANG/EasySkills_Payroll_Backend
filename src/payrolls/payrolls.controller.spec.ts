import { Test, TestingModule } from '@nestjs/testing';
import { PayrollsController } from './payrolls.controller';
import { PayrollsService } from './payrolls.service';
import { GetPayrollDto } from './dto/get-payroll.dto';
import * as fs from 'fs';
import * as path from 'path';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Payslip } from './types/payroll';

const MOCK_URL = 'http://localhost:3000';

const expectedResult = JSON.parse(
  fs.readFileSync(
    path.resolve('/Users/wangkai/code/payroll-easyskill-backend/__mocks__/payrollResponse.json'),
    'utf-8',
  ),
);

describe('PayrollsController', () => {
  let payrollsController: PayrollsController;
  let payrollsService: PayrollsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollsController],
      providers: [
        PayrollsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: () => MOCK_URL,
          },
        },
      ],
    }).compile();

    payrollsService = module.get<PayrollsService>(PayrollsService);
    payrollsController = module.get<PayrollsController>(PayrollsController);
  });

  it('should be defined', () => {
    expect(payrollsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return payroll data', async () => {
      jest.spyOn(payrollsService, 'findAll').mockImplementation(() => expectedResult);

      const getPayrollDto: GetPayrollDto = {
        month: '2024-06',
        maxResults: 30,
        page: 1,
        order: 'asc',
        isDetailedMode: false,
        saveSearch: true,
        excludeManager: false,
        perimeterAgencies: [],
        perimeterDynamic: [],
        resourceStates: [],
        resourceTypes: [],
        viewMode: 'list',
        returnMoreData: undefined,
      };

      const response = await payrollsController.findAll(getPayrollDto);
      // testing the format of response data
      expect(response).toHaveProperty('payslips');
      expect(response).toHaveProperty('settings');
      expect(response).toHaveProperty('totalItems');
      expect(response.totalItems).toHaveProperty('rows');

      // testing the content of payslips
      const payslip: Payslip = response.payslips[0];
      expect(payslip.id).toBe('14973');
      expect(payslip.firstName).toBe('Maria Luz A.');
      expect(payslip.lastName).toBe('ALVARO');
      expect(payslip.contracts).toHaveLength(1);
      expect(payslip.advantagePayList).toHaveLength(1);
      expect(payslip.advantagePayList[0]).toBeNull();
      expect(payslip.currentTimesreports).toHaveLength(1);
      expect(payslip.deliveries).toHaveLength(1);
      expect(payslip.projects).toHaveLength(1);
      expect(payslip.expenses).toHaveLength(3);

      // testing the content of totolItems
      expect(response.totalItems.rows).toBe(791);

      // testing the format of settings
      expect(response.settings).toHaveProperty('contractTypes');
      expect(response.settings).toHaveProperty('currencyTypes');
      expect(response.settings).toHaveProperty('projectTypes');
    });
  });
});
