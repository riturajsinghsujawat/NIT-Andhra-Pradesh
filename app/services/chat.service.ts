import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public db :AngularFirestore,public authService:AuthService,public notificationService:NotificationService) { }

  getChatId(uid){
    let loginuserid=this.authService.getUserId()
    if(loginuserid<uid){
      let docId=loginuserid+uid
    }else{
      let docId=uid+loginuserid
    }
    this.db.collection('chats').doc(this.authService.getUserId()+uid).set({users:[this.authService.getUserId(),uid]})
    return this.authService.getUserId()+uid
  }
  sendMessage(message,docId:string,receiver_id?){
    let mesg = {message:message,id_sender:this.authService.getUserId(),timestamp:new Date()}
    this.db.collection('chats').doc(docId).collection('messages').add(mesg).then(data=>{
      let notification=new Notification()
      notification.title= 'New Message From' + " " +this.authService.resume.about.name
      notification.description=message
      notification.action='/home/chats'
      notification.timestamp=new Date() 
      notification.type='chat'
      let uid:string=this.authService.getUserId()
      let sid=""
      uid.length
      console.log()
      if(docId.substring(uid.length,docId.length+1)==uid){
        sid=docId.substring(0,docId.length-uid.length)        
      }
      else{
        sid=docId.substring(uid.length,docId.length+1)
      }
      console.log(sid)      
      notification.userids.push(sid)
      this.notificationService.addNotification(notification)
    })
  }
  getMessages(docId){
    return this.db.collection('chats').doc(docId).collection('messages',ref=>ref.orderBy('timestamp','asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    )
  }
  getChats(){
    return this.db.collection('chats',ref=>ref.where('users','array-contains',this.authService.getUserId())).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    )
  }
}
