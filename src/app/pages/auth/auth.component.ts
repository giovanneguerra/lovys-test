import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy{
  isSignup = false;
  isLoading = false;
  authForm: FormGroup;
  private loadingSubscription: Subscription;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.authForm = this.authService.initForm();
  }

  ngOnInit() {
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
