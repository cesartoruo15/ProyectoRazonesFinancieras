import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class RazonesFinancierasService {

  private options;
  //Lista de URL's
  private url_ventas = 'http://financierocr.herokuapp.com/Sales/Ventas';
  private url_costo_ventas = 'http://financierocr.herokuapp.com/Sales/CostoVentas';
  private url_impuestos = 'http://financierocr.herokuapp.com/Sales/Impuestos';
  private url_inventario = 'http://financierocr.herokuapp.com/Sales/Inventario';
  private url_compras = 'http://financierocr.herokuapp.com/Sales/Compras';
  //CXC
  private url_cxc = 'http://financierocr.herokuapp.com/Sales/SaldoCxC';
  private url_cxc_periodo = 'http://financierocr.herokuapp.com/Sales/CxC';
  private url_cxc_abonos_periodo = 'http://financierocr.herokuapp.com/Sales/RecibosCxC';
  //CXP
  private url_cxp = 'http://financierocr.herokuapp.com/Sales/SaldoCxP';
  private url_cxp_periodo = 'http://financierocr.herokuapp.com/Sales/CxP';
  private url_cxp_abonos_periodo = 'http://financierocr.herokuapp.com/Sales/RecibosCxP';

  constructor(private http: Http) {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      'Content-Type': 'application/json'
    // , 'Authorization': 'Bearer ' + token
    });
    this.options = new RequestOptions({ headers: headers });
  }

  getInventario(){
    let url_inventario = `${this.url_inventario}`;
    return this.http.get(url_inventario, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  get_compras(fechaInicio: string, fechaFin: string){
    let url_compras = `${this.url_compras}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_compras, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  getVentas(fechaInicio: string, fechaFin: string){
    let url_ventas = `${this.url_ventas}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_ventas, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  getCostoVentas(fechaInicio: string, fechaFin: string){
    let url_costo_ventas = `${this.url_costo_ventas}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_costo_ventas, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  getImpuestos(fechaInicio: string, fechaFin: string){
    let url_impuestos = `${this.url_impuestos}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_impuestos, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  //CXC
  getSaldo_CXC(){
    let url_cxc = `${this.url_cxc}`;
    return this.http.get(url_cxc, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  get_cxc_delperiodo(fechaInicio: string, fechaFin: string){
    let url_cxc_periodo = `${this.url_cxc_periodo}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_cxc_periodo, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  get_cxc_abonos_periodo(fechaInicio: string, fechaFin: string){
    let url_cxc_abonos_periodo = `${this.url_cxc_abonos_periodo}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_cxc_abonos_periodo, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  //CXP
  getSaldo_CXP(){
    let url_cxp = `${this.url_cxp}`;
    return this.http.get(url_cxp, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  get_cxp_periodo(fechaInicio: string, fechaFin: string){
    let url_cxp_periodo = `${this.url_cxp_periodo}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_cxp_periodo, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }


  get_cxp_abonos_periodo(fechaInicio: string, fechaFin: string){
    let url_cxp_abonos_periodo = `${this.url_cxp_abonos_periodo}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url_cxp_abonos_periodo, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
