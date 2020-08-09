import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/case', title: 'My Cases', icon: 'nc-bank', class: '' },
    // { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    // { path: '/users', title: 'All Users', icon: 'nc-bank', class: '' },
    { path: '/', title: 'My Dockets', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Law Library', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Legal Research Assistance', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Legal Forms', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Ask a lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Hire a lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Message My lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Video My lawyer', icon: 'nc-bank', class: '' },
    { path: '/', title: 'Bail Bonds', icon: 'nc-bank', class: '' },
];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    styleUrls: ['./sidebar.component.css'],
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
