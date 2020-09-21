import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MyAccountComponent } from '../+shared-components/my-account/my-account.component';
import { CasesComponent } from './+cases/cases/cases.component';
import { CreateCaseComponent } from './+cases/create-case/create-case.component';
import { EditCaseComponent } from './+cases/edit-case/edit-case.component';
import { ViewCaseComponent } from './+cases/view-case/view-case.component';
import { ViewLawyerComponent } from './hire-lawyer/view-lawyer/view-lawyer.component';
import { HireLawyerComponent } from './hire-lawyer/hire-lawyer.component';
import { FindBondsmanComponent } from './find-bondsman/find-bondsman.component';
import { ViewBondsmanComponent } from './view-bondsman/view-bondsman.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: UserDashboardComponent },
    { path: 'my-account', component: MyAccountComponent },
    { path: 'case', component: CasesComponent },
    { path: 'case/create', component: CreateCaseComponent },
    { path: 'case/:caseId/edit', component: EditCaseComponent },
    { path: 'case/:caseId', component: ViewCaseComponent },
    { path: 'hire-lawyer', component: HireLawyerComponent },
    { path: 'hire-lawyer/:organizationId', component: ViewLawyerComponent },
    { path: 'organization', component: FindBondsmanComponent },
    { path: 'organization/:organizationId', component: ViewBondsmanComponent },
    { path: '**', component: UserDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }