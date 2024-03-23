import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './ui/components/home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "baskets", loadChildren: () => import("./ui/components/basket/basket.module").then(module=> module.BasketModule)},
  {path: "products", loadChildren: () => import("./ui/components/products/products.module").then(module => module.ProductsModule)},
  {path: "productDetay", loadChildren: () => import("./ui/components/product-detay/product-detay.module").then(module => module.ProductDetayModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
