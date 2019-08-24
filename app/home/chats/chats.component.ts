import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ResumeService } from 'src/app/services/resume.service';
import { Resume } from 'src/app/models/resume/resume.model';
import { NgForm } from '@angular/forms';
// tslint:disable-next-line:import-spacing
import{CommonService} from 'src/app/services/common.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  in;
  @ViewChild('mess') mess: ElementRef;
  allusers = [];
  showAddModal = false;
  users = [];
  resume = new Resume();
  selectedChat = null;
  messages = [];
  loader:boolean=false;
  constructor(public chatService: ChatService, public resumeService: ResumeService, public commonService: CommonService ) { }

  ngOnInit() {
    this.loader = true;
    this.getChats();
  }

  sendMessage(messageTextFrom: NgForm) {
    if(messageTextFrom.value.messageText){

      this.chatService.sendMessage(messageTextFrom.value.messageText, this.selectedChat.docId);
      messageTextFrom.reset();
      setTimeout(() => {
        this.updateScroll();
       }, 10);
    }
  }

  getChats() {
    this.chatService.getChats().subscribe(data => {
      data.forEach(element => {
        element.users.forEach(user => {
          if (user !== this.chatService.authService.getUserId()) {
            this.resumeService.getResumebyid(user).subscribe(data => {
              const docId = element.docId;
              this.users.push({docId, ...data});
            });
          }
        });
      });
      this.loader = false;
    });
    this.selectedChat = this.users[0];
  }

  getMessages(chat) {
    this.messages = [];
    this.selectedChat = chat;
    this.chatService.getMessages(this.selectedChat.docId).subscribe(data => {
      this.messages = data;
      this.commonService.loader = false;
      setTimeout(() => {
       this.updateScroll();
      }, 10);

    });
  }
  isSendByMe(message) {
    if (message.id_sender === this.chatService.authService.getUserId()) {
      return false;
    } else {
      return true;
    }
  }

  sendNewUserMessage(newUserMessageForm: NgForm) {

    this.chatService.sendMessage(newUserMessageForm.value.messageText, this.chatService.getChatId(newUserMessageForm.value.id_receiver));
    newUserMessageForm.reset();
    this.showAddModal = false;

    this.users = [];
  }

  toggleAddNewChatModal() {
    this.showAddModal = !this.showAddModal;
  }



  updateScroll() {
    console.log( this.mess.nativeElement.scrollHeight);
    this.mess.nativeElement.scrollTop = this.mess.nativeElement.scrollHeight;
  }


}
