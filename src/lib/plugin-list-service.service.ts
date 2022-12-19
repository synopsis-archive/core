import { Injectable } from '@angular/core';
import {Plugin} from "./Plugin";

@Injectable({
  providedIn: 'root'
})
export class PluginListServiceService {

  constructor() { }

  public getPluginList(): Promise<Plugin[]> {
    parent.postMessage({
      method: "getPluginList"
    }, "*");

    const promise = new Promise<Plugin[]>((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "getPluginList") {
          resolve(event.data.data);
        }
      });
    });

    return promise;
  }
}
