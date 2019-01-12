import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Song} from "../entity/Song";
import {IMPORTSONGS, SONGS_URI} from "../../consts";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  public getSongsByPlaylist(playlistId: string) : Observable<Song[]> {
    return this.http.get<Song[]>(SONGS_URI, {params: new HttpParams().set('playlistId', playlistId)});
  }

  public importYoutubeSongs(songs: Object[], playlistId: string): Observable<Song[]> {
    return this.http.post<Song[]>(IMPORTSONGS + '/youtube', songs,
      {params: new HttpParams().set('playlistId', playlistId)});
  }
}
