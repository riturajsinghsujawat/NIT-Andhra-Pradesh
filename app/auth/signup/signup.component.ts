import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }
  signup(formData:NgForm){
    this.authService.signup(formData.value.email,formData.value.password,formData.value.name,formData.value.phone)
  }

}
