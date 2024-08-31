import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `http://localhost:4000/auth/login`;

  constructor(private http: HttpClient) {}

  loginUser(credentials: { usuario: string; contrasena: string }) {
    return this.http.post<{ token: string }>(this.apiUrl, credentials, {
      withCredentials: true, // Permite enviar y recibir cookies
    }).pipe(
      catchError(this.handleError)
    );
  }

  async logoutUser(): Promise<any> {
    try {
      const response = await axios.post(
        'http://localhost:4000/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error de logout.service: ', error);
      throw error;
    }
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
