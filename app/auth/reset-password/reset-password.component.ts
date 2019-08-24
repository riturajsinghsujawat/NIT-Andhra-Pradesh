import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService:AuthService,private commonService:CommonService) { }

  ngOnInit() {
  }
  sendResetLink(form:NgForm){
    this.authService.resetPassword(form.value.email)
    form.reset()
    this.authService.router.navigate(['/auth/signin'])
    this.commonService.showToaster('Check Your Email for reset link','warning')
  }

}
