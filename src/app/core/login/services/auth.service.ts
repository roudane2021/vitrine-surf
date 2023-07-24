import { inject } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Firestore, collectionData, collection, addDoc, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { UserInfo, UserSignIn } from '../models/login.model';
import { Router } from '@angular/router';

export interface UserProfile {
    username: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {



    constructor(private authService: AngularFireAuth,
                 private router: Router,
                 private ngZone: NgZone
                 ){

                    this.authService.authState.subscribe((user) => {
                        if (user) {
                            localStorage.setItem('token',JSON.stringify(user));
                        }
                      });
                 }

    SignIn(user: UserSignIn) {
        this.authService.signInWithEmailAndPassword(user.email, user.password)
         .then(result => {
            this.ngZone.run(() => {
                
                this.router.navigate(['vitrine/index']);
              });
         })
         .catch(error => {
            console.table(error)
         })
    }

     // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('token')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.authService
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

    SignOut() {
        return this.authService.signOut().then(() => {
          localStorage.removeItem('token');
          this.router.navigate(['sign-in']);
        });
      }


    
}

