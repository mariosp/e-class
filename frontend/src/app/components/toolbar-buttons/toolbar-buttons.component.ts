import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toolbar-buttons',
  templateUrl: './toolbar-buttons.component.html',
  styleUrls: ['./toolbar-buttons.component.scss']
})
export class ToolbarButtonsComponent implements OnInit {
  @Input() userRole: string;
  constructor() { }

  ngOnInit() {
  }

}
