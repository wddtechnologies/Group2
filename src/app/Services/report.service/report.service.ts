import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report, Category } from '../../Models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:3000/api/reports';
  private categoryUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) { }

  // 1. PUBLIC: Fetch only approved items
  getPublicReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/public`);
  }

  // 2. FORM: Fetch categories for the dropdown
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  // 3. SUBMIT: Handle multipart/form-data for the image upload
  addReport(formData: FormData): Observable<any> {
    // Hey, Do NOT set Content-Type header manually when sending FormData
    return this.http.post(this.baseUrl, formData);
  }

  // 4. ADMIN: Fetch all reports (Pending, Approved, Resolved)
  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  // 5. ADMIN: Update status (e.g., Approve a report)
  updateStatus(id: number, status: 'Approved' | 'Resolved'): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/status`, { status });
  }

  // 6. ADMIN: Delete a report
  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
