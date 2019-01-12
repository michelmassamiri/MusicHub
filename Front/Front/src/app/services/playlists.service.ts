import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {IMPORTPLAYLIST, PLAYLISTS_URI} from "../../consts";
import {Playlist} from "../entity/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  public getUserPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(PLAYLISTS_URI);
  }

  public getUserPlaylistById(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(PLAYLISTS_URI + "/" + id);
  }

  public createUserPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(PLAYLISTS_URI, playlist);
  }

  public deleteUserPlaylist(id: string): Observable<Playlist> {
    return this.http.delete<Playlist>(PLAYLISTS_URI + "/" + id);
  }

  public updateUserPlaylist(id: string, args: any): Observable<Playlist> {
    return this.http.put<Playlist>(PLAYLISTS_URI + "/" + id, args);
  }

  public importUserPlaylists(playlsts: Object[]): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(IMPORTPLAYLIST + '/youtube', playlsts);
  }
}
