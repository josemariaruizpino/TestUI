import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsDocsComponent } from './components/buttons-docs/buttons-docs.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeDocsComponent } from './components/home-docs/home-docs.component';
import { InputsDocsComponent } from './components/inputs-docs/inputs-docs.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { SummaryDocsComponent } from './components/summary-docs/summary-docs.component';
import { ColorsDocsComponent } from './components/colors-docs/colors-docs.component';
import { ModalDocsComponent } from './components/modal-docs/modal-docs.component';
import { SizesDocsComponent } from './components/sizes-docs/sizes-docs.component';
import { DisplayDocsComponent } from './components/display-docs/display-docs.component';
import { FontsDocsComponent } from './components/fonts-docs/fonts-docs.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsDocsComponent,
    HeaderComponent,
    HomeDocsComponent,
    InputsDocsComponent,
    SidebarNavComponent,
    SummaryDocsComponent,
    ColorsDocsComponent,
    ModalDocsComponent,
    SizesDocsComponent,
    DisplayDocsComponent,
    FontsDocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
