import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  products : any [] = [];

  constructor(private cService: CartService){ }

  ngOnInit(): void {
    this.cService.getCart().subscribe(response => {
      this.products = response.items;
      console.log(response);
    },
    error => {
      console.error('Error fetching products', error);
    })
  }

  deleteItemfromCart(productId: string){
    const itemDetails: any = {
      operation: "REMOVE",  // Ejemplo de detalles del ítem
      productId: productId
    };  

    this.cService.deleteItemtoCart(itemDetails).subscribe(
      response => {
        console.log(response)
        console.log('HOLA')
      },
      function (error) {
        console.error('Error fetching products', error);
      }
    );
  }

  modifyQuantity(productId:string){
    const itemDetails: any = {
      operation:"UPDATE",
      productId: productId
    }

    this.cService.updateQuantity(itemDetails).subscribe(
      response => {
        console.log(response)
        console.log('HOLA')
      },
      function (error) {
        console.error('Error fetching products', error);
      }
    );
  }
}
