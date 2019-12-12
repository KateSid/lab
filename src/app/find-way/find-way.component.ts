import {Component, OnInit} from '@angular/core';
import {Cell} from '../Cell';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {Labyrinth} from '../labyrinth';

@Component({
  selector: 'app-find-way',
  templateUrl: './find-way.component.html',
  styleUrls: ['./find-way.component.css'],
  providers: [HttpService]
})


export class FindWayComponent implements OnInit {
  url: string;
  cells: Cell[];
  lengthcells: number;

  constructor(private router: Router, private  httpService: HttpService, private labyrinth: Labyrinth) {
  }

  ngOnInit() {
    this.httpService.getLab().subscribe((data: Labyrinth) => {
      this.labyrinth = data;
    });
  }

  getWays() {
    this.httpService.getWay(this.url).subscribe((data: Cell[]) => {
      this.cells = data as Cell[];
      this.lengthcells = data.length;
    });
  }

  async getPath() {
    for (const el of this.cells) {
      this.labyrinth.pattern[el.y][el.x] = 0;
    }
    for (const el of this.cells) {
      await this.setimg(el.x, el.y, 5);
    }


    /* for (let k = 1; k < this.lengthcells - 1; k++) {
       for (let i = 0; i < this.fakelab.height; i++) {
         for (let j = 0; j < this.fakelab.width; j++) {
           if ((j === this.cells[k].x) && (i === this.cells[k].y)) {*/


    /*     }
   }
   }
   }*/
  }

  private  clearMaze() {
    for (const el of this.cells) {
      this.labyrinth.pattern[el.y][el.x] = 0;
    }
  }

  async setimg(x: number, y: number, component: number) {
    this.labyrinth.pattern[y][x] = component;
    await this.sleep(50);
  }

  async sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
  }
}
