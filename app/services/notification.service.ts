import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { timestamp } from 'rxjs/operators';
import { Notification } from '../models/notification.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
notifications=[]
count:number=0
  constructor(private db:AngularFirestore,private auth:AuthService) { 
 this.getNotifications().subscribe(res=>{
   this.notifications=res
   this.updateCount()
 })
    
  }

  addNotification(notification:Notification){
    return this.db.collection('notifications').add(Object.assign({},notification))
  }

setread(docId){
return this.db.collection('notifications').doc(docId).update({status:'read'}).then(res=>{
  this.updateCount()
})

}

  getNotifications(){
    return this.db.collection('notifications',ref=>ref.where('userids','array-contains',this.auth.getUserId()).orderBy('timestamp','desc')).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    )
  }

updateCount(){
  this.count=0
  this.notifications.forEach(element=>{
    if(element.status=='unread'){
      this.count=this.count + 1;
      
    }
  })
}
}