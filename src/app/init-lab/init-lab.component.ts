import { Component, OnInit } from '@angular/core';
import {Labyrinth} from '../labyrinth';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-init-lab',
  templateUrl: './init-lab.component.html',
  styleUrls: ['./init-lab.component.css'],
  providers: [HttpService]
})
export class InitLabComponent implements OnInit {
  constructor(private router: Router, private  httpService: HttpService) {}
  labyrinth: Labyrinth = new Labyrinth();
  ngOnInit() {
  }
  generate(labyrinth: Labyrinth) {
    this.httpService.postData(labyrinth).subscribe(res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      });
    this.router.navigate(['generate']);
  }
}
