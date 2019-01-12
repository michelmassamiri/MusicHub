export class Playlist {
  id: string;
  title: string;
  genre: string;
  link: string;
  thumbnail: string;
  description: string;
  nbItems: number;
  user_id: string;

  constructor(){
    this.id = '';
    this.title = '';
    this.genre = '';
    this.link = '';
    this.thumbnail = '';
    this.description = '';
    this.nbItems = 0;
    this.user_id = '';
  }
}
