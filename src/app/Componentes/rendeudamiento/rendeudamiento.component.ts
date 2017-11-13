import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rendeudamiento',
  templateUrl: './rendeudamiento.component.html',
  styleUrls: ['./rendeudamiento.component.css']
})
export class REndeudamientoComponent implements OnInit {

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
      console.log("FECHA ACTUAL: " +this.fechaActual);
      this.service.getInventario().subscribe(
        rs => {this.global.inventario = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_compras(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.compras_finalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.getCostoVentas(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_finalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //Inventario Final
          this.global.inventarioFinalP1 = this.global.inventario - this.global.compras_finalP1 + this.global.costoVentas_finalP1;

          console.log("INVENTARIO FINAL P1: "+this.global.inventarioFinalP1);
        });

      //CXP
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxp_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P1 = this.global.saldo_cxp - this.global.saldo_cxp_P1 + this.global.abono_cxp_P1;

          this.global.pasivoTotalP1 = this.global.saldo_cxp_final_P1 + this.global.pasivoNoCorrienteP1;
          console.log("CXP_FINAL P1 es: "+this.global.saldo_cxp_final_P1);
          console.log("PASIVO TOTAL P1 es: "+this.global.pasivoTotalP1);
        });

      //CXC
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });
      
      this.service.get_cxc_delperiodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          console.log("CXC_PERIODO P1: "+this.global.saldo_cxc_P1);
        });
      
      this.service.get_cxc_abonos_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          console.log("CXC_ABONOP1: "+this.global.abono_cxc_P1);
          this.global.saldo_cxc_final_P1 = this.global.saldo_cxc - this.global.saldo_cxc_P1 + this.global.abono_cxc_P1;

          console.log("SALDO CXC FINALP1: "+this.global.saldo_cxc_final_P1);

          this.global.activoCorrienteP1 = this.global.efectivoP1 + this.global.inventarioFinalP1 + this.global.saldo_cxc_final_P1;

          this.global.activoTotalP1 = this.global.activoCorrienteP1 + this.global.activoNoCorrienteP1;

          this.global.razon_endeudamientoP1 = this.global.pasivoTotalP1 / this.global.activoTotalP1;

          this.global.razon_pasivoCapitaP1 = this.global.pasivoNoCorrienteP1 / (this.global.activoTotalP1-this.global.pasivoTotalP1);


          console.log("Activo TotalP1: "+this.global.activoTotalP1);
          console.log("Pasivo TotalP1: "+this.global.pasivoTotalP1);
        });
    }

    if(this.global.verPeriodo2){
      console.log("FECHA ACTUAL: " +this.fechaActual);
      this.service.getInventario().subscribe(
        rs => {this.global.inventario = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });

      this.service.get_compras(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.compras_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.getCostoVentas(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //Inventario Final
          this.global.inventarioFinalP2 = this.global.inventario - this.global.compras_finalP2 + this.global.costoVentas_finalP2;

          console.log("INVENTARIO FINAL P2: "+this.global.inventarioFinalP2);
        });

      //CXP
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxp_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P2 = this.global.saldo_cxp - this.global.saldo_cxp_P2 + this.global.abono_cxp_P2;

          this.global.pasivoTotalP2 = this.global.saldo_cxp_final_P2 + this.global.pasivoNoCorrienteP2;
          console.log("CXP_FINAL P2 es: "+this.global.saldo_cxp_final_P2);
          console.log("PASIVO TOTAL P2 es: "+this.global.pasivoTotalP2);
        });

      //CXC
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });
      
      this.service.get_cxc_delperiodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          console.log("CXC_PERIODO P2: "+this.global.saldo_cxc_P2);
        });
      
      this.service.get_cxc_abonos_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          console.log("CXC_ABONOP2: "+this.global.abono_cxc_P2);
          this.global.saldo_cxc_final_P2 = this.global.saldo_cxc - this.global.saldo_cxc_P2 + this.global.abono_cxc_P2;

          console.log("SALDO CXC FINALP2: "+this.global.saldo_cxc_final_P2);

          this.global.activoCorrienteP2 = this.global.efectivoP2 + this.global.inventarioFinalP2 + this.global.saldo_cxc_final_P2;

          this.global.activoTotalP2 = this.global.activoCorrienteP2 + this.global.activoNoCorrienteP2;

          this.global.razon_endeudamientoP2 = this.global.pasivoTotalP2 / this.global.activoTotalP2;

          this.global.razon_pasivoCapitaP2 = this.global.pasivoNoCorrienteP2 / (this.global.activoTotalP2-this.global.pasivoTotalP2);


          console.log("Activo TotalP2: "+this.global.activoTotalP2);
          console.log("Pasivo TotalP2: "+this.global.pasivoTotalP2);
        });
    }

  }

}
