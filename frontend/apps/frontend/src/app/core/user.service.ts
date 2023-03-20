import {Inject, Injectable} from "@angular/core";
import { Subject } from "rxjs";
import {UserFavorite} from "../shared/classes/userFavorite";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {

  favorites: Subject<UserFavorite[]> = new Subject<UserFavorite[]>();

  constructor(private http: HttpClient,
              @Inject("BACKEND_URL") private baseUrl: string) { }

  public getFavorites(): void {
    this.http.get<UserFavorite[]>(this.baseUrl + "").subscribe(result => {
      this.favorites.next(result);
    });
  }
}
