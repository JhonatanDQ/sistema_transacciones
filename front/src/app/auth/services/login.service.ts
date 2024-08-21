import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'http://localhost:4000/users'; 

  async loginUser(userData: any): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, userData);
      return response.data;
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
