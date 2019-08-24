import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { ResumeService } from 'src/app/services/resume.service';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.scss']
})


export class ResumesComponent implements OnInit { 
  searchResults;
  key;
  mode='list';
  info:string;
  showinfo:boolean=false;
  lazyloader:boolean=true;
  showkeyboard:boolean=false;
  constructor(public resumeService: ResumeService,private http:HttpClient,public commonService:CommonService) { }

  ngOnInit() {   
   
   }

   search() {
     this.showkeyboard=true;     
    this.mode='search'
    this.http.get('https://us-central1-stumaze-38bcf.cloudfunctions.net/iswadhyay/api/v1/users/search/'+this.key).subscribe(result=>{
      this.searchResults=result     
      console.log(this.searchResults)    
      if(this.searchResults.length==0) {
        this.lazyloader=false;
       this.showinfo=true
       this.info='No results found'
      }
      else {
        this.showinfo=true
        this.info = this.searchResults.length + ' ' + 'match found'
        this.lazyloader=false;
      }
    })  
   }

   
   resetSearch() {
    this.lazyloader=true;
    this.showkeyboard=true;
    setTimeout(() => {
      this.showkeyboard=false;
    },500)
    this.key=""
    this.mode='list'
   }

   gotoTop()
    {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  goToResume(id){
    console.log(id)
  }

}
