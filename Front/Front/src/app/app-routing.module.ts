import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {PlaylistsResolverService} from "./resolvers/playlists-resolver.service";
import {AddPlaylistComponent} from "./components/add-playlist/add-playlist.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {SongsResolversService} from "./resolvers/songs-resolvers.service";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: {
      playlists: PlaylistsResolverService
    }
  },
  {
    path:'add-playlist', component: AddPlaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'playlists/:id', component: PlaylistComponent,
    canActivate: [AuthGuard],
    resolve: {
      songs: SongsResolversService
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
