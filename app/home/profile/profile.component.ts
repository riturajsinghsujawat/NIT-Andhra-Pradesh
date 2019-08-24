import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project/project.model';
import { Request } from 'src/app/models/request.model';
import { ProposalsService } from 'src/app/services/proposals.service';
import { CommonService } from 'src/app/services/common.service';
import { ChatService } from 'src/app/services/chat.service';
import { NgForm } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { Resume } from 'src/app/models/resume/resume.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  id: string;
  mine;
  myprofile;
  mode = 'resume';
  feeds = [];
  now = new Date();
  title = 'resume';
  project: Project;
  appliance: Request;
  resume: any = null;
  toggleApplyProject = false;
  count = 4;
  userProjects: Project[];
  index: number;
  showChat = false;
  constructor(public db: AngularFirestore, public storage: AngularFireStorage, public chatService: ChatService  ,
    public projectService: ProjectService, public commonService: CommonService ,
    public proposalService: ProposalsService, private authService: AuthService, public feedService: FeedService,
     private route: ActivatedRoute) {
      this.route.params.subscribe(
        (params: Params) => {
          console.log('updated route');
          this.id = params['id'];
          this.getData(this.id);
        }
      );

  }

  checkMyOnly() {
if (this.id === this.authService.getUserId()) {
  this.mine = true;

} else {
  this.mine = false;
}
  }

  getUserProjects() {
    this.commonService.loader = true;
  this.projectService.getAllProjectsOfUser(this.authService.getUserId()).subscribe(res => {
  this.userProjects = [];
  this.userProjects = res;
  this.commonService.loader = false;
});
  }

  openAskToWork() {
  this.getUserProjects();
  this.toggleApplyProject = true;
  this.appliance = new Request();
  this.appliance.type = 'invite';
  this.appliance.id_lead = this.authService.getUserId();
  this.appliance.id_user = this.id;
  }

  apply() {



  let cantApply = false;
  this.project.team.forEach(member => {
    if (this.authService.getUserId() === member.uid) {
      this.commonService.showToaster('Already in the team , Cannot Invite ', 'error');
  cantApply = true;
    }
  });

  if (!cantApply) {

    this.appliance.pid = this.project.docId;
    this.appliance.project_title = this.project.title;
      this.appliance.type = 'invite';
    this.proposalService.Apply(this.appliance).then(data => {
      this.commonService.showToaster('Invited successfully');
      this.toggleApplyProject = false;
    }).catch(err => {
      this.commonService.showToaster('error occured', 'danger');
    }); }

  }

  togglesendMessage() {
    this.showChat = !this.showChat;
  }

  sendMessage(messageForm: NgForm) {
    this.chatService.sendMessage(messageForm.value.message, this.chatService.getChatId(this.id));
    this.commonService.showToaster('Message sent successfully');
    this.showChat = false;
  }

/*   getMyfeeds(){
    this.commonService.loader=true
    this.feedService.getMyfeeds().subscribe(data=>{
      this.feeds=data
      this.commonService.loader=false
    })
} */

getUserfeeds() {
  this.commonService.loader = true;
  this.feedService.getUserfeeds(this.id).subscribe(data => {
    this.feeds = data;
    this.commonService.loader = false;
  });
}

togglemodefeeds() {
  this.mode = 'feeds';
  this.getUserfeeds();
}

togglemodeprojects() {
  this.mode = 'projects';
  this.getUserProjects();
}

  getData(id) {
    this.commonService.loader = true;
    if (id === 'myprofile') {
      this.id = this.authService.getUserId();
    this.myprofile = true;
    } else {
      this.id = id;
    this.myprofile = false;
    }
    console.log(this.id);
    this.db.collection('users').doc(this.id).valueChanges().subscribe(data => {
      this.commonService.loader = false;
      this.resume = data;
      this.resume.imageLogo = this.storage.ref(this.resume.imageLogo).getDownloadURL();
      /* this.resume.imageLogo=this.storage.ref(this.resume.imageLogo).getDownloadURL() */
    });
    this.checkMyOnly();
  }
}
