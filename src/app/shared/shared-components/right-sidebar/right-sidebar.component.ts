import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent {
  @Input() showAddMemberButton: boolean = false;
  @Input() showAddWidgetButton: boolean = false;
  @Input() showAddRoleButton: boolean = false;


}
