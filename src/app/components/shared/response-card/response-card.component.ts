import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-response-card',
  templateUrl: './response-card.component.html',
  styleUrls: ['./response-card.component.css']
})
export class ResponseCardComponent implements OnInit {
  @Input() response: any;
  author: any = {};
  comments!: any[];
  show: boolean = false;
  readyToCreate: boolean = false;
  text: string = '';
  hasLike: boolean = false;

  constructor(private responseService: ResponseService,
    private commentService: CommentService,
    public userService: UserService) { }

  ngOnInit(): void {
    this,this.getCommentsById();
    this.getAuthor();
    this.show = false;
    this.readyToCreate = false;
    this.hasLike = false;
  }

getCommentsById(){
  this.commentService.getCommentByResponseId(this.response.id).subscribe(
    (res:any) => {
      this.comments = res;
    },
    err => {
      console.log(err);
    }
  )
}

  getAuthor(){
    this.userService.getUserByResponseId(this.response.id).subscribe(
      (res:any) => {
        this.author = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  createComment(){
    this.commentService.createComment(this.text, this.response.id).subscribe(
      (res:any) => {
        this.show = false;
        this.readyToCreate = false;
        alert("Comment was succesfully created!");
      },
      err => {
        console.log(err);
      }
    )
  }

  likeResponse(){
    let userId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

    var body = {
      TopicId: this.response.id,
      UserId: userId
    }

    this.userService.likeTopic(body).subscribe(
      res => {
        console.log(res);
        this.hasLike = true;
      },
      err => {
        console.log(err);
      }
    )
  }

  removeLikeFromResponse(){
    let userId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

    var body = {
      ResponseId: this.response.id,
      UserId: userId
    }

    this.userService.removeLikeTopic(body).subscribe(
      res => {
        console.log(res);
        this.hasLike = false;
      },
      err => {
        console.log(err);
      }
    )
  }

  complainAboutResponse(){

  }
}
