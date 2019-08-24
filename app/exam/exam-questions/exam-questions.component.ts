import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { Subscription } from 'rxjs/Subscription';
// import { CanComponentDeactivate } from 'src/app/services/canDeactivateGaurd.service';
import { QuestionService } from 'src/app/services/question.service';
import { Question } from '../question.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss']
})
export class ExamQuestionsComponent implements OnInit,OnDestroy {
  sidebar_open
  option:string;
  lastQuestion=false;
  //Question related properties
  questions:Question[];
  qIndex:number=1;
  quesString:string;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  choosedoption:string;
  totalQuestion:number
  //timer Related Properties
  hours:number;
  min:number;
  sec:number;
  timerSubscription: Subscription;

  constructor(private timerService:TimerService,
              private quesService:QuestionService,
              private router:Router,
                private route:ActivatedRoute) { }


  ngOnInit() {
    this.timerSubscription=this.timerService.timerChanged.subscribe(
      (time:number)=>{
        if(this.timerService.time==0)
        {
          this.onSubmit();
        }
        this.hours=Math.floor((this.timerService.time / (60*60)));
        this.min=Math.floor((this.timerService.time % ( 60*60 ))/60 );
        this.sec=Math.floor((this.timerService.time %  (60)));
    });
    
    //get Question Slice
    this.questions=this.quesService.getQuestions();
    
    //Assign properties respective values
    this.quesString=this.questions[this.qIndex-1].question;
    this.option1=this.questions[this.qIndex-1].option[0];
      this.option2=this.questions[this.qIndex-1].option[1];
      this.option3=this.questions[this.qIndex-1].option[2];
      this.option4=this.questions[this.qIndex-1].option[3];
      this.choosedoption=this.questions[this.qIndex-1].choosedOption;
      this.totalQuestion=this.questions.length;
  }
  ngOnDestroy(){
    this.timerSubscription.unsubscribe();
    this.timerService.onStop();
  }
  // canDeactivate():Observable<boolean>|Promise<boolean>|boolean{
  //   if(this.timerService.time==0)
  //     return true;
  //   else
  //    return confirm("Once you exit your result will not be saved.Do you Want to exit?");
  // }

  onNext(){
    this.questions[this.qIndex-1].choosedOption=this.choosedoption;
    if(this.qIndex<=this.questions.length-1)

    {
      this.qIndex=this.qIndex+1;
      this.questionChanged();
      
    }
  }

  onPrevious(){
    this.questions[this.qIndex-1].choosedOption=this.choosedoption;
    if(this.qIndex>1)
    {
    this.qIndex=this.qIndex-1;
    this.questionChanged()
    }
    
  }
  questionChanged(){
    this.quesString=this.questions[this.qIndex-1].question;
      this.option1=this.questions[this.qIndex-1].option[0];
      this.option2=this.questions[this.qIndex-1].option[1];
      this.option3=this.questions[this.qIndex-1].option[2];
      this.option4=this.questions[this.qIndex-1].option[3];
      this.choosedoption=this.questions[this.qIndex-1].choosedOption;

  }
  onSubmit(){
    this.questions[this.qIndex-1].choosedOption=this.choosedoption;
    this.quesService.onSubmit(this.questions);
    this.router.navigate(['../result'],{relativeTo:this.route});
  }
  onClick(index:number){
    this.questions[this.qIndex-1].choosedOption=this.choosedoption;
    this.qIndex=index;
    this.questionChanged();
  }
  check(index:number){
    if(this.qIndex===index)
    return true;
  }
}
