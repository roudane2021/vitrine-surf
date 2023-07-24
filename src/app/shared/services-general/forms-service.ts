import { Injectable } from '@angular/core';
import { ERROR_MESSAGES } from '../models-general/general-model';
import {  AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  getFormControlErrorText(ctrl : AbstractControl): string {
    if (ctrl.hasError('required')) {
      return ERROR_MESSAGES.required;
  } else if (ctrl.hasError('email')) {
      return ERROR_MESSAGES.email;
  } else if (ctrl.hasError('minlength')) {
      return ERROR_MESSAGES.minlength;
  } else if (ctrl.hasError('maxlength')) {
      return ERROR_MESSAGES.maxlength;
  } else {
      return ERROR_MESSAGES.NONE;
  }
  }

  isValidAbstractControl(ctrl : AbstractControl): boolean {
    
    return ( ctrl.touched && !ctrl.valid) ;
  }

}