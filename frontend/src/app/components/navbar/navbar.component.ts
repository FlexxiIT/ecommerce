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
  menuValue: boolean = false;
  menuIcon : string = 'fa-solid fa-bars'

  constructor(private catService: ClienteService){ }

  ngOnInit(): void {
    this.catService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }

  openMenu(){
    this.menuValue = !this.menuValue
    this.menuIcon = this.menuValue ? 'fa-solid fa-x' : 'fa-solid fa-bars'
  }

  toggleDropdown(category: any) {
    // Alternar el estado del submenú
    category.isExpanded = !category.isExpanded;
}
 
}
