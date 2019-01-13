import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  genres: string[] = ['Pop', 'Rock', 'Jazz', 'Latino', 'R&B', 'Rap', 'HipHop', 'Techno', 'Metal'];

  constructor(
    public dialogRef: MatDialogRef<EditSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
