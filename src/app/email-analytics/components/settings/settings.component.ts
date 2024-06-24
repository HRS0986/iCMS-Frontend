import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from './settings.data.service';



interface EmailAcc {
    address: string   
}

interface NotiChannelsData {
  user_id: number;
  is_dashboard_notifications: boolean;
  is_email_notifications: boolean;
  noti_sending_emails: string[]; 
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  providers: [MessageService]
})
export class SettingsComponent implements OnInit{
  breadcrumbItems: MenuItem[] = [
    {label: "Email Analytics"},
    {label: "Settings"}
  ];

  isChecked: boolean = true;
  checked: boolean = false;


  //-------------------------------------------------- arrays---------------------------------------------------------------------------

   
  
  currentSSCheckingEmailAccountsOfUser = [
    {address: 'uharischandra12@gmail.com'}];
  

  currentCritiCheckingEmailAccountsofUser: EmailAcc[] = [
    { address: 'johndoe@gmail.com'}
  ];
  
  currentConsideringProducts = [{name:'sampleProduct1'}];
  
  currentNotiSendingEmailAccounts = [
    {address:'dummy@gmail.com'}
  ];

  
  currentReadingEmailAccountsForNotificationPage = [{address:'dummy@gmail.com'}];

  currentReadingEmailAccountsForIntegrationPage = [{address:'dummy@gmail.com', nickname:'dummynickname'}];
  
  
  currentCheckingTopics = [
    { name: 'Vega'},
    { name: 'travelBox'}
  ]
  

  //-------------------------------------------------- form groups---------------------------------------------------------------------------


  sentimentShiftsForm = this.fb.group({
    emailAccsToCheckSS: new FormControl<EmailAcc[] | null>(this.currentSSCheckingEmailAccountsOfUser),
    lowerSS: 0,
    upperSS: 0,
    lowerNotify: new FormControl<boolean>(false),
    upperNotify: new FormControl<boolean>(false),
    ssThresholdNotiEnabled: [true]
  });

  criticalityForm =this.fb.group({
    emailAccsToCheckCriticality:new FormControl<EmailAcc[] | null>(this.currentCritiCheckingEmailAccountsofUser)
  });

  notificationChannelsForm = this.fb.group({
    emailChannelChecked: [false],
    dashboardChannelChecked: [true],
    notiSendingEmails:new FormControl<string[] | null>(null, this.emailArrayValidator([]))
  });
   
  


  emailInetgration = this.fb.group({
    newEmailAccount: ['',[Validators.email, Validators.required]],
    newEmailNickname:['',[Validators.required]],
    newClientSecret: ['',[Validators.required]]
  });

  systemConfigurations = this.fb.group({
    overdueInterval: 14,
    newProductInputs: new FormControl<string[] | null>(null)


  });
    

  topicConfiguration = this.fb.group({
    newTopics:[[]]
  });


  // constructor
  constructor(private fb: FormBuilder, private http: HttpClient, private dataService: DataService, private messageService: MessageService) {}

  
  //-------------------------------------------------- onSubmit functions---------------------------------------------------------------------------

  onSubmitSentimentShifts(): void {

    console.log(this.sentimentShiftsForm.value);
    const email_Accs_To_CheckSS = this.sentimentShiftsForm.value.emailAccsToCheckSS;

    // configure dynamicaly later
    const user_id = 3;

    let formData = {
      userID: user_id,
      emailAccsToCheckSS: email_Accs_To_CheckSS ? email_Accs_To_CheckSS.map((item: any) => item.name) : [],
      lowerNotify: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.lowerNotify : false,
      lowerSS: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.lowerSS : 0,
      upperNotify: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.upperNotify : false,
      upperSS: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.upperSS : 0,
      is_checking_ss:email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.ssThresholdNotiEnabled : true
    };
  
    this.http.post('http://127.0.0.1:8000/email/settings/receive_trigger_data', formData).subscribe(response => {
      console.log('Trigger Data sent successfully:', response);
      
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sentiment shifts configuration updated succesfuly!' });

      this.sentimentShiftsForm.reset();
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
    });

    
    } 


  

