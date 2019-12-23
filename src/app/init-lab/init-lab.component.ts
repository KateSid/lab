import {Component, Inject, OnInit} from '@angular/core';
import {Labyrinth} from '../model/labyrinth';
import {HttpService} from '../service/http.service';
import {Router} from '@angular/router';
import {LabyrinthService} from '../service/labyrinth.service';

@Component({
  selector: 'app-init-lab',
  templateUrl: './init-lab.component.html',
  styleUrls: ['./init-lab.component.css'],
  providers: [HttpService]
})

export class InitLabComponent implements OnInit {
  constructor(private router: Router,
              @Inject(LabyrinthService) private labyrinthService: LabyrinthService
  ) {
  }


  ngOnInit() {
    this.labyrinthService.saveready = false;
    this.labyrinthService.labyrinth.width = 31;
    this.labyrinthService.labyrinth.height = 31;
    this.labyrinthService.labyrinth.theme = 1;
    this.labyrinthService.labyrinth.pattern = undefined;
  }

  setParameter() {
    if (this.labyrinthService.labyrinth.width % 2 === 0 || this.labyrinthService.labyrinth.height % 2 === 0 ||
      this.labyrinthService.labyrinth.width < 7 || this.labyrinthService.labyrinth.width > 31 ||
      this.labyrinthService.labyrinth.height < 7 || this.labyrinthService.labyrinth.height > 31) {
    alert('Укажите нечетную длину в диапозоне 7 - 31!');
    } else {
      document.getElementById('zastavka').style.display = "none";
      this.labyrinthService.setParameterLabyrinth();
      this.router.navigate(['generate']);
    }
  }
}
