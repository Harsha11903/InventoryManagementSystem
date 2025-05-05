import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-navbar',
  standalone: false,
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserNavbarComponent {
  

  constructor(private authService: AuthService, private router: Router) {}

  

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/logout']); // Redirect to the login page after logout
  
  }

}

