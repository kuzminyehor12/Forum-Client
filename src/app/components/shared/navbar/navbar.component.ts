import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email = '';
  password = '';
  searchText = '';

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onLoginSubmit(){
    this.service.login(this.email, this.password).subscribe(
      (res:any) => {
      console.log(res);
       localStorage.setItem('token', res.token);
       Swal.fire({
        position: 'center',
        title: 'Success',
        text: 'You were logged in successfully.',
        icon: 'success',
        showCancelButton: false
      })
      },
      err => {
        console.log(err);
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with login.' +
          'Maybe you need to register.',
          icon: 'error',
          showCancelButton: false
        })
      }
    )
  }

  onRegisterSubmit(){
    this.service.register().subscribe(
      (res:any) => {
          if(res){
            this.service.formModel.reset();
            Swal.fire({
              position: 'center',
              title: 'Success',
              text: 'You were registered successfully. Now you need to login to authorize!',
              icon: 'success',
              showCancelButton: false
            });
          }
          else{
            console.log(res);
            Swal.fire({
              position: 'center',
              title: 'Error',
              text: 'There are some problems with registering.' +
              'Maybe you`re try to register existing account.',
              icon: 'error',
              showCancelButton: false
            });
          }
      },
      err => {
        console.log(err);
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with registering.' +
          'Maybe you`re try to register existing account.',
          icon: 'error',
          showCancelButton: false
        });
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  writeSearchString(){
    localStorage.setItem('searchString', this.searchText);
  }
}
