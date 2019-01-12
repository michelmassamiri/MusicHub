import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {ImportFromYoutubeService} from "../../services/import-from-youtube.service";
import {Playlist} from "../../entity/Playlist";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";
import {MatDialog, MatDialogActions} from "@angular/material";
import {EditPlaylistComponent} from "../edit-playlist/edit-playlist.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playlists: Playlist[] = new Array<Playlist>();

  constructor(
    private playlistsService: PlaylistsService,
    private importYoutubePlaylist: ImportFromYoutubeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spninnerService: SpinnerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.playlists = this.route.snapshot.data['playlists'];
  }

  importFromYoutube() {
    this.spninnerService.display(true);
    this.importYoutubePlaylist.importPlaylists()
      .then((result) => {
        this.playlistsService.importUserPlaylists(result)
          .subscribe(
            youtubePlaylists => {
              this.updateYoutubePlaylists(youtubePlaylists);
              this.spninnerService.display(false);
            },
              error => {
                console.error(error);
                this.toastr.error("Impossible d'importez vos playlists depuis Youtube",
                  "Erreur d'importation");
                this.spninnerService.display(false);
              }
          );
      });
  }

  addPlaylist() {
    this.router.navigate(['add-playlist']);
  }

  deletePlaylist(id: string) {
    this.spninnerService.display(true);
    this.playlistsService.deleteUserPlaylist(id)
      .subscribe(
        deletedPlaylist => {
          this.playlists = this.playlists
            .filter(item => {
              return item.id !== deletedPlaylist.id;
            });
          this.spninnerService.display(false);
          this.toastr.success("La playlist est bien supprimée", "Succès");
        },
        err => {
          this.spninnerService.display(false);
          this.toastr.error("Impossible de supprimer la playlist", "Erreur");
          console.error(err);
        }
      );
  }

  updatePlaylist(playlist: Playlist): void {
    const dialogRef = this.dialog.open(EditPlaylistComponent, {
      width: '400px',
      data: {
        title: playlist.title,
        genre: playlist.genre,
        description: playlist.description,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.spninnerService.display(true);
        this.playlistsService.updateUserPlaylist(playlist.id, result)
          .subscribe(
            updatedPlaylist => {
              this.playlists = this.playlists.filter(item => {
                return item.id !== playlist.id;
              });
              this.playlists.push(updatedPlaylist);
              this.spninnerService.display(false);
              this.toastr.success('La playliste a été bien modifiée', 'Succès');
            },
            err => {
              this.toastr.error('Impossible de modifier la playliste', 'Erreur modification serveur');
              this.spninnerService.display(false);
            });
      }
    });
  }

  private updateYoutubePlaylists(youtubePlaylists: Playlist[]) {
    this.playlists = this.playlists.filter(item => {
      return !(item.link.includes("youtube"));
    });
    this.playlists = this.playlists.concat(youtubePlaylists);
  }

  public isYoutubePlaylist(playlist: Playlist): boolean {
    return (playlist.link.includes("youtube"));
  }

}
