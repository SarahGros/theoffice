import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product, World} from "../models/world";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  world!: World;
  product!: Product;
  progressbarvalue!: number;
  lastupdate!: number;
  timeleft!: number;
  _qtmulti!: number;
  debutFabrication: boolean = false;
  prixInitial!: number;
  pauvre: boolean = false;

  @Input() worldMoney: number = 0;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Input()
  set qtmulti(value: number) {
    this._qtmulti = value;
      if(this._qtmulti == -1){
        this._qtmulti = this.calcMaxCanBuy()
      }
      this.changementMuliplicateur();
      // on grise si pas assez d'argent
    if(this.product.cout > this.worldMoney){
      this.pauvre = true;
    } else {
      this.pauvre = false;
    }
  }

  @Output() notifyProduction: EventEmitter<Product> = new
  EventEmitter<Product>();

  @Output() notifyOnBuy : EventEmitter<number> = new
  EventEmitter<number>();

  constructor() { }

  ngOnInit() {

    this.progressbarvalue = 0;
    this.prixInitial = this.product.cout;

    setInterval(() => {
      this.calcScore();
      }, 100);
    if (this.qtmulti && this.product) this.calcMaxCanBuy();
    this.product.logo = "assets/mug.jpeg";
  }

  startFabrication() {
    this.lastupdate = Date.now();
    this.product.timeleft = this.product.vitesse;
    this.progressbarvalue = 100;
    this.debutFabrication = true;
  }

  changementMuliplicateur(){
    let r = this.product.croissance;
    switch (this._qtmulti) {
      case 1:
        if(this.product.quantite == 0){
          this.calculProchainCout(this.product.quantite);
        } else {
          this.calculProchainCout(this.product.quantite+1);
        }
        break;

      case 10:
        this.calculProchainCout(this.product.quantite+10);
        break;

      case 100:
        this.calculProchainCout(this.product.quantite+100);
        break;

        // si multiplicateur = max
      case -1:
        break;
    }
  }

  calcScore(){
    if (this.product.timeleft == 0){
      //je ne fais rien car la production n'a pas été lancé
    }else if (this.timeleft!=0 && this.debutFabrication){
      this.product.timeleft = this.product.timeleft - (Date.now()-this.lastupdate);
      this.lastupdate=Date.now();
      if (this.product.timeleft <= 0){
        this.product.timeleft=0;
        this.progressbarvalue = 0;
        this.notifyProduction.emit(this.product);
      }else{
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100
      }
    }
  }
   calcMaxCanBuy() {
      let croissance = this.product.croissance;
      let n = (Math.log(1 - ((this.worldMoney * (1 - croissance)) / (this.product.cout * Math.pow(this.product.croissance, this.product.quantite))))) / Math.log(croissance);
      return n;
    }

  onBuy() {
    this.product.quantite = this.product.quantite + this._qtmulti;
    this.notifyOnBuy.emit(this.product.cout);
    if(this.product.quantite == 0){
      this.calculProchainCout(this.product.quantite);
    } else {
      this.calculProchainCout(this.product.quantite+1);
    }
  }

  calculProchainCout(qt: number){
    let tmpMoney = this.worldMoney - this.product.cout;
    this.product.cout = this.prixInitial * Math.pow((1+this.product.croissance/100), qt);
    // on grise si pas assez d'argent
    if(this.product.cout > (tmpMoney)){
      this.pauvre = true;
    } else {
      this.pauvre = false;
    }
  }

}
