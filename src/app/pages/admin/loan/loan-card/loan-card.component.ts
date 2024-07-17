import { Component, inject,  Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IBook, ILoan } from '../../../../core/models/types';
import { BookService } from '../../../../core/services/book.service';

@Component({
  selector: 'app-loan-card',
  standalone: true,
  imports: [RouterLink],
 templateUrl: './loan-card.component.html',
  styleUrl: './loan-card.component.css'
})
export class LoanCardComponent implements OnInit {
  Books = inject(BookService)
  @Input() loan : ILoan ={
    id: 0,
    fecha_inicio: "string",
    fecha_entrega: "string",
    estado: true,
    usuario_id: 0,
    libro_id: 0,
  }
  book : IBook ={
    id:    0,
    nombre: "libro",
    autor:  "yo",
    salida: "hoy",
   }
  ngOnInit(): void {
    this.loaDataNameBook()
  }

  loaDataNameBook(){
    this.Books.getBook(this.loan.libro_id).subscribe((resultado)=>{
      this.book = resultado.resultado as IBook
    })
    
   } 
}
