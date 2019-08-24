import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Blog } from '../models/blog/blog.model';

@Injectable({
  providedIn: 'root'
})
export class ManageBlogService {  
  shopProductsCollection:AngularFirestoreCollection
  constructor(public db:AngularFirestore,public authService:AuthService) { 
    this.shopProductsCollection=this.db.collection('blogs',ref=>ref.where('createdBy','==',this.authService.getUserId()).orderBy('createdOn'));
  }
  getAllBlogs(){
    return this.shopProductsCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Blog;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    )
  }
  getBlog(docid){
    return this.db.collection('blogs').doc(docid).valueChanges()
  }
  setBlog(blog:Blog){
    return this.db.collection('blogs').doc(blog.docId).set(Object.assign({}, blog))
  }
  addBlog(blog){
    return this.db.collection('blogs').add(Object.assign({}, blog))
  }
  delBlog(blog:Blog){
    return this.db.collection('blogs').doc(blog.docId).delete()
  }
}





