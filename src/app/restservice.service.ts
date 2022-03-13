import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { World, Pallier, Product } from './models/world';


@Injectable({
  providedIn: 'root'
})
export class RestserviceService {
  world!: World;
  server = "http://localhost:8080/";
  user = "";

  constructor(private http: HttpClient) {
  }

  getServer(): string {
    return this.server;
  }

  setServer(value: string) {
    this.server = value;
  }

  getUser(): string {
    return this.user;
  }

  setUser(value: string) {
    this.user = value;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getWorld(): Promise<World> {
    return this.http.get(
      this.server + "adventureisis/generic/world"
    ).toPromise().catch(this.handleError);
  }
}
