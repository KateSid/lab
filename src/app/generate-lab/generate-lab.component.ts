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
  labyrinth: Labyrinth;
  constructor(private router: Router, private  httpService: HttpService) {}
  debugger;
  findWay() {

    this.httpService.getData(this.url).subscribe((data: Labyrinth) => {
      this.labyrinth = data;
    });
   // this.router.navigate(['find']);
  }
  ngOnInit() {
  }

}
