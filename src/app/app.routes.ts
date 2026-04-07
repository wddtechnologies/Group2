// src/app/app.routes.ts

// Import Routes type to define application routes
import { Routes } from '@angular/router';

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
  path: '',
  
 },

 // Route for admin login page
 {
  path: 'admin-login',
  component: AdminLoginComponent
 },

 // Protected route for admin dashboard
 {
  path: 'admin-dashboard',
  
  canActivate: [authGuard] // Apply auth guard to protect this route
 }
];