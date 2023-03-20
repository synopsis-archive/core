import { Injectable } from "@angular/core";
import { CredService } from "./core/cred.service";
import { MainframeService } from "./mainframe.service";

@Injectable({
  providedIn: "root"
})
export class OnboardingService {

  constructor(private mainframe: MainframeService, private credService: CredService) {
  }

  setEduvidualToken(token: string): Promise<string> {
    const promise = new Promise<string>((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "error") {
          resolve(event.data.data.message);
        }
      });
    });

    window.parent.postMessage({ method: "saveToken", data: { token } }, "*");

    return promise;
  }

  async login(username: string, password: string, redirect: boolean) {
    const pwEncrypted = await this.credService.encryptPassword(password);
    this.mainframe.login(username, pwEncrypted, redirect).then(error => {
      if (error) {
        throw new Error(error);
      }
    })
  }
}
