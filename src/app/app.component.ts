import { Component } from '@angular/core';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProdutosComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '🚀 JSON Server - API REST Fake com Angular';
}
