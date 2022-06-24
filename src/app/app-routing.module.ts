import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TopicsComponent } from './components/pages/topics/topics.component';
import { TopicCardComponent } from './components/shared/topic-card/topic-card.component';
import { MyResponsesComponent } from './components/pages/my-responses/my-responses.component';
import { MyTopicsComponent } from './components/pages/my-topics/my-topics.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'topics', component: TopicsComponent },
  {path:'topics/:id', component: TopicCardComponent},
  {path: 'about', redirectTo:'' },
  {path: 'myactivity/topics', component: MyTopicsComponent},
  {path: 'myactivity/responses', component: MyResponsesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
