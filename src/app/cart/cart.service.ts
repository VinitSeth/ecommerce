import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/individualProducts/product1/product.component'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>(
    this.getCartItemsFromLocalStorage()
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Initialize cartItemsSubject with items from local storage
    this.cartItemsSubject.next(this.getCartItemsFromLocalStorage());
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    console.log(product);
    const updatedItems = [
      ...currentItems,
      { ...product, images: [product.images[0]] },
    ];
    this.cartItemsSubject.next(updatedItems);
    this.saveCartItemsToLocalStorage(updatedItems);
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartItemsToLocalStorage(updatedItems);
  }

  private getCartItemsFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  private saveCartItemsToLocalStorage(items: Product[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
}
