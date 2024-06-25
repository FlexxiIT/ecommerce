import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-verification',
  standalone: true,
  imports: [],
  templateUrl: './payment-verification.component.html',
  styleUrl: './payment-verification.component.css'
})
export class PaymentVerificationComponent implements OnInit{
  message: string='';

  constructor(private route:ActivatedRoute,private router:Router){ }

  ngOnInit(): void {
    // Escuchar los cambios en la URL
    this.route.url.subscribe(url => {
      // Obtiene el último segmento de la URL
      const path = url[url.length - 1].path;

      // Asigna el mensaje basado en el segmento de la URL
      switch (path) {
        case 'success':
          this.message = '¡Pago realizado con éxito!';
          break;
        case 'failure':
          this.message = 'El pago fue rechazado. Por favor, intenta nuevamente.';
          break;
        case 'pending':
          this.message = 'El pago está pendiente. Espera unos momentos y verifica.';
          break;
        default:
          this.message = 'Estado del pago desconocido.';
          break;
      }
    });
  }

  goHome(){
    this.router.navigate(['/']);
  }
}
