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

  /** 
   * login method 
   * Checks if entered username and password match the admin credentials
   * @param username - The username entered by the user
   * @param password - user password entered by the user
   * @returns boolean - true if login is successful, false otherwise
   */
  login(username: string, password: string): boolean {

    // Validate credentials by camparing with stored values
    const isValid = username === this.adminUsername && password === this.adminPassword;

    // If credentials are valid,
    if (isValid) {

     // Save login status in localStorage ( persist even after page reloads)
      localStorage.setItem(this.storageKey, 'true');

      // Retun success
      return true;
    }
    // If credentials are incorrect, return false
    return false;
  }

  /**
   * logout method
   * clears the login status from localStorage
   */
  logout(): void {

   // Remove login flag from local storage
   localStorage.removeItem(this.storageKey);
  }

  /**
   * Check if user is logged in 
   * @returns boolean - true if user is logged in, false otherwise
   */
  isLoggedIn(): boolean {

   // Read value from localStorage and compare with 'true'
    return localStorage.getItem(this.storageKey) === 'true';
  }

  /**
   * Alias used by admin dashboard/store actions
   */
  isAdmin(): boolean {
    return this.isLoggedIn();
  }
}
