import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LabyrinthService} from '../service/labyrinth.service';
import {HttpService} from '../service/http.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css'],
  providers: [HttpService]
})
export class SaveComponent implements OnInit {
  name: string;
  saveCompplete: boolean;
  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) { }
  ngOnInit() {
    this.saveCompplete = false;
  }
  saveSend() {
    if (name !== '') {
      this.labyrinthService.sendLabirynth(this.name);
      this.saveCompplete = true;
    }
  }
}
