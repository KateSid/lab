import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Cell} from '../model/Cell';
import {Router} from '@angular/router';
import {HttpService} from '../service/http.service';
import {LabyrinthService} from '../service/labyrinth.service';


@Component({
  selector: 'app-find-way',
  templateUrl: './find-way.component.html',
  styleUrls: ['./find-way.component.css'],
  providers: [HttpService]
})


export class FindWayComponent implements OnInit {
  @ViewChild('buttonFind', {static: false}) buttonFind;
  url = 'wavesearch';

  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }

  ngOnInit() {
    this.labyrinthService.eventEndDrawWay.subscribe((el) => {
      this.buttonFind.nativeElement.disabled = false;
    });
    debugger;
    this.labyrinthService.saveready = true;


  }

  async getWay() {
    await this.labyrinthService.getLabyrinthWay(this.url);
    this.buttonFind.nativeElement.disabled = true;
  }

  changeSpeed(event) {
    this.labyrinthService.speed = event.target.value;
  }
}
