import {Component, Inject, OnInit} from '@angular/core';
import {LabyrinthService, MazeComponent} from '../service/labyrinth.service';

@Component({
  selector: 'app-labyrinth',
  templateUrl: './labyrinth.component.html',
  styleUrls: ['./labyrinth.component.css']
})
export class LabyrinthComponent implements OnInit {

  constructor(@Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }

  ngOnInit() {
  }

  setComponent(row: number, x: number) {
    this.labyrinthService.setComponent(row, x);
  }

  getTheme() {
    switch (this.labyrinthService.labyrinth.theme) {
      case 1:
        return 'earth';
      case 2:
        return 'fire';
      case 3:
        return 'water';
      case 4:
        return 'wind';
      }
  }

  getComponent(i: number, j: number) {
    switch (this.labyrinthService.labyrinth.pattern[i][j]) {
      case MazeComponent.Entry: return 'Entry';
      case MazeComponent.Exit: return 'Exit';
      case MazeComponent.Wall: return 'Wall';
      case MazeComponent.Pass: return 'Pass';
      case MazeComponent.Personage: return 'Personage';
      case MazeComponent.Way: return 'Way';
    }
  }
}
