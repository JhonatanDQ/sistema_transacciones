// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, catchError, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'http://localhost:4000/user';

//   constructor(private http: HttpClient) { }

//   // Función para obtener la información del usuario
//   getUserInfo(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/info`).pipe(
//       catchError(this.handleError)  // Manejo de errores
//     );
//   }

//   // Manejo de errores para el servicio HTTP
//   private handleError(error: any) {
//     console.error('An error occurred', error);
//     return throwError(() => new Error(error.message || 'Server error'));
//   }
// }
