// auth.service.ts (New Service - Optional but Recommended)
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token'; // Key for local storage

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if a token exists
  }
}

// login.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:4000/users';

  constructor(private authService: AuthService) {} // Inject AuthService

  async loginUser(userData: any): Promise<any> {
    try {
      const encryptedPassword = CryptoJS.SHA256(userData.contrasena).toString();
      const url = `${this.apiUrl}?usuario=${userData.usuario}`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        const storedPassword = response.data[0].contrasena;

        if (storedPassword === encryptedPassword) {
          // Successful login - Assuming backend returns a token
          const token = response.data.token; // Adjust property name if needed
          this.authService.setToken(token); // Store the token
          return response.data[0];
        } else {
          return false; // Passwords don't match
        }
      } else {
        return false; // User not found
      }
    } catch (error) {
      console.log('Error: ', error);
      return false;
    }
  }
}

// login.component.ts
import { Component } from '@angular/core';
// ... other imports
import { AuthService } from '../../../services/auth.service'; // Import AuthService

@Component({
  // ...
})
export class LoginComponent {
  // ...

  constructor(private loginService: LoginService,
              private router: Router,
              private authService: AuthService) { // Inject AuthService
    // ...
  }

  clickLogin(): void {
    // ... (your existing login logic)

    this.loginService.loginUser(this.userForm.value)
      .then((response) => {
        // ... (your existing success handling)
      })
      // ... (your existing error handling)
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']); // Redirect to login after logout
  }
}
