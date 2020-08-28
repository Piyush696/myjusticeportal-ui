import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roleIds: any;
}

export const ROUTES: RouteInfo[] = [
    { path: '/case', title: 'My Cases', icon: 'nc-bank', class: '', roleIds: [1, 4] },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [] },
    { path: '/users', title: 'All Users', icon: 'nc-bank', class: '', roleIds: [1, 7] },
    { path: '/My-Dockets', title: 'My Dockets', icon: 'nc-bank', class: '', roleIds: [2] },
    { path: '/app-setting', title: 'My SuperAdmin View', icon: 'nc-bank', class: '', roleIds: [7] },
    { path: '/Law-Library', title: 'Law Library', icon: 'nc-bank', class: '', roleIds: [4, 5, 6] },
    { path: '/Legal-Research-Assistance', title: 'Legal Research Assistance', icon: 'nc-bank', class: '', roleIds: [4, 6] },
    { path: '/Legal-Forms', title: 'Legal Forms', icon: 'nc-bank', class: '', roleIds: [1, 2] },
    { path: '/Ask-a-lawyer', title: 'Ask a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 4, 7] },
    { path: '/Hire-a-lawyer', title: 'Hire a lawyer', icon: 'nc-bank', class: '', roleIds: [3, 6, 7] },
    { path: '/Message-My-lawyer', title: 'Message My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3] },
    { path: '/Video-My-lawyer', title: 'Video My lawyer', icon: 'nc-bank', class: '', roleIds: [1, 3, 7] },
    { path: '/Bail-Bonds', title: 'Bail Bonds', icon: 'nc-bank', class: '', roleIds: [1, 4, 6, 7] }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public filteredMenuItems: any[];
    currentMenu: any;
    userRole: any;

    constructor(private store: Store<any>) { };

    ngOnInit() {
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userRole = x.role[0];
        })
        this.filterMenuByUser();
    }

    filterMenuByUser() {
        this.filteredMenuItems = ROUTES.filter(menu => {
            let isExist = menu.roleIds.find(roleId => roleId == this.userRole.roleId);
            if (isExist) {
                return menu;
            }
        });
    }
}