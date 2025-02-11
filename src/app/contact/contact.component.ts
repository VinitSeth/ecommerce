import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]),
    address: new FormControl('', [Validators.required])
  });

  onHandleClick(event: Event) {
    event.preventDefault();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.contactForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  onClick() {
    this.contactForm.reset();
    console.log('Form has been reset');
  }
}