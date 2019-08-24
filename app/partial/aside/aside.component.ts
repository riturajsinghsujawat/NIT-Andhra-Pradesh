import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume/resume.model';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  collapse=false
  resume=new Resume()
  constructor(public commonService:CommonService,public auth:AuthService, public resumeService:ResumeService ) { }


  ngOnInit() {   
    

  }

  toggleAside(){
    this.commonService.showaside=false
  }
  logout(){
    this.auth.logout()
  }
  

}
