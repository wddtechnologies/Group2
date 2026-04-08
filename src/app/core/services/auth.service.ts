// src/app/core/services/auth.service.ts

// Import Injectable decorator from Angular core
// This allows the service to be injected into components or other services
import { Injectable } from '@angular/core';

// Import HttpClient to make API requests to backend
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Mark this class as a service and make it available globally (root level)
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Hardcoded admin username ( for demo/testing purpose)
  private readonly storageKey = 'isAdmin';

// Api URL for admin login
  private readonly loginUrl = 'http://localhost/Group2/api/auth/login.php';

/**
 * Constructor
 * Inject HttpClient to make API calls
 */
  constructor(private http: HttpClient) {}

/**
 * Login method
 * This method sends login request to backend and stores login status in local storage
 * @param username - Admin username input
 * @param password - Admin password input
 * @returns Observable of the HTTP response ( can be subscribed to handle success/error)
 */
  login(username: string, password: string): Observable<any> {
    // Create request body object to send to backend
    const payload = { 
     username: username, 
     password: password
    };

    // Send POST request to login API endpoint with the payload
    return this.http.post<any>(this.loginUrl, payload).pipe(
      tap((response) => {

        // Check if backend returned success
        // This assumes your API returns: { success: true }
        // If backend response is different, this condition should be updated
        if (response.success) {

          // Save login status in localStorage
          localStorage.setItem(this.storageKey, 'true');
        }
      })
    );
  }

  /**
   * logout method
   * Clears the login status from localStorage
   */
  logout(): void {

    // Remove login flag from localStorage
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Check if user is logged in
   * @returns boolean - true if logged in, false otherwise
   */
  isLoggedIn(): boolean {

   // Read value from localStorage and return true if it is 'true'
    return localStorage.getItem(this.storageKey) === 'true';
  }
}