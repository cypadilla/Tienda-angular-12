import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { EditFormComponent } from './edit-form/edit-form.component';

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
    path:'home',component:HomeComponent, pathMatch:'full'
  }
  ,
  {
    path:'users',component:UserComponent, pathMatch:'full'
  },
  {
    path:'products',component:ProductsComponent,pathMatch:'full'
  },
  {
    path:'product/:id',component:ProductComponent,pathMatch:'full'
  },
  {
    path:'product/edit',component:EditFormComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
