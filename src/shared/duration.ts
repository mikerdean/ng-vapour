import { Duration, DurationLikeObject } from "luxon";

export const getSongDuration = (seconds: number): string | undefined => {
  if (seconds < 0) {
    return undefined;
  }

  const d = Duration.fromObject({ seconds }).shiftTo(
    "hours",
    "minutes",
    "seconds",
  );

  if (d.hours > 0) {
    return d.toFormat("hh:mm:ss");
  } else if (d.minutes > 0) {
    return d.toFormat("mm:ss");
  } else {
    return `${d.seconds}s`;
  }
};

export const getVideoDuration = (seconds: number): string | undefined => {
  if (seconds < 0) {
    return undefined;
  }

  const d = Duration.fromObject({ seconds });

  if (seconds < 60) {
    return d.toHuman({
      unitDisplay: "short",
    });
  }

  if (seconds < 3600) {
    const minuteShift: (keyof DurationLikeObject)[] =
      seconds % 60 === 0 ? ["minutes"] : ["minutes", "seconds"];

    return d.shiftTo(...minuteShift).toHuman({
      listStyle: "long",
      maximumFractionDigits: 0,
      unitDisplay: "short",
    });
  }

  const hourShift: (keyof DurationLikeObject)[] =
    seconds % 3600 === 0 ? ["hours"] : ["hours", "minutes"];

  return d.shiftTo(...hourShift).toHuman({
    listStyle: "long",
    maximumFractionDigits: 0,
    unitDisplay: "short",
  });
};
