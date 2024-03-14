import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { ConfigurationService } from "@vapour/services/configuration.service";

const defaultButtonClasses = [
  "px-2",
  "py-1",
  "text-center",
  "border-t",
  "border-b",
  "border-sky-900",
  "text-slate-300",
];

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

  readonly currentPage = input.required<number>();
  readonly maxPages = input<number>();
  readonly total = input.required<number>();

  readonly icons = {
    first: faAnglesLeft,
    previous: faAngleLeft,
    next: faAngleRight,
    last: faAnglesRight,
  };

  readonly classesFirst = [
    ...defaultButtonClasses,
    "bg-slate-800",
    "border-l",
    "rounded-l",
  ];

  readonly classesPreviousNext = [...defaultButtonClasses, "bg-slate-800"];

  readonly classesLast = [
    ...defaultButtonClasses,
    "bg-slate-800",
    "border-r",
    "rounded-r",
  ];

  readonly labelPrevious = computed(
    () => `Go back to previous page (${this.currentPage() - 1})`,
  );

  readonly labelNext = computed(
    () => `Go to the next page (${this.currentPage() + 1})`,
  );

  readonly labelLast = computed(
    () => `Go to the last page (${this.totalPages()})`,
  );

  readonly totalPages = computed(() =>
    Math.ceil(this.total() / this.configurationService.pageSize),
  );

  readonly pages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const maxPages = this.maxPages() || 5;

    const length = total > maxPages ? maxPages : total;
    const start = this.calculateStart(current, total, maxPages);

    return Array.from({ length }, (_, i) => {
      const page = start + i;

      return {
        classes: [
          ...defaultButtonClasses,
          ...(page === current
            ? ["bg-fuchsia-600", "text-slate-50"]
            : ["bg-slate-900"]),
        ],
        current: current === page ? "page" : undefined,
        label: `Change to page ${page}`,
        value: page,
      };
    });
  });

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
