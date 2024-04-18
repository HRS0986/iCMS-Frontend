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
  isConfirmModalVisible: boolean = false;
  selectedOperator!: CallOperator;
  isSubmitted: boolean = false;
  callOperators: CallOperator[] = [];

  operatorForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    operatorId: new FormControl<string>(""),
  })

  ngOnInit() {
      this.callOperators = [
        {name: "John Doe", operator_id: "OP01"},
        {name: "John Doe", operator_id: "OP02"},
        {name: "John Doe", operator_id: "OP03"},
        {name: "John Doe", operator_id: "OP04"},
      ]
  }

  onClickAddOperator(): void {
    this.isModelVisible = true;
    this.operatorForm.reset();
    this.isSubmitted = false;
    this.operatorForm.controls["operatorId"].setValue("OP01");
  }

  onClickSave(): void {
    this.isSubmitted = true;
    if (this.operatorForm.valid) {
      const operator: CallOperator = {
        name: this.operatorForm.controls["name"].value!,
        operator_id: this.operatorForm.controls["operatorId"].value!,
      };
      this.callOperatorService.addOperator(operator).then(result => {
        if (result.status) {
          this.messageService.add({severity: "success", summary: "Success", detail: UserMessages.SAVED_SUCCESS});
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
  }

  onModalClose():void {
    this.isModelVisible = false;
  }

  onConfirmDelete() {

  }

  showDialogConfirmation(callOperator: CallOperator) {
    this.selectedOperator = callOperator;
    this.isConfirmModalVisible = true;
  }
}
