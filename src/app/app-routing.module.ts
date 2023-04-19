import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficaComponent } from './grafica/grafica.component';
import { NivelComponent } from './nivel/nivel.component';

const routes: Routes = 
[
  {
    path : "grafica",
    component : GraficaComponent
  },
  {
    path : "nivel",
    component : NivelComponent
  },  
  {
    
    path : "**" , redirectTo :"grafica", pathMatch : "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
