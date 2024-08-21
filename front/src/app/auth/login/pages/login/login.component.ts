import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router'; // Import Router
import swal from 'sweetalert';
import { LoginService } from '../../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,MatFormFieldModule,
    MatInputModule,],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.userForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  clickLogin(): void {
    if (!this.userForm.valid) {
      swal('Error', 'Usuario no registrado', 'error');
      return;
    }

    this.loginService.loginUser(this.userForm.value)
      .then((response) => {
        if (!response) {
          swal('Error', 'Error al iniciar sesión', 'error');
        } else {
          swal('Exito', 'Inicio de sesión exitoso', 'success');
          //redirecciona al home
          this.router.navigate(['/transacciones']);
        }
      })
      .catch(error => {
        swal('Error', 'Error al iniciar sesión', 'error');
        console.error('Login error:', error);
      });
  }
}
