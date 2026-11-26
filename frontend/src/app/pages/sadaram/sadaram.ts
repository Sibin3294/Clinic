import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TPipe } from '../../core/t.pipe';
import { ScrollReveal } from '../../shared/scroll-reveal.directive';

@Component({
  selector: 'app-sadaram',
  imports: [RouterLink, ScrollReveal, TPipe],
  templateUrl: './sadaram.html',
  styleUrl: './sadaram.scss',
})
export class Sadaram {}
