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
  }

  setParameter() {
    this.labyrinthService.setParameterLabyrinth();
    this.router.navigate(['generate']);
  }
}
