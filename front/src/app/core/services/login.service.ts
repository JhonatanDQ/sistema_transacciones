import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `http://localhost:4000/auth/login`;

  constructor(private http: HttpClient) {}

  loginUser(credentials: { usuario: string; contrasena: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

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
