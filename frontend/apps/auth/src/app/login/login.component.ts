import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  username = "";
  password = "";

  constructor() {}

  login() {
    window.parent.postMessage({
      "method": "login",
      "data": {
        "username": this.username,
        "password": this.password
      }
      // FIXME: Fix targetOrigin
    }, "*")
  }
}
