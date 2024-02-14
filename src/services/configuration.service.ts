import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ConfigurationService {
  readonly pageSize = 25;

  getPageLimits(page: number): { start: number; end: number } {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return { start, end };
  }
}
