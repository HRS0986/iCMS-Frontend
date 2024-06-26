import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';

interface DateOption {
  name: string;
  icon: string;
}

interface TypeOption {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-modal-export-pi',
  templateUrl: './modal-export-pi.component.html',
  styleUrls: ['./modal-export-pi.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    PasswordModule,
  ],
})
export class ModalExportPIComponent implements OnInit {
  platforms: any[] | undefined;
  selectedPlatform: any;

  date: DateOption[] | undefined;
  selectedDate: DateOption | undefined;

  type: TypeOption[] | undefined;
  selectedType: TypeOption | undefined;

  value!: string;
  visible: boolean = false;
  loading: boolean = false;

  topBarCaption = "Export Data";
  ngOnInit() {
    this.date = [
      { name: 'Last week', icon: 'assets/social-media/icons/calendar.png' },
      { name: 'Last Month', icon: 'assets/social-media/icons/calendar.png' },
    ];
    this.type = [
      { name: 'CSV', icon: 'assets/social-media/icons/csv.png' },
      { name: 'PDF', icon: 'assets/social-media/icons/pdf.png' },
    ];
    this.platforms = [
      { name: 'Facebook', icon: 'assets/social-media/icons/facebook.png' },
      { name: 'Instagram', icon: 'assets/social-media/icons/instargram.png' },
      { name: 'Twitter', icon: 'assets/social-media/icons/twitter.png' },
    ];
  }

  showDialog() {
    this.visible = true;
  }

  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
