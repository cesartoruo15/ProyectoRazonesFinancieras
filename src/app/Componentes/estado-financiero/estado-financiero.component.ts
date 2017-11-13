import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { RazonesFinancierasService } from '../../Servicios/razones-financieras.service';

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
  
  //Variables de Muestra en la interfaz

  constructor( public global: Global, private service:RazonesFinancierasService ) { 
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

    if(this.global.verPeriodo1){
      this.service.getVentas(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => {this.global.ventasP1 = rs[0].valor;},
        er =>console.log('Error: %s' , er),
        () => {
        });

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
    }
    
      
    if(this.global.verPeriodo2){
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
    }
  }

}
