import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private AuthService:AuthService,private router:Router) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  registerUser() {
    console.log("here")
    if (this.registrationForm.valid) {
      const user = this.registrationForm.value;
      console.log(user)
      this.AuthService.registerUser(user).subscribe(
        (response) => {
          console.log('User registered successfully');
          this.router.navigateByUrl('/open-boosters');
          // You can navigate to another page or show a success message here.
        },
        (error) => {
          console.error('Registration failed', error);
          // Handle registration error (e.g., display an error message).
        }
      );
    
    }
  }

}
