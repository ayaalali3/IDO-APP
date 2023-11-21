import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private router: Router, private authService: AuthService) {}

  email: string = '';
  password: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  errorMessage: string = '';

  signin() {
    this.authService.login(this.email,this.password).subscribe({
      next: (response: any) => {
        const token = response.token;
        const userEmail = response.user.email; 
        const userId = response.user.Id;
        localStorage.setItem('token', token);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userId',userId);

        this.router.navigate(['/todo']);
      },
      error: (error) => {
        console.error('Login error:', error); 

        if (error.errorType === 'email') {
          this.emailErrorMessage = 'Invalid Email';
          this.passwordErrorMessage = ''; 
        } else if (error.errorType === 'password') {
          this.passwordErrorMessage = 'Incorrect Password';
          this.emailErrorMessage = ''; 
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      }
    });
  }
}
