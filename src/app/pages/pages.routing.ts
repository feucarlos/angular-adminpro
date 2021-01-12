import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'acount-settings', component: AccountSettingsComponent }
            // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: []
})

export class PagesRoutingModule {}
