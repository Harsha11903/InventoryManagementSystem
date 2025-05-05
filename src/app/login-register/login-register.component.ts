import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  standalone:false,
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isLogin: boolean = true; // Toggle between Login and Register forms

  // Login form fields
  login: { loginUsername: string; loginPassword: string } = {
    loginUsername: '',
    loginPassword: ''
  };

  // Register form fields


  toggleForm(isLogin: boolean) {
    this.isLogin = isLogin;
  }
  constructor(private router: Router,private authService:AuthService) {}
  async onLogin() {
    try {
      console.log(this.login.loginUsername+" "+this.login.loginPassword);
      const response = await axios.post('http://localhost:1818/login/', {
        username: this.login.loginUsername,
        password: this.login.loginPassword
      });

      // Store the token in localStorage
      const token = response.data;
    
      this.authService.setToken(token);
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      console.log('Decoded Token Payload:', payload);
      console.log(payload.sub);
      // Check if the email contains "@admin.com"
      if (this.authService.getIsAdmin()) {
        this.router.navigate(['/admin']); // Navigate to Admin Dashboard
      } else {
        this.router.navigate(['/user']); // Navigate to User Dashboard
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  }

  
} 
