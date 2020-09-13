import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CasesComponent } from './+cases/cases/cases.component';
import { CreateCaseComponent } from './+cases/create-case/create-case.component';
import { EditCaseComponent } from './+cases/edit-case/edit-case.component';
import { ViewCaseComponent } from './+cases/view-case/view-case.component';
import { ViewCaseFilesComponent } from './+cases/view-case-files/view-case-files.component';
import { ViewLawyerComponent } from './hire-lawyer/view-lawyer/view-lawyer.component';
import { HireLawyerComponent } from './hire-lawyer/hire-lawyer.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: UserDashboardComponent },
    { path: 'case', component: CasesComponent },
    { path: 'case/create', component: CreateCaseComponent },
    { path: 'case/:caseId/edit', component: EditCaseComponent },
    { path: 'case/:caseId', component: ViewCaseComponent },
    { path: 'case/:caseId/files', component: ViewCaseFilesComponent },
    { path: 'hire-lawyer', component: HireLawyerComponent },
    { path: 'hire-lawyer/:organizationId', component: ViewLawyerComponent },
    { path: '**', component: UserDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }