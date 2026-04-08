// src/app/core/pages/admin-login/admin-login.ts

// Import Component decorator to define Angular component
import { Component } from '@angular/core';

// import CommonModule for common directives like ngIf, ngFor
import { CommonModule } from '@angular/common';

// import FromsModule to use template-driven forms
import { FormsModule } from '@angular/forms';

// Import Router to navigate between pages
import { Router } from '@angular/router';

// Import custom AuthService for login functionality
import { AuthService } from '../../core/services/auth.service';

/**
 * Admin Login Component
 * This component handles the admin login form and authentication logic
 */
@Component({
 // HTML tag used to render this component
  selector: 'app-admin-login',

  // Standalone component ( does not require declaration in NgModule)
  standalone: true,

  // Require modules for this component
  imports: [CommonModule, FormsModule],

  // Path to HTML template for this component
  templateUrl: './admin-login.html',

  // Path to CSS file 
  styleUrl: './admin-login.css'
})
export class AdminLoginComponent {

 // Store username input from User
 username: string = '';

 // Store password input from user
 password: string = '';

 // Store error message to invalid login
 errorMessage: string = '';

 /** 
  * Constructor
  * Inject required services ( AuthService + Router)
  */
 constructor(
  private authService: AuthService, // Handle authentication logic
   private router: Router // Handle navigation between pages
  ) {}

  /**
   * onLogin method
   * Called when user clicks login button
   */
  onLogin(): void {

   // Clear old error message before starting a new login attempt
    this.errorMessage = '';

    // Call login method from AuthService
    // Since API call is asynchronous, we must use subscribe()
    this.authService.login(this.username, this.password).subscribe({

      // next runs when backend returns successful HTTP response
      next: (response: any) => {

        // This assumes backend sends:
        // { success: true }
        // If backend response shape is different, update this condition
        if (response.success) {

          // Redirect to admin dashboard after successful login
          this.router.navigate(['/admin-dashboard']);
        } else {

          // Show error if backend says login failed
          this.errorMessage = 'Invalid username or password.';
        }
      },

      // error runs if HTTP request fails
      error: (error) => {

        // Log actual error in browser console for debugging
        console.error('Login API error:', error);
        // Show user-friendly error message
        this.errorMessage = 'An error occurred during login. Please try again later.';
      }
    });
  }
} 
