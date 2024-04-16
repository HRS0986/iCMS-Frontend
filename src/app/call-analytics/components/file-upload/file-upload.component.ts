import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CallRecordingService } from '../../services/call-recording.service';
import { finalize } from 'rxjs/operators';
import { FileSelectEvent, FileUpload, FileUploadEvent } from "primeng/fileupload";
import { ApiResponse, QueuedFile } from "../../types";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @ViewChild("callUpload") callUpload!: FileUpload;

  breadcrumbItems: MenuItem[] = [
    { label: 'Call Analytics' },
    { label: 'Call Recordings' },
    { label: 'Upload Calls' }
  ];

  isUploading = false;
  uploadQueue: QueuedFile[] = [];
  selectedFilesCount = 0
  dateList: Date[] = [];
  descriptionList: string[] = [];

  constructor(private callRecordingService: CallRecordingService) {}

  onUploadClick(event: FileUploadEvent): void {
      const files= event.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
          const description = this.descriptionList[i];
          const dateTime = this.dateList[i];

          // Construct the new file name
          const fileExtension = file.name.split('.').pop();
          const newFileName = this.getFileName(dateTime, description, fileExtension!);

          // Create a new File object with the updated name
          const renamedFile = new File([file], newFileName);

          this.uploadQueue.push({ file: renamedFile, description: description, date: dateTime });
        }

        if (!this.isUploading) {
          this.uploadNextFile();
        }
      } else {
        console.warn('No file selected');
      }

  }

  getFileName(dateTime: Date, description: string, extension: string): string {
    const dateTimeString = dateTime.toISOString();
    const date = dateTimeString.split('T')[0];
    const time = dateTime.toTimeString().split(" ")[0]
    const dateString = date.split('-').join('');
    let timeString = time.split(':').join('');
    return `${dateString}_${timeString}_${description}.${extension}`;
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

  uploadNextFile(): void {
    if (this.uploadQueue.length > 0) {
      const queuedFile = this.uploadQueue.shift();
      if (queuedFile) {
        const { file, description, date } = queuedFile;
        this.isUploading = true;

        // Rename the file based on the description
        const renamedFile = new File([file], file.name);

        this.callRecordingService.uploadFile(queuedFile)
          .pipe(finalize(() => {
            this.isUploading = false;
            this.uploadNextFile();
          }))
          .subscribe(
            (response: ApiResponse) => {
              console.log('File uploaded successfully', response.message);
            },
            (error: any) => {
              console.error('Error uploading file', error);
            }
          );
      }
    }
  }

}
