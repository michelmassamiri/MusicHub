import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {PlaylistsResolverService} from "./resolvers/playlists-resolver.service";
import {AddPlaylistComponent} from "./components/add-playlist/add-playlist.component";

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
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
