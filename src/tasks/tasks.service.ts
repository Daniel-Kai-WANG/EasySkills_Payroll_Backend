import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { AdministrativeService } from 'src/administrative/administrative.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { ResourcesService } from 'src/resources/resources.service';
import { Resource } from 'src/resources/schemas/resource.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly administrativeService: AdministrativeService,
    private readonly deliveriesService: DeliveriesService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Cron job started');

    try {
      const resources = await this.resourcesService.fetchResourceFromBoondManager();

      if (resources.length === 0) {
        this.logger.warn('No resources fetched from BoondManager');
        return;
      }

      const resourcesToSave: Resource[] = [];
      for (const { id, type, attributes } of resources) {
        const contracts = await this.administrativeService.findPersonalContracts(id);
        const { deliveries, included: deliveriesIncluded } = await this.deliveriesService.findDeliveries(id);
        const resource: Resource = { id, type, contracts, deliveries, deliveriesIncluded, ...attributes };
        resourcesToSave.push(resource);
      }

      this.logger.debug(`Prepared ${resourcesToSave.length} resources for saving`);
      if (resourcesToSave.length > 0) {
        await this.resourcesService.saveAllResources(resourcesToSave);
        this.logger.debug('Resources saved successfully');
      } else {
        this.logger.warn('No resources to save');
      }
      this.logger.debug('Cron job completed');
    } catch (error) {
      this.logger.error('Error in cron job:', error.message);
    }
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
