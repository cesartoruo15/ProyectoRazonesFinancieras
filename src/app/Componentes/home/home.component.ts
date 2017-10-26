import { Component, EventEmitter } from '@angular/core';
import {MaterializeDirective, MaterializeAction} from "angular2-materialize";
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser'
import { MaterializeModule  } from 'angular2-materialize';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
declare var Materialize: any;
import  { Global }  from '../../global';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{ 

  public nombre:string;
  public verPeriodo1:boolean;
  public verPeriodo2:boolean;
  public fechaInicioP1:string;
  public fechaFinP1:string;
  public fechaInicioP2:string;
  public fechaFinP2:string;

  fechaInicioP1DateActions = new EventEmitter<string|MaterializeAction>();
  form: FormGroup;

  constructor( public global: Global){
    let g_nombre = this.global.nombre;
    let g_verPeriodo1 = this.global.verPeriodo1;
    let g_verPeriodo2 = this.global.verPeriodo2;

    let g_fechaInicioP1 = this.global.fechaInicioP1;
    let g_fechaFinP1 = this.global.fechaFinP1;
    let g_fechaInicioP2 = this.global.fechaInicioP2;
    let g_fechaFinP2 = this.global.fechaFinP2;

    this.nombre = g_nombre;
    this.verPeriodo1 = g_verPeriodo1;
    this.verPeriodo2 = g_verPeriodo2;
    
    this.fechaInicioP1 = g_fechaInicioP1;
    this.fechaFinP1 = g_fechaFinP1;
    this.fechaInicioP2 = g_fechaInicioP2;
    this.fechaFinP2 = g_fechaFinP2;
  }

  inicio_P1: Date;
  fin_P1: Date;

  inicio_P2: Date;
  Fin_P2: Date;
  
  actualizarFechaInicioP1(newDate) {
    this.inicio_P1 = newDate;
    this.fechaInicioP1 = this.inicio_P1.toString();
    this.global.fechaInicioP1 = this.fechaInicioP1;

   console.log("ENTRE CARAJO",this.fechaInicioP1, "GLOBAL: ",this.global.fechaInicioP1);
  }

  actualizarFechaFinP1(newDate) {
    this.fin_P1 = newDate;
    this.fechaFinP1 = this.fin_P1.toString();
    this.global.fechaFinP1 = this.fechaFinP1;

   console.log("ENTRE CARAJO",this.fechaFinP1, "GLOBAL: ",this.global.fechaFinP1);
  }

  actualizarFechaInicioP2(newDate) {
    this.inicio_P2 = newDate;
    this.fechaInicioP2 = this.inicio_P2.toString();
    this.global.fechaInicioP2 = this.fechaInicioP2;

   console.log("ENTRE CARAJO",this.fechaInicioP2, "GLOBAL: ",this.global.fechaInicioP2);
  }

  actualizarFechaFinP2(newDate) {
    this.Fin_P2 = newDate;
    this.fechaFinP2 = this.Fin_P2.toString();
    this.global.fechaFinP2 = this.fechaFinP2;

   console.log("ENTRE CARAJO",this.fechaFinP2, "GLOBAL: ",this.global.fechaFinP2);
  }

  onCheckboxChangeP1() {
    if (this.verPeriodo1 == true) {
      this.verPeriodo1 = false;
      this.global.verPeriodo1 = false;
    }else{
      this.verPeriodo1 = true;
      this.global.verPeriodo1 = true;
    }
  }

  onCheckboxChangeP2() {
    if (this.verPeriodo2 == true) {
      this.verPeriodo2 = false;
      this.global.verPeriodo2 = false;
    }else{
      this.verPeriodo2 = true;
      this.global.verPeriodo2 = true;
    }
  }  
}