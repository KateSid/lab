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
    this.labyrinthService.loadLabirynths();
  }

  loadLabirynth() {
    this.labyrinthService.loadLabyrinth(this.name);
    this.labyrinthService.getLabyrinthPattern();
    if (this.labyrinthService.labyrinth.width === 0 || this.labyrinthService.labyrinth.height === 0) {
      alert('Файл поврежден!');
    } else {
      this.router.navigate(['find']);
    }
  }
}
