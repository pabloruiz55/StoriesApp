import { Component, OnInit } from '@angular/core';
import {StoriesService} from '../../services/stories.service';
declare var $: any;

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

    stories:any[];

    constructor(private _ss:StoriesService) { }

    ngOnInit() {
      this._ss.getStories().subscribe(
        stories => {
          this.stories = stories;
        },
        err => {console.log(err);});
    }

    openModal(){
      $('#myModal').modal();
    }

}
