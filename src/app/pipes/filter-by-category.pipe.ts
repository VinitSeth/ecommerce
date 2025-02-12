import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../products/individualProducts/product1/product.component';

@Pipe({
  name: 'filterByCategory',
  standalone: true,
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(products: Product[], categoryId: string): Product[] {
    return products.filter((product) => product.categoryId === categoryId);
  }
}
