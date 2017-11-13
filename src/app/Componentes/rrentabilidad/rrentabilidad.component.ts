import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rrentabilidad',
  templateUrl: './rrentabilidad.component.html',
  styleUrls: ['./rrentabilidad.component.css']
})
export class RRentabilidadComponent implements OnInit {

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
      //Inventario
      this.service.getInventario().subscribe(
        rs => {this.global.inventario = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //SALDO CXC
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //SALDO CXP
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //VENTAS DEL PERIODO
      this.service.getVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.ventasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.costoVentasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.margenBrutoUtilidadP1 = (this.global.ventasP1 -this.global.costoVentasP1) / this.global.ventasP1;

          this.global.margenUtilidadOperacionalP1 = (this.global.ventasP1 -this.global.costoVentasP1 - this.global.gastosFinancierosP1) / this.global.ventasP1;
        });

      this.service.getImpuestos(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.impuestoP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {

          this.global.margenNetoUtilidadP1 = (this.global.ventasP1 - this.global.costoVentasP1 - this.global.gastosFinancierosP1- this.global.impuestoP1-this.global.gastosOperacionP1)/this.global.ventasP1;
        });

      //CXC DEL PERIODO
      this.service.get_cxc_delperiodo(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.saldo_cxc_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //CXP DEL PERIODO
      this.service.get_cxp_periodo(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.saldo_cxp_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      //---INVENTARIO FINAL
      //COMPRAS AL FINAL DEL PERIODO
      this.service.get_compras(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.compras_finalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS FINAL DEL PERIODO
      this.service.getCostoVentas(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_finalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //OBTENEMOS INVENTARIO FINAL
          this.global.inventarioFinalP1 = this.global.inventario - this.global.compras_finalP1 + this.global.costoVentas_finalP1;
        });

      //---CXP FINAL
      this.service.get_cxp_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P1 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoFinalP1 + this.global.abono_cxp_PeriodoFinalP1;

          this.global.pasivoCorrienteP1 = this.global.saldo_cxp_final_P1;

          this.global.pasivoTotalP1 = this.global.pasivoCorrienteP1 +this.global.pasivoNoCorrienteP1;
        });

      //---CXC FINAL
      this.service.get_cxc_delperiodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxc_abonos_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxc_final_P1 = this.global.saldo_cxc - this.global.saldo_cxc_PeriodoFinalP1 + this.global.abono_cxc_PeriodoFinalP1;

          this.global.activoCorrienteP1 = this.global.efectivoP1 + this.global.inventarioFinalP1 + this.global.saldo_cxc_final_P1;

          this.global.activoTotalP1 = this.global.activoCorrienteP1 + this.global.activoNoCorrienteP1;

          //CAPITAL CONTABLE
          this.global.capitalContableP1 = this.global.activoTotalP1 - this.global.pasivoTotalP1;
          //ROTACION DE ACTIVOS
          this.global.rotacionActivosP1 = this.global.ventasP1 / this.global.activoTotalP1;

          //RENDIMIENTO DE LA INVERSION
          this.global.rendimientoInversionP1 = this.global.margenNetoUtilidadP1 / this.global.activoTotalP1;

          //RENDIMIENTO CAPITAL COMUN
          this.global.rendimientoCapitalComunP1 = (this.global.margenNetoUtilidadP1-this.global.dividendosPreferentesP1)/(this.global.capitalContableP1-this.global.capitalPreferenteP1);

          //UTILIDAD POR ACCION
          this.global.utilidadXAccionP1 = this.global.margenNetoUtilidadP1 / this.global.acciones;
        });
      
    }

    if(this.global.verPeriodo2){

       //Funciones sin dependencia de otras.
      //Inventario
      this.service.getInventario().subscribe(
        rs => {this.global.inventario = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //SALDO CXC
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //SALDO CXP
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //VENTAS DEL PERIODO 
      this.service.getVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.ventasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.costoVentasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.margenBrutoUtilidadP2 = (this.global.ventasP2 -this.global.costoVentasP2) / this.global.ventasP2;

          this.global.margenUtilidadOperacionalP2 = (this.global.ventasP2 -this.global.costoVentasP2 - this.global.gastosFinancierosP2) / this.global.ventasP2;
        });

      this.service.getImpuestos(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.impuestoP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {

          this.global.margenNetoUtilidadP2 = (this.global.ventasP2 - this.global.costoVentasP2 - this.global.gastosFinancierosP2- this.global.impuestoP2-this.global.gastosOperacionP2)/this.global.ventasP2;
        });

      //CXC DEL PERIODO
      this.service.get_cxc_delperiodo(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.saldo_cxc_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //CXP DEL PERIODO
      this.service.get_cxp_periodo(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.saldo_cxp_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      //---INVENTARIO FINAL
      //COMPRAS AL FINAL DEL PERIODO
      this.service.get_compras(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.compras_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS FINAL DEL PERIODO
      this.service.getCostoVentas(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //OBTENEMOS INVENTARIO FINAL
          this.global.inventarioFinalP2 = this.global.inventario - this.global.compras_finalP2 + this.global.costoVentas_finalP2;
        });

      //---CXP FINAL
      this.service.get_cxp_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P2 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoFinalP2 + this.global.abono_cxp_PeriodoFinalP2;

          this.global.pasivoCorrienteP2 = this.global.saldo_cxp_final_P2;

          this.global.pasivoTotalP2 = this.global.pasivoCorrienteP2 +this.global.pasivoNoCorrienteP2;
        });

      //---CXC FINAL
      this.service.get_cxc_delperiodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxc_abonos_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxc_final_P2 = this.global.saldo_cxc - this.global.saldo_cxc_PeriodoFinalP2 + this.global.abono_cxc_PeriodoFinalP2;

          this.global.activoCorrienteP2 = this.global.efectivoP2 + this.global.inventarioFinalP2 + this.global.saldo_cxc_final_P2;

          this.global.activoTotalP2 = this.global.activoCorrienteP2 + this.global.activoNoCorrienteP2;

          //CAPITAL CONTABLE
          this.global.capitalContableP2 = this.global.activoTotalP2 - this.global.pasivoTotalP2;
          //ROTACION DE ACTIVOS
          this.global.rotacionActivosP2 = this.global.ventasP2 / this.global.activoTotalP2;

          //RENDIMIENTO DE LA INVERSION
          this.global.rendimientoInversionP2 = this.global.margenNetoUtilidadP2 / this.global.activoTotalP2;

          //RENDIMIENTO CAPITAL COMUN
          this.global.rendimientoCapitalComunP2 = (this.global.margenNetoUtilidadP2-this.global.dividendosPreferentesP2)/(this.global.capitalContableP2-this.global.capitalPreferenteP2);

          //UTILIDAD POR ACCION
          this.global.utilidadXAccionP2 = this.global.margenNetoUtilidadP2 / this.global.acciones;
        });

    }

  }

}
