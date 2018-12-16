import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {IMPORTPLAYLIST, PLAYLISTS_URI} from "../../consts";
import {tap} from "rxjs/internal/operators";
import {Playlist} from "../entity/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  public getUserPlaylist(): Observable<any> {
    return this.http.get(PLAYLISTS_URI);
  }

  public createUserPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(PLAYLISTS_URI, playlist);
  }

  public importUserPlaylists(playlsts: Object[]): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(PLAYLISTS_URI, playlsts);
  }

}
