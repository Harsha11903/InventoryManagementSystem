import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  // Navigate to the login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
