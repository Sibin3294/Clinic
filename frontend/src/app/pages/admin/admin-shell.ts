import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-shell.html',
  styleUrl: './admin.scss',
})
export class AdminShell {
  private readonly auth = inject(AuthService);
  readonly admin = this.auth.currentAdmin;

  logout(): void {
    this.auth.logout();
  }
}
