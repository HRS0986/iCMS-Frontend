import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from './settings.data.service';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { DeleteNotiSendingEmail, DeleteReadingEmail, EmailAcc, EmailAccWithNickName, EmailINtegrationPostResponseMessage, GetEditingEmailResponse, GetNewIntergratingEmailID, NotiSendingChannelsRecord, PostEditingEmail, PostNewIntegratingEmail, PostingCriticalityData, PostingNotiSendingChannelsRecord, PostingOverdueIssuesData, SSShiftData, SendSystemConfigData, UserRoleResponse } from '../../interfaces/settings';
import { forbiddenEmailValidator } from '../../validators/custom-validators';
import { ChangeDetectorRef } from '@angular/core';
import { ToastModule } from 'primeng/toast';





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
  editEmailAccVisible: boolean = false


  //-------------------------------------------------- arrays---------------------------------------------------------------------------

  isShowingAdminFeatures: boolean = true;

  newlyIntegratingEmailID!: number 
  currentSSCheckingEmailAccountsOfUser = [
    {address: 'uharischandra12@gmail.com'}];
  

  currentCritiCheckingEmailAccountsofUser: EmailAcc[] = [
    { address: 'johndoe@gmail.com'}
  ];

  currentOVerdueCheckingAccountsofUser: EmailAcc[] = [
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
  
  isVisibleClientSecretValidation: boolean = false

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

  overdueIssuesForm =this.fb.group({
    emailAccsToCheckOverdueIssues:new FormControl<EmailAcc[] | null>(this.currentOVerdueCheckingAccountsofUser)
  });

  notificationChannelsForm = this.fb.group({
    emailChannelChecked: [false],
    dashboardChannelChecked: [true],
    notiSendingEmails:new FormControl<string[] | null>(null, this.emailArrayValidator([]))
  });
   
  

  newIntergratingEmailIDMessages: Message[] =[{ severity: 'info', detail: 'Use the following redirect url when setting up the gmail API for the following newly intergrating email account. ' }]
  emailInetgration = this.fb.group({
    newEmailAccount: ['',[Validators.email, Validators.required, forbiddenEmailValidator(this.currentReadingEmailAccountsForIntegrationPage.map(item => item.address))]],
    newEmailNickname:['',[Validators.required], forbiddenEmailValidator(this.currentReadingEmailAccountsForIntegrationPage.map(item => item.nickname))],
    newClientSecret: ['',[Validators.required]]
  });


  emailEdit = this.fb.group({
    newEmailAccount: ['',[Validators.email, Validators.required, forbiddenEmailValidator(this.currentReadingEmailAccountsForIntegrationPage.map(item => item.address))]],
    newEmailNickname:['',[Validators.required], forbiddenEmailValidator(this.currentReadingEmailAccountsForIntegrationPage.map(item => item.nickname))],
    newClientSecret: ['',[Validators.required]]
  });

  systemConfigurations = this.fb.group({
    overdueInterval: 14
    // newProductInputs: new FormControl<string[] | null>(null)


  });
    

  topicConfiguration = this.fb.group({
    newTopics:[[]]
  });


  // constructor
  constructor(private fb: FormBuilder, private http: HttpClient, private dataService: DataService, private messageService: MessageService, private authService: AuthenticationService, private cd: ChangeDetectorRef) {}

  
  //-------------------------------------------------- onSubmit functions---------------------------------------------------------------------------

  onSubmitSentimentShifts(): void {

    // console.log(this.sentimentShiftsForm.value);
    const email_Accs_To_CheckSS = this.sentimentShiftsForm.value.emailAccsToCheckSS;
    console.log(email_Accs_To_CheckSS);

    let formData: SSShiftData = {
      accs_to_check_ss: email_Accs_To_CheckSS ? email_Accs_To_CheckSS : [],
      ss_lower_bound: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.lowerSS ?? 0 : 0,
      ss_upper_bound: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.upperSS ?? 0 : 0,
      is_checking_ss: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.ssThresholdNotiEnabled ?? true : true,
      is_lower_checking: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.lowerNotify ?? false : false,
      is_upper_checking: email_Accs_To_CheckSS ? this.sentimentShiftsForm.value.upperNotify ?? false : false
    };

    console.log("sending SSSHIFT FORMDATA", formData)
    this.authService.getIdToken().subscribe((token: any) => {
      this.dataService.postSSShiftData(token, formData).subscribe(response => {
        console.log('Trigger Data sent successfully:', response);
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sentiment shifts configuration updated succesfuly!' });
  
        this.getSentimentShiftDataOfUser()
      }, error => {
        console.error('Error sending data:', error);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
      });
    });
  

    } 


  

  onSubmitCriticality(): void {
    //console.log(this.criticalityForm.value);
    const email_Accs_To_Criticality = this.criticalityForm.value.emailAccsToCheckCriticality;

    let formData: PostingCriticalityData = {
      accs_to_check_criticality: email_Accs_To_Criticality ? email_Accs_To_Criticality.map((item: any) => item.address) : [],
    }
    
    console.log("PostingCriticalityData", formData)
    console.log("accs_to_check_criticality", formData.accs_to_check_criticality)

    this.authService.getIdToken().subscribe((token: any) => {
      this.dataService.postCriticalityData(token, formData).subscribe(response => {
        console.log('Trigger Data sent successfully:', response);
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Criticality checking emails updated succesfuly!' });
  
        this.getCiticalityCheckingDataOfUser()
      }, error => {
        console.error('Error sending data:', error);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
      });
    });

  }


  onSubmitOverdueIssues(): void {
    //console.log(this.overdueIssuesForm.value);
    const email_Accs_To_Overdue_Issues = this.overdueIssuesForm.value.emailAccsToCheckOverdueIssues;
    console.log("email_Accs_To_Overdue_Issues",email_Accs_To_Overdue_Issues)
    let formData: PostingOverdueIssuesData = {
      accs_to_check_overdue_emails: email_Accs_To_Overdue_Issues ? email_Accs_To_Overdue_Issues.map((item: any) => item.address) : [],
    }

    console.log(formData.accs_to_check_overdue_emails)
    this.authService.getIdToken().subscribe((token: any) => {
      this.dataService.postIssuesOverdueData(token, formData).subscribe(response => {
        console.log('Trigger Data sent successfully:', response);
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Overdue checking emails updated succesfuly!' });
  
        this.getOverdueIssuesCheckingDataOfUser()

      }, error => {
        console.error('Error sending data:', error);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured when updating overdue issue checking emails' });
      });

    });

  }


  //notification channels submit

  onSubmitNotificationChannels(): void {
    console.log(this.notificationChannelsForm.value);


    const formData: PostingNotiSendingChannelsRecord = {
      is_email_notifications:this.notificationChannelsForm.value.emailChannelChecked || false,
      is_dashboard_notifications: this.notificationChannelsForm.value.dashboardChannelChecked || false,
      noti_sending_emails:this.notificationChannelsForm.value.notiSendingEmails || []
    }
    
    this.authService.getIdToken().subscribe((token: any) => {
      this.dataService.postNotificationChannelsData(token, formData).subscribe(response => {
        console.log('Notification channels Data sent successfully:', response);
  
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification channels configuration updated succesfuly!' });
  
  
        this.notificationChannelsForm.reset();
        this.getNotiChannelsDataForUser()
      }, error => {
        console.error('Error sending data:', error);
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
  
      });
    });



    
    }
    
  onSubmitSystemConfigurations(): void {
      console.log(this.systemConfigurations.value);
  
  
      const formData: SendSystemConfigData = {
        overdue_margin_time:this.systemConfigurations.value.overdueInterval || 14
        // newProducts:this.systemConfigurations.value.newProductInputs

      }
  
      this.dataService.postSystemConfigData(formData).subscribe(response => {
        console.log('Notification configurations Data sent successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Overdue time updated succesfully!'}); 
        this.getSystemConfigDataForCompany()      
      }, error => {
        this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
        console.error('Error sending data:', error);
      });
  
      
      }
  
  onSubmitEmailEdit(): void {
    //console.log(this.emailEdit.value);
    const newEmailName = this.emailEdit.get('newEmailAccount')?.value;
    const newEmailNName = this.emailEdit.get('newEmailNickname')?.value;
    const newEmailClientSecret = this.emailEdit.get('newClientSecret')?.value;


    if (newEmailName && newEmailNName) { 
          //console.log(newEmailName);
          
          const sendingData: PostEditingEmail = {
            oldEmailAddress:this.selectedReadingEmail,
            editedEmailAddress: newEmailName,
            nickName: newEmailNName,
            clientSecret: newEmailClientSecret || ""
          }

          console.log(sendingData)

          // Send the new email data to FastAPI
          this.dataService.postEmailEdit(sendingData).subscribe(response => {
            console.log('Data sent successfully:', response);
            this.editEmailAccVisible = false
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email info edited succesfuly!' });
            // Assuming you want to reset the form after successful submission
            this.emailEdit.reset();
            this.getReadingEmailAccountsForSettingsPages()
          }, error => {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
            console.error('Error sending data:', error);
          });
                
      
  } else {
      console.log("No new topics entered.");
  }
  }   



  onSubmitEmailIntegration(): void {
    console.log(this.emailInetgration.value);
    const newEmailName = this.emailInetgration.get('newEmailAccount')?.value;
    const newEmailNName = this.emailInetgration.get('newEmailNickname')?.value;
    const newEmailClientSecret = this.emailInetgration.get('newClientSecret')?.value;


    if (newEmailName && newEmailNName) { 
          console.log(newEmailName);
        
          const sendingData: PostNewIntegratingEmail = {
            emailID: this.newlyIntegratingEmailID,
            emailAddress: newEmailName,
            nickName: newEmailNName,
            clientSecret: newEmailClientSecret || ""
          }
          // Send the new email data to FastAPI
          this.dataService.postEmailIntegration(sendingData).subscribe((response: EmailINtegrationPostResponseMessage) => {
            console.log('Data sent successfully:', response);
            if (response.message == "intergration complete"){
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New email integrated succesfuly!' });
              this.emailInetgration.reset();
              this.getReadingEmailAccountsForSettingsPages()
            }else{
              this.isVisibleClientSecretValidation = true
            }

          }, error => {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
            console.error('Error sending data:', error);
          });
                
      
  } else {
      console.log("No new topics entered.");
  }
  }

  // topic configuration submit

  // onSubmitTopicConfiguration(): void {
  //   //console.log(this.topicConfiguration.value);
  //   const newTopicsVal = this.topicConfiguration.get('newTopics')?.value as unknown as any[];
  //   if (newTopicsVal) { // Check if newTopicsVal is not null or undefined
  //     for (const item of newTopicsVal) {
  //         console.log(item);
  //         // push the new topic into the currentCheckingTopics
  //         this.currentCheckingTopics.push({ name: item });
  //         this.topicConfiguration.reset();
          
          
  //     }
  // } else {
  //     console.log("No new topics entered.");
  // }
    
  // }

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

  // ConfirmProductDelete():void{
  //   this.deleteProduct(this.selectedProduct)
  //   this.visibleProductDeleting = false;

  // }
  showEmailAccEditPopUp(emailAddress: any): void {
    this.selectedReadingEmail = emailAddress;
    
    this.dataService.getEmailEditData(this.selectedReadingEmail).subscribe((data: GetEditingEmailResponse) => {
  
      console.log('Data received:', data);
      this.emailEdit.patchValue({
        newClientSecret: data.clientSecret,
        newEmailAccount: data.emailAddress,
        newEmailNickname: data.nickName
      
      });
      // this.markFormControlsAsTouchedAndDirty();
      // this.cd.detectChanges();
      
      console.log('Form values after patch:', this.emailEdit.value);
      console.log('New Client Secret:', this.emailEdit.get('newClientSecret')?.value);
  

      
    });
    
    // this.markFormControlsAsTouchedAndDirty();
    // this.cd.detectChanges();
    this.editEmailAccVisible = true;

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

  const sendingData: DeleteReadingEmail = {removing_email:email}

  this.dataService.deleteReadingEmail(sendingData).subscribe(response => {
      console.log('Data sent successfully:', response);

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reading email deleted succesfully' });

      this.getReadingEmailAccountsForSettingsPages()
      
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

    });
}

