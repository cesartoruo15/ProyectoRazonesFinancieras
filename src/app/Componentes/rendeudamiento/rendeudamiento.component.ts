import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';

@Component({
  selector: 'app-rendeudamiento',
  templateUrl: './rendeudamiento.component.html',
  styleUrls: ['./rendeudamiento.component.css']
})
export class REndeudamientoComponent implements OnInit {

  public verPeriodo1:boolean;
  public verPeriodo2:boolean;
  constructor(public global: Global, private service:RazonesFinancierasService ) {
    let g_verPeriodo1 = this.global.verPeriodo1;
    let g_verPeriodo2 = this.global.verPeriodo2;
    this.verPeriodo1 = g_verPeriodo1;
    this.verPeriodo2 = g_verPeriodo2;
   }

  ngOnInit() {

    if(this.global.verPeriodo1){
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.pasivoCorriente = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });
    }

  }

}
