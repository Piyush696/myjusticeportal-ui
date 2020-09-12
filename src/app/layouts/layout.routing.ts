import { Routes } from '@angular/router';

export const LayoutRoutes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'user', loadChildren: '../routes/+user/user.module#UserModule' },
    { path: 'facility', loadChildren: '../routes/+facility/facility.module#FacilityModule' },
    { path: 'lawyer', loadChildren: '../routes/+lawyer/lawyer.module#LawyerModule' },
    { path: 'researcher', loadChildren: '../routes/+researcher/researcher.module#ResearcherModule' },
    { path: 'public-defender', loadChildren: '../routes/+public-defender/public-defender.module#PublicDefenderModule' },
    { path: 'bondsman', loadChildren: '../routes/+bondsman/bondsman.module#BondsmanModule' },
    { path: 'superadmin', loadChildren: '../routes/+superadmin/superadmin.module#SuperadminModule' },
    { path: '**', redirectTo: 'user' }
];