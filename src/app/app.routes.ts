import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './products/individualProducts/product1/product.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { MyInfoComponent } from './my-info/my-info.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then(
            (mod) => mod.ProductsComponent
          ),
      },
      { path: 'products/:productId', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'my-info', component: MyInfoComponent },
    ],
  },
];
