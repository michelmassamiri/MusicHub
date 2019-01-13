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

  public deleteSongForPlaylist(playlistId: string, songId: string): Observable<Song> {
    return this.http.delete<Song>(SONGS_URI +"/" + songId,
      {params: new HttpParams().set('playlistId', playlistId)});
  }

  public createSongForPlaylist(playlistId: string, song: Song): Observable<Song> {
    return this.http.post<Song>(SONGS_URI, song, {params: new HttpParams().set('playlistId', playlistId)});
  }

  public updateSongForPlaylist(playlistId: string, songId: string, args: any): Observable<Song> {
    return this.http.put<Song>(SONGS_URI + "/" + songId, args,
      {params: new HttpParams().set('playlistId', playlistId)});
  }

  public importYoutubeSongs(songs: Object[], playlistId: string): Observable<Song[]> {
    return this.http.post<Song[]>(IMPORTSONGS + '/youtube', songs,
      {params: new HttpParams().set('playlistId', playlistId)});
  }
}
