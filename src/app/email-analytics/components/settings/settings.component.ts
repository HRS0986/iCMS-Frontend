import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';

interface EmailAcc {
    name: string,
    id: string
    
}

interface EmailAcc2 {
  name: string,
  id: string,
  isChecked:boolean
  
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


    // arrays

    currentSSCheckingEmailAccounts :EmailAcc2[ ]= [
      { name: 'johndoe@gmail.com', id: 'A', isChecked: true  },
      { name: 'petermack@outlook.com', id: 'M', isChecked: false  }
  ];
  
  currentSSCheckingEmailAccountsOfuser1 :EmailAcc2[ ]= [
    { name: 'johndoe@gmail.com', id: 'A', isChecked: true  }
  ];
  
  currentCritiCheckingEmailAccounts: EmailAcc[] = [
    { name: 'johndoe@gmail.com', id: 'A' },
    { name: 'petermack@outlook.com', id: 'M' }
  ];

  currentCritiCheckingEmailAccountsofUser1: EmailAcc[] = [
    { name: 'johndoe@gmail.com', id: 'A' }
  ];
  
  
  
  currentNotiSendingEmailAccounts = [
    { name: 'johndoe@gmail.com'},
    { name: 'petermack@outlook.com'}
  ];
  
  
  currentReadingEmailAccounts = [
    { emailAddress: 'johndoe@gmail.com', nickName: 'johndoe1' },
    { emailAddress: 'janedoe@gmail.com', nickName: 'janedoe2' },
    { emailAddress: 'user123@yahoo.com', nickName: 'user123' }
    // Add more email accounts as needed
  ];
  
  currentCheckingTopics = [
    { name: 'Vega'},
    { name: 'travelBox'}
  ]
  

  // formGroups

  sentimentShiftsForm = this.fb.group({
    emailAccsToCheckSS: new FormControl<EmailAcc2[] | null>(this.currentSSCheckingEmailAccountsOfuser1),
    lowerSS: 0,
    upperSS: 0,
    lowerNotify: new FormControl<boolean>(false),
    upperNotify: new FormControl<boolean>(false)
  });

  criticalityForm =this.fb.group({
    emailAccsToCheckCriticality:new FormControl<EmailAcc[] | null>(this.currentCritiCheckingEmailAccountsofUser1)
  });

  notificationChannelsForm = this.fb.group({
    emailChannelChecked: [false],
    dashboardChannelChecked: [true],
    notiSendingEmails:[[], [Validators.email]] 
  });
   
  


  emailInetgration = this.fb.group({
    newEmailAccount: ['',[Validators.email, Validators.required]],
    newEmailNickname:['',[Validators.required]],
    newClientSecret: ['',[Validators.required]]
  });

  topicConfiguration = this.fb.group({
    newTopics:[[]]
  });

  constructor(private fb: FormBuilder) {}



  onSubmitSentimentShifts(): void {
    console.log(this.sentimentShiftsForm.value);
  }

  onSubmitCriticality(): void {
    console.log(this.criticalityForm.value);
  }

  //notification channels submit

  onSubmitNotificationChannels(): void {
    console.log(this.notificationChannelsForm.value);
    const newNotisendingemails = this.notificationChannelsForm.value['notiSendingEmails'] as unknown as string[];
    console.log(newNotisendingemails)
    if(newNotisendingemails){
      newNotisendingemails.forEach((email: string) => {
        this.currentNotiSendingEmailAccounts.push({ name: email });
        this.notificationChannelsForm.reset();
      });
    }
    
   
  }

  onSubmitEmailIntegration(): void {
    console.log(this.emailInetgration.value);
    const newEmailName = this.emailInetgration.get('newEmailAccount')?.value;
    const newEmailNName = this.emailInetgration.get('newEmailNickname')?.value;

    if (newEmailName && newEmailNName) { // Check if newTopicsVal is not null or undefined
          console.log(newEmailName);
          // push the new topic into the currentCheckingTopics
          this.currentReadingEmailAccounts.push({ emailAddress: newEmailName , nickName:newEmailNName});
          this.emailInetgration.reset();
          
      
  } else {
      console.log("No new topics entered.");
  }
  }

  // topic configuration submit

  onSubmitTopicConfiguration(): void {
    //console.log(this.topicConfiguration.value);
    const newTopicsVal = this.topicConfiguration.get('newTopics')?.value as unknown as any[];
    if (newTopicsVal) { // Check if newTopicsVal is not null or undefined
      for (const item of newTopicsVal) {
          console.log(item);
          // push the new topic into the currentCheckingTopics
          this.currentCheckingTopics.push({ name: item });
          this.topicConfiguration.reset();
          
          
      }
  } else {
      console.log("No new topics entered.");
  }
    
  }

 ;

 


formGroup: FormGroup | undefined;

deleteReadingEmail(email: string): void {
  this.currentReadingEmailAccounts = this.currentReadingEmailAccounts.filter(item => item.emailAddress !== email);
}

deleteNotiSendingEmail(emailName: string): void {
  this.currentNotiSendingEmailAccounts = this.currentNotiSendingEmailAccounts.filter(item => item.name !== emailName);

}

deleteCheckingTopic(topicName: string): void {
  this.currentCheckingTopics = this.currentCheckingTopics.filter(item => item.name !== topicName);

}

ngOnInit() {
    
    // Set checkbox value
    this.sentimentShiftsForm.controls['lowerNotify'].setValue(false);
    this.sentimentShiftsForm.controls['upperNotify'].setValue(true);

    this.formGroup = new FormGroup({
        values: new FormControl<string[] | null>(null),
        valuesTopics: new FormControl<string[] | null>(null)
    });

    this.notificationChannelsForm.patchValue({
      notiSendingEmails: this.formGroup.get('values')?.value
  });

    this.topicConfiguration.patchValue({
      newTopics:this.formGroup.get('valuesTopics')?.value

    });

    // this.currentSSCheckingEmailAccounts.forEach(account => {
    //   const control = this.sentimentShiftsForm.get(`emailAccsToCheckSS.${account.name}`);
    //   if (control) { // Check if control is not null
    //     const value = account.isChecked as boolean; // Set value to true or false based on account.isChecke
    //     if(value){
    //       //control.setValue(true);
    //     }
       
        
        
    //   }
    // });

   // const controls = this.sentimentShiftsForm.controls['emailAccsToCheckSS'] as unknown as FormGroup;
  //  const formArray= this.sentimentShiftsForm.controls['emailAccsToCheckSS'] as unknown as FormArray;
  //   this.currentSSCheckingEmailAccounts.forEach(account => {
  //     console.log(account.name)
  //     console.log("bla")
  //     console.log(formArray.value[0].name)
  //     if(account.name===formArray.value[0].name){
        
  //     }
  //     const index = formArray.value.findIndex((item: EmailAcc2) => item.name === account.name);
  //     console.log(index)
      
  //     if (index !== -1) {
  //     //  console.log("bla")
  //     formArray.controls[index].setValue(true);
  //     }
  //     //const control = controls.get(account.id);
  //     // if (control && account.isChecked) {
  //     //   control.setValue(true);
  //     //   console.log(account.isChecked)
  //     // }
  //   });

  //   this.currentSSCheckingEmailAccounts.forEach(account => {
  //     if (account.isChecked) {
  //      const control =  this.sentimentShiftsForm.get('emailAccsToCheckSS')
  //      if (control){
  //         //control.push(new FormControl(account.name));
  //      }
       
  //     }
  //   });

   
}
 



}
