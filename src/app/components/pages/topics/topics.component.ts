import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  tags!: Tag[];
  constructor(private topicService: TopicService, private tagService: TagService) { }

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
}
