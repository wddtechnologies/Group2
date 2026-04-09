import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Report } from '../../models/report.model';

type ReportsResponse = {
  reports: Array<
    Partial<Report> & {
      imagePath?: string | null;
      createdAt?: string;
      contact_info?: string | null;
      contactInfo?: string | null;
      category?: string | null;
    }
  >;
};

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private readonly http: HttpClient) {}

  getPublicReports(): Observable<Report[]> {
    return this.http.get<ReportsResponse>('/api/reports/list.php').pipe(
      map((response) =>
        (response.reports ?? []).map((item) => ({
          ...item,
          image_path: item.image_path ?? item.imagePath ?? null,
          created_at: item.created_at ?? item.createdAt ?? '',
          category_name: item.category_name ?? item.category ?? null,
          contact_info: item.contact_info ?? item.contactInfo ?? null
        })) as Report[]
      ),
      catchError(() => of([]))
    );
  }
}
