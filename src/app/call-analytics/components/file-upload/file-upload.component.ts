import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CallRecordingService } from '../../services/call-recording.service';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { OperatorListItem, QueuedFile } from '../../types';
import { CallOperatorService } from '../../services/call-operator.service';
import UserMessages from '../../../shared/user-messages';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [ConfirmationService],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('callUpload') callUpload!: FileUpload;

  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics', routerLink: '/call/dashboard' },
    { label: 'Call Recordings', routerLink: '/call/recordings' },
    { label: 'Upload Calls' },
  ];

  files: any[] = [];
  selectedFilesCount = 0;
  dateList: Date[] = [];
  descriptionList: string[] = [];
  operatorsList: number[] = [];
  callOperators: OperatorListItem[] = [];
  isSubmitted = false;
  visible: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private callRecordingService: CallRecordingService,
    private callOperatorService: CallOperatorService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.callOperatorService.getAllOperators().subscribe((data) => {
      this.callOperators = data.data;
    });
  }

  onUploadClick(event: any): void {
    this.files = event.files;
    if (this.files && this.files.length > 0) {
      let queuedFiles = this.createUploadQueue(this.files);
      this.callRecordingService
        .uploadFiles(queuedFiles)
        .then((response) => {
          this.clearFiles();
          if (response!.status) {
            this.visible = true;
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: UserMessages.UPLOAD_ERROR,
            });
          }
        })
        .catch(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: UserMessages.UPLOAD_ERROR,
          });
        });
    } else {
      console.warn('No file selected');
    }
  }

  createUploadQueue(files: any[]): QueuedFile[] {
    let queuedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = this.files[i];
      const description = this.descriptionList[i];
      const dateTime = this.dateList[i];
      const operatorId = this.operatorsList[i];
      const fileExtension = file.name.split('.').pop();
      const newFileName = this.getFileName(
        dateTime,
        description,
        fileExtension!,
        operatorId
      );
      const renamedFile = new File([file], newFileName);

      const queuedFile: QueuedFile = {
        file: renamedFile,
        description: description,
        date: dateTime,
        operatorId: operatorId,
      };
      queuedFiles.push(queuedFile);
    }
    return queuedFiles;
  }

  clearFiles() {
    this.selectedFilesCount = 0;
    this.descriptionList.length = 0;
    this.dateList.length = 0;
    this.files = [];
    this.callUpload.clear();
  }

  getFileName(
    dateTime: Date,
    description: string,
    extension: string,
    operatorId: number
  ): string {
    const dateTimeString = dateTime.toISOString();
    const date = dateTimeString.split('T')[0];
    const time = dateTime.toTimeString().split(' ')[0];
    const dateString = date.split('-').join('');
    let timeString = time.split(':').join('');
    return `${operatorId}_${dateString}_${timeString}_${description}.${extension}`;
  }

  handleBeforeUpload(event: any): void {
    this.isSubmitted = true;
    if (!this.isAllFieldsValid()) {
      this.confirmationService.confirm({
        message: 'Please fill all required fields to upload',
        icon: 'pi pi-info-circle',
        header: 'Warning',
        acceptLabel: 'OK',
        acceptIcon: 'none',
        acceptButtonStyleClass: 'p-button-primary p-button-sm',
        rejectVisible: false, // Hide the "No" button
        defaultFocus: 'accept', // Focus on the accept button by default
      });
    } else {
      this.onUploadClick(event);
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
      if (
        !this.descriptionList[i] ||
        !this.operatorsList[i] ||
        !this.dateList[i]
      ) {
        return false;
      }
    }
    return true;
  }
}
