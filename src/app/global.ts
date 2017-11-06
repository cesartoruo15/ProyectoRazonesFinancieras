import { Injectable } from '@angular/core';

@Injectable()
export class Global {
    public verPeriodo1:boolean;
    public verPeriodo2:boolean;
    public fechaInicioP1:string;
    public fechaFinP1:string;
    public fechaInicioP2:string;
    public fechaFinP2:string; 
    
    public numeroPepe:number;

    constructor(){
        this.verPeriodo1 = true;
        this.verPeriodo2 = true;
        this.fechaInicioP1 = "2015-01-01";
        this.fechaFinP1 = "2015-12-31";
        this.fechaInicioP2 = "2016-01-01";
        this.fechaFinP2 = "2016-12-31";

        this.numeroPepe = 1;
    }
}