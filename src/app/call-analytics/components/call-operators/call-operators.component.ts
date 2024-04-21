import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallOperator } from "../../types";
import { CallOperatorService } from "../../services/call-operator.service";
import UserMessages from "../../../shared/user-messages";

@Component({
  selector: 'app-call-operators',
  templateUrl: './call-operators.component.html',
  styleUrl: './call-operators.component.scss'
})
export class CallOperatorsComponent implements OnInit {

  constructor(private callOperatorService: CallOperatorService, private messageService: MessageService) {}

  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Call Operators"}
  ];

  isModelVisible: boolean = false;
  isLoading: boolean = true;
  isConfirmModalVisible: boolean = false;
  isEditMode: boolean = false;
  selectedOperator!: CallOperator;
  isSubmitted: boolean = false;
  callOperators: CallOperator[] = [];

  operatorForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    operatorId: new FormControl<number>(0),
  });

  ngOnInit() {
      this.reloadDataSource();
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

  onClickSave(): void {
    this.isSubmitted = true;
    if (this.operatorForm.valid) {
      const operator: CallOperator = {
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

  addOperator(operator: CallOperator) {
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

  updateOperator(operator: CallOperator) {
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

  onModalClose():void {
    this.isModelVisible = false;
  }

  onConfirmDelete() {
    this.callOperatorService.deleteOperator(this.selectedOperator.id!.toString()).then(result => {
      if (result.status) {
        this.messageService.add({severity: "success", summary: "Success", detail: UserMessages.deleteSuccess("Operator")});
        this.reloadDataSource();
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.SAVED_ERROR});
      }
      this.isConfirmModalVisible = false;
    })
  }

  onClickEditOperator(callOperator: CallOperator) {
    this.isEditMode = true;
    this.selectedOperator = callOperator;
    this.operatorForm.controls["name"].setValue(callOperator.name);
    this.operatorForm.controls["operatorId"].setValue(callOperator.operator_id);
    this.isModelVisible = true;
  }

  showDialogConfirmation(callOperator: CallOperator) {
    this.selectedOperator = callOperator;
    this.isConfirmModalVisible = true;
  }

  reloadDataSource() {
    this.isLoading = true;
    this.callOperatorService.getAllOperators().subscribe(result => {
      if (result.status) {
        this.callOperators = result.data;
      } else {
        this.messageService.add({severity: "error", summary: "Error", detail: UserMessages.FETCH_ERROR});
      }
      this.isLoading = false;
    });
  }
}
