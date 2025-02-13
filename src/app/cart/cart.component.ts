import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../products/individualProducts/product1/product.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<Product[]>;
  isCartOpen: boolean = true;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
  }

  ngOnInit(): void {}

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  getSubtotal(items: Product[] | null): number {
    if (!items) return 0;
    return items.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );
  }

  closeCart(): void {
    // Logic to close the cart, e.g., emitting an event or setting a flag
    this.isCartOpen = false;
    console.log('Close Cart');
  }
}
