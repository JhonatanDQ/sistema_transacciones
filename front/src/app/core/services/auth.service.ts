import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:4000/auth'; // Ajusta la URL base si es necesario

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(credentials: { documento: string, contrasena: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        map((response: any) => {
          // Guarda el token en el localStorage si la respuesta lo incluye
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); // Verifica si el token existe en el localStorage
  }

  // Manejo de errores
  private handleError(error: any) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
