import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'https://localhost:44341/api/users/register';
  constructor(private httpClient: HttpClient, private form: FormBuilder) { }

  formModel = this.form.group({
    Email: ['', Validators.required, Validators.email],
    Nickname: ['', Validators.required],
    BirthDate: ['', Validators.required],
    Password: ['', Validators.required ],
    ConfirmPassword: ['', Validators.required]
  }, this.matchValidator);

  register(){
    var body = {
      Email: this.formModel.value.Email,
      Nickname: this.formModel.value.Nickname,
      BirthDate: this.formModel.value.BirthDate,
      Password: this.formModel.value.Password
    }

    return this.httpClient.post(this.url, body);
  }

  matchValidator(frm: FormGroup) {
    return frm.get('Password')?.value === frm.get('ConfirmPassword')?.value
       ? null : {'mismatch': true};
 }

  
}

export class PasswordValidator {

  static passwordInvalid(control: FormControl) {
      let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

      if (!control.value.match(passwordPattern))
          return { "passwordInvalid" :true };

      return null;
  }
}

