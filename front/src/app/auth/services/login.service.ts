import { Injectable } from '@angular/core';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:4000/users';

  constructor(private authService: AuthService) {}

  async loginUser(userData: any): Promise<any> {
    try {
      const encryptedPassword = CryptoJS.SHA256(userData.contrasena).toString();
      const url = `${this.apiUrl}?usuario=${userData.usuario}`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        const storedPassword = response.data[0].contrasena;

        if (storedPassword === encryptedPassword) {

          const token = response.data.token;
          this.authService.setToken(token);
          return response.data[0];
        } else {
          return false; // Contraseña incorrecta
        }
      } else {
        return false; // Usuario no encontrado
      }
    } catch (error) {
      console.log('Error: ', error);
      return false;
    }
  }
}
