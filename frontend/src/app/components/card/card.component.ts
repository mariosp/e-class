import {Component, Input, OnInit} from '@angular/core';
import {ButtonItem} from "../../models/top-bar";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() header: string;
  @Input() subtitle: string;
  @Input() p1: string;
  @Input() p2: string;
  @Input() studentId: string;
  @Input() teacherId: string;
  @Input() id: string;
  @Input() cardButtons: ButtonItem[];
  @Input() enrolledStudents: any;

  constructor() { }

  ngOnInit() {
  }

}
