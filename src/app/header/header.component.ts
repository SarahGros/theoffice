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
  isLoaded: boolean = false;

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
