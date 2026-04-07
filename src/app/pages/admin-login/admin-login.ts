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
 username: '';

 // Store password input from user
 password: '';

 // Store error message to invalid login
 errorMessage: '';

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

   // Call login method from AuthService and store result
   const success = this.authService.login(this.username, this.password);

   // If login successful
    if (success) {

     // Clear any previous error messages
      this.errorMessage = '';

      // Redirect to admin dashboard
      this.router.navigate(['/admin-dashboard']);
    }
    // If login failed, show error message
    else {
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }
}