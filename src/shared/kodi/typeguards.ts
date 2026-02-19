import type {
  KodiMessageBase,
  KodiNotification,
  KodiRequest,
  KodiResponse,
  KodiResponseError,
} from "./message";

export const isKodiMessageBase = (
  message: unknown,
): message is KodiMessageBase => {
  return (
    message !== null &&
    typeof message === "object" &&
    "jsonrpc" in message &&
    message.jsonrpc === "2.0"
  );
};

export const isKodiRequest = <T>(
  message: KodiMessageBase,
): message is KodiRequest<T> => {
  return isKodiMessageBase(message) && "id" in message && "params" in message;
};

export const isKodiResponse = <T>(
  message: KodiMessageBase,
): message is KodiResponse<T> => {
  return isKodiMessageBase(message) && "id" in message && "result" in message;
};

export const isKodiNotification = <T>(
  message: KodiMessageBase,
): message is KodiNotification<T> => {
  return (
    isKodiMessageBase(message) && "params" in message && !("id" in message)
  );
};

export const isKodiError = (
  message: KodiMessageBase,
): message is KodiResponseError => {
  return "error" in message;
};
