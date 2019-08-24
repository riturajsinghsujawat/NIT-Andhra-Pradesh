import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FeedService } from 'src/app/services/feed.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss']
})
export class AddpostComponent implements OnInit {
  content = '';
  publishbtntext="Publish"
  imagestatus = 'Add Image';
  toggleaddpost:boolean=false;
  task: AngularFireUploadTask;
  selectedfiles: FileList;
  category:string;
  unique = null;
  mode:string='first'
  imgsrc:any
  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;
  type=null
  pid=null
  // Download URL
  downloadURL: Observable<string>;
  constructor( private route: ActivatedRoute,public commonService:CommonService, private authService:AuthService, private db: AngularFirestore, public feedService: FeedService) { }

  ngOnInit() {
    this.type=this.route.snapshot.paramMap.get('type')
    if(this.type=='project'){
      this.pid=this.route.snapshot.paramMap.get('id')
    }
  }

  publish(content: NgForm) {
    this.publishbtntext='Publishing...'
    this.commonService.loader=true
    const createdOn = new Date();
    const user = this.authService.resume;
    const uname = user.about.name;
    const imageLogo = user.imageLogo;
    const image = this.unique;
    const uid = this.authService.getUserId();
    const type = this.type;
    const cate = this.category;
    const comments = [];
    if(this.type=='project'){
      const pid = this.pid
      this.db.collection('feeds').add({image,pid, createdOn, uname, uid, imageLogo, type,cate, comments, ...content.value}).then(data => {

        content.reset();
        this.commonService.loader=false
        this.commonService.showToaster('Published')
        this.imagestatus = 'no image selected';
        this.unique = null;
        this.publishbtntext="Publish"
        if(this.type=='project'){
          let url = '/home/projects/' + this.pid;
          this.authService.router.navigateByUrl(url)
        }
        else {
          this.authService.router.navigateByUrl('/home')
        }
       
  
      }).catch(err=>{
        console.log(err)
        this.commonService.showToaster('Unable to Publish.','error')
      })
    }
    else{
      this.db.collection('feeds').add({image, createdOn, uname, uid, imageLogo, type,cate, comments, ...content.value}).then(data => {

        content.reset();
        this.commonService.loader=false
        this.commonService.showToaster('Published')
        this.imagestatus = 'no image selected';
        this.unique = null;
        this.publishbtntext="Publish"
        this.authService.router.navigateByUrl('/home')
  
      }).catch(err=>{
        console.log(err)
        this.commonService.showToaster('Unable to Publish.','error')
      })
    }


}

choosefiles(event) {
  if (this.selectedfiles || this.downloadURL) {
    console.log(this.selectedfiles + "seleddd")
    console.log(this.downloadURL + "download")
    if(this.unique){
      this.delImage();
    }    
    this.selectedfiles = null;
    this.downloadURL = null;
  }
  this.selectedfiles = event.target.files;
  if (this.selectedfiles.item(0)) {
    const data = new Date();
    this.unique = '/feeds/image' + Math.floor(Math.random() * 100000) + data.getTime() + this.selectedfiles.item(0).name;
    this.imagestatus = 'Uploading...';
    this.commonService.uploadImage(this.selectedfiles.item(0), this.unique).then(data => {
      console.log(data)
      this.imgsrc=this.commonService.getImage(this.unique);
      this.imagestatus = 'Uploaded successfully'; 
    });
    
  }


}


delImage() {
this.imagestatus='Add Image'
this.commonService.delImage(this.unique)
}

onSelectposttype(category){
  this.category=category;
  this.mode='second';
}



}
