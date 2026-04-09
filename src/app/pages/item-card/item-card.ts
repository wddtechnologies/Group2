import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge/badge';
import { Report } from '../../models/report.model';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input({ required: true }) item!: Report;

  private readonly fallbackImage = '/images/placeholder.jpg';

  getBadgeVariant(): 'lost' | 'found' | 'returned' {
    if (String(this.item.status ?? '').toLowerCase() === 'resolved') {
      return 'returned';
    }
    return this.item.type === 'Lost' ? 'lost' : 'found';
  }

  getBadgeLabel(): string {
    if (String(this.item.status ?? '').toLowerCase() === 'resolved') {
      return 'Returned';
    }
    return this.item.type;
  }

  getActionLabel(): string {
    return this.item.type === 'Found' ? 'It is mine' : 'I found it';
  }

  getItemImage(path: string | null | undefined): string {
    if (!path) {
      return this.fallbackImage;
    }

    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
      return path;
    }

    const normalizedPath = path.trim().replace(/\\/g, '/').replace(/^\.?\//, '');

    if (normalizedPath.startsWith('uploads/')) {
      return `/api/${normalizedPath}`;
    }

    return `/${normalizedPath}`;
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement | null;
    if (target) {
      target.src = this.fallbackImage;
    }
  }
}
