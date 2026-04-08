// src/app/core/gaurds/auth.guard.ts

// Import inject function to manually inject services 
import { inject } from '@angular/core';

// Import CanActivateFn type for route guard
import { CanActivateFn, Router } from '@angular/router';

// Import your custom AuthService
import { AuthService } from '../services/auth.service';

/** 
 * Auth guard 
 * This guard protect routes from unauthorized access 
 * It checks if the user is logged in before allowing navigation
 */
export const authGuard: CanActivateFn = () => {

 // Inject AuthService to access authentication status
  const authService = inject(AuthService);

  // Imject Router to redirect user if not authorized
  const router = inject(Router);

  // Check if user is logged in
  if (authService.isLoggedIn()) {
   // if logged in allow access to the route
    return true;
  }

  // if not logged in, redirect to login page
  router.navigate(['/admin-login']);

  // Block access to the route
  return false;
};
