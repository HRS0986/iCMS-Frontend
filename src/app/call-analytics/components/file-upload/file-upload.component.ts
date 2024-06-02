import {Component, OnInit, QueryList, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CallRecordingService } from '../../services/call-recording.service';
import { finalize,catchError } from 'rxjs/operators';
import { FileSelectEvent, FileUpload, FileUploadEvent } from "primeng/fileupload";
import { OperatorListItem,} from "../../types";
import { CallOperatorService } from "../../services/call-operator.service";
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin, of } from 'rxjs';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FileUploadComponent implements OnInit {
  @ViewChild("callUpload") callUpload!: FileUpload;

  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Call Recordings' },
    { label: 'Upload Calls' }
  ];
  files: any[] = [];
  isUploading = false;
  uploadQueue: QueuedFile[] = [];
  selectedFilesCount = 0
  dateList: Date[] = [];
  descriptionList: string[] = [];
  operatorsList: number[] = [];
  callOperators: OperatorListItem[] = [];
  unfilled : number = -1;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private callRecordingService: CallRecordingService, private callOperatorService: CallOperatorService) {}

  ngOnInit() {
    this.callOperatorService.getAllOperators().subscribe((data) => {
      this.callOperators = data.data;
    });
  }
  // component.ts
  errorPopUp(event: any) {
    console.log(event)

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Please fill in all details for the Audio File No ' + (this.unfilled + 1),
        icon: 'pi pi-info-circle',  // You can remove this line if you don't need the icon
        acceptLabel: 'OK',  // Change the label to "OK"
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        rejectVisible: false,  // Hide the "No" button
        accept: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Try Again',
            detail: 'Check File No ' + (this.unfilled + 1),
            life: 3000
          });
        },
        defaultFocus: 'accept', // Focus on the accept button by default
      });

  }


  onUploadClick(event: any): void {
    this.files = event.files;
    console.log(event);
    if (this.files && this.files.length > 0) {
      if (this.isAllFieldsValid()) {
        let queuedFiles = []; // Array to store QueuedFile instances
        const uploadObservables = []; // Array to hold all upload observables

        for (let i = 0; i < this.files.length; i++) {
          const file: File = this.files[i];
          const description = this.descriptionList[i];
          const dateTime = this.dateList[i];
          const operatorId = this.operatorsList[i];

          // Construct the new file name
          const fileExtension = file.name.split('.').pop();
          const newFileName = this.getFileName(dateTime, description, fileExtension!, operatorId);

          // Create a new File object with the updated name
          const renamedFile = new File([file], newFileName);

          // Create a QueuedFile instance with the file
          const queuedFile = new QueuedFile(renamedFile, description, dateTime, operatorId);

          queuedFiles.push(queuedFile);
        }

        console.log(queuedFiles); // This will log the array of QueuedFile instances

        // Pass the queuedFiles array to the uploadFile method
        const uploadObservable = this.callRecordingService.uploadFile(queuedFiles)
          .pipe(
            catchError(error => {
              console.error('Error uploading file:', error);
              return of(null); // Continue with other uploads even if one fails
            })
          );
        uploadObservables.push(uploadObservable);
        // Use forkJoin to execute all upload observables in parallel
        forkJoin(uploadObservables).pipe(
          finalize(() => {
            this.isUploading = false;
            this.uploadQueue = [];
            this.messageService.add({ severity: 'success', summary: 'Upload Complete', detail: 'All files uploaded successfully!', life: 3000 });

          })
        ).subscribe();
        this.clearFiles();
      } else {
        this.errorPopUp(event);
        event.preventDefault();
      }
    } else {
      console.warn('No file selected');
    }
  }

  clearFiles() {
    this.selectedFilesCount = 0;
    this.descriptionList.length = 0;
    this.dateList.length = 0;
    this.files = [];
    this.callUpload.clear();
  }

  getFileName(dateTime: Date, description: string, extension: string, operatorId: number): string {
    const dateTimeString = dateTime.toISOString();
    const date = dateTimeString.split('T')[0];
    const time = dateTime.toTimeString().split(" ")[0]
    const dateString = date.split('-').join('');
    let timeString = time.split(':').join('');
    return `${operatorId}_${dateString}_${timeString}_${description}.${extension}`;
  }
  handleBeforeUpload(event: any): void {
    if (!this.isAllFieldsValid()) {
      this.errorPopUp(event)
      event.preventDefault(); // Prevent the default upload behavior
    }
    else {
      this.onUploadClick(event)
    }
  }

  onSelectFilesToUpload(event: FileSelectEvent) {
    this.selectedFilesCount = event.currentFiles.length;
    for (let i = 0; i < this.selectedFilesCount; i++) {
      this.dateList[i] = new Date();
    }
  }

  onCancel() {
    this.selectedFilesCount = 0;
    this.descriptionList.length = 0;
    this.dateList.length = 0;
  }
  isAllFieldsValid(): boolean {
    for (let i = 0; i < this.selectedFilesCount; i++) {
      if (!this.descriptionList[i] || !this.operatorsList[i] || !this.dateList[i]) {
        this.unfilled = i;
        return false;
      }
    }
    return true;
  }

  protected readonly event = event;
}
class QueuedFile {
  file: File;
  description: string;
  date: Date;
  operatorId: number;

  constructor(file: File, description: string, date: Date, operatorId: number) {
    this.file = file;
    this.description = description;
    this.date = date;
    this.operatorId = operatorId;
  }
}

