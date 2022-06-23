import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TopicsComponent } from './components/pages/topics/topics.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ResponsesComponent } from './components/pages/responses/responses.component';
import { TopicCardComponent } from './components/shared/topic-card/topic-card.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'topics', component: TopicsComponent },
  {path:'topics/:id', component: TopicCardComponent},
  {path: 'about', redirectTo:'' },
  {path: 'myactivity/topics', component: TopicsComponent},
  {path: 'myactivity/responses', component: ResponsesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
