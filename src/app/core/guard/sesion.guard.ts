import { inject } from "@angular/core";
import { TokenService } from "../services/token.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


export const loginGuard = () => {
   const tokenService = inject(TokenService);
   const router = inject(Router);
   const toast = inject(ToastrService);
   

   
   const token = tokenService.getToken();
   
   if (!token) {
      

   toast.error('No tienes permiso para acceder a esta pagina', 'Por favor inicia sesión');
   router.navigate(['/auth/login']);
   return false
   }
   
  return true; 
   
}