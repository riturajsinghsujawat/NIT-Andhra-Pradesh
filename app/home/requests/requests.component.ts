import { Component, OnInit } from '@angular/core';
import { ProposalsService } from 'src/app/services/proposals.service';
import { AuthService } from 'src/app/services/auth.service';
import { Request } from 'src/app/models/request.model';
import { ResumeService } from 'src/app/services/resume.service';
import { element } from '@angular/core/src/render3';
import { Resume } from 'src/app/models/resume/resume.model';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project/project.model';
import { About } from 'src/app/models/resume/about.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
uid ;
projectRequests : Request[];
userRequests : Request[];
  constructor(public proposalService : ProposalsService ,public commonService : CommonService, public resumeService: ResumeService, public projectService : ProjectService, public authService : AuthService) { }

  ngOnInit() {
    this.commonService.loader=true
    this.projectRequests = [];
    this.userRequests = [];
    this.uid = this.authService.getUserId();
    this.getAllRequestsForMyProjects();
  }

  getAllRequestsForMyProjects(){
    this.projectRequests =[];
    this.proposalService.getRequestForMyProjects(this.uid).subscribe(data=>{
     this.projectRequests = data;         
      this.projectRequests.forEach(element=>{
        this.resumeService.getResumebyid(element.id_user).subscribe(data=>
          { 
            element.user = data;
          })
      })
      this.getAllRequestsForMe()
      this.commonService.loader = false })    
  }

  getAllRequestsForMe(){
    this.proposalService.getRequestForMe(this.uid).subscribe(data=>{
      this.userRequests = [];
      this.userRequests = data;     
  })
}

accept(request : Request){
   this.proposalService.Approve(request)     
  }

reject(request : Request){
this.proposalService.Reject(request)

}
acceptInvite(request:Request){
this.proposalService.acceptInvite(request);

}

}
