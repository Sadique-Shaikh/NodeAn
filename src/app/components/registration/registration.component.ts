import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';
import { response } from 'express';
import { FileHandler } from '../../interfaces/file-handler';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatDividerModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  constructor(
    private sanitizer: DomSanitizer,
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,) { }

  hide = true;

  matcher = new MyErrorStateMatcher();
  firstNameControl = new FormControl('', [Validators.required]);
  lastNameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);
  phoneNoControl = new FormControl('', [Validators.required]);

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  designationControl = new FormControl('', [Validators.required]);
  dobControl = new FormControl('', [Validators.required]);
  ageControl = new FormControl('', [Validators.required]);

  imageControl = new FormControl();
  countryControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  pinCodeControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  registerForm = this._formBuilder.group({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    gender: this.genderControl,
    phoneNo: this.phoneNoControl,

    email: this.emailControl,
    designation: this.designationControl,
    dob: this.dobControl,
    age: this.ageControl,

    image: this.imageControl,
    country: this.countryControl,
    state: this.stateControl,
    city: this.cityControl,

    pinCode: this.pinCodeControl,
    password: this.passwordControl,
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileHandle: FileHandler = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)),
    }
    // Set the selected file to the image FormControl
    this.registerForm.patchValue({ image: fileHandle.url.toString() });
  }

  onSubmit() {
    const user = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      gender: this.registerForm.value.gender,
      phoneNo: this.registerForm.value.phoneNo,
      email: this.registerForm.value.email,
      designation: this.registerForm.value.designation,
      dob: this.registerForm.value.dob,
      age: this.registerForm.value.age,
      image: this.registerForm.value.image,
      country: this.registerForm.value.country,
      state: this.registerForm.value.state,
      city: this.registerForm.value.city,
      pinCode: this.registerForm.value.pinCode,
      password: this.registerForm.value.password,
    }
    console.log("user::: ", user);
    if (user) {
      this.registerUser(user);
    }
  }

  registerUser(user:any) {
      const {firstName, lastName, gender, phoneNo, email, designation, dob, age, image, country, state, city, pinCode, password} = user;
    this.auth.registerUser(firstName, lastName, gender, phoneNo, email, designation, dob, age, image, country, state, city, pinCode, password,
    ).subscribe(
      (response) => {
        if (response) {
          this.registerForm.reset();
          this.router.navigate(['login'])
        }
      },
      (error) => {
        console.error('Failed to register user', error);
      },
    )
  }
}