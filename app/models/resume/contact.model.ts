export class Contact{
    facebookUrl?:string;
    linkedinUrl?:string
    twitterUrl?:string
    githubUrl?:string
    contactFromApi?:string;
    constructor(){
        this.contactFromApi=null;
        this.facebookUrl=null;
        this.linkedinUrl=null;
        this.twitterUrl=null;
        this.githubUrl=null;        
    }
}