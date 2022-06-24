import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-responses',
  templateUrl: './my-responses.component.html',
  styleUrls: ['./my-responses.component.css']
})
export class MyResponsesComponent implements OnInit {
  myresponses!: any[];
  sorting: number = 0;

  constructor(public userService: UserService,
    public router: Router) { }

  ngOnInit(): void {
    this.getMyResponses();
  }

  getMyResponses(){
    const id = this.userService.getUser()?.Id;

    this.userService.getResponsesByUserId(id).subscribe(
      (res:any) =>{
        this.myresponses = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
