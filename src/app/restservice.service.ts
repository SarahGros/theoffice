import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  private setHeaders(user: string): HttpHeaders {
    var headers = new HttpHeaders({ 'X-User': user });
    return headers;
  }

  public putProduit(product: Product): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/product", product, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }

  public putManager(manager: Pallier): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/manager", manager, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }

  public putUnlock(unlock: Pallier): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/unlock", unlock, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }

  public putUpgrade(upgrade: Pallier): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/upgrade", upgrade, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }

  public putAllUnlocks(allunlock: Pallier): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/allunlock", allunlock, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }

  public putWorld(world: World): Promise<Response> {
    return this.http.put(this.server + "adventureisis/generic/world", world, {
      headers: this.setHeaders(this.user)
    })
      .toPromise()
      .catch(this.handleError);
  }


  public deleteWorld(): Promise<Response> {
    return this.http.delete(this.server + "adventureisis/generic/world", {
      headers: this.setHeaders(this.user)
    })
      .toPromise().then(response => response)
      .catch(this.handleError);
  }

}
