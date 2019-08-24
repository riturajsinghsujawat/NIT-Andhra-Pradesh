import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project/project.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { FeedService } from 'src/app/services/feed.service';
import { Request } from 'src/app/models/request.model';
import { CommonService } from 'src/app/services/common.service';
import { ProposalsService } from 'src/app/services/proposals.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  showcomments = false;
  project: Project = {};
  content = '';
  admin = false;
  feeds = [];
  appliance: Request;
  toggleApplyProject = false;
  projectId: string;
  mode = null;
  userid = null;
  loader:boolean=false;

  constructor(public projectService: ProjectService, public commonService: CommonService,
     public proposalService: ProposalsService, private route: ActivatedRoute, private authService: AuthService,
      private db: AngularFirestore,
      private feedService: FeedService) { }

  ngOnInit() {
    this.commonService.loader = true;
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.userid = this.authService.getUserId();
    this.projectService.getProject(this.projectId).subscribe(data => {
      this.project = data;
      this.commonService.loader = false;
      this.checkAdmin();
    });
    this.mode = 'overview';

  }

checkAdmin() {
  if (this.project.uid === this.authService.getUserId()) {this.admin = true; }

}


Apply() {

  this.proposalService.Apply(this.appliance).then(data => {
    this.commonService.showToaster('Applied successfully');
    this.toggleApplyProject = false;
  }).catch(err => {
    this.commonService.showToaster('error occoured', 'error');
  });
}

applyForProject() {

  let cantApply = false;
this.project.team.forEach(member => {
  if (this.authService.getUserId() === member.uid) {
    this.commonService.showToaster('Already in the team , Cannot Apply ', 'error');
cantApply = true;
  }
});

if (!cantApply) {

  this.toggleApplyProject = true;
  this.appliance = new Request();
  this.appliance.pid = this.projectId;
  this.appliance.project_title = this.project.title;
  this.appliance.type = 'apply';
  this.appliance.id_lead = this.project.uid;
  this.appliance.id_user = this.authService.getUserId();
}
}
  publish(content: NgForm) {
    const createdOn = new Date();

      const user: any = this.authService.resume;
      const uname = user.about.name;
      const type = 'project';
      const comments = [];
      const pid = this.route.snapshot.paramMap.get('id');
      const uid = this.authService.getUserId();
      this.db.collection('feeds').add({createdOn, uname, uid, type, pid, comments, ...content.value}).then(data => {
        this.authService.commonService.showToaster('feed published');
        content.reset();
        this.getFeeds();
    });

  }

overview() {
  this.mode = 'overview';
}



  getFeeds() {
   this.loader = true;
    this.mode = 'feed';
    this.feedService.getProjectFeeds('project', this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.feeds = data;
      this.loader = false;
    });
  }
  addComment(content: NgForm, feed) {
    this.feedService.addComment(feed, content.value);
  }


delete() {
  const id = this.route.snapshot.paramMap.get('id');
  this.projectService.delProject(id);
}


}
