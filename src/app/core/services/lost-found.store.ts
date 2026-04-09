import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { ItemStatus, LostFoundItem, NewItemPayload } from '../../models/item.model';

type CategoryResponse = { categories: string[] };
type ReportsResponse = { reports: LostFoundItem[] };

@Injectable({ providedIn: 'root' })
export class LostFoundStore {
  private readonly auth = inject(AuthService);
  private readonly http = inject(HttpClient);

  readonly categories = signal<string[]>([]);
  readonly items = signal<LostFoundItem[]>([]);
  readonly loading = signal(false);

  readonly stats = computed(() => {
    const list = this.items();
    return {
      total: list.length,
      pending: list.filter((item) => item.status === 'Pending').length,
      approved: list.filter((item) => item.status === 'Approved').length,
      resolved: list.filter((item) => item.status === 'Resolved').length
    };
  });

  constructor() {
    this.loadCategories();
    this.loadReports();
  }

  loadCategories(): void {
    this.http
      .get<CategoryResponse>('/api/categories/list.php')
      .pipe(
        tap((response) => this.categories.set(response.categories)),
        catchError(() => {
          this.categories.set(['Electronics', 'Pets', 'Wallets/Keys', 'Clothing', 'Documents']);
          return of({ categories: this.categories() });
        })
      )
      .subscribe();
  }

  loadReports(): void {
    this.loading.set(true);
    this.http
      .get<ReportsResponse>('/api/reports/list.php')
      .pipe(
        tap((response) => this.items.set(response.reports)),
        catchError(() => {
          this.items.set([]);
          return of({ reports: [] as LostFoundItem[] });
        }),
        tap(() => this.loading.set(false))
      )
      .subscribe();
  }

  addItem(payload: NewItemPayload): Observable<boolean> {
    return this.http
      .post('/api/reports/create.php', {
        title: payload.title.trim(),
        description: payload.description.trim(),
        category: payload.category,
        type: payload.type,
        location: payload.location?.trim() || null,
        contact_info: payload.contactInfo?.trim() || null,
        image_data_url: payload.imageDataUrl ?? null
      })
      .pipe(
        tap(() => this.loadReports()),
        map(() => true),
        catchError(() => of(false))
      );
  }

  toggleStatus(itemId: number): void {
    if (!this.auth.isAdmin()) {
      return;
    }

    const item = this.items().find((entry) => entry.id === itemId);
    if (!item) {
      return;
    }

    const nextStatus: ItemStatus =
      item.status === 'Pending' ? 'Approved' : item.status === 'Approved' ? 'Resolved' : 'Pending';

    this.http
      .post('/api/reports/update-status.php', { id: itemId, status: nextStatus }, { withCredentials: true })
      .pipe(
        tap(() => this.loadReports()),
        catchError(() => of(null))
      )
      .subscribe();
  }

  deleteItem(itemId: number): void {
    if (!this.auth.isAdmin()) {
      return;
    }

    this.http
      .post('/api/reports/delete.php', { id: itemId }, { withCredentials: true })
      .pipe(
        tap(() => this.loadReports()),
        catchError(() => of(null))
      )
      .subscribe();
  }

  statusLabel(status: ItemStatus): string {
    return status;
  }
}
