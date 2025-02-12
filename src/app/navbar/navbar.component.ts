import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../login/authService';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../products/individualProducts/product1/product.service';

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
  isCartOpen = false;

  productId: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}
  bgLogin: string = 'skyblue';
  bgLogout: string = 'red';

  ngOnInit(): void {
    // ✅ Subscribe to cart updates only when user is logged in
    // if (this.checkAuth) {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItemCount = cartItems.length;
    });
    // }

    this.productService.productId$.subscribe((id) => {
      this.productId = id;
      console.log('Product ID received:', this.productId);
    });
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
      this.router.navigate([`/products/${this.productId}`], {
        queryParams: { search: this.searchQuery },
      });
    }
  }
}
