import { Component, Input, input } from '@angular/core';
import { IBook } from '../../../core/models/types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
@Input() book : IBook ={
    id:    0,
    nombre: "libro",
    autor:  "yo",
    salida: "hoy",
  }
}

