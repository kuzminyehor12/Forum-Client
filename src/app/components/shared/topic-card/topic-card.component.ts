import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { ResponseService } from 'src/app/services/response.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

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
  currentUser: any = {};
  sorting: number = 0;
  hasLike: boolean = false;

  constructor(private topicService: TopicService,
    private responseService: ResponseService,
    private commentService: CommentService,
    public userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getById(this.id);
    this.getResponsesByTopicId(this.id);
    this.getAuthor();
    this.getUser();
    this.readyToCreate = false;
    this.sorting = 0;
  }

  createResponse(){
    this.responseService.createResponse(this.text, this.id).subscribe(
      res => {
        alert("Response were successfully created!");
        this.readyToCreate = false;
      },
      err => {
        alert("There were some problems with creating response!");
        console.log(err);
      }
    )
    
  }

  getUser(){
    let userId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);
    this.userService.getUserById(userId).subscribe(
      (res:any) => {
        this.currentUser = res;
      },
      err => {
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
      },
      err => {
        console.log(err);
      }
    )
  }

  likeTopic(){
    let userId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

    var body = {
      TopicId: this.topic.id,
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

  removeLikeFromTopic(){
    let userId: number = Number(JSON.parse(localStorage.getItem('user')!).Id);

    var body = {
      TopicId: this.topic.id,
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

  complainAboutTopic(){

  }
}
