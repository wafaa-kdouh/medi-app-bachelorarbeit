import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedikamentListeComponent } from './components/medikament-liste/medikament-liste.component';
import { MedikamentAddComponent } from './components/medikament-add/medikament-add.component';
import { MedikamentScannerComponent } from './components/medikament-scanner/medikament-scanner.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'list', component: MedikamentListeComponent },
  { path: 'add', component: MedikamentAddComponent },
  { path: 'scan', component: MedikamentScannerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
