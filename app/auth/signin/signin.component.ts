import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }
  auth(auth_cred:NgForm){
    let email = auth_cred.value.email
    let password = auth_cred.value.password
    this.authService.signin(email,password)
  }

}
