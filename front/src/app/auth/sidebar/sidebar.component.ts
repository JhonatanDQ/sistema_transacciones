import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,

  ],
  templateUrl: './sidebar.component.html',
  // styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router, private loginService: LoginService ) {
  }

  LogOut() {
    try {
      this.loginService.logoutUser();
      localStorage.removeItem('token');

      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }

  }

}
