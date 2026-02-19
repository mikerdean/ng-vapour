/* eslint-disable no-console */

import { Injectable } from "@angular/core";

type LoggingMessage = string | Error;

@Injectable({ providedIn: "root" })
export class LoggingService {
  log(message: LoggingMessage, context?: unknown) {
    if (context) {
      console.log(message, context);
    } else {
      console.log(message);
    }
  }

  error(message: LoggingMessage, context?: unknown) {
    if (context) {
      console.error(message, context);
    } else {
      console.error(message);
    }
  }

  warn(message: LoggingMessage, context?: unknown) {
    if (context) {
      console.warn(message, context);
    } else {
      console.warn(message);
    }
  }

  debug(message: LoggingMessage, context?: unknown) {
    if (context) {
      console.debug(message, context);
    } else {
      console.debug(message);
    }
  }
}
