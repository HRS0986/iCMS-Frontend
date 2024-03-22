import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'tabs',
  standalone: true,
  imports: [CommonModule, TabItemComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  activeComponent!: TabItemComponent;

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
    /* YOU CAN SET ANOTHER ACTIVE COMPONENT LIKE THIS
    this.activeComponent = this.tabs.toArray()[1];
    this.activeComponent = this.tabs.last;
     */
  }

  activateTab(tab: TabItemComponent) {
    this.activeComponent = tab;
  }
}
