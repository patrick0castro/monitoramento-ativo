import { Component, Input, OnInit } from '@angular/core';
import { format, fromUnixTime } from 'date-fns';
import { concatMap, interval, switchMap, timer } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @Input() symbol!: string;

  private timerUpdate = 30000; // 30 segundos

  public stock!: Stock;
  public menssage = '';
  public values: number[] = [];
  public hours: Date[] = [];

  constructor(private service: AppService) {}

  ngOnInit(): void {
    timer(0, this.timerUpdate)
      .pipe(concatMap(() => this.service.getStockBySymbol(this.symbol)))
      .subscribe({
        next: (data) => {
          this.menssage = '';

          data.indicators.quote[0].open.forEach(
            (value: number, index: number) => {
              if (value) {
                this.values.push(value);
                this.hours.push(fromUnixTime(data.timestamp[index]));
              }
            }
          );

          const valueEnd = this.values[this.values.length - 1];
          const percent =
            (valueEnd - data.meta.previousClose) / data.meta.previousClose;

          this.stock = {
            title: this.symbol,
            value: valueEnd,
            percent,
            valueMin: Math.min(...this.values),
            valueMax: Math.max(...this.values),
            date: fromUnixTime(data.timestamp.pop()),
          };
        },
        error: (error) => {
          this.menssage = `${this.symbol.toUpperCase()}: ${error.message}`;
        },
      });
  }
}
