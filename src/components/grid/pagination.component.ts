import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { combineLatest, map, switchMap } from "rxjs";

import { FontawesomeIconComponent } from "@vapour/components/images/fontawesome-icon.component";
import { TranslatePipe } from "@vapour/pipes/translate";
import { ConfigurationService } from "@vapour/services/configuration.service";
import { TranslationService } from "@vapour/services/translation.service";

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
  imports: [AsyncPipe, FontawesomeIconComponent, TranslatePipe],
  selector: "pagination",
  standalone: true,
  templateUrl: "pagination.component.html",
})
export class PaginationComponent {
  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private translationService: TranslationService,
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

  readonly nextPage = computed(() => this.currentPage() + 1);
  readonly previousPage = computed(() => this.currentPage() - 1);

  readonly totalPages = computed(() =>
    Math.ceil(this.total() / this.configurationService.pageSize),
  );

  readonly pages$ = combineLatest([
    toObservable(this.currentPage),
    toObservable(this.totalPages),
    toObservable(this.maxPages),
  ]).pipe(
    switchMap(([current, total, maxPages]) => {
      const max = maxPages || 5;
      const length = total > max ? max : total;
      const start = this.calculateStart(current, total, max);

      return combineLatest(
        Array.from({ length }, (_, i) => {
          return this.translationService.translate("grid.pagination.change", {
            page: start + i,
          });
        }),
      ).pipe(
        map((pages) =>
          pages.map((label, i) => {
            const page = i + 1;
            return {
              classes: [
                ...defaultButtonClasses,
                ...(page === current
                  ? ["bg-fuchsia-600", "text-slate-50"]
                  : ["bg-slate-900"]),
              ],
              current: current === page ? "page" : undefined,
              label,
              value: page,
            };
          }),
        ),
      );
    }),
  );

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
