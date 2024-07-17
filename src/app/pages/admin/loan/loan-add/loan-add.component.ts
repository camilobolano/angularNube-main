import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoanService } from '../../../../core/services/loan.service';
import { ILoan } from '../../../../core/models/types';



@Component({
  selector: 'app-loan-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './loan-add.component.html',
  styleUrl: './loan-add.component.css'
})
export class LoanAddComponent {
 loans = inject(LoanService)
  constructor(private router: Router, public toast: ToastrService, public route : ActivatedRoute) {}

  loanForm = new FormGroup({
    dateS: new FormControl(''),
    dateF: new FormControl(''),
   
  });
 
   
  libro_id : string = "";
  ngOnInit(): void {
    this.libro_id=  this.route.snapshot.paramMap.get("id") ?? ""
   
    
  }


 

  loanadd(){
    console.log('login form:', this.loanForm.value)

    const loanData : ILoan={
      fecha_inicio: this.loanForm.value.dateS ?? "",
      fecha_entrega: this.loanForm.value.dateF?? "",
      estado: true,
      usuario_id: 1,
      libro_id: parseInt(this.libro_id)
    }

    if (loanData.fecha_inicio === '' || loanData.fecha_entrega === '') {
      this.toast.error('Por Favor Completa Todos Los Campos');
      // Aquí retorna después de mostrar el toast
      return;
    }
    this.loans.createLoan(loanData).subscribe((res) => {
      console.log('add response:', res);

      if (!res.id) {
        console.log('Usuario o Contraseña Incorrecto');
        this.toast.error('error 505, error en servidor');
        return;
      }

      this.toast.success('Libro Creado Con Éxito ');

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
