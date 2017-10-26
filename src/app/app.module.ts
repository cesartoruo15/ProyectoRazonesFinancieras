import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MaterializeModule } from 'angular2-materialize';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './Componentes/home/home.component';
import { NotasComponent } from './Componentes/notas/notas.component';
import { EstadoFinancieroComponent } from './Componentes/estado-financiero/estado-financiero.component';
import { RLiquidezComponent } from './Componentes/rliquidez/rliquidez.component';
import { REndeudamientoComponent } from './Componentes/rendeudamiento/rendeudamiento.component';
import { RRentabilidadComponent } from './Componentes/rrentabilidad/rrentabilidad.component';
import { RCoberturaComponent } from './Componentes/rcobertura/rcobertura.component';
import  { Global }  from './global';

const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'estados-financieros', component: EstadoFinancieroComponent },
  { path: 'r-liquidez', component: RLiquidezComponent },
  { path: 'r-endeudamiento', component: REndeudamientoComponent },
  { path: 'r-rentabilidad', component: RRentabilidadComponent },
  { path: 'r-cobertura', component: RCoberturaComponent },
  { path: 'notas', component: NotasComponent },
  { path: '**',component: HomeComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotasComponent,
    EstadoFinancieroComponent,
    RLiquidezComponent,
    REndeudamientoComponent,
    RRentabilidadComponent,
    RCoberturaComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Global,FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
