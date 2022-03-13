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

  @Input() worldMoney: number = 0;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Input() qtmulti: number = 1;

  @Output() notifyProduction: EventEmitter<Product> = new
  EventEmitter<Product>();

  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.calcScore();
      }, 100);

    this.progressbarvalue=0;
    if (this.qtmulti && this.product) this.calcMaxCanBuy();
  }

  startFabrication() {
    this.lastupdate = Date.now();
    this.timeleft = this.lastupdate-this.product.vitesse;

  }
  calcScore(){
    if (this.product.timeleft==0){
      //je ne fais rien car la production n'a pas été lancé
    }if (this.timeleft!=0){
      this.product.timeleft -= Date.now()-this.lastupdate;
      this.lastupdate=Date.now();
      if (this.timeleft<=0){
        this.timeleft=0;
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
}
