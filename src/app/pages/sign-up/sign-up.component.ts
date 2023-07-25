import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signUp(this.email, this.password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Signup error:', error);
      });
  }
}
