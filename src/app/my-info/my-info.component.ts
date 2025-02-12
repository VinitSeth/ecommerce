import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../login/authService';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css',
})
export class MyInfoComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?\d{10,15}$/),
    ]),
    address: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserDetails();
    if (userId) {
      this.contactForm.patchValue({
        name: `${userId.firstName} ${userId.lastName}`,
        email: userId.email,
        phoneNo: userId.phone,
        address: userId.address,
      });
    }
  }

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
