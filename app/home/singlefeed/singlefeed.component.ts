import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';



@Component({
  selector: 'app-singlefeed',
  templateUrl: './singlefeed.component.html',
  styleUrls: ['./singlefeed.component.scss'],
 })

export class SinglefeedComponent implements OnInit {
  showcomments = false;
  mode='feed'
  viewmore:boolean=false;
  hideviewmore:boolean=false
  // tslint:disable-next-line:no-input-rename
  @Input('feed') feed;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  // tslint:disable-next-line:no-input-rename
  @Input('admin') admin = false;
  constructor(public feedService: FeedService, public commonService: CommonService , private angularStoreage: AngularFireStorage ) { }

  ngOnInit() {
    this.checkLength();
   /*  this.commonService.getImage(this.feed.imageLogo).subscribe(data=>{
      this.feed.imageLogo=data
    }) */
    this.galleryImages = [
      {
        small: 'assets/images/loadmage.gif',
        medium: 'assets/images/loadmage.gif',
        big: 'assets/images/loadmage.gif'
      }
    ]
    this.galleryOptions = [
      {
          width: '600px',
          thumbnails:false,
          imageArrows:false,
          previewFullscreen:false,
          previewCloseOnClick:true,
          previewZoom:true,
          previewDownload:true
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: true,
          previewCloseOnClick:true,
          previewArrows:false,
          previewZoom:true,
          previewDownload:true
      }
  ];
    if (this.feed.image) {this.angularStoreage.ref(this.feed.image).getDownloadURL().subscribe(data=>{
      this.galleryImages = [
        {
          small: data,
          medium: data,
          big: data
        }
      ]
    });
  }
  }

  addComment(content: NgForm, feed) {
    this.feedService.addComment(feed, content.value);
    content.reset()
  }
 

  delete(id) {
    this.feedService.deletefeed(id);
  }

  viewMore()
{
  this.viewmore=!this.viewmore
}

checkLength(){
  if(this.feed.content.length<300){
   this.hideviewmore=true;
  }
}

}
