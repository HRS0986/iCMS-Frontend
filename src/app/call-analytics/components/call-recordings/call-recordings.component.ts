import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-call-recordings',
  templateUrl: './call-recordings.component.html',
  styleUrl: './call-recordings.component.scss'
})
export class CallRecordingsComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Call Recordings"}
  ];


}
