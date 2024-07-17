import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBook } from '../../../core/models/types';
import { BookService } from '../../../core/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.css'
})
export class BookEditComponent implements OnInit {
  edits = inject(BookService);
  constructor(private router: Router, public toast: ToastrService, public route : ActivatedRoute) {}

  bookForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
    public: new FormControl(''),
  });
  book : IBook ={
   
    nombre: this.bookForm.value.name?? '',
    autor:  this.bookForm.value.author?? '',
    salida: this.bookForm.value.public?? '',
   }
  libro_id : string = "";
  ngOnInit(): void {
    this.libro_id=  this.route.snapshot.paramMap.get("id") ?? ""
    this.loadData()
    this.loadDataBeforeEdit()
  }
  loadData(){
    this.edits.getBook(parseInt(this.libro_id)).subscribe((resultado)=>{
      this.book = resultado.resultado as IBook
     
    })
  }

  loadDataBeforeEdit(){
    this.bookForm.patchValue({
      
      name : this.book.nombre ?? "",
      author: this.book.autor ?? "",
      public: this.book.salida ?? "",
    })
  }

  bookedit(){
    console.log('login form:', this.bookForm.value)

    const bookData : IBook={
      id: parseInt(this.libro_id),
      nombre : this.bookForm.value.name ?? this.book.nombre,
      autor : this.bookForm.value.author ?? this.book.autor,
      salida: this.bookForm.value.public ?? this.book.salida
    }

    if (bookData.nombre === '' || bookData.autor === '' || bookData.salida==='') {
      this.toast.error('Por Favor Completa Todos Los Campos');
      // Aquí retorna después de mostrar el toast
      return;
    }
    this.edits.updateBook(bookData).subscribe((res) => {
      console.log('add response:', res);

      if (!res.id) {
        console.log('Usuario o Contraseña Incorrecto');
        this.toast.error('error 505, error en servidor');
        return;
      }

      this.toast.success('Libro Eliminado Con Éxito ');

      this.router.navigate(["/admin/detailsbook/"+ this.libro_id]);
    },
    (error) => {
      // Manejar errores aquí
      console.error('register error:', error);
      // Mostrar mensaje de error al usuario, etc.
    }
  );
  }


}
