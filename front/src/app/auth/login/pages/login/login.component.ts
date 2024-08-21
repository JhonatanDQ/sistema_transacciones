import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import swal from 'sweetalert';
import { LoginService } from '../../../services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router,
              private authService: AuthService) {
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

          // Use AuthService to handle the token
          this.authService.setToken(response.token); // Assuming your backend sends a 'token' property

          this.router.navigate(['/transacciones']);
        }
      })
      .catch(error => {
        swal('Error', 'Error al iniciar sesión', 'error');
        console.error('Login error:', error);
      });
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
