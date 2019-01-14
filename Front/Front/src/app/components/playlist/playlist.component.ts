import { Component, OnInit } from '@angular/core';
import {ImportFromYoutubeService} from "../../services/import-from-youtube.service";
import {ActivatedRoute} from "@angular/router";
import {Playlist} from "../../entity/Playlist";
import {PlaylistsService} from "../../services/playlists.service";
import {Song} from "../../entity/Song";
import {SpinnerService} from "../../services/spinner.service";
import {SongService} from "../../services/song.service";
import {ToastrService} from "ngx-toastr";
import {EditPlaylistComponent} from "../edit-playlist/edit-playlist.component";
import {MatDialog} from "@angular/material";
import {EditSongComponent} from "../edit-song/edit-song.component";
import {AddSongComponent} from "../add-song/add-song.component";

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
    private toasterService: ToastrService,
    public dialog: MatDialog
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

  public isYoutubeSong(song: Song): boolean {
    return (song.link.includes("youtube"));
  }

  playSong(link: string) {
    window.open(link, '_blank');
  }

  deleteSong(songId: string) {
    this.songService.deleteSongForPlaylist(songId)
      .subscribe(deletedSong => {
        this.songs = this.songs.filter(item => {
          return item.id !== deletedSong.id;
        });
        this.toasterService.success("la chanson a été bien supprimée", "Chanson supprimée");
      },
      err=> {
        console.error(err);
        this.toasterService.error("La chanson n'a pas été bien supprimée", "Erreur Serveur");
      });
  }

  updateSong(song: Song): void {
    const dialogRef = this.dialog.open(EditSongComponent, {
      width: '400px',
      data: {
        name: song.name,
        genre: song.genre,
        artist: song.artist,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.spinnerService.display(true);
        this.songService.updateSongForPlaylist(song.id, result)
          .subscribe(
            updatedSong => {
              this.songs = this.songs.filter(item => {
                return item.id !== song.id;
              });
              this.songs.push(updatedSong);
              this.spinnerService.display(false);
              this.toasterService.success('La chanson a été bien modifiée', 'Succès');
            },
            err => {
              this.toasterService.error(
                'Impossible de modifier la chanson', 'Erreur modification serveur'
              );
              this.spinnerService.display(false);
            });
      }
    });
  }

  addSongsToPlaylist() {
    this.songService.getAllSongsByUser()
      .subscribe(songs=> {
        const dialogRef = this.dialog.open(AddSongComponent, {
          width: '600px',
          data: {
            songs: songs,
            playlistId: this.playlist.id
          }
        });

        dialogRef.afterClosed().subscribe(results => {
          if(results) {
            this.spinnerService.display(true);
            this.songService.importAPISongs(results, this.playlist.id)
              .subscribe(newSongs=> {
                this.songs = this.songs.concat(newSongs);
                this.spinnerService.display(false);
              },
              err=> {
                this.spinnerService.display(false);
                this.toasterService.error("Impossible d'ajouter des chansons", "Erreur serveur");
              });
          }
          this.spinnerService.display(false);
        });
      },
      err=> {
        this.toasterService.error("Impossible de retrouver les chansons", "Erreur serveur");
      });
  }

  private updateYoutubeSongs(youtubeSongs: Song[]) {
    this.songs = this.songs.filter(item => {
      return !(item.link.includes("youtube"));
    });
    this.songs = this.songs.concat(youtubeSongs);
  }
}
