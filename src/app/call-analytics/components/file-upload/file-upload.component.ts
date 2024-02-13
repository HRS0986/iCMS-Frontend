import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  breadcrumbItems: MenuItem[] = [
    {label: "Call Analytics"},
    {label: "Call Recordings"},
    {label: "Upload Calls"}
  ];
//  isAdvancedUpload: boolean = true;
//   isDragover: boolean = false;
//   droppedFiles: FileList | null = null;

//   onDragOver(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//     this.isDragover = true;
//   }

//   onDragLeave(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//     this.isDragover = false;
//   }

//   onDrop(event: DragEvent): void {
//     event.preventDefault();
//     event.stopPropagation();
//     this.isDragover = false;

//     const files = event.dataTransfer?.files || null;
//     this.droppedFiles = files ? files : null;
//   }

//   onFileChange(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     this.droppedFiles = inputElement.files;
//   }

//   onSubmit(): void {
//     // Handle file upload logic here
//     if (this.droppedFiles) {
//       console.log("Uploading files:", this.droppedFiles);
//       // Add your upload logic here
//     }
//   }
}
