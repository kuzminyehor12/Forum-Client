import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url: string = 'https://localhost:44341/api/responses/';

  constructor(private httpClient: HttpClient) { }

  createResponse(text: string, topicId: any){
    let authorId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

    var body = {
      Text: text,
      PublicationDate: new Date(),
      AuthorId: authorId,
      TopicId: Number(topicId)
    }

    return this.httpClient.post(this.url, body, this.options).pipe<any>(catchError<any, Observable<any>>(this.error));
  }

  getResponses(){
    return this.httpClient.get(this.url, this.options);
  }

  getResponseById(id: any){
    return this.httpClient.get(this.url + id, this.options);
  }

  getResponseByTopicId(topicId: any){
    return this.httpClient.get(this.url + 'topic/' + topicId, this.options);
  }

  updateResponse(data: any) : Observable<any>{
    return this.httpClient.put(this.url, data, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  deleteResponse(id: number, data: any) : Observable<any>{
    return this.httpClient.delete(this.url, this.options).pipe(catchError<any, Observable<any>>(this.error));
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
