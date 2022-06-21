import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  readonly url: string = 'https://localhost:44341/api/topics/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {  }

  get() : Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(this.url + 'tags');
  }
}
