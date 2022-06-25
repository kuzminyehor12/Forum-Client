import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TopicsComponent } from './components/pages/topics/topics.component';
import { TopicCardComponent } from './components/shared/topic-card/topic-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { config } from 'rxjs';
import { TopicService } from './services/topic.service';
import { ResponseService } from './services/response.service';
import { CommentService } from './services/comment.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { FilterWithTagsPipe } from './pipes/filter-tags.pipe';
import { SortingPipe } from './pipes/sort-topics.pipe';
import { DateConverterPipe } from './pipes/date-converter.pipe';
import { ResponseCardComponent } from './components/shared/response-card/response-card.component';
import { CommentCardComponent } from './components/shared/comment-card/comment-card.component';
import { MyResponsesComponent } from './components/pages/my-responses/my-responses.component';
import { MyTopicsComponent } from './components/pages/my-topics/my-topics.component';
import { NoActivityPipe } from './pipes/no-activity.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TopicsComponent,
    TopicCardComponent,
    SearchTextPipe,
    FilterWithTagsPipe,
    SortingPipe,
    DateConverterPipe,
    ResponseCardComponent,
    CommentCardComponent,
    MyResponsesComponent,
    MyTopicsComponent,
    NoActivityPipe,
    PaginationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    TopicService,
    ResponseService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
