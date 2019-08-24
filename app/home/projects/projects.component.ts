import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project/project.model';
import { CommonService } from 'src/app/services/common.service';
import { NgForm } from '@angular/forms';
import { Request } from 'src/app/models/request.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProposalsService } from 'src/app/services/proposals.service';
import { ResumeService } from '../../services/resume.service';
import { database } from 'firebase';
import { Resume } from '../../models/resume/resume.model';
import { About } from '../../models/resume/about.model';
import { NotificationService} from 'src/app/services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  tech: string;
  selectedLocation: string;
  AllProjects: Project[] = [];
  sortby = '';
  selectedTechnology: string;
  selectedStage = 'All';
  admin = false;
  project: Project;
  myprojects: Project[] = [];
  userName: string;
  toggleApplyProject: boolean;
  toggledeleteProject = false;
  appliance: Request;

  id: string = null;
  constructor(public projectService: ProjectService, public commonService: CommonService, public proposalService: ProposalsService,
    public authService: AuthService, public resumeService: ResumeService, public notificationService: NotificationService
     ) { }

  ngOnInit() {
    this.projectService.mode = 'all';
    this.commonService.loader = true;
    this.getProjects();
    this.toggleApplyProject = false;
  }

  getProjects() {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.AllProjects = data;
      this.getByFilter();
      this.projectService.mode = 'all';
      this.commonService.loader = false;
    });
  }

  getProjectsModeAll() {
    this.projectService.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projectService.mode = 'all';
      this.commonService.loader = false;
    });
  }

  myProjects() {
    this.id = this.authService.getUserId();
    this.commonService.loader = true;
    this.projectService.mode = 'myprojects';
    this.projectService.getAllProjectsOfUser(this.id).subscribe(data => {
      this.myprojects = data;
      this.commonService.loader = false;
    });
  }


  addProject() {
    this.projectService.mode = 'add';
    this.project = new Project();
    this.project.builtWith = [];
    this.project.team = [];
  }


  applyForProject(project: Project) {
    this.toggleApplyProject = true;
    this.appliance = new Request();
    this.appliance.pid = project.docId;
    this.appliance.project_title = project.title;
    this.appliance.type = 'apply';
    this.appliance.id_lead = project.uid;
    this.appliance.id_user = this.authService.getUserId();
  }

  addTech(tech: string) {
    if (tech != null) {
      this.project.builtWith.push(tech);
    }
    this.tech = null;
  }

  deleteTech(tech: string) {
    const index = this.project.builtWith.indexOf(tech);
    if (index !== -1) {
      this.project.builtWith.splice(index, 1);
    }

  }


  save(form: NgForm) {
    this.commonService.loader = true;
    if (this.projectService.mode === 'add') {
      const id = this.authService.getUserId();
      const resume = this.authService.resume;
      this.userName = resume.about.name;
      this.project.team.push({ uid: id, username: this.userName });
      this.project.createdOn = new Date();
      this.projectService.addProject(this.project).then(data => {
        this.commonService.loader = false;
        this.commonService.showToaster('Project added Successfully');
        this.projectService.mode = 'all';
        const notification = new Notification;
        notification.title = 'Succesfully added Project';
        notification.description = 'Greetings From iSwadhyay , Start Building team for your project and ' +
        'implement your project Successfully';
        notification.userids.push(id);
        notification.timestamp = new Date();
        notification.type = 'project';
        this.notificationService.addNotification(notification);
      }).catch(err => {
        this.commonService.loader = false;
        this.commonService.showToaster('Error occured ! Try it again', 'danger');
      });
    } else {
      this.projectService.setProject(this.project, this.id).then(data => {
        this.commonService.loader = false;
        this.commonService.showToaster('Project has been updated successfully');
        this.projectService.mode = 'all';
      }).catch(err => {
        this.commonService.loader = false;
        this.commonService.showToaster('Error occured', 'danger');
      });
    }
  }


  edit(did) {
  this.id = did;
    this.projectService.getProject(this.id).subscribe(data => {
      this.project = data;
    });
    this.projectService.mode = 'edit';
  }

  Apply() {
    console.log('outside', this.appliance);
    this.proposalService.Apply(this.appliance).then(data => {
      this.commonService.showToaster('Applied successfully');
      this.toggleApplyProject = false;
    }).catch(err => {
      this.commonService.showToaster('Error occured', 'danger');
    });
  }

  deleteProject(project) {
    this.projectService.delProject(project);
    this.toggledeleteProject = false;
  }
  checkAdmin(project) {
    if (project.uid === this.authService.getUserId()) { this.admin = true; } else {
      this.admin = false;
    }
  }

  getByOrder() {

    if (this.sortby === 'nameAsc') {
      this.projectService.getAllProjectBySortProperty('title', 'asc').subscribe(data => {
        this.projects = [];
        this.projects = data;
        this.AllProjects = data;

        this.getByFilter();
        this.commonService.loader = false;
      });
    } else if (this.sortby === 'nameDes') {
      this.projectService.getAllProjectBySortProperty('title', 'desc').subscribe(data => {
        this.projects = [];
        this.projects = data;
        this.AllProjects = data;

        this.getByFilter();
        this.commonService.loader = false;
      });
    } else if (this.sortby === 'createdAsc') {
      this.projectService.getAllProjectBySortProperty('createdOn', 'desc').subscribe(data => {
        this.projects = [];
        this.projects = data;
        this.AllProjects = data;

        this.getByFilter();
        this.commonService.loader = false;
      });
    } else if (this.sortby === 'createdDes') {
      this.projectService.getAllProjectBySortProperty('createdOn', 'asc').subscribe(data => {
        this.projects = [];
        this.projects = data;
        this.AllProjects = data;

        this.getByFilter();
        this.commonService.loader = false;
      });
    } else {
      this.getProjects();


    }
  }

  getByFilter() {
    this.projects = this.AllProjects;
    let tempprojects = [];
    if (this.selectedStage !== 'All') {
      this.AllProjects.forEach(project => {
        if (project.stage === this.selectedStage) {
          tempprojects.push(project);
        }
      });
      this.projects = tempprojects;
    }
    if (this.selectedLocation) {
      tempprojects = [];
      this.projects.forEach(project => {
        if (project.location.includes(this.selectedLocation)) {
          tempprojects.push(project);
        }
      });
      this.projects = tempprojects;
    }
    if (this.selectedTechnology) {
      tempprojects = [];
      this.projects.forEach(project => {
        for (let i = 0; i < project.builtWith.length; i++) {
          if (project.builtWith[i].includes(this.selectedTechnology)) {
            tempprojects.push(project);
          }
        }
      });
      this.projects = tempprojects;
    }
  }
  resetFilter() {
    this.selectedLocation = '';
    this.selectedStage = 'All';
    this.selectedTechnology = '';

    this.getByOrder();
  }
}
