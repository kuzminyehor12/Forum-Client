import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: any;
  author: any = {};

  constructor(private commentService: CommentService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.getAuthor();
  }

  getAuthor(){
    this.userService.getUserByCommentId(this.comment.id).subscribe(
      (res:any) => {
        this.author = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  like(){

  }

  complain(){

  }
}