deleteNotiSendingEmail(emailName: string): void {
  this.currentNotiSendingEmailAccounts = this.currentNotiSendingEmailAccounts.filter(item => item.address !== emailName);

  const sendingData: DeleteNotiSendingEmail = {
       noti_sending_emails: this.currentNotiSendingEmailAccounts.map(item => item.address as string)
  }


  this.authService.getIdToken().subscribe((token: any) => {
    this.dataService.deleteNotiSendingEmail(token, sendingData).subscribe(response => {
      console.log('Data sent successfully:', response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notification sedning email address deletd succesfuly' });
      this.getNotiChannelsDataForUser()
    }, error => {
      console.error('Error sending data:', error);
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });
  
    });
  });


}

// deleteProduct(productname: string): void {
//   this.currentConsideringProducts = this.currentConsideringProducts.filter(item => item.name !== productname);
  
//   this.http.post(`http://127.0.0.1:8000/email/settings/remove_product`, {

//     current_considering_products: this.currentConsideringProducts.map(item => item.name as string)
//   }).subscribe(response => {
//     console.log('Data sent successfully:', response);
//     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
//     // Assuming you want to reset the form after successful submission
  
//   }, error => {
//     console.error('Error sending data:', error);
//     this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Error occured' });

//   });

// }

// deleteCheckingTopic(topicName: string): void {
//   this.currentCheckingTopics = this.currentCheckingTopics.filter(item => item.name !== topicName);

