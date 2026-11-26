import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../../core/t.pipe';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-laboratory',
  imports: [RouterLink, ScrollReveal, TPipe],
  templateUrl: './laboratory.html',
  styleUrl: './laboratory.scss',
})
export class Laboratory {
  readonly highlights = ['lab.h1', 'lab.h2', 'lab.h3', 'lab.h4', 'lab.h5'] as const;
}
