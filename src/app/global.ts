import { Injectable } from '@angular/core';


@Injectable()
export class Global {
    public nombre:string;
    public verPeriodo1:boolean;
    public verPeriodo2:boolean;
    public fechaInicioP1:string;
    public fechaFinP1:string;
    public fechaInicioP2:string;
    public fechaFinP2:string;
    //razon de liquidez
    

    constructor(){
        this.nombre = "Te pille";
        this.verPeriodo1 = true;
        this.verPeriodo2 = true;
        this.fechaInicioP1 = "01/01/2015";
        this.fechaFinP1 = "31/12/2015";
        this.fechaInicioP2 = "01/01/2016";
        this.fechaFinP2 = "31/12/2016";

    }
  
}