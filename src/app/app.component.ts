import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {LabyrinthService} from './service/labyrinth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }
  init() {
    this.router.navigate(['init']);
  }
  loadLab() {
    this.router.navigate(['load']);
  }
  saveLab() {
    this.router.navigate(['save']);
  }
}
