import {  AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import {User} from "./entity/User";

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com')
  }]);

  return config;
}

export function tokenGetter() {
  const user : User = JSON.parse(localStorage.getItem('currentUser'));
  if(user !== null && user.token !== null) {
    return user.token;
  }
  return null;
}
