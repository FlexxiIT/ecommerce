import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: [] = [];

  constructor(private pService:ClienteService){ }

  ngOnInit(): void {
    this.pService.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }
}
