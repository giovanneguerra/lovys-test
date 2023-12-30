import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { IsLoginOrSignUpPipe } from 'src/app/shared/pipes/is-login-or-sign-up.pipe';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'moma-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    IsLoginOrSignUpPipe,
  ],
})
export class AuthComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  isSignup = this.route.snapshot.routeConfig.path === 'sign-up';
  isLoading = this.authService.loading;
  authForm: FormGroup = this.authService.initForm();
  onSubmit = () => {
    if (this.authForm.valid) {
      this.authService.onSubmit(this.isSignup, this.authForm);
    }
  };
}
