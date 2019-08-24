import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Resume } from '../models/resume/resume.model';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})

export class ResumeService {
  resumes=[]
  showMoreLoader=true
  lastresumedoc=null
  resumeDoccument: AngularFirestoreDocument;
  resumeCollection = this.db.collection('users');
  constructor(public commonService:CommonService,public db: AngularFirestore, public authService: AuthService,public storage:AngularFireStorage) {
    this.resumeDoccument = this.db.collection('users').doc(this.authService.getUserId());
    this.getAllResumes()
   }

   setResume(resume: Resume) {
    return this.resumeDoccument.set(resume);
  }

/*   getAllResumes() {
    return this.resumeCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Resume;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    );
  } */

  getAllResumes() { 
    this.resumes=[]
    return this.db.collection('users',ref=>ref.limit(6)).get().pipe(
      map(actions=>{
        return actions.docs.map(a=>{
          this.lastresumedoc=actions.docs[actions.docs.length-1]
          const data = a.data() as Resume;
          const docId = a.id;
          return { docId, ...data };
        })
      })
    ).subscribe(result=>{      
      this.resumes=result
      this.resumes.forEach(element => {
        if(element.imageLogo!='/user/profile.jpg')
         { 
          element.imageLogo = this.storage.ref(element.imageLogo).getDownloadURL();
        }       
      });
      this.filter()
      this.commonService.loader=false;
    })
  }

  getResume() {
    return this.resumeDoccument.get().pipe(
      map(actions=>{
        return actions.data()
      })
    );
  }

  getResumebyid(docid) {
    return this.db.collection('users').doc(docid).get().pipe(
      map(actions=>{
        return actions.data()
      })
    );
  }

  getAllResumesBySortProperty(property: string, order) {
  return this.db.collection('users', ref => ref.orderBy(property, order)).snapshotChanges()
  .pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Resume;
      const docId = a.payload.doc.id;
      return { docId, ...data };
    }))
  );

}

getNextResumes() {
  return this.db.collection('users',ref=>ref.startAfter(this.lastresumedoc).limit(6)).get().pipe(
    map(actions=>{
      return actions.docs.map(a=>{
        this.lastresumedoc=actions.docs[actions.docs.length-1]
        const data = a.data() as Resume;
        const docId = a.id;
        return { docId, ...data };
      })
    })
  ).subscribe(result=>{
    if(result.length==0){
      this.showMoreLoader=false
    }
    result.forEach(element=>{
      if(element.imageLogo!='/user/profile.jpg')
      {
       element.imageLogo = this.storage.ref(element.imageLogo).getDownloadURL();
     } 
      this.resumes.push(element)      
    })
    this.filter()
  })
}

  filter(){
    console.log('in filter')
    let not_to_show=[]
    this.resumes.forEach(element=>{      
      if(element.about.name=='StuMaze' || element.about.name=='CTAE'){
        console.log(element)
        not_to_show.push(element)
      }
    })
    not_to_show.forEach(element=>{
      this.resumes.splice(this.resumes.indexOf(element),1)
    })
  }
}
