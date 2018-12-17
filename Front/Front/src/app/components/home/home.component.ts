import { Component, OnInit } from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {ImportFromYoutubeService} from "../../services/import-from-youtube.service";
import {Playlist} from "../../entity/Playlist";
import {ActivatedRoute} from "@angular/router";

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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.playlists = this.route.snapshot.data['playlists'];
  }

  importFromYoutube() {
    this.importYoutubePlaylist.importPlaylists()
      .then((result) => {
        this.playlistsService.importUserPlaylists(result)
          .subscribe(
            playlists => {
              this.playlists = playlists;
            },
              error => console.error(error)
          );
      });
  }
}
