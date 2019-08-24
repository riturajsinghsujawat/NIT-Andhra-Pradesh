import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume/resume.model';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
resume=new Resume()
mode:string='one'
  constructor(public commonService:CommonService,public auth:AuthService , public resumeService:ResumeService,public notificationService:NotificationService ) { 
  }

  ngOnInit() {
   
  }
  toggleAside(){
    this.commonService.showaside=!this.commonService.showaside
  }
  logout(){
    this.auth.logout()
  }

 /*  getname(){
    let id = this.auth.getUserId()   
    this.resumeService.getResumebyid(id).subscribe(
      data=>{
        this.resume=data;
        this.commonService.getImage(this.resume.imageLogo).subscribe(data=>{
          this.resume.imageLogo=data
        })
        
      }
    )
  } */

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
