import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications=[]
  mode='all'
  item:any
  constructor(public notificationService:NotificationService) { }

  ngOnInit() {

  }



  getdetail(i){      
    this.notificationService.setread(this.notificationService.notifications[i].docId)
    this.item = this.notificationService.notifications[i]    
    this.mode='notificationdetail'
  }

}
