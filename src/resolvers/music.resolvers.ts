import {
  assertInInjectionContext,
  computed,
  inject,
  Injector,
  runInInjectionContext,
} from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { parse } from "valibot";

import type {
  GridData,
  GridItem,
} from "@vapour/components/grid/grid.component";
import type {
  AudioDetailsAlbum,
  AudioDetailsArtist,
} from "@vapour/schema/audio";
import { LibraryDetailsGenre } from "@vapour/schema/library";
import { MusicService } from "@vapour/services/music.service";
import {
  artistValidator,
  genreValidator,
  pageValidator,
} from "@vapour/validators";

export async function recentlyAddedAlbumsResolver(): Promise<GridData> {
  assertInInjectionContext(recentlyAddedAlbumsResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);

  const { limits, albums } = await musicService.getRecentlyAddedAlbums();

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: albums.map(mapAlbumToGridItem),
    limits,
    thumbnailType: "album",
  }));
}

export async function albumsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(albumsResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, albums } = await musicService.getAlbums(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: albums.map(mapAlbumToGridItem),
    limits,
    thumbnailType: "album",
  }));
}

export async function albumsByArtistResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(albumsByArtistResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);
  const router = inject(Router);

  const params = parse(artistValidator, route.params);

  const { artistdetails } = await musicService.getArtistById(params.artistId);

  const { limits, albums } = await musicService.getAlbumsByAlbumArtist(
    artistdetails.artist,
  );

  if (albums.length === 1) {
    await router.navigate(["/music", "albums", albums[0].albumid]);
  }

  return runInInjectionContext(injector, () => ({
    currentPage: 1,
    items: albums.map(mapAlbumToGridItem),
    limits,
    thumbnailType: "album",
  }));
}

export async function artistsResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(artistsResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, artists } = await musicService.getArtists(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: artists.map(mapArtistToGridItem),
    limits,
    thumbnailType: "artist",
  }));
}

export async function artistsByGenreResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(artistsByGenreResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);
  const router = inject(Router);

  const params = parse(genreValidator, route.params);
  const query = parse(pageValidator, route.queryParams);

  const { limits, artists } = await musicService.getArtistsByGenre(
    params.genre,
    query.page,
  );

  if (artists.length === 1) {
    await router.navigate(["/music", "artists", artists[0].artistid]);
  }

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: artists.map(mapArtistToGridItem),
    limits,
    thumbnailType: "artist",
  }));
}

export async function musicGenresResolver(
  route: ActivatedRouteSnapshot,
): Promise<GridData> {
  assertInInjectionContext(musicGenresResolver);

  const injector = inject(Injector);
  const musicService = inject(MusicService);
  const query = parse(pageValidator, route.queryParams);

  const { limits, genres } = await musicService.getMusicGenres(query.page);

  return runInInjectionContext(injector, () => ({
    currentPage: query.page,
    items: genres.map(mapMusicGenreToGridItem),
    limits,
    thumbnailType: "musicGenre",
  }));
}

function mapAlbumToGridItem(album: AudioDetailsAlbum): GridItem {
  return {
    id: album.albumid,
    details: [
      computed(() => album.artist?.join(", ")),
      computed(() => album.year),
    ],
    label: album.title ?? album.label,
    thumbnail: album.art?.thumb ?? album.thumbnail,
    url: `/music/albums/${album.albumid.toString()}`,
  };
}

function mapArtistToGridItem(artist: AudioDetailsArtist): GridItem {
  return {
    id: artist.artistid,
    details: [
      computed(() => artist.songgenres?.map((x) => x.title).join(", ")),
    ],
    label: artist.label,
    thumbnail: artist.thumbnail,
    url: `/music/artists/${artist.artistid.toString()}`,
  };
}

function mapMusicGenreToGridItem(genre: LibraryDetailsGenre): GridItem {
  return {
    id: genre.genreid,
    details: [],
    label: genre.title ?? genre.label,
    url: `/music/genres/${genre.label}`,
  };
}
