import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-item',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-item.html',
  styleUrl: './add-item.css',
})
export class AddItemComponent {
  item = {
    title: '',
    description: '',
    category: '',
    type: '',
    location: '',
    contact: ''
  };

  submitReport() {
    console.log('Form Submitted!', this.item);
    alert('Report submitted for: ' + this.item.title);
    
    this.resetForm();
  }

  resetForm() {
    this.item = {
      title: '',
      description: '',
      category: '',
      type: '',
      location: '',
      contact: ''
    };
  }
}