export class Question{
    public qid:number;
    public question:string;
    public option:string[]=[];
    public correctOption:string;
    public choosedOption:string;
    //public level:string;
    //public field:string;
    constructor(qid:number, question:string,opt1:string,opt2:string,opt3:string,opt4:string,correct:string,choosedOption:string)
    {
        this.qid=qid;
        this.question=question;
        this.option[0]=opt1;
        this.option[1]=opt2;
        this.option[2]=opt3;
        this.option[3]=opt4;
        this.correctOption=correct;
        this.choosedOption="";
    }
    
}