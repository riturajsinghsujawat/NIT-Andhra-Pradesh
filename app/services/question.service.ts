import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Question } from "../exam/question.model";

import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Injectable()

export class QuestionService {
    questions:Question[]=[
        new Question(1,'Question1',"opt1","opt2","opt3",'opt4','opt1',''),
        new Question(2,"Question2","opta","optb","optc",'optd','optb',''),
        new Question(3,"Question3","opt1","opt2","opt3",'opt4','opt3',''),
        new Question(4,"Question4","opt1","opt2","opt3",'opt4','opt4','')
        
    ];
    solvedQues:Question[];
    
    constructor(private router:Router,
                private route:ActivatedRoute){}

    
    getQuestions(){
        
        return this.questions.slice();
    }

    getSolvedQues()
   {
       return this.solvedQues;
   }
    

    onSubmit(questions:Question[]){
        this.solvedQues=questions;
        //this.router.navigate(['exam/result'],{relativeTo:this.route});
        
    };
}