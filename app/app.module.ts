import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { OtherComponent } from './other/other.component';
import { MaintainanceComponent } from './other/maintainance/maintainance.component';
import { ErrorComponent } from './other/error/error.component';
import { AboutComponent } from './other/about/about.component';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { AsideComponent } from './partial/aside/aside.component';
import { ExamComponent } from './exam/exam.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadingComponent } from './partial/loading/loading.component';
import { AuthGuard } from './services/auth.guard';
import { ExamStartComponent } from './exam/exam-start/exam-start.component';
import { ExamResultComponent } from './exam/exam-result/exam-result.component';
import { ExamQuestionsComponent } from './exam/exam-questions/exam-questions.component';
import { TimerService } from './services/timer.service';
// import { CanDeactivateGaurd } from './services/canDeactivateGaurd.service';
import { QuestionService } from './services/question.service';
import { ResumeComponent } from './home/resume/resume.component';
import { ManageBlogComponent } from './home/manage-blog/manage-blog.component';
import { ProfileComponent } from './home/profile/profile.component';
import { ResumesComponent } from './home/resumes/resumes.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './home/projects/projects.component';
import { ProjectComponent } from './home/projects/project/project.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { RequestsComponent } from './home/requests/requests.component';
import { ChatsComponent } from './home/chats/chats.component';
import { ChatComponent } from './home/chats/chat/chat.component';
import { TestsComponent } from './home/tests/tests.component';
import { TestComponent } from './test/test.component';
import { AppliedComponent } from './home/applied/applied.component';
import { SinglefeedComponent } from './home/singlefeed/singlefeed.component';
import { ProjectCardComponent } from './home/projects/project-card/project-card.component';
import { ResumeCardComponent } from './home/resumes/resume-card/resume-card.component';
import { MyfeedsComponent } from './home/myfeeds/myfeeds.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxGalleryModule } from 'ngx-gallery';
import { LinkyPipe } from './other/linky.pipe';
import { SliderComponent } from './auth/slider/slider.component';
import { AddpostComponent } from './home/addpost/addpost.component';

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any> {
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    AccountComponent,
    OtherComponent,
    MaintainanceComponent,
    ErrorComponent,
    AboutComponent,
    NavbarComponent,
    AsideComponent,
    ExamComponent,
    LoadingComponent,
    ExamStartComponent,
    ExamResultComponent,
    ExamQuestionsComponent,
    ResumeComponent,
    ManageBlogComponent,
    ProjectsComponent,
    ProjectComponent,
    DashboardComponent,
    ProfileComponent,
    ResumesComponent,
    RequestsComponent,
    ChatsComponent,
    ChatComponent,
    TestsComponent,
    TestComponent,
    AppliedComponent,
    SinglefeedComponent,
    ProjectCardComponent,
    ResumeCardComponent,
    MyfeedsComponent,
    NotificationsComponent,
    LinkyPipe,
    SliderComponent,
    AddpostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,// imports firebase/storage only needed for storage features
    EditorModule,
    InfiniteScrollModule,
    NgxGalleryModule,
    ToastrModule.forRoot({ timeOut : 5000,extendedTimeOut:1000,progressBar:true,tapToDismiss:true })
  ],
  providers: [
    AuthGuard,
    TimerService,
    QuestionService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
