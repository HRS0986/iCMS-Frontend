import { Component, Input } from '@angular/core';
import { Thread } from '../../interfaces/threads';

@Component({
  selector: 'app-thread-card-list-type',
  templateUrl: './thread-card-list-type.component.html',
  styleUrl: './thread-card-list-type.component.scss'
})
export class ThreadCardListTypeComponent {
  @Input() threadData!: Thread;
  errorMessage = "";
  loading = false;
  rowsPerPage = 10;
  dialogVisible = false;

  load() {
    this.dialogVisible = true;
  }
}
