import { Component, OnInit } from '@angular/core';
import  { Global }  from '../../global';
import { Inventario } from '../../Clases/test';
import { EstadoFinancieroService } from '../../Servicios/estado-financiero.service';

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

  public numeroDatos: number;

  listado:Inventario[];
  listado2:Inventario[];

  listita;

  aja;
  
  //Variables de Muestra en la interfaz

  constructor( public global: Global, private service:EstadoFinancieroService ) { 
    let g_verPeriodo1 = this.global.verPeriodo1;
    let g_verPeriodo2 = this.global.verPeriodo2;
    this.verPeriodo1 = g_verPeriodo1;
    this.verPeriodo2 = g_verPeriodo2;

    let g_fechaInicioP1 = this.global.fechaInicioP1;
    let g_fechaFinP1 = this.global.fechaFinP1;

    this.fechaInicioP1 = g_fechaInicioP1;
    this.fechaFinP1 = g_fechaFinP1;

    let g_numeroPepe = this.global.numeroPepe;
    this.numeroDatos = g_numeroPepe;

    
  }

  ngOnInit() 
  { 
    this.mostrarVariables();
  }

  mostrarVariables() {
    let variable;
    if(this.global.verPeriodo1){
      
      this.service.getInventario(this.fechaInicioP1,this.fechaFinP1).subscribe(
        rs => this.listado = rs,
        er =>console.log('Error: %s' , er),
        () => {
          if(this.listado.length > 0 ){
            this.listita = this.listado;
            for (let obj of this.listado) {
              this.aja = obj;
              console.log("object:", obj);
            }
            
            this.numeroDatos = Number(this.aja.pepe);
            this.global.numeroPepe = Number(this.aja.pepe);
            variable = Number(this.aja.pepe);
            console.log("EL VALOR ES: "+(this.numeroDatos/2));
            console.log("LA VARIABLE ES: "+variable);
          }
        });
        
        console.log("LA VARIABLE FUERA ES: "+variable);
        console.log("EL VALOR FUERA ES: "+this.global.numeroPepe);
    }
    
      
    if(this.global.verPeriodo2){
      this.service.getInventario(this.global.fechaInicioP2,this.global.fechaFinP2).subscribe(
        rs => this.listado2 = rs,
        er =>console.log('Error: %s' , er),
        () => {
          if(this.listado2.length > 0 ){

          }
        })
    }
  }

}