// }


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

   this.getUserRoleDataForUser()
  // get reading emails for settings page tabs
  this.getReadingEmailAccountsForSettingsPages()

  // geting sentiment shift checking data for each user
  this.getSentimentShiftDataOfUser()


  // geting criticality checking data for each user
  this.getCiticalityCheckingDataOfUser()
 
    
  // geting overdue issues checking emails for the user
  this.getOverdueIssuesCheckingDataOfUser()


  // geting notification channels data for the user
  this.getNotiChannelsDataForUser()


  // getting system config data for the company
  this.getSystemConfigDataForCompany()
  
  // getting the email ID for the newly integrating email account
  this.getNewIntergratingEmailID()

 }



 getUserRoleDataForUser(): void {
  this.authService.getIdToken().subscribe((token: string) => {
    this.dataService.getUserRoleData(token).subscribe((data: UserRoleResponse) => {
      console.log('user role data', data);
      this.isShowingAdminFeatures = data.isAdmin;
    },
    error => {
      console.error('Error fetching user role data:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching user role data.' });
    }
  );
  });
}

getReadingEmailAccountsForSettingsPages(): void {
  
  this.dataService.getData().subscribe(
    (data: EmailAccWithNickName[]) => {
      console.log(data);
      this.currentReadingEmailAccountsForIntegrationPage = data; // Array of dictionaries received from the backend
      this.currentReadingEmailAccountsForNotificationPage = data.map(obj => ({ address: obj.address }));
      console.log('currentReadingEmailAccountsForNotificationPage', this.currentReadingEmailAccountsForNotificationPage);
    },
    error => {
      console.error('Error fetching reading email data:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching reading email data.' });
    }
  );
  

}


