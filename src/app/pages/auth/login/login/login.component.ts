import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ILogin } from '../../../../core/models/types';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authS = inject(AuthService);
  constructor(private router: Router, public toast: ToastrService) {}
  
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  handlelogin() {
    console.log('login form:', this.loginForm.value)

    const loginData : ILogin={
      nombre : this.loginForm.value.username?? '',
      clave : this.loginForm.value.password?? '',
    }

    if (loginData.nombre === '' || loginData.clave === '') {
      this.toast.error('Por Favor Completa Todos Los Campos');
      // Aquí retorna después de mostrar el toast
      return;
    }

    this.authS.login(loginData).subscribe(
      (res) => {
        console.log('Login response:', res);

        if (!res.isExitoso) {
          console.log('Usuario o Contraseña Incorrecto');
          this.toast.error('Usuario o Contraseña Incorrecto');
          return;
        }

        this.toast.success('Inicio de Sesión Exitoso BIENVENIDO');

        this.router.navigate(['/admin/bookpages']);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Login error:', error);
        // Mostrar mensaje de error al usuario, etc.
      }
    );

  } 
}
