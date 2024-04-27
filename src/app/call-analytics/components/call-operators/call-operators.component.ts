import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallOperatorDetails, OperatorListItem } from "../../types";
import { CallOperatorService } from "../../services/call-operator.service";
import UserMessages from "../../../shared/user-messages";
import { CallAnalyticsConfig } from "../../config";
import userMessages from "../../../shared/user-messages";

@Component({
  selector: 'app-call-operators',
  templateUrl: './call-operators.component.html',
  styleUrl: './call-operators.component.scss'
})
export class CallOperatorsComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Call Operators"}
  ];
  isModelVisible: boolean = false;
  isLoading: boolean = true;
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

  userMessages = UserMessages

  operatorForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    operatorId: new FormControl<number>(0),
  });
  data: any;
  options: any;

  constructor(private callOperatorService: CallOperatorService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.reloadDataSource();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: CallAnalyticsConfig.SentimentCategories,
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--negative-color'),
            documentStyle.getPropertyValue('--positive-color'),
            documentStyle.getPropertyValue('--neutral-color'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--yellow-400')
          ],
        }
      ]
    };

    this.options = {
      cutout: '50%',
      height: 200,
      animation: {
        animateRotate: false
      },
      overrides: {
        legend: {
          padding: 50
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,

            color: textColor
          },
        }
      }
    };
  }

  onClickAddOperator(): void {
    this.isModelVisible = true;
    this.isEditMode = false;
    this.operatorForm.reset();
    this.isSubmitted = false;
    this.callOperatorService.getNextOperatorId().then(result => {
      if (result.status) {
        console.log(result.data)
        this.operatorForm.controls["operatorId"].setValue(result.data[0]["operator_id"]);
      } else {
        console.log(result.error_message);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  onClickDetails(operator: OperatorListItem): void {
    this.isOperatorDataLoading = true;
    this.isOperatorDataLoadingError = false;
    this.isDetailsModalVisible = true;
    this.selectedOperator = operator;

    this.callOperatorService.getOperatorDetails(operator.operator_id).then(response => {
      this.operator = response.data[0] as CallOperatorDetails;
      this.isOperatorDataLoading = false;
      console.log(response.data)
    }).catch(err => {
      this.isOperatorDataLoading = false;
      this.isOperatorDataLoadingError = true;
      this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.FETCH_ERROR});
      console.log(err);
    })
  }

  onClickSave(): void {
    this.isSubmitted = true;
    if (this.operatorForm.valid) {
      const operator: OperatorListItem = {
        name: this.operatorForm.controls["name"].value!,
        operator_id: this.operatorForm.controls["operatorId"].value!,
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
    this.callOperatorService.addOperator(operator).then(result => {
      if (result.status) {
        this.messageService.add({severity: "success", summary: "Success", detail: UserMessages.SAVED_SUCCESS});
        this.reloadDataSource()
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      }
    }).catch(error => {
      this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      console.log(error);
    }).finally(() => {
      this.isModelVisible = false;
    });
  }

  updateOperator(operator: OperatorListItem) {
    this.callOperatorService.updateOperator(operator).then(result => {
      if (result.status) {
        this.messageService.add({severity: "success", summary: "Success", detail: UserMessages.SAVED_SUCCESS});
        this.reloadDataSource();
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      }
    }).catch(error => {
      this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      console.log(error);
    }).finally(() => {
      this.isModelVisible = false;
    });
  }

  onConfirmDelete() {
    this.callOperatorService.deleteOperator(this.selectedOperator.id!.toString()).then(result => {
      if (result.status) {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: UserMessages.deleteSuccess("Operator")
        });
        this.reloadDataSource();
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      }
      this.isConfirmModalVisible = false;
    })
  }

  onClickEditOperator(callOperator: OperatorListItem) {
    this.isEditMode = true;
    this.selectedOperator = callOperator;
    this.operatorForm.controls["name"].setValue(callOperator.name);
    this.operatorForm.controls["operatorId"].setValue(callOperator.operator_id);
    this.isModelVisible = true;
  }

  showDialogConfirmation(callOperator: OperatorListItem) {
    this.selectedOperator = callOperator;
    this.isConfirmModalVisible = true;
  }

  reloadDataSource() {
    this.isLoading = true;
    this.callOperatorService.getAllOperators().subscribe(result => {
      if (result.status) {
        this.callOperators = result.data;
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.FETCH_ERROR, life: 5000});
      }
      this.isLoading = false;
      this.isDataFetchError = false;
    }, error => {
      this.isLoading = false;
      this.isDataFetchError = true;
      this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.FETCH_ERROR, life: 5000});
    });
  }
}