getSentimentShiftDataOfUser(): void {

  this.authService.getIdToken().subscribe((token: string) => {
    this.dataService.getSSCheckingData(token).subscribe((data: SSShiftData) => {
      console.log('sscheckingemails',data)
      this.currentSSCheckingEmailAccountsOfUser = data.accs_to_check_ss
      this.sentimentShiftsForm.patchValue({
        emailAccsToCheckSS: this.currentSSCheckingEmailAccountsOfUser,
        lowerSS:data.ss_lower_bound,
        upperSS:data.ss_upper_bound,
        ssThresholdNotiEnabled:data.is_checking_ss
        
      });
  
      this.sentimentShiftsForm.controls['lowerNotify'].setValue(data.is_lower_checking);
      this.sentimentShiftsForm.controls['upperNotify'].setValue(data.is_upper_checking);
    },
    error => {
      console.error('Error fetching sentiment shifts data:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching current sentiment shifts data.' });
    }
  );
  });

}



getCiticalityCheckingDataOfUser(): void {
  this.authService.getIdToken().subscribe((token: string) => {
    this.dataService.getCriticalityCheckingEmails(token).subscribe((data: EmailAcc[]) => {
      console.log('Criticality checking emails',data)
      this.currentCritiCheckingEmailAccountsofUser = data
      this.criticalityForm.patchValue({
        emailAccsToCheckCriticality: this.currentCritiCheckingEmailAccountsofUser
      });
    },
    error => {
      console.error('Error fetching criticality checking data:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching criticality checking data.' });
    }
  );
  });
}

