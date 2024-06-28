import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenEmailValidator(forbiddenEmails: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = forbiddenEmails.includes(control.value);
    return forbidden ? { 'forbiddenEmail': { value: control.value } } : null;
  };
}