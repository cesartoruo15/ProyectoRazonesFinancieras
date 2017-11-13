import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rliquidez',
  templateUrl: './rliquidez.component.html',
  styleUrls: ['./rliquidez.component.css']
})
export class RLiquidezComponent implements OnInit {

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
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.costoVentasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
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
      //Funciones con dependencias de otras.
      //---INVENTARIO INICIAL
      //COMPRAS AL INICIO DEL PERIODO
      this.service.get_compras(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.compras_inicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS INICIO DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_inicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //OBTENEMOS INVENTARIO INICIAL
          this.global.inventarioInicialP1 = this.global.inventario - this.global.compras_inicialP1 + this.global.costoVentas_inicialP1;
        });
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
          //ASIGNAMOS ROTACION DE INVENTARIOS
          this.global.rotacionInventarioP1 = this.global.costoVentasP1 / (this.global.inventarioInicialP1 + this.global.inventarioFinalP1)/2;
        });
      //---CXC INICIAL
      this.service.get_cxc_delperiodo(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_PeriodoInicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxc_abonos_periodo(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_PeriodoInicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxc_inicial_P1 = this.global.saldo_cxc - this.global.saldo_cxc_PeriodoInicialP1 + this.global.abono_cxc_PeriodoInicialP1;
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

          this.global.rotacionCarteraP1 = this.global.saldo_cxc_P1/(this.global.saldo_cxc_inicial_P1+this.global.saldo_cxc_final_P1)/2;
        });

      //---CXP INICIAL
      this.service.get_cxp_periodo(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoInicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaInicioP1,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoInicialP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_inicial_P1 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoInicialP1 + this.global.abono_cxp_PeriodoInicialP1;
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

          //Variables de la vista
          this.global.capitalNetoP1 = this.global.activoCorrienteP1 - this.global.pasivoCorrienteP1;

          this.global.indiceSolvenciaP1 = this.global.activoCorrienteP1 / this.global.pasivoCorrienteP1;

          this.global.pruebaAcidaP1 = (this.global.activoCorrienteP1 - this.global.inventario)/this.global.pasivoCorrienteP1;

          this.global.rotacionCXP_P1 = this.global.saldo_cxp_P1 / (this.global.saldo_cxp_inicial_P1+this.global.saldo_cxp_final_P1)/2;
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
      //COSTO VENTAS DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP2,this.fechaFinP2).subscribe(
        rs => {this.global.costoVentasP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
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
      //Funciones con dependencias de otras.
      //---INVENTARIO INICIAL
      //COMPRAS AL INICIO DEL PERIODO
      this.service.get_compras(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.compras_inicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      //COSTO VENTAS INICIO DEL PERIODO
      this.service.getCostoVentas(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.costoVentas_inicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          //OBTENEMOS INVENTARIO INICIAL
          this.global.inventarioInicialP2 = this.global.inventario - this.global.compras_inicialP2 + this.global.costoVentas_inicialP2;
        });
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
          //ASIGNAMOS ROTACION DE INVENTARIOS
          this.global.rotacionInventarioP2 = this.global.costoVentasP2 / (this.global.inventarioInicialP2 + this.global.inventarioFinalP2)/2;
        });
      //---CXC INICIAL
      this.service.get_cxc_delperiodo(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxc_PeriodoInicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});
      
      this.service.get_cxc_abonos_periodo(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxc_PeriodoInicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxc_inicial_P2 = this.global.saldo_cxc - this.global.saldo_cxc_PeriodoInicialP2 + this.global.abono_cxc_PeriodoInicialP2;
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

          this.global.rotacionCarteraP2 = this.global.saldo_cxc_P2/(this.global.saldo_cxc_inicial_P2+this.global.saldo_cxc_final_P2)/2;
        });

      //---CXP INICIAL
      this.service.get_cxp_periodo(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.saldo_cxp_PeriodoInicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {});

      this.service.get_cxp_abonos_periodo(this.fechaInicioP2,this.fechaActual).subscribe(
        rs => {this.global.abono_cxp_PeriodoInicialP2 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
          this.global.saldo_cxp_inicial_P2 = this.global.saldo_cxp - this.global.saldo_cxp_PeriodoInicialP2 + this.global.abono_cxp_PeriodoInicialP2;
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

          //Variables de la vista
          this.global.capitalNetoP2 = this.global.activoCorrienteP2 - this.global.pasivoCorrienteP2;

          this.global.indiceSolvenciaP2 = this.global.activoCorrienteP2 / this.global.pasivoCorrienteP2;

          this.global.pruebaAcidaP2 = (this.global.activoCorrienteP2 - this.global.inventario)/this.global.pasivoCorrienteP2;

          this.global.rotacionCXP_P2 = this.global.saldo_cxp_P2 / (this.global.saldo_cxp_inicial_P2+this.global.saldo_cxp_final_P2)/2;
        });
    }

  }

}
