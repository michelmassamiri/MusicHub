import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Song} from "../entity/Song";
import {IMPORTSONGS, SONGS_URI} from "../../consts";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  public getSongsByPlaylist(playlistId: string) : Observable<Song[]> {
    return this.http.get<Song[]>(SONGS_URI, {params: new HttpParams().set('playlistId', playlistId)});
  }

  public deleteSongForPlaylist(songId: string): Observable<Song> {
    return this.http.delete<Song>(SONGS_URI +"/" + songId);
  }

  public createSongForPlaylist(song: Song): Observable<Song> {
    return this.http.post<Song>(SONGS_URI, song);
  }

  public updateSongForPlaylist(songId: string, args: any): Observable<Song> {
    return this.http.put<Song>(SONGS_URI + "/" + songId, args);
  }

  public importYoutubeSongs(songs: Object[], playlistId: string): Observable<Song[]> {
    return this.http.post<Song[]>(IMPORTSONGS + '/youtube', songs,
      {params: new HttpParams().set('playlistId', playlistId)});
  }

  public getAllSongsByUser(): Observable<Song[]> {
    return this.http.get<Song[]>(SONGS_URI).pipe(
      map((songs: Song[])=> {
        const result: Song[] = [];
        const map = new Map();

        for(const song of songs) {
          if(!map.has(song.link)) {
            map.set(song.link, true);
            result.push(song);
          }
        }
        return result;
      })
    );
  }

  public importAPISongs(songs: Song[], playlistId: string): Observable<Song[]> {
    return this.http.post<Song[]>(IMPORTSONGS + '/api', songs,
      {params: new HttpParams().set('playlistId', playlistId)});
  }
}
