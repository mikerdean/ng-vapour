import { assertInInjectionContext, computed, type Signal } from "@angular/core";

export function imageUrl(
  baseUrl: Signal<string | undefined>,
  imageUri: Signal<string | undefined>,
): Signal<string | undefined> {
  assertInInjectionContext(imageUrl);

  return computed(() => {
    const base = baseUrl();
    const uri = imageUri();

    if (!base || !uri) {
      return;
    }

    const encoded = encodeURIComponent(uri);
    const url = new URL(`image/${encoded}`, base);
    return url.toString();
  });
}
