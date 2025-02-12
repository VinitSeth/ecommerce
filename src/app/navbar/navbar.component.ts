import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../login/authService';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';

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
  cartItemCount: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
  bgLogin: string = 'skyblue';
  bgLogout: string = 'red';
  isCartOpen = false;

  ngOnInit(): void {
    // ✅ Subscribe to cart updates only when user is logged in
    // if (this.checkAuth) {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
    });
    // }
  }

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
    // this.cartItemCount = 0; // ✅ Reset cart count on logout(happens without even doing it)
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery },
      });
    }
  }
}
