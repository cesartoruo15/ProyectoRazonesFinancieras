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
    public activoCorrienteP1:number;
    public activoNoCorrienteP1:number;
    public activoTotalP1:number;

    public activoCorrienteP2:number;
    public activoNoCorrienteP2:number;
    public activoTotalP2:number;
    //Pasivo
    public pasivoCorrienteP1:number;
    public pasivoNoCorrienteP1:number;
    public pasivoTotalP1:number;

    public pasivoCorrienteP2:number;
    public pasivoNoCorrienteP2:number;
    public pasivoTotalP2:number;
    //Inventario
    public inventario:number;

    public inventarioFinalP1:number;
    public inventarioFinalP2:number;
    //Compras
    public compraP1:number;
    public compraP2:number;

    public compras_finalP1:number;
    public compras_finalP2:number;
    
    //Ventas
    public costoVentas_finalP1:number;
    public costoVentas_finalP2:number;

    //Saldos CXC
    public saldo_cxc:number;

    public saldo_cxc_P1:number;
    public abono_cxc_P1:number;

    public saldo_cxc_P2:number;
    public abono_cxc_P2:number;

    public saldo_cxc_inicial_P1:number;
    public saldo_cxc_inicial_P2:number;

    public saldo_cxc_final_P1:number;
    public saldo_cxc_final_P2:number;
    //Saldos CXP
    public saldo_cxp:number;

    public saldo_cxp_P1:number;
    public abono_cxp_P1:number;

    public saldo_cxp_P2:number;
    public abono_cxp_P2:number;

    public saldo_cxp_inicial_P1:number;
    public saldo_cxp_inicial_P2:number;

    public saldo_cxp_final_P1:number;
    public saldo_cxp_final_P2:number;

    //Patrimonio
    public patrimonioP1:number;
    public patrimonioP2:number;

    //---Variables R---//
    //R Liquides

    //R Endeudamiento
    public razon_endeudamientoP1:number;
    public razon_endeudamientoP2:number;

    public razon_pasivoCapitaP1:number;
    public razon_pasivoCapitaP2:number;



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
        this.activoCorrienteP1 = 0;
        this.activoNoCorrienteP1 = 11000000;
        this.activoTotalP1 = 0;

        this.activoCorrienteP2 = 0;
        this.activoNoCorrienteP2 = 11000000;
        this.activoTotalP2 = 0;
        //Pasivo
        this.pasivoCorrienteP1 = 0;
        this.pasivoNoCorrienteP1 = 5000000;
        this.pasivoTotalP1 = 0;

        this.pasivoCorrienteP2 = 0;
        this.pasivoNoCorrienteP2 = 5000000;
        this.pasivoTotalP2 = 0;
        //Inventario
        this.inventario = 0;

        this.inventarioFinalP1 = 0;
        this.inventarioFinalP2 = 0;

        //Compras
        this.compraP1 = 0;
        this.compraP2 = 0;

        this.compras_finalP1 = 0;
        this.compras_finalP2 = 0;

        //Ventas
        this.costoVentas_finalP1 = 0;
        this.costoVentas_finalP2 = 0;

        //Saldos CXC
        this.saldo_cxc = 0;
    
        this.saldo_cxc_P1 = 0;
        this.abono_cxc_P1 = 0;
    
        this.saldo_cxc_P2 = 0;
        this.abono_cxc_P2 = 0;
    
        this.saldo_cxc_inicial_P1 = 0;
        this.saldo_cxc_inicial_P2 = 0;
    
        this.saldo_cxc_final_P1 = 0;
        this.saldo_cxc_final_P2 = 0;

        //Saldos CXP
        this.saldo_cxp = 0;
    
        this.saldo_cxp_P1 = 0;
        this.abono_cxp_P1 = 0;
    
        this.saldo_cxp_P2 = 0;
        this.abono_cxp_P2 = 0;
    
        this.saldo_cxp_inicial_P1 = 0;
        this.saldo_cxp_inicial_P2 = 0;
    
        this.saldo_cxp_final_P1 = 0;
        this.saldo_cxp_final_P2 = 0;

        this.patrimonioP1 = 8000000;
        this.patrimonioP2 = 8000000;

        //---Variables R---//
        //R Liquides
        
        //R Endeudamiento
        this.razon_endeudamientoP1 = 0;
        this.razon_endeudamientoP2 = 0;

        this.razon_pasivoCapitaP1 = 0;
        this.razon_pasivoCapitaP2 = 0;
    }
}