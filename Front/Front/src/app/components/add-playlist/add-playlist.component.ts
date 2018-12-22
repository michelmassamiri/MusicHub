import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {Location} from "@angular/common";
import {Playlist} from "../../entity/Playlist";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {
  genres: string[] = ['Pop', 'Rock', 'Jazz', 'Latino', 'R&B', 'Rap', 'HipHop', 'Techno', 'Metal'];
  playlist: Playlist = new Playlist();

  constructor(
    private playlistService: PlaylistsService,
    private location: Location,
    private tosterService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  addPlaylist() {
    this.playlistService.createUserPlaylist(this.playlist)
      .subscribe(
        newPlaylist => {
        this.tosterService.success('Votre nouvelle playlist a été bien ajoutée', 'Succès');
        this.router.navigate(['']);
        console.log(newPlaylist);
      },
        error => {
          this.tosterService.error("Impossible de crééer la nouvelle playlist", "Erreur lors de l'ajout");
          console.error(error);
        });
  }

  cancel() {
    this.location.back();
  }

}
