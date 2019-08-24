export class Notification{
    title:string
    description:string
    action:string
    timestamp:Date
    type:string
    status:string
    userids:string[]=[]

constructor(){
    this.status='unread'
}

}