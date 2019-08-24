import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Request } from '../models/request.model';
import { ProjectService } from './project.service';
import { map } from 'rxjs/operators';
import { ResumeService } from './resume.service';
import { Resume } from '../models/resume/resume.model';
import { CommonService } from './common.service';
import { Project } from '../models/project/project.model';
import { NotificationService } from './notification.service';
import { Notification } from '../models/notification.model';
@Injectable({
  providedIn: 'root'
})
export class ProposalsService {
  reqCollection = this.db.collection('requests');
  constructor(public db: AngularFirestore, public commonService: CommonService, private notificationService: NotificationService,
    public projectService: ProjectService, public resumeService: ResumeService) { }

  Apply(request: Request) {
    request.status = 'in review';
    request.updatedOn = new Date();

    return this.reqCollection.add(Object.assign({}, request)).then(res => {
      let notification: Notification = new Notification();
      notification.userids = [];
      if (request.type === 'invite') {
        notification.userids.push(request.id_user);
      } else {
        notification.userids.push(request.id_lead);
      }
      notification.type = 'request';
      notification.title = this.resumeService.authService.resume.about.name +  ' ' + request.type + '   to join  Project';
      notification.description = request.message;
      notification.action = '/home/requests';
      notification.timestamp = new Date();

      this.notificationService.addNotification(notification);
    });
  }

  Approve(request: Request) {
    request.status = 'Accepted';
    request.type = 'selected';
    request.updatedOn = new Date();
    let docid = request.docId;
    delete request.docId;
    this.reqCollection.doc(docid).set(request).then(res => {
      let notification: Notification = new Notification();
      notification.userids = [];
      notification.userids.push(request.id_user);
      notification.type = 'request';
      notification.title = 'Congratulations !!';
      notification.description = 'Your request for ' + request.project_title + ' has been Approved';
      notification.action = '/home/applied';
      notification.timestamp = new Date();
      this.notificationService.addNotification(notification);
    });
    this.projectService.getProjectWithoutchanges(request.pid).subscribe(res => {

      let project: Project = res.data();

      this.resumeService.getResumebyid(request.id_user).subscribe(data => {

        let resume: Resume = data;
        project.team.push({ uid: request.id_user, username: resume.about.name });

        this.projectService.setProject(project, request.pid).then(res => {
          this.commonService.showToaster(resume.about.name + ' Added to your team ');
        }
        );

      });




    });

  }

  Reject(request) {
    request.status = 'rejected';
    request.type = 'rejected';
    request.updatedOn = new Date();
    let docid = request.docId;
    delete request.docId;
    this.reqCollection.doc(docid).set(request).then(res => {
      let notification: Notification = new Notification();
      notification.userids = [];
      notification.userids.push(request.id_user);
      notification.type = 'request';
      notification.title = 'Sorry !!';
      notification.description = 'Your request for ' + request.project_title + ' has been Rejected';
      notification.action = '/home/applied';
      notification.timestamp = new Date();
      this.notificationService.addNotification(notification);
    });
  }
  getRequestForMyProjects(uid) {
    return this.db.collection('requests', ref => ref.where('id_lead', '==', uid).where('type', '==', 'apply')).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          let data = a.payload.doc.data() as Request;
          let docId = a.payload.doc.id;

          return { docId, ...data };

        }))
      );
  }

  getRequestForMe(uid) {
    return this.db.collection('requests', ref => ref.where('id_user', '==', uid).where('type', '==', 'invite')).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          let data = a.payload.doc.data() as Request;
          let docId = a.payload.doc.id;
          return { docId, ...data };
        }))
      );
  }


  getRequestByUser(uid) {
    return this.db.collection('requests', ref => ref.where('id_user', '==', uid)).snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          let data = a.payload.doc.data() as Request;
          let docId = a.payload.doc.id;
          return { docId, ...data };
        }))
      );
  }

  acceptInvite(request: Request) {
    request.type = 'apply';
    request.status = 'in review';
    request.updatedOn = new Date();
    request.message = 'I have reviewed your project invite and I am ready to work with you';
    let docid = request.docId;
    delete request.docId;

    this.db.collection('requests').doc(docid).set(request).then(res => {
      let notification: Notification = new Notification();
      notification.userids = [];
      notification.userids.push(request.id_lead);
      notification.type = 'request';
      notification.title = this.resumeService.authService.resume.about.name;
      notification.description = request.message;
      notification.action = '/home/requests';
      notification.timestamp = new Date();
      this.notificationService.addNotification(notification);
    });
  }

}


