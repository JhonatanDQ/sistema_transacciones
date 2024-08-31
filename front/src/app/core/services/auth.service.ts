import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';  // Asegúrate de que el nombre del token coincida con el utilizado en tu aplicación

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;  // Devuelve true si el token existe
  }
}
