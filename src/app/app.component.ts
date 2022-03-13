import { Component, OnInit} from '@angular/core';
import { RestserviceService } from './restservice.service';
import {Product, World, Pallier} from "./models/world";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  nombreManagerPouvantEtreRecrute: number = 0;
  showUnlocks: boolean = false;
  username!: string;
  isUsername!: boolean;


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


  constructor(public service: RestserviceService,
              private snackBar: MatSnackBar) {
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
    this.nombreManagerPouvantEtreRecrute = 0;
    this.world.money = this.world.money + p.revenu;
    this.world.score = this.world.score + p.revenu;
    // On regarde pour chaque manager si on peut le débloquer
    for(let m in this.world.managers.pallier){
      if(this.world.managers.pallier[m].seuil < this.world.money && !this.world.managers.pallier[m].unlocked) this.nombreManagerPouvantEtreRecrute++;
    }
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
    console.log("ici");

    // puisque achat de quantité pour un produit, on vérifie si les unlocks sont déblocables
    for(let x in this.products){
      for(let y in this.products[x].palliers.pallier){
        // Pour chaque pallier de chaque produit
        // si le seuil est plus petit ou égal à la quantité du dis produit
        // on l'unlock
        console.log(this.products[x].name + " " +this.products[x].palliers.pallier[y].seuil + " " +this.products[x].quantite)
        if(this.products[x].palliers.pallier[y].seuil <= this.products[x].quantite && !this.products[x].palliers.pallier[y].unlocked){
          console.log("okkk");
          this.products[x].palliers.pallier[y].unlocked = true;
          if(this.products[x].palliers.pallier[y].typeratio == 'vitesse'){
            this.products[x].vitesse = this.products[x].vitesse/this.products[x].palliers.pallier[y].ratio;
          } else if(this.products[x].palliers.pallier[y].typeratio == 'gain'){
            this.products[x].revenu = this.products[x].revenu * this.products[x].palliers.pallier[y].ratio;
          }
          this.snackBar.open('L\'unlock ' + this.products[x].palliers.pallier[y].name+
            ' pour le produit '+ this.products[x].name +
            ' a été débloqué ! ' + this.products[x].palliers.pallier[y].typeratio + '*'+
            this.products[x].palliers.pallier[y].ratio, "", {duration: 2000});
        }
      }
    }
  }

  onClickManager() {
    if(this.showManager){
      this.showManager = false;
    } else {
      this.showManager = true;
    }
  }

  onClickUnlocks(){
    if(this.showUnlocks){
      this.showUnlocks = false;
    } else {
      this.showUnlocks = true;
    }

  }

  onRecruterManager(manager: any){
    console.log(this.world.money);
    if(this.world.money < manager.seuil) {
      this.snackBar.open('Pas assez d\'argent, achat impossible.', "", {duration: 2000});
    } else if(this.world.products.product[manager.idcible-1].quantite <= 0){
      this.snackBar.open('Vous ne pouvez pas recruter '+manager.name+' si le produit n\'est pas débloqué !', "", {duration: 2000});
    } else {
      // Achat d'un manager
      this.snackBar.open(manager.name+" est recruté!", "", {duration: 2000});
      // on enleve l'argent
      this.world.money -= manager.seuil;
      // on passe le statut du manager a unlocked
      manager.unlocked = true;
      // on passe le statut managerUnlocked du produit a vrai
      this.world.products.product[manager.idcible-1].managerUnlocked = true;
      this.products = this.world.products.product;
      this.showManager = false;
      this.nombreManagerPouvantEtreRecrute--;
    }
  }

  onUsernameChanged(){
    if(this.username.length != 0){
      this.isUsername = true;
      localStorage.setItem("username", this.username);
    }
  }

  onUsernameRandom(){
    this.username = Math.floor(Math.random() * 10000) + 'Concombre';
    this.onUsernameChanged();
  }

}