getNewIntergratingEmailID(): void{

  this.dataService.getNewIntegratingEmailID().subscribe((data: GetNewIntergratingEmailID) => {
    console.log('OverdueIssues checking emails',data)
    this.newlyIntegratingEmailID = data.emailID
    // let msgDetail = `Use the following redirect url when setting up the gmail API for the following newly intergrating email account \n \n http://127.0.0.1:8000/email/info_and_retrieval/callback?id=${this.newlyIntegratingEmailID}`
    let msgDetail = `Use the following redirect url when setting up the gmail API for the following newly intergrating email account \n \n ${this.dataService.baseUrl}=${this.newlyIntegratingEmailID}`
    this.newIntergratingEmailIDMessages = [{ severity: 'info', detail:  msgDetail}]

  },
  error => {
    console.error('Error fetching new intergrating email id', error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching new intergrating email id.' });
  }
);
  
}

getOverdueIssuesCheckingDataOfUser(): void{
  this.authService.getIdToken().subscribe((token: string) => {
    this.dataService.getOverdueIssuesCheckingEmails(token).subscribe((data: EmailAcc[]) => {
      console.log('OverdueIssues checking emails',data)
      this.currentOVerdueCheckingAccountsofUser = data
      this.overdueIssuesForm.patchValue({
        emailAccsToCheckOverdueIssues: this.currentOVerdueCheckingAccountsofUser
      });
    },
    error => {
      console.error('Error fetching overdue issues checking data', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching overdue issues checking emails.' });
    }
  );
  });

}


getNotiChannelsDataForUser(): void {
  this.authService.getIdToken().subscribe((token: string) => {
    this.dataService.getNotiChannelsData(token).subscribe((data: NotiSendingChannelsRecord) => {
      console.log('NotiChannels',data)
      this.currentNotiSendingEmailAccounts = data.noti_sending_emails
      this.notificationChannelsForm.patchValue({
          emailChannelChecked: data.is_email_notifications,
          dashboardChannelChecked:data.is_dashboard_notifications
      });
    },
    error => {
      console.error('Error fetching notification channels data', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching notification channels data.' });
    }
  );
  });
}


getSystemConfigDataForCompany(): void {
  this.dataService.getSystemConfigurationData().subscribe((data: SendSystemConfigData) => {
    console.log('System Configurations data ',data)

    this.systemConfigurations.patchValue({
        overdueInterval: data.overdue_margin_time,
    });
  },
  error => {
    console.error('Error fetching system config data', error);
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while fetching system config data.' });
  }
);
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
 
  private markFormControlsAsTouchedAndDirty(): void {
    Object.keys(this.emailEdit.controls).forEach(controlName => {
      const control = this.emailEdit.get(controlName);
      control?.markAsTouched();
      control?.markAsDirty();
    });
    this.cd.detectChanges();
  }


}
