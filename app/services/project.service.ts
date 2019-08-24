import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import {Project} from '../models/project/project.model';
import { map } from 'rxjs/operators';
import { ResumeService } from './resume.service';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  mode = 'all';
  projectCollection: AngularFirestoreCollection;
  myprojectCollection: AngularFirestoreCollection;
  constructor(public resumeService: ResumeService, public db: AngularFirestore, public authService: AuthService) {
    this.myprojectCollection = this.db.collection('projects', ref => ref.where('createdBy', '==', this.authService.getUserId()));
    this.projectCollection = this.db.collection('projects');
  }

  getAllProjects() {
    return this.projectCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Project;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    );
  }


  getAllProjectBySortProperty(property: string, order) {
  return this.db.collection('projects', ref => ref.orderBy(property, order)).snapshotChanges()
  .pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Project;
      const docId = a.payload.doc.id;
      return { docId, ...data };
    }))
  );

}
  getProject(docid) {
    return this.projectCollection.doc(docid).valueChanges();
  }

  getProjectWithoutchanges(docid) {
    return this.projectCollection.doc(docid).get();
  }


  setProject(project: Project, id) {
    return this.projectCollection.doc(id).set(Object.assign({}, project));
  }


  addProject(project) {
    project.uid = this.authService.getUserId();
    return this.projectCollection.add(Object.assign({}, project));
  }

  delProject(id) {
    return this.projectCollection.doc(id).delete().then(data => {
      this.authService.commonService.showToaster('Deleted Succefully', 'success');
      this.mode = 'myprojects';
      this.authService.router.navigateByUrl('/home/projects');
    } ).catch(err => {
      this.authService.commonService.showToaster('Error occured ! Try it again', 'danger');
     });

  }

  getTeamMembers(project) {
    const team = [];
    project.team.forEach(element => {
      const uid = element.uid;
      this.resumeService.getResumebyid(uid).subscribe(data => {
        team.push(data);
      });
    });
    return team;
  }

  removeTeamMember(project, member) {
    const index = project.team.indexOf({uid: member.docId});
    project.team.splice(index, 1);
  }

  getAllProjectsOfUser(id) {
    return this.db.collection('projects', ref => ref.where('uid', '==', id)).snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Project;
        const docId = a.payload.doc.id;
        return { docId, ...data };
      }))
    );
  }


}
