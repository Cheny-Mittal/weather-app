import { Injectable } from '@angular/core';
import {AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';
import {first, switchMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: string = "";
  constructor(
    public auth: AngularFireLiteAuth, 
    public fs: AngularFireLiteFirestore
  ) { }
  isAuth() {
    return this.auth.isAuthenticated();
  }
  signin(email, pass) {
    this.email = email;
    return this.auth.signin(email, pass);
  }
  signup(email, pass) {
    this.email = email;
    return this.auth.signup(email, pass);
  }
  getEmail(){
    return this.email;
  }
  // getCities() {
  //   return this.auth.uid().pipe(switchMap((uid) => {
  //     return this.fs.read(`${uid}`);
  //   }));
  // }

  // addCity(name: string) {
  //   return this.auth.uid()
  //     .pipe(switchMap((uid) => {
  //       return this.fs
  //         .write(`${uid}/${name}`, {name, added: new Date()})
  //         .pipe(first());
  //     }), first());
  // }
}
