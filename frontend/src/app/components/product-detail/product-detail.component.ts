import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,ProductSliderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductDetailComponent implements OnInit, AfterViewInit{
  @ViewChild('mainImageContainer',{static: false}) containerRef!: ElementRef;

  selectedProduct : any;
  mainImage: string = '';

  constructor(private pService: ClienteService){}

  ngOnInit(): void {
    const productString = localStorage.getItem('selectedProduct');
    if (productString) {
      this.selectedProduct = JSON.parse(productString);
      console.log(this.selectedProduct)
      if (this.selectedProduct && this.selectedProduct.image && this.selectedProduct.image.length > 0) {
        this.mainImage = this.selectedProduct.image[0].urlImage;
      }
    }
    this.mainImage = this.selectedProduct.image[0].urlImage
  }
  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement as HTMLDivElement;
    const img = container.querySelector('img') as HTMLImageElement;

    container.addEventListener('mousemove', (e: MouseEvent) => {
      const x = e.clientX - container.offsetLeft;
      const y = e.clientY - container.offsetTop;

      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = 'scale(2)';
    });

    container.addEventListener('mouseleave', () => {
      img.style.transformOrigin = 'center';
      img.style.transform = 'scale(1)';
    });
  }

  changeMainImage(urlImage:string):void{
    this.mainImage = urlImage;
  }
  discountProduct(price:number, discount: number):number{
    const discountDecimal = discount / 100;
    return parseFloat((price - (price * discountDecimal)).toFixed(2));
  }

}
