import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { ResumeService } from '../services/resume.service';
import { FeedService } from '../services/feed.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../other/animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class HomeComponent implements OnInit {
  constructor(public commonService: CommonService, public resumeService: ResumeService, public feedService: FeedService) { }

  ngOnInit() {
  }
  dismissAside() {
    this.commonService.showaside = false;
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  onPan(event) {
    this.commonService.showaside = true;
  }
  reload(event) {
    if (window.pageYOffset < 5) {
      console.log('reload');
      this.commonService.loader = true;
      this.feedService.getFeeds('general');
      this.resumeService.getAllResumes();
      this.commonService.loader = false;
    }
  }

}
