import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  categories: any[]=[];

  constructor(private catService: ClienteService){ }

  ngOnInit(): void {
    this.catService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }
 
}
