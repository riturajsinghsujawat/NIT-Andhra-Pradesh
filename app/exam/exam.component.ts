import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { callLifecycleHooksChildrenFirst } from '@angular/core/src/view/provider';
import { stringify } from '@angular/core/src/render3/util';
import { Question } from './question.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  sidebar_open=false;
  constructor() { }
  

  

  ngOnInit() {
  }

  
}
