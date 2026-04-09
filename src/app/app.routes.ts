// src/app/app.routes.ts

// Import Routes type to define application routes
import { Routes } from '@angular/router';

// Import components used in routing
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { PublicGridComponent } from './pages/public-grid/public-grid';
import { AddItemComponent } from './pages/add-item/add-item';

// Import auth guard to protect admin routes
import { authGuard } from './core/guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

/**
 * Application routes configuration
 * This array defines all nevigation paths in the App 
 */
export const routes: Routes = [

 // default route
 { 
  path: '',
  component: PublicGridComponent
 },

 // Route for admin login page
 {
  path: 'admin-login',
  component: AdminLoginComponent
 },

 // Protected route for admin dashboard
 {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [authGuard]
 },

 {
  path: 'add-item',
  component: AddItemComponent
 },

 {
  path: '**',
  redirectTo: ''
 },

];
