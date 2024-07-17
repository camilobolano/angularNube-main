import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IRegister } from '../../../../core/models/types';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { setTimeout } from 'timers/promises';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authS = inject(AuthService);
  constructor(private router: Router, public toast: ToastrService) {}
  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
   handleregister(){

    console.log('login form:', this.registerForm.value)

    const registerData : IRegister={
      nombre : this.registerForm.value.username?? '',
      clave : this.registerForm.value.password?? '',
      permisos: 'admin'
    }

    if (registerData.nombre === '' || registerData.clave === '') {
      this.toast.error('Por Favor Completa Todos Los Campos');
      // Aquí retorna después de mostrar el toast
      return;
    }

    this.authS.register(registerData).subscribe(
      (res) => {
        console.log('Login response:', res);

        if (!res.isExitoso) {
          console.log('Usuario o Contraseña Incorrecto');
          this.toast.error('error 505, error en servidor');
          return;
        }

        this.toast.success('Registro Éxitoso');

        this.router.navigate(['/auth/login']);
      },
      (error) => {
        // Manejar errores aquí
        console.error('register error:', error);
        // Mostrar mensaje de error al usuario, etc.
      }
    );

  }

}
