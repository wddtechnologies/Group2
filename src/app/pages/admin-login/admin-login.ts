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
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin(): Promise<void> {
    const success = await this.authService.login(this.username, this.password);

    if (success) {
      this.errorMessage = '';
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password. Please try again.';
    }
  }
}