import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { CryptoListComponent } from './crypto-list/crypto-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'crypto-list', pathMatch: 'full'}, // homepage is redirected to a component
  { path: 'crypto-list', component: CryptoListComponent },
  { path: 'coin-details/:id', component: CoinDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
