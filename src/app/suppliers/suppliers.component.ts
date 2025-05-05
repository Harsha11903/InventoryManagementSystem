import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthService } from '../services/auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-suppliers',
  standalone: false,
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent  {
  suppliers: any[] = [];
  errorMessage: String = "";
  showAddSupplierFields = false;
  newSupplier = {
    supplierID: 0,
    name: '',
    contactInfo: '',
    productsSupplied: ''
  };

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const token = this.authService.getToken();
      const response = await axios.get('http://localhost:1818/suppliers/admin/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.suppliers = response.data;
    } catch (error) {
      this.errorMessage = 'Failed to load suppliers. Please try again later.';
      console.error('Error fetching suppliers:', error);
    }
  }

  async addSupplier() {
    if (this.newSupplier.name && this.newSupplier.contactInfo && this.newSupplier.productsSupplied) {
      try {
        const token = this.authService.getToken();
        const response = await axios.post('http://localhost:1818/suppliers/admin/create', this.newSupplier, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.suppliers.push(response.data);
        this.newSupplier = { supplierID: 0, name: '', contactInfo: '', productsSupplied: '' };
        this.showAddSupplierFields = false; // Hide the fields after adding
      } catch (error) {
        this.errorMessage = 'Failed to add supplier. Please try again later.';
        console.error('Error adding supplier:', error);
      }
    }
  }

  async deleteSupplier(id: number) {
    try {
      const token = this.authService.getToken();
      await axios.delete(`http://localhost:1818/suppliers/admin/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.suppliers = this.suppliers.filter(supplier => supplier.supplierID !== id);
    } catch (error) {
      this.errorMessage = 'Failed to delete supplier. Please try again later.';
      console.error('Error deleting supplier:', error);
    }
  }

  async updateSupplier(supplier: any) {
    try {
      const token = this.authService.getToken();
      const response = await axios.put("http://localhost:1818/suppliers/admin/update", supplier, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Supplier updated");
    } catch (error) {
      this.errorMessage = 'Failed to update supplier. Please try again later.';
      console.error('Error updating supplier:', error);
    }
  }
}
