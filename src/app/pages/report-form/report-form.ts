import { Component } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { FormsModule } from '@angular/forms'; // Add this to imports

@Component({
  selector: 'app-report-form',
  imports: [FormsModule],
  templateUrl: './report-form.html',
  styleUrl: './report-form.css',
})
export class ReportForm {
  constructor(private reportService: ReportService) {}

  // This will eventually hold your logic to send the 'Backpack' data to MySQL
  
  submitReport(formData: any) {
    // You'll call this.reportService.addReport(formData) here
  }

}
