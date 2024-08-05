/* eslint-disable no-console */
import { Injectable } from "@angular/core";

type LoggingMessage = string | Error;

@Injectable({ providedIn: "root" })
export class LoggingService {
  log<T>(message: LoggingMessage, context?: T) {
    if (context) {
      console.log(message, context);
    } else {
      console.log(message);
    }
  }

  error<T>(message: LoggingMessage, context?: T) {
    if (context) {
      console.error(message, context);
    } else {
      console.error(message);
    }
  }

  warn<T>(message: LoggingMessage, context?: T) {
    if (context) {
      console.warn(message, context);
    } else {
      console.warn(message);
    }
  }

  debug<T>(message: LoggingMessage, context?: T) {
    if (context) {
      console.debug(message, context);
    } else {
      console.debug(message);
    }
  }
}
