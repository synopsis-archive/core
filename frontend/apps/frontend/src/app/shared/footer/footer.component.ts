import { Component } from "@angular/core";
import {MainframeIdTokenService} from "mainframe-connector";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {

  hash: string = COMMITHASH;
  date: string = COMMITDATE;

  constructor(
    private service: MainframeIdTokenService,
  ) {
  }

  logout() {
    this.service.logout();
  }
}
