import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  url: string = 'https://localhost:44341/api/topics';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  createTopic(data: Topic) : Observable<Topic>{
    return this.httpClient.post(this.url, data).pipe<Topic>(catchError<any, Observable<Topic>>(this.error));
  }

  getTopics() : Observable<Topic[]>{
    return this.httpClient.get<Topic[]>(this.url);
  }

  updateTopic(data: Topic) : Observable<Topic>{
    return this.httpClient.put<Topic>(this.url, data);
  }

  deleteTopic(id: number, data: Topic) : Observable<Topic>{
    return this.httpClient.delete<Topic>(this.url).pipe<Topic>(catchError<any, Observable<Topic>>(this.error));
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
