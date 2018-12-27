import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {ImportFromYoutubeService} from "../../services/import-from-youtube.service";
import {Playlist} from "../../entity/Playlist";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {SpinnerService} from "../../services/spinner.service";

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
    private router: Router
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
              }
          );
      });
  }

  addPlaylist() {
    this.router.navigate(['add-playlist']);
  }

  deletePlaylist(id: string) {
    this.playlistsService.deleteUserPlaylist(id)
      .subscribe(
        deletedPlaylist => {
          this.playlists = this.playlists
            .filter(item => {
              return item.id !== deletedPlaylist.id;
            });
          this.toastr.success("La playlist est bien supprimée", "Succès");
          console.log(deletedPlaylist);
        },
        err => {
          this.toastr.error("Impossible de supprimer la playlist", "Erreur");
          console.error(err);
        }
      );
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
