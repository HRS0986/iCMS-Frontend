import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CallRecordingService } from '../../services/call-recording.service';
import { finalize } from 'rxjs/operators';
import { FileSelectEvent } from "primeng/fileupload";
import { ApiResponse, QueuedFile } from "../../types";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
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

  onUploadClick(event: any): void {
    const files: FileList | null = event.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const description = this.descriptionList[i];
        const date = this.dateList[i];

        // Construct the new file name
        const fileExtension = file.name.split('.').pop();
        const newFileName = `${description}_${date}.${fileExtension}`;

        // Create a new File object with the updated name
        const renamedFile = new File([file], newFileName);
        const callDetails = { description, date };

        this.uploadQueue.push({ file: renamedFile, description, date });
      }

      if (!this.isUploading) {
        this.uploadNextFile();
      }
    } else {
      console.warn('No file selected');
    }
  }

  onSelectFilesToUpload(event: FileSelectEvent) {
    this.selectedFilesCount = event.currentFiles.length;
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
        const renamedFile = new File([file], `${description}_${file.name}`);

        this.callRecordingService.uploadFile(renamedFile)
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
