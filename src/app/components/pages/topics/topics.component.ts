import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { sequenceEqual } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { Topic } from 'src/app/models/topic.model';
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
  topics!: Topic[];
  selectedTagIds: number[];

  constructor(public topicService: TopicService, 
    public tagService: TagService, 
    public userService: UserService) { 
      this.selectedTagIds = new Array();
    }

  ngOnInit(): void {
    this.getTags();
    this.getTopics();
    this.clearTagIds();
  }

  pushTag(event: any){
    if (event.target.checked) {
      this.selectedTagIds.push(Number(event.target.value));
    }
    else{
      const index = this.selectedTagIds.findIndex(x => x === event.target.value);
      this.selectedTagIds.splice(index, 1);
    }
  }

  clearTagIds(){
    this.selectedTagIds.length = 0;
  }

  getTags(){
      this.tagService.get().subscribe(
        res => {
          this.tags = res;
        },
        error => console.log(error)
      )
  }

  getTopics(){
    this.topicService.getTopics().subscribe(
      res => {
        this.topics = res;
      },
      error => console.log(error)
    )
  }

  createBonds() {
    for (let i = 0; i < this.selectedTagIds.length; i++) {
      let id = this.topics.find(t => this.topics.indexOf(t) == this.topics.length - 1)?.id ?? 0;

      var body = {
        TopicId: id! + 1, 
        TagId: this.selectedTagIds[i]
      }

      this.topicService.createBonds(body).subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  createTopic(){
     if(this.topicService.form.invalid){
      alert('You need to fulfil all fields of form!');
     }
     else{
      this.createBonds();
      this.topicService.createTopic().subscribe(
        res =>{
          alert('Topic has been created successfully!');
          this.clearTagIds();
        },
        error =>{
          console.log(error);
          alert("There are some problems with creating your topic.");
        } 
      )
     }
  }
}