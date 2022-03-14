import {Component, Input, OnInit} from '@angular/core';
import {World} from "../models/world";
import {RestserviceService} from "../restservice.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  server!:"localhost";
  user!: "";
  world! : World;
  _worldMoney!: number;
  _username!: string;
  isLoaded: boolean = false;

  @Input() set worldMoney(valeur: number){
    this._worldMoney = valeur;
  }

  @Input() set username(valeur: string){
    this._username = valeur;
  }

  constructor(public service: RestserviceService) {
    service.getWorld().then(
      (world) => {
        this.world = world;
        console.log(this.world);
        this.isLoaded = true;
      }
    )}

  ngOnInit(): void {
  }

}
