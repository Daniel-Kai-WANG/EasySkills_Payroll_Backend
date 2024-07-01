import { Controller, Get, Param, Query } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';

import { GetPayrollDto } from './dto/get-payroll.dto';

@Controller('payrolls')
export class PayrollsController {
  constructor(private payrollsService: PayrollsService) {}

  // @Get()
  // findAll(@Query() getPayrollDto: GetPayrollDto) {
  //   return this.payrollsService.findAll(getPayrollDto);
  // }

  // @Get('expenses/:id')
  // findExpenses(@Param('id') id: string) {
  //   return this.payrollsService.findExpenses(id);
  // }

  // @Get('settings')
  // findSettings() {
  //   return this.payrollsService.findSettings();
  // }
}
