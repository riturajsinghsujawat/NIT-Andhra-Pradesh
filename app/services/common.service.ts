import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  showaside = false;
  asidemenu = [];
  usermenu = [];
  helpmenu = [];
  loader = false;
  lastScrollTop = 0;
  direction = '';
  isShow: boolean;
  topPosToStartShowing = 100;
  SliderImages: any[] = [];


  constructor(private toastr: ToastrService, public storage: AngularFireStorage, public lc: NgZone, public db: AngularFirestore) {
    console.log('common');
    this.usermenu.push({ title: 'My Profile', icon: 'dropdown-icon oi oi-person', path: '/home/resumes/myprofile' });
    this.usermenu.push({ title: 'Edit Profile', icon: 'dropdown-icon fas fa-edit', path: '/home/myresume' });
    this.usermenu.push({ title: 'My Feeds', icon: 'dropdown-icon oi oi-person', path: '/home/myfeeds' });
    /* this.usermenu.push({title:"Logout",icon:"dropdown-icon oi oi-account-logout",path:"/auth/signin"}) */
    this.asidemenu.push({ title: 'Dashboard', icon: 'menu-icon fas fa-home', path: '/home', badge: { title: null, class: null } });
    // tslint:disable-next-line:max-line-length
    /*   this.asidemenu.push({title:"My blogs",icon:"menu-icon fas fa-feather-alt",path:"/home/manageblog",badge:{title:"new",class:"badge badge-warning"}}) */
    // tslint:disable-next-line: max-line-length
    /* this.asidemenu.push({title:"Edit My Resume",icon:"menu-icon fas fa-home",path:"/home/myresume",badge:{title:"new",class:"badge badge-warning"}}) */
    /* this.asidemenu.push({title:"Exam",icon:"menu-icon fas fa-book",path:"/exam",badge:{title:"new",class:"badge badge-warning"}}) */
    // tslint:disable-next-line: max-line-length
    /*     this.asidemenu.push({title: 'Projects', icon: 'menu-icon fas fa-users-cog', path: '/home/projects', badge: {title: 'new', class: 'badge badge-warning'}}); */
    // tslint:disable-next-line: max-line-length
    this.asidemenu.push({ title: 'All Profiles', icon: 'menu-icon fas fa-users', path: '/home/resumes', badge: { title: 'new', class: 'badge badge-warning' } });
    // tslint:disable-next-line:max-line-length
    /*     this.asidemenu.push({title: 'Requests', icon: 'menu-icon fas fa-user-plus', path: '/home/requests', badge: {title: 'new', class: 'badge badge-warning'}}); */
    this.asidemenu.push({
      title: 'Chats', icon: 'menu-icon fas fa-comments',
      path: '/home/chats', badge: { title: 'new', class: 'badge badge-warning' }
    });
    /*     this.asidemenu.push({title: 'Applied', icon: 'menu-icon fas fa-project-diagram',
    path: '/home/applied', badge: {title: 'new', class: 'badge badge-warning'}}); */
    /*    this.asidemenu.push({title:"Tests",icon:"menu-icon fas fa-edit",
    path:"/home/tests",badge:{title:"new",class:"badge badge-warning"}}) */
    this.asidemenu.push({
      title: 'Notifications', icon: 'menu-icon fas fa-edit',
      path: '/home/notifications', badge: { title: 'new', class: 'badge badge-warning' }
    });
    this.scrollDirection();
    this.getCovers();
  }

  showToaster(message: string, type: string = 'success') {
    if (type === 'info') {
      this.toastr.info(message);
    }
    if (type === 'success') {
      this.toastr.success(message);
    }
    if (type === 'warning') {
      this.toastr.warning(message);
    }
    if (type === 'error') {
      this.toastr.error(message);
    }
  }

  getImage(path) {
    console.log(path + 'get');
    return this.storage.ref(path).getDownloadURL();
  }

  delImage(path) {
    console.log(path + 'del');
    return this.storage.ref(path).delete();
  }

  uploadImage(image, path) {
    console.log(path + 'upl');
    return this.storage.upload(path, image);
  }

  scrollDirection() {
    window.onscroll = () => {
      const st = window.pageYOffset;
      let dir = '';
      if (st > this.lastScrollTop) {
        dir = 'down'; // down
      } else {
        dir = 'up'; // up
      }
      this.lastScrollTop = st;
      this.lc.run(() => {
        this.direction = dir;
      });
      if (st >= this.topPosToStartShowing) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    };
  }

  getCovers() {
    this.db.collection('meta').doc('KFa7mIyBH0O4UaRNs0EP').valueChanges().subscribe(res => {
      const temp: any = res;
      temp.SliderImages.forEach(element => {
        element = this.getImage(element);
        this.SliderImages.push(element);
      });
    });
  }

}
