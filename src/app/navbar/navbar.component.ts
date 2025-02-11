import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ProductsComponent } from '../products/products.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../login/authService';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    CartComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
   bgLogin:string='skyblue'
   bgLogout:string='red'
   isCartOpen = false

  get checkAuth() {
    return localStorage.getItem('Bearer Token') ? true : false;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  logout(): void {
    localStorage.clear()
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
