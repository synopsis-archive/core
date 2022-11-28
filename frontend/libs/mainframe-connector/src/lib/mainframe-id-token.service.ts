import {Injectable} from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class MainframeIdTokenService {

  constructor() {
  }

  public getJwt(): string {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoic2ZlaWNodGxiYXVlcjE4IiwidXVpZCI6InN1cGEgdXVpZCBob3N0IGR1IGRvIiwicm9sbGUiOiJpbW1hIG51IHN0dWRlbnQiLCJlbWFpbCI6InNmZWljaHRsYmF1ZXIxOEBzdXMuaHRsLWdyaWVza2lyY2hlbi5hdCIsImNvbm5lY3RlZFBsYXRmb3JtcyI6IntcInBsYXRmb3JtTmFtZVwiOiBcImZlaWNodGxiYXVlci5kZG5zLm5ldFwiLCBcInBsYXRmb3JtVXJsXCI6XCJodHRwOi8vZmVpY2h0bGJhdWVyLmRkbnMubmV0L1wifSIsIm1hdHJpa2VsbnVtbWVyIjoiNjkiLCJrbGFzc2UiOiI1QiJ9.Mrvk7V0ZKjugA_r-uU6qQhv3zHzLs3M3AXtKmRqR5Ro";
  }

  public decodeJwt(token: string): IDTokenPayload {
    return jwtDecode<IDTokenPayload>(token);
  }

}

// modelled after the Claims Property of class IDToken in the Core.Backend.Secure project
export interface IDTokenPayload {
  type: string,
  username: string,
  uuid: string,
  rolle: string,
  email: string,
  connectedPlatforms: string,
  matrikelnummer: string | undefined,
  klasse: string | undefined,
}
