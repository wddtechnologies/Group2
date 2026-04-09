import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { LostFoundStore } from '../../core/services/lost-found.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-item.html',
  styleUrl: './add-item.css',
})
export class AddItemComponent {
  constructor(
    private readonly store: LostFoundStore,
    private readonly router: Router
  ) {}

  item = {
    title: '',
    description: '',
    category: '',
    type: '',
    location: '',
    contact: '',
    imageDataUrl: ''
  };
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  submitReport() {
    if (this.isSubmitting) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitting = true;

    this.store
      .addItem({
        title: this.item.title,
        description: this.item.description,
        category: this.item.category,
        type: this.item.type as 'Lost' | 'Found',
        location: this.item.location,
        contactInfo: this.item.contact,
        imageDataUrl: this.item.imageDataUrl || undefined
      })
      .subscribe((ok) => {
        this.isSubmitting = false;
        if (ok) {
          this.successMessage = 'Report submitted successfully.';
          this.resetForm();
          this.router.navigateByUrl('/');
          return;
        }
        this.errorMessage = 'Could not submit report. Please check API reports/create.php.';
      });
  }

  resetForm() {
    this.item = {
      title: '',
      description: '',
      category: '',
      type: '',
      location: '',
      contact: '',
      imageDataUrl: ''
    };
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.item.imageDataUrl = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please choose an image file (png, jpg, or webp).';
      this.item.imageDataUrl = '';
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.item.imageDataUrl = String(reader.result ?? '');
    };
    reader.onerror = () => {
      this.errorMessage = 'Could not read selected image.';
      this.item.imageDataUrl = '';
    };
    reader.readAsDataURL(file);
  }
}
