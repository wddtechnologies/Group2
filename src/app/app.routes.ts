// src/app/app.routes.ts

// Import Routes type to define application routes
import { Routes, RouterOutlet } from '@angular/router';

// Import components used in routing
import { AdminLoginComponent } from './pages/admin-login/admin-login';

// Import auth guard to protect admin routes
import { authGuard } from './core/guards/auth.guard';

/**
 * Application routes configuration
 * This array defines all nevigation paths in the App 
 */
export const routes: Routes = [

 // default route
 { 
  path: '', redirectTo: '/admin-login', pathMatch: 'full'
 },

 // Route for admin login page
 {
  path: 'admin-login',
  component: AdminLoginComponent
 },

];