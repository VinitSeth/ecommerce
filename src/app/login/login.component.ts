import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './authService';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  loginDetails!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginDetails = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginDetails.valid) {
      const { username, password } = this.loginDetails.value;

      this.authService
        .login(username, password)
        .pipe(
          catchError(() => {
            this.toastr.error('Login Failed', 'Error :', {
              toastClass: 'ngx-toastr toast-center',
            });
            return of(false);
          })
        )
        .subscribe((success) => {
          if (success) {
            this.router.navigate(['']); // Redirect on successful login
          } else {
            this.toastr.error('Login Failed', 'Error : ', {
              toastClass: 'ngx-toastr toast-center',
            });
            console.error('Login failed');
          }
        });
    } else {
      this.toastr.error('Please fill in all the fields', 'Error : ', {
        toastClass: 'ngx-toastr toast-center',
      });
    }
  }
}
