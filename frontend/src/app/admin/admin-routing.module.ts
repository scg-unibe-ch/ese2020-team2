import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NotFoundComponent} from "../error/not-found/not-found.component";

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: "**", component: NotFoundComponent},

];
