import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormsService } from 'src/app/shared/services-general/forms-service';
import { AuthService } from './services/auth.service';
import { UserSignIn } from './models/login.model';
import { ArticleService } from 'src/app/shared/services-general/artcle.service';
import { map, tap } from 'rxjs';
import { DocumentSnapshot } from 'firebase/firestore';


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

  constructor( private fb : FormBuilder,
              public formsService: FormsService, 
              private authService: AuthService,
              private articleService: ArticleService) {
    
  }

  ngOnInit(): void {
    this.initMainForm();
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

  onTestFirestore() {
    //this.articleService.articleAdd({titre: 'titre 11'}).pipe(tap(result => console.table(result))).subscribe();
    // 'p68G1biHiDkC1C6rDBCi'
    //this.articleService.articleAdd({titre: 'titre 22'}).pipe(tap(result => console.table(result))).subscribe();
    this.articleService.getWhereArticle('titre 22').pipe(
      tap(
        data => console.table(data)
      )
    ).subscribe();
  }



}
