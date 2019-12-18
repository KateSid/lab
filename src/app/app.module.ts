import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {InitLabComponent} from './init-lab/init-lab.component';
import {GenerateLabComponent} from './generate-lab/generate-lab.component';
import {FindWayComponent} from './find-way/find-way.component';
import {FormsModule} from '@angular/forms';
import {LoadComponent} from './modals-form/load/load.component';
import {Labyrinth} from './model/labyrinth';
import {LabyrinthService} from './service/labyrinth.service';
import {HttpService} from './service/http.service';
import { LabyrinthComponent } from './labyrinth/labyrinth.component'
import {SaveComponent} from './modals-form/save/save.component';

// определение маршрутов
const appRoutes: Routes = [
  {path: 'find', component: FindWayComponent},
  {path: 'generate', component: GenerateLabComponent},
  {path: 'init', component: InitLabComponent},
  {path: 'load', component: LoadComponent},
  {path: 'save', component: SaveComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InitLabComponent,
    GenerateLabComponent,
    FindWayComponent,
    LoadComponent,
    LabyrinthComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule
  ],
  providers: [Labyrinth,
    HttpService, LabyrinthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

