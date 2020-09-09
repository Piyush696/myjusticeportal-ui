import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'app/pages/dashboard/dashboard.component';
import { CasesComponent } from 'app/pages/case/cases/cases.component';
import { CreateCaseComponent } from 'app/pages/case/create-case/create-case.component';
import { EditCaseComponent } from 'app/pages/case/edit-case/edit-case.component';
import { ViewCaseComponent } from 'app/pages/case/view-case/view-case.component';
import { ViewCaseFilesComponent } from 'app/pages/case/view-case-files/view-case-files.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'case', component: CasesComponent },
    { path: 'create', component: CreateCaseComponent },
    { path: 'case/:caseId/edit', component: EditCaseComponent },
    { path: 'case/:caseId', component: ViewCaseComponent },
    { path: 'case/:caseId/files', component: ViewCaseFilesComponent },
    { path: '**', component: DashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class UserRoutingModule { }