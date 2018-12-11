import {environment} from "./environments/environment";

export const MUSICHUB_API = environment.MusicHub_API;

/* URIs */
export const AUTH_URI = '/auth';
export const AUTH_GOOGLE_URI = AUTH_URI + '/google';
export const AUTH_SPOTIFY_URI = AUTH_URI + '/spotify';
export const AUTH_DEEZER_URI = AUTH_URI + '/deezer';
export const ADD_USER_URI = 'register';
