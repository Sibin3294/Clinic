import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/content.service';
import { serviceImage } from '../../core/service-images';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesPage {
  private readonly content = inject(ContentService);
  readonly services = this.content.services;
  readonly serviceImage = serviceImage;
}
