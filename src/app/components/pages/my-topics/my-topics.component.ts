import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent implements OnInit {
  mytopics!: any[];
  sorting: number = 0;

  constructor(public userService: UserService,
    public router: Router) { }

  ngOnInit(): void {
    this.getMyTopics();
  }


  getMyTopics(){
    const id = this.userService.getUser()?.Id;
    this.userService.getTopicsByUserId(id).subscribe(
      (res:any) => {
        this.mytopics = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
