import { Component, OnInit } from '@angular/core';
import { ProposalsService } from 'src/app/services/proposals.service';
import { Request } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-applied',
  templateUrl: './applied.component.html',
  styleUrls: ['./applied.component.scss']
})
export class AppliedComponent implements OnInit {
requests : Request[]
  constructor(public proposalService: ProposalsService , public authService : AuthService) { }

  ngOnInit() {
    this.authService.commonService.loader=true;
    this.getdetails()
    
  }
getdetails(){
  this.proposalService.getRequestByUser(this.authService.getUserId()).subscribe(res=>{
    this.requests = res;
    this.authService.commonService.loader=false;    
  })
}
}
