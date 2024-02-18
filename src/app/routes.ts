import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PostComponent } from "./pages/posts/post.component";
import { PostDetailComponent } from "./pages/post-detail/post-detail.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./core/guards/auth.guard";
import { ProductsComponent } from "./pages/products/products.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";


export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'post',
        component: PostComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'post/:id',
        component: PostDetailComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/search',
        component: ProductsComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent
    },

];
