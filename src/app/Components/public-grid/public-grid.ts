import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ReportService } from '../../Services/report.service/report.service';
import { Report } from '../../Models/report.model';

@Component({
  selector: 'app-public-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-grid.html', // Double check if it needs .component.html
  styleUrls: ['./public-grid.css']
})
export class PublicGridComponent implements OnInit {
  reports: Report[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  private readonly IMAGE_BASE_URL = 'http://localhost:3000/';

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
      next: (data) => {
        console.log('Successfully loaded items:', data);
        this.reports = data;
        this.isLoading = false;

        // This replaces the "magic comma". It tells Angular: "Hey, data is here, redraw now!"
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Connection failed:', err);
        this.errorMessage = 'Could not connect to the database.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getItemImage(path: string | undefined): string {
    // Relative path for the public directory placeholder
    return path ? `${this.IMAGE_BASE_URL}${path}` : 'placeholder.jpg';
  }

  handleImageError(event: any) {
    event.target.src = 'placeholder.jpg';
  }
}
