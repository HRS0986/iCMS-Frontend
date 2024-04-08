import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

interface EmailAcc {
    name: string,
    id: string
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Settings"}
  ];

  notifications = this.fb.group({
    emailAccsToCheckSS: [],
    lowerSS: 0,
    upperSS: 0,
    lowerNotify: false,
    upperNotify: false,
    emailAccsToCheckCriticality:[],
    emailChannelChecked: [true],
    dashboardChannelChecked: [true],
    notiSendingEmails:[]
  });

  emailInetgration = this.fb.group({
    newEmailAccount: '',
    newEmailNickname:'',
    newClientSecret: ''
  });
  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.notifications.value);
  }

  onSubmitEmailIntegration(): void {
    console.log(this.emailInetgration.value);
  }

 ;

 emailAccs: EmailAcc[] = [
    { name: 'johndoe@gmail.com', id: 'A' },
    { name: 'petermack@outlook.com', id: 'M' }
];

formGroup: FormGroup | undefined;

ngOnInit() {
    this.formGroup = new FormGroup({
        values: new FormControl<string[] | null>(null)
    });

    this.notifications.patchValue({
      notiSendingEmails: this.formGroup.get('values')?.value
  });

   
}
 

}
