import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  constructor(private translateService: TranslateService) {
    // Définition de la langue par défaut
    this.translateService.setDefaultLang('en');
    this.translateService.use('fr');
  }
 }
