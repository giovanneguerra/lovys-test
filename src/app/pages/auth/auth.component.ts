import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'moma-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [MatCardModule, NgIf, MatProgressSpinnerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink]
})
export class AuthComponent implements OnInit, OnDestroy{
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  route = inject(ActivatedRoute);
  isSignup = false;
  isLoading = false;
  authForm: FormGroup;
  private loadingSubscription: Subscription;

  ngOnInit() {
    this.authForm = this.authService.initForm();
    this.loadingSubscription = this.authService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.isSignup = this.route.snapshot.routeConfig.path === 'sign-up';
    this.authForm = this.authService.initForm();
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.authService.onSubmit(this.isSignup, this.authForm);
    }
  }

  toggleForm() {
    this.isSignup = !this.isSignup;
    this.authForm = this.authService.initForm();
  }

}
