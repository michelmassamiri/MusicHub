import {  AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('490320770076-pgociv0l4kfqvtufupkengo5clh8ha62.apps.googleusercontent.com')
  }]);

  return config;
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
