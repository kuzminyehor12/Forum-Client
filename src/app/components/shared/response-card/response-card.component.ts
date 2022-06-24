import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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
  textToUpdate: string = '';
  readyToUpdate = false;

  constructor(private responseService: ResponseService,
    private commentService: CommentService,
    public userService: UserService) { }

  ngOnInit(): void {
    this,this.getCommentsById();
    this.getAuthor();
    this.show = false;
    this.readyToCreate = false;
    this.textToUpdate = this.response.text;
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
        window.location.reload();
        Swal.fire({
          position: 'top',
          title: 'Success',
          text: 'Comment has been created successfully!',
          icon: 'success',
          showCancelButton: false
        });
      },
      err => {
        Swal.fire({
          position: 'top',
          title: 'Error',
          text: 'There are some problems with creating comment.',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }

  hasLike(){
    let userId: number = Number(this.userService.getUser()?.Id);

    if(this.response === null 
      || this.response === undefined
      || !userId 
      || Object.keys(this.response).length === 0){
        return false;
    }

    return this.response.likedByIds.some((lb:any) => lb.userId == userId);
  }

  likeResponse(){
    let userId: number = Number(this.userService.getUser()?.Id);

    var body = {
      ResponseId: this.response.id,
      UserId: userId
    }

    this.userService.likeResponse(body).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => {
        Swal.fire({
          position: 'top',
          title: 'Error',
          text: 'You cannot like any message. Authorize first!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }

  removeLikeFromResponse(){
    let userId: number = Number(this.userService.getUser()?.Id);

    var body = {
      ResponseId: this.response.id,
      UserId: userId
    }

    this.userService.removeLikeResponse(body).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    )
  }

  complainAboutResponse(){
    this.responseService.complainAboutResponse(this.response).subscribe(
      res => {
        console.log(res);
        window.location.reload();
        Swal.fire({
          position: 'top',
          title: 'Success',
          text: 'Your complaint has been sent successfully!',
          icon: 'success',
          showCancelButton: false
        });
      },
      err => {
        console.log(err);
        Swal.fire({
          position: 'top',
          title: 'Error',
          text: 'You cannot complain about topic. Authorize first!',
          icon: 'error',
          showCancelButton: false
        });
      }
    )
  }

  updateResponse(){
    var body = {
      Id: this.response.id,
      Text: this.textToUpdate,
      AuthorId: this.response.authorId,
      TopicId: this.response.topicId,
      PublicationDate: this.response.publicationDate,
      ResponseState: this.response.responseState,
      LikedByIds: this.response.likedByIds,
      CommentIds: this.response.commentIds,
      Complaints: this.response.complaints
    }

    this.responseService.updateResponse(this.response.id, body).subscribe(
      (res:any) => {
        window.location.reload();
        Swal.fire({
          position: 'center',
          title: 'Success',
          text: 'The response has been updated succesfully!',
          icon: 'success',
          showCancelButton: false
        });
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with updating response!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }

  deleteResponse(){
    this.responseService.deleteResponse(this.response.id).subscribe(
      res => {
        window.location.reload();
        Swal.fire({
          position: 'center',
          title: 'Success',
          text: 'Response has been deleted successfully!',
          icon: 'success',
          showCancelButton: false
        });
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with deleting response!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }
}
