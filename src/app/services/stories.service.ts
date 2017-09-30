import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

const API_ROUTE_BASE = 'http://localhost:8080/api/';
const API_ROUTE = API_ROUTE_BASE+'stories';
const API_USER_ROUTE = API_ROUTE_BASE+'user';

@Injectable()
export class StoriesService {

  constructedStory:any[];
  loggedUser:any;
  constructor(private http: Http) {
    this.constructedStory = [];
    if (localStorage) {
      localStorage.removeItem("loggedUser");
      if(localStorage.getItem("loggedUser")){
        this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      }else{
        this.getRandomUsername().subscribe(
          userData => {
            this.loggedUser = userData;
            localStorage.setItem("loggedUser",JSON.stringify(this.loggedUser));
          },
          err => {console.log(err);});
      }
    } else {
      // No support. Use a fallback such as browser cookies or store on the server.
    }
    console.log(this.loggedUser);
  }

  getRandomUsername() : Observable<Comment[]> {
    return this.http.get(API_USER_ROUTE)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  // Fetch all existing comments
   getStories() : Observable<Comment[]> {
     return this.http.get(API_ROUTE)
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   getStoryById(storyId:String) : Observable<Comment[]> {
     return this.http.get(`${API_ROUTE}/${storyId}`)
       .map((res:Response) => res.json())
       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
   }

   addStoryPieceToConstructedStory(storyPiece:any){
     let constructedStoryText = "";

     if(this.constructedStory.length>0){
       let latestStoryPiece = this.constructedStory[this.constructedStory.length-1];
       //console.log("latest in array: ",latestStoryPiece);
       //console.log("new story piece to add",storyPiece);

       //Making sure we are adding a story piece as a children of the correct parent.
       //In case the user went back on his browser
       if(storyPiece.parentStoryPiece && (storyPiece.parentStoryPiece._id === latestStoryPiece._id)){
         console.log("we are ok");
         this.constructedStory.push(storyPiece);
       }
       if(latestStoryPiece.parentStoryPiece && (storyPiece._id === latestStoryPiece.parentStoryPiece._id)){
         console.log("we went back, we have to remove the previous choice");
         this.constructedStory.pop();
       }
     }else{
       this.constructedStory.push(storyPiece);
     }

     this.constructedStory.forEach((storyPiece)=>{
      console.log(storyPiece.storyPieceText);
      constructedStoryText += storyPiece.storyPieceText;
     });

     console.log(this.constructedStory);
     return constructedStoryText;
   }

   resetConstructedStory(){
     this.constructedStory = [];
     return "";
   }



}
