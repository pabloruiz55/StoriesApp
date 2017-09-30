import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.css']
})
export class NewStoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close(){
    setTimeout((data)=>{
      $('#myModal').modal('hide')
    },3000)
  }

}
