import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: false,
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminNavbarComponent {
  showPopup = false;

  constructor(private authService: AuthService, private router: Router) {}

  showLogoutPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/logout']); // Redirect to the login page after logout
    this.closePopup();
  }
}
