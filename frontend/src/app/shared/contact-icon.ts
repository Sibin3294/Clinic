import { Component, input } from '@angular/core';

export type ContactIconName = 'phone' | 'whatsapp' | 'email' | 'map' | 'facebook' | 'instagram';

@Component({
  selector: 'app-contact-icon',
  template: `
    <span
      class="contact-icon"
      [attr.data-icon]="name()"
      [class.is-soft]="tone() === 'soft'"
      [class.is-footer]="tone() === 'footer'"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('phone') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7.6 3.8h2.7c.4 0 .8.3.9.7l.9 3.1c.1.4 0 .8-.3 1.1L10.4 11a12.4 12.4 0 0 0 5.2 5.2l2.3-1.4c.3-.2.7-.3 1.1-.2l3.1.9c.4.1.7.5.7.9v2.7c0 1-.8 1.8-1.8 1.7C9.4 19.2 4.8 14.6 4.1 5.6c-.1-1 .7-1.8 1.7-1.8z"
            />
          </svg>
        }
        @case ('whatsapp') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 3.2A8.7 8.7 0 0 0 5.1 16.7L4 20.2l3.6-1a8.7 8.7 0 1 0 4.4-16z"
            />
            <path
              fill="#fff"
              d="M16.3 14.4c-.2-.1-1.3-.6-1.5-.7s-.3-.1-.5.1-.6.7-.7.8-.3.2-.5.1a7 7 0 0 1-2-1.2 7.6 7.6 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.4.2-.3.1-.3-.1-.5-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3a9.4 9.4 0 0 0 3.6 3.1c.5.2.9.4 1.2.5.5.2 1 .2 1.3.1.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1s-.2-.2-.4-.3z"
            />
          </svg>
        }
        @case ('email') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4.4 5.5h15.2A1.9 1.9 0 0 1 21.5 7.4v9.2a1.9 1.9 0 0 1-1.9 1.9H4.4A1.9 1.9 0 0 1 2.5 16.6V7.4A1.9 1.9 0 0 1 4.4 5.5z"
            />
            <path fill="#fff" d="m4.1 7.1 7.9 5.7 7.9-5.7v1.5l-7.9 5.7L4.1 8.6z" />
          </svg>
        }
        @case ('map') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 21.2S5.4 16.2 5.4 10.6a6.6 6.6 0 1 1 13.2 0c0 5.6-6.6 10.6-6.6 10.6z"
            />
            <circle cx="12" cy="10.6" r="2.5" fill="#fff" />
          </svg>
        }
        @case ('facebook') {
          <svg viewBox="0 0 24 24">
            <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.2" fill="currentColor" />
            <path
              fill="#fff"
              d="M13.4 19v-5.4h1.8l.3-2.2h-2.1V10c0-.6.2-1.1 1.1-1.1h1.1V7h-1.9c-2 0-3.3 1.2-3.3 3.3v1.1H8.7v2.2h1.7V19z"
            />
          </svg>
        }
        @case ('instagram') {
          <svg viewBox="0 0 24 24">
            <defs>
              <radialGradient id="ig" cx="30%" cy="107%" r="150%">
                <stop offset="0%" stop-color="#fdf497" />
                <stop offset="5%" stop-color="#fdf497" />
                <stop offset="45%" stop-color="#fd5949" />
                <stop offset="60%" stop-color="#d6249f" />
                <stop offset="90%" stop-color="#285AEB" />
              </radialGradient>
            </defs>
            <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="url(#ig)" />
            <rect x="7.1" y="7.1" width="9.8" height="9.8" rx="3.1" fill="none" stroke="#fff" stroke-width="1.7" />
            <circle cx="12" cy="12" r="2.55" fill="none" stroke="#fff" stroke-width="1.7" />
            <circle cx="15.85" cy="8.2" r="1" fill="#fff" />
          </svg>
        }
      }
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    .contact-icon {
      display: grid;
      place-items: center;
      width: 2.35rem;
      height: 2.35rem;
      border-radius: 12px;
      background: color-mix(in srgb, var(--icon-color) 14%, white);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--icon-color) 22%, transparent);
      color: var(--icon-color);
    }

    .contact-icon.is-soft {
      width: 2.05rem;
      height: 2.05rem;
      border-radius: 10px;
    }

    .contact-icon.is-footer {
      background: color-mix(in srgb, var(--icon-color) 22%, rgba(12, 41, 36, 0.35));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--icon-color) 35%, transparent);
    }

    .contact-icon[data-icon='phone'] {
      --icon-color: #1f8a70;
    }

    .contact-icon[data-icon='whatsapp'] {
      --icon-color: #25d366;
    }

    .contact-icon[data-icon='email'] {
      --icon-color: #4285f4;
    }

    .contact-icon[data-icon='map'] {
      --icon-color: #ea4335;
    }

    .contact-icon[data-icon='facebook'] {
      --icon-color: #1877f2;
    }

    .contact-icon[data-icon='instagram'] {
      --icon-color: #e1306c;
      background: linear-gradient(135deg, #fdf49722, #fd594922 40%, #d6249f22, #285aeb22);
    }

    .contact-icon[data-icon='instagram'].is-footer {
      background: linear-gradient(135deg, #fdf49733, #fd594933 40%, #d6249f33, #285aeb33);
    }

    .contact-icon svg {
      width: 1.2rem;
      height: 1.2rem;
      display: block;
    }

    .contact-icon.is-soft svg {
      width: 1.05rem;
      height: 1.05rem;
    }
  `,
})
export class ContactIcon {
  readonly name = input.required<ContactIconName>();
  readonly tone = input<'default' | 'soft' | 'footer'>('default');
}
