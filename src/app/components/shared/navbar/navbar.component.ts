import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
          if(res.succeded){
            this.service.formModel.reset();
          }
          else{
            res.errors.array.forEach((element: any) => {
              console.log(element);
            });
          }
      },
      err => {
        console.log(err);
      }
    );
  }
}
