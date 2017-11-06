import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

//Interfaz
import { Inventario } from '../Clases/test';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class EstadoFinancieroService {

  private options;
  private url = 'http://localhost:8000/test';

  constructor(private http: Http) {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      'Content-Type': 'application/json'
    // , 'Authorization': 'Bearer ' + token
    });
    this.options = new RequestOptions({ headers: headers });
  }

  getInventario(fechaInicioP1: string, fechaFinP1: string): Observable<Inventario[]> {
    let url = `${this.url}/${fechaInicioP1}/${fechaFinP1}`;
    return this.http.get(url, this.options)
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
