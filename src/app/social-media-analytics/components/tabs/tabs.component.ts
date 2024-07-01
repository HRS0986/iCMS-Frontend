import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { TabStateService } from '../../services/tab-state.service';

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

  constructor(private tabStateService: TabStateService) {}

  ngAfterContentInit() {
    this.activeComponent = this.tabs.first;
    this.tabStateService.setActiveTab(this.tabs.first.tabItem.title);
    /* 
    this.activeComponent = this.tabs.toArray()[1];
    this.activeComponent = this.tabs.last;
     */
  }

  activateTab(tab: TabItemComponent) {
    this.activeComponent = tab;
    this.tabStateService.setActiveTab(tab.tabItem.title);
  }
}
