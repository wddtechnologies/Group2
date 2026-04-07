// src/app/app.routes.ts

// Import Routes type to define application routes
import { Routes } from '@angular/router';

// Import components used in routing (Cemar)
import { AddItem } from './Components/add-item/add-item'; 
import { ItemList } from './Components/item-list/item-list';

// Import components used in routing (Teammate's)
import { AdminLoginComponent } from './pages/admin-login/admin-login';

// Import auth guard to protect admin routes
import { authGuard } from './core/guards/auth.guard';


/**
 * Application routes configuration
 * This array defines ALL navigation paths in the App (User + Admin)
 */
export const routes: Routes = [

  // --- USER ROUTES ---
  { 
    path: 'add-item', 
    component: AddItem 
  },
  { 
    path: 'items', 
    component: ItemList 
  },

  // --- ADMIN ROUTES ---
  // Route for admin login page
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },

  // Protected route for admin dashboard
  {
    path: 'admin-dashboard',
    canActivate: [authGuard] 
  },

  // --- NAVIGATION DEFAULTS ---
  // Default route - redirects to the item list
  { 
    path: '', 
    redirectTo: 'items', 
    pathMatch: 'full' 
  }
];