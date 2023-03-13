import { Component, Input } from '@angular/core';
import { Stock } from 'src/app/models/stock.model';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss'],
})
export class StockCardComponent {
  @Input() data!: Stock;
  @Input() menssage = '';
}
