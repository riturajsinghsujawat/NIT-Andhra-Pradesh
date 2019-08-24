import { Component, OnInit } from '@angular/core';
import { ManageBlogService } from 'src/app/services/blog.service';
import { CommonService } from 'src/app/services/common.service';
import { Blog } from 'src/app/models/blog/blog.model';

import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {
  blogs:Blog[]
  singleBlog:Blog
  unique
  selectedfiles:FileList
  percentage:number
  imgsrc:Observable<string>
  snapshot: Observable<any>;

  mode="list" // add edit list 
  constructor(public blogService:ManageBlogService,public storage:AngularFireStorage,public commonService:CommonService ) { }

  ngOnInit() {
    this.commonService.loader=true;
    this.blogs=[]
    this.getBlogs()
  }
  getBlogs(){
    this.blogService.getAllBlogs().subscribe(data=>{
      this.blogs=data
      this.commonService.loader=false;
    })
  }
  save(){
    if(this.mode=='add'){
      this.singleBlog.createdBy=this.blogService.authService.getUserId()
      this.blogService.addBlog(this.singleBlog)
      this.mode='list'
    }
    else if(this.mode=='edit'){
      this.blogService.setBlog(this.singleBlog)
      this.mode='list'
    }
  }
  editBlog(blog){
    this.singleBlog=blog
    if(this.singleBlog.cover){
      this.imgsrc=this.storage.ref(this.singleBlog.cover).getDownloadURL()
    }
    this.mode='edit'
  }
  addBlog(){
    this.imgsrc=null
    this.selectedfiles=null
    this.singleBlog=new Blog()
    this.mode='add'
  }
  delBlog(blog){
    this.blogService.delBlog(blog)
  }
  listBlogs(){
    this.mode='list'
  }
  choosefiles(event){
    if(this.selectedfiles || this.imgsrc){
      this.delCover()
      this.selectedfiles=null
      this.imgsrc=null
    }
    this.selectedfiles=event.target.files;
    if(this.selectedfiles.item(0)){
      this.uploadpic() 
    }
    
  }
  uploadpic(){
    let file=this.selectedfiles.item(0);
    let date=new Date()
    this.unique='/blogs/cover'+Math.floor(Math.random()*100000)+date.getTime()+file.name
    const ref = this.storage.ref(this.unique);
    const uploadtask = this.storage.upload(this.unique,file);
    let percentageChange=uploadtask.percentageChanges().subscribe(data=>{
      this.percentage=data
    })
    this.snapshot   =uploadtask.snapshotChanges()
    uploadtask.snapshotChanges().pipe(
      finalize(() => {
        this.imgsrc = ref.getDownloadURL()  
        percentageChange.unsubscribe()   
        this.percentage=null
      })
    )
    .subscribe();
    this.singleBlog.cover=this.unique; 
  }
  delCover(){
    this.imgsrc=null
    this.storage.ref(this.unique).delete()    
  }
  getImage(path){
    this.imgsrc=this.storage.ref(path).getDownloadURL()
  }



}
