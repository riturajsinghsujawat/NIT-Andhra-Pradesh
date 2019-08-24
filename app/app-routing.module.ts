import { NgModule } from '@angular/core';
import { Routes, CanActivate, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { MaintainanceComponent } from './other/maintainance/maintainance.component';
import { ErrorComponent } from './other/error/error.component';
import { AboutComponent } from './other/about/about.component';
import { ExamComponent } from './exam/exam.component';
import { AuthGuard } from './services/auth.guard';
import { ResumeComponent } from './home/resume/resume.component';
import { ManageBlogComponent } from './home/manage-blog/manage-blog.component';
import { ExamStartComponent } from './exam/exam-start/exam-start.component';
import { ExamQuestionsComponent } from './exam/exam-questions/exam-questions.component';
import { ExamResultComponent } from './exam/exam-result/exam-result.component';
import { ProjectsComponent } from './home/projects/projects.component';
import { ProjectComponent } from './home/projects/project/project.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import {ProfileComponent} from './home/profile/profile.component';
import {ResumesComponent} from './home/resumes/resumes.component';
import { RequestsComponent } from './home/requests/requests.component';
import { ChatsComponent } from './home/chats/chats.component';
import { ChatComponent } from './home/chats/chat/chat.component';
import { TestsComponent } from './home/tests/tests.component';
import { TestComponent } from './test/test.component';
import { AppliedComponent } from './home/applied/applied.component';
import {SliderComponent} from './auth/slider/slider.component';
import { MyfeedsComponent } from './home/myfeeds/myfeeds.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { AddpostComponent } from './home/addpost/addpost.component';


const routes: Routes = [
  { path: '', redirectTo: '/home' , pathMatch: 'full' },
  { path: 'slider' , component : SliderComponent  },
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'},  canActivate: [AuthGuard] , children: [
    { path: '', component: DashboardComponent  },
    { path: 'myresume', component: ResumeComponent,  data: {animation: 'AboutPage'} },
    { path: 'manageblog', component: ManageBlogComponent , data: {animation: 'AboutPage1'}  },
    { path: 'projects', component: ProjectsComponent , data: {animation: 'AboutPage2'}  },
    { path: 'projects/:id', component: ProjectComponent , data: {animation: 'AboutPage3'}},
    { path: 'myprofile', component: ProfileComponent , data: {animation: 'AboutPage4'} },
    { path: 'resumes' , component: ResumesComponent , data: {animation: 'AboutPage5'}},
    { path: 'requests' , component: RequestsComponent , data: {animation: 'AboutPage6'} },
    { path: 'resumes/:id' , component: ProfileComponent , data: {animation: 'AboutPage7'}},
    { path: 'chats' , component: ChatsComponent , data: {animation: 'AboutPage9'} },
    { path: 'chats/:id' , component: ChatComponent , data: {animation: 'AboutPage10'}},
    { path: 'tests' , component: TestsComponent , data: {animation: 'AboutPage11'}},
    { path: 'applied' , component: AppliedComponent , data: {animation: 'AboutPage12'}},
    { path: 'myfeeds' , component: MyfeedsComponent , data: {animation: 'AboutPage13'}},
    { path: 'notifications' , component: NotificationsComponent , data: {animation: 'AboutPage14'}},
    { path: 'addpost/:type/:id' , component: AddpostComponent , data: {animation: 'AboutPage15'} },
  ] },
  { path: 'test/:testid' , component: TestComponent , data: {animation: 'AboutPage16'} },
  { path: 'auth', component: AuthComponent , data: {animation: 'AboutPage17'}, children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  ] },
  { path: 'other', component: AuthComponent, data: {animation: 'AboutPage18'}, children: [
    { path: 'maintainance', component: MaintainanceComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'about', component: AboutComponent },
  ] },
  { path: 'auth', component: AuthComponent, data: {animation: 'AboutPage19'}, children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
  ] },
  { path: 'exam', component: ExamComponent, data: {animation: 'AboutPage20'} , children: [
    {path: '', component: ExamStartComponent},
    {path: 'begin', component: ExamQuestionsComponent, },
    {path: 'result', component: ExamResultComponent}
  ]},
  { path: '**', component: SigninComponent, data: {animation: 'AboutPage21'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
