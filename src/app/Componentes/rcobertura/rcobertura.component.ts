import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';

@Component({
  selector: 'app-r-cobertura',
  templateUrl: './rcobertura.component.html',
  styleUrls: ['./rcobertura.component.css']
})
export class RCoberturaComponent implements OnInit {

  public verPeriodo1:boolean;
  public verPeriodo2:boolean;
  constructor(public global: Global) {
    let g_verPeriodo1 = this.global.verPeriodo1;
    let g_verPeriodo2 = this.global.verPeriodo2;
    this.verPeriodo1 = g_verPeriodo1;
    this.verPeriodo2 = g_verPeriodo2;
   }
  ngOnInit() {
  }

}
