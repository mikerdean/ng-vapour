import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
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
import { translate } from "@vapour/signals/translate";

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
  templateUrl: "pagination.component.html",
})
export class PaginationComponent {
  readonly #configurationService = inject(ConfigurationService);
  readonly #router = inject(Router);

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

  readonly nextPage = computed(() => this.currentPage() + 1);
  readonly previousPage = computed(() => this.currentPage() - 1);

  readonly totalPages = computed(() =>
    Math.ceil(this.total() / this.#configurationService.pageSize),
  );

  readonly translations = translate({
    change: "pagination.change",
    first: "pagination.first",
    last: ["pagination.last", () => ({ page: this.totalPages() })],
    next: ["pagination.next", () => ({ page: this.nextPage() })],
    previous: ["pagination.previous", () => ({ page: this.previousPage() })],
  });

  readonly pages = computed(() => {
    const current = this.currentPage();
    const maxPages = this.maxPages();
    const total = this.totalPages();

    const max = maxPages || 5;
    const length = total > max ? max : total;
    const start = this.calculateStart(current, total, max);

    const pages = Array.from({ length }, (_, i) => {
      const page = start + i;

      return {
        classes: [
          ...defaultButtonClasses,
          ...(page === current
            ? ["bg-fuchsia-600", "text-slate-50"]
            : ["bg-slate-900"]),
        ],
        current: current === page ? "page" : undefined,
        label: page.toString(),
        value: page,
      };
    });

    return pages;
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
    void this.#router.navigate([], { queryParams: { page } });
  }
}
