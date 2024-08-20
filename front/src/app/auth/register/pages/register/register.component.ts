import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

    private readonly _FormBuilder = inject(FormBuilder);

    formGroup = this._FormBuilder.nonNullable.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      documento: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required]
    })

  clickRegister(): void {
// console.log(this.formGroup.get('nombre')?.value)
    const nombre = this.formGroup.controls.nombre.value
    console.log(nombre)

    console.log(this.formGroup.controls.nombre.valid)
  }
}
