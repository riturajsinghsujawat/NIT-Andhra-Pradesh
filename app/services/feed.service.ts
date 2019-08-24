import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Feed } from '../models/feed/feed.model';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { Notification } from '../models/notification.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  lastGenFeed=null
  feeds=[]
  showMoreFeeds=true
  constructor(public db:AngularFirestore,private commonService:CommonService,public auth:AuthService,public notificationService:NotificationService,public authService:AuthService) { 
    this.getFeeds('general')  
  }

  addComment(feed:Feed,comment){
      let user:any=this.authService.resume
      comment.uname=user.about.name
      comment.uid=this.auth.getUserId()
      feed.comments.push(comment)
      this.db.collection('feeds').doc(feed.docId).set(feed).then(data=>{
      this.commonService.showToaster('comment added')
      let notification=new Notification()
      notification.title= this.authService.resume.about.name + "" + '  commented on your feed'
      notification.description=comment.content
      notification.action='/home/myfeeds'
      notification.timestamp=new Date()
      notification.type='feed' 
      if(feed.uid!=this.auth.getUserId()) {  
      notification.userids.push(feed.uid)
      this.notificationService.addNotification(notification)
      }
      return true
    })
    
  }

  getFeeds(type){
    this.feeds=[]
    if(type=='general'){
      return this.db.collection('feeds',ref=>ref.where('type','==','general').orderBy('createdOn','desc').limit(4)).get()
      .pipe(
        map(actions => 
          actions.docs.map(a => {
            this.lastGenFeed=actions.docs[actions.docs.length-1];
            const data = a.data() as Feed;
            const docId = a.id;
            return { docId, ...data };
        }))
      ).subscribe(res=>{
        this.feeds=res
        this.commonService.loader=false
      })
    }


   
  }



  deletefeed(id){
    return this.db.collection("feeds").doc(id).delete().then(res=>{
  this.commonService.showToaster("feed deleted","success")
    }).catch(err=>{
      this.commonService.showToaster("Feed can't be deleted","error")
    })
  }

  getMyfeeds(){
      return this.db.collection('feeds',ref=>ref.where('uid','==', this.auth.getUserId()).orderBy('createdOn','desc')).get()
      .pipe(
        map(actions => actions.docs.map(a => {
          const data = a.data() as Feed;
          const docId = a.id;
          return { docId, ...data };
        }))
      )
  }       
  
  getUserfeeds(id){
    return this.db.collection('feeds',ref=>ref.where('uid','==', id).orderBy('createdOn','desc')).get()
    .pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as Feed;
        const docId = a.id;
        return { docId, ...data };
      }))
    )
}   

getNextFeeds(){
  return this.db.collection('feeds',ref=>ref.where('type','==','general').orderBy('createdOn','desc').startAfter(this.lastGenFeed).limit(6)).get()
  .pipe(
    map(actions => actions.docs.map(a => {
      this.lastGenFeed=actions.docs[actions.docs.length-1]
      const data = a.data() as Feed;
      const docId = a.id;
      return { docId, ...data };
    }))
  ).subscribe(res=>{
    if(res.length==0){
      this.showMoreFeeds=false
    }
    res.forEach(element=>{
      this.feeds.push(element)
    })

  })
}

getProjectFeeds(type,id){
  return this.db.collection('feeds',ref=>ref.where('type','==','project').where('pid','==',id).orderBy('createdOn','desc')).get()
  .pipe(
    map(actions => 
      actions.docs.map(a => {
        this.lastGenFeed=actions.docs[actions.docs.length-1];
        const data = a.data() as Feed;
        const docId = a.id;
        return { docId, ...data };
    }))
  )
}


}
