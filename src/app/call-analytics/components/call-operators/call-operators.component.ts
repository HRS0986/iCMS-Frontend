import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  isSubmitted: boolean = false;

  operatorForm = new FormGroup({
    name: new FormControl("", Validators.required),
    operatorId: new FormControl("OP01"),
  })

  ngOnInit() {

  }

  onClickAddOperator(): void {
    this.isModelVisible = true;
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
}
