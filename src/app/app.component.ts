import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Labyrinth} from './labyrinth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  labyrinth: Labyrinth;
  constructor(private router: Router) {}
  init() {
    this.router.navigate(['init']);
  }

}
