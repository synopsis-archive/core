import {Injectable} from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class MainframeIdTokenService {

  constructor() {
  }

  public getJwt(): string {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiaWQtdG9rZW4iLCJ1c2VybmFtZSI6InNmZWljaHRsYmF1ZXIxOCIsInV1aWQiOiJzdXBhIHV1aWQgaG9zdCBkdSBkbyIsInJvbGxlIjoic3R1ZGVudCIsImVtYWlsIjoic2ZlaWNodGxiYXVlcjE4QHN1cy5odGwtZ3JpZXNraXJjaGVuLmF0IiwiY29ubmVjdGVkUGxhdGZvcm1zIjoiW3tcIlBsYXRmb3JtTmFtZVwiOlwiZmVpY2h0bGJhdWVyLmRkbnMubmV0XCIsXCJVc2VybmFtZVwiOlwic2ZlaWNodGxiYXVlcjE4XCJ9LHtcIlBsYXRmb3JtTmFtZVwiOlwic3BpZWxhZmZlLmRlXCIsXCJVc2VybmFtZVwiOlwiY29vbGVyc2ltb242OVwifSx7XCJQbGF0Zm9ybU5hbWVcIjpcInNjaG51cGZ0YWJha2JpbGxpZ2VyMjQuZGVcIixcIlVzZXJuYW1lXCI6XCJzZWljaHRsYmF1ZXJmaW1vblwifV0iLCJtYXRyaWtlbG51bW1lciI6IjY5Iiwia2xhc3NlIjoiNUIifQ.2-Ee5rHvmjjcMYn-3YA4nvfo9kGOX6utlX8_lA961os";
  }

  public decodeJwt(token: string): IDTokenPayload {
    const payload = jwtDecode<IDTokenPayload>(token);
    payload.connectedPlatformsDeserialized = JSON.parse(payload.connectedPlatforms);
    return payload;
  }

}

// modelled after the Claims Property of class IDToken in the Core.Backend.Secure project
export interface IDTokenPayload {
  // type: "id-token"
  type: string,

  // username: ldap-username
  username: string,

  // uid: db-uuid
  uuid: string,

  // rolle: <schüler, lehrer, staff>
  rolle: string,

  // Email
  email: string,

  // connectedPlatforms: serialisiertes Json-Array -- Plattformen mit hinterlegten credentials
  connectedPlatforms: string,

  // FIXME: i hob keine Ahnung, wie des moi ausschaun soid
  // connectedPlatformsDeserialized: connectedPlatforms, oba deserialisiert
  connectedPlatformsDeserialized: { PlatformName: string, Username: string }[],

  // matrikelnummer - nur bei Schülern verfügbar
  matrikelnummer: string | undefined,

  // klasse - nur bei Schülern verfügbar
  klasse: string | undefined,
}
