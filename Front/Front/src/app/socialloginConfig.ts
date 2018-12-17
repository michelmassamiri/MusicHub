import {User} from "./entity/User";

export function tokenGetter() {
  const user : User = JSON.parse(localStorage.getItem('currentUser'));
  if(user !== null && user.token !== null) {
    return user.token;
  }
  return null;
}
