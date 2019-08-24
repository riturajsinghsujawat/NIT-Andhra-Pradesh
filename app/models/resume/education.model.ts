import { EducationItem } from "./educationitem.model";
export class Education{
    shortDescription?:string;
    items?:EducationItem[]
    constructor(){
        this.shortDescription=null;
        this.items=[]
    }
}

