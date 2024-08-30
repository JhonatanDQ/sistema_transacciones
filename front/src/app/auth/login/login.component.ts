import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Import Router
import swal from 'sweetalert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../app/core/services/login.service';
import RegisterComponent from '../register/register.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
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
          this.router.navigate(['/dashboard']);
        }
          })
          .catch(error => {
            swal('Error', 'Error al iniciar sesión', 'error');
            console.error('Login error:', error);
          });
      }




  }


