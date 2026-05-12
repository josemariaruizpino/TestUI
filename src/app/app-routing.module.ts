import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsDocsComponent } from './components/buttons-docs/buttons-docs.component';
import { HomeDocsComponent } from './components/home-docs/home-docs.component';
import { InputsDocsComponent } from './components/inputs-docs/inputs-docs.component';
import { SummaryDocsComponent } from './components/summary-docs/summary-docs.component';
import { ColorsDocsComponent } from './components/colors-docs/colors-docs.component';
import { ModalDocsComponent } from './components/modal-docs/modal-docs.component';
import { SizesDocsComponent } from './components/sizes-docs/sizes-docs.component';
import { DisplayDocsComponent } from './components/display-docs/display-docs.component';
import { FontsDocsComponent } from './components/fonts-docs/fonts-docs.component';

const routes: Routes = [
  { path: '', component: HomeDocsComponent },
  { path: 'buttons', component: ButtonsDocsComponent },
  { path: 'inputs', component: InputsDocsComponent },
  { path: 'summary', component: SummaryDocsComponent },
  { path: 'colors', component: ColorsDocsComponent },
  { path: 'modal', component: ModalDocsComponent },
  { path: 'sizes', component: SizesDocsComponent },
  { path: 'display', component: DisplayDocsComponent },
  { path: 'fonts', component: FontsDocsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
