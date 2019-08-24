import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Resume } from '../models/resume/resume.model';
import { ResumeService } from './resume.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  temppath = '/home'
  userDetails = null
  resume: Resume = new Resume();
  constructor(public router: Router, public firebaseAuth: AngularFireAuth, public db: AngularFirestore, public commonService: CommonService) {
    this.commonService.loader = false
    console.log(localStorage.getItem('userId'))
    firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userDetails = user;
        this.db.collection('users').doc(this.userDetails.uid).get().subscribe(res => {
          this.resume = res.data()
          this.resume.id = res.id
          let date=Date()
          let name=this.resume.about.name
          let email=this.resume.about.email
          let phone = this.resume.about.phone
          this.db.collection('logs').add({date,email,name,phone})
        })
      }
      else {
        this.userDetails = null;
        this.commonService.loader = false
      }
    });
  }

  signin(email, password) {
    this.commonService.loader = true;
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        value.user.uid
        localStorage.setItem('userId',value.user.uid)
        this.registerToken(value.user.uid)
        
        
        this.setResume();

        this.router.navigate([this.temppath])
      })
      .catch(err => {

        if (err.code) {
          this.commonService.showToaster("Enter Valid Credentials", "error")
          this.commonService.loader = false;
        }

      });

  }

  signup(email: string, password: string, name: string, phone: string) {

    this.commonService.loader = true;
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        localStorage.setItem('userId',value.user.uid)
        this.registerToken(value.user.uid)
        let newResume = new Resume()
        newResume.about.email = value.user.email;
        newResume.about.name = name
        newResume.about.phone = phone

        this.db.collection('users').doc(value.user.uid).set(Object.assign({}, newResume)).then(res => {
          this.temppath = '/slider'
          this.setResume()
        }).catch(err => {
          
          
          this.commonService.loader = false;
        })
      })
      .catch(err => {
        this.commonService.showToaster("Something Went Wrong , Try again", "error")
        this.commonService.loader = false;
      });
  }


  logout() {

    this.firebaseAuth.auth.signOut().then(data => {
      localStorage.removeItem('userId')
      window.location.reload()
      this.userDetails = null;
      this.resume = null ;
      this.deRegisterToken()

    })
  }
  isAuthenticated() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }
  getUserId() {
    
    return localStorage.getItem('userId');
  }
  getUserName() {
    this.db.collection('users').doc(this.userDetails.uid).valueChanges()
  }

  resetPassword(email: string) {
    this.firebaseAuth.auth.sendPasswordResetEmail(email).then(res => {

    })
  }

  setResume() {
    this.db.collection('users').doc(localStorage.getItem('userId')).get().subscribe(res => {
      this.resume = res.data()
      this.resume.id = res.id
      this.router.navigate([this.temppath])
    })
  }
  registerToken(id){
    //console.log('Initializing HomePage');

    PushNotifications.register();

    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
        /* alert('Push registration success, token: ' + token.value); */
        this.db.collection('tokens').doc(token.value.toString()).set({userId:id,token:token.value.toString()})
      }
    );

    PushNotifications.addListener('registrationError', 
      (error: any) => {
      //  alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
      //  alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
      //  alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }


  deRegisterToken(){
   

    PushNotifications.register();

    PushNotifications.addListener('registration', 
      (token: PushNotificationToken) => {
       // alert('Push registration success, token: ' + token.value);
        this.db.collection('tokens').doc(token.value.toString()).delete();
      }
    );

    PushNotifications.addListener('registrationError', 
      (error: any) => {
      //  alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived', 
      (notification: PushNotification) => {
      //  alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed', 
      (notification: PushNotificationActionPerformed) => {
      //  alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }
}
