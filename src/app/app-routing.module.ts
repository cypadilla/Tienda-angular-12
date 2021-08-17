import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { AutenticadoGuard } from './guards/autenticado.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { VendedorGuard } from './guards/vendedor.guard';
import { BuyComponent } from './buy/buy.component';
import { CompradorGuard } from './guards/comprador.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'registro', pathMatch:'full'
  }
  ,
  {
    path:'login', component:LoginComponent,pathMatch:'full'
  }
  ,
  {
    path:'registro',component:RegistroComponent, pathMatch:'full'
  },
  {
    path:'home',component:HomeComponent, pathMatch:'full', canActivate:[AutenticadoGuard]
  }
  ,
  {
    path:'users',component:UserComponent, pathMatch:'full',canActivate:[AutenticadoGuard]
  },
  {
    path:'products',component:ProductsComponent,pathMatch:'full',canActivate:[AutenticadoGuard]
  },
  {
    path:'product/:id',component:ProductComponent,pathMatch:'full',canActivate:[AutenticadoGuard]
  },
  {
    path:'product/edit/:id',component:EditFormComponent,pathMatch:'full',canActivate:[AutenticadoGuard]
  },
  {
    path:'products/add',component:AddProductComponent,pathMatch:'full',canActivate:[AutenticadoGuard,VendedorGuard]
  },
  {
    path:'buy/:id',component:BuyComponent,pathMatch:'full',canActivate:[AutenticadoGuard,CompradorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
