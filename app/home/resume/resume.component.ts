import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume.service';
import { Resume } from '../../models/resume/resume.model';
import { CommonService } from '../../services/common.service';
import { EducationItem } from 'src/app/models/resume/educationitem.model';
import { SkillItem } from 'src/app/models/resume/skillitem.model';
import { LanguageItem } from 'src/app/models/resume/languageitem.model';
import { PortfolioItem } from 'src/app/models/resume/portfolioitem.model';
import { ExperienceItem } from 'src/app/models/resume/experienceitem.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { About } from 'src/app/models/resume/about.model';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})

export class ResumeComponent implements OnInit {
  resume: Resume;
  eduitem: EducationItem = new EducationItem();
  skillitem: SkillItem = new SkillItem();
  languageitem: LanguageItem = new LanguageItem();
  portfolioitem: PortfolioItem = new PortfolioItem();
  experienceitem: ExperienceItem = new ExperienceItem();
  knowledgeitem: string;
  unique;
  tempResume;
  uid: String;
  selectedfiles: FileList;
  percentage1: number;
  percentage2: number;
  percentage3: number;
  imgsrclogo: Observable<string>;
  imgsrccover: Observable<string>;
  imgsrcportpic: Observable<string>;
  snapshot: Observable<any>;
  // there is no knowledge item a i contains only array of string
  mode = 'one';
  index: number; // common for all no need to create another for other parts
  editMode = false; // common for all no need to create another for other partss
  togglemodaleducation: boolean;
  togglemodalskill: boolean;
  togglemodalexperience: boolean;
  togglemodalportfolio: boolean;
  togglemodalknowledge: boolean;
  togglemodallanguage: boolean;

  constructor(private resumeService: ResumeService , private commonService: CommonService, public storage: AngularFireStorage ) { }
  ngOnInit() {
    this.commonService.loader = true;
    this.getresume();
    this.uid = this.resumeService.authService.getUserId();
  }

   togglemodeone() {
    this.mode = 'one';
  }

  togglemodetwo() {
    this.mode = 'two';
  }

  togglemodethree() {
    this.mode = 'three';
  }

  togglemodefour() {
    this.mode = 'four';
  }

  saveDetails() {
    if (JSON.stringify(this.resume).toLowerCase() !== this.tempResume.toLowerCase()) {
    this.commonService.loader = true;
      this.resumeService.setResume(Object.assign({}, this.resume)).then(res => {
        this.tempResume = JSON.stringify(res);
        this.commonService.loader = false;
        this.commonService.showToaster('Your details has been saved successfully', 'success');
      });
    }
    else{
      this.commonService.loader = false;
    }
  }

  getresume() {
    this.resumeService.getResume().subscribe(result => {
    this.resume = new Resume();
    this.resume.about = new About();
       this.resume = result;
       this.tempResume = JSON.stringify(result);
       if (this.resume.imageLogo) {
        this.imgsrclogo = this.storage.ref(this.resume.imageLogo).getDownloadURL();
       }
       if (this.resume.imageCover) {
        this.imgsrccover = this.storage.ref(this.resume.imageCover).getDownloadURL();
       }
       this.commonService.loader = false;
      }
    );
  }

  // functions for education starts here
  editEducation(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalEducation(item);
  }
  addEducation() {
    this.editMode = false;
    this.toggleModalEducation(new EducationItem());
  }
  toggleModalEducation(item) {
    this.eduitem = item;
    this.togglemodaleducation = true;
  }
  toggleModalEducationfalse() {
    this.togglemodaleducation = false;
    this.editMode = false;
    this.eduitem = new EducationItem();
  }
  saveEducation() {
    if (this.editMode) {
      this.resume.education.items[this.index] = Object.assign({}, this.eduitem);
    } else {
      this.resume.education.items.push(Object.assign({}, this.eduitem));
    }
    this.toggleModalEducationfalse();
    this.saveDetails();
  }
  deleteEducation(index) {
    this.resume.education.items.splice(index, 1);
    this.saveDetails();
  }
  // functions for education ends here

  // functions for skill starts here

  editSkill(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalSkill(item);
  }

  addSkill() {
    this.editMode = false;
    this.toggleModalSkill(new SkillItem());
  }

