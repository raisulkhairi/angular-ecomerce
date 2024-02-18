import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  form!: FormGroup;


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: resp => {
        console.log('login resp', resp);
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/home']);

      },
      error: err => {
        console.error('something wrong login', err)
      }
    })
  }
}
