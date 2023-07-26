import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HasPermissionDirective } from './directives/has-permission/has-permission.directive';



@NgModule({
  declarations: [
    HasPermissionDirective
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
    HasPermissionDirective
  ]
})
export class SharedModule {
  constructor(private translateService: TranslateService) {
    // Définition de la langue par défaut
    this.translateService.setDefaultLang('en');
    this.translateService.use('fr');
  }
 }
