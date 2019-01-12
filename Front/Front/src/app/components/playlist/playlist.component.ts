import { Component, OnInit } from '@angular/core';
import {ImportFromYoutubeService} from "../../services/import-from-youtube.service";
import {ActivatedRoute} from "@angular/router";
import {Playlist} from "../../entity/Playlist";
import {PlaylistsService} from "../../services/playlists.service";
import {Song} from "../../entity/Song";
import {SpinnerService} from "../../services/spinner.service";
import {SongService} from "../../services/song.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlist: Playlist = new Playlist();
  songs: Song[] = [];

  constructor(
    private importYoutubePlaylist: ImportFromYoutubeService,
    private playlistService: PlaylistsService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService,
    private songService: SongService,
    private toasterService: ToastrService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playlistService.getUserPlaylistById(id)
      .subscribe(item =>{
        this.playlist = item;
        this.songs = this.route.snapshot.data['songs'];
      },
        error => {
          console.error(error);
        }
      );
  }

  importSongs() {
    const youtubePlaylistId = this.playlist.link.split("?")[1].replace("list=", "");
    const self = this;
    this.spinnerService.display(true);
    this.importYoutubePlaylist.importSongsByPlaylist(youtubePlaylistId)
      .then((results)=> {
        this.songService.importYoutubeSongs(results, self.playlist.id)
          .subscribe(youtubeSongs => {
            this.updateYoutubeSongs(youtubeSongs);
            this.spinnerService.display(false);
          },
          error => {
            console.error(error);
            this.spinnerService.display(false);
          });
      })
      .catch((err)=> {
        this.toasterService.error('Erreur Import de Youtube', "Erreur de l'importation du Youtube");
        this.spinnerService.display(false);
      });
  }

  public isYoutubePlaylist(playlist: Playlist): boolean {
    return (playlist.link.includes("youtube"));
  }

  playSong(link: string) {
    window.open(link, '_blank');
  }

  private updateYoutubeSongs(youtubeSongs: Song[]) {
    this.songs = this.songs.filter(item => {
      return !(item.link.includes("youtube"));
    });
    this.songs = this.songs.concat(youtubeSongs);
  }
}
