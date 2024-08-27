// import { customPasswordValidator } from './custom-validators';

import { AbstractControl, FormGroupDirective,NgForm, PatternValidator, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export const crossmPasswordMatchingValidator: ValidatorFn = (
  FormGroupControl: AbstractControl<{contrasena: string; confirmarContrasena: string
}>
): ValidationErrors | null => {
  const contrasena = FormGroupControl.value.contrasena;
  const confirmarContrasena = FormGroupControl.value.confirmarContrasena

  return contrasena !== confirmarContrasena ? {crossmPasswordError: true} : null;
}

const patternPassword = new RegExp('')

export const customPasswordValidator = (control:AbstractControl) => {
  const value = control.value;

  if(!patternPassword.test(value)) {
   return { customPasswordValidator: true}
  }
  return null;
}

export class PasswordStateMatcher implements ErrorStateMatcher{
  isErrorState(control: AbstractControl, form: FormGroupDirective | NgForm): boolean {if(!control || !control.parent) {
    return false;
  }
  return control.parent.hasError('crossConfirmPassword');
  }
}
