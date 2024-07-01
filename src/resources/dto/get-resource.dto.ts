export class GetResourceDto {
  isDetailedMode?: boolean;
  maxResults?: number;
  month: string;
  order?: 'asc' | 'desc';
  page?: number;
  saveSearch?: boolean;
  excludeManager?: boolean;
  resourceStates?: number[];
  resourceTypes?: number[];
  perimeterAgencies?: number[];
  perimeterDynamic?: string[];
  returnMoreData?: boolean | undefined;
  viewMode?: string;
}
