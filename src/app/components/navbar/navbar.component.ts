import { Component, OnInit } from '@angular/core';
import {StoriesService} from '../../services/stories.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _ss:StoriesService) { }

  ngOnInit() {
  }

}
