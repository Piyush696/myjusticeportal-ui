import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roleIds: number[];
    isFacility?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: '/case', title: 'My Cases', icon: 'nc-bank', class: '', roleIds: [1, 4], isFacility: true },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [] },
    // { path: ':facilityCode/userdashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: '/users', title: 'All Users', icon: 'nc-bank', class: '', roleIds: [7] },
    { path: '/my-dockets', title: 'My Dockets', icon: 'nc-bank', class: '', roleIds: [2] },
    { path: '/app-setting', title: 'Application Settings', icon: 'nc-bank', class: '', roleIds: [7] },
    { path: '/law-library', title: 'Law Library', icon: 'nc-bank', class: '', roleIds: [4, 5, 6] },
    { path: '/legal-research-Assistance', title: 'Legal Research Assistance', icon: 'nc-bank', class: '', roleIds: [4, 6] },
    { path: '/legal-forms', title: 'Legal Forms', icon: 'nc-bank', class: '', roleIds: [1, 2], isFacility: false },
    { path: '/ask-lawyer', title: 'Ask a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 4, 7] },
    { path: '/hire-lawyer', title: 'Hire a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 6, 7] },
    { path: '/message-lawyer', title: 'Message My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3] },
    { path: '/video-lawyer', title: 'Video My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3, 7] },
    { path: '/bail-bonds', title: 'Bail Bonds', icon: 'nc-bank', class: '', roleIds: [1, 4, 6, 7] },
    { path: '/facility', title: 'Facility', icon: 'nc-bank', class: '', roleIds: [7] }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public filteredMenuItems: any[];
    userRole: any;

    constructor(private store: Store<any>) { };

    ngOnInit() {
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userRole = x.role[0];
        });
        this.filterMenuByUser();
    }

    filterMenuByUser() {
        this.filteredMenuItems = ROUTES.filter(menu => {
            let isExist = menu.roleIds.find(roleId => roleId == this.userRole.roleId);
            if (isExist) {
                if (menu.isFacility) {
                }
                return menu;
            }
        });
    }
}