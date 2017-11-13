import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-r-cobertura',
  templateUrl: './rcobertura.component.html',
  styleUrls: ['./rcobertura.component.css']
})
export class RCoberturaComponent implements OnInit {

  public verPeriodo1:boolean;
  public verPeriodo2:boolean;

  public fechaInicioP1:string;
  public fechaFinP1:string;

  public fechaInicioP2:string;
  public fechaFinP2:string;

  date =  new Date();
  public fechaActual:string;

  constructor(public global: Global, private service:RazonesFinancierasService,public datepipe: DatePipe) {
    let g_verPeriodo1 = this.global.verPeriodo1;
    let g_verPeriodo2 = this.global.verPeriodo2;
    this.verPeriodo1 = g_verPeriodo1;
    this.verPeriodo2 = g_verPeriodo2;

    let g_fechaInicioP1 = this.global.fechaInicioP1;
    let g_fechaFinP1 = this.global.fechaFinP1;
    this.fechaInicioP1 = g_fechaInicioP1;
    this.fechaFinP1 = g_fechaFinP1;

    let g_fechaInicioP2 = this.global.fechaInicioP2;
    let g_fechaFinP2 = this.global.fechaFinP2;
    this.fechaInicioP2 = g_fechaInicioP2;
    this.fechaFinP2 = g_fechaFinP2;

    
   }
  ngOnInit() {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.fechaActual = latest_date;

    if(this.global.verPeriodo1){
      //Funciones sin dependencia de otras.
      //VENTAS DEL PERIODO
      this.service.getVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.ventasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.costoVentasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

        this.service.get_cxp_abonos_periodo(this.fechaInicioP1,this.fechaFinP1).subscribe(
          rs => {this.global.abono_cxp_P1 = rs[0].valor;},
          er =>console.log('Error: %s' , er),
          () => {});

      this.service.getImpuestos(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.impuestoP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //UTILIDAD ANTES IMPUESTOS
          this.global.utilidadAntesImpP1 = (this.global.ventasP1 - this.global.costoVentasP1 - this.global.gastosFinancierosP1) / this.global.ventasP1;

          //COVERTURA TOTAL PASIVO
          this.global.coverturaTotalPasivoP1 = this.global.utilidadAntesImpP1 / (this.global.interesesP1 + this.global.abono_cxp_P1);

          //RAZON COVERTURA TOTAL
          this.global.razonCoberturaTotalP1 = this.global.utilidadAntesImpP1 / (this.global.interesesP1 + this.global.abono_cxp_P1 + this.global.gastosOperacionP1);
        });
    }

    if(this.global.verPeriodo2){
      //Funciones sin dependencia de otras.
      //VENTAS DEL PERIODO
      this.service.getVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.ventasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.costoVentasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

        this.service.get_cxp_abonos_periodo(this.fechaInicioP2,this.fechaFinP2).subscribe(
          rs => {this.global.abono_cxp_P2 = rs[0].valor;},
          er =>console.log('Error: %s' , er),
          () => {});

      this.service.getImpuestos(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.impuestoP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //UTILIDAD ANTES IMPUESTOS
          this.global.utilidadAntesImpP2 = (this.global.ventasP2 - this.global.costoVentasP2 - this.global.gastosFinancierosP2) / this.global.ventasP2;

          //COVERTURA TOTAL PASIVO
          this.global.coverturaTotalPasivoP2 = this.global.utilidadAntesImpP2 / (this.global.interesesP2 + this.global.abono_cxp_P2);

          //RAZON COVERTURA TOTAL
          this.global.razonCoberturaTotalP2 = this.global.utilidadAntesImpP2 / (this.global.interesesP2 + this.global.abono_cxp_P2 + this.global.gastosOperacionP2);
        });
    }
  }

}
