import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() category: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
}
