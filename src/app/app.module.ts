import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InitLabComponent } from './init-lab/init-lab.component';
import { GenerateLabComponent } from './generate-lab/generate-lab.component';
import { FindWayComponent } from './find-way/find-way.component';
import {FormsModule} from '@angular/forms';
import { LoadComponent } from './load/load.component';

// определение маршрутов
const appRoutes: Routes =[
  { path: 'find', component: FindWayComponent},
  { path: 'generate', component: GenerateLabComponent},
  { path: 'init', component: InitLabComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InitLabComponent,
    GenerateLabComponent,
    FindWayComponent,
    LoadComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
