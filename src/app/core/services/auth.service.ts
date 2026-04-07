// src/app/core/services/auth.service.ts

// Import Injectable decorator from Angular core
// This allows the service to be injected into components or other services
import { Injectable } from '@angular/core';

// Mark this class as a service and make it available globally (root level)
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hardcoded admin username ( for demo/testing purpose)
  private readonly adminUsername = 'admin';

  // Hardcoded admin password ( for demo/testing purpose)
  private readonly adminPassword = 'admin';

  // Key used to store login status in browser's local storage
  private readonly storageKey = 'isAdminLoggedIn';

  