import { LayoutComponent } from 'app/layouts/layout.component';
import { LoginComponent } from 'app/pages/all-login/login/login.component';

export const routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/user', pathMatch: 'full' },
            { path: 'user', loadChildren: './+user/user.module#UserModule' },
            { path: 'facility', loadChildren: './+facility/facility.module#FacilityModule' },
            { path: 'lawyer', loadChildren: './+lawyer/lawyer.module#LawyerModule' },
            { path: 'researcher', loadChildren: './+researcher/researcher.module#ResearcherModule' },
            { path: 'public-defender', loadChildren: './+public-defender/public-defender.module#PublicDefenderModule' },
            { path: 'bondsman', loadChildren: './+bondsman/bondsman.module#BondsmanModule' },
            { path: 'superadmin', loadChildren: './+superadmin/superadmin.module#SuperadminModule' },
            { path: '**', redirectTo: 'user' }
        ]
    }
]