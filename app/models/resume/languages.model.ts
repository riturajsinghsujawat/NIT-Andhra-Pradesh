import { LanguageItem } from "./languageitem.model";

export class Language {
    shortDescription?:string;
    items?:LanguageItem[]
    constructor(){
        this.shortDescription=null
        this.items=[]
    }
}