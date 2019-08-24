import { Injectable, Output, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { QuestionService } from "./question.service";

@Injectable()
export class TimerService {
    
    timeProvided=3600;
    time:number=this.timeProvided;
    interval:any;
    timerChanged= new Subject();
    constructor(private router:Router,
                private route:ActivatedRoute,
                private questionService:QuestionService){}
    onStart(){
        
        this.interval=setInterval(
            ()=> {   
                   
                   this.time--;
                   this.timerChanged.next(this.time);
                   
                if(this.time===0)
                {
                   
                   clearInterval(this.interval);
                   
                }
            },1000);        
    }

    onStop(){
        clearInterval(this.interval);
        this.resetTimer();
    }

    resetTimer(){
        this.time=this.timeProvided;
    }
}