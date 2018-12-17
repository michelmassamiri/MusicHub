import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Playlist} from "../entity/Playlist";
import {Observable, of, throwError} from "rxjs/index";
import {PlaylistsService} from "../services/playlists.service";
import {catchError} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsResolverService implements Resolve<Playlist[]>{

  constructor(
    private playlistService: PlaylistsService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Playlist[]> | Promise<Playlist[]> | Playlist[] {
    return this.playlistService.getUserPlaylist()
      .pipe(catchError((err => throwError(err.json().error  || 'Server error'))));
  }
}
