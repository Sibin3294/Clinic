import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { API_BASE } from './api.config';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

interface LoginResponse {
  token: string;
  admin: AdminUser;
}

const TOKEN_KEY = 'clinic_admin_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly admin = signal<AdminUser | null>(null);
  private readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly currentAdmin = this.admin.asReadonly();
  readonly isLoggedIn = computed(() => !!this.token());

  getToken(): string | null {
    return this.token();
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this.token.set(res.token);
        this.admin.set(res.admin);
      }),
    );
  }

  restoreSession() {
    const existing = this.token();
    if (!existing) {
      return;
    }
    this.http.get<{ admin: AdminUser }>(`${API_BASE}/auth/me`).subscribe({
      next: (res) => this.admin.set(res.admin),
      error: () => this.clearSession(),
    });
  }

  logout(): void {
    this.clearSession();
    void this.router.navigateByUrl('/admin/login');
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
    this.admin.set(null);
  }
}
