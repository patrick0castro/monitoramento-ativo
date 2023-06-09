import { registerLocaleData } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { AppComponent } from './app.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { StockComponent } from './components/stock/stock.component';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { NgChartsModule } from 'ng2-charts';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    StockCardComponent,
    StockComponent,
    StockChartComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgChartsModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
