import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//routing
import {APP_ROUTING} from './app.routes';
import {StoryComponent} from './components/story/story.component';
import {StoriesComponent} from './components/stories/stories.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HttpModule } from '@angular/http';
import {StoriesService} from './services/stories.service';
import { NewStoryComponent } from './components/story/new-story/new-story.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    StoriesComponent,
    NewStoryComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [StoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
