import { Component, OnInit } from '@angular/core';
import {StoriesService} from '../../services/stories.service';
import {RouterLink,Route,ActivatedRoute, Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  selectedStory:any;
  currentLevel:number;
  selectedStoryPiece:any;
  selectedStoryPieceChildren:any[];
  constructedStory:any;

  constructor(private route: ActivatedRoute,
              private _ss:StoriesService,
              private router: Router) { }

  ngOnInit() {
    this.currentLevel = 0;
    this.route.params.subscribe(params => {

      let storyPieceId = params['storyPieceId'];

      this._ss.getStoryById(params['storyId']).subscribe(
        story => {
          this.selectedStory = story;

          if(this.selectedStory.storyPieces.length==0){
            //Somehow we got into a story that does not have any storypieces.
            //This should never happen as every story should come form the API with at least the first piece.
            //But just in case, we'll check.
            return;
          }

          //Selecting the root storypiece. If we are already deep inside a story,
          // we'll replace it below after checking it's ok to add.
          this.selectedStoryPiece = this.selectedStory.storyPieces[0];

          if(storyPieceId){
            this.selectedStoryPiece = this.selectedStory.storyPieces.find(sp => sp._id === storyPieceId);
            if(this.selectedStoryPiece.level-1 <= this.currentLevel){
              //We moved just one level.
              this.currentLevel = this.selectedStoryPiece.level;
            }else{
              //prevent user from trying to enter from another level.
              console.log("a donde queres ir?");
              this.router.navigate(['/story',params['storyId']]);
              return;
            }
          }

          //store the childrens to show next paths in UI
          this.selectedStoryPieceChildren = this.selectedStoryPiece.childrenStoryPieces;

          //If we didn't exit before, it means we can add the current storypiece to the story
          this.constructedStory = this._ss.addStoryPieceToConstructedStory(this.selectedStoryPiece);

        },
        err => {console.log(err);});

     });
  }

  enter(id:string){
    console.log("entered",id)
  }

  leave(id:string){
    console.log("left",id)
  }

}
