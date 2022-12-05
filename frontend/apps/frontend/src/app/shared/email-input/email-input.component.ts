import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.css']
})
export class EmailInputComponent implements OnInit {
  valid: boolean = true

  constructor() {
  }

  ngOnInit(): void {
    console.log()
  }

  onClick(b: boolean) {
    console.log(b)
  }
}
