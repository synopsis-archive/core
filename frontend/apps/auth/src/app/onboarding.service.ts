import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OnboardingService {

  setEduvidualToken(token: string): Promise<string> {
    const promise = new Promise<string>((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "error") {
          resolve(event.data.data.message);
        }
      });
    });

    window.parent.postMessage({
      method: "setEduvidualToken",
      data: {
        token,
      }
      // FIXME: Fix targetOrigin
    }, "*");

    return promise;
  }

  login(username: string, password: string) {
    return;
  }
}
