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

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from 'ng2-file-upload';
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
    FileUploadModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/auth/google']
      }
    }),
    ToastrModule.forRoot()
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
