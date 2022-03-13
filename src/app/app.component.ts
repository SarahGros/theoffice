import { Component, OnInit} from '@angular/core';
import { RestserviceService } from './restservice.service';
import {Product, World, Pallier} from "./models/world";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  server!: string;
  user = "";
  world!: World;
  product!:Product;
  products!: Product[];
  palliers!: Pallier[];
  MultiplicateurButton!: string;
  qtmulti: number=1;
  worldMoney!: number;
  isLoaded: boolean = false;
  showManager: boolean = false;


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

  getWorld(): World {
    return this.world;
  }

  setWorld(value: World) {
    this.world = value;
  }


  constructor(public service: RestserviceService) {
  }

  ngOnInit(){
    this.server = this.service.getServer();
    this.service.getWorld().then((e)=>{
      this.world = e;
      console.log(this.world);
      this.products = this.world.products.product;
      this.isLoaded = true;
    });
    this.MultiplicateurButton = 'x1';

    this.palliers = [
        {
          name: "",
          logo: "",
          seuil: 0,
          idcible:  0,
          ratio: 0,
          typeratio: "",
          unlocked: false,
        }
      ];
  }
// méthode qui augmente l’argent (et le score) du joueur en fonction de ce que rapporte la production du produit
  onProductionDone(p: Product) {
    this.world.money = this.world.money + p.revenu;
    this.world.score = this.world.score + p.revenu;
  }
//x1,x10,x100 uniquement si le joueur est en capacité financière d’acheter la quantité spécifiée.
  //quand le bouton commutateur est sur la position Max, il s’agit de calculer la quantité maximale achetable par le joueur de ce produit, et d’inscrire cette quantité dans le bouton d’achat.
  multiplicateurAchatProduit() {
    if (this.MultiplicateurButton === 'x1') {
      this.MultiplicateurButton = 'x10';
      this.qtmulti = 10;
    } else if (this.MultiplicateurButton === 'x10'){
      this.MultiplicateurButton = 'x100';
      this.qtmulti = 100;
    } else if (this.MultiplicateurButton === 'x100'){
      this.MultiplicateurButton = 'xMax';
      this.qtmulti = -1;
    } else if (this.MultiplicateurButton === 'xMax') {
      this.MultiplicateurButton = 'x1';
      this.qtmulti = 1;
    }
  }
  onBuyDone(c: number) {
    this.world.money -= c;
  }

  onClickManager() {
    if(this.showManager){
      this.showManager = false;
    } else {
      this.showManager = true;
    }
  }
}
