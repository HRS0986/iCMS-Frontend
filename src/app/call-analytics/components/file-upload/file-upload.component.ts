import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CallRecordingService } from '../../services/call-recording.service';
import { finalize } from 'rxjs/operators';

interface ApiResponse {
  message: string;
  // Add other properties as needed
}

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

  constructor(private fileUploadService: CallRecordingService) {}

  onFileSelected(event: any): void {
    const files: FileList | null = event.files;

    if (files && files.length > 0) {
      const file: File = files[0];
      this.isUploading = true;

      this.fileUploadService.uploadFile(file)
        .pipe(finalize(() => this.isUploading = false))
        .subscribe(
          (response: ApiResponse) => {
            console.log('File uploaded successfully', response.message);
            // Display success message or update UI as needed
          },
          (error: any) => {
            console.error('Error uploading file', error);
            // Display error message or update UI as needed
          }
        );
    } else {
      console.warn('No file selected');
    }
  }


}
