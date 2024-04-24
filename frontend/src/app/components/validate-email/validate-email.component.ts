import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-validate-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validate-email.component.html',
  styleUrl: './validate-email.component.css'
})
export class ValidateEmailComponent implements OnInit {

  token: string='';
  message: string='Validando mail...';

  constructor(private route:ActivatedRoute, private cService: ClienteService, private router:Router){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
    this.token = params['token'];
    console.log('Token:', this.token);

      this.cService.validateEmail(this.token).subscribe({
        next: (data) => {
          this.message = 'Email validado con éxito';
          console.log(this.message);
        },
        error: (error) => {
          this.message = 'Error al validar el email';
          console.error('Error:', error);
          console.log(this.message);
        }
      });
    });
  }

  goHome(){
    this.router.navigate(['/']);
  }
  
}
