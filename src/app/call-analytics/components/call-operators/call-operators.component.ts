import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CallOperator } from "../../types";

@Component({
  selector: 'app-call-operators',
  templateUrl: './call-operators.component.html',
  styleUrl: './call-operators.component.scss'
})
export class CallOperatorsComponent implements OnInit{
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
    name: new FormControl("", Validators.required),
    operatorId: new FormControl(""),
  })

  ngOnInit() {
      this.callOperators = [
        {name: "John Doe", id: "OP01"},
        {name: "John Doe", id: "OP02"},
        {name: "John Doe", id: "OP03"},
        {name: "John Doe", id: "OP04"},
      ]
  }

  onClickAddOperator(): void {
    this.isModelVisible = true;
    this.operatorForm.controls["operatorId"].setValue("OP01");
  }

  onClickSave(): void {
    this.isSubmitted = true;
    if (this.operatorForm.valid) {
      this.isModelVisible = false;
      this.operatorForm.reset();
    }
  }

  onModalClose():void {
    this.operatorForm.reset();
    this.isModelVisible = false;
  }

  onConfirmDelete() {

  }

  showDialogConfirmation(callOperator: CallOperator) {
    this.selectedOperator = callOperator;
    this.isConfirmModalVisible = true;
  }
}
