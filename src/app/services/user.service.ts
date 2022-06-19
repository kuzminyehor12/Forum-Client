import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'https://localhost:44341/api/users/';
  constructor(private httpClient: HttpClient, private form: FormBuilder) { }

  formModel = this.form.group({
    Email: ['', Validators.required],
    Nickname: ['', Validators.required],
    BirthDate: ['', Validators.required],
    Password: ['', Validators.required,
     Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g) ],
    ConfirmPassword: ['', Validators.required,
     Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g)]
  }, this.matchValidator);

  logFormModel = this.form.group({
    Email: ['', Validators.required],
    Password: ['', Validators.required]
  })

  register(){
    var body = {
      Email: this.formModel.value.Email,
      Nickname: this.formModel.value.Nickname,
      BirthDate: this.formModel.value.BirthDate,
      Password: this.formModel.value.Password
    }

    return this.httpClient.post(this.url + 'register', body);
  }

  login(){
    return this.httpClient.get(this.url + 'token');
  }

  matchValidator(frm: FormGroup) {
    return frm.get('Password')?.value === frm.get('ConfirmPassword')?.value
       ? null : {'mismatch': true};
 }

}

