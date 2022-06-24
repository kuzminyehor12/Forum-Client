import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url: string = 'https://localhost:44341/api/comments/';

  constructor(private httpClient: HttpClient,
    private userService: UserService) { }

  createComment(text: string, responseId: any){
    let authorId = this.userService.getUser()?.Id;

    var body = {
      Text: text,
      PublicationDate: new Date(),
      AuthorId: authorId,
      ResponseId: Number(responseId)
    }

    return this.httpClient.post(this.url, body, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  getComments(){
    return this.httpClient.get(this.url, this.options);
  }

  getCommentById(id: any){
    return this.httpClient.get(this.url + id, this.options);
  }

  getCommentByResponseId(responseId: any){
    return this.httpClient.get(this.url + 'response/' + responseId, this.options);
  }

  updateComment(id: number, data: any) : Observable<any>{
    return this.httpClient.put(this.url + id, data, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  deleteComment(id: number) : Observable<any>{
    return this.httpClient.delete(this.url + id, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  complainAboutComment(comment: any){
    var body = {
      Id: comment.id,
      Text: comment.text,
      PublicationDate: comment.publicationDate,
      CommentState: comment.commentState,
      ResponseId: comment.responseId,
      AuthorId: comment.authorId,
      Likes: comment.likes,
      Complaints: Number(comment.complaints) + 1
    }

    return this.httpClient.put(this.url + comment.id + '/complain', body, this.options);
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
