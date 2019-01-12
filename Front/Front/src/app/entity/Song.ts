export class Song {
  id: string;
  name: string;
  artist: string;
  genre: string;
  link: string;
  playlist_id: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.artist = '';
    this.genre = '';
    this.link = '';
    this.playlist_id = '';
  }
}
