import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu-gauche',
  templateUrl: './menu-gauche.component.html',
  styleUrls: ['./menu-gauche.component.scss']
})
export class MenuGaucheComponent implements OnInit {

  @Output() clickOnManager : EventEmitter<boolean> = new
  EventEmitter<boolean>();

  @Output() clickOnUnlocks : EventEmitter<boolean> = new
  EventEmitter<boolean>();

  @Output() clickOnCashUpgrade : EventEmitter<boolean> = new
  EventEmitter<boolean>();

  @Input() badgeManager: number = 0;
  @Input() badgeUnlocks: number = 0;
  @Input() badgeCashUpgrade: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onClickManager(){
    this.clickOnManager.emit();
  }

  onClickUnlocks(){
    this.clickOnUnlocks.emit();
  }

  onClickCashUpgrade(){
    this.clickOnCashUpgrade.emit();
  }

}
