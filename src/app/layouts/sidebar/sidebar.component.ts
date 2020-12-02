import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roleIds: number[];
    isAdmin?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: 'user/case', title: 'My Cases', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'user/hire-lawyer', title: 'Find a Lawyer', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'user/inquiries', title: 'Pending Inquiries', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'user/message-my-lawyer', title: 'Message My Lawyer', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'user/legal-research', title: 'Legal Research', icon: 'nc-bank', class: '', roleIds: [1] },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [] },
    // { path: ':facilityCode/userdashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'superadmin/users', title: 'All Users', icon: 'nc-bank', class: '', roleIds: [7] },
    //{ path: '/my-dockets', title: 'My Dockets', icon: 'nc-bank', class: '', roleIds: [2, 5] },
    { path: '', title: 'Law Library', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'lawyer/lawyer-dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [3] },
    { path: 'lawyer/inquiries', title: 'Inquiries', icon: 'nc-bank', class: '', roleIds: [3], isAdmin: true },
    { path: 'lawyer/lawyer-chat', title: 'Messaging', icon: 'nc-bank', class: '', roleIds: [3] },
    { path: 'lawyer/accepted-cases', title: 'My Cases', icon: 'nc-bank', class: '', roleIds: [3] },
    { path: 'lawyer/billing-setting', title: 'Billing Settings', icon: 'nc-bank', class: '', roleIds: [3], isAdmin: true },
    { path: 'lawyer/manage-profile', title: 'Manage Profile', icon: 'nc-bank', class: '', roleIds: [3], isAdmin: true },
    { path: 'lawyer/manage-organization', title: 'Manage Organization', icon: 'nc-bank', class: '', roleIds: [3], isAdmin: true },

    { path: 'public-defender/defender-dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [5] },
    { path: 'bondsman/bondsman-dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [6] },
    // { path: 'lawyer/lawyer-chat', title: 'Messaging', icon: 'nc-bank', class: '', roleIds: [3] },

    { path: 'public-defender/search-inquiries', title: 'Search Inmates', icon: 'nc-bank', class: '', roleIds: [5] },

    { path: 'bondsman/accepted-users', title: 'Accepted Users', icon: 'nc-bank', class: '', roleIds: [6] },
    { path: 'public-defender/manage-organization', title: 'Manage Organization', icon: 'nc-bank', class: '', roleIds: [5], isAdmin: true },
    { path: 'bondsman/manage-organization', title: 'Manage Organization', icon: 'nc-bank', class: '', roleIds: [6], isAdmin: true },
    { path: 'user/find-bondsman', title: 'Find Bondsman', icon: 'nc-bank', class: '', roleIds: [1] },
    { path: 'researcher/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', roleIds: [4] },
    { path: 'researcher/legal-research-assistance', title: 'Legal Research Assistance', icon: 'nc-bank', class: '', roleIds: [4] },
    { path: 'researcher/manage-organization', title: 'Manage Organization', icon: 'nc-bank', class: '', roleIds: [4], isAdmin: true },
    { path: '/legal-forms', title: 'Legal Forms', icon: 'nc-bank', class: '', roleIds: [2] },
    { path: '/ask-lawyer', title: 'Ask a lawyer', icon: 'nc-bank', class: '', roleIds: [4] },
    // { path: '/message-lawyer', title: 'Message My lawyer', icon: 'nc-bank', class: '', roleIds: [5] },
    // { path: '/video-lawyer', title: 'Video My lawyer', icon: 'nc-bank', class: '', roleIds: [5] },
    { path: '/bail-bonds', title: 'Bail Bonds', icon: 'nc-bank', class: '', roleIds: [4, 6] },
    { path: 'superadmin/facility', title: 'Facilities', icon: 'nc-bank', class: '', roleIds: [7] },
    { path: 'superadmin/app-setting', title: 'Application Settings', icon: 'nc-bank', class: '', roleIds: [7] }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
    public filteredMenuItems: any[];
    userInfo: any;
    libraryLink: any;

    constructor(private store: Store<any>) { }

    ngOnInit() {
        this.store.select(s => s.userInfo).subscribe(x => {
            this.userInfo = x;
            if (x.facilities) {
                this.libraryLink = x.facilities[0]?.libraryLink;
            }
        });
        this.filterMenuByUser();
    }

    filterMenuByUser() {
        if (this.userInfo.status) {
            this.filteredMenuItems = ROUTES.filter(menu => {
                let isExist = menu.roleIds.find(roleId => roleId == this.userInfo.roles[0].roleId);
                if (isExist) {
                    if (!menu.isAdmin) {
                        return menu;
                    }
                    else if (menu.isAdmin && this.userInfo.isAdmin) {
                        return menu;
                    }
                }
            });
        }
        else {
            this.filteredMenuItems = null;
        }
    }
}