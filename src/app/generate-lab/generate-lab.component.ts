import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {Labyrinth} from '../labyrinth';

@Component({
  selector: 'app-generate-lab',
  templateUrl: './generate-lab.component.html',
  styleUrls: ['./generate-lab.component.css'],
  providers: [HttpService]
})

export class GenerateLabComponent implements OnInit {
  url: string;
  constructor(private router: Router, private  httpService: HttpService, public labyrinth: Labyrinth) {
  }
  findWay() {

    this.httpService.getData(this.url).subscribe((data: Labyrinth) => {
      this.labyrinth = data;
    });
    this.router.navigate(['find']);
  }
  ngOnInit() {
    this.httpService.getLab().subscribe((data: Labyrinth) => {
      this.labyrinth = data;
    });
  }

}
