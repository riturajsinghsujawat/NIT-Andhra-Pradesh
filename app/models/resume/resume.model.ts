import { About } from "./about.model";
import { Skills } from "./skills.model";
import { Experience } from "./experience.model";
import { Education } from "./education.model";
import { Portfolio } from "./portfolio.model";
import { Contact } from "./contact.model";

export class Resume{
    id?:string
    imageLogo?:any; //140*140 
    imageCover?:string; //804*990
    about?:About;
    skills?:Skills;
    experience?:Experience;
    education?:Education;
    portfolio?:Portfolio;
    contact?:Contact;
    constructor(){
        this.imageCover=null
        this.imageLogo='/user/profile.jpg'
        this.about=Object.assign({}, new About());
        this.skills=Object.assign({}, new Skills());
        this.experience=Object.assign({},new Experience()); 
        this.education=Object.assign({},new Education());
        this.portfolio=Object.assign({},new Portfolio());
        this.contact=Object.assign({},new Contact());
    }
}