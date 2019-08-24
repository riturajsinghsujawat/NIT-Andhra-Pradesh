import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-exam-start',
  templateUrl: './exam-start.component.html',
  styleUrls: ['./exam-start.component.scss']
})
export class ExamStartComponent implements OnInit {
  interval:any;
  @Output() timeChanged= new EventEmitter<number>();
  time=600;
  constructor(private router:Router,
    private route:ActivatedRoute,
    private timerService:TimerService) { }

  ngOnInit() {
  }
  onBackClicked(){
    this.router.navigate(['/dashboard']);
  }
  onProceedClicked(){
    this.timerService.onStart();
    this.router.navigate(['begin'],{relativeTo:this.route});
  }
}
