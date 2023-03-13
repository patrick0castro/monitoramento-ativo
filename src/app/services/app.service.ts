import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  getStockBySymbol(symbol: string): Observable<any> {
    return this.httpClient.get(`yahoo/chart/${symbol}.SA`).pipe(
      map((data: any) => data.chart.result[0]),
      catchError(() =>
        throwError(() => new Error('Não foi possível encontrar dados.'))
      )
    );
  }
}
