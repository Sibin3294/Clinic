import { Pipe, PipeTransform } from '@angular/core';
import { mediaUrl } from './api.config';

@Pipe({ name: 'mediaUrl' })
export class MediaUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return mediaUrl(value);
  }
}