  toggleModalSkill(item) {
    this.skillitem = item;
    this.togglemodalskill = true;
  }

  toggleModalSkillfalse() {
    this.togglemodalskill = false;
    this.editMode = false;
    this.skillitem = new SkillItem();
  }

  saveSkill() {
    if (this.editMode) {
      this.resume.skills.skills.items[this.index] = Object.assign({}, this.skillitem);
    } else {
      this.resume.skills.skills.items.push(Object.assign({}, this.skillitem));
    }
    this.toggleModalSkillfalse();
    this.saveDetails();
  }

  deleteSkill(index) {
    this.resume.skills.skills.items.splice(index, 1);
    this.saveDetails();
  }


  // functions for skill ends here
  // functions for portfolio starts here
  editPortfolio(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalPortfolio(item);
  }

  addPortfolio() {
    this.editMode = false;
    this.toggleModalPortfolio(new PortfolioItem());
  }

  toggleModalPortfolio(item) {
    this.portfolioitem = item;
    this.togglemodalportfolio = true;
  }

  toggleModalPortfoliofalse() {
    this.togglemodalportfolio = false;
    this.editMode = false;
    this.portfolioitem = new PortfolioItem();
  }

  savePortfolio() {
    if (this.editMode) {
      this.resume.portfolio.items[this.index] = Object.assign({}, this.portfolioitem);
    } else {
      this.resume.portfolio.items.push(Object.assign({}, this.portfolioitem));
    }
    this.toggleModalPortfoliofalse();
    this.saveDetails();
  }

  deletePortfolio(index) {
    this.resume.portfolio.items.splice(index, 1);
    this.saveDetails();
  }

  // functions for portfolio ends here

  // functions for languages starts here
  editLanguage(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalLanguage(item);
  }

  addLanguage() {
    this.editMode = false;
    this.toggleModalLanguage(new LanguageItem());
  }

  toggleModalLanguage(item) {
    this.languageitem = item;
    this.togglemodallanguage = true;
  }

  toggleModalLanguagefalse() {
    this.togglemodallanguage = false;
    this.editMode = false;
    this.languageitem = new LanguageItem();
  }

  saveLanguage() {
    if (this.editMode) {
      this.resume.skills.language.items[this.index] = Object.assign({}, this.languageitem);
    } else {
      this.resume.skills.language.items.push(Object.assign({}, this.languageitem));
    }
    this.toggleModalLanguagefalse();
    this.saveDetails();
  }

  deleteLanguage(index) {
    this.resume.skills.language.items.splice(index, 1);
    this.saveDetails();
  }

  // functions for languages ends here

  // functions for experience starts here

 editExperience(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalExperience(item);
  }

  addExperience() {
    this.editMode = false;
    this.toggleModalExperience(new ExperienceItem());
  }

  toggleModalExperience(item) {
    this.experienceitem = item;
    this.togglemodalexperience = true;
  }

  toggleModalExperiencefalse() {
    this.togglemodalexperience = false;
    this.editMode = false;
    this.experienceitem = new ExperienceItem();
  }

  saveExperience() {
    if (this.editMode) {
      this.resume.experience.items[this.index] = Object.assign({}, this.experienceitem);
    } else {
      this.resume.experience.items.push(Object.assign({}, this.experienceitem));
    }
    this.toggleModalExperiencefalse();
    this.saveDetails();
  }

  deleteExperience(index) {
    this.resume.experience.items.splice(index, 1);
    this.saveDetails();
  }


  // functions for experience ends here

 editKnowledge(item, i) {
    this.editMode = true;
    this.index = i;
    this.toggleModalKnowledge(item);
  }

  addKnowledge() {
    this.editMode = false;
    this.toggleModalKnowledge(this.knowledgeitem);
  }

  toggleModalKnowledge(item) {
    this.knowledgeitem = item;
    this.togglemodalknowledge = true;
  }

  toggleModalKnowledgefalse() {
    this.togglemodalknowledge = false;
    this.editMode = false;
    this.knowledgeitem = null;
    }

  saveKnowledge() {
    if (this.editMode) {
      this.resume.skills.knowledge.items[this.index] = this.knowledgeitem;
    } else {
      this.resume.skills.knowledge.items.push(this.knowledgeitem);
    }
    this.toggleModalKnowledgefalse();
    this.saveDetails();
  }

