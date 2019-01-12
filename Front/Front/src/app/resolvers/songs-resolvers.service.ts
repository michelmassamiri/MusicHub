import { Injectable } from '@angular/core';
import {Playlist} from "../entity/Playlist";
import {Observable, throwError} from "rxjs/index";
import {PlaylistsService} from "../services/playlists.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {catchError} from "rxjs/internal/operators";
import {Song} from "../entity/Song";
import {SongService} from "../services/song.service";
import {ImportFromYoutubeService} from "../services/import-from-youtube.service";

@Injectable({
  providedIn: 'root'
})
export class SongsResolversService implements Resolve<Song[]> {

  constructor(
    private songService: SongService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Song[]> | Promise<Song[]> | Song[] {
    const id = route.paramMap.get('id');

    return this.songService.getSongsByPlaylist(id)
      .pipe(catchError((err => throwError(err  || 'Server error'))));
  }

}
