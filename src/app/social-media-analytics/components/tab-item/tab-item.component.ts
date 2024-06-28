import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Content, TabItem } from '../../models/main-types';


@Component({
  selector: 'tab-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {
  @Input() tabItem: TabItem = { title: 'Default', img: '' };
  @Input() templateContentRef!: TemplateRef<any>;
  @Input() templateRightRef!: TemplateRef<any>;
  @Input() content?: Content; 
}
