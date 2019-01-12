import { Injectable } from '@angular/core';
declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class ImportFromYoutubeService {

  constructor() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyD02lMJuuN1OcX_7YYS_NOKThWCykvjnQU',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        clientId: '490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
      });
    });
  }

  importPlaylists(): Promise<any>{
    const isSignedInWithGoogle = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (isSignedInWithGoogle) {
      return this.listPlaylists();
    }
  }

  importSongsByPlaylist(playlistId: string): Promise<any> {
    const isSignedInWithGoogle = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (isSignedInWithGoogle) {
      return this.getSongsByPlaylistId(playlistId);
    }
  }

  private listPlaylists() : Promise<any> {
    return new Promise<any>(function (resolve, reject) {
      gapi.client.youtube.playlists.list({
        'part': 'snippet, contentDetails',
        'mine': 'true'
      })
      .then(
        (res) => {
          if(res && res.result && res.result.items) {
            resolve(res.result.items);
          }
        },
        error => console.log("ERROR " + JSON.stringify(error))
      )
      .catch(()=> {
        console.error('ERROR Import');
        reject('NOT_FOUND');
      });
    });
  }

  private getSongsByPlaylistId(playlistId: string): Promise<any> {
    return new Promise<any>(function (resolve, reject) {
      gapi.client.youtube.playlistItems.list({
        'playlistId': playlistId,
        'part': 'snippet, contentDetails',
        'maxResults': 25
      })
        .then(
          (res) => {
            if(res && res.result && res.result.items) {
              resolve(res.result.items);
            }
          },
          error => console.log("ERROR " + JSON.stringify(error))
        )
        .catch(()=> {
          console.error('ERROR Import');
          reject('NOT_FOUND');
        });
    });
  }
}
