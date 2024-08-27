import { Injectable } from '@angular/core';
import axios from 'axios';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:4000/users';

  async loginUser(userData: any): Promise<any> {
    try {
      // Encrypt the entered password using SHA256 (same as in registration)
      const encryptedPassword = CryptoJS.SHA256(userData.contrasena).toString();

      // Construct the API URL with the username for filtering
      const url = `${this.apiUrl}?usuario=${userData.usuario}`;

      const response = await axios.get(url);

      if (response.data.length > 0) {
        // User found, now compare the encrypted passwords
        const storedPassword = response.data[0].contrasena;

        // Compare the entered encrypted password with the stored encrypted password
        if (storedPassword === encryptedPassword) {
          return response.data[0]; // Return the user data if passwords match
        } else {
          return false; // Passwords don't match
        }
      } else {
        return false; // User not found
      }
    } catch (error) {
      console.log('Error: ', error);
      return false; // Handle errors appropriately
    }
  }

//   async registerUser(userData: any): Promise<any> {
//     try {
//       const response = await axios.post(this.apiUrl, userData);
//       return response.data;
//     } catch (error) {
//       console.log('Error: ', error);
//     }
//   }
}
