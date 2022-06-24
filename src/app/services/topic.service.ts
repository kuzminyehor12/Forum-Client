import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Topic } from '../models/topic.model';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url: string = 'https://localhost:44341/api/topics/';

  constructor(private httpClient: HttpClient, 
    private formBuilder:FormBuilder,
     private userService: UserService) { }

  form = this.formBuilder.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
  })

  createTopic(){
    let authorId = this.userService.getUser()?.Id;

    var body = {
      Title: this.form.value.Title,
      Description: this.form.value.Description,
      PublicationDate: new Date(),
      AuthorId: authorId
    }

    return this.httpClient.post(this.url, body, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  createBonds(body: any){
    return this.httpClient.post(this.url + 'tag', body, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  getTopics(){
    return this.httpClient.get(this.url, this.options);
  }

  getTopicById(id: any){
    return this.httpClient.get(this.url + id, this.options);
  }

  updateTopic(data: any) : Observable<any>{
    return this.httpClient.put(this.url + data.id, data, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  deleteTopic(id: number) : Observable<Topic>{
    return this.httpClient.delete(this.url + id, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  complainAboutTopic(topic: any){
    var body = {
      Id: topic.id,
      Title: topic.title,
      Description: topic.description,
      PublicationDate: topic.publicationDate,
      TopicState: topic.topicState,
      AuthorId: topic.authorId,
      Complaints: Number(topic.complaints) + 1,
      TopicTagIds: topic.topicTagIds,
      ResponsesIds: topic.responsesIds,
      LikedByIds: topic.likedByIds
    }

    return this.httpClient.put(this.url + topic.id + '/complain', body, this.options);
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
