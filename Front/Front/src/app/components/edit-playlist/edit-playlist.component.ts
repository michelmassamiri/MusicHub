import {Component, Inject, OnInit} from '@angular/core';
import {PlaylistsService} from "../../services/playlists.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  genres: string[] = ['Pop', 'Rock', 'Jazz', 'Latino', 'R&B', 'Rap', 'HipHop', 'Techno', 'Metal'];

  constructor(
    public dialogRef: MatDialogRef<EditPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
