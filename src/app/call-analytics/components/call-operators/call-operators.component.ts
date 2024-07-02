import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallOperatorDetails, OperatorListItem } from '../../types';
import { CallOperatorService } from '../../services/call-operator.service';
import UserMessages from '../../../shared/user-messages';
import { CallAnalyticsConfig } from '../../config';

@Component({
  selector: 'app-call-operators',
  templateUrl: './call-operators.component.html',
  styleUrl: './call-operators.component.scss',
})
export class CallOperatorsComponent implements OnInit {
  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics', routerLink: '/call/dashboard' },
    { label: 'Call Operators' },
  ];

  isModelVisible: boolean = false;
  isLoading: boolean = true;
  isNoData: boolean = false;
  isOperatorDataLoading: boolean = false;
  isOperatorDataLoadingError: boolean = false;
  isConfirmModalVisible: boolean = false;
  isEditMode: boolean = false;
  selectedOperator!: OperatorListItem;
  isSubmitted: boolean = false;
  isDataFetchError: boolean = false;
  isDetailsModalVisible: boolean = false;
  callOperators: OperatorListItem[] = [];
  operator!: CallOperatorDetails;
  sentiments: any[] = [];
  statusColors!: { [key: string]: string };

  userMessages = UserMessages;

  operatorForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    operatorId: new FormControl<number>(0),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  data: any;
  options: any;

  constructor(
    private callOperatorService: CallOperatorService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.reloadDataSource();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.statusColors = {
      Positive: documentStyle.getPropertyValue('--positive-color'),
      Negative: documentStyle.getPropertyValue('--negative-color'),
      Neutral: documentStyle.getPropertyValue('--neutral-color'),
    };

    this.data = {
      labels: CallAnalyticsConfig.SentimentCategories,
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--positive-color'),
            documentStyle.getPropertyValue('--negative-color'),
            documentStyle.getPropertyValue('--neutral-color'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--positive-hover-color'),
            documentStyle.getPropertyValue('--negative-hover-color'),
            documentStyle.getPropertyValue('--neutral-hover-color'),
          ],
        },
      ],
    };

    this.options = {
      cutout: '50%',
      height: 200,
      animation: {
        animateRotate: false,
      },
      overrides: {
        legend: {
          padding: 50,
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,

            color: textColor,
          },
        },
      },
    };
  }

  onClickAddOperator(): void {
    this.isModelVisible = true;
    this.isEditMode = false;
    this.operatorForm.reset();
    this.isSubmitted = false;
    this.callOperatorService
      .getNextOperatorId()
      .then((result) => {
        if (result.status) {
          console.log(result.data);
          this.operatorForm.controls['operatorId'].setValue(
            result.data[0]['operator_id']
          );
        } else {
          console.log(result.error_message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClickDetails(operator: OperatorListItem): void {
    this.isOperatorDataLoading = true;
    this.isOperatorDataLoadingError = false;
    this.isDetailsModalVisible = true;
    this.selectedOperator = operator;

    this.callOperatorService
      .getOperatorDetails(operator.operator_id)
      .then((response) => {
        this.isNoData =
          response.data.length == 0 ||
          response.data[0] == null ||
          response.data[0] == undefined;
        if (!this.isNoData) {
          this.operator = response.data[0] as CallOperatorDetails;
          console.log(response.data);
          this.data.datasets[0].data = [
            this.operator.positive_calls,
            this.operator.negative_calls,
            this.operator.neutral_calls,
          ];
          console.log(response.data);
        }
        this.isOperatorDataLoading = false;
      })
      .catch((err) => {
        this.isOperatorDataLoading = false;
        this.isOperatorDataLoadingError = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.FETCH_ERROR,
        });
        console.log(err);
      });
  }

  onClickSave(): void {
    this.isSubmitted = true;
    if (this.operatorForm.valid) {
      const operator: OperatorListItem = {
        name: this.operatorForm.controls['name'].value!,
        operator_id: this.operatorForm.controls['operatorId'].value!,
        email: this.operatorForm.controls['email'].value!,
        password: this.operatorForm.controls['password'].value!,
      };
      if (this.isEditMode) {
        operator.id = this.selectedOperator.id;
        this.updateOperator(operator);
      } else {
        this.addOperator(operator);
      }
    }
  }

  addOperator(operator: OperatorListItem) {
    operator.id = " ";
    this.callOperatorService
      .addOperator(operator)
      .then((result) => {
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: UserMessages.SAVED_SUCCESS,
          });
          this.reloadDataSource();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.SAVED_ERROR,
          });
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.SAVED_ERROR,
        });
        console.log(error);
      })
      .finally(() => {
        this.isModelVisible = false;
      });
  }

  updateOperator(operator: OperatorListItem) {
    this.callOperatorService
      .updateOperator(operator)
      .then((result) => {
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: UserMessages.SAVED_SUCCESS,
          });
          this.reloadDataSource();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.SAVED_ERROR,
          });
        }
      })
      .catch((error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.SAVED_ERROR,
        });
        console.log(error);
      })
      .finally(() => {
        this.isModelVisible = false;
      });
  }

  onConfirmDelete() {
    this.callOperatorService
      .deleteOperator(this.selectedOperator.id!.toString())
      .then((result) => {
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: UserMessages.deleteSuccess('Operator'),
          });
          this.reloadDataSource();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.SAVED_ERROR,
          });
        }
        this.isConfirmModalVisible = false;
      });
  }

  onClickEditOperator(callOperator: OperatorListItem) {
    this.isEditMode = true;
    this.selectedOperator = callOperator;
    this.operatorForm.controls['name'].setValue(callOperator.name);
    this.operatorForm.controls['operatorId'].setValue(callOperator.operator_id);
    this.operatorForm.controls['email'].setValue(callOperator.email);
    if (this.isEditMode) {
      this.operatorForm.controls['password'].setValue(' ');
    } else {
      this.operatorForm.controls['password'].setValue(callOperator.password!);
    }
    this.isModelVisible = true;
  }

  getAverageSentiment(operatorId: number): string {
    let sentimentsData = this.sentiments.find((item) => item._id == operatorId);
    if (sentimentsData) {
      if (
        sentimentsData.positive_calls > sentimentsData.negative_calls &&
        sentimentsData.positive_calls > sentimentsData.neutral_calls
      ) {
        return 'Positive';
      } else if (
        sentimentsData.negative_calls > sentimentsData.positive_calls &&
        sentimentsData.negative_calls > sentimentsData.neutral_calls
      ) {
        return 'Negative';
      } else if (
        sentimentsData.neutral_calls > sentimentsData.positive_calls &&
        sentimentsData.neutral_calls > sentimentsData.negative_calls
      ) {
        return 'Neutral';
      }
      return 'Mixed';
    }
    return 'Not handled any call yet';
  }

  showDialogConfirmation(callOperator: OperatorListItem) {
    this.selectedOperator = callOperator;
    this.isConfirmModalVisible = true;
  }

  reloadDataSource() {
    this.isLoading = true;
    this.callOperatorService
      .getAllCallOperatorSentiments()
      .then((response) => {
        if (response.status) {
          this.sentiments = response.data;
        } else {
          console.log(response.error_message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});

    this.callOperatorService.getAllOperators().subscribe(
      (result) => {
        if (result.status) {
          this.callOperators = result.data;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.FETCH_ERROR,
            life: 5000,
          });
        }
        this.isLoading = false;
        this.isDataFetchError = false;
      },
      (error) => {
        this.isLoading = false;
        this.isDataFetchError = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: UserMessages.FETCH_ERROR,
          life: 5000,
        });
      }
    );
  }

  getEmailError(): string {
    if (this.operatorForm.controls['email'].hasError('email')) {
      return "Invalid email address.";
    }
    if (this.operatorForm.controls['email'].hasError('required')) {
      return "Operator email is required.";
    }
    return '';
  }

  getNameError(): string {
    if (this.operatorForm.controls['name'].hasError('required')) {
      return "Operator name is required.";
    }
    return '';
  }

  getPasswordError(): string {
    if (this.operatorForm.controls['password'].hasError('required')) {
      return "Operator password is required.";
    }
    return '';
  }
}
