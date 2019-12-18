import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {LabyrinthService} from '../service/labyrinth.service';

@Component({
  selector: 'app-generate-lab',
  templateUrl: './generate-lab.component.html',
  styleUrls: ['./generate-lab.component.css'],
  providers: [HttpService]
})

export class GenerateLabComponent implements OnInit {
  url = 'molegenerate';

  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }

  async createLabyrinth() {
    if (this.url == 'hand') {
      const c = true;
      this.labyrinthService.ExcelentStruct(c);
    }
   // await this.labyrinthService.getLabyrinthStruct(this.url);

    this.router.navigate(['find']);
  }

  ngOnInit() {
    this.labyrinthService.getLabyrinthPattern();

  }

}
