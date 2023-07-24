import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormsService } from 'src/app/shared/services-general/forms-service';
import { AuthService } from './services/auth.service';
import { UserSignIn } from './models/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loading = false;
  loginForm!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;

  constructor( private fb : FormBuilder, public formsService: FormsService, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.initMainForm();
    //this.authService.SignOut();
  }

  private initMainForm() {
    this.usernameCtrl = this.fb.control('', [Validators.required, Validators.email])
    this.passwordCtrl = this.fb.control('', [Validators.required])
    this.loginForm = this.fb.group({
      email: this.usernameCtrl,
      password: this.passwordCtrl
  });
  }

  onSubmitForm() {
    if (! this.loginForm.valid) {
      return;
    }
    this.loading = true;
    const user : UserSignIn = this.loginForm.value;

    this.authService.SignIn(user);
    

  }



}
