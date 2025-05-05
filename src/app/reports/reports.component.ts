import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Ensure you have AuthService to get the token

@Component({
  standalone: false,
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  showForm = false;
  isLoggedIn: boolean = false;
  newReport = {
    reportType: '',
    startDate: '',
    endDate: '',
    data: ''
  };

  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token; // Check if token is present
    console.log(this.isLoggedIn);
  }

  navigateToReport(reportType: string) {
    this.router.navigate([`/report-details/${reportType}`]);
  }

  showCreateForm() {
    this.showForm = true;
  }

  async createReport() {
    try {
      const token = this.authService.getToken(); // Get the token from AuthService
      const response = await axios.post('http://localhost:1818/reports/admin/create', this.newReport, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Report created:', response.data);
      this.showForm = false;
      this.router.navigate(['/report-details', this.newReport.reportType]);
    } catch (error) {
      console.error('Error creating report:', error);
    }
  }
}
