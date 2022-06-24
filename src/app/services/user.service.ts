import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { flatMap, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url = 'https://localhost:44341/api/users/';
  constructor(private httpClient: HttpClient, 
    private form: FormBuilder,
    private jwtHelperService: JwtHelperService) { }

  formModel = this.form.group({
    Email: ['', Validators.required],
    Nickname: ['', Validators.required],
    BirthDate: ['', Validators.required],
    Password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]
  });

  getUsers(){
    return this.httpClient.get(this.url, this.options);
  }

  getUserById(id: any){
    return this.httpClient.get(this.url + id, this.options);
  }

  getUserByTopicId(topicId: any){
    return this.httpClient.get(this.url + 'topic/' + topicId, this.options);
  }

  getUserByResponseId(responseId: any){
    return this.httpClient.get(this.url + 'response/' + responseId, this.options);
  }

  getUserByCommentId(commentId: any){
    return this.httpClient.get(this.url + 'comment/' + commentId, this.options);
  }

  register(){
    var body = {
      Email: this.formModel.value.Email,
      Nickname: this.formModel.value.Nickname,
      BirthDate: this.formModel.value.BirthDate,
      Password: this.formModel.value.Password
    }

    return this.httpClient.post(this.url + 'register', body, this.options);
  }

  login(email: string, password: string){
    return this.httpClient.post(this.url + 'token', {Email: email, Password: password}, this.options);
  }

  likeTopic(body: any){
    return this.httpClient.post(this.url + 'topic/like/add', body, this.options);
  }

  removeLikeTopic(b: any){
    let options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      }),
      body: b
    }

    return this.httpClient.delete(this.url + 'topic/like/remove', options);
  }

  likeResponse(body: any){
    return this.httpClient.post(this.url + 'response/like/add', body, this.options);
  }

  removeLikeResponse(b: any){
    let options = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
      }),
      body: b
    }
    
    return this.httpClient.delete(this.url + 'response/like/remove', options);
  }

  passwordCorrection() : boolean{
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(this.formModel.get('Password')?.value!);
  }

  matchValidator() : boolean {
    return this.formModel.get('Password')?.value === this.formModel.get('ConfirmPassword')?.value;
 }


 getUser(){
  const token = localStorage.getItem("token");

  if(token == null || token == undefined){
    return null;
  }

  let user = this.jwtHelperService.decodeToken(token!);

  let userToken = {
    Id: Number(user["certserialnumber"]), 
    Nickname: user["unique_name"],
    Email: user["email"], 
    Role: user['role'],
  }

  return userToken;
 }

isOwner(id: number): boolean{
  let user = this.getUser();

  return user?.Id === id;
 }

 public get isModerator(): boolean{
  let user = this.getUser();

  return user?.Role === 'Moderator';
 }
 
 public get isLoggedIn() : boolean{
  const token = localStorage.getItem("token");
 
  return token != undefined && !this.jwtHelperService.isTokenExpired(token);
 }
}

