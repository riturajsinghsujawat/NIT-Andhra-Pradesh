import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../question.model';


@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {
  score:number=0;
  questions:Question[];
  constructor(private quesService:QuestionService) { }

  ngOnInit() { 
    this.questions=this.quesService.getSolvedQues();
    this.questions.forEach(element => {
      if(element.choosedOption==element.correctOption)
        this.score=this.score+1;
    });
  }
}
