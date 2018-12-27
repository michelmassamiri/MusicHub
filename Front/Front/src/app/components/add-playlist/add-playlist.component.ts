import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {Location} from "@angular/common";
import {Playlist} from "../../entity/Playlist";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MUSICHUB_API, THUMBNAIL_UPLOAD_URI} from "../../../consts";
import {LoginService} from "../../services/login.service";
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {
  genres: string[] = ['Pop', 'Rock', 'Jazz', 'Latino', 'R&B', 'Rap', 'HipHop', 'Techno', 'Metal'];
  playlist: Playlist = new Playlist();
  uploader: FileUploader;
  @ViewChild('selectedPicture') selectedPicture: any;

  constructor(
    private playlistService: PlaylistsService,
    private location: Location,
    private tosterService: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.uploader = new FileUploader({
      url: THUMBNAIL_UPLOAD_URI,
      authToken: 'Bearer' + ' ' + this.loginService.currentUserValue.token,
      allowedMimeType: ['image/png', 'image/jpeg', 'image/jpg'],
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.playlist.thumbnail = MUSICHUB_API + '/uploads/' + JSON.parse(response);
    };
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

  removePhoto(item) {
    this.uploader.removeFromQueue(item);
    this.selectedPicture.nativeElement.value = '';
  }

}
