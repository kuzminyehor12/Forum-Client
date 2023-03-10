import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { sequenceEqual } from 'rxjs';
import { Tag } from 'src/app/models/tag.model';
import { Topic } from 'src/app/models/topic.model';
import { TagService } from 'src/app/services/tag.service';
import { TopicService } from 'src/app/services/topic.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  tags!: Tag[];
  topics!: any[];
  selectedTagIds: number[];
  searchString!: string | null;
  tagId!: number;
  sorting!: number;
  pageNumber: number = 1;
  pages!: number[];

  constructor(public topicService: TopicService, 
    public tagService: TagService, 
    public userService: UserService) { 
      this.selectedTagIds = new Array();
      this.pages = [];
    }

  ngOnInit(): void {
    this.getTags();
    this.getTopics();
    this.clearTagIds();
    localStorage.removeItem('searchString');
    this.sorting = 0;
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
      (res:any) => {
        this.topics = res;

        let length: number = this.topics.length;
        for(let i = 1; length >= 1; i++){
          this.pages.push(i);
          length = length / 8;
        }
      },
      error => console.log(error)
    )
  }

  createBonds() {
    for (let i = 0; i < this.selectedTagIds.length; i++) {
      let id = this.topics.find(t => this.topics.indexOf(t) == this.topics.length - 1)?.id ?? 1;

      var body = {
        TopicId: id + 1, 
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
      Swal.fire({
        position: 'center',
        title: 'Error',
        text: 'You need to fulfil all fields of form!',
        icon: 'error',
        showCancelButton: false
      });
     }
     else{
      this.topicService.createTopic().subscribe(
        res =>{
          this.createBonds();
          this.clearTagIds();
          window.location.reload();
          Swal.fire({
            position: 'center',
            title: 'Success',
            text: 'Topic has been created successfully!',
            icon: 'success',
            showCancelButton: false
          });
        },
        error =>{
          console.log(error);
          Swal.fire({
            position: 'center',
            title: 'Error',
            text: 'There are some problems with creating a topic',
            icon: 'error',
            showCancelButton: false
          });
        } 
      )
     }
  }

  defineTagId(tagId: any){
    this.tagId = tagId;
  }
}