  onSubmitCriticality(): void {
    console.log(this.criticalityForm.value);
    const email_Accs_To_Criticality = this.criticalityForm.value.emailAccsToCheckCriticality;

    // configure dynamicaly later
    const user_id = 3;

    let formData = {
      userID: user_id,
      accs_to_check_overdue_emails: email_Accs_To_Criticality ? email_Accs_To_Criticality.map((item: any) => item.name) : [],
    }

    this.http.post('http://127.0.0.1:8000/email/settings/receive_criticality_trigger_data', formData).subscribe(response => {
      console.log('Trigger Data sent successfully:', response);
      
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Overdue checking emails updated succesfuly!' });

      this.sentimentShiftsForm.reset();
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
    });
  }

  //notification channels submit

  onSubmitNotificationChannels(): void {
    console.log(this.notificationChannelsForm.value);

    const user_id = 3;

    const formData = {
      userID: user_id,
      emailChannelChecked:this.notificationChannelsForm.value.emailChannelChecked,
      dashboardChannelChecked: this.notificationChannelsForm.value.dashboardChannelChecked,
      notiSendingEmails:this.notificationChannelsForm.value.notiSendingEmails
    }

    this.http.post('http://127.0.0.1:8000/email/settings/receive_notifications_channel_data', formData).subscribe(response => {
      console.log('Notification channels Data sent successfully:', response);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification channels configuration updated succesfuly!' });


      this.sentimentShiftsForm.reset();
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

    });

    
    }
    
