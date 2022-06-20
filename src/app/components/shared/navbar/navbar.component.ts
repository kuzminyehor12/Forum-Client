import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email = '';
  password = '';

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onLoginSubmit(){
    this.service.login(this.email, this.password).subscribe(
      (res:any) => {
      console.log(res);
       localStorage.setItem('token', res.token);
       localStorage.setItem('user', res.user);
       alert('You`re logged in successfully.');
    },
    err => {
      console.log(err);
      alert('There was a problem with logging in you. Try again!');
    }
    )
  }

  onRegisterSubmit(){
    this.service.register().subscribe(
      (res:any) => {
          if(res.succeded){
            this.service.formModel.reset();
            alert('You were registered successfully!\nLogin to enter the system.');
          }
          else{
            res.errors.array.forEach((element: any) => {
              console.log(element);
              alert('There was a problem with registering you. Try again!');
            });
          }
      },
      err => {
        console.log(err);
        alert('There was a problem with registering you. Try again!');
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
