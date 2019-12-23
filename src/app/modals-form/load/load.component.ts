import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LabyrinthService} from '../../service/labyrinth.service';
import {HttpService} from '../../service/http.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css'],
  providers: [HttpService]
})
export class LoadComponent implements OnInit {
  name: string;

  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }

  ngOnInit() {
    document.getElementById('zastavka').style.display = 'none';
    this.labyrinthService.cellsWay = undefined;
    this.labyrinthService.isDraw = false;
    this.labyrinthService.saveready = false;
    this.labyrinthService.labyrinth.width = 31;
    this.labyrinthService.labyrinth.height = 31;
    this.labyrinthService.labyrinth.theme = 1;
    this.labyrinthService.labyrinth.pattern = undefined;
    this.labyrinthService.loadLabirynths();
    this.name = '';
  }

  loadLabirynth() {
    this.labyrinthService.loadLabyrinth(this.name);
  }
  next() {
    if (this.labyrinthService.labyrinth.width === 0 || this.labyrinthService.labyrinth.height === 0 ||
      this.labyrinthService.labyrinth.pattern === undefined || this.name === '') {
      alert('Файл поврежден!');
      this.router.navigate(['load']);
    } else {
      let a = 0;
      for (let i = 1; i < this.labyrinthService.labyrinth.height - 1; i++) {
        for (let j = 1; j < this.labyrinthService.labyrinth.width - 1; j++) {
          a += this.labyrinthService.labyrinth.pattern[i][j];
        }
      }
      if (a === 0) {
        alert('Файл поврежден!');
      } else { this.router.navigate(['find']); }

    }
  }
}
