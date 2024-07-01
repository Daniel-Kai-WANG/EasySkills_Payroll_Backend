import { Controller } from '@nestjs/common';
import { AdministrativeService } from './administrative.service';

@Controller('administrative')
export class AdministrativeController {
  constructor(private administrativeService: AdministrativeService) {}
}
