import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  tags!: Tag[];

  constructor(public topicService: TopicService, 
    private tagService: TagService, 
    public userService: UserService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags(){
      this.tagService.get().subscribe(
        res => {
          this.tags = res;
        },
        error => console.log(error)
      )
  }

  createTopic(){
     if(this.topicService.form.invalid){
      alert('You need to fulfil all fields of form!');
     }
     else{
      this.topicService.createTopic().subscribe(
        res =>{
          alert('Topic has been created successfully!');
        },
        error =>{
          console.log(error);
          alert("There are some problems with creating your topic.");
        } 
      )
     }
  }
}
