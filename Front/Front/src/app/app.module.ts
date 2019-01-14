import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {tokenGetter} from "./socialloginConfig";
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';

import {HttpClientModule} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import {
  MatButtonModule, MatDialog, MatDialogModule, MatDialogRef, MatIconModule,
  MatMenuModule
} from "@angular/material";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FileSelectDirective } from 'ng2-file-upload';
import { EditPlaylistComponent } from './components/edit-playlist/edit-playlist.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';
import { AddSongComponent } from './components/add-song/add-song.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddPlaylistComponent,
    FileSelectDirective,
    EditPlaylistComponent,
    PlaylistComponent,
    EditSongComponent,
    AddSongComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/google']
      }
    }),
    ToastrModule.forRoot() // ToastrModule added
  ],
  entryComponents: [
    EditPlaylistComponent,
    EditSongComponent,
    AddSongComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
