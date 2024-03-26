import { Pipe, type PipeTransform } from "@angular/core";

import { getSongDuration, getVideoDuration } from "@vapour/shared/duration";

@Pipe({ name: "duration", pure: true, standalone: true })
export class DurationPipe implements PipeTransform {
  transform(
    seconds: number | null | undefined,
    type: "song" | "video",
  ): string | null {
    if (seconds === undefined || seconds === null) {
      return null;
    }

    switch (type) {
      case "song":
        return getSongDuration(seconds) || null;

      case "video":
        return getVideoDuration(seconds) || null;
    }
  }
}
