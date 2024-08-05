export const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  } else if (typeof error === "string") {
    return Error(error);
  } else {
    return Error(String(error));
  }
};
