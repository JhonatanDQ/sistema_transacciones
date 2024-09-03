import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';  // Asegúrate de que el nombre del token coincida con el utilizado en tu aplicación
  userName: string = '';

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;  // Devuelve true si el token existe
  }


}
