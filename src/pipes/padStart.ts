import { Pipe, type PipeTransform } from "@angular/core";

@Pipe({ name: "padStart", pure: true, standalone: true })
export class PadStartPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    length: number,
    fill: string,
  ): string | null {
    if (value === undefined || value === null || length < 1) {
      return null;
    }

    return String(value).padStart(length, fill);
  }
}
