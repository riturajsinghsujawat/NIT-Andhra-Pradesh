import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/services/feed.service';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  content = '';
  publishbtntext="Publish"
  feeds = [];
  imagestatus = 'Add Image';
  showcomments = false;
  unique = null;
  toggleaddpost:boolean=false;
  task: AngularFireUploadTask;
  selectedfiles: FileList;
  category:string;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // tslint:disable-next-line:max-line-length
  constructor(public commonService: CommonService, private authService: AuthService, private db: AngularFirestore, public feedService: FeedService) { }

  ngOnInit() {
   // this.feedService.getFeeds('general')    
  }

 

/*   getFeeds() {
    this.feedService.getFeeds('general').subscribe(data => {
      this.feeds = data;
      this.authService.commonService.loader = false;
    });
  } */

  addComment(content: NgForm, feed) {
    this.feedService.addComment(feed, content.value);
  }

 
 
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

/*   onScroll(){
    console.log('on scroll')
    this.feedService.getNextFeeds().subscribe(data=>{
      data.forEach(element=>{
        this.feeds.push(element)
      })
    })
  } */



}
