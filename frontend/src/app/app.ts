import { afterNextRender, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/auth.service';
import { ContentService } from './core/content.service';
import { LanguageService } from './core/language.service';
import { TPipe } from './core/t.pipe';
import { ContactIcon } from './shared/contact-icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TPipe, ContactIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly content = inject(ContentService);
  private readonly auth = inject(AuthService);
  private readonly language = inject(LanguageService);
  private frame = 0;

  readonly clinic = this.content.clinic;
  readonly year = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly progress = signal(0);
  readonly scrolled = signal(false);
  readonly url = signal(
    typeof location !== 'undefined' ? location.pathname + location.search : this.router.url,
  );
  readonly isAdminArea = computed(() => this.url().startsWith('/admin'));

  constructor() {
    this.content.loadPublicContent();
    this.auth.restoreSession();

    const navSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.url.set(event.urlAfterRedirects);
        this.closeMenu();
      });
    this.destroyRef.onDestroy(() => navSub.unsubscribe());

    afterNextRender(() => {
      const onScroll = () => {
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          const value = max > 0 ? window.scrollY / max : 0;
          this.progress.set(Math.min(Math.max(value, 0), 1));
          this.scrolled.set(window.scrollY > 18);
        });
      };

      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(this.frame);
      });

      const sub = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => onScroll());
      this.destroyRef.onDestroy(() => sub.unsubscribe());
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleLanguage(): void {
    this.language.toggle();
  }
}
