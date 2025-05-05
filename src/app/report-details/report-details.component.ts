import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent implements OnInit {
  reportType: string = ''; // Initialize as an empty string
  reports: any[] = [];
  filteredReports: any[] = [];
  selectedReport: any = null;
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.route.params.subscribe(params => {
      this.reportType = params['type']; // Get the report type from URL parameters
      this.fetchReports();
    });
  }

  checkLoginStatus() {
    const token = this.authService.getToken();
    this.isLoggedIn = !!token; // Check if token is present
  }

  async fetchReports() {
    try {
      const token = this.authService.getToken(); // Replace with your actual token
      const response = await axios.get(`http://localhost:1818/reports/admin/getReportByReportType/${this.reportType}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.reports = response.data;
      this.filterReports();
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => report.reportType === this.reportType);
  }

  selectReport(report: any) {
    this.selectedReport = report;
    document.querySelectorAll('.report-card').forEach(card => card.classList.add('blur-background'));
  }

  closePopup() {
    this.selectedReport = null;
    document.querySelectorAll('.report-card').forEach(card => card.classList.remove('blur-background'));
  }

  async deleteReport(report: any, event?: Event) {
    if (event) event.stopPropagation();
    try {
      const token = this.authService.getToken(); // Replace with your actual token
      await axios.delete(`http://localhost:1818/reports/admin/deleteById/${report.reportId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.filteredReports = this.filteredReports.filter(r => r.reportId !== report.reportId);
      this.selectedReport = null;
      document.querySelectorAll('.report-card').forEach(card => card.classList.remove('blur-background'));
      alert(`Report Deleted successfully`);
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  }
}
