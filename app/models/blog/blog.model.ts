export class Blog{
    docId:string;
    title?:string;
    /* cover?:{type?:string,url?:string}[] */ // type video or image
    cover:string
    createdOn?:Date;
    createdBy?:string; // uid
    category?:string;
    content?:any // html content
    constructor(){
        this.title=null;
        //this.cover=[] // type video or image
        this.cover=null
        this.createdOn=new Date()
        this.createdBy=null; // uid
        this.category=null;
        this.content=null // html content
    }
}