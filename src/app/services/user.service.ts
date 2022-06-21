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

  passwordCorrection() : boolean{
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(this.formModel.get('Password')?.value!);
  }

  matchValidator() : boolean {
    return this.formModel.get('Password')?.value === this.formModel.get('ConfirmPassword')?.value;
 }

 
 public get isLoggedIn() : boolean{
  const token = localStorage.getItem("token");
 
  return token != undefined && !this.jwtHelperService.isTokenExpired(token);
 }
}

