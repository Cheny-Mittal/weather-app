import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }
  @Input() message: string;
  @Input() action = 'GOT IT';
  clicked: boolean = false;
  ngOnInit() {
  }
  buttonClicked(){
    this.clicked = !this.clicked;
  }
}
