import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {LabyrinthService} from './service/labyrinth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
  constructor(private router: Router, @Inject(LabyrinthService) private labyrinthService: LabyrinthService) {
  }
  init() {
    this.router.navigate(['init']);
  }
  loadLab() {
    this.router.navigate(['load']);
  }
  saveLab() {
    this.router.navigate(['save']);
  }
  info() {
    this.url = window.location.href;
    alert('\r             Лабораторный практикум по дисциплине \r ' +
      '                   "Технология программирования" \n ' +
      'Проект "Автоматизированная система генирирования\r' +
      '   структуры лабиринта и нахождения выхода из него"\n' +
      'Разработчики: Воронова В.Г., Сидорова Е.В., ' +
      'гр. 6402-090301D\r' +
      '                         Самарский университет, 2019');
  }
}
