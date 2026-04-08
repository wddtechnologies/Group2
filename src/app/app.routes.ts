import { Routes } from '@angular/router';

// Import components used in routing
import { AddItemComponent } from './Components/add-item/add-item'; 
import { ItemList } from './Components/item-list/item-list';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { authGuard } from './core/guards/auth.guard';

/**
 * Application routes configuration
 */
export const routes: Routes = [
  // --- USER ROUTES ---
  { 
    path: 'add-item', 
    component: AddItemComponent, 
  },
  { 
    path: 'items', 
    component: ItemList 
  },

  // --- ADMIN ROUTES ---
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'admin-dashboard',
    redirectTo: 'admin-login',
    pathMatch: 'full'
  },

  // --- NAVIGATION DEFAULTS ---
  { 
    path: '', 
    redirectTo: 'items', 
    pathMatch: 'full' 
  }
];