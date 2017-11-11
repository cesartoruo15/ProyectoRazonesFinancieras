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

    //Variables del Periodo I
    public ventasP1:number;
    public costoVentasP1:number;
    public utilidadBrutaP1:number;
    public gastosBrutoP1:number;
    public gastosOperacionP1:number;
    public ut_antes_int_impP1:number;
    public gastosFinancierosP1:number;
    public utilidadNetaP1:number;

    public impuestoP1:number;
    public efectivoP1:number;

    //Variables del Periodo II
    public ventasP2:number;
    public costoVentasP2:number;
    public utilidadBrutaP2:number;
    public gastosBrutoP2:number;
    public gastosOperacionP2:number;
    public ut_antes_int_impP2:number;
    public gastosFinancierosP2:number;
    public utilidadNetaP2:number;

    public impuestoP2:number;
    public efectivoP2:number;

    //--------Variables Generales-----//
    //Acciones
    public acciones:number;
    //Activo
    public activoCorriente:number;
    public activoNoCorriente:number;
    public activoTotal:number;
    //Pasivo
    public pasivoCorriente:number;
    public pasivoNoCorriente:number;
    public pasivoTotal:number;



    constructor(){
        this.verPeriodo1 = true;
        this.verPeriodo2 = true;
        this.fechaInicioP1 = "2015-01-01";
        this.fechaFinP1 = "2015-12-31";
        this.fechaInicioP2 = "2016-01-01";
        this.fechaFinP2 = "2016-12-31";

        //Variables del periodo I
        this.ventasP1 = 0;
        this.costoVentasP1 = 0;
        this.utilidadBrutaP1 = 0;
        this.gastosBrutoP1 = 0;
        this.gastosOperacionP1 = 8500000;
        this.ut_antes_int_impP1 = 0;
        this.gastosFinancierosP1 = 0;
        this.impuestoP1 = 0;
        this.utilidadNetaP1= 0;
        this.efectivoP1 = 9500000;
        

        //Variables del periodo II
        this.ventasP2 = 0;
        this.costoVentasP2 = 0;
        this.utilidadBrutaP2 = 0;
        this.gastosBrutoP2 = 0;
        this.gastosOperacionP2 = 8500000;
        this.ut_antes_int_impP2 = 0;
        this.gastosFinancierosP2 = 0;
        this.impuestoP2 = 0;
        this.utilidadNetaP2 = 0;
        this.efectivoP2 = 10000000;

        //Variables Generales
        //Acciones
        this.acciones = 100;
        //activo
        this.activoCorriente = 0;
        this.activoNoCorriente = 11000000;
        this.activoTotal = 0;
        //Pasivo
        this.pasivoCorriente = 0;
        this.pasivoNoCorriente = 5000000;
        this.pasivoTotal = 0;

    }
}