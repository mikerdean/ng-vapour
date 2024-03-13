import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ConfigurationService } from "@vapour/services/configuration.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontawesomeIconComponent],
  selector: "pagination",
  standalone: true,
  templateUrl: "pagination.component.html",
})
export class PaginationComponent {
  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
  ) {}

  @Input({ required: true }) currentPage!: number;
  @Input() maxPages?: number;
  @Input({ required: true }) total!: number;

  readonly defaultButtonClasses = [
    "px-2",
    "py-1",
    "text-center",
    "border-t",
    "border-b",
    "border-sky-900",
    "text-slate-300",
  ];

  readonly icons = {
    first: faAnglesLeft,
    previous: faAngleLeft,
    next: faAngleRight,
    last: faAnglesRight,
  };

  get classesFirst() {
    return [
      ...this.defaultButtonClasses,
      "bg-slate-800",
      "border-l",
      "rounded-l",
    ];
  }

  get classesPreviousNext() {
    return [...this.defaultButtonClasses, "bg-slate-800"];
  }

  get classesLast() {
    return [
      ...this.defaultButtonClasses,
      "bg-slate-800",
      "border-r",
      "rounded-r",
    ];
  }

  get labelPrevious() {
    return `Go back to previous page (${this.currentPage - 1})`;
  }

  get labelNext() {
    return `Go to the next page (${this.currentPage + 1})`;
  }

  get labelLast() {
    return `Go to the last page (${this.totalPages})`;
  }

  get pages() {
    const total = this.totalPages;
    const maxPages = this.maxPages || 5;

    const length = total > maxPages ? maxPages : total;
    const start = this.calculateStart(this.currentPage, total, maxPages);

    return Array.from({ length }, (_, i) => {
      const page = start + i;

      return {
        classes: [
          ...this.defaultButtonClasses,
          ...(page === this.currentPage
            ? ["bg-fuchsia-600", "text-slate-50"]
            : ["bg-slate-900"]),
        ],
        current: this.currentPage === page ? "page" : undefined,
        label: `Change to page ${page}`,
        value: page,
      };
    });
  }

  get totalPages() {
    return Math.ceil(this.total / this.configurationService.pageSize);
  }

  private calculateStart(
    currentPage: number,
    totalPages: number,
    maxPages: number,
  ): number {
    if (totalPages < maxPages) {
      return 1;
    }

    const midMax = Math.floor(maxPages / 2);
    const min = currentPage - midMax;
    const max = totalPages - midMax;

    if (min > 1 && currentPage <= max) {
      return min;
    }

    if (currentPage > max) {
      return totalPages - maxPages + 1;
    }

    return 1;
  }

  changePage(page: number): void {
    this.router.navigate([], { queryParams: { page } });
  }
}
