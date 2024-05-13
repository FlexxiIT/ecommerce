import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{

  options = [
    { value: 'minor-major', label: 'Precio: Menor a Mayor' },
    { value: 'major-minor', label: 'Precio: Mayor a Menor' },
    { value: 'a-z', label: 'A-Z' },
    { value: 'z-a', label: 'Z-A' },
];

  categories: any [] = [];
  products: any [] = [];
  isFilterDropdownOpen = false;

  constructor(private pService: ClienteService){ }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.pService.getProducts().subscribe((data) =>{
      this.products = data;
    })
  }
  getCategories(){
    this.pService.getCategories().subscribe((data) =>{
      this.categories = data;
    })
  }

  toggleFilterModal() {
      this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }
}
