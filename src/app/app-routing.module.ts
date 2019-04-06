import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'grupos', loadChildren: './pages/grupos/grupos.module#GruposPageModule' },
  { path: 'tips', loadChildren: './pages/tips/tips.module#TipsPageModule' },
  { path: 'pet-info', loadChildren: './pages/pet-info/pet-info.module#PetInfoPageModule' },
  { path: 'main', loadChildren: './pages/main/main.module#MainPageModule' },
  { path: 'editar-servicios', loadChildren: './pages/editar-servicios/editar-servicios.module#EditarServiciosPageModule' },
  { path: 'calendar', loadChildren: './pages/vet_services/calendar/calendar.module#CalendarPageModule' },
  { path: 'users', loadChildren: './pages/vet_services/users/users.module#UsersPageModule' },
  { path: 'mascota', loadChildren: './pages/mascota/mascota.module#MascotaPageModule' }
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
