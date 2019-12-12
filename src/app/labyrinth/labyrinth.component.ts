import {Component, Inject, OnInit} from '@angular/core';
import {LabyrinthService} from '../service/labyrinth.service';

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

}
