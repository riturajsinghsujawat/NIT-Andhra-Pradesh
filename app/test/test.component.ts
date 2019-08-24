import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})

export class TestComponent implements OnInit {
  sidebar_open:boolean=false
  correct=0
  testid
  mode='details'
  testdetails
  timeLeft:number
  interval;
  queslength:number
  questions=[]
  question:any
  i:number=0
  togglemodalfinish:boolean=false

  constructor(public route:ActivatedRoute,public testService:TestService) {
   }

  ngOnInit() {
    this.mode='details'
    this.testid=this.route.snapshot.paramMap.get("testid")
    this.getTestDetails()    
  }

  getTestDetails(){
    this.testService.getTest(this.testid).testDetails.subscribe(data=>{
      this.testdetails=data
 
    })
  }

  startTest(){
    this.question={}
    this.mode='started'
    this.getQuestions()   
    this.startTimer()   
  }


  getQuestions(){
    this.testService.getTest(this.testid).questions.subscribe(data=>{
      this.questions=data 
      this.question=this.questions[this.i]    
      this.queslength=this.questions.length - 1 ;    
     
    })  
    this.timeLeft=this.testdetails.duration  
      }


startTimer() {
    this.interval = setInterval(() => {      
      if(this.timeLeft>0){ 
      this.timeLeft--;  
      }    
      else {
      this.submit()
      clearInterval(this.interval);
      }       
    },60000)
  }


  submit(){

    this.correct=this.testService.getResult(this.questions)
    this.togglemodalfinish=false
    this.mode='result'        
  }

  unanswered(m){
    this.question.flag1=0 
    }
  

  next(){
    if(this.question.selected==null){
      this.unanswered(this.i);
    }
    this.i=this.i + 1;
    this.question=this.questions[this.i]
  
  }

  previous(){
    if(this.question.selected==null){
      this.unanswered(this.i);
    }
    this.i=this.i - 1 ;
    this.question=this.questions[this.i]
  }

  toquestion(s:any){
    if(this.question.selected==null){
      this.unanswered(this.i);
    }
    this.i=s
    this.question=this.questions[this.i]
  }   



}
