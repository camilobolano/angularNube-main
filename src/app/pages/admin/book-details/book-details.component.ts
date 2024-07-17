import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { IBook } from '../../../core/models/types';

import { Console, log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  

    details = inject(BookService);
  
   libro_id : string = "";

   book : IBook ={
    id:    0,
    nombre: "libro",
    autor:  "yo",
    salida: "hoy",
   }
   constructor(public route: ActivatedRoute,private router: Router, public toast: ToastrService){}
   
   ngOnInit(): void {
     this.libro_id=  this.route.snapshot.paramMap.get("id") ?? ""
     this.loadData()
   }
   loadData(){
    this.details.getBook(parseInt(this.libro_id)).subscribe((resultado)=>{
      this.book = resultado.resultado as IBook
      console.log(resultado, this.libro_id)
    })
  }
  delete(){
    this.details.deleteBook(parseInt(this.libro_id)).subscribe((res) => {
      console.log('add response:', res);

     

      this.toast.success('Libro Creado Con Éxito ');

      this.router.navigate(['/admin/bookpages']);
    },
    (error) => {
      // Manejar errores aquí
      console.error('register error:', error);
      // Mostrar mensaje de error al usuario, etc.
    }
  );
  }
}
