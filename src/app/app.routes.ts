import { RouterModule, Routes } from '@angular/router';
import {StoryComponent} from './components/story/story.component';
import {StoriesComponent} from './components/stories/stories.component';
import { NewStoryComponent } from './components/story/new-story/new-story.component';


const APP_ROUTES: Routes = [
  { path: '', component: StoriesComponent },
  { path: 'story/:storyId', component: StoryComponent },
  { path: 'story', component: NewStoryComponent },
  { path: 'story/:storyId/:storyPieceId', component: StoryComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES,{useHash:true});
