import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
