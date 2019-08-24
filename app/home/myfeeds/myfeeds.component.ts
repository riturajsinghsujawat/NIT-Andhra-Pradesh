import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-myfeeds',
  templateUrl: './myfeeds.component.html',
  styleUrls: ['./myfeeds.component.scss']
})
export class MyfeedsComponent implements OnInit {
  feeds=[]
  constructor(public authService:AuthService,public feedService:FeedService) { }

  ngOnInit() {
    this.authService.commonService.loader=true
    this.getMyfeeds() 
    }

  getMyfeeds(){
    this.feedService.getMyfeeds().subscribe(data=>{
      this.feeds=data
      this.authService.commonService.loader=false     
    })

  }



}
