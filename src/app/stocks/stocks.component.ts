import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Ensure you have AuthService to get the token

@Component({
  standalone: false,
  selector: 'app-stock',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StockComponent implements OnInit {
  stocks: any[] = [];
  filteredStocks: any[] = [];
  selectedFilter = '';
  filterValue: any;
  isFiltered = false;
  selectedProduct: any = null;
  isLoggedIn = false;

  constructor(private authService: AuthService) {} // Inject AuthService

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.getAllStocks();
    }
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn(); // Check login status from AuthService
  }

  async getAllStocks() {
    try {
      const token = this.authService.getToken(); // Get the token from AuthService
      const response = await axios.get('http://localhost:1818/stocks/admin/findAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.stocks = response.data;
      this.filteredStocks = response.data;
    } catch (error) {
      console.error('There was an error fetching the stocks!', error);
    }
  }

  onFilterChange() {
    this.filterValue = '';
    this.isFiltered = false;
    this.filteredStocks = this.stocks;
  }

  filterStocks() {
    if (this.selectedFilter && this.filterValue !== '') {
      this.isFiltered = true;
      this.filteredStocks = this.stocks.filter(stock => {
        if (this.selectedFilter === 'id') {
          return stock.productId === this.filterValue;
        } else if (this.selectedFilter === 'reorderLevel') {
          return stock.reorderLevel.includes(this.filterValue);
        } else if (this.selectedFilter === 'quantity') {
          return stock.quantity < this.filterValue;
        }
        return false;
      });
    } else {
      this.isFiltered = false;
      this.filteredStocks = this.stocks;
    }
  }

  async updateStockQuantity(id: number, quantity: number) {
    try {
      const token = this.authService.getToken(); // Get the token from AuthService
      const response = await axios.put(`http://localhost:1818/stocks/admin/updateStockQuantity/${id}/${quantity}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert(response.data);
      this.getAllStocks(); // Refresh the stock list after update
    } catch (error) {
      console.error('There was an error updating the stock quantity!', error);
    }
  }

  async selectStock(productId: number) {
    try {
      const token = this.authService.getToken(); // Get the token from AuthService
      const response = await axios.get(`http://localhost:1818/products/admin/getById/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.selectedProduct = response.data;
    } catch (error) {
      console.error('There was an error fetching product details!', error);
    }
  }

  closePopup() {
    this.selectedProduct = null;
  }
}
