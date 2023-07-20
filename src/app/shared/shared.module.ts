import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    RouterModule,
    TranslateModule
  ]
})
export class SharedModule {
  constructor(private translateService: TranslateService) {
    // Définition de la langue par défaut
    this.translateService.setDefaultLang('en');
    this.translateService.use('fr');
  }
 }
