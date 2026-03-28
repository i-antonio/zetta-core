import { Component } from '@angular/core';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { PostsComponent } from './components/posts/posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    UsuariosComponent,
    ProdutosComponent,
    PostsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '🚀 JSON Server - API REST Fake com Angular';
}
