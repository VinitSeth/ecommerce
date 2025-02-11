import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../login/authService';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    CartComponent,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchQuery: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  bgLogin: string = 'skyblue';
  bgLogout: string = 'red';
  isCartOpen = false;

  get checkAuth() {
    return localStorage.getItem('Bearer Token') ? true : false;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  logout(): void {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery },
      });
    }
  }
}
