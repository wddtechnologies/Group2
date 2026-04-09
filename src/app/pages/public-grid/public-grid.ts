import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../core/services/report.service';
import { Report } from '../../models/report.model';
import { ItemCardComponent } from '../item-card/item-card';

@Component({
  selector: 'app-public-grid',
  standalone: true,
  imports: [CommonModule, RouterLink, ItemCardComponent],
  templateUrl: './public-grid.html',
  styleUrls: ['./public-grid.css']
})
export class PublicGridComponent implements OnInit {
  reports: Report[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef // Injected to fix the "blank page" issue
  ) {}

  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.isLoading = true;
    this.reportService.getPublicReports().subscribe({
      next: (data: Report[]) => {
        console.log('Successfully loaded items:', data);
        this.reports = data.filter(
          (item) => String(item.status ?? '').toLowerCase() === 'approved'
        );
        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Connection failed:', err);
        this.errorMessage = 'Could not connect to the database.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
