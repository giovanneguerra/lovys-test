import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';

@Component({
  selector: 'moma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    ExtendedModule,
    MatMenuModule,
    MatIconModule,
    FlexModule,
    NgIf,
    RouterLink,
    AsyncPipe,
    MatIconModule,
    RouterLinkActive,
  ],
})
export class MenuComponent implements OnInit {
  authService = inject(AuthService);
  isLoggedIn = false;
  userEmail: Observable<string>;

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.userEmail = this.authService.getUserEmail();
  }

  logout() {
    this.authService.logout();
  }
}
