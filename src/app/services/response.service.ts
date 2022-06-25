import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url: string = 'https://localhost:44341/api/responses/';

  constructor(private httpClient: HttpClient,
    private userService: UserService) { }

  createResponse(text: string, topicId: any){
    let authorId = this.userService.getUser()?.Id;

    var body = {
      Text: text,
      PublicationDate: new Date(),
      AuthorId: authorId,
      TopicId: Number(topicId)
    }

    return this.httpClient.post(this.url, body, this.options).pipe<any>(catchError<any, Observable<any>>(this.error));
  }

  getResponses(pageNumber: number){
    return this.httpClient.get(this.url + "page/" + pageNumber, this.options);
  }

  getResponseById(id: any){
    return this.httpClient.get(this.url + id, this.options);
  }

  getResponseByTopicId(topicId: any){
    return this.httpClient.get(this.url + 'topic/' + topicId, this.options);
  }

  updateResponse(id: number, data: any) : Observable<any>{
    return this.httpClient.put(this.url + id, data, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  deleteResponse(id: number) : Observable<any>{
    return this.httpClient.delete(this.url + id, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  complainAboutResponse(response: any){
    var body = {
      Id: response.id,
      Text: response.text,
      PublicationDate: response.publicationDate,
      ResponseState: response.responseState,
      TopicId: response.topicId,
      AuthorId: response.authorId,
      Complaints: Number(response.complaints) + 1,
      CommentIds: response.commentIds,
      LikedByIds: response.likedByIds
    }

    return this.httpClient.put(this.url + response.id + '/complain', body, this.options);
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
