import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url: string = 'https://localhost:44341/api/comments/';

  constructor(private httpClient: HttpClient) { }

  createComment(text: string, responseId: any){
    let authorId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

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

  updateComment(data: any) : Observable<any>{
    return this.httpClient.put(this.url, data, this.options).pipe(catchError<any, Observable<any>>(this.error));
  }

  deleteComment(id: number, data: any) : Observable<any>{
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
