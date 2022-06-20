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
    Description: ['', Validators.required]
  })

  createTopic() : Observable<Topic>{
    let authorId = JSON.parse(localStorage.getItem('user')!).Id;
    var body = {
      Title: this.form.value.Title,
      Description: this.form.value.Description,
      PublicationDate: new DatePipe(new Date().toDateString(), 'YYYY-MM-DD'),
      AuthorId: authorId
    }

    return this.httpClient.post<Topic>(this.url, body, this.options);
  }

  getTopics() : Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(this.url, this.options);
  }

  updateTopic(data: Topic) : Observable<Topic>{
    return this.httpClient.put<Topic>(this.url, data, this.options);
  }

  deleteTopic(id: number, data: Topic) : Observable<Topic>{
    return this.httpClient.delete<Topic>(this.url, this.options).pipe<Topic>(catchError<any, Observable<Topic>>(this.error));
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
