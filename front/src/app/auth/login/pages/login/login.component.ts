import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      nombre: new FormControl("", [Validators.required]),
      usuario: new FormControl("", [Validators.required]),
      contrasena: new FormControl("", [Validators.required, Validators.minLength(8)]),
      documento: new FormControl("", [Validators.required]),
    })


  }
}


