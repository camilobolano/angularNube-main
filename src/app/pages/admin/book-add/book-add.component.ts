import { Component, inject } from '@angular/core';
import { BookService } from '../../../core/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IBook } from '../../../core/models/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {
  adds = inject(BookService);
  constructor(private router: Router, public toast: ToastrService) {}

  bookForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
    public: new FormControl(''),
  });

  bookAdd(){
    console.log('login form:', this.bookForm.value)

    const bookData : IBook={
      nombre : this.bookForm.value.name?? '',
      autor : this.bookForm.value.author?? '',
      salida: this.bookForm.value.public?? ''
    }

    if (bookData.nombre === '' || bookData.autor === '' || bookData.salida==='') {
      this.toast.error('Por Favor Complete Todos Los Campos');
      // Aquí retorna después de mostrar el toast
      return;
    }
    this.adds.createBook(bookData).subscribe((res) => {
      console.log('add response:', res);

      if (!res.id) {
        console.log('Usuario o Contraseña Incorrecto');
        this.toast.error('error 505, error en servidor');
        return;
      }

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
