import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
    import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
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
