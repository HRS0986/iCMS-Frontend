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
export class SettingsComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Settings"}
  ];

  isChecked: boolean = true;
  checked: boolean = false;

  // notifications!: FormGroup;

  notifications = this.fb.group({
    emailAccsToCheckSS: [],
    lowerSS: 0,
    upperSS: 0,
    lowerNotify: new FormControl<string | null>(null),
    upperNotify: [],
    emailAccsToCheckCriticality:[],
    emailChannelChecked: [false],
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

 currentSSCheckingEmailAccounts: EmailAcc[] = [
    { name: 'johndoe@gmail.com', id: 'A' },
    { name: 'petermack@outlook.com', id: 'M' }
];

currentCritiCheckingEmailAccounts: EmailAcc[] = [
  { name: 'johndoe@gmail.com', id: 'A' },
  { name: 'petermack@outlook.com', id: 'M' }
];

currentNotiSendingEmailAccounts: EmailAcc[] = [
  { name: 'johndoe@gmail.com', id: 'A' },
  { name: 'petermack@outlook.com', id: 'M' }
];


currentReadingEmailAccounts = [
  { emailAddress: 'johndoe@gmail.com', nickName: 'johndoe1' },
  { emailAddress: 'janedoe@gmail.com', nickName: 'janedoe2' },
  { emailAddress: 'user123@yahoo.com', nickName: 'user123' }
  // Add more email accounts as needed
];


formGroup: FormGroup | undefined;

deleteReadingEmail(email: string): void {
  this.currentReadingEmailAccounts = this.currentReadingEmailAccounts.filter(item => item.emailAddress !== email);
}

deleteNotiSendingEmail(emailName: string): void {
  this.currentNotiSendingEmailAccounts = this.currentNotiSendingEmailAccounts.filter(item => item.name !== emailName);

}

ngOnInit() {

  // this.notifications = this.fb.group({
  //   emailAccsToCheckSS: [],
  //   lowerSS: 0,
  //   upperSS: 0,
  //   lowerNotify: [], // Set the initial value to true here
  //   upperNotify: [],
  //   emailAccsToCheckCriticality:[],
  //   emailChannelChecked: [false],
  //   dashboardChannelChecked: [true],
  //   notiSendingEmails:[]
  // });


    this.formGroup = new FormGroup({
        values: new FormControl<string[] | null>(null)
    });

    this.notifications.patchValue({
      notiSendingEmails: this.formGroup.get('values')?.value

  });




    
  

   
}
 

}
