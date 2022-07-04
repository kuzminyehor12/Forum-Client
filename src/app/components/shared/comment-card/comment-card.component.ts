import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.css']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: any;
  author: any = {};
  readyToUpdate: boolean = false;
  text: string = '';
  textToUpdate: string = '';

  constructor(private commentService: CommentService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.getAuthor();
    this.textToUpdate = this.comment.text;
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

  complainAboutComment(){
    this.commentService.complainAboutComment(this.comment).subscribe(
      res => {
        console.log(res);
        window.location.reload();
        Swal.fire({
          position: 'top',
          title: 'Succes',
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
          text: 'You cannot complaint about comment! Authorize first.',
          icon: 'error',
          showCancelButton: false
        });
      }
    )
  }

  updateComment(){
    var body = {
      Id: this.comment.id,
      Text: this.textToUpdate,
      AuthorId: this.comment.authorId,
      ResponseId: this.comment.responseId,
      PublicationDate: this.comment.publicationDate,
      CommentState: this.comment.commentState,
      Likes: this.comment.likes,
      Complaints: this.comment.complaints
    }

    this.commentService.updateComment(this.comment.id, body).subscribe(
      (res:any) => {
        Swal.fire({
          position: 'center',
          title: 'Succes',
          text: 'The comment has been updated succesfully!',
          icon: 'success',
          showCancelButton: false
        });
        window.location.reload();
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with updating comment!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }

  deleteComment(){
    this.commentService.deleteComment(this.comment.id).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          title: 'Success',
          text: 'Comment has been deleted succesfully!',
          icon: 'success',
          showCancelButton: false
        });
        window.location.reload();
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with deleting comment!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }
}
