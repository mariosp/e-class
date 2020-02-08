import {Component, Input, OnInit} from '@angular/core';
import {TopBar} from "../../models/top-bar";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Input() topBar:TopBar;
  constructor() { }

  ngOnInit() {
    console.log(this.topBar)
  }

}