    onSubmitSystemConfigurations(): void {
      console.log(this.systemConfigurations.value);
  
  
      const formData = {
        overdue_margin_time:this.systemConfigurations.value.overdueInterval
        // newProducts:this.systemConfigurations.value.newProductInputs

      }
  
      this.http.post('http://127.0.0.1:8000/email/settings/receive_system_configurations_data', formData).subscribe(response => {
        console.log('Notification configurations Data sent successfully:', response);
  
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'System configurations updated succesfuly!' });
  
  
        this.systemConfigurations.reset();
      }, error => {
        console.error('Error sending data:', error);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
  
      });
  
      
      }
   
  

  onSubmitEmailIntegration(): void {
    console.log(this.emailInetgration.value);
    const newEmailName = this.emailInetgration.get('newEmailAccount')?.value;
    const newEmailNName = this.emailInetgration.get('newEmailNickname')?.value;
    const newEmailClientSecret = this.emailInetgration.get('newClientSecret')?.value;


    if (newEmailName && newEmailNName) { 
          console.log(newEmailName);
          // push the new email name and nickname into the currentReadingemailaccounts
          this.currentReadingEmailAccountsForIntegrationPage.push({ address: newEmailName , nickname:newEmailNName});
          //this.emailInetgration.reset();

          // Send the new email data to FastAPI
          this.http.post('http://127.0.0.1:8000/email/settings/receive_email_data', {
            emailAddress: newEmailName,
            nickName: newEmailNName,
            clientSecret:newEmailClientSecret
          }).subscribe(response => {
            console.log('Data sent successfully:', response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New email integrated succesfuly!' });
            // Assuming you want to reset the form after successful submission
            this.emailInetgration.reset();
          }, error => {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
            console.error('Error sending data:', error);
          });
                
      
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
  //-------------------------------------------------- show dialog functions---------------------------------------------------------------------------

  selectedNotiSendingEmail : any;
  visibleConfirmationNotiSending: boolean = false;
  
  selectedProduct!: string;
  visibleProductDeleting: boolean = false;


  selectedReadingEmail : any;
  visibleConfirmationEmailIntegration: boolean = false;

  showDialogConfirmationNotiSending(emailAddress: any): void {
    this.selectedNotiSendingEmail = emailAddress;
    this.visibleConfirmationNotiSending = true;
  }

  showDialogConfirmationProductDeleting(productname: string): void {
    this.selectedProduct = productname;
    this.visibleProductDeleting = true;
  }

  ConfirmNotiSendingDelete():void{
    this.deleteNotiSendingEmail(this.selectedNotiSendingEmail)
    this.visibleConfirmationNotiSending = false;

  }

  ConfirmProductDelete():void{
    this.deleteProduct(this.selectedProduct)
    this.visibleProductDeleting = false;

  }

  showDialogConfirmationEmailIntegration(emailAddress: any): void {
    this.selectedReadingEmail = emailAddress;
    this.visibleConfirmationEmailIntegration = true;
  }

  ConfirmReadingEmailDelete():void{
    this.deleteReadingEmail(this.selectedReadingEmail)
    this.visibleConfirmationEmailIntegration = false;

  }
 
  //-------------------------------------------------- delete funcs---------------------------------------------------------------------------


formGroup: FormGroup | undefined;

deleteReadingEmail(email: string): void {
  
  console.log( this.selectedReadingEmail)
  const userId = 1;
  this.http.post(`http://127.0.0.1:8000/email/settings/remove_reading_email`, {
      removing_email: email
    }).subscribe(response => {
      console.log('Data sent successfully:', response);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reading email deleted succesfully' });

      this.dataService.getData().subscribe(data => {
        console.log(data)
        this.currentReadingEmailAccountsForIntegrationPage = data// Array of dictionaries received from the backend
        this.currentReadingEmailAccountsForNotificationPage = data.map(obj => ({ address: obj.address }));
        console.log('currentReadingEmailAccountsForNotificationPage',this.currentReadingEmailAccountsForNotificationPage)
      });
      
      // Assuming you want to reset the form after successful submission
      this.emailInetgration.reset();
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

    });
}

deleteNotiSendingEmail(emailName: string): void {
  this.currentNotiSendingEmailAccounts = this.currentNotiSendingEmailAccounts.filter(item => item.address !== emailName);

  const userId = 1;
  

  this.http.post(`http://127.0.0.1:8000/email/settings/remove_noti_sending_email/${userId}`, {

    noti_sending_emails: this.currentNotiSendingEmailAccounts.map(item => item.address as string)
  }).subscribe(response => {
    console.log('Data sent successfully:', response);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification sedning email address deletd succesfuly' });
    // Assuming you want to reset the form after successful submission
  
  }, error => {
    console.error('Error sending data:', error);
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

  });

}

deleteProduct(productname: string): void {
  this.currentConsideringProducts = this.currentConsideringProducts.filter(item => item.name !== productname);
  
  this.http.post(`http://127.0.0.1:8000/email/settings/remove_product`, {

    current_considering_products: this.currentConsideringProducts.map(item => item.name as string)
  }).subscribe(response => {
    console.log('Data sent successfully:', response);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
    // Assuming you want to reset the form after successful submission
  
  }, error => {
    console.error('Error sending data:', error);
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

  });

}

deleteCheckingTopic(topicName: string): void {
  this.currentCheckingTopics = this.currentCheckingTopics.filter(item => item.name !== topicName);

}


//-------------------------------------------------- ngOnInit---------------------------------------------------------------------------

ngOnInit() {
    
    // Set checkbox value
    this.sentimentShiftsForm.controls['lowerNotify'].setValue(false);
    this.sentimentShiftsForm.controls['upperNotify'].setValue(true);

    this.formGroup = new FormGroup({
      values: new FormControl<string[] | null>(null, this.emailArrayValidator([])),
      valuesTopics: new FormControl<string[] | null>(null)
    });

    this.notificationChannelsForm.patchValue({
      notiSendingEmails: this.formGroup.get('values')?.value
  });

    this.topicConfiguration.patchValue({
      newTopics:this.formGroup.get('valuesTopics')?.value

    });
    
   
  // Check if emailAccsToCheckSS control exists before subscribing to its value changes
  const emailAccsToCheckSSControl = this.sentimentShiftsForm.get('emailAccsToCheckSS');

  if (emailAccsToCheckSSControl) {
    emailAccsToCheckSSControl.valueChanges.subscribe((value: EmailAcc[] | null) => {
      if (!value || value.length === 0) {
        // Disable checkboxes and number inputs when no value is selected
        this.sentimentShiftsForm.controls['lowerNotify'].setValue(false);
        this.sentimentShiftsForm.controls['lowerNotify'].disable();
        this.sentimentShiftsForm.controls['lowerSS'].disable();
        this.sentimentShiftsForm.controls['upperNotify'].setValue(false);
        this.sentimentShiftsForm.controls['upperNotify'].disable();
        this.sentimentShiftsForm.controls['upperSS'].disable();
      } else {
        // Enable checkboxes and number inputs when a value is selected
        this.sentimentShiftsForm.controls['lowerNotify'].enable();
        this.sentimentShiftsForm.controls['lowerSS'].enable();
        this.sentimentShiftsForm.controls['upperNotify'].enable();
        this.sentimentShiftsForm.controls['upperSS'].enable();
      }
    });

    this.sentimentShiftsForm.get('ssThresholdNotiEnabled')?.valueChanges.subscribe(value => {
      if (value === false) {
        // Disable checkboxes and number inputs when no value is selected
        this.sentimentShiftsForm.get('emailAccsToCheckSS')?.disable();
        this.sentimentShiftsForm.controls['lowerNotify'].setValue(false);
        this.sentimentShiftsForm.controls['lowerNotify'].disable();
        this.sentimentShiftsForm.controls['lowerSS'].disable();
        this.sentimentShiftsForm.controls['upperNotify'].setValue(false);
        this.sentimentShiftsForm.controls['upperNotify'].disable();
        this.sentimentShiftsForm.controls['upperSS'].disable();
      }else{
        // Enable checkboxes and number inputs when a value is selected
        this.sentimentShiftsForm.get('emailAccsToCheckSS')?.enable();
        this.sentimentShiftsForm.controls['lowerNotify'].enable();
        this.sentimentShiftsForm.controls['lowerSS'].enable();
        this.sentimentShiftsForm.controls['upperNotify'].enable();
        this.sentimentShiftsForm.controls['upperSS'].enable();
      }
    });


  }

 
  


  this.dataService.getData().subscribe(data => {
    console.log(data)
    this.currentReadingEmailAccountsForIntegrationPage = data// Array of dictionaries received from the backend
    this.currentReadingEmailAccountsForNotificationPage = data.map(obj => ({ address: obj.address }));
    console.log('currentReadingEmailAccountsForNotificationPage',this.currentReadingEmailAccountsForNotificationPage)
  });

  this.dataService.getSSCheckingData().subscribe((data: { [key: string]: any }) => {
    console.log('sscheckingemails',data)
    this.currentSSCheckingEmailAccountsOfUser = data["accs_to_check_ss"].map((email: any) => ({ address: email }));// Array of email address names received from the backend
    this.sentimentShiftsForm.patchValue({
      emailAccsToCheckSS: this.currentSSCheckingEmailAccountsOfUser,
      lowerSS:data["ss_lower_bound"],
      upperSS:data["ss_upper_bound"],
      ssThresholdNotiEnabled:data["is_checking_ss"]
      
    });

    this.sentimentShiftsForm.controls['lowerNotify'].setValue(data["is_lower_checking"]);
    this.sentimentShiftsForm.controls['upperNotify'].setValue(data["is_upper_checking"]);
  });


  this.dataService.getCriticalityCheckingEmails().subscribe(data => {
    console.log('OverdueIssuescheckingemails',data)
    this.currentCritiCheckingEmailAccountsofUser = data.map(email => ({ address: email }));
    this.criticalityForm.patchValue({
      emailAccsToCheckCriticality: this.currentCritiCheckingEmailAccountsofUser
    });
  });

  this.dataService.getNotiChannelsData(1).subscribe((data: { [key: string]: any }) => {
    console.log('NotiChannels',data)
    this.currentNotiSendingEmailAccounts = data['noti_sending_emails'].map((email: any) => ({ address: email }));
    this.notificationChannelsForm.patchValue({
        emailChannelChecked: data["is_email_notifications"],
        dashboardChannelChecked:data["is_dashboard_notifications"]
    });
  });


  this.dataService.getSystemConfigurationData().subscribe((data: { [key: string]: any }) => {
    console.log('System Configurations data ',data)

    this.systemConfigurations.patchValue({
        overdueInterval: data["overdue_margin_time"],
    });
  });



   
 }
  // Define the custom validator function here
  emailValidator(email: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return Validators.email(control.value) ? null : { 'email': true };
    };
  }
  
  emailArrayValidator(emails: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!emails || !Array.isArray(emails)) {
        return null; // Return null if value is not an array
      }
  
      for (const email of emails) {
        const emailFormControl = new FormControl(email);
        const validationError = this.emailValidator(email)(emailFormControl);
        if (validationError) {
          return { 'email': true }; // Return error if any email is invalid
        }
      }
  
      return null; // Return null if all emails are valid
    };
  }
 



}
