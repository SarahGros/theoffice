import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ProductComponent } from './product/product.component';
import { MenuGaucheComponent } from './menu-gauche/menu-gauche.component';
import { BigvaluePipe } from './bigvalue.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    MenuGaucheComponent,
    BigvaluePipe,
    //MatSliderModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule
  ],
  providers: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
