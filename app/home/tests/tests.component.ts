import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {
  mode = 'list';
  tests = [];
  valueform;
  addingQuestions = [];
  addingtestofid = null;
  constructor(public testService: TestService, public router: Router, public commonService: CommonService) { }

  ngOnInit() {
    this.commonService.loader = true;
    this.getAllTests();
  }

  addTest(form: NgForm) {

    this.valueform = form.value;
    this.mode = 'addquestions';
   }

  startTest(testid) {
    // route to /test/:testid

    this.router.navigateByUrl('test/' + testid);
  }

  getAllTests() {
    this.testService.getAllTest().subscribe(data => {
      this.tests = data;
      this.commonService.loader = false;

    });
  }

  addQuestionToArray(form: NgForm) {
      this.addingQuestions.push(form.value);
     form.reset({id_test: this.addingtestofid});
  }

  deletequestion(i) {
  this.addingQuestions.splice(i, 1);
}

  saveQuestions() {
    if (this.addingQuestions.length === 0) {
    this.commonService.showToaster('This Test is Empty Please Add Questions', 'error');
    } else {
if (this.addingQuestions.length >= 1) { this.testService.addTest(this.valueform).then(data => {
      this.addingtestofid = data.id;
      this.testService.addQuestions(this.addingQuestions);
    }).catch(err => {
     this.commonService.showToaster('Error in Saving Test ! Please Try it again', 'error');
    }); }
    this.mode = 'list';
    this.addingQuestions = null;
   }
  }

}
