// 1. Make sure Input is imported here
import { Component, Input, Output, EventEmitter } from '@angular/core'; 
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
  // 2. Make sure this exact line is inside the class!
  @Input({ required: true }) item!: Report; 

  @Output() toggleStatus = new EventEmitter<string>();

  getBadgeVariant(): 'lost' | 'found' | 'returned' {
    if (this.item.status === 'Returned') return 'returned';
    return this.item.type === 'Lost' ? 'lost' : 'found';
  }

  onToggleStatus() {
    this.toggleStatus.emit(this.item.id);
  }
}