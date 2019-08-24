import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private db:AngularFirestore) { }

  addTest(test){
    return this.db.collection('tests').add(test)
  }

  getAllTest(){
    return this.db.collection('tests').snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    )
  }

  addQuestions(questions){
    questions.forEach(element => {
      this.db.collection('questionsbank').add(element)
    });
  }

  getTest(testid){
  
    let questions = this.db.collection('questionsbank',ref=>ref.where('id_test','==',testid)).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const docId = a.payload.doc.id;
        let selected=null
        let flag1=0 //0=unanswer,1=answered
        let flag2=0 //0=unreviev ,1=review
        return { docId,selected,flag1,flag2,...data };
      }))
    )
    let testDetails = this.db.collection('tests').doc(testid).snapshotChanges()
    .pipe(
      map(a => {
        const data = a.payload.data() as any;
        const docId = a.payload.id;
        return { docId, ...data };
       })
    )
    return {testDetails,questions}
  }

  getResult(questions:any[]){
    let correct=0
    questions.forEach(question=>{
      if(question.answer==question.selected){
        correct=correct+1
      }
    })
    return correct
  }

}
