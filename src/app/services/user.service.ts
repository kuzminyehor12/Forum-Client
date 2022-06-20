import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  readonly url = 'https://localhost:44341/api/users/';
  constructor(private httpClient: HttpClient, private form: FormBuilder) { }

  formModel = this.form.group({
    Email: ['', Validators.required],
    Nickname: ['', Validators.required],
    BirthDate: ['', Validators.required],
    Password: ['', Validators.required],
    ConfirmPassword: ['', Validators.required]
  }, this.matchValidator);

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

  matchValidator(frm: AbstractControl) : ValidationErrors | null {
    return this.formModel.get('Password')?.value === this.formModel.get('ConfirmPassword')?.value
       ? null : { mismatch: true };
 }

 
 public get isLoggedIn() : boolean{
  return localStorage.getItem('token') != null 
  && localStorage.getItem('token') != undefined;
 }
}

