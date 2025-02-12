import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productIdSource = new BehaviorSubject<string | null>(null);
  productId$ = this.productIdSource.asObservable();

  setProductId(id: string) {
    this.productIdSource.next(id);
  }
}
