import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component'
import { ImprintComponent } from './imprint/imprint.component';
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'imprint', component: ImprintComponent, data: { scrollPositionRestoration: 'enabled' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