  deleteKnowledge(index) {
    this.resume.skills.knowledge.items.splice(index, 1);
    this.saveDetails();
  }


next() {
  if (this.mode === 'one') {
    this.togglemodetwo();
  } else if (this.mode === 'two') {
  this.togglemodethree();
} else if (this.mode === 'three') {
this.togglemodefour();
}
this.saveDetails();
}

prev() {
 this.togglemodethree();
this.saveDetails();
}

choosefiles(event, type) {
  if (type === 'logo') {
    if (this.selectedfiles || this.imgsrclogo) {

      this.delCover(type);
      this.selectedfiles = null;
      this.imgsrclogo = null;
    }
    this.selectedfiles = event.target.files;
    if (this.selectedfiles.item(0)) {
      this.uploadpic(type);
    }
  }
  if (type === 'cover') {
    if (this.selectedfiles || this.imgsrccover) {
      this.delCover(type);
      this.selectedfiles = null;
      this.imgsrccover = null;
    }
    this.selectedfiles = event.target.files;
    if (this.selectedfiles.item(0)) {
      this.uploadpic(type);
    }
  }
  if (type === 'portpic') {
    if (this.selectedfiles || this.imgsrcportpic) {
      this.delCover(type);
      this.selectedfiles = null;
      this.imgsrcportpic = null;
    }
    this.selectedfiles = event.target.files;
    if (this.selectedfiles.item(0)) {
      this.uploadpic(type);
    }
  }

}

uploadpic(type: string) {
  const file = this.selectedfiles.item(0);
  const date = new Date();
  this.unique = '/user/image' + Math.floor(Math.random() * 100000) + date.getTime() + file.name;
  const ref = this.storage.ref(this.unique);
  const uploadtask = this.storage.upload(this.unique, file);
  uploadtask.then(res => {
    this.saveDetails();
  });
  const percentageChange = uploadtask.percentageChanges().subscribe(data => {
    if (type === 'logo') {
      this.percentage1 = data;

    }
    if (type === 'portpic') {
      this.percentage3 = data;
    }
    if (type === 'cover') {
      this.percentage2 = data;
    }
  });
  this.snapshot = uploadtask.snapshotChanges();
  uploadtask.snapshotChanges().pipe(
    finalize(() => {

      percentageChange.unsubscribe();

      if (type === 'logo') {

        this.imgsrclogo = ref.getDownloadURL();
        this.percentage1 = null;
      }
      if (type === 'cover') {
        this.imgsrccover = ref.getDownloadURL();
        this.percentage2 = null;
      }
      if (type === 'portpic') {
        this.imgsrcportpic = ref.getDownloadURL();
        this.percentage3 = null;
      }
    })
  )
  .subscribe();
  if (type === 'logo') {

    this.resume.imageLogo = this.unique;
  }
  if (type === 'cover') {
    this.resume.imageCover = this.unique;
  }
  if (type === 'portpic') {
    this.portfolioitem.image = this.unique;
  }
}
delCover(type) {

  if (type === 'logo') {
    this.unique = this.resume.imageLogo;
    this.imgsrclogo = null;
    this.storage.ref(this.unique).delete();
  }
  if (type === 'cover') {
    this.unique = this.resume.imageCover;
    this.imgsrccover = null;
    this.storage.ref(this.unique).delete();
  }
  if (type === 'portpic') {
    this.unique = this.portfolioitem.image;
    this.imgsrcportpic = null;
    this.storage.ref(this.unique).delete();
  }
}
getImage(path, type) {

  if (type === 'logo') {
    this.imgsrclogo = this.storage.ref(path).getDownloadURL();
  }
  if (type === 'cover') {
    this.imgsrccover = this.storage.ref(path).getDownloadURL();
  }
  if (type === 'portpic') {
    this.imgsrcportpic = this.storage.ref(path).getDownloadURL();
  }
}

checkEmpty(fieldarray: []) {
  let empty: boolean;
 fieldarray.forEach(ele => {
   if (ele == null) {
    empty = true;
   }
 });
return empty;
}

openResume() {
  window.open('https://resumetemplate1-38676.firebaseapp.com/+this.uid', '_blank');
}


}


