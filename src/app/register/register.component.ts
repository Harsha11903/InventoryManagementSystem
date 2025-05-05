import { Component } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: { firstName: string; lastName: string; email: string; password: string } = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  passwordError: string = '';

  constructor(private router: Router) {}

  validatePassword() {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(this.register.password);
    this.passwordError = hasSpecialCharacter ? '' : 'Password must contain at least one special character.';
  }

  async onRegister() {
    this.validatePassword();
    if (this.passwordError) {
      alert(this.passwordError);
      return;
    }

    try {
      console.log(this.register.firstName + " " + this.register.lastName + " " + this.register.email + " " + this.register.password);
      if (!this.register.email.includes('@admin.com')) {
        const response = await axios.post('http://localhost:1818/register/', {
          username: this.register.email,
          password: this.register.password
        });

        console.log('Registration successful:', response.data);
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      } else {
        alert('Forbidden Email Domain');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  }
}
