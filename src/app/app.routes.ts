import { Routes } from '@angular/router';
import { AddItem } from './Components/add-item/add-item'; 
import { ItemList } from './Components/item-list/item-list';

export const routes: Routes = [
  { 
    path: 'add-item', 
    component: AddItem
  },
  { 
    path: 'items', 
    component: ItemList
  },
  { 
    path: '', 
    redirectTo: 'items', 
    pathMatch: 'full' 
  }
];