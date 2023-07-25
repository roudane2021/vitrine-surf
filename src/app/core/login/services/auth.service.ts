import { inject } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Firestore, collectionData, collection, addDoc, setDoc, getDoc, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { UserInfo, UserSignIn } from '../models/login.model';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { NAME_VARIABLE, URL_IHM } from 'src/app/shared/models-general/general-model';

export interface UserProfile {
    username: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {



    constructor(private authService: AngularFireAuth,
                 private router: Router,
                 private ngZone: NgZone,
                 private firestore: Firestore
                 ){

                    this.authService.authState.subscribe((user) => {
                        if (user) {
                            localStorage.setItem(NAME_VARIABLE.token,JSON.stringify(user));
                        }
                      });
                 }

    SignIn(user: UserSignIn) {
        this.authService.signInWithEmailAndPassword(user.email, user.password)
         .then((result : any) => {
            this.ngZone.run(() => {
                this.router.navigate([URL_IHM.vitrine]);
              });
              this.addUser(result.user);
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

  addUser (user: any) {
    const userData: UserInfo = this.constructUser(user);
    const myCollectionRef: CollectionReference = this.getCollectionReference( 'user');
      const userPromise : Promise<DocumentReference> =  addDoc(myCollectionRef, userData);
      userPromise.then(
        (data : DocumentReference ) => console.log(data.id)
      );
  }

  addUserRturn (user : UserInfo): Observable<DocumentReference> {
    const userData: UserInfo = this.constructUser(user);
    const myCollectionRef: CollectionReference = this.getCollectionReference( 'user');
      const userPromise : Promise<DocumentReference> =  addDoc(myCollectionRef, userData);
      
      return from(userPromise);
  }

 private  getCollectionReference(collectionName : string ) : CollectionReference {

    return collection(this.firestore, collectionName);
  }

  private constructUser(user : any ) : UserInfo{
  return  {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
  }


    
}

