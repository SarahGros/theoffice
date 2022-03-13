import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-gauche',
  templateUrl: './menu-gauche.component.html',
  styleUrls: ['./menu-gauche.component.scss']
})
export class MenuGaucheComponent implements OnInit {

  @Output() clickOnManager : EventEmitter<boolean> = new
  EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickManager(){
    this.clickOnManager.emit();
  }

}
