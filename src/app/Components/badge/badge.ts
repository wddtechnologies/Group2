import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="custom-badge" [ngClass]="variant">
      {{ label }}
    </span>
  `,
  styleUrls: ['./badge.css']
})
export class BadgeComponent {
  @Input({ required: true }) label!: string;
  @Input() variant: 'lost' | 'found' | 'returned' = 'lost'; 
}