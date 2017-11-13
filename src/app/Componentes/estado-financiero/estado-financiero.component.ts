import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estado-financiero',
  templateUrl: './estado-financiero.component.html',
  styleUrls: ['./estado-financiero.component.css']
})
export class EstadoFinancieroComponent implements OnInit {

  public verPeriodo1:boolean;
  public verPeriodo2:boolean;

  public fechaInicioP1:string;
  public fechaFinP1:string;

  public fechaInicioP2:string;
  public fechaFinP2:string;
  
  date =  new Date();
  public fechaActual:string;

  constructor( public global: Global, private service:RazonesFinancierasService,public datepipe: DatePipe ) { 
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

  ngOnInit() 
  { 
    this.mostrarVariables();
  }

  mostrarVariables() {

    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.fechaActual = latest_date;
    console.log("La fecha actual es:"+this.fechaActual);
    if(this.global.verPeriodo1){

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
          this.global.inventarioFinalP1 = this.global.inventario - this.global.compras_finalP1 + this.global.costoVentas_finalP1;
        });

        //CXC FINAL
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });
      
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

          console.log("Activo TotalP1: "+this.global.activoTotalP1);
          console.log("Pasivo TotalP1: "+this.global.pasivoTotalP1);
        });

        //CXP  FINAL
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxp_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoFinalP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P1 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoFinalP1 + this.global.abono_cxp_PeriodoFinalP1;

          this.global.pasivoTotalP1 = this.global.saldo_cxp_final_P1 + this.global.pasivoNoCorrienteP1;
          console.log("CXP_FINAL P1 es: "+this.global.saldo_cxp_final_P1);
          console.log("PASIVO TOTAL P1 es: "+this.global.pasivoTotalP1);
        });

        //---------------Primera Tabla
      this.service.getVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.ventasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

        
        this.service.getCostoVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
          rs => {this.global.costoVentasP1 = rs[0].valor;},
          er =>console.log('Error: %s' , er),
          () => {
            this.global.ut_antes_int_impP1 = (this.global.ventasP1-this.global.costoVentasP1-this.global.gastosFinancierosP1)/this.global.ventasP1;
          });

          this.service.getImpuestos(this.fechaInicioP1,this.fechaFinP1).subscribe(
            rs => {this.global.impuestoP1 = rs[0].valor;},
            er =>console.log('Error: %s' , er),
            () => {

              this.global.utilidadNetaP1 = (this.global.ventasP1 - this.global.costoVentasP1 - this.global.gastosFinancierosP1- this.global.impuestoP1-this.global.gastosOperacionP1)/this.global.ventasP1;
            });

      //CXC
      this.service.get_cxc_delperiodo(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.saldo_cxc_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
        //CXP
      this.service.get_cxp_periodo(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.saldo_cxp_P1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
    }
    
      
    if(this.global.verPeriodo2){

      //Inventario Final
      this.service.getInventario().subscribe(
        rs => {this.global.inventario = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_compras(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.compras_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.getCostoVentas(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_finalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.inventarioFinalP2 = this.global.inventario - this.global.compras_finalP2 + this.global.costoVentas_finalP2;
        });
        //CXC FINAL
      this.service.getSaldo_CXC().subscribe(
        rs => {this.global.saldo_cxc = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });
      
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

          console.log("Activo TotalP2: "+this.global.activoTotalP2);
          console.log("Pasivo TotalP2: "+this.global.pasivoTotalP2);
        });

        //CXP  FINAL
      this.service.getSaldo_CXP().subscribe(
        rs => {this.global.saldo_cxp = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxp_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaFinP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoFinalP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_final_P2 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoFinalP2 + this.global.abono_cxp_PeriodoFinalP2;

          this.global.pasivoTotalP2 = this.global.saldo_cxp_final_P2 + this.global.pasivoNoCorrienteP2;
          console.log("CXP_FINAL P2 es: "+this.global.saldo_cxp_final_P2);
          console.log("PASIVO TOTAL P2 es: "+this.global.pasivoTotalP2);
        });

        //---------------Primera Tabla
      this.service.getVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.ventasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });

        this.service.getCostoVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
          rs => {this.global.costoVentasP2 = rs[0].valor;},
          er =>console.log('Error: %s' , er),
          () => {
            this.global.ut_antes_int_impP2 = (this.global.ventasP2-this.global.costoVentasP2-this.global.gastosFinancierosP2)/this.global.ventasP2;
          });

          this.service.getImpuestos(this.fechaInicioP2,this.fechaFinP2).subscribe(
            rs => {this.global.impuestoP2 = rs[0].valor;},
            er =>console.log('Error: %s' , er),
            () => {
              this.global.utilidadNetaP2 = (this.global.ventasP2 - this.global.costoVentasP2 - this.global.gastosFinancierosP2- this.global.impuestoP2-this.global.gastosOperacionP2)/this.global.ventasP2;
            });

      //CXC
      this.service.get_cxc_delperiodo(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.saldo_cxc_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      //CXP
      this.service.get_cxp_periodo(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.saldo_cxp_P2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
    }
  }

}
