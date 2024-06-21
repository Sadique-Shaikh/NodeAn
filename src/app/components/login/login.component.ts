import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


import { FormBuilder, FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthenticationService } from '../../services/authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = true;
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  passwordControl = new FormControl('');

  loginForm = this._formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private snack: MatSnackBar) { }

  onSubmit() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.auth.loginUser(user).subscribe(
      (response: any) => {
        if (response.token !== null) {
          this.auth.setToken(response?.token)

          // Set interval to remove token after a certain duration
          setTimeout(() => {
            this.auth.removeToken(); // Assuming you have a method to remove token
          }, 3600000); // 1 hour in milliseconds

          this.loginForm.reset();
          this.router.navigate(["dashboard"]);
        } else {
          // Handle the case where token is null
          this.snack.open("User name or password is incorrect", "close", { duration: 4000 });
          console.error("User name or password is incorrect");
          this.router.navigate(['login']);
        }
      },
      (error: any) => {
        if (error.status === 401) {
          this.snack.open("Unauthorized: " + error.error.message, "close", { duration: 4000 });
          console.error("Unauthorized", error.error.message);
        } else {
          console.error("Error:", error);
        }
      }
    )
  }

}
