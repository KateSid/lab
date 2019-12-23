import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {LabyrinthService} from '../service/labyrinth.service';
import {Cell} from "../model/Cell";

@Component({
  selector: 'app-generate-lab',
  templateUrl: './generate-lab.component.html',
  styleUrls: ['./generate-lab.component.css'],
  providers: [HttpService]
})

export class GenerateLabComponent implements OnInit {
  url = 'molegenerate';

  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
    this.labyrinthService.labyrinth.start = new Cell();
    this.labyrinthService.labyrinth.stop = new Cell();
    this.labyrinthService.errorCells = [];
  }

  falseManual() {
    this.labyrinthService.isManualEdit = false;
  }

  async createLabyrinth() {
    if (this.url === 'hand') {
      const error = this.labyrinthService.ExcelentStruct(this.labyrinthService.isManualEdit);
      if (error.length !== 0) {
        alert("Ошибка структуры");
        console.log(error);
        return;
      }
      this.labyrinthService.sendLab();
      this.router.navigate(['find']);
    } else {
      await this.labyrinthService.getLabyrinthStruct(this.url);

      this.router.navigate(['find']);
    }
}

  ngOnInit() {
    this.labyrinthService.getLabyrinthPattern();
    this.labyrinthService.labyrinth.start = new Cell();
    this.labyrinthService.labyrinth.stop = new Cell();
  }

}
