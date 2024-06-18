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
  total: number = 0;

  constructor(private cService: CartService){ }

  ngOnInit(): void {
    this.cService.getCart().subscribe(response => {
      this.products = response.items;
      this.calculateTotal();
      console.log(response);
    },
    error => {
      console.error('Error fetching products', error);
    })
  }

  discountProduct(price:number, discount: number):number{
    const discountDecimal = discount / 100;
    return parseFloat((price - (price * discountDecimal)).toFixed(2));
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

  modifyQuantity(productId:string, quantityProduct:number, option:string){

    if(option == '+'){
      quantityProduct = quantityProduct + 1;
    } else{
      quantityProduct = quantityProduct - 1; 
    }

    const itemDetails: any = {
      operation:"UPDATE",
      productId: productId,
      quantity: quantityProduct
    }

    this.cService.updateQuantity(itemDetails).subscribe(
      response => {
        console.log(response)
        window.location.reload();
      },
      function (error) {
        console.error('Error fetching products', error);
      }
    );
  }

  calculateTotal(){
    
    for(const item of this.products){
      let finalPrice = item.product.price
      if(item.product.discount !== 0){
        
        finalPrice = this.discountProduct(item.product.price, item.product.discount);
      }

      this.total += finalPrice * item.quantity;
    }
  }
}
