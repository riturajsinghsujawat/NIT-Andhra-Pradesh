import { Component, OnInit, Input } from '@angular/core';
import { injectTemplateRef } from '@angular/core/src/render3/view_engine_compatibility';

@Component({
  selector: 'app-resume-card',
  templateUrl: './resume-card.component.html',
  styleUrls: ['./resume-card.component.scss']
})
export class ResumeCardComponent implements OnInit {
  @Input() item
  mode:boolean=true

  constructor() { }

  ngOnInit() {
    if(this.item.imageLogo[0]=='/' )
   {
     this.mode=false;
   }
  }

}
