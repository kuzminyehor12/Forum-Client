import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent implements OnInit {

  topic: any = {};
  responses!: any[];
  comments!: any[];
  readyToCreate: boolean = false;
  text: string = '';
  id!: any;
  author: any = {};
  sorting: number = 0;
  pages!: any[];
  pageNumber: number = 1;

  constructor(private topicService: TopicService,
    private responseService: ResponseService,
    private commentService: CommentService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.pages = [];
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getById(this.id);
    this.getResponsesByTopicId(this.id);
    this.getAuthor();
    this.readyToCreate = false;
    this.sorting = 0;
  }

  createResponse(){
    this.responseService.createResponse(this.text, this.id).subscribe(
      res => {
        window.location.reload();
        this.readyToCreate = false;
        Swal.fire({
          position: 'center',
          title: 'Success',
          text: 'Response has been created successully!',
          icon: 'success',
          showCancelButton: false
        });
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There were some problems with creating response!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
    
  }

  getAuthor(){
    this.userService.getUserByTopicId(this.id).subscribe(
      (res:any) => {
        this.author = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getById(id: any){
    this.topicService.getTopicById(id).subscribe(
      (res:any) =>{
        this.topic = res;
      },
      err =>{
        console.log(err);
      }
    )
  }

  getResponsesByTopicId(id: any){
    this.responseService.getResponseByTopicId(id).subscribe(
      (res: any) => {
        this.responses = res;

        let length: number = this.responses.length;
        for(let i = 1; length >= 1; i++){
          this.pages.push(i);
          length = length / 8;
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  hasLike(){
    let userId: number = Number(this.userService.getUser()?.Id);

    if(this.topic === null 
      || this.topic === undefined
      || !userId 
      || Object.keys(this.topic).length === 0){
        return false;
    }

    return this.topic.likedByIds.some((lb:any) => lb.userId == userId);
  }

  likeTopic(){
    let userId: number = Number(this.userService.getUser()?.Id);

    var body = {
      TopicId: this.topic.id,
      UserId: userId
    }

    this.userService.likeTopic(body).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => {
        Swal.fire({
          position: 'top',
          title: 'Error',
          text: 'You cannot like any message! Authorize first.',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }

  removeLikeFromTopic(){
    let userId: number = Number(this.userService.getUser()?.Id);

    var body = {
      TopicId: this.topic.id,
      UserId: userId
    }

    this.userService.removeLikeTopic(body).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    )
  }

  complainAboutTopic(){
    this.topicService.complainAboutTopic(this.topic).subscribe(
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
          text: 'You cannot complain about topic! Authorize first.',
          icon: 'error',
          showCancelButton: false
        });
      }
    )
  }

  deleteTopic(){
    this.topicService.deleteTopic(this.topic.id).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          title: 'Success',
          text: 'Topic has been deleted succesfully!',
          icon: 'success',
          showCancelButton: false
        });
        this.router.navigate(['']);
      },
      err => {
        Swal.fire({
          position: 'center',
          title: 'Error',
          text: 'There are some problems with deleting topic!',
          icon: 'error',
          showCancelButton: false
        });
        console.log(err);
      }
    )
  }
}
