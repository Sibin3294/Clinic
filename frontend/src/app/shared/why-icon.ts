import { Component, input } from '@angular/core';

export type WhyIconName =
  | 'doctors'
  | 'hours'
  | 'services'
  | 'calm'
  | 'parking'
  | 'hygiene'
  | 'rates'
  | 'sadaram';

@Component({
  selector: 'app-why-icon',
  template: `
    <span class="why-icon" [attr.data-icon]="name()" aria-hidden="true">
      @switch (name()) {
        @case ('doctors') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8.2 3.8h2.6v3.4H8.2zm5 0h2.6v3.4H13.2z"
            />
            <path
              fill="currentColor"
              d="M6.6 7.2h10.8v2.4a5.4 5.4 0 0 1-10.8 0V7.2z"
              opacity="0.9"
            />
            <path fill="currentColor" d="M11.1 12.6h1.8v5.8h-1.8z" />
            <circle cx="12" cy="20.2" r="1.5" fill="currentColor" />
            <path fill="currentColor" d="M8.8 15.2h6.4v1.6H8.8z" />
          </svg>
        }
        @case ('hours') {
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.4" fill="currentColor" />
            <path
              fill="#fff"
              d="M11.2 7.2h1.6v5.1l3.2 1.9-.8 1.3-4-2.4V7.2z"
            />
          </svg>
        }
        @case ('services') {
          <svg viewBox="0 0 24 24">
            <rect x="3.6" y="3.6" width="7.2" height="7.2" rx="1.8" fill="currentColor" />
            <rect x="13.2" y="3.6" width="7.2" height="7.2" rx="1.8" fill="currentColor" opacity="0.72" />
            <rect x="3.6" y="13.2" width="7.2" height="7.2" rx="1.8" fill="currentColor" opacity="0.72" />
            <rect x="13.2" y="13.2" width="7.2" height="7.2" rx="1.8" fill="currentColor" />
          </svg>
        }
        @case ('calm') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 20.4c0-5.6 3.3-9.1 7.4-10.7-1.1 4.3-4 6.8-7.4 7.6-3.4-.8-6.3-3.3-7.4-7.6C8.7 11.3 12 14.8 12 20.4z"
            />
            <path fill="currentColor" d="M11.2 9.2h1.6v11.2h-1.6z" opacity="0.85" />
          </svg>
        }
        @case ('parking') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5.2 15.2V9.8l1.5-3.8A2 2 0 0 1 8.6 4.8h6.8a2 2 0 0 1 1.9 1.2l1.5 3.8v5.4H5.2z"
            />
            <path fill="#fff" d="M5.8 9.8h12.4v1.5H5.8z" opacity="0.9" />
            <circle cx="8.1" cy="16.8" r="1.7" fill="currentColor" />
            <circle cx="15.9" cy="16.8" r="1.7" fill="currentColor" />
            <circle cx="8.1" cy="16.8" r="0.7" fill="#fff" />
            <circle cx="15.9" cy="16.8" r="0.7" fill="#fff" />
          </svg>
        }
        @case ('hygiene') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 3.4c2.9 3.2 6 5.9 6 9.3a6 6 0 1 1-12 0c0-3.4 3.1-6.1 6-9.3z"
            />
            <path
              fill="#fff"
              d="M10 13.2c.5 1.5 1.7 2.4 3 2.4v1.5c-2.1 0-3.8-1.4-4.5-3.5z"
              opacity="0.9"
            />
          </svg>
        }
        @case ('rates') {
          <svg viewBox="0 0 24 24">
            <rect x="3.6" y="5.8" width="16.8" height="12.4" rx="2.4" fill="currentColor" />
            <path fill="#fff" d="M3.6 9.6h16.8v1.7H3.6z" opacity="0.9" />
            <path fill="#fff" d="M7.2 13.8h4.2v1.6H7.2z" />
          </svg>
        }
        @case ('sadaram') {
          <svg viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 19.8s-6.6-4-6.6-8.5A3.7 3.7 0 0 1 12 8.3a3.7 3.7 0 0 1 6.6 3c0 4.5-6.6 8.5-6.6 8.5z"
            />
          </svg>
        }
      }
    </span>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .why-icon {
      display: grid;
      place-items: center;
      width: 2.55rem;
      height: 2.55rem;
      border-radius: 14px;
      color: var(--icon-color);
      background: color-mix(in srgb, var(--icon-color) 14%, white);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--icon-color) 22%, transparent);
    }

    .why-icon[data-icon='doctors'] {
      --icon-color: #0f766e;
    }

    .why-icon[data-icon='hours'] {
      --icon-color: #d97706;
    }

    .why-icon[data-icon='services'] {
      --icon-color: #4f46e5;
    }

    .why-icon[data-icon='calm'] {
      --icon-color: #16a34a;
    }

    .why-icon[data-icon='parking'] {
      --icon-color: #2563eb;
    }

    .why-icon[data-icon='hygiene'] {
      --icon-color: #0891b2;
    }

    .why-icon[data-icon='rates'] {
      --icon-color: #c2410c;
    }

    .why-icon[data-icon='sadaram'] {
      --icon-color: #e11d48;
    }

    .why-icon svg {
      width: 1.3rem;
      height: 1.3rem;
      display: block;
    }
  `,
})
export class WhyIcon {
  readonly name = input.required<WhyIconName>();
}
