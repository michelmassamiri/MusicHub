export class User {
  firstname: string;
  lastname: string;
  email: string;
  socialMediasToken: {
    google: string;
    spotify: string;
    deezer: string;
  };
  token: string;

  constructor() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.socialMediasToken = {
      google: '',
      spotify: '',
      deezer: ''
    };
    this.token = '';
  }

  public clone(): User {
    let clonedUser: User = new User();
    clonedUser.firstname = this.firstname;
    clonedUser.lastname = this.lastname;
    clonedUser.email = this.email;
    clonedUser.socialMediasToken = this.socialMediasToken;
    clonedUser.token = this.token;
    return clonedUser;
  }
}
